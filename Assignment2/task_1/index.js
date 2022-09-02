'use strict';

const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs/promises');

const app = express();
const fileName = 'smth.txt';
const bd = 'index/products.json';

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/index', express.static(path.resolve(__dirname, 'index')));


// Listen on port 3000. http://localhost:3000
app.listen(3000, function () {
    console.log('Listening port 3000');
});

/***************************/
/*      Redirections       */
/***************************/

app.get('/', (req, res) => {
    console.log('Hello?');
    res.sendFile(path.join(__dirname + '/index/index.html'));
    /*
    async function test() {
        try {
            let data = await fs.readFile(bd, 'utf-8');
            console.log(data);
            let parsed_data = JSON.parse(data);
            console.log(parsed_data);
            let newdata = parsed_data.products[0].Name;
            //console.log(parsed_data.products[0]);
            for(const product of parsed_data.products) {
                if(newdata != product.Name) newdata += product.Name + '\n';
                else newdata += '\n';
            }
            console.log(newdata);
            res.send(newdata);
        } catch (error) {
            console.log(error);
        }
    }
    test();
    */
   
});