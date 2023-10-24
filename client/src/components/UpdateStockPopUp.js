import React from "react";
import axios from 'axios'
import {
  Button,
} from "@mui/material";
import "../css_files/Popup.css";

const UpdateStockPopUp = ({ details }) => {
  const handleClose = async() => {
    const c = await axios.get("/getallproducts", {
      withCredentials: true,
    });
    details.setAllProducts(c.data);
    
    if (details.currInput === "") {
      details.setFilteredProducts([]);
      return
    }
    else{
      const filPro = details.allProducts.filter((pro) => {
        const regex = new RegExp(details.currInput, "i");
        return pro.name.match(regex) || pro.pid.match(regex);
      });
      details.setFilteredProducts(filPro);
    }
    
    details.setIsVisible(false);
  };

  const updateStock = async(event) => {
    event.preventDefault();
    console.log(event.target)
    const stock=event.target.stock.value
    const newquantity = event.target.newquantity.value
    
    if(stock==="add"){
      let c
      try {
        c = await axios.post('/addstock', {quantity:newquantity, pid:details.pid})

        if(c.status===200){
          await handleClose()
          alert(c.data.message)
        }
        else{
          alert(c.data.error)
        }
      }catch (error) {
        if (error.response) {
          alert(error.response.data.error);
        }
        else {
          alert("Some error occured");
        }
      }
    } 
    else if(stock==="subtract"){
      try {
        const c = await axios.post('/subtractstock', {quantity:newquantity, pid:details.pid})
        
        if(c.status===200){
          await handleClose()
          alert(c.data.message)
        }
      }catch (error) {
        if (error.response) {
          alert(error.response.data.error);
        }
        else {
          alert("Some error occured");
        }
      }
    }
  };

  return (
    <>
      <div className="popup-container">
        <div className="popup-content">
          <div className="popup-header">
            <h2>Update Stock</h2>
            <Button onClick={handleClose}>Close</Button>
          </div>
          <div className="mb-2 row">
            <div className="mb-2 row">
              <div className="col-auto">
                <input
                  type="text"
                  readOnly
                  className="form-control-plaintext"
                  value="Product ID "
                />
              </div>
              <div className="col-auto">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Product ID"
                  value={details.pid}
                  readOnly
                  required
                />
              </div>
            </div>
            <div className="mb-2 row">
              <div className="col-auto">
                <input
                  type="text"
                  readOnly
                  className="form-control-plaintext"
                  value="Product Name "
                />
              </div>
              <div className="col-auto">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Product Name"
                  value={details.name}
                  readOnly
                  required
                />
              </div>
            </div>
            <div className="mb-2 row">
              <div className="col-auto">
                <input
                  type="text"
                  readOnly
                  className="form-control-plaintext"
                  value="Category "
                />
              </div>
              <div className="col-auto">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Category"
                  value={details.category}
                  readOnly
                  required
                />
              </div>
            </div>
            <div className="mb-2 row">
              <div className="col-auto">
                <input
                  type="text"
                  readOnly
                  className="form-control-plaintext"
                  value="Quantity "
                />
              </div>
              <div className="col-auto">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Quantity"
                  value={details.quantity}
                  readOnly
                  required
                />
              </div>
            </div>
          </div>
          <form onSubmit={updateStock}>
            <div className="col-auto mt-3">
              <div style={{ display: "flex", flexDirection: "row" }}>
                <div className="form-check" style={{ paddingLeft: "10px" }}>
                  <input
                    className="form-check-input"
                    type="radio"
                    name="stock"
                    id="flexRadioDefault1"
                    value="add"
                  />
                  <label
                    className="form-check-label"
                    htmlFor="flexRadioDefault1"
                  >
                    Add Stock
                  </label>
                </div>
                <div className="form-check" style={{ paddingLeft: "50px" }}>
                  <input
                    className="form-check-input"
                    type="radio"
                    name="stock"
                    id="flexRadioDefault2"
                    value="subtract"
                    defaultChecked
                  />
                  <label
                    className="form-check-label"
                    htmlFor="flexRadioDefault2"
                  >
                    Subtract Stock
                  </label>
                </div>
              </div>
              <div style={{ display:"flex", margin:"5px", flexDirection:"row"}} >
                <div style={{ display:"flex"}}>
                  <input
                    type="text"
                    readOnly
                    className="form-control-plaintext"

                    value="Enter Quantity"
                  />
                  <div className="col-auto">
                    <input
                      type="number"
                      name="newquantity"
                      className="form-control"
                      placeholder="Quantity"
                    />
                  </div>
                </div>
              </div>
                <div className="align-self-center">
                  <button
                    type="submit"
                    style={{
                      display: "flex",
                      margin: "auto",
                      marginTop: "10px",
                    }}
                    className="btn btn-primary"
                  >
                    Update Stock
                  </button>
                </div>
                <div className="col-auto"></div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default UpdateStockPopUp;
