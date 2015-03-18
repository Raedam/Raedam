var app        =         require("express")();
var bodyParser     =         require("body-parser");
var util           =         require('util');
var multer         =         require('multer')
var moon           =         require('mongoose');
//var router         =         express.Router();
var server         =         require('http').Server(app);
var io            =          require('socket.io')(server);

app.use(bodyParser.urlencoded({ extended: false }));
/*router.get('/server',function(req,res){
 res.render('../views/savePlace');
});*/
global.points;
moon.createConnection('mongodb://rafa.com/prueba', function(err, db){
  if(err)
    console.log(err);
  else{
    console.log("Connected to MongoDB");

}
});


app.get('/',function(req,res){

  var serch = moon.model('savePlace');

  serch.find({}).select('lat lon').exec(function(err,data){
    console.log(data);
    global.points=data;

    console.log(global.points);
    res.render('busqueda');
  });

});

io.on('connection', function (socket) {
  console.log('hola');
  socket.emit('news', { hello: 'world' });
  socket.on('my other event', function (data) {
    console.log(data);
  });
});



module.exports = app;
