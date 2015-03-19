var express        =         require("express");
var bodyParser     =         require("body-parser");
var util           =         require('util');
var multer         =         require('multer');
var moon           =         require('mongoose');
var router         =         express.Router();
var done;
router.use(bodyParser.urlencoded({ extended: false }));
var place = new moon.Schema({

    calle      :  String,
    numero     :  String,
    colonia    :  String,
    delegacion :  String,
    cp         :  String,
    tLugar     :  Number,
    fechas     :  {
      dEntrada  :  String,
      tEntrada  :  String,
      dSalida   :  String,
      tSalida   :  String,
    },
    lat        :  Number,
    lon        :  Number,
    updated_at :  { type: Date, default: Date.now },
  });
var SaveP = moon.model('savePlace', place);

router.use(multer({
  dest    :  './uploads/',
  rename  :  function (filename) {
    return filename + Date.now();
  },
  onFileUploadStart    : function (file) {
    console.log(file.originalname + ' is starting ...');
  },
  onFileUploadComplete : function (file) {
    console.log(file.fieldname + ' uploaded to  ' + file.path);
    done = true;
  }
}));


router.post('/', function (req, res) {
  console.log("start bd  save");
  var savePlace = new SaveP({
      calle       :  req.body.calle,
      numero      :  req.body.numero,
      colonia     :  req.body.colonia,
      delegacion  :  req.body.delegacion,
      cp          :  req.body.cp,
      tLugar      :  req.body.lugar,
      fechas      :  {
        dEntrada  :  req.body.dateE,
        tEntrada  :  req.body.timeE,
        dSalida   :  req.body.dateS,
        tSalida   :  req.body.timeS
      },
      lat         :  req.body.lat,
      lon         :  req.body.lon
    });
  savePlace.save(function (err) {
    if (err) {
      console.log("El error" + err);
    }
  });
  res.send('<h1>Lugar Guardado</h1>');
});
router.get('/', function (res) {
  res.render('registro');
});
module.exports = router;