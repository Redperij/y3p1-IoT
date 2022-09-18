'use strict';

const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const { debug } = require('console');
const { redirect } = require('express/lib/response');

const app = express();

const mongo = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/index', express.static(path.resolve(__dirname, 'index')));

let client;
mongo.connect('mongodb://localhost:27017/', function (error,db) {
	if(error) throw error;
	client = db.db('store')
	console.log('Db is up');
})

app.listen(3000, function () {
    console.log('Listening port 3000. http://localhost:3000');
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/index/index.html'));
});

app.get('/cars', async (req, res) => {
	try {
		client.collection('carstore').find({}).toArray(function (error,result) {
			if(error) throw error;
			res.send(result);
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
        const car = {producer, model, mileage, year, plate};

		client.collection('carstore').insertOne(car, function (error, res) {
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
		const query = { producer: req.params.producer };
		client.collection('carstore').find(query).toArray(function (error, result) {
			if (error) throw error;
			if(result.toString().length) res.send(result);
			else res.status(404).send('Car/s with make \'' + req.params.producer + '\' was not found');
		});
	} catch (error) {
		res.status(500).send('Unable to get cars of specified make.');
	}
});

app.delete('/:car', async (req, res) => {
    try {
        console.log('DELETE car.');
		const car_id = req.params.car;
		const query = {_id:ObjectId(car_id)};
		client.collection('carstore').deleteOne(query, function (error,obj){
			if(error) throw error;
			console.log('Deleted car id: ' + car_id);
			res.sendStatus(200);
		});

	} catch (error) {
        console.log('Unable to delete car.');
		res.sendStatus(200);
	}
});

app.get('/:car', async (req, res) => {
    console.log(':car worked');
    try {
		const id = req.params.car;
		const query = {_id:ObjectId(id)};
		client.collection('carstore').find(query).toArray(function (error, result) {
			if (error) throw error;
			if(result.toString().length) res.send(result);
			else res.status(404).send('Car with id \'' + id + '\' was not found');
		});
	} catch (error) {
		res.status(500).send('Unable to get cars.');
	}
});