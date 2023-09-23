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
        console.log(vendors)
        res.status(200).json(vendors);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


module.exports = router;

