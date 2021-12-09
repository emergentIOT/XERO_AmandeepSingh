//Product API

const express = require('express');
//Add controller 
//Add model
const asyncHandler = require('express-async-handler');

const router = express.Router();

//APIs
router.get('/products', asyncHandler(getProducts));
router.get('/products/:name', asyncHandler(getProductWithName));
router.get('/products/:productId', asyncHandler(getProduct));
router.post('/products', asyncHandler(saveProduct));
router.put('/product/:productId', asyncHandler(updateProduct));
router.delete('/product/:productId', asyncHandler(deleteProduct));



/**
 * GET
 * /products
 * - get all products.  
 */
async function getProducts(req, res, next) {
    console.log('requested');
    res.json({
        success: true
    })
}

/**
 * GET
 * /products/:name
 * - finds all products matching the specified name.
 */
async function getProductWithName(req, res) {
    res.json({
        success: true
    })
}

/**
 * GET
 * /products/:productId
 * - gets the project that matches the specified ID.
 */
async function getProduct(req, res) {
    res.json({
        success: true
    })
}

/**
 * POST
 * /products
 * - creates a new product.
 */
async function saveProduct(req, res) {
    res.json({
        success: true
    })
}

/**
 * PUT
 * /products/:productId
 * - updates a product.
 */
async function updateProduct(req, res) {
    res.json({
        success: true
    })
}

/**
 * DELETE
 * /products/:productId
 * - deletes a product and its options.
 */
async function deleteProduct(req,res) {
    res.json({
        success: true
    })
}

module.exports = router;