const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler');
const registerUser = require('../models/Register');
const registerController = require('../controllers/registration.controller');


//User Registration APIs
router.post('/register', asyncHandler(register));


/**
 * POST
 * /register
 * - Register a user
 */
async function register(req, res) {
    try {

        const password = req.body.password;
        const confirmPassword = req.body.confirmPassword;

        if(password == confirmPassword) {
            const user = await registerController.insert(req.body);
            res.json({
                success: true,
                message: user
            })
        } else {
            res.json({
                success: false,
                message: 'Password didnt match.' 
            })
            return;
        }

        res.json({
            success: true,
            message: 'User Register sucessfully'
        })

    } catch(err) {
        res.status(400).send(err);
    }
   
}

module.exports = router;

