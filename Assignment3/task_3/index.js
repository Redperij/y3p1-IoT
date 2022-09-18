'use strict';

const path = require('path');
const express = require('express');
const ejs = require('ejs');
const serialport = require('serialport');
const {Readline} = require("serialport/lib/parsers");
const createInterface = require('readline').createInterface;
const SerialPort = serialport.SerialPort;
const parsers = serialport.parsers;

const app = express();



// Express setup
app.set('view engine','ejs');
app.use(express.static('views'));
app.use('/images', express.static('./images'));
// Serialport setup

// Listen on port 3000. http://localhost:3000
app.listen(3000, function () {
    console.log('Listening port 3000. http://localhost:3000');
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
	//send 'a' followed by 'q' to the µC over UART to get two strings back(also over UART)
	// The second string will contain the die value followed by a space and then a string of bits
	// Example: Send(button down) 'a' get back "0 0000000" send(button up) 'q' receive "5 1011101" 
	// in the above example 5 is the value that you should serve to the client
	// Return a die template
});

app.get('/static/style.css', (req, res) => {
    res.sendFile(path.join(__dirname + '/views/style.css'));
});

app.listen(3000);
