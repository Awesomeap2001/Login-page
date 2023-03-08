const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const app = express();
const cookieparser = require('cookie-parser');
app.use(cookieparser());
const path = require('path');

dotenv.config({ path: './config.env' });

require('./db/conn');
app.use(express.json());
// const User = require('./model/userSchema');

// linked with router authorization file
app.use(require('./router/auth'));

app.use(express.static(path.join(__dirname, 'client/build')));

app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, "./client/build/index.html"));
})


const PORT = process.env.PORT || 5000;

// const middleware = (req, res, next) => {
//     console.log("Im middleware");
//     next(); 
// }

// app.get('/', (req, res) => {
//     res.send(`Hello World from server app.js`);
// });

// app.get('/about', (req, res) => {
//     console.log(`hello my about`);
//     res.send(`Hello World from about`);
// });

// app.get('/contact', (req, res) => {
//     // res.cookie('test','patil');
//     res.send(`Hello World from contact`);
// });

app.get('/signin', (req, res) => {
    res.send(`Hello World from signin`);
});

app.get('/signup', (req, res) => {
    res.send(`Hello World from signup`);
});


app.listen(PORT, () => {
    console.log(`Listen from port ${PORT}`);
})