var express = require('express');
var router = express.Router();
var data = require('../public/data/data.json');

var Order = require('../models/order');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { data: data });
});

//REST API
router.get('/api/orders/:type/:content', function(req, res){
  var search = {};
  if(req.params.type && req.params.content){
    if(req.params.type === 'tel'){
        search.tel = req.params.content;
    }
    else if(req.params.type === 'address'){
      search.address = req.params.content;
    }

  }
    Order.find(search,function(err, orders){
        if(err){
            return res.status(500).json({error: "Failed to get all order"});
        }
        res.json(orders);
    });
});

router.post('/api/orders', function(req, res){
   console.log(req.body);
   var order = new Order(req.body);
   order.save(function(err){
       if(err){
           return res.status(500).json({error: "Failed to save the order"});
           //return res.render('error', {error: {status: err.status, stack: err.stack}})
       }

   });

   res.json({msg: "success"});
});

module.exports = router;
