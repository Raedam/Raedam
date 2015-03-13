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

moon.createConnection('mongodb://localhost/prueba', function(err, db){
  if(err)
    console.log(err);
  else{
    console.log("Connected to MongoDB");

}
});


router.get('/',function(req,res){

  var serch = moon.model('savePlace');

  serch.findOne({cp:'11550'}).exec(function(err,data){
    //res.send(data.lat);
  /*  res.send("<input id='lat' type='hidden' value='"+data.lat+"'/>'"
    "<input id='lon' type='hidden' value='"+data.lat+"'/>'"
    "<input id='calle' type='hidden' value='"+data.lat+"'/>'"
    "<input id='colonia' type='hidden' value='"+data.lat+"'/>'"
    "<input id='nombre' type='hidden' value='"+data.lat+"'/>'"






  ); */
  res.render('save',{title:"page"});

  });




});

module.exports = router;
