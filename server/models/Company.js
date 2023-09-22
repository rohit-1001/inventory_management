const mongoose = require('mongoose')

const companySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    cpassword: {
        type: String,
        required: true
    },
    products: [
        {
            name:{
                type:String,
                required: true
            },
            quantity:{
                type:Number,
                required: true
            },
            desc:{
                type:String,
                required: true
            },
            category:{
                type:String,
                required: true
            },
            pid:{
                type:String,
                required: true
            }
        }
    ],
    tokens: [
        {
            token:{
                type:String,
                required: true
            }
        }
    ]
})


const Company = mongoose.model('company', companySchema);
module.exports = Company;