'use strict';

const path = require('path');
const express = require('express');
const ejs = require('ejs');

const app = express();

app.set('view engine','ejs');
app.use(express.static('views'));
app.use('/images', express.static('./images'));

// Listen on port 3000. http://localhost:3000
app.listen(3000, function () {
    console.log('Listening port 3000');
});

app.get('/', (req, res) => {
	res.render('home');
});

app.get('/:image', (req, res) => {
	let result = req.params.image;
	if (!isNaN(result) && result > 0 && result < 7) {
		res.render('die', {error:0, roll:result});
	} else {
		res.render('die', {error:1, roll:0});
	}
	
});

app.get('/static/style.css', (req, res) => {
    res.sendFile(path.join(__dirname + '/views/style.css'));
});