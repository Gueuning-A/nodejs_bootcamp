var fs = require("fs");
fs.readFile('fake.txt', function (err, data) {
  if (err) throw err; //permet d'avoir un message d'erreur si il y en a une (throw arrete l'execution)
  var inData = data.toString(); // toString() pour recuperer des chaines de caracteres et non du binaire ou hexadecimal
  var lineCount= inData.split("\n").length; //split=insere les éléments dans un tableau, "\n" = a chauqe passement de ligne .length=compte le nombre de case de tableau
  console.log(lineCount)


});
