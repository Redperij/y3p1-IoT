'use strict';

const path = require('path');
const express = require('express');
const serialport = require('serialport');
const ejs = require('ejs');
const util = require('util');
const {ReadlineParser} = require('@serialport/parser-readline');
const createInterface = require('readline').createInterface;

const SerialPort = serialport.SerialPort;

const mongo = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;

const app = express();
app.set('view engine', 'ejs');

const com = new SerialPort({path: 'COM5', baudRate: 115200});

const parser = com.pipe(new ReadlineParser({ delimiter: '\r\n' }));

let HELP_ME = 0;

let client;
mongo.connect('mongodb://localhost:27017/', function (error,db) {
	if(error) throw error;
	client = db.db('temperature')
	console.log('Db is up');
});

com.on('readable', () => {
    com.read();
});

app.listen(3002, function () {
    console.log('Listening port 3002. http://localhost:3002');
});

parser.on('data', data => {
    HELP_ME = JSON.parse(data);
    let msr = JSON.parse(data);
    client.collection('temp_mes').insertOne(msr, function (error, res) {
        if (error) throw error;
        console.log('Inserted mesurement: ' + msr);
    });
});


app.get('/', (req,res) => {
    if (HELP_ME) res.render('home', {temp: HELP_ME.temperature});
    else res.render('home', {temp: 0});
    console.log(HELP_ME);
});
