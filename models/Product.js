const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        //required: true
    },
    description: {
        type: String,
       // required: true
    },
    price: {
        type: Number,
       // required: true
    },
    deliveryPrice: {
        type: Number, 
      //  required: true
    },
    options: [{
        name: String,
        description: String
    }]
});

module.exports = mongoose.model('Products', ProductSchema);