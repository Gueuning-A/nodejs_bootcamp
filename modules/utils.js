function utils(){


  //API PRIVEE
  function createNiceListOfFiles(arrFiles){
    return arrFiles.join('\n');
  }

  var that = {};
  that.createNiceListOfFiles = createNiceListOfFiles;
  return that;
}
module.exports = utils();
