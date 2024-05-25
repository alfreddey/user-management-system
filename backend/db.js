const mongoose = require('mongoose');


async function connectDB(dbURL) {
    try {
        const db = await mongoose.connect(dbURL);

        console.log('Connected to MongoDB')
    }
    
    catch(err) {
        console.error("Database Error: ", err)
    }
}

module.exports = connectDB;