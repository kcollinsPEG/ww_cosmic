import express from 'express'
import hogan from 'hogan-express'

const app = express();

app.engine('html', hogan);

var port = process.env.PORT || 5000;
app.set('port', port);

app.use(express.static('dist'));

const partials = {
  header: 'partials/header',
  navigation: 'partials/navigation',
  navigation_light: 'partials/navigation-light',
  form1: 'partials/form-01',
  form2: 'partials/form-02',
  footer: 'partials/footer',
  footer1: 'partials/footer1',
  newsletter_pop: 'partials/newsletter-pop'
}

require('./routes')(app, partials);
require('./routes/contact-email')(app);
require('./routes/subscriber-email')(app);
require('./routes/book-now-email')(app);
require('./routes/join-us-email')(app);
require('./routes/signup-email')(app);

app.listen(app.get('port'));

// Handle unhandledRejection
process.on('unhandledRejection', function(err) {
	if(app.get('env') === 'development') {
		console.log('unhandledRejection: ', err.message, err.stack);
	}
});
