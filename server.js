const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;
var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

app.use(express.static(__dirname + '/public'));

app.use((req, res, next) => {
	var now = new Date().toString();

	log = `${now}: ${req.method} ${req.url}`;
	console.log(log);
	fs.appendFileSync('server.log', log + '\n', (err) => {
		if (err) {
			console.log('Error');
		}
	});
	next();
});

// app.use((req, res, next) => {
// 	res.render('maintanance.hbs', {
// 		pageTitle: 'Maintenance Page'
// 	});
// 	next();
// });

hbs.registerHelper('getCurrentYear', () => {
	return new Date().getFullYear()
});

hbs.registerHelper('screamIt', (text) => {
	return text.toUpperCase();
});

app.get('/', (request, response) => {
	response.render('home.hbs', {
		pageTitle: 'Home Page',
		welcomeMessage: 'Hello to mi first express steps'
	});
});

app.get('/about', (request, response) => {
	// response.send('<h1>Hello Express</h1>');
	response.render('about.hbs', {
		pageTitle: 'About Page'
	})
});


app.get('/bad', (request, response) => {
	response.send({
		errorMessage: 'Unable to fulfil this request'
	});
});

app.listen(port, () => {
	console.log(`Server is up on port ${port}`);
});