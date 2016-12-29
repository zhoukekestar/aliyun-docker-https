

module.exports = function(config) {

  var header = config.header || 'x-forwarded-proto'
    , ignore = config.ignore || []
    , mode = config.mode || 'express'

  // Express exports
  if (mode === 'express') {

    return function(req, res, next) {

      // Get request protocol.
      var http = req.headers[header] || '';
      http = http === 'http' ? true : false;

      if (http) {

        var ignoreIt = false;

        for (var i = 0; i < ignore.length; i++) {

          var reg = new RegExp(config.ignore[i]);
          if (reg.test(req.originalUrl)) {
            ignoreIt = true;
            next();
            break;
          }
        }

        if (!ignoreIt) {
          res.redirect('https://' + req.headers.host + req.originalUrl);
        }

      } else {
        next();
      }
    }

  // Koa exports
  } else {

    return function* (next) {
      // Get request protocol.
      var http = this.request.headers[header] || '';
      http = http === 'http' ? true : false;

      if (http) {
        var ignoreIt = false;

        for (var i = 0; i < ignore.length; i++) {

          var reg = new RegExp(config.ignore[i]);
          if (reg.test(this.request.originalUrl)) {
            ignoreIt = true;
            yield next
            break;
          }
        }

        if (!ignoreIt) {
          this.redirect(this.request.href.replace('http', 'https'));
        }

      } else {
        yield next
      }
    }

  }
}

//
// curl -H 'x-forwarded-proto: http' -i  http://localhost:3000/
// curl -H 'x-forwarded-proto: https' -i  http://localhost:3000/
