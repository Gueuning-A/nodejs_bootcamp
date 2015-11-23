var fs = require('fs'),
  moment = require('moment'),
  express = require('express'),
  app = express(),
  _ = require('lodash');


//afficher date dans node.js
app.use(function(req,res,next){
  console.log(moment().format()+ '||' +req.url+ '||' +req.method);
  next();
});


//si cette adresse alors : lire fichier json
app.get('/api/friends', function(req, res){
  fs.readFile('datas/datas.json', function(err,data){
    if (err) throw err;
    res.json(JSON.parse(data.toString('utf8')));
  })
});

app.get('/api/friends/:id', function ( req, res, next ) {
  var id = parseInt(req.params.id);
  fs.readFile('datas/datas.json',function(err,data){
    if (err) throw err;
    var friends = JSON.parse(data.toString('utf8')).friends;
    console.log(friends);
    res.json(_.find(friends, {'id':id}));
  })
});

//si pas trouvé l'adress -> envoie 404
app.use(function(req, res, next) {
  res.status(404);
  res.send('The page '+req.url+' don\'t exist');
});

//ecoute port 3000
app.listen(3000,function(){
  console.log("Express started on localhost:3000 \n Press CTRL+c to terminate")
});
