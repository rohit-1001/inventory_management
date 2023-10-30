import React, { useState, useEffect } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Card from "../UI/Card";
import "./Products.css";
import ProductTable from "./ProductTable";
import UpdateStockPopUp from "../UpdateStockPopUp";
import { TextField, Button } from "@mui/material";
import axios from "axios";
import { createRoot } from 'react-dom/client';
import {
  Typography,
} from "@mui/material";
import ListItemText from "@mui/material/ListItemText";
import ListItem from "@mui/material/ListItem";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Slide from "@mui/material/Slide";
import 'react-toastify/dist/ReactToastify.css';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';

// const rows = [
//   { id: 1, date: "2019-09-09", vendor: "Jon", productName: "Shampoo" },
//   { id: 2, date: "2020-03-15", vendor: "Alice", productName: "Soap" },
//   { id: 3, date: "2020-06-22", vendor: "Bob", productName: "Toothpaste" },
//   { id: 4, date: "2020-11-18", vendor: "Emily", productName: "Body Lotion" },
//   { id: 5, date: "2021-02-05", vendor: "David", productName: "Conditioner" },
//   { id: 6, date: "2021-08-30", vendor: "Sophia", productName: "Face Wash" },
//   {
//     id: 7,
//     date: "2022-12-10",
//     vendor: "Olivia",
//     productName: "Hand Sanitizer",
//   },
//   { id: 8, date: "2023-07-25", vendor: "Liam", productName: "Shower Gel" },
//   { id: 9, date: "2023-05-14", vendor: "Emma", productName: "Perfume" },
// ];

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Products = (props) => {
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    document.title = 'Sangrah | Products';
  }, [])
  // ======================================================
  const [isVisible, setIsVisible] = useState(false);
  const [currInput, setCurrInput] = useState("");

  // ======================================================
  const [allProducts, setAllProducts] = useState([]);
  const getAllProducts = async () => {
    const c = await axios.get("/getallproducts", {
      withCredentials: true,
    });
    setAllProducts(c.data);
  };
  useEffect(() => {
    getAllProducts();
  }, []);
  const productsWithId = allProducts.map((product) => ({
    ...product,
    id: product._id, // Assigning _id as the id property
  }));
  const [open, setOpen] = React.useState(false);
  const [openUpdateBox, setOpenUpdateBox] = React.useState(false);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [product, setProduct] = useState({
    name: "",
    quantity: 0,
    desc: "",
    category: "",
    pid: "",
    manufacturer: "",
    threshold: 0,
    s_price: 0,
    c_price: 0,
  });
  // useEffect(() => {
  //   if(isVisible){
  //     const myDiv = document.getElementById('forShowingUpdateStockPopup');
  //     myDiv.style.display = 'none';
  //     setIsVisible(false)
  //   }
  //   else{
  //     try {
  //       setIsVisible(true)
  //       const root = createRoot(document.getElementById('forShowingUpdateStockPopup'));
  //       root.render(<UpdateStockPopUp details={{ pid:stock.pid, name:stock.name, category:stock.category, quantity:stock.quantity, setIsVisible }} />);
  //     } catch (error) {
  //       // setIsVisible(false);
  //       console.log(error);
  //       alert("Some error occured")
  //     }
  //   }
  // }, [isVisible])

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClickUpdateStock = () => {
    setOpenUpdateBox(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleCloseUpdateBox = () => {
    setOpenUpdateBox(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct({
      ...product,
      [name]: value,
    });
  };
  const searchPro = () => {
    if (currInput === "") {
      setFilteredProducts([]);
      return;
    }
    const filPro = allProducts.filter((pro) => {
      const regex = new RegExp(currInput, "i");
      return pro.name.match(regex) || pro.pid.match(regex);
    });

    setFilteredProducts(filPro);
  };
  const onSubmitSearch = (event) => {
    event.preventDefault();
    searchPro();
  };
  const onClickUpdate = async (name, quantity, category, pid,desc,  manufacturer, threshold, s_price, c_price) => {
    setIsVisible(true);
    try {
      const c = await axios.get("/getallproducts", {
        withCredentials: true,
      });
      const root = createRoot(document.getElementById('forShowingUpdateStockPopup'));
      root.render(<UpdateStockPopUp details={{ pid, name, category, quantity, setIsVisible, setAllProducts, setFilteredProducts, currInput, allProducts, filteredProducts, role:props.items.role, desc, manufacturer, threshold, s_price, c_price }} />);
    } catch (error) {
      toast.error("Some error occured")
    }
  };
  const handleInputChange2 = (e) => {
    setCurrInput(e.target.value);
  };
  useEffect(() => {
    searchPro();
  }, [currInput]);
  useEffect(() => {
    getAllProducts()
    searchPro();
  }, [isVisible]);

  const handleAddSubmit = async (e) => {
    e.preventDefault();
    if (props.items.role === "vendor") {
      try {
        const res = await axios.post("/addproducts_v", product);

        if (res.status === 201) {
          toast.success(res.data.message);
        } else {
          toast.error("Adding product failed");
        }
        setProduct({
          name: "",
          quantity: 0,
          desc: "",
          category: "",
          pid: "",
          manufacturer: "",
          threshold: 0,
          s_price: 0,
          c_price: 0,
        });
        handleClose();
      } catch (error) {
        toast.error("Internal server error");
      }
    } else if (props.items.role === "company") {
      try {
        const res = await axios.post("/addproducts_c", product);

        if (res.status === 201) {
          toast.success(res.data.message);
        } else {
          toast.error("Adding product failed");
        }
        setProduct({
          name: "",
          quantity: 0,
          desc: "",
          category: "",
          pid: "",
          manufacturer: "",
          threshold: 0,
          s_price: 0,
          c_price: 0,
        });
        handleClose();
      } catch (error) {
        
        toast.error("Internal server error");
      }
    }
    getAllProducts();
  };

  return (
    <>
      <div
        style={{
          // border: "2px solid red",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div
          className="products"
          style={{
            // border: "2px solid red",
            margin: "0em auto",
            marginTop: "2em",
            padding: "0em",
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <Button
            variant="outlined"
            onClick={handleClickUpdateStock}
            style={{
              margin: "10px",
            }}
          >
            🔄 Update Stock
          </Button>
          <Button
            variant="outlined"
            onClick={handleClickOpen}
            style={{
              margin: "10px",
            }}
          >
            + Add Product
          </Button>
        </div>
        <Card className="products">
          <ProductTable data={productsWithId} />
        </Card>
        <div>
          <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Product Details</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Please add all the details of your product correctly.
              </DialogContentText>
              <form>
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
        {/* =========================================================================== */}
        <div>
      <Dialog
        fullScreen
        open={openUpdateBox}
        onClose={handleCloseUpdateBox}
        TransitionComponent={Transition}
        style={{ minWidth: '300px' }}
      >
        <AppBar position="relative" style={{ backgroundColor: '#2196F3' }}>
          <Toolbar>
            <Typography variant="h6" style={{ flex: 1, textAlign: 'center' }}>
              Update Stock
            </Typography>
            <Button autoFocus color="inherit" onClick={handleCloseUpdateBox}>
              Close
            </Button>
          </Toolbar>
        </AppBar>
        <div style={{ padding: '20px' }}>
          <div className="d-flex justify-content-center">
            <form className="row g-3">
              <div className="col-auto">
                <input
                  type="text"
                  readOnly
                  className="form-control-plaintext"
                  value="Enter Product ID / Name "
                />
              </div>
              <div className="col-auto">
                <input
                  type="text"
                  className="form-control"
                  id="inputPassword2"
                  placeholder="Product ID / Name"
                  value={currInput}
                  onChange={handleInputChange2}
                  required
                />
              </div>
              <div className="col-auto">
                <button type="submit" className="btn btn-primary mb-3">
                  Search
                </button>
              </div>
            </form>
          </div>
          <List style={{ marginTop: '20px' }}>
            <Divider />
            {filteredProducts.length === 0 && currInput.length !== 0 ? (
              <Typography
                variant="h6"
                style={{
                  textAlign: 'left',
                  marginLeft: '1rem',
                  fontSize: '1.5rem',
                }}
              >
                No products found
              </Typography>
            ) : (
              filteredProducts.map((item, index) => (
                <div key={index}>
                  <ListItem style={{ justifyContent: 'space-between' }}>
                    <div>
                      <Typography variant="subtitle1">
                        Product ID: {item.pid}
                      </Typography>
                      <Typography variant="subtitle2">
                        Product Name: {item.name}
                      </Typography>
                      <Typography variant="subtitle2">
                        Category: {item.category}
                      </Typography>
                      <Typography variant="subtitle2">
                        Quantity: {item.quantity}
                      </Typography>
                    </div>
                    <Button
                      className="link_in_table"
                      onClick={() => {
                        onClickUpdate(
                          item.name,
                          item.quantity,
                          item.category,
                          item.pid,
                          item.desc,
                          props.items.role === 'vendor'
                            ? item.manufacturer
                            : '',
                          item.threshold,
                          item.s_price,
                          item.c_price
                        );
                      }}
                    >
                      Update
                    </Button>
                  </ListItem>
                  <Divider />
                </div>
              ))
            )}
          </List>
          {isVisible && <div id="forShowingUpdateStockPopup"></div>}
        </div>
      </Dialog>
    </div>
        {/* =========================================================================== */}
        {/* <Dialog
          open={isVisible}
          onClose={handleCloseUpdateBox}
          TransitionComponent={Transition}
        >
        <div id="forShowingUpdateStockPopup"></div>
        </Dialog> */}
      </div>
    </>
  );
};

export default Products;
