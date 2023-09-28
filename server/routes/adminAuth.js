const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs')
const companyAuthenticate = require('../middleware/companyAuthenticate')
const cookieParser = require('cookie-parser');
router.use(cookieParser());
const Company = require('../models/Company')
const Order = require('../models/Order')
const Vendor = require('../models/Vendor')


//get all companies
router.get('/allcompanies', async (req, res) => {
    try {
        // Use the Company model to find all companies in the database
        const companies = await Company.find();

        if (!companies || companies.length === 0) {
            return res.status(404).json({ message: 'No companies found' });
        }

        // Send the list of companies as a JSON response
        res.status(200).json(companies);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


//get all vendors
router.get('/allvendors', async (req, res) => {
    try {
        // Use the Vendor model to find all vendors in the database
        const vendors = await Vendor.find();

        if (!vendors || vendors.length === 0) {
            return res.status(404).json({ message: 'No vendors found' });
        }

        // Send the list of vendors as a JSON response
        res.status(200).json(vendors);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

//get all products
router.post('/allproductsadmin', async (req, res) => {
    const {email, role} = req.body
    if(role==="vendor"){
        try {
            const vendor = await Vendor.findOne({ email: email });
            if (!vendor) {
                return res.status(400).json({ error: "Vendor not found" });
            }
            const products = vendor.products;
            if (!products) {
                return res.status(400).json({ error: "No products found" });
            }
            res.status(200).json(products);
        }
        catch (error) {
            res.status(500).json({ error: "Internal server error" });
        }
    }
    else if(role==="company"){
        try {
            const company = await Company.findOne({ email: email });
            if (!company) {
                return res.status(400).json({ error: "Company not found" });
            }
            const products = company.products;
            if (!products) {
                return res.status(400).json({ error: "No products found" });
            }
            res.status(200).json(products);
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ error: "Internal server error" });
        }
    }
});


module.exports = router;

