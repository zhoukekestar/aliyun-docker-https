# aliyun-docker-https
Http to https for aliyun docker.

# Quick Start
* `npm install aliyun-docker-https` to install `aliyun-docker-https`;
* express

```js

var express = require('express')
  , app     = express()

app.use(require('./index.js')({
  ignore: ['/test/url$']
}));

app.listen(3000)
console.log('express listen on 3000.')

```
* koa

```js
var app = require('koa')()
app.use(require('./index.js')({
  ignore: ['/test/url$'],
  mode: 'koa'
}));
app.listen(3000)
```
* test

```bash
// 302
curl -H 'x-forwarded-proto: http' -i  http://localhost:3000/
curl -H 'x-forwarded-proto: http' -i  http://localhost:3000/test/urla
curl -H 'x-forwarded-proto: http' -i  http://localhost:3000/test/urla?a=a

// 404
curl -H 'x-forwarded-proto: https' -i  http://localhost:3000/
curl -H 'x-forwarded-proto: https' -i  http://localhost:3000/test/url
curl -H 'x-forwarded-proto: http' -i  http://localhost:3000/test/url
```

# Config
| Name | Description | Default value |
| --- | --- | --- |
| ignore | A url list should be ignored. | `*` |
| header | The header name. | `x-forwarded-proto` |
| mode | `express` or `koa` mode. | `express` |
