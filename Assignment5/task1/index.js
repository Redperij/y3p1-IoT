'use strict';

const path = require('path');
const express = require('express');
const ejs = require('ejs');
const util = require('util');

const app = express();
app.set('view engine', 'ejs');

app.listen(3000, function () {
    console.log('Listening port 3000. http://localhost:3000');
});

app.get('/', (req,res) => {
    res.render('home');
});

app.get('/thermometer.svg', (req,res) => {
    res.sendFile(path.join(__dirname + '/thermometer.svg'));
});

app.get('/style.css', (req,res) => {
    res.sendFile(path.join(__dirname + '/style.css'));
});

app.get('/script.js', (req,res) => {
    res.sendFile(path.join(__dirname + '/script.js'));
});