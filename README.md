# flowchat-map-i18n

[i18n](https://github.com/mashpie/i18n-node) output mapping for [Flowchat](https://github.com/maciejzasada/flowchat)

# Getting started

## Install

```sh
$ npm install --save flowchat-map-i18n
```
or

```sh
$ yarn add flowchat-map-i18n
```

# Usage

#### app.js

```javascript
import { Flowchat } from 'flowchat';
const FlowchatMapI18n = require('./flowchat-map-i18n.js');

const i18nMap = new FlowchatMapI18n();

i18nMap.configure({
    locales:['en', 'pl'],
    defaultLocale: 'en',
    directory: __dirname + '/../locales'
});

const bot = new Flowchat();

bot.output
  .map(i18nMap.output())
  .subscribe(({ data, sessionId }) => {
    console.log(data);
  });

```

#### flows/helloI18n.js

```javascript
import { send } from 'flowchat';

// const activator ...
// const reducer ...

const saga = function* (input, state, sessionId) {
  yield send({ i18n: { phrase: 'hello', locale: state.locale } }, sessionId);
}
```
