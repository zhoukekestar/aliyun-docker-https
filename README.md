# ip-checker
Check client ip for koa & express.

# Quick Start
* `npm install ip-checker` to install `ip-checker`;
* express

```js

var express = require('express')
  , app     = express();
app.use(require('ip-checker')({
  default: 'x',
  allow: ['127.0.0.1']
}));
app.listen(3000)

```
* koa

```js
var app = require('koa')()
app.use(require('ip-checker')({
  default: 'x',
  allow: ['127.0.0.1'],
  mode: 'koa'
}))
app.listen(3000)
```
* test

```bash
curl -H 'x-forwarded-for: 127.0.0.2' -i  http://localhost:3000/
curl -H 'x-forwarded-for: 127.0.0.1' -i  http://localhost:3000/
```

# Config
| Name | Description | Default value |
| --- | --- | --- |
| ignore | A url list should be ignored. | `*` |
| header | The header name. | `x-forwarded-proto` |
| mode | `express` or `koa` mode. | `express` |
