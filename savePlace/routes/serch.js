var express        =         require("express");
var bodyParser     =         require("body-parser");
var util           =         require('util');
var multer         =         require('multer')
var moon           =         require('mongoose');
var router         =         express.Router();
router.use(bodyParser.urlencoded({ extended: false }));
/*router.get('/server',function(req,res){
 res.render('../views/savePlace');
});*/
var mongoDbObj;
moon.createConnection('mongodb://localhost/prueba', function(err, db){
  if(err)
    console.log(err);
  else{
    console.log("Connected to MongoDB");

}
});


router.get('/',function(req,res){

  var serch = moon.model('savePlace');
  serch.find({}, function(err, doc) {

    // Print the result
    console.dir(doc);
    res.send(doc);

  });



});

module.exports = router;
