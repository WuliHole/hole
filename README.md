[![Circle CI](https://circleci.com/gh/WuliHole/hole.svg?style=svg)](https://circleci.com/gh/WuliHole/hole)

# Hole

WuliHole

# Screenshot
![screentshot](./Screenshot.jpeg)
## npm scripts

### Dev
```bash
$ yarn dev:client
```

This runs a development mode server with live reload etc.

Open `http://localhost:8080` in your browser.

### Prodduction
> coming soon

### Tests

#### Single Run
```bash
$ yarn test
```

#### Watch Files
```bash
$ yarn test:watch
```

#### Coverage
```bash
$ yarn cover
```

#### Connecting to remote APIs

Both the devmode and production servers provide a way to proxy requests to
remote HTTP APIs.  This can be useful for working around CORS issues when
developing your software.

Edit [this file](server/proxy-config.js) to mount such APIs at a given path.


