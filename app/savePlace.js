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

//moon.connect('mongodb://localhost:27017/prueba');
var place = new  moon.Schema({

  calle:String,
  numero:String,
  colonia:String,
  delegacion:String,
  cp:String,
  tLugar:Number,
  fechas : {
    dEntrada:String,
    tEntrada:String,
    dSalida:String,
    tSalida:String,
  },
  //foto:String,
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
    tLugar:req.body.lugar,
    fechas : {
        dEntrada:req.body.dateE,
        tEntrada:req.body.timeE,
        dSalida:req.body.dateS,
        tSalida:req.body.timeS
        },
  //  foto:file.originalname,
    lat:req.body.lat,
    lon:req.body.lon


  });

  savePlace.save(function(err){
      if(err)
          console.log("El erro"+err);

  });

  res.send('<h1>Lugar Guardado</h1>');
});



router.get('/',function(req,res){
  res.render('registro');
});





module.exports = router;
