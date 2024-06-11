const mongoose = require("mongoose")

const localDB = "mongodb://127.0.0.1:27017/role_auth"

const connectDB = () => {
    mongoose.connect(localDB)
        .then(() => { console.log('mongodb connect'); })
        .catch((err) => { console.log(err); })
}


module.exports = connectDB;