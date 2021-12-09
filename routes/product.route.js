//Product API

const express = require('express');
//Add controller 
//Add model
const asyncHandler = require('express-async-handler');

const router = express.Router();

//APIs
router.get('/products', asyncHandler(products));



async function products(req, res, next) {
    console.log('requested');
    res.json({
        success: true
    })
}

module.exports = router;