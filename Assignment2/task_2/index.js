'use strict';

const path = require('path');
const express = require('express');
const os = require('os');

const app = express();

app.use('/index', express.static(path.resolve(__dirname, 'index')));

app.listen(3000, function () {
    console.log('Listening port 3000. http://localhost:3000');
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/index/index.html'));
});

app.get('/ram', async (req, res) => {
    const tram = os.totalmem();
    const aram = tram - os.freemem();
    const rram = Math.floor(aram / tram * 100);
    const ram = {aram, rram};
    res.json(ram);
});