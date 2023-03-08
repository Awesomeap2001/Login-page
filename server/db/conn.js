const mongoose = require('mongoose');

// const DB = 'mongodb+srv://admin:admin@cluster0.q6i6b3j.mongodb.net/mernstack?retryWrites=true&w=majority'
const DB = process.env.DATABASE;        //This will secure the username password and link from external user

mongoose.connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('Connection Successful');
}).catch((err) => console.log('No Connection'));