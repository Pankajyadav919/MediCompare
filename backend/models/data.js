const mongoose = require('mongoose');//TO use Mongoose for MongoDB object modeling

const dataSchema = new mongoose.Schema({
    name: String,
    email : String,
    password: String,
})

const Data = mongoose.model('Data', dataSchema);
module.exports = Data;
// This code defines a Mongoose schema and model for a collection named 'Data'.