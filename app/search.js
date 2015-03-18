var app        =         require("express")();
var bodyParser     =         require("body-parser");
var util           =         require('util');
var multer         =         require('multer')
var moon           =         require('mongoose');
//var router         =         express.Router();
var ws = require("nodejs-websocket");


app.use(bodyParser.urlencoded({ extended: false }));
/*router.get('/server',function(req,res){
 res.render('../views/savePlace');
});*/
global.points;
moon.createConnection('mongodb://localhost/prueba', function(err, db){
  if(err)
    console.log(err);
  else{
    console.log("Connected to MongoDB");

}
});


app.get('/all',function(req,res){

  var serch = moon.model('savePlace');

  serch.find({}).select('lat lon').exec(function(err,data){
    res.json(data);



   });
});

 app.get('*',function(req,res){

   res.render('busqueda.ejs');
 });



module.exports = app;
