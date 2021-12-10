const express = require('express');
const productRoutes = require('./product.route');
const router = express.Router();


router.use('/v1', productRoutes);


module.exports = router;