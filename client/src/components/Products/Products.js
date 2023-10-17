
import React from "react";
// import Button from '@mui/material/Button';
// import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Card from "../UI/Card";
import "./Products.css";
import ProductTable from "./ProductTable";
import { useState } from "react";
import { TextField, Button, Select, MenuItem, FormControl,InputLabel } from '@mui/material';
import axios from 'axios'


const rows = [
  { id: 1, date: '2019-09-09', vendor: 'Jon', productName: 'Shampoo' },
  { id: 2, date: '2020-03-15', vendor: 'Alice', productName: 'Soap' },
  { id: 3, date: '2020-06-22', vendor: 'Bob', productName: 'Toothpaste' },
  { id: 4, date: '2020-11-18', vendor: 'Emily', productName: 'Body Lotion' },
  { id: 5, date: '2021-02-05', vendor: 'David', productName: 'Conditioner' },
  { id: 6, date: '2021-08-30', vendor: 'Sophia', productName: 'Face Wash' },
  { id: 7, date: '2022-12-10', vendor: 'Olivia', productName: 'Hand Sanitizer' },
  { id: 8, date: '2023-07-25', vendor: 'Liam', productName: 'Shower Gel' },
  { id: 9, date: '2023-05-14', vendor: 'Emma', productName: 'Perfume' },
];


const Products = () => {
  const [open, setOpen] = React.useState(false);
  const [product, setProduct] = useState({
    name: '',
    quantity: 0,
    desc: '',
    category: '',
    pid: '',
    manufacturer: '',
    threshold: 0,
    s_price: 0,
    c_price: 0
  });
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct({
      ...product,
      [name]: value
    });
  };

  const handleAddSubmit = async(e) => {
    e.preventDefault();
    console.log("product object : ",product)
    try {
      const res = await axios.post('/addproducts_c', product);
      console.log("res.status : ",res.status)
      console.log("res.message : ",res.message)

      if(res.status===201){
        window.alert(res.data.message)
      }
      else {
        window.alert("Adding product failed")
      }
      setProduct({
        name: '',
        quantity: 0,
        desc: '',
        category: '',
        pid: '',
        manufacturer: '',
        threshold: 0,
        s_price: 0,
        c_price: 0
      })
      handleClose()
    } catch (error) {
      console.log(error)
      alert('Internal server error');
    }

  }

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here, for example, sending the product data to an API.
    console.log(product);
  };
  return (
    <div style={{
      // border: "2px solid red",
      display: "flex",
      flexDirection: "column"
    }}>

        <div  className="products" style={{
          // border: "2px solid red",
          margin: "0em auto",
          marginTop : "2em",
          padding: "0em",
          display: "flex",
          justifyContent: "flex-end"
        }}>
       <Button variant="outlined" onClick={handleClickOpen} style={{

       }}>
       + Add Product 
      </Button>
      </div>
      <Card className="products">
       <ProductTable data={rows} />
      </Card>
    <div>
     
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Product Details</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please add all the details of your product correctly.
          </DialogContentText>
          <form onSubmit={handleSubmit}>
      <TextField
        label="Name"
        variant="outlined"
        name="name"
        value={product.name}
        onChange={handleInputChange}
        required
        fullWidth
              margin="normal"
      />
      <TextField
        label="Quantity"
        variant="outlined"
        name="quantity"
        type="number"
        value={product.quantity}
        onChange={handleInputChange}
        required
        fullWidth
              margin="normal"
      />
      <TextField
        label="Description"
        variant="outlined"
        name="desc"
        value={product.desc}
        onChange={handleInputChange}
        required
        fullWidth
              margin="normal"
      />
      <TextField
        label="Category"
        variant="outlined"
        name="category"
        value={product.category}
        onChange={handleInputChange}
        required
        fullWidth
              margin="normal"
      />
      <TextField
        label="Product ID"
        variant="outlined"
        name="pid"
        value={product.pid}
        onChange={handleInputChange}
        required
        fullWidth
              margin="normal"
      />
      <TextField
        label="Manufacturer"
        variant="outlined"
        name="manufacturer"
        value={product.manufacturer}
        onChange={handleInputChange}
        fullWidth
              margin="normal"
      />
      <TextField
        label="Threshold"
        variant="outlined"
        name="threshold"
        type="number"
        value={product.threshold}
        onChange={handleInputChange}
        required
        fullWidth
              margin="normal"
      />
      <TextField
        label="Selling Price"
        variant="outlined"
        name="s_price"
        type="number"
        value={product.s_price}
        onChange={handleInputChange}
        required
        fullWidth
              margin="normal"
      />
      <TextField
        label="Cost Price"
        variant="outlined"
        name="c_price"
        type="number"
        value={product.c_price}
        onChange={handleInputChange}
        required
        fullWidth
        margin="normal"
      />
    </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleAddSubmit}>Add</Button>
        </DialogActions>
      </Dialog>
    </div>
    </div>
  );
};

export default Products;