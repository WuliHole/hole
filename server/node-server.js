'use strict';

const express = require('express');
const winston = require('winston');
const helmet = require('helmet');
const nodeProxy = require('./node-proxy');
const nodeAppServer = require('./node-app-server');
const authPassport = require('./auth-passport');
const article = require('./article')
const bodyParser = require('body-parser');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const genKey = require('draft-js').genKey
let users;

/**
 * Heroku-friendly production http server.
 *
 * Serves your app and allows you to proxy APIs if needed.
 */

const app = express();
const PORT = process.env.PORT || 8080;

authPassport.readUsers()
  .then((_users) => {
    users = _users;
  })
  .catch((err) => {
    throw err;
  });

// Enable various security helpers.
app.use(helmet());


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(
  (username, password, done) => {
    authPassport.authenticateUser(username, password, users)
      .then((authResult) => {
        return done(null, authResult);
      })
      .then(null, (message) => {
        return done(null, false, message);
      });
  }

));

passport.serializeUser((user, done) => {
  done(null, user.meta.id);
});

passport.deserializeUser((id, done) => {
  done(null, authPassport.getUserById(id, users));
});

app.post('/api/auth/login',
  passport.authenticate('local'),
  (req, res) => {
    const user = authPassport.getUserById(req.user.meta.id, users)
    req.user.meta.profile.avatar = user.avatar
    req.user.meta.profile.id = user.id
    res.status(200).send(JSON.stringify(req.user));
  }
);
app.post('/api/article/list',
  (req, res) => {
    article.readArticleList().then((result) => {
      res.
        status(200)
        .send(JSON.stringify({
          data: 'read article List success',
          meta: result,
        }));
    })
  }
)

app.post('/api/comment', (req, res) => {
  const user = authPassport.getUserById(req.body.authorId, users)
  res.status(200).send(JSON.stringify({
    success: true,
    meta: {
      content: req.body.content,
      id: genKey(),
      postId: req.body.postId,
      author: {
        avatar: user.avatar,
        first: user.First,
        last: user.Last,
        id: user.id,
      },
    },
  }))
})

// API proxy logic: if you need to talk to a remote server from your client-side
// app you can proxy it though here by editing ./proxy-config.js
nodeProxy(app);

// Serve the distributed assets and allow HTML5 mode routing. NB: must be last.
nodeAppServer(app);

// Start up the server.
app.listen(PORT, (err) => {
  if (err) {
    winston.error(err);
    return;
  }

  winston.info(`Listening on port ${PORT}`);
});
