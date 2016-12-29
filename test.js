
var express = require('express')
  , app     = express()

app.use(require('./index.js')({
  ignore: ['/test/url$']
}));

app.listen(3000)
console.log('express listen on 3000.')

/*
curl -H 'x-forwarded-proto: http' -i  http://localhost:3000/
curl -H 'x-forwarded-proto: https' -i  http://localhost:3000/
curl -H 'x-forwarded-proto: https' -i  http://localhost:3000/test/url
curl -H 'x-forwarded-proto: http' -i  http://localhost:3000/test/url
curl -H 'x-forwarded-proto: http' -i  http://localhost:3000/test/urla
*/
