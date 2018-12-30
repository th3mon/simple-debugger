# SimpleDebugger

SimpleDebugger works like console.log(). It puts messages into DOM.

## CI Status
master: [![CircleCI](https://circleci.com/gh/th3mon/simple-debugger/tree/master.svg?style=svg)](https://circleci.com/gh/th3mon/simple-debugger/tree/master) develop: [![CircleCI](https://circleci.com/gh/th3mon/simple-debugger/tree/develop.svg?style=svg)](https://circleci.com/gh/th3mon/simple-debugger/tree/develop)

## How to use it

### In browser as <script> tag

`<script src="simple-debugger.min.js"></script>`

You will need add CSS file also to your web page.

`<link href="simple-debugger.css" rel="stylesheet">`

Then create **Logger** instance and use it.

```js
const loggerId = 0;
const logger = new SimpleDebugger.Logger(loggerId);
```

You can check if it works, so add some test message by Logger.

```js
logger.add('Testing');
```

Message should appear on your website.

You can check [demo] files.

### In app by npm

First install SimpleDebugger.

```sh
npm i -D github:th3mon/simple-debugger
```

Then import it where you can use it.

```js
import { Logger } from 'simple-debugger';

class SomeClassInYourApp {
  constructor() {
    const loggerId = 0;
    const logger = new SimpleDebugger.Logger(loggerId);

    logger.add('Testing');
  }
}
```

Remember that Logger works on DOM so your module should be on Frontend part of your application.

## Getting Started

### Install dependencies
```sh
npm i
```

### Scripts

#### Dev
```sh
npm run dev
```

#### Dist
```sh
npm run build
```

#### Run dev server
```sh
npm start
```

#### Run tests
```sh
npm test
```

#### Run tests on watch
```sh
npm run test:watch
```

#### Run tests coverage
```sh
npm run test:coverage
```

## Libraries and Tools

### Webpack

Used plugins:
- [Webpack]
- [Babel]

[Webpack]: https://webpack.js.org
[Babel]: babeljs.io
[demo]: https://github.com/th3mon/simple-debugger/tree/master/demo
