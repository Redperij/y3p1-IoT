//npm install node --safe
//node index.js
//npm install -g nodemon
//nodemon index.js

'use strict';

const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Listen on port 3000.
app.listen(3000, function () {
    console.log('Listening port 3000');
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/static' + '/home.html'));
});

app.get('/static/style.css', (req, res) => {
    res.sendFile(path.join(__dirname + '/static' + '/style.css'));
});

app.get('/static/home_style.css', (req, res) => {
    res.sendFile(path.join(__dirname + '/static' + '/home_style.css'));
});

app.get('/:name', (req, res) => {
    res.sendFile(path.join(__dirname + '/static' + '/age.html'));
    if (req.query.age) {
        if (req.query.age > 10) {
            return res.send('Welcome ' + req.params.name + '!');
        } else if (req.query.age >= 0){
            return res.send(req.params.name + ', you are too young to visit this site!');
        }
    }
});

app.get('/:name/*', (req, res) => {

    if (req.query.age) {
        return res.redirect('/' + req.params.name + '?age=' + req.query.age);
    }
    res.redirect('/' + req.params.name);
});

app.post('/', (req, res) => {
    let name = req.body.name;
    res.redirect('/' + name);
});