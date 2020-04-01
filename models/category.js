const mongoose = require('mongoose');

var Category = mongoose.model('Category', {
    category: { type: String }
});

module.exports = { Category };