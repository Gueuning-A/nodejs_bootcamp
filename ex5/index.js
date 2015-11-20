// // recupère les infos derrière la commande
// //node index.js toto titi tutu
// // les écrit dans un fichier list.txt



// var fs= require ("fs");
// var args = process.argv.slice(2);
//
//
// args.forEach(function(val, index, array) {
//   console.log(index + ': ' + val);
//
// if (index=0){
//   fs.writeFile('result.txt',val,function(err,data){
//     if (err) throw err;
//     console.log("great");
//
//   });
// } else{
//   fs.appendFile('result.txt', val + "\n", function (err) {
//     console.log("great value");
// });
// }
//
// });





// //version prof

var fs = require('fs');
var utils = require ('../modules/utils');
var args = process.argv;
var elements = null;
(args[2])? elements = args[2].split(','):elements=[];

fs.stat('list.txt', function (err,stat) {
  if (err == null){
    console.log('File exists');
    updateFile();

  }else if (err.code == 'ENOENT') {
    console.log('File don\'t exist');
    fs.writeFile('list.txt','',function(err){
      if (err) throw err;
      updateFile();
    });

  } else {
    console.log('Some other error: ',err.code);
  }
});

function updateFile(){
  fs.readFile('list.txt',function(err,data){
    if (err) throw err;
    var filedata = data.toString('utf8').split('\n');
    var finalData = filedata.concat(elements);
    console.log(finalData);
    fs.writeFile('list.txt',utils.createNiceListOfFiles(finalData),function(err) {
      console.log('great done');
    });
  });
}




// //version avec appendFile()

// var fs = require('fs');
// var utils = require ('../modules/utils');
// var args = process.argv;
// var elements = null;
// (args[2])? elements = args[2].split(','):elements=[];
//
// fs.appendFile('list.txt',utils.createNiceListOfFiles(elements), function(err) {
//   if (err) throw err;
//   console.log('Great');
// });
