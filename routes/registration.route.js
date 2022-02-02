const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler');
const registerUser = require('../models/Register');
const registerController = require('../controllers/registration.controller');
const { BadRequest } = require('../utils/errors');


//User Registration APIs
router.post('/register', asyncHandler(register));
router.get('/login', asyncHandler(login));
router.get('/user', asyncHandler(getUserByEmail));

/**
 * POST
 * /register
 * - Register a User
 */
async function register(req, res, next) {
    try {
        const { name, email, phone, password, confirmPassword } = req.body;
        if(!name) {
            throw new BadRequest('name is missing');
        }
        if(!email) {
            throw new BadRequest('email is missing');
        }
        if(!phone) {
            throw new BadRequest('phone is missing');
        }

        if(password == confirmPassword) {
            const user = await registerController.insert(req.body);
            res.json({
                success: true,
                message: user
            })
            return;
        } else {
            throw new BadRequest('passwords didnt match');
        }

    } catch(err) {
        next(err);
      
    }
   
}

/**
 * GET
 * /login
 * - Login a User
 */
async function login(req, res) {

    try {
        const { email, password } = req.body;
        const userEmail = await registerUser.findOne({email});
        res.json({
            success: true,
            message: 'Successfully login.' + userEmail
        })
    } catch(error) {
        throw new BadRequest(`Unexpected error: ${error}`);
    }
} 

/**
 * GET
 * /user
 * - Get a user with email
 */
async function getUserByEmail(req, res) {

    res.json({
        success: true,
        message: 'Datareceived'
    })
}

module.exports = router;

