[![Circle CI](https://circleci.com/gh/WuliHole/hole.svg?style=svg)](https://circleci.com/gh/WuliHole/hole)

# Hole

WuliHole

## npm scripts

### Dev
```bash
$ npm run dev
```

This runs a development mode server with live reload etc.

Open `http://localhost:8080` in your browser.

### Production

```bash
npm install
npm start
```

This runs a production-ready express server that serves up a bundled and
minified version of the client.

Open `http://localhost:8080` in your browser.

> Note: Demo username/password can be found [here](/server/users.json)

### Tests

#### Single Run
```bash
$ npm run test
```

#### Watch Files
```bash
$ npm run test:watch
```

#### Coverage
```bash
$ npm run cover
```

#### Connecting to remote APIs

Both the devmode and production servers provide a way to proxy requests to
remote HTTP APIs.  This can be useful for working around CORS issues when
developing your software.

Edit [this file](server/proxy-config.js) to mount such APIs at a given path.


