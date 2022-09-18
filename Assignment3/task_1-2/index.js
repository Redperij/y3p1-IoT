'use strict';

const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs/promises');
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
	client = db.db('mydb')
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
		//const cars = await fs.readFile(path.resolve(__dirname, db)).then(data => JSON.parse(data));
		//res.json(cars);
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
		/*
		const cars = await fs.readFile(path.resolve(__dirname, db)).then(data => JSON.parse(data));
        console.log('Have got:\n' + JSON.stringify(cars));
        let uid;
        let uid_flag = 0;
        console.log('Before loop.');
        if (cars.length != 1048576) {
            console.log('If statement.');
            while (uid_flag == 0){
                if (cars.length != 1048576) {
                    uid = Math.floor(Math.random() * 1048575);
                    uid_flag = 1;
                    for (const car of cars) {
                        if(car.id == uid) {
                            uid_flag = 0;
                        }
                    }
                } else {
                    console.log('Unable to generate unique car id.');
                    res.status(500).send('Unable to generate unique car id.');
                }
            }
        }
		*/
        
        const producer = req.body.producer;
        const model = req.body.model;
        const mileage = req.body.mileage;
        const year = req.body.year;
        const plate = req.body.plate;
        //const id = uid.toString();
        const car = {producer, model, mileage, year, plate};//, id};
        //cars.push(car);
        //console.log('Just before writing.');
        //console.log(cars);
        //await fs.writeFile(path.resolve(__dirname, db), JSON.stringify(cars)).catch(error => console.error('Failed to write file:', error));
    	//console.log('Got to the end.');

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
		/*
		const cars = await fs.readFile(path.resolve(__dirname, db)).then(data => JSON.parse(data));
        console.log('Have got:\n' + JSON.stringify(cars));
        let found_flag = 0;
        console.log('Before loop.');

        for(let i = 0; i < cars.length; ++i) {
            if(cars[i].id == req.params.car) {
                found_flag = 1;
                console.log('FOUND IT!');
                console.log(cars[i]);
                delete cars[i];
                console.log('DELETED IT!');
            }
        }

        if(found_flag == 1) {
            console.log('Now I have:');
            console.log(cars.filter(c => c !== null));
            await fs.writeFile(path.resolve(__dirname, db), JSON.stringify(cars.filter(c => c !== null))).catch(error => console.error('Failed to write file:', error));
            res.sendStatus(200);
            console.log('DELETE End.');
        } else {
            console.log('Unable to find car to delete.');
		    res.sendStatus(200);
        }
		*/
		const id = req.params.car;
		const query = {_id:ObjectId(id)};
		client.collection('carstore').deleteOne(query, function (error,obj){
			if(error) throw error;
			console.log('Deleted car id: ' + id);
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
		/*
		const cars = await fs.readFile(path.resolve(__dirname, db)).then(data => JSON.parse(data));
        console.log(cars);
        let foundCar;
        for (const car of cars) {
            if(car.id == req.params.car) {
                foundCar = car;
            }
        }
        if (foundCar) {
            res.send(JSON.stringify(foundCar));
        } else {
            res.status(500).send('Unable to get car with such id.');
        }
		*/
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