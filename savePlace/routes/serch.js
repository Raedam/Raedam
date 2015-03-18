var express        =         require("express");
var bodyParser     =         require("body-parser");
var util           =         require('util');
var multer         =         require('multer')
var moon           =         require('mongoose');
var router         =         express.Router();
router.use(bodyParser.urlencoded({ extended: false }));

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
        res.render('save',{title:"page"});
    });
});
module.exports = router;
