var express = require('express');
var router = express.Router();
var data = require('../public/data/data.json');
var calc = require('../util/priceCalculator.js');


router.post('/', function(req, res){
    var params = {};
        var orderCalc = new calc();
        params.crust = req.body.crust;
        params.size = req.body.size;
        params.topping = req.body.topping;
        params.quantity = req.body.number;
        
        params.tel = req.body.tel;
        params.address = req.body.address;
        var cost = orderCalc.getCost(params.size, params.topping.split(',').length, params.quantity);
        params.cost = cost;
        params.deliveTime = orderCalc.getRandomTime(10, 30);
        var now = new Date();
        //params.createOn = now.toLocaleDateString() + ' ' + now.toLocaleTimeString();

        res.render('order', {data: data, params: params});

});

router.get('/', function(req, res){
   res.send('respond with a resource')
});

module.exports = router;