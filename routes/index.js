var express = require('express');
var router = express.Router();
const data = require('../public/data/data.json');

var Order = require('../models/order');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { data: data });
});

//REST API
router.get('/api/orders', function(req, res){
  var search = {};
  var params = req.query;
    if(params.tel){
        search.tel = params.tel;
    }
    if(params.address){
      search.address = params.address;
    }
    Order.find(search).limit(100).exec(function(err, orders){
        if(err){
            return res.status(500).json({error: "Failed to get all order"});
        }
        //res.json(orders);
        res.render('ordersList', {orders: orders, data: data});
    });
});

router.post('/api/orders', function(req, res){
   console.log(req.body);
   var order = new Order(req.body);
   order.save(function(err){
       if(err){
           return res.status(500).json({error: "Failed to save the order"});
       }

   });

   res.json({msg: "success"});
});

module.exports = router;
