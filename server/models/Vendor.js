const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const vendorSchema = new mongoose.Schema({
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
            },
            manufacturer:{
                type: String,
                default:null
            },
            threshold:{
                type:Number,
                default:null
            },
            s_price:{
                type:Number,
                default:null
            },
            c_price:{
                type:Number,
                required: true
            },
            sales:{
                type: Number,
                default : 0
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

vendorSchema.pre('save', async function(next){
    if(this.isModified('password')){
        this.password = await bcrypt.hash(this.password, 10);
        this.cpassword = await bcrypt.hash(this.cpassword, 10);
    }
    next();
})

vendorSchema.methods.generateAuthToken = async function(){
    try {
        const token = jwt.sign({_id: this._id}, process.env.SECRET_KEY);
        this.tokens = this.tokens.concat({token: token});
        await this.save();
        return token;
    } catch (error) {
        console.log(error)
    }
}

const Vendor = mongoose.model('vendor', vendorSchema);
module.exports = Vendor;