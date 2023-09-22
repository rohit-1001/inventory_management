const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs')
const authenticate = require('../middleware/authenticate')
const authenticateContact = require('../middleware/authenticateContact')
const cookieParser = require('cookie-parser');
router.use(cookieParser());
const Company = require('../models/Company')

router.post('/addPro', async (req, res) => {

})

router.post('/comregister', async (req, res) => {
    const { name, email, phone, password, cpassword, category, pid } = req.body;
    console.log("Request Body: ", req.body);

    try {
        const vendor = await Vendor.findOne({ email: email });
        if (!vendor) {
            return res.status(400).json({ error: "Vendor not found" });
        }
        const newProduct = {
            name: name,
            desc: desc,
            quantity: quantity,
            category: category,
            pid: pid
        };
        vendor.products.push(newProduct); // Use push to add a newProduct to the products array
        await vendor.save(); // Save the updated vendor document

        res.status(201).json({ message: "Product added successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" }); // Handle errors properly
    }
});