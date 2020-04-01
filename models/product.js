const mongoose = require('mongoose');

var Product = mongoose.model('Product', {
    productName: {type: String},
    category:{type:String}
});

module.exports = { Product };