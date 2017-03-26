var mongoose = require('mongoose'),
Schema = mongoose.Schema;

var orderSchema = new Schema({
    crust: String,
    size: String,
    topping: String,
    quantity: String,
    tel: String,
    address: String,
    cost: String,
    deliveTime: { type: Number, min: 0, max: 65 },
    createOn: {type: Date, default: Date.now}
});

module.exports = mongoose.model('Order', orderSchema);