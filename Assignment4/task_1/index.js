'use strict';

const path = require('path');
const fs = require('fs');
const util = require('util');
const crypto = require('crypto');

const express = require('express');
const bodyParser = require('body-parser');


const pbkdf2 = util.promisify(crypto.pbkdf2);


const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');


// Middleware: request authentication if not already authenticated

// The rest of the routes
