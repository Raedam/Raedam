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

moon.connect('mongodb://localhost/prueba');
var place = new  moon.Schema({

  calle:String,
  numero:String,
  colonia:String,
  delegacion:String,
  foto:String,
  updated_at: { type: Date, default: Date.now },
});
var saveP = moon.model('saveP', place);


router.use(multer({ dest: './uploads/',
 rename: function (fieldname, filename) {
    return filename+Date.now();
  },
onFileUploadStart: function (file) {
  console.log(file.originalname + ' is starting ...')
},
onFileUploadComplete: function (file) {
  console.log(file.fieldname + ' uploaded to  ' + file.path)
  done=true;
}
}));


router.post('/',function(req,res){
  console.log("Hola");
  var savePlace = new Todo({
    calle:'Uno',
    numero:'2',
    colonia:'Suber',
    delegacion:'Iztacalco',
    foto:'uno'

  });

  savePlace.save(function(err){
      if(err)
          console.log(err);
      else
          console.log(todo);
  });
});



router.get('/',function(req,res){
  res.render('savePlace');
});





module.exports = router;
