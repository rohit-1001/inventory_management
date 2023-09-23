const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs')
const companyAuthenticate = require('../middleware/companyAuthenticate')
const cookieParser = require('cookie-parser');
router.use(cookieParser());
const Company = require('../models/Company')

router.post('/comregister', async (req, res) => {
    const { name, email, phone, password, cpassword } = req.body;
    // console.log("Request Body: ", req.body);

    try {
        const company = await Company.findOne({ email: email });
        if (!company) {
            return res.status(400).json({ error: "Vendor not found" });
        }
        await company.save(); // Save the updated vendor document

        res.status(201).json({ message: "Product added successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" }); // Handle errors properly
    }
});

router.post('/vendorregister', async (req, res) => {
    const { name, email, phone, password, cpassword } = req.body;

    if (!name || !email || !phone || !password || !cpassword) {
        res.status(422).json({ msg: "All fields need to be filled" });
    }

    try {
        const vendorExist = await Vendor.findOne({ email: email });
        if (vendorExist) {
            res.status(409).json({ msg: "Email already registered" });
        }
        else if (password != cpassword) {
            res.status(422).json({ msg: "Passwords do not match" });
        }
        const ven = new Vendor({ name, email, phone, password, cpassword });
        await ven.save();
        res.status(200).json({ msg: "User registered successfully" });
    } catch (error) {
        console.log(error)
        res.status(500).json({ msg: "Some unexpected error occured" });
    }
})

router.post('/signin', async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(400).json({ msg: "Please fill all required fields" })
    }
    try {
        const emailExist = await Vendor.findOne({ email: email });
        if (emailExist) {
            const isMatch = await bcrypt.compare(password, emailExist.password);
            if (isMatch) {
                token = await emailExist.generateAuthToken();
                res.cookie('inv_man', token, {
                    expires: new Date(Date.now() + 604800),
                    httpOnly: true
                })
                res.status(200).json({ msg: "User login successful" })
            }
            else {
                res.status(400).json({ msg: "User login failed" })
            }
        }
        else {
            res.status(400).json({ msg: "Invalid credentials" })
        }
    } catch (error) {
        res.status(500).json({ msg: "Some unexpected error occured" });
    }
})

// router.post('/addproducts', vendorAuthenticate, async (req, res) => {
router.post('/addproducts', async (req, res) => {
    const { email, name, desc, quantity, category, pid, manufacturer } = req.body;
    // console.log("Request Body: ", req.body);

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
            pid: pid,
            manufacturer: manufacturer
        };
        vendor.products.push(newProduct); // Use push to add a newProduct to the products array
        await vendor.save(); // Save the updated vendor document

        res.status(201).json({ message: "Product added successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" }); // Handle errors properly
    }
});


// addstock
// router.post('/addstock', vendorAuthenticate, async (req, res) => {
router.post('/addstock', async (req, res) => {
    const { email, quantity, pid } = req.body;
    // console.log("Request Body: ", req.body);

    if(isNaN(quantity)){
        res.status(422).json({ msg: "Invalid request made" });
    }

    try {
        const vendor = await Vendor.findOne({ email: email });
        if (!vendor) {
            return res.status(400).json({ error: "Vendor not found" });
        }
        const product = vendor.products.find((product) => product.pid === pid);
        if (!product) {
            return res.status(400).json({ error: "Product not found" });
        }

        // Ensure the quantity is valid and subtract it from the product
        product.quantity += quantity;
        // vendor.find(product).quantity += quantity;
        // await vendor.save(); // Save the updated vendor document
        await Vendor.replaceOne({ email: email }, vendor);

        res.status(200).json({ message: "Stock added successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" }); // Handle errors properly
    }
});

// substock
// router.post('/subtractstock', vendorAuthenticate, async (req, res) => {
router.post('/subtractstock', async (req, res) => {
    const { email, quantity, pid } = req.body;
    // console.log("Request Body: ", req.body);

    if(isNaN(quantity)){
        res.status(422).json({ msg: "Invalid request made" });
    }

    try {
        const vendor = await Vendor.findOne({ email: email });
        if (!vendor) {
            return res.status(400).json({ error: "Vendor not found" });
        }

        // Find the product with the matching pid
        const product = vendor.products.find((product) => product.pid === pid);
        if (!product) {
            return res.status(400).json({ error: "Product not found" });
        }

        // Ensure the quantity is valid and subtract it from the product
        if (product.quantity >= quantity) {
            product.quantity -= quantity;
        } else {
            return res.status(400).json({ error: "Insufficient stock quantity" });
        }
        await Vendor.replaceOne({ email: email }, vendor);
        // await vendor.save()

        res.status(200).json({ message: "Stock subtracted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" }); // Handle errors properly
    }
});