const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const asyncHandler = require('express-async-handler');
const registerUser = require('../models/Register');
const registerController = require('../controllers/registration.controller');
const Register = require('../models/Register');


//User Registration APIs
router.post('/register', asyncHandler(register));
router.post('/login', asyncHandler(login));
router.get('/user', asyncHandler(getUserByEmail));

/**
 * POST
 * /register
 * - Register a User
 */
async function register(req, res) {
    try {

        const { name, phone, email, password, confirmPassword } = req.body;
        
        if(!name) {
            res.status(400).json({
                success: false,
                message: 'Name is missing'
            })
            return;
        }
        if(password == confirmPassword) {

            const registerUser = new Register({
                name, phone, email, password, confirmPassword
            })

            //Generating JWT token
            const token = await registerUser.generateAuthToken();
            console.log(token);
            if(!token) {
                res.status(400).json({ message: "No jwt token created" })
                return;
            }
            //Register User to db
            const user = await registerUser.save();
            res.status(200).json({
                success: true,
                message: user
            })
            return;
        } else {
            res.status(400).json({
                success: false,
                message: 'Password didnt match.' 
            })
            return;
        }

        // res.json({
        //     success: true,
        //     message: 'User Register sucessfully'
        // })

    } catch(err) {
        res.status(400).json({ message: "" + err} );
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
        const userEmail = await registerUser.findOne({ email });
        //compare the hashed password from db.
        const isMatch = await bcrypt.compare(password, userEmail.password);

        if(isMatch) {
            res.status(200).json({
                success: true,
                message: userEmail
            })
        } else {
            res.status(401).json({
                success: false,
                message: 'Invalid login details.'
            })
            //throw new InValid(`Invalid login details`);
        }
     
    } catch(error) {
        res.status(400).send({error});
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

