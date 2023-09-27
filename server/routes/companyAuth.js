const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs')
const companyAuthenticate = require('../middleware/companyAuthenticate')
const cookieParser = require('cookie-parser');
router.use(cookieParser());
const Company = require('../models/Company')
const Vendor = require('../models/Vendor')

router.post('/companyregister', async (req, res) => {
    const { name, email, phone, password, cpassword } = req.body;

    if (!name || !email || !phone || !password || !cpassword) {
        res.status(422).json({ msg: "All fields need to be filled" });
    }

    try {
        const companyExist = await Company.findOne({ email: email });
        if (companyExist) {
            res.status(409).json({ msg: "Email already registered" });
        }
        else if (password != cpassword) {
            res.status(422).json({ msg: "Passwords do not match" });
        }
        const comp = new Company({ name, email, phone, password, cpassword });
        await comp.save();
        res.status(200).json({ msg: "Company registered successfully" });
    } catch (error) {
        console.log(error)
        res.status(500).json({ msg: "Some unexpected error occured" });
    }
})

router.post('/companysignin', async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(400).json({ msg: "Please fill all required fields" })
    }
    try {
        const emailExist = await Company.findOne({ email: email });
        if (emailExist) {
            const isMatch = await bcrypt.compare(password, emailExist.password);
            if (isMatch) {
                token = await emailExist.generateAuthToken();
                res.cookie('inv_man', {token, role:"company"}, {
                    expires: new Date(Date.now() + 604800),
                    httpOnly: true
                })
                res.status(200).json({ msg: "Login successful" })
            }
            else {
                res.status(400).json({ msg: "Login failed" })
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
    const { email, name, desc, quantity, category, pid, threshold, s_price, c_price } = req.body;
    // console.log("Request Body: ", req.body);

    try {
        const company = await Company.findOne({ email: email });
        if (!company) {
            return res.status(400).json({ error: "Company not found" });
        }
        const newProduct = {
            name: name,
            desc: desc,
            quantity: quantity,
            category: category,
            pid: pid,
            threshold: threshold,
            s_price:s_price,
            c_price:c_price
        };
        company.products.push(newProduct); // Use push to add a newProduct to the products array
        await company.save(); // Save the updated vendor document

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
        const company = await Company.findOne({ email: email });
        if (!company) {
            return res.status(400).json({ error: "Company not found" });
        }
        const product = company.products.find((product) => product.pid === pid);
        if (!product) {
            return res.status(400).json({ error: "Product not found" });
        }

        // Ensure the quantity is valid and subtract it from the product
        product.quantity += quantity;
        // vendor.find(product).quantity += quantity;
        // await vendor.save(); // Save the updated vendor document
        await Company.replaceOne({ email: email }, company);

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
        const company = await Company.findOne({ email: email });
        if (!company) {
            return res.status(400).json({ error: "Company not found" });
        }

        // Find the product with the matching pid
        const product = company.products.find((product) => product.pid === pid);
        if (!product) {
            return res.status(400).json({ error: "Product not found" });
        }

        // Ensure the quantity is valid and subtract it from the product
        if (product.quantity >= quantity) {
            product.quantity -= quantity;
        } else {
            return res.status(400).json({ error: "Insufficient stock quantity" });
        }
        await Company.replaceOne({ email: email }, company);
        // await vendor.save()

        res.status(200).json({ message: "Stock subtracted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" }); // Handle errors properly
    }
});

router.post('/getallproducts_c', async (req, res) => {
    const email = req.body.email;
    // console.log("Request Body: ", req.body);
    try {
        const Company = await Company.find({ email: email });
        if (!Company) {
            return res.status(400).json({ error: "Company not found" });
        }
        const products = Company.products;
        if (!products) {
            return res.status(400).json({ error: "No products found" });
        }
        res.status(200).json(products);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" }); // Handle errors properly
    }
});


router.post('/profile',  async (req, res) => {
    const email = req.body.email;
    
    try {
        const company = await Company.findOne({ email: email });
        if (!company) {
            return res.status(400).json({ error: "Company not found" });
        }
        res.status(200).json(company);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
})


//orders by vendors
router.post('/orders',  async (req, res) => {
    const email = req.body.email;
    try{
        const orders = await Order.find({c_email: email});
        if(!orders){
            return res.status(400).json({error: "No orders found"});
        }
        res.status(200).json(orders);   
    }
    catch(error){
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
})

router.post('/orderacceptance', async (req, res) => {
    const { status, id, c_email, v_email } = req.body;
    const {pid, quantity} = req.body.products    

    if(status==="Accepted"){
        try{
            const company = await Company.find ({email: c_email});
            if(!company){
                return res.status(400).json({error: "Company not found"});
            }
            const product = company.products.find((product) => product.pid === pid)
            if(!product){
                return res.status(400).json({error: "Product not found"})
            }
            if(product.quantity<quantity){
                return res.status(400).json({error: "Product quantity not sufficient, cannot accept the order currently"})
            }
            product.quantity-=quantity;
            await order.save();
            res.status(200).json({msg: "Order accepted."});
        }
        catch(error){
            console.error(error);
            res.status(500).json({ error: "Internal server error" });
        }
    }
    else if (status==="Completed"){
        try{
            const vendor =  await Vendor.findOne({email: v_email});
            if(!vendor){
                return res.status(400).json({error: "Vendor not found"});
            }
            const product = vendor.products.find((product) => product.pid === pid);
            if(!product){
                return res.status(400).json({error: "Product not found"});
            }
            product.quantity += req.body.quantity;
            await vendor.save();
            res.status(200).json({msg: "Order Status Updated Completed and Vendor data updated"});

        }
        catch(error){
            console.error(error);
            res.status(500).json({ error: "Internal server error" });
        }
    }
    try{
        const order = await Order.find ({_id: id});
        if(!order){
            return res.status(400).json({error: "No orders found"});
        }
        order.status = status;
        await order.save();
        res.status(200).json({msg: "Order Status Updated."});
    }
    catch(error){
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
})

router.get('/')

router.post('/companylogout', (req, res) => {
    res.clearCookie('inv_man', {path:'/'})
    res.status(200).json({msg:"Logged out successfully"})
})

module.exports = router;