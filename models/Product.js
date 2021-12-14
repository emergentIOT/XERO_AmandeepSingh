const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    description: {
        type: String,
    },
    price: {
        type: Number,
    },
    deliveryPrice: {
        type: Number, 
    },
    options: [{
        name: String,
        description: String
    }]
});

module.exports = mongoose.model('Products', ProductSchema);