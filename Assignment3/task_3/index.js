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
const com = new SerialPort({path: 'COM3', baudRate: 115200});

// Express setup
app.set('view engine','ejs');
app.use(express.static('views'));
app.use('/images', express.static('./images'));


// Listen on port 3001. http://localhost:3001
app.listen(3001, function () {
    console.log('Listening port 3001. http://localhost:3001');
});

function get_uart_num () {
    let number;
    com.write('a', function (err) {
        if(err) return console.log("Error: ", err.message);
    });
    com.write('q', function (err) {
        if(err) return console.log("Error: ", err.message);
    });
    const promise = new Promise((resolve,reject) => {
        setTimeout(() => com.on('data', function (data) {
            let buffer = data.toString();
            number = buffer[buffer.search(/[2-6]/g)];
            console.log("number inside: " + Number(number));
            resolve(number)
        }), 1000)
    })
    return promise;
};

app.get('/', async (req, res) => {
	res.render('home');
});

app.get('/board_value', async (req, res) => {
	get_uart_num();
	res.redirect('/');
	/*
	let value = 0;
	console.log('Before try catch');
	setTimeout(() => {
		try {
			com.write('a');
			com.write('q');
			com.on('data', function (data) {
				let buf = data.toString();
				//console.log('Have got: ');
				//console.log(buf);
				value = buf[buf.search(/[2-6]/g)];
				//console.log('Finally value...');
			});
			console.log('After try catch');
			console.log(value);
			res.json(value);
		} catch (error) {
			res.send('Your board is broken! I guess');
		}
	}, 1000);
	*/
});

app.get('/:image', async (req, res) => {
	let result = req.params.image;
	console.log('Image exec.');
	/*await fetch('/board_value').then(res => res.json()).then(dat => {
		dat = dat.toString();
		console.log('I\'m in fetch!');
		console.log(dat);
	});*/
	console.log('After fetch call');
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
