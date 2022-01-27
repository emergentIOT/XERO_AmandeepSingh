const express = require('express');
const userRegistrationRoutes = require('./registration.route');
const productRoutes = require('./product.route');
const router = express.Router();

router.use('/v1', userRegistrationRoutes);
router.use('/v1', productRoutes);


module.exports = router;