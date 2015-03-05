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
  cp:String,
  foto:String,
  lat:Number,
  lon:Number,
  updated_at: { type: Date, default: Date.now },
});
var saveP = moon.model('savePlace', place);


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
  var savePlace = new saveP({

    foto:file.originalname,
  });
}
}));


router.post('/',function(req,res){
  console.log("start bd  save");
  var savePlace = new saveP({
    calle:req.body.calle,
    numero:req.body.numero,
    colonia:req.body.colonia,
    delegacion:req.body.delegacion,
    cp:req.body.cp,
  //  foto:file.originalname,
    lat:req.body.la,
    lon:req.body.lo

  });

  savePlace.save(function(err){
      if(err)
          console.log(err);
      else
          console.log(err);
  });
});



router.get('/',function(req,res){
  res.render('savePlace');
});





module.exports = router;
