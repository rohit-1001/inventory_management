const express = require('express');
const router = express.Router();
const User = require('../models/User')
const Vendor = require('../models/Vendor')
const ContactForm = require('../models/Contact')
const Order = require('../models/Order')
const bcrypt = require('bcryptjs')
const vendorAuthenticate = require('../middleware/vendorAuthenticate')
const authenticateContact = require('../middleware/authenticateContact')
const cookieParser = require('cookie-parser');
const Company = require('../models/Company');
const Dashboard = require('../models/Dashboard');
// const Fuse = require('fuse.js');
router.use(cookieParser());


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
        res.status(200).json({ msg: "Vendor registered successfully" });
    } catch (error) {
        console.log(error)
        res.status(500).json({ msg: "Some unexpected error occured" });
    }
})

router.post('/vendorsignin', async (req, res) => {
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
                res.cookie('inv_man', { token, role: "vendor", email: email }, {
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
router.post('/addproducts_v', async (req, res) => {
    const { name, desc, quantity, category, pid, threshold , c_price, s_price, manufacturer} = req.body;
    const email=req.cookies.inv_man.email
    // const { email, name, desc, quantity, category, pid, threshold , c_price, s_price, manufacturer, month, year} = req.body;
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
            threshold: threshold,
            manufacturer: manufacturer,
            c_price: c_price,
            s_price: s_price
        };

        // const date = new Date();
        // const month = date.getMonth();
        // const year = date.getFullYear();
        // const dashboard = await Dashboard.findOne({ email: email });
        // if (!dashboard) {
        //     const newDashboard = new Dashboard({
        //         email: email,
        //         data: [{
        //             month: month,
        //             year: year,
        //             monthly_data:{

        //             }
        //         }]
        //         });
        // }
        // else{

        // }




        vendor.products.push(newProduct); // Use push to add a newProduct to the products array
        await vendor.save(); // Save the updated vendor document

        res.status(201).json({ message: "Product added successfully" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal server error" }); // Handle errors properly
    }
});


// addstock
// router.post('/addstock', vendorAuthenticate, async (req, res) => {
router.post('/addstock', async (req, res) => {
    let { quantity, pid } = req.body;
    // console.log("Request Body: ", req.body);
    quantity = parseInt(quantity);
    const email = req.cookies.inv_man.email
    const role = req.cookies.inv_man.role
    if(isNaN(quantity)){
        return res.status(422).json({ msg: "Invalid request made" });
    }
    if(role==="vendor"){
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
    
            return res.status(200).json({ message: "Stock added successfully" });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: "Internal server error" }); // Handle errors properly
        }
    }
    else if(role==="company"){
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
    
            return res.status(200).json({ message: "Stock added successfully" });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: "Internal server error" }); // Handle errors properly
        }
    }
});

// substock
// router.post('/subtractstock', vendorAuthenticate, async (req, res) => {
router.post('/subtractstock', async (req, res) => {
    let { quantity, pid } = req.body;
    quantity = parseInt(quantity);
    // console.log("Request Body: ", req.body);
    const email = req.cookies.inv_man.email
    const role = req.cookies.inv_man.role
    if(isNaN(quantity)){
        return res.status(422).json({ msg: "Invalid request made" });
    }
    if(role==="vendor"){
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
                product.sales += (quantity * product.s_price)
            } else {
                return res.status(400).json({ error: "Insufficient stock quantity" });
            }
            // Get the c_price and s_price
            const cPrice = product.c_price;
            const sPrice = product.s_price;
    
            const dashboard = await Dashboard.findOne({ email });
            const date = new Date();
            const month = date.getMonth().toString();;
            const year = date.getFullYear().toString();
            if(dashboard){
                const monthData = dashboard.data.find((monthData) => monthData.month === month && monthData.year === year)
                if(monthData){
                    // Update the monthly data
                    // monthData.monthly_data.revenue += ;
                    monthData.monthly_data.profit += quantity*(sPrice-cPrice);
                    monthData.monthly_data.sales += quantity*sPrice;
            
                }
                else {
                    // If a record for the current month doesn't exist, create a new one
                    dashboard.data.push({
                        month: month,
                        year: year,
                        monthly_data: {
                            profit: quantity * (product.s_price-product.c_price),
                            sales: quantity * product.s_price,
                        },
                    });
                }
                // Save the dashboard
                await dashboard.save();
            }
            else{
                profit=quantity*(sPrice-cPrice)
                sales=quantity*sPrice
                const newDashboard = new Dashboard({
                    email:email,
                    data: [{
                        month:month,
                        year:year,
                        monthly_data:{
                            profit:profit,
                            sales:sales
                        }
                    }],
                  });
              
                  await newDashboard.save();
            }
            // Find the month from variable month and year
            await Vendor.replaceOne({ email: email }, vendor);
            // await vendor.save()
    
            return res.status(200).json({ message: "Stock subtracted successfully" });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: "Internal server error" }); // Handle errors properly
        }
    }
    else if(role==="company"){
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
                product.sales += (quantity * product.s_price)
            } else {
                return res.status(400).json({ error: "Insufficient stock quantity" });
            }
            // Get the c_price and s_price
            const cPrice = product.c_price;
            const sPrice = product.s_price;
    
            const dashboard = await Dashboard.findOne({ email });
            const date = new Date();
            const month = date.getMonth().toString();;
            const year = date.getFullYear().toString();
            if(dashboard){
                const monthData = dashboard.data.find((monthData) => monthData.month === month && monthData.year === year)
                if(monthData){
                    // Update the monthly data
                    // monthData.monthly_data.revenue += ;
                    monthData.monthly_data.profit += quantity*(sPrice-cPrice);
                    monthData.monthly_data.sales += quantity*sPrice;
            
                }
                else {
                    // If a record for the current month doesn't exist, create a new one
                    dashboard.data.push({
                        month: month,
                        year: year,
                        monthly_data: {
                            profit: quantity * (product.s_price-product.c_price),
                            sales: quantity * product.s_price,
                        },
                    });
                }
                // Save the dashboard
                await dashboard.save();
            }
            else{
                profit=quantity*(sPrice-cPrice)
                sales=quantity*sPrice
                const newDashboard = new Dashboard({
                    email:email,
                    data: [{
                        month:month,
                        year:year,
                        monthly_data:{
                            profit:profit,
                            sales:sales
                        }
                    }],
                  });
              
                  await newDashboard.save();
            }
            // Find the month from variable month and year
            await Company.replaceOne({ email: email }, company);
            // await company.save()
    
            return res.status(200).json({ message: "Stock subtracted successfully" });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: "Internal server error" }); // Handle errors properly
        }
    }
});


// getallproductsofvendor
// router.post('/getallproducts_v', vendorAuthenticate, async (req, res) => {
router.get('/getallproducts_v', async (req, res) => {
    const email = req.body.email;
    // console.log("Request Body: ", req.body);
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
        console.error(error);
        res.status(500).json({ error: "Internal server error" }); // Handle errors properly
    }
});

// getallproductsofcompany
// router.post('/getallproducts_c', vendorAuthenticate, async (req, res) => {
router.get('/getallproducts_c', async (req, res) => {
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

// all companies for marketplace
// router.get('/allcompanies', vendorAuthenticate, async (req, res) => {
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


// order_request
// router.post('/request',vendorAuthenticate,  async (req, res) => {
router.post('/request', async (req, res) => {
    const product = req.body.product;
    const c_email = req.body.c_email;
    const v_email = req.cookies.inv_man.email;

    const products = [];
    product.forEach(pro => {
        const name = pro.name;
        const quantity = pro.quantity;
        const pid = pro.pid;

        products.push({
        name: name,
        quantity: quantity,
        pid: pid,
        });
    });
    // for (const pro of products) {
        
    // }

    if (!products || !c_email || !v_email) {
        res.status(422).json({ error: "Invalid request made" });
    }

    try {
        const venreq = new Order({ c_email, v_email, products });
        await venreq.save();
        res.status(200).json({ msg: "Request sent successfully" });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
})


// for deletion of order request
router.post('/ordercancellation', async (req, res) => {
    const id = req.body.id;

    try {
        const venreq = new Order({ _id_id });
        if (venreq.status === "Accepted")
            res.status(200).json({ msg: "Request already accepted" });
        else {
            try {
                const del = new Order({ _id: id });
                await del.delete();
                res.status(200).json({ msg: "Request deleted successfully" });

            } catch (error) {
                console.error(error);
                res.status(500).json({ error: "Internal server error" });
            }
        }

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
})

// vendor profile
router.post('/profile', async (req, res) => {
    const email = req.body.email;

    try {
        const vendor = await Vendor.findOne({ email: email });
        if (!vendor) {
            return res.status(400).json({ error: "Vendor not found" });
        }
        res.status(200).json(vendor);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
})


//orders by vendors
router.get('/orders_v', async (req, res) => {
    const email = req.cookies.inv_man.email;
    try {
        const orders = await Order.find({ v_email: email });
        if (!orders) {
            return res.status(400).json({ error: "No orders found" });
        }
        res.status(200).json(orders);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });

    }
})

router.get('/getallproducts', async(req, res) => {
    const email = req.cookies.inv_man.email
    const role = req.cookies.inv_man.role

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
})

router.post('/vendorlogout', (req, res) => {
    res.clearCookie('inv_man', { path: '/' })
    res.status(200).json({ msg: "Logged out successfully" })
})

// router.post('/getFilteredCompanies', (req, res) => {
//     try {
//         console.log("Inside getFilteredCompanies")
//         const searchQuery = req.body.search;
//         console.log("Search Query is : ", searchQuery);
//         const fil_companies = Company.find({});
//         const options = {
//             keys: ['name'], // Search for the 'title' property
//             threshold: 0.3, // Adjust the search threshold (0 to 1, lower values are more permissive)
//         };
//         const fuse = new Fuse(fil_companies, options);
//         const searchResults = fuse.search(searchQuery);
//         res.json(searchResults);
//     } catch (error) {
//         res.status(500).json({ message: "Server Error in searchRecipes" });
//     }
// })

router.post('/getFilteredCompanies', async (req, res) => {
    try {
        const searchQuery = req.body.search;

        // Find companies that match the search query in their names
        const companies = await Company.find({
            $or: [
                { name: { $regex: searchQuery, $options: 'i' } }, // Case-insensitive name search
                { 'products.name': { $regex: searchQuery, $options: 'i' } }, // Search in product names
            ]
        });

        res.json(companies);
    } catch (error) {
        res.status(500).json({ message: "Server Error in searchRecipes" });
    }
})

router.post('/confirmDelivery', async (req, res) => {
    const email = req.cookies.inv_man.email
    const id = req.body.id
    try{
        const order = await Order.findOne({_id: id});
        const vendor = await Vendor.findOne({email: email});
        if(!order){
            return res.status(400).json({error: "No order found"});
        }
        for (const product of order.products) {
            const vendorProduct = vendor.products.find(item => item.pid === product.pid);
            if (!vendorProduct) {
                const c_email = order.c_email
                const company = await Company.findOne({ email: c_email });
                const pro = company.products.find(item => item.pid === product.pid);
                const newProduct = {
                  name:product.name,
                  quantity: product.quantity,
                  desc:pro.desc,
                  category:pro.desc,
                  pid: product.pid,
                  name: product.name,
                  c_price:pro.s_price
                };
              
                // Add the new product to the vendor's products
                vendor.products.push(newProduct);
            }
            else{
                vendorProduct.quantity+=product.quantity;
            }
        }

        order.status = 'Delivered';
        await Order.replaceOne({ _id: id }, order);
        await Vendor.replaceOne({ email: email }, vendor);
        res.status(200).json({msg: "Order delivery confirmed"})
    }
    catch(error){
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
})

router.post('/declineConfirmation', async (req, res) => {
    const id = req.body.id
    try{
        const order = await Order.findOne({_id: id});
        const email = order.c_email
        const company = await Company.findOne({email: email});
        if(!order){
            return res.status(400).json({error: "No order found"});
        }
        for (const product of order.products) {
            const companyProduct = company.products.find(item => item.pid === product.pid);
            companyProduct.quantity+=product.quantity;
        }

        order.status = 'Declined';
        await Order.replaceOne({ _id: id }, order);
        await Company.replaceOne({ email: email }, company);
        res.status(200).json({msg: "Order declined"})
    }
    catch(error){
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
})

module.exports = router;