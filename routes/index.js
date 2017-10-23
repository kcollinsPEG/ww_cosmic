module.exports = (app, partials) => {
  require('./home')(app, partials)
  var news = require('./news')(app, partials)
  var projects = require('./projects')(app, partials)
  var blogs = require('./blogs')(app, partials)
  var marytvs = require('./marytvs')(app, partials)
  var calendars = require('./calendars')(app, partials)
  var faqs = require('./faqs')(app, partials)

  app.use('/news', news)
  app.use('/projects', projects)
  app.use('/blogs', blogs)
  app.use('/marytvs', marytvs)
  app.use('/calendars', calendars)
  app.use('/faqs', faqs)
}