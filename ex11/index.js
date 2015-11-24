'use strict';
let express = require('express'),
fs = require('fs'),
http = require('http'),
morgan = require('morgan'),
mongojs = require('mongojs');

let restaurants = require(`${__dirname}/routes/restaurants`);

let app = express();


let accessLogStream = fs.createWriteStream(`${__dirname}/logs/acces.log`,{flag:'a'});
app.use(morgan('combined', {stream:accessLogStream}));

//use static assets
app.use(express.static(`${__dirname}/public`));

//set app routes as middleWares
app.use('/api/restaurants',restaurants);



http.createServer(app).listen(80,function(){
  console.log("Express started on localhost:80 \n Press CTRL+c to terminate")
});
