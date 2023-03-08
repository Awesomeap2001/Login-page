const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authenticate = require('../middeware/authenticate');
const cookieParser = require('cookie-parser');
router.use(cookieParser());

require('../db/conn');
const User = require('../model/userSchema');

router.get('/', (req, res) => {
    res.send('Hello World from server router.js');
});

router.post('/register', async (req, res) => {

    const { name, email, phone, work, password, cpassword } = req.body;
    // get data from the data filled by the user

    if (!name || !email || !phone || !work || !password || !cpassword) {
        return res.status(422).json({ error: "Please fill all detials" });
    }

    //add to database using Async-Await
    try {
        const userExist = await User.findOne({ email: email });
        if (userExist) {
            return res.status(422).json({ error: "Email already exist" });
        } else if (password != cpassword) {
            return res.status(422).json({ error: "Password doesn't Match" });
        } else {
            const user = new User({ name, email, phone, work, password, cpassword });
            //yaha pe use hoga middleware userSchema.pre from userSchema

            await user.save();                 // check if registration is successful or not

            res.status(201).json({ message: "user registration successfully" });
        }


    } catch (err) {
        console.log(err);
    }

});


// Login Route

router.post('/signin', async (req, res) => {
    // for POSTMAN
    // console.log(req.body);
    // res.json({message : "Awesome!!"});

    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ error: "Please fill the details!!" })
        }

        const userLogin = await User.findOne({ email: email });
        // console.log(userLogin);

        if (userLogin) {
            const isMatch = await bcrypt.compare(password, userLogin.password);        //first one is written by user in login page and second one is password get by database

            const token = await userLogin.generateAuthToken();
            console.log(token);

            res.cookie("jwtoken", token, {
                expires: new Date(Date.now() + 25892000000),
                httpOnly: true
            });

            if (!isMatch) {
                res.status(400).json({ error: "Invalid Credentials" });     //dont write invalid password as it will give hint ot the hacker
            } else {
                res.json({ message: "User login Successful." });
            }

        } else {
            res.status(400).json({ error: "Invalid Credentials" });
        }



    } catch (err) {
        console.log(err);
    }
});


// About Us Page

router.get('/about', authenticate, (req, res) => {
    console.log(`hello my about`);
    res.send(req.rootUser);
});


// Contact and Home Page - get user data for contact us and home page

router.get('/getdata', authenticate, (req, res) => {
    console.log(`hello my Contact`);
    res.send(req.rootUser);
})

// Contact us Page
router.post('/contact', authenticate, async (req, res) => {
    try {
        const { name, email, phone, message } = req.body;

        if (!name || !email || !phone || !message) {
            console.log("Error in Contact Form");
            return res.json({ error: "Please fill all details." })
        }

        const userContact = await User.findOne({ _id: req.userID });

        if (userContact) {
            const userMessage = await userContact.addMessage(name, email, phone, message);

            await userContact.save();

            res.status(201).json({ message: "User Contact message saved Successfully." });
        }

    } catch (err) {
        console.log(err);
    }
});

// Logoout Page

router.get('/logout', (req, res) => {
    console.log(`hello my logout`);
    res.clearCookie('jwtoken', { path: '/' });
    res.status(200).send('User Logout');
})

module.exports = router;