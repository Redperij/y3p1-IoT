'use strict';

const path = require('path');
//const fs = require('fs');
const util = require('util');
const crypto = require('crypto');

const express = require('express');
const bodyParser = require('body-parser');
const { debug } = require('console');
const { redirect } = require('express/lib/response');

const pbkdf2 = util.promisify(crypto.pbkdf2);

const app = express();

const sqlite = require('sqlite3').verbose();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use('/index', express.static(path.resolve(__dirname, 'index')));

let db = new sqlite.Database('main', (error) => {
	if(error) return console.error(error.message);
	console.log('main db is connected');
});

db.run(`CREATE TABLE IF NOT EXISTS users (
    username TEXT NOT NULL,
    password TEXT NOT NULL,
    message TEXT NOT NULL,
    UNIQUE(username, password, message)
);`
);

const username = 'admin';

//let getAllUsers = "SELECT username as username, password as password, message as message FROM users";

app.listen(3000, function () {
    console.log('Listening port 3000. http://localhost:3000');
});

// Middleware: request authentication if not already authenticated


// The rest of the routes

app.get('/', (req, res) => {
    res.render('index.ejs');
});

//Must be posting message
app.post('/', async (req, res) => {
    try {
        console.log('POST message.');

        const message = req.body.message;
		const query = 'UPDATE users SET message = \'' + message + '\' WHERE username = \'' + username + '\'';

		db.run(query, function (error, result) {
			if (error) throw error;
			console.log('Updated message: ' + query);
		});
        res.redirect('/');
	} catch (error) {
        console.log('Unable to update message.');
		res.status(500).send('Unable to update message.');
	}
});

// 'UPDATE users SET message = '$message' WHERE username = '$username'';