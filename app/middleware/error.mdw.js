module.exports = function (app) {
    app.use(function (req, res) {
      res.render('404', {
        layout: 'error'
      })
    });
  
    // default error handler
    app.use(function (err, req, res, next) {
      console.error(err.stack);
      res.render('500', {
        layout: 'error'
      })
    })
  }