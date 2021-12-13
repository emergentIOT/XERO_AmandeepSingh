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
router.get('/products', asyncHandler(getProductWithName));
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

    Product.find({}, (err, result) => {
        if(err) {
            res.json({
                success: false,
                data: err
            })
            return;
        } 
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
            if(err) {
                res.json({
                    success: false,
                    data: err
                })
                return;
            }
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

    let prodId = { _id: req.params.productId };
    Product.findById(prodId, (err, result) => {
        console.log("Result", req.params.productId);
        if(result == null) {
            res.json({
                success: false,
                data: "No Product found with given ID."
            })
            return;
        }
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

    if(!req.body.name) {
        res.status(400).send({message: "Product cannot be empty"});
        return;
    }
    const product = req.body;
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

    let prodId = { _id: req.params.productId };
    const product = req.body;
    console.log(product);
    productController.updateProduct(prodId, product, (err, result) => {
        if(err) {
            res.json({
                success: false,
                message: err
            })
            return;
        }
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

    let prodId = { _id: req.params.productId };
    productController.deleteProduct(prodId, (err, result) => {
        if(err) {
            res.json({
                success: false,
                data: "Product not found",
                message: err
            })
            return;
        }
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

    let prodId = { _id: req.params.productId };
    try{
        Product.findById(prodId, (err, result) => {
            if(err) {
                res.json({
                    success: false,
                    error: err
                });
                return;
            }
            res.json({
                success: true,
                items: result.options
            })
        })
    } catch (error) {
        console.log(error);
    }
}

/**
 * GET
 * /products/:productId/options/:optionId
 * - finds the specified product option for the specified product.
 */
async function getSpecifiedOption(req, res) {

    let prodId = { _id: req.params.productId };
    let query = {   options: {
        $elemMatch: {  
                _id: req.params.optionId
            }
        }
    }
    Product.findOne(prodId, query,(err, result) => {
        console.log("Option found for requested Product:", result.options);
        if(err) {
            res.json({
                succes: false,
                message: err
            })
            return;
        }
        res.json({
            success: true,
            items: result == null ? "No Data found" : result
        })
    })
}

/**
 * POST
 * /products/:productId/options
 * -adds a new product option to the specified product.
 */
async function addProductOption(req, res) {

    let prodId = { _id : req.params.productId };
    let payload = {
        name: req.body.name,
        description: req.body.description
    }
    productController.pushOptions(prodId, payload, (err, result) => {
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

    let prodId = { _id: req.params.productId, 'options._id': req.params.optionId };
    let query = {   $set: {
                'options.$.name': req.body.name,
                'options.$.description': req.body.description
            }
        }

    Product.updateOne(prodId, query, (err, product) => {
        console.log(`Product Option updated for ${req.params.productId}`);
            if(err) {
                res.status(400).send({message:`Error while updating Option for ${req.params.optionId}, ${err}`});
                return;
            }
            res.json({
                success: true,
                items: product
            })      
        
    })
}

/**
 * DELETE
 * /products/:productId/options/:optionId
 * -deletes the specified product option.
 */
async function deleteProductOption(req, res) {

    let prodId = { _id: req.params.productId };
    let query = {   $pull: {
            options: {  
                _id: req.params.optionId
            }
        }
    }

    Product.updateOne(prodId, query, (err, product) => {
        console.log(`Product Option deleted for ${req.params.productId}`);
            if(err) {
                console.log(`Error while deleting Options for ${req.params.optionId}, ${err}`);
                return;
            }
            res.json({
                success: true,
                items: product
            })      
        
    })
    
}

module.exports = router;