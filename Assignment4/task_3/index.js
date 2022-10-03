'use strict';

const path = require('path');
const express = require('express');
const serialport = require('serialport');
const {ReadlineParser} = require('@serialport/parser-readline');
const createInterface = require('readline').createInterface;

const SerialPort = serialport.SerialPort;

const app = express();
app.set('view engine', 'ejs');
app.use('/images', express.static('./images'));

const com = new SerialPort({path: 'COM3', baudRate: 115200});

app.listen(3002, function () {
    console.log('Listening port 3002. http://localhost:3002');
});

app.get('/', (req,res) => {
    let temp = 0;
    const promise = new Promise((resolve, reject) => {
        
        com.on('readable', () => {
            com.read();
        });
        com.on('data', function (data) {
            temp = data.toString();
            if(temp) {
                resolve(temp);
            }else{
                temp = "Error"
                resolve(temp)
            }
        });
    }).then(( temp => console.log(temp)));
});
