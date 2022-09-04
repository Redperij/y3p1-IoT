'use strict';

const path = require('path');
const express = require('express');
const app = express();
const ejs = require('ejs');
const cookie = require('cookie-parser');
const bodyParser = require('body-parser');

app.set('view engine', 'ejs');
app.use(cookie());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/views', express.static('./views'))


app.listen(3000, function () {
    console.log('Listening port 3000. http://localhost:3000');
});

app.post('/clear', async (req, res) => {
    res.clearCookie('events');
    console.log('Cleared cookies.');
    res.status(200);
});

app.post('/event', async (req, res) => {
    const name = req.body.name;
    const date = req.body.date;
    console.log('name = ' + name);
    console.log('date = ' + date);
    if(!name || !date) {
        res.status(400).send('Must receive event name and date.');
        return;
    }
    const events = JSON.parse(req.cookies.events ?? '[]');
    
    for(const event of events){
       if(event.name == name){
           res.status(400).send('Such event already exists.');
           return;
       }
    }
    
    events.push({name, date});
    res.cookie('events', JSON.stringify(events), {maxAge:86400000});
    res.redirect('/');
});

app.get('/', async (req, res) => {
    const events = JSON.parse(req.cookies.events ?? '[]');
    console.log('Cookies: ', req.cookies);
    res.render('index', {events});
});