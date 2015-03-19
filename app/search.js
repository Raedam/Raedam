var app            =         require("express")();
var bodyParser     =         require("body-parser");
var util           =         require('util');
var multer         =         require('multer');
var moon           =         require('mongoose');

app.use(bodyParser.urlencoded({ extended: false }));
global.points;
moon.createConnection('mongodb://rafa.com/prueba', function (err) {
  if (err) {
    console.log(err);
  } else {
    console.log("Connected to MongoDB");
  }
});
app.get('/', function (req, res) {
  var serch = moon.model('savePlace');
  serch.find({}).select('lat lon').exec(function (data) {
    console.log(data);
    global.points = data;
    console.log(global.points);
    res.render('busqueda');
  });

});
module.exports = app;