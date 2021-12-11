//Product API

const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler');
//Product Model
const Product = require('../models/Product');
//Product Controller
const productController = require('../controllers/product.controller');


//APIs
router.get('/products', asyncHandler(getProducts));
router.get('/productsName', asyncHandler(getProductWithName));
router.get('/products/:productId', asyncHandler(getProduct));
router.post('/products', asyncHandler(saveProduct));
router.put('/products/:productId', asyncHandler(updateProduct));
router.delete('/products/:productId', asyncHandler(deleteProduct));
router.get('/products/:productId/options', asyncHandler(getProductOptions));
router.get('/products/:productId/options/:optionId', asyncHandler(getSpecifiedOption));
router.post('/products/:productId/options', asyncHandler(addProductOption));
router.put('/products/:productId/options/:optionId', asyncHandler(updateProductOption));
router.delete('/products/:productId/options/:optionId', asyncHandler(deleteProductOption));



/**
 * GET
 * /products
 * - get all products.  
 */
async function getProducts(req, res, next) {
    console.log('requested');
    Product.find({}, (err, result) => {
        res.json({
            success: true,
            data: result
        })
    })
    
}

/**
 * GET
 * /productsName?name=""
 * - finds all products matching the specified name.
 */
async function getProductWithName(req, res) {
    let name = req.query.name;  
    var LATEST_ID = -1;
    let query = {};
    query.name = name;
          
    Product.find(query)      
        .sort({ _id : LATEST_ID })
        .exec(function(err, result) {
            res.json({
                success: true,
                data: result
            })
        });
    
}

/**
 * GET
 * /products/:productId
 * - gets the project that matches the specified ID.
 */
async function getProduct(req, res) {
    Product.findById(req.params.productId, (err, result) => {
        console.log("Result", req.params.productId);
        res.json({
            success: true,
            data: result
        })
    })
    
}

/**
 * POST
 * /products
 * - creates a new product.
 */
async function saveProduct(req, res) {
    const product = req.body;
    console.log(`Resigeter user ${product}`);
    const savedProduct = await productController.insert(product);

    res.json({
        success: true,
        data: savedProduct
    })
}

/**
 * PUT
 * /products/:productId
 * - updates a product.
 */
async function updateProduct(req, res) {
    const product = req.body;
    console.log(product);
    productController.updateProduct(req.params.productId,product, (err, result) => {
        res.json({
            success: true,
            updatedProduct: result
        })
    })
    
}

/**
 * DELETE
 * /products/:productId
 * - deletes a product and its options.
 */
async function deleteProduct(req,res) {
    console.log("id", req.params.productId);
    productController.deleteProduct(req.params.productId, (err, result) => {
       
        res.json({
            success: true,
            data: result
        })
    })
    
}


/**
 * GET
 * /products/:productId/options
 * -finds all options for a specified product.
 */
async function getProductOptions(req, res) {
    Product.findById(req.params.productId, (err, result) => {
        res.json({
            success: true,
            items: result.options
        })
    })
    
}

/**
 * GET
 * /products/:productId/options/:optionId
 * - finds the specified product option for the specified product.
 */
async function getSpecifiedOption(req, res) {

    res.json({
        success: true,
        items: true
    })
}

/**
 * POST
 * /products/:productId/options
 * -adds a new product option to the specified product.
 */
async function addProductOption(req, res) {
    let payload = {
        name: req.body.name,
        description: req.body.description
    }
    productController.pushOptions(req.params.productId, payload, (err, result) => {
        if(err) {
            console.log("Error: ", err);
            return;
        }
        console.log(`Success : ${result}`);
        res.json({
            success: true,
            items: result
        })
    })
    
}

/**
 * PUT
 * /products/:productId/options/:optionId
 * -updates the specified product option.
 */
async function updateProductOption(req, res) {

    res.json({
        success: true,
        items: true
    })
}

/**
 * DELETE
 * /products/:productId/options/:optionId
 * -deletes the specified product option.
 */
async function deleteProductOption(req, res) {

    res.json({
        success: true,
        items: true
    })
}

module.exports = router;