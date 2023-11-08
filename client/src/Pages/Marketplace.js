import React from "react";
import { useState, useEffect } from "react";
import SearchIcon from "@mui/icons-material/Search";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Container,
  Grid,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import ListItemText from "@mui/material/ListItemText";
import ListItem from "@mui/material/ListItem";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
const useStyles = makeStyles((theme) => ({
  card: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Marketplace = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    document.title = "Sangrah | Marketplace";
  }, []);
  const cardColorsList = [
    "rgba(250, 243, 240, 0.5)",
    "rgba(212, 226, 212, 0.5)",
    "rgba(255, 202, 204, 0.5)",
    "rgba(219, 196, 240, 0.5)",
    "rgba(255, 244, 210, 0.5)",
  ];

  const [search, setSearch] = useState("");
  const classes = useStyles();
  const [currcompany, setcurrcompany] = useState("undefined");
  const [open, setOpen] = React.useState(false);
  const [cardColors, setCardColors] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [selectedProductPrice, setSelectedProductPrice] = useState(0);
  const [selectedProductQuantity, setSelectedProductQuantity] = useState(0);
  const [selectedProduct, setSelectedProduct] = useState("NaN");
  const [selectedProductPid, setSelectedProductPid] = useState("NaN");

  useEffect(() => {
    // Initialize the previousColor as an invalid color to start
    let previousColor = null;
    const colors = companies.map(() => {
      previousColor = getRandomColor(previousColor); // Pass the previous color to avoid repetition
      return previousColor;
    });
    setCardColors(colors);
  }, [companies]);

  useEffect(() => {
    axios
      .get("/allcompanies")
      .then((res) => {
        setCompanies(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleProductSelect = (e) => {
    const selectedProduct = e.target.value;
    const product = currcompany.products.find(
      (p) => p.name === selectedProduct
    );
    if (product) {
      setSelectedProduct(product.name);
      setSelectedProductPid(product.pid);
      setSelectedProductPrice(product.s_price);
    } else {
      setSelectedProduct("NaN");
      setSelectedProductPid("NaN");
      setSelectedProductPrice(0);
    }
  };

  const handleQuantitySelect = (e) => {
    const selectedQuantity = e.target.value;
    setSelectedProductQuantity(selectedQuantity);
  };
  // useEffect(() => {
  //     console.log("SET COMPANIES", companies)
  // }, [companies])
  const addProduct = (name, quantity, totalPrice, pid) => {
    setSelectedProducts([
      ...selectedProducts,
      { name, quantity, totalPrice, pid },
    ]);
  };
  function getRandomColor(previousColor) {
    let newColor;
    do {
      newColor =
        cardColorsList[Math.floor(Math.random() * cardColorsList.length)];
    } while (newColor === previousColor); // Keep generating until a different color is obtained
    return newColor;
  }
  function handleClickOpen(company) {
      setcurrcompany(company);
      setOpen(true);
  }

  const handleOrderSubmit = async () => {
    if (selectedProducts.length !== 0) {
      try {
        const c = await axios.post("/request", {
          c_email: currcompany.email,
          product: selectedProducts,
        });
        if (c.status === 200) {
          toast.success(c.data.msg);
        } else if (c.status === 422) {
          toast.warning(c.data.error);
        }
      } catch (error) {
        if (error.response) {
          toast.error(error.response.data.error);
        } else {
          toast.error("Some error occured");
        }
      }
      setOpen(false);
      setcurrcompany("undefined");
      setSelectedProducts([]);
      setSelectedProductPrice(0);
      setSelectedProduct("NaN");
      setSelectedProductPid("NaN");
      setSelectedProductQuantity(0);
    } else {
      toast.info("No products selected");
    }
  };

  const handleClose = async () => {
    setOpen(false);
    setcurrcompany("undefined");
    setSelectedProducts([]);
    setSelectedProductPrice(0);
    setSelectedProduct("NaN");
    setSelectedProductPid("NaN");
    setSelectedProductQuantity(0);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setSearch(e.target.value);
  };
  return (
    <div>
      <form
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
        onSubmit={(e) => {
          e.preventDefault();
          window.location.href = `/search/:${search}`;
        }}
      >
        <input
          type="text"
          name="searchquery"
          placeholder="Search here"
          onChange={handleSearch}
          value={search}
          style={{
            borderRadius: "50px",
            height: "50px",
            padding: "10px",
            margin: "1rem",
            width: "30%",
            border: "1px solid #545e6f",
          }}
        />
        <SearchIcon
          style={{
            alignSelf: "center",
            cursor: "pointer",
            position: "relative",
            right: "60px",
          }}
          onClick={() => {
            window.location.href = `/search/:${search}`;
          }}
        ></SearchIcon>
      </form>
      <Container maxWidth="lg">
        <Grid
          container
          spacing={3}
          style={{
            display: "flex",
            // flexDirection: companies.length < 3 ? 'column' : 'row',
            justifyContent: "center",
            // border: "1px solid #545e6f",
            alignItems: companies.length < 3 ? "center" : "flex-start", // Center vertically only when there's a single card
          }}
        >
          {companies.map((company, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card
                className={classes.card}
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  backgroundColor: cardColors[index],
                  height: "100%",
                  alignItems: "center",
                  padding: "1rem",
                  boxShadow:
                    "rgba(9, 30, 66, 0.25) 0px 4px 8px -2px, rgba(9, 30, 66, 0.08) 0px 0px 0px 1px",
                }}
              >
                {/* <CardMedia
                                    className={classes.media}
                                    image={company.logo}
                                    title={company.name}
                                /> */}
                <CardContent>
                  <Typography variant="h6" component="div">
                    {company.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {company.description}
                  </Typography>
                </CardContent>
                <Button
                  variant="outlined"
                  onClick={(e) => {
                    e.preventDefault();
                    handleClickOpen(company);
                  }}
                >
                  Order
                </Button>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      <div>
        <Dialog
          fullScreen
          open={open}
          onClose={handleClose}
          TransitionComponent={Transition}
        >
          <AppBar sx={{ position: "relative" }}>
            <Toolbar>
              <IconButton
                edge="start"
                color="inherit"
                aria-label="close"
                onClick={() => {
                    handleClose();
                    setcurrcompany("undefined");
                    setSelectedProducts([]);
                  }}
              >
                <CloseIcon/>
              </IconButton>
              <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                Order Details
              </Typography>
              <Button autoFocus color="inherit" onClick={handleOrderSubmit}>
                Order
              </Button>
            </Toolbar>
          </AppBar>
          <List>
            <ListItem>
              <ListItemText
                primary="Company Name"
                secondary={currcompany.name}
              />
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemText
                primary="Company Email"
                secondary={currcompany.email}
              />
            </ListItem>
            <Divider />
            {selectedProducts.length === 0 ? (
              <ListItemText
                primary="No Products Selected"
                style={{
                  textAlign: "left",
                  marginLeft: "1rem",
                  fontSize: "1.5rem",
                }}
              />
            ) : (
              <>
                <List>
                  <ListItemText
                    primary="Products Selected"
                    style={{
                      textAlign: "left",
                      marginLeft: "1rem",
                      fontSize: "1.5rem",
                    }}
                  />

                  {selectedProducts.map((item, index) => (
                    <div key={index}>
                      <ListItem>
                        <ListItemText
                          primary={`PID: ${item.pid}`}
                          secondary={`Product Name: ${item.name}   Quantity: ${item.quantity}   Total Price: ₹ ${item.totalPrice}`}
                        />
                        <IconButton
                          edge="end"
                          color="inherit"
                          onClick={() => {
                            // Remove the selected product
                            const updatedProducts = [...selectedProducts];
                            updatedProducts.splice(index, 1);
                            setSelectedProducts(updatedProducts);
                          }}
                        >
                          <CloseIcon />
                        </IconButton>
                      </ListItem>
                      <Divider />
                    </div>
                  ))}
                </List>
              </>
            )}

            <Divider />
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-around",
                alignItems: "center",
                width: "100%",
                backgroundColor: "#f5f5f5",
              }}
            >
              <div
                style={{
                  // backgroundColor: '#f5f5f5',
                  width: "400px",
                }}
              >
                <ListItem
                  style={{
                    width: "300px",
                  }}
                >
                  <ListItemText primary="Select Product" />
                  {currcompany === "undefined" ? (
                    <></>
                  ) : (
                    <select
                      value={selectedProduct}
                      onChange={handleProductSelect}
                    >
                      <option value={selectedProduct} disabled hidden>
                        {selectedProduct}
                      </option>
                      {currcompany.products.map((product, index) => (
                        <option key={index} value={product.name}>
                          {product.name}
                        </option>
                      ))}
                    </select>
                  )}
                </ListItem>
              </div>
              <Divider />
              <div
                style={{
                  // backgroundColor: '#f5f5f5',
                  width: "400px",
                }}
              >
                <ListItem
                  style={{
                    width: "100%",
                  }}
                >
                  <ListItemText primary="Price:" />
                  {selectedProductPrice && (
                    <ListItemText>₹ {selectedProductPrice}</ListItemText>
                  )}
                </ListItem>
              </div>
              <Divider />
              <div
                style={{
                  // backgroundColor: '#f5f5f5',
                  width: "500px",
                }}
              >
                <ListItem
                  style={{
                    width: "100%",
                  }}
                >
                  <ListItemText primary="Quantity:" />
                  <input
                    type="number"
                    min="1"
                    id="quan"
                    defaultValue={0}
                    onChange={handleQuantitySelect}
                    style={{
                      width: "100px",
                    }}
                  />
                </ListItem>
              </div>
              <Divider />
              <div
                style={{
                  // backgroundColor: '#f5f5f5',
                  width: "400px",
                }}
              >
                <ListItem
                  style={{
                    width: "300px",
                  }}
                >
                  <ListItemText primary="Total Price:" />
                  {selectedProductPrice && (
                    <ListItemText>
                      ₹{" "}
                      {selectedProductPrice * parseInt(selectedProductQuantity)}
                    </ListItemText>
                  )}
                </ListItem>
              </div>

              <Divider />
              <ListItem>
                <Button
                  variant="outlined"
                  onClick={() => {
                    // Get the selected product and quantity
                    const selectedProduct =
                      document.querySelector("select").value;
                    const quantity = parseInt(
                      document.querySelector("#quan").value
                    );
                    if (selectedProduct === "NaN") {
                      toast.warning("Product not selected");
                    } else if (quantity === 0) {
                      toast.warning("Product quantity not mentioned");
                    } else {
                      // Add the product to the order
                      addProduct(
                        selectedProduct,
                        quantity,
                        selectedProductPrice * quantity,
                        selectedProductPid
                      );
                      setSelectedProduct("NaN");
                      setSelectedProductPid("NaN");
                      setSelectedProductPrice(0);
                      document.querySelector("#quan").value = 0;
                    }
                  }}
                >
                  Add to Order
                </Button>
              </ListItem>
            </div>
          </List>
        </Dialog>
      </div>
    </div>
  );
};

export default Marketplace;
