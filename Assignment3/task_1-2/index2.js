'use strict';

const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const crypto = require('crypto');
const { debug } = require('console');
const { redirect } = require('express/lib/response');

const app = express();

const sqlite = require('sqlite3').verbose();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/index', express.static(path.resolve(__dirname, 'index')));

let db = new sqlite.Database('Store', (error) => {
	if(error) return console.error(error.message);
	console.log('Store db is connected');
});

db.run(`CREATE TABLE IF NOT EXISTS Cars (
    Producer TEXT NOT NULL,
    Model TEXT NOT NULL,
    Mileage TEXT NOT NULL,
	Year TEXT NOT NULL,
    Plate TEXT NOT NULL,
    _id TEXT NOT NULL,
    UNIQUE(Producer, Model, Mileage, Year, Plate, _id)
);`
);

let getAllCars = "SELECT Producer as producer, Model as model, Mileage as mileage, Year as year, Plate as plate, _id FROM Cars";

app.listen(3000, function () {
    console.log('Listening port 3000. http://localhost:3000');
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/index/index.html'));
});

app.get('/cars', async (req, res) => {
	try {
		db.all(getAllCars, (error, rows) => {
			if(error) throw  error;
			res.send(rows);
		});
	} catch (error) {
		res.status(500).send('Unable to get cars.');
	}
});

app.get('/add_car', (req, res) => {
    res.sendFile(path.join(__dirname + '/index/add_car.html'));
});

app.post('/', async (req, res) => {
    try {
        console.log('POST car.');

        const producer = req.body.producer;
        const model = req.body.model;
        const mileage = req.body.mileage;
        const year = req.body.year;
        const plate = req.body.plate;
		const _id = crypto.randomUUID();
		const car = 'INSERT INTO Cars (Producer, Model, Mileage, Year, Plate, _id) VALUES ($producer, $model, $mileage, $year, $plate, $_id)';

		db.run(car, {$producer: producer, $model: model, $mileage: mileage, $year: year, $plate: plate, $_id: _id}, function (error, result) {
			if (error) throw error;
			console.log('Inserted car: ' + car);
		});
        res.redirect('/');
	} catch (error) {
        console.log('Unable to add car.');
		res.status(500).send('Unable to add car.');
	}
});

app.get('/makes/:producer', async (req, res) => {
	try {
		const query = 'SELECT * FROM Cars WHERE Producer = ?';
		db.all(query, [req.params.producer], (error, result) => {
			if (error) throw error;
			if(result) {
				console.log(result);
				res.send(result);
			}
			else res.status(404).send('Cars with producer \'' + req.params.producer + '\' were not found')
		});
	} catch (error) {
		res.status(500).send('Unable to get cars of specified make.');
	}
});

app.delete('/:car', async (req, res) => {
    try {
        console.log('DELETE car.');
		const query = 'DELETE FROM Cars WHERE _id = ?';
		db.all(query, [req.params.car], (error, result) => {
			if (error) throw error;
			if(result) {
				console.log(result);
				res.send(result);
			}
			else res.status(200).send('Car with id \'' + req.params.car + '\' was not found.')
		});

	} catch (error) {
        console.log('Unable to delete car.');
		res.sendStatus(200);
	}
});

app.get('/:car', async (req, res) => {
    console.log(':car worked');
    try {
		const query = 'SELECT * FROM Cars WHERE _id = ?';
		db.all(query, [req.params.car], (error, result) => {
			if (error) throw error;
			if(result) {
				console.log(result);
				res.send(result);
			}
			else res.status(404).send('Car with id \'' + req.params.car + '\' was not found')
		});
	} catch (error) {
		res.status(500).send('Unable to get cars.');
	}
});