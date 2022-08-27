'use strict';

const path = require('path');
const express = require('express');

const app = express();


// Express setup


app.get('/', (req, res) => {
	// Send a landing page
});


app.get('/image', (req, res) => {
	// Return a die template
});


app.listen(3000);
