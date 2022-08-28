'use strict';

const path = require('path');
const express = require('express');
const ejs = require('ejs');
const bodyParser = require('body-parser');
const res = require('express/lib/response');
const { query } = require('express');

const app = express();

app.set('view engine','ejs');
app.use(express.static('views'));

// Listen on port 3000. http://localhost:3000
app.listen(3000, function () {
    console.log('Listening port 3000');
});


app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname + '/views' + '/home.html'));
	if(req.query.roll) {
        res.render('die', {roll:req.query.roll});
		//UpdatePicture(req.query.roll);
    }
});

app.get('/die.js', (req, res) => {
	res.sendFile(path.join(__dirname + '/die.js'));
});

app.get('/images/1.png', (req, res) => {
	res.sendFile(path.join(__dirname + '/images/1.png'));
});

app.get('/images/2.png', (req, res) => {
	res.sendFile(path.join(__dirname + '/images/2.png'));
});

app.get('/images/3.png', (req, res) => {
	res.sendFile(path.join(__dirname + '/images/3.png'));
});

app.get('/images/4.png', (req, res) => {
	res.sendFile(path.join(__dirname + '/images/4.png'));
});

app.get('/images/5.png', (req, res) => {
	res.sendFile(path.join(__dirname + '/images/5.png'));
});

app.get('/images/6.png', (req, res) => {
	res.sendFile(path.join(__dirname + '/images/6.png'));
});
