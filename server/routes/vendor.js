const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Vendor = require("../models/Vendor");
const Profile = require("../models/Profile");
const ContactForm = require("../models/Contact");
const Order = require("../models/Order");
const bcrypt = require("bcryptjs");
const vendorAuthenticate = require("../middleware/vendorAuthenticate");
const authenticateContact = require("../middleware/authenticateContact");
const cookieParser = require("cookie-parser");
const Company = require("../models/Company");
const Dashboard = require("../models/Dashboard");
// const Fuse = require('fuse.js');
router.use(cookieParser());

router.post("/vendorregister", async (req, res) => {
  const { name, email, phone, role, password, cpassword } = req.body;
  if (!name || !email || !phone || !role || !password || !cpassword) {
    return res.status(422).json({ error: "All fields need to be filled" });
  }

  try {
    const vendorExist = await Vendor.findOne({ email: email });
    if (vendorExist) {
      return res.status(409).json({ error: "Email already registered" });
    } else if (password != cpassword) {
      return res.status(422).json({ error: "Passwords do not match" });
    }
    const ven = new Vendor({ name, email, phone, password, cpassword });
    await ven.save();
    const pro = new Profile({ name: name, email: email, phone: phone, Grole: role })
    await pro.save()
    return res.status(200).json({ msg: "Vendor registered successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Some unexpected error occured" });
  }
});

router.post("/vendorsignin", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: "Please fill all required fields" });
  }
  try {
    const emailExist = await Vendor.findOne({ email: email });
    if (emailExist) {
      const isMatch = await bcrypt.compare(password, emailExist.password);
      if (isMatch) {
        token = await emailExist.generateAuthToken();
        res.cookie(
          "inv_man",
          { token, role: "vendor", email: email },
          {
            expires: new Date(Date.now() + 604800),
            httpOnly: true,
          }
        );
        return res.status(200).json({ msg: "Login successful" });
      } else {
        return res.status(400).json({ error: "Login failed" });
      }
    } else {
      return res.status(400).json({ error: "Invalid credentials" });
    }
  } catch (error) {
    return res.status(500).json({ error: "Some unexpected error occured" });
  }
});

// router.post('/addproducts', vendorAuthenticate, async (req, res) => {
router.post("/addproducts_v", async (req, res) => {
  const {
    name,
    desc,
    quantity,
    category,
    pid,
    threshold,
    c_price,
    s_price,
    manufacturer,
  } = req.body;
  let email;
  if (req.cookies) {
    if (req.cookies.inv_man) {
      if (req.cookies.inv_man.role) {
        email = req.cookies.inv_man.email;
      }
    } else {
      return res.status(500).json({ error: "Please login to continue" });
    }
  } else {
    return res.status(500).json({ error: "Please login to continue" });
  }
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
      s_price: s_price,
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

    return res.status(201).json({ message: "Product added successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" }); // Handle errors properly
  }
});

// addstock
// router.post('/addstock', vendorAuthenticate, async (req, res) => {
router.post("/addstock", async (req, res) => {
  let {
    quantity,
    pid,
    name,
    desc,
    category,
    manufacturer,
    threshold,
    s_price,
    c_price,
  } = req.body;
  // console.log("Request Body: ", req.body);
  if (
    !name ||
    !desc ||
    !category ||
    !manufacturer ||
    !threshold ||
    !s_price ||
    !c_price
  ) {
    return res.status(400).json({ error: "All fields required" });
  }
  quantity = parseInt(quantity);
  let email, role;
  if (req.cookies) {
    if (req.cookies.inv_man) {
      if (req.cookies.inv_man.role) {
        email = req.cookies.inv_man.email;
        role = req.cookies.inv_man.role;
      }
    } else {
      return res.status(500).json({ error: "Please login to continue" });
    }
  } else {
    return res.status(500).json({ error: "Please login to continue" });
  }
  if (isNaN(quantity)) {
    return res.status(422).json({ error: "Invalid request made" });
  }
  if (role === "vendor") {
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
      product.name = name;
      product.desc = desc;
      product.category = category;
      product.manufacturer = manufacturer;
      product.threshold = threshold;
      product.s_price = s_price;
      product.c_price = c_price;
      // vendor.find(product).quantity += quantity;
      // await vendor.save(); // Save the updated vendor document
      await Vendor.replaceOne({ email: email }, vendor);

      return res.status(200).json({ message: "Stock updated successfully" });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal server error" }); // Handle errors properly
    }
  } else if (role === "company") {
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
      product.name = name;
      product.desc = desc;
      product.category = category;
      product.threshold = threshold;
      product.s_price = s_price;
      product.c_price = c_price;
      // vendor.find(product).quantity += quantity;
      // await vendor.save(); // Save the updated vendor document
      await Company.replaceOne({ email: email }, company);

      return res.status(200).json({ message: "Stock updated successfully" });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal server error" }); // Handle errors properly
    }
  }
});

// substock
// router.post('/subtractstock', vendorAuthenticate, async (req, res) => {
router.post("/subtractstock", async (req, res) => {
  let {
    quantity,
    pid,
    name,
    desc,
    category,
    manufacturer,
    threshold,
    s_price,
    c_price,
  } = req.body;
  if (
    !name ||
    !desc ||
    !category ||
    !manufacturer ||
    !threshold ||
    !s_price ||
    !c_price
  ) {
    return res.status(400).json({ error: "All fields required" });
  }
  quantity = parseInt(quantity);
  // console.log("Request Body: ", req.body);
  let email, role;
  if (req.cookies) {
    if (req.cookies.inv_man) {
      if (req.cookies.inv_man.role) {
        email = req.cookies.inv_man.email;
        role = req.cookies.inv_man.role;
      }
    } else {
      return res.status(500).json({ error: "Please login to continue" });
    }
  } else {
    return res.status(500).json({ error: "Please login to continue" });
  }
  if (isNaN(quantity)) {
    return res.status(422).json({ error: "Invalid request made" });
  }
  if (role === "vendor") {
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
      product.name = name;
      product.desc = desc;
      product.category = category;
      product.manufacturer = manufacturer;
      product.threshold = threshold;
      product.s_price = s_price;
      product.c_price = c_price;
      // Ensure the quantity is valid and subtract it from the product
      if (product.quantity >= quantity) {
        product.quantity -= quantity;
        product.sales += quantity * product.s_price;
      } else {
        return res.status(400).json({ error: "Insufficient stock quantity" });
      }
      // Get the c_price and s_price
      const cPrice = product.c_price;
      const sPrice = product.s_price;

      const dashboard = await Dashboard.findOne({ email });
      const date = new Date();
      const month = (date.getMonth() + 1).toString();
      const year = date.getFullYear().toString();
      if (dashboard) {
        const monthData = dashboard.data.find(
          (monthData) => monthData.month === month && monthData.year === year
        );
        if (monthData) {
          // Update the monthly data
          // monthData.monthly_data.revenue += ;
          monthData.monthly_data.profit += quantity * (sPrice - cPrice);
          monthData.monthly_data.sales += quantity * sPrice;
        } else {
          // If a record for the current month doesn't exist, create a new one
          dashboard.data.push({
            month: month,
            year: year,
            monthly_data: {
              profit: quantity * (product.s_price - product.c_price),
              sales: quantity * product.s_price,
            },
          });
        }
        // Save the dashboard
        await dashboard.save();
      } else {
        profit = quantity * (sPrice - cPrice);
        sales = quantity * sPrice;
        const newDashboard = new Dashboard({
          email: email,
          data: [
            {
              month: month,
              year: year,
              monthly_data: {
                profit: profit,
                sales: sales,
              },
            },
          ],
        });

        await newDashboard.save();
      }
      // Find the month from variable month and year
      await Vendor.replaceOne({ email: email }, vendor);
      // await vendor.save()

      return res.status(200).json({ message: "Stock updated successfully" });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal server error" }); // Handle errors properly
    }
  } else if (role === "company") {
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
      product.name = name;
      product.desc = desc;
      product.category = category;
      product.threshold = threshold;
      product.s_price = s_price;
      product.c_price = c_price;
      // Ensure the quantity is valid and subtract it from the product
      if (product.quantity >= quantity) {
        product.quantity -= quantity;
        product.sales += quantity * product.s_price;
      } else {
        return res.status(400).json({ error: "Insufficient stock quantity" });
      }
      // Get the c_price and s_price
      const cPrice = product.c_price;
      const sPrice = product.s_price;

      const dashboard = await Dashboard.findOne({ email });
      const date = new Date();
      const month = (date.getMonth() + 1).toString();
      const year = date.getFullYear().toString();
      if (dashboard) {
        const monthData = dashboard.data.find(
          (monthData) => monthData.month === month && monthData.year === year
        );
        if (monthData) {
          // Update the monthly data
          // monthData.monthly_data.revenue += ;
          monthData.monthly_data.profit += quantity * (sPrice - cPrice);
          monthData.monthly_data.sales += quantity * sPrice;
        } else {
          // If a record for the current month doesn't exist, create a new one
          dashboard.data.push({
            month: month,
            year: year,
            monthly_data: {
              profit: quantity * (product.s_price - product.c_price),
              sales: quantity * product.s_price,
            },
          });
        }
        // Save the dashboard
        await dashboard.save();
      } else {
        profit = quantity * (sPrice - cPrice);
        sales = quantity * sPrice;
        const newDashboard = new Dashboard({
          email: email,
          data: [
            {
              month: month,
              year: year,
              monthly_data: {
                profit: profit,
                sales: sales,
              },
            },
          ],
        });

        await newDashboard.save();
      }
      // Find the month from variable month and year
      await Company.replaceOne({ email: email }, company);
      // await company.save()

      return res.status(200).json({ message: "Stock updated successfully" });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal server error" }); // Handle errors properly
    }
  }
});

// getallproductsofvendor
// router.post('/getallproducts_v', vendorAuthenticate, async (req, res) => {
router.get("/getallproducts_v", async (req, res) => {
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
    return res.status(200).json(products);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" }); // Handle errors properly
  }
});

// getallproductsofcompany
// router.post('/getallproducts_c', vendorAuthenticate, async (req, res) => {
router.get("/getallproducts_c", async (req, res) => {
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
    return res.status(200).json(products);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" }); // Handle errors properly
  }
});

// all companies for marketplace
// router.get('/allcompanies', vendorAuthenticate, async (req, res) => {
router.get("/allcompanies", async (req, res) => {
  try {
    // Use the Company model to find all companies in the database
    const companies = await Company.find();
    if (!companies || companies.length === 0) {
      return res.status(404).json({ error: "No companies found" });
    }

    // Send the list of companies as a JSON response
    return res.status(200).json(companies);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

// order_request
// router.post('/request',vendorAuthenticate,  async (req, res) => {
router.post("/request", async (req, res) => {
  const product = req.body.product;
  const c_email = req.body.c_email;
  let v_email;
  if (req.cookies) {
    if (req.cookies.inv_man) {
      if (req.cookies.inv_man.role) {
        v_email = req.cookies.inv_man.email;
      }
    } else {
      return res.status(500).json({ error: "Please login to continue" });
    }
  } else {
    return res.status(500).json({ error: "Please login to continue" });
  }

  const products = [];
  product.forEach((pro) => {
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
    return res.status(422).json({ error: "Invalid request made" });
  }

  try {
    const venreq = new Order({ c_email, v_email, products });
    await venreq.save();
    return res.status(200).json({ msg: "Request sent successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

// for deletion of order request
router.post("/ordercancellation", async (req, res) => {
  const id = req.body.id;

  try {
    const venreq = new Order({ _id_id });
    if (venreq.status === "Accepted")
      return res.status(400).json({ error: "Request already accepted" });
    else {
      try {
        const del = new Order({ _id: id });
        await del.delete();
        return res.status(200).json({ msg: "Request deleted successfully" });
      } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal server error" });
      }
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

// vendor profile
router.get("/profile", async (req, res) => {
  let email
  if (req.cookies) {
    if (req.cookies.inv_man) {
      if (req.cookies.inv_man.role) {
        email = req.cookies.inv_man.email;
      }
    } else {
      return res.status(500).json({ error: "Please login to continue" });
    }
  } else {
    return res.status(500).json({ error: "Please login to continue" });
  }

  try {
    const user = await Profile.findOne({ email: email })
    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }
    return res.status(200).json(user);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

//orders by vendors
router.get("/orders_v", async (req, res) => {
  let email;
  if (req.cookies) {
    if (req.cookies.inv_man) {
      if (req.cookies.inv_man.role) {
        email = req.cookies.inv_man.email;
      }
    } else {
      return res.status(500).json({ error: "Please login to continue" });
    }
  } else {
    return res.status(500).json({ error: "Please login to continue" });
  }
  try {
    const orders = await Order.find({ v_email: email });
    if (!orders) {
      return res.status(400).json({ error: "No orders found" });
    }
    orders.reverse();
    return res.status(200).json(orders);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/getallproducts", async (req, res) => {
  let email, role;
  if (req.cookies) {
    if (req.cookies.inv_man) {
      if (req.cookies.inv_man.role) {
        email = req.cookies.inv_man.email;
        role = req.cookies.inv_man.role;
      }
    } else {
      return res.status(500).json({ error: "Please login to continue" });
    }
  } else {
    return res.status(500).json({ error: "Please login to continue" });
  }

  if (role === "vendor") {
    try {
      const vendor = await Vendor.findOne({ email: email });
      if (!vendor) {
        return res.status(400).json({ error: "Vendor not found" });
      }
      const products = vendor.products;
      if (!products) {
        return res.status(400).json({ error: "No products found" });
      }
      products.reverse();
      return res.status(200).json(products);
    } catch (error) {
      return res.status(500).json({ error: "Internal server error" });
    }
  } else if (role === "company") {
    try {
      const company = await Company.findOne({ email: email });
      if (!company) {
        return res.status(400).json({ error: "Company not found" });
      }
      const products = company.products;
      if (!products) {
        return res.status(400).json({ error: "No products found" });
      }
      products.reverse();
      return res.status(200).json(products);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }
});

router.post("/vendorlogout", (req, res) => {
  res.clearCookie("inv_man", { path: "/" });
  return res.status(200).json({ msg: "Logged out successfully" });
});

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

router.post("/getFilteredCompanies", async (req, res) => {
  try {
    const searchQuery = req.body.search;

    // Find companies that match the search query in their names
    const companies = await Company.find({
      $or: [
        { name: { $regex: searchQuery, $options: "i" } }, // Case-insensitive name search
        { "products.name": { $regex: searchQuery, $options: "i" } }, // Search in product names
      ],
    });

    return res.json(companies);
  } catch (error) {
    return res.status(500).json({ error: "Server Error in searchRecipes" });
  }
});

router.post("/confirmDelivery", async (req, res) => {
  let email;
  if (req.cookies) {
    if (req.cookies.inv_man) {
      if (req.cookies.inv_man.role) {
        email = req.cookies.inv_man.email;
      }
    } else {
      return res.status(500).json({ error: "Please login to continue" });
    }
  } else {
    return res.status(500).json({ error: "Please login to continue" });
  }
  const id = req.body.id;
  try {
    const order = await Order.findOne({ _id: id });
    const company = await Company.findOne({ email: order.c_email });
    const vendor = await Vendor.findOne({ email: email });
    if (!order) {
      return res.status(400).json({ error: "No order found" });
    }
    for (const product of order.products) {
      const vendorProduct = vendor.products.find(
        (item) => item.pid === product.pid
      );
      if (!vendorProduct) {
        const pro = company.products.find((item) => item.pid === product.pid);
        const newProduct = {
          name: product.name,
          quantity: product.quantity,
          desc: pro.desc,
          category: pro.category,
          pid: product.pid,
          name: product.name,
          c_price: pro.s_price,
        };

        // Add the new product to the vendor's products
        vendor.products.push(newProduct);
      } else {
        vendorProduct.quantity += product.quantity;
      }
      const pro = company.products.find((item) => item.pid === product.pid);
      const cPrice = pro.c_price;
      const sPrice = pro.s_price;
      const quantity = product.quantity;
      pro.sales += quantity * sPrice;
      const dashboard = await Dashboard.findOne({ email: order.c_email });
      const date = new Date();
      const month = (date.getMonth() + 1).toString();
      const year = date.getFullYear().toString();
      if (dashboard) {
        const monthData = dashboard.data.find(
          (monthData) => monthData.month === month && monthData.year === year
        );
        if (monthData) {
          // Update the monthly data
          monthData.monthly_data.profit += quantity * (sPrice - cPrice);
          monthData.monthly_data.sales += quantity * sPrice;
        } else {
          // If a record for the current month doesn't exist, create a new one
          dashboard.data.push({
            month: month,
            year: year,
            monthly_data: {
              profit: quantity * (sPrice - cPrice),
              sales: quantity * sPrice,
            },
          });
        }
        // Save the dashboard
        await dashboard.save();
      } else {
        profit = quantity * (sPrice - cPrice);
        sales = quantity * sPrice;
        const newDashboard = new Dashboard({
          email: order.c_email,
          data: [
            {
              month: month,
              year: year,
              monthly_data: {
                profit: profit,
                sales: sales,
              },
            },
          ],
        });

        await newDashboard.save();
      }
      await Company.replaceOne({ email: order.c_email }, company);
    }
    order.status = "Delivered";
    await Order.replaceOne({ _id: id }, order);
    await Vendor.replaceOne({ email: email }, vendor);
    return res.status(200).json({ msg: "Order delivery confirmed" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/declineConfirmation", async (req, res) => {
  const id = req.body.id;
  try {
    const order = await Order.findOne({ _id: id });
    const email = order.c_email;
    const company = await Company.findOne({ email: email });
    if (!order) {
      return res.status(400).json({ error: "No order found" });
    }
    for (const product of order.products) {
      const companyProduct = company.products.find(
        (item) => item.pid === product.pid
      );
      companyProduct.quantity += product.quantity;
    }

    order.status = "Declined";
    await Order.replaceOne({ _id: id }, order);
    await Company.replaceOne({ email: order.c_email }, company);
    return res.status(200).json({ msg: "Order declined" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/updateprofile", async (req, res) => {
  const { name, email, phone, address, companyGenre, logo, GSTNO, dob } = req.body;
  let role;
  if (req.cookies) {
    if (req.cookies.inv_man) {
      if (req.cookies.inv_man.role) {
        role = req.cookies.inv_man.role;
      }
    } else {
      return res.status(500).json({ error: "Please login to continue" });
    }
  } else {
    return res.status(500).json({ error: "Please login to continue" });
  }
  if (!name || !phone) {
    return res.status(422).json({ error: "All fields need to be filled" });
  }
  try {
    const user = await Profile.findOne({ email: email });
    if (!user) {
      return res.status(400).send({ error: "User not found" });
    }
    user.name = name;
    user.phone = phone;
    user.address = address;
    user.companyGenre = companyGenre;
    user.logo = logo;
    user.GSTNO = GSTNO;
    user.dob = dob;
    await Profile.replaceOne({ email: email }, user);
    return res.status(200).json({ msg: "Profile updated successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/getinfo", async (req, res) => {
  const { email } = req.body;
  let role;
  if (req.cookies) {
    if (req.cookies.inv_man) {
      if (req.cookies.inv_man.role) {
        role = req.cookies.inv_man.role;
      }
    } else {
      return res.status(500).json({ error: "Please login to continue" });
    }
  } else {
    return res.status(500).json({ error: "Please login to continue" });
  }

  try {
    if (role === "vendor") {
      const comp = await Company.findOne({ email: email });
      if (!comp) {
        return res.status(400).json({ error: "Company not found" });
      }
      return res.status(200).json({
        details: { name: comp.name, email: comp.email, phone: comp.phone },
      });
    } else if (role === "company") {
      const vend = await Vendor.findOne({ email: email });
      if (!vend) {
        return res.status(400).json({ error: "Vendor not found" });
      }
      return res.status(200).json({
        details: { name: vend.name, email: vend.email, phone: vend.phone },
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/topselling_v", async (req, res) => {
  let email;
  if (req.cookies) {
    if (req.cookies.inv_man) {
      if (req.cookies.inv_man.role) {
        email = req.cookies.inv_man.email;
      }
    } else {
      return res.status(500).json({ error: "Please login to continue" });
    }
  } else {
    return res.status(500).json({ error: "Please login to continue" });
  }
  try {
    const vendor = await Vendor.findOne({ email: email });

    if (!vendor) {
      return res.status(404).json({ error: "Vendor not found" });
    }
    let products = vendor.products;
    products = products.filter((product) => product.sales !== 0);
    products.sort((a, b) => b.sales - a.sales);
    let top5Products = [];
    let others = 0;
    if (products.length < 5) {
      top5Products = products;
    } else {
      top5Products = products.slice(0, 5);
      for (i = 5; i < products.length; i++) {
        others += products[i].sales;
      }
    }
    return res.status(200).json({ top5Products, others });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/prothreshold_v", async (req, res) => {
  let email;
  if (req.cookies) {
    if (req.cookies.inv_man) {
      if (req.cookies.inv_man.role) {
        email = req.cookies.inv_man.email;
      }
    } else {
      return res.status(500).json({ error: "Please login to continue" });
    }
  } else {
    return res.status(500).json({ error: "Please login to continue" });
  }

  try {
    const vendor = await Vendor.findOne({ email: email });
    if (!vendor) {
      return res.status(400).json({ error: "Vendor not found" });
    }
    const pro = vendor.products;
    const products = [];
    for (const product of pro) {
      if (product.quantity <= product.threshold) {
        products.push(product);
      }
    }
    return res.status(200).json(products);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

router.get('/monthlysales_v', async (req, res) => {
  let email;
  if (req.cookies) {
    if (req.cookies.inv_man) {
      if (req.cookies.inv_man.role) {
        email = req.cookies.inv_man.email;
      }
    } else {
      return res.status(500).json({ error: "Please login to continue" });
    }
  } else {
    return res.status(500).json({ error: "Please login to continue" });
  }
  const currentYear = new Date().getFullYear(); // Get the current year

  try {
    // Query the database to find the monthly sales data for the specified email and current year
    const vendorSalesData = await Dashboard.find({
      email,
      'data.year': currentYear, // Filter by the current year
    });

    if (vendorSalesData.length === 0) {
      // If no data is found for the email and current year, return an appropriate response
      return res.status(404).json({ error: 'No data found for this vendor in the current year.' });
    }

    // If data is found, create a new array with just the "month" and "sales" from each "monthly_data" entry
    const monthlySales = vendorSalesData[0].data.map((entry) => ({
      month: entry.month,
      sales: entry.monthly_data.sales,
    }));

    // Return the new array in the response
    res.status(200).json(monthlySales);
  } catch (err) {
    // Handle any errors that may occur during the database query
    res.status(500).json({ error: 'An error occurred while fetching data.' });
  }
});

module.exports = router;
