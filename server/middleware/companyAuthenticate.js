const jwt = require('jsonwebtoken')
const Company = require('../models/Company')


const companyAuthenticate = async (req, res, next) => {
    try {
        const token = req.cookies.inv_man;
        const verifyToken = jwt.verify(token, process.env.SECRET_KEY)
        
        const findCompany = await Company.findOne({_id:verifyToken._id, "tokens.token":token})

        if(!findVendor){
            throw new Error("Login Expired")
        }

        req.token=token
        req.findCompany=findCompany
        req.userID=findCompany._id
        next()
    } catch (error) {
        res.status(401).json({msg:'Unauthorized access'})
    }
}

module.exports = companyAuthenticate