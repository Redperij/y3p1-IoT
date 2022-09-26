'use strict';

const path = require('path');
const express = require('express');
const ejs = require('ejs');
const serialport = require('serialport');
//const {Readline} = require('serialport/lib/parsers');
//const createInterface = require('readline').createInterface;
const SerialPort = serialport.SerialPort;
const parsers = serialport.parsers;

const app = express();
const com = new SerialPort({path: 'COM5', baudRate: 115200});

// Express setup
app.set('view engine','ejs');
app.use(express.static('views'));
app.use('/images', express.static('./images'));


// Listen on port 3001. http://localhost:3001
app.listen(3001, function () {
    console.log('Listening port 3001. http://localhost:3001');
});

app.get('/', async (req, res) => {
	res.render('home');
});

app.get('/:image', async (req, res) => {

	try {
		await com.write('a');
		await com.write('q');
		await com.on('data', function (data) {
			//let buf = data.toString();
			//console.log('Have got: ');
			//console.log(buf);
			let value = data.toString().at(0);
			if(value > 0) res.render('die', {error:0, roll:value});
		});
	} catch (error) {
		//res.render('die', {error:1, roll:0});
	}
});

app.get('/static/style.css', (req, res) => {
    res.sendFile(path.join(__dirname + '/views/style.css'));
});
