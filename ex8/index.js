var http = require('http'),
  fs = require('fs');
var port = process.argv[2] || 3000;
// Create an HTTP server
var routes ={
  "/api/friends":'datas/datas.json',
};
var srv = http.createServer(function (req, res) {
  console.log(req.url);
  if(routes[req.url]){
    res.writeHead(200, {'Content-Type': 'text/json'});
      var routeFile = routes[req.url];
      fs.readFile(routeFile, function(err,data){
        if(err) throw err
          res.end(data);
      })
  } else {
    res.writeHead(404);
    res.end('the url '+ req.url+' don\'t exist')
  }
});
srv.listen(3000,function(err){
  console.log("Server is now listening on port 3000");
});
