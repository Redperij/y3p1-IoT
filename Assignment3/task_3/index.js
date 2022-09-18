'use strict';

const path = require('path');
const express = require('express');
const serialport = require('serialport');
const {Readline} = require("serialport/lib/parsers");
const createInterface = require('readline').createInterface;
const SerialPort = serialport.SerialPort;
const parsers = serialport.parsers;

const app = express();



// Express setup

// Serialport setup

app.get('/', (req, res) => {
	// Send a landing page
});


app.get('/image', (req, res) => {
	//send 'a' followed by 'q' to the µC over UART to get two strings back(also over UART)
	// The second string will contain the die value followed by a space and then a string of bits
	// Example: Send(button down) 'a' get back "0 0000000" send(button up) 'q' receive "5 1011101" 
	// in the above example 5 is the value that you should serve to the client
	// Return a die template
	
});


app.listen(3000);
