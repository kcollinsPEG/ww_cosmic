import * as cosmicCalls from './cosmic-calls';

var pages = {
    '': [{type: 'globals', list: [true]},{type: 'pages', list: [false , 'home']}],
    'about': [{type: 'globals', list: [true]},{type: 'pages', list: [false , 'ww-difference']}],
    'join': [{type: 'globals', list: [true]}],
    'speaking': [{type: 'globals', list: [true]},{type: 'pages', list: [false , 'speaking']}],
    'book': [{type: 'globals', list: [true]}],
    'terms': [{type: 'globals', list: [true]},{type: 'pages', list: [false , 'terms-conditions']}],
    'contact': [{type: 'globals', list: [true]}],
    'policy': [{type: 'globals', list: [true]},{type: 'pages', list: [false , 'privacy-policy']}],
    'thank-you': [{type: 'globals', list: [true]}],
    'newsletter-popup': [{type: 'globals', list: [true]}],
    'modernluxury': [{type: 'globals', list: [true]},{type: 'pages', list: [false , 'modernluxury']}],

};

var routes = (app, partials) => {
  app.get('(?!/blogs|/projects|/marytvs|/calendars|/faq)(/((\\w+-?){1,3})?)', function (req, res, next) {
    var path = req.url.replace(/(\/)|(\?.*)/g, '')
    if (pages.hasOwnProperty(path)) {
      cosmicCalls.getData(partials, path, pages[path], res);
      /*let page = (path === '') ? 'index.html' : path + '.html'

      return res.render(page, {
      partials
      })*/
    } else {
      console.log('there');
       return res.status(404).render('404.html', {
           partials
       })
    }
  })
}

module.exports = routes;
