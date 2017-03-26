var express = require('express');
var router = express.Router();

router.get('/', function(req, res){
   //res.send('respond with a resource')
   res.render('order', {});
});

module.exports = router;