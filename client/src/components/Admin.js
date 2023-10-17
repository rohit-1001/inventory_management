import React, { useState, useEffect} from "react";
import DonutChart from "./DonutChart";
import image1 from '../assets/image_2.png'
import axios from "axios";
import { createRoot } from 'react-dom/client';
import {
  Container,
  Grid,
  Paper,
  // Avatar,
  Typography,
  Table,
  TableContainer,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Button,
  Box,
} from "@mui/material";
import ViewProductsPopup from "./ViewProductsPopup.js";

const Admin = () => {
  const [activeTab, setActiveTab] = useState("vendors");
  const [companies, setCompanies] = useState([]);
  const [vendors, setVendors] = useState([]);
  const [isVisible, setIsVisible] = useState(false);
  const getData = async () => {
    try {
      const c = await axios.get("/allcompanies");

      setCompanies(c.data);
    } catch (error) {
      alert("Some error occurred");
    }
    try {
      const v = await axios("/allvendors");

      setVendors(v.data);
    } catch (error) {
      alert("Some error occurred");
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const handleShowProducts = async (email, role) => {
    setIsVisible(true);
    const param = {
      email: email,
      role: role,
    };
    try {
      const p = await axios.post("/allproductsadmin", param);
      if (p.data.length > 0) {
        const root = createRoot(document.getElementById('forShowingProducts'));
        root.render(<ViewProductsPopup details={{ products: p.data, setIsVisible: setIsVisible }} />);
      }
      else {
        const root = createRoot(document.getElementById('forShowingProducts'));
        root.render(alert("No product exists"));
      }
    } catch (error) {
      alert("Some error occured")
    }
  };

  const data = {
    nvendors: 200,
    ncompany: 100,
    tsales: 1000,
    tprods: 5000,
  };

  return (
    <>
    <br></br>
      <div className="container" style={{ "width": "100%", "margin": "auto" }}>
        <div className="row justify-content-center"> {/* Added justify-content-center class */}
          <div className="col-md-5">
            <Box sx={{ border: '1px solid black', padding: '10px' }}>
              <div>
                <div>
                  Number of vendors
                </div>
                <div className='d-flex align-items-center'>
                  <div>
                    <img src={image1} alt="Image" className="img-fluid" />
                  </div>
                  <div className="ml-2">
                    {data.nvendors}
                  </div>
                </div>
              </div>
            </Box>
          </div>
          <div className="col-md-5">
            <Box sx={{ border: '1px solid black', padding: '10px' }}>
              <div>
                <div>
                  Number of Companies
                </div>
                <div className='d-flex align-items-center'>
                  <div>
                    <img src={image1} alt="Image" className="img-fluid" />
                  </div>
                  <div className="ml-2">
                    {data.ncompany}
                  </div>
                </div>
              </div>
            </Box>
          </div>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <div className="col-md-5">
            <Box sx={{ border: '1px solid black', padding: '10px' }}>
              <div>
                <div>
                  Total Sales
                </div>
                <div className='d-flex align-items-center'>
                  <div>
                    <img src={image1} alt="Image" className="img-fluid" />
                  </div>
                  <div className="ml-2">
                    {data.tsales}
                  </div>
                </div>
              </div>
            </Box>
          </div>
          <div className="col-md-5">
            <Box sx={{ border: '1px solid black', padding: '10px' }}>
              <div>
                <div>
                  Total Products
                </div>
                <div className='d-flex align-items-center'>
                  <div>
                    <img src={image1} alt="Image" className="img-fluid" />
                  </div>
                  <div className="ml-2">
                    {data.tprods}
                  </div>
                </div>
              </div>
            </Box>
          </div>
        </div>
      </div>
      <br></br>
      <br></br>
      <br></br>
      <div className="flex">
        <DonutChart data={data} />
      </div>
      
      <br></br>
      <br></br>
      {/* {isVisible && p && <ViewProductsPopup details={{ products:p.data, setIsVisible:setIsVisible }} />} */}
      {isVisible && <div id="forShowingProducts"></div>}
      <br />
      <Container maxWidth="lg">
        <Grid>
          <div className="tabs">
            <ul className="nav nav-tabs">
              <li className="nav-item">
                <a
                  className={`nav-link ${activeTab === "vendors" ? "active" : ""
                    }`}
                  href="#vendors"
                  onClick={() => handleTabClick("vendors")}
                >
                  Vendors
                </a>
              </li>
              <li className="nav-item">
                <a
                  className={`nav-link ${activeTab === "companies" ? "active" : ""
                    }`}
                  href="#companies"
                  onClick={() => handleTabClick("companies")}
                >
                  Companies
                </a>
              </li>
            </ul>

            <div className="tab-content">
              <div
                id="vendors"
                className={`tab-pane ${activeTab === "vendors" ? "active" : ""
                  }`}
              >
                {!vendors ? (
                  <h1>No Vendors Found</h1>
                ) : (
                  <Grid item xs={12}>
                    <Paper elevation={3} style={{ padding: "20px" }}>
                      <Typography variant="h4" style={{ marginBottom: "20px" }}>
                        All Vendors
                      </Typography>
                      <TableContainer>
                        <Table>
                          <TableHead>
                            <TableRow>
                              <TableCell style={{ textAlign: "center" }}>
                                Vendor Name
                              </TableCell>
                              <TableCell style={{ textAlign: "center" }}>
                                Email
                              </TableCell>
                              <TableCell style={{ textAlign: "center" }}>
                                Phone No.
                              </TableCell>
                              <TableCell style={{ textAlign: "center" }}>
                                View Products
                              </TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {vendors.map((vendor) => (
                              <TableRow key={vendor._id}>
                                <TableCell style={{ textAlign: "center" }}>
                                  {vendor.name}
                                </TableCell>
                                <TableCell style={{ textAlign: "center" }}>
                                  {vendor.email}
                                </TableCell>
                                <TableCell style={{ textAlign: "center" }}>
                                  {vendor.phone}
                                </TableCell>
                                <TableCell style={{ textAlign: "center" }}>
                                  <Button
                                    className="link_in_table"
                                    onClick={() => handleShowProducts(vendor.email, "vendor")}
                                  >
                                    View
                                  </Button>
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </TableContainer>
                    </Paper>
                  </Grid>
                )}
              </div>

              <div
                id="companies"
                className={`tab-pane ${activeTab === "companies" ? "active" : ""
                  }`}
              >
                <Grid item xs={12}>
                  <Paper elevation={3} style={{ padding: "20px" }}>
                    <Typography variant="h4" style={{ marginBottom: "20px" }}>
                      All Companies
                    </Typography>
                    <TableContainer>
                      <Table>
                        <TableHead>
                          <TableRow>
                            <TableCell style={{ textAlign: "center" }}>
                              Company Name
                            </TableCell>
                            <TableCell style={{ textAlign: "center" }}>
                              Email
                            </TableCell>
                            <TableCell style={{ textAlign: "center" }}>
                              Phone No.
                            </TableCell>
                            <TableCell style={{ textAlign: "center" }}>
                              View Products
                            </TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {companies.map((company) => (
                            <TableRow key={company._id}>
                              <TableCell style={{ textAlign: "center" }}>
                                {company.name}
                              </TableCell>
                              <TableCell style={{ textAlign: "center" }}>
                                {company.email}
                              </TableCell>
                              <TableCell style={{ textAlign: "center" }}>
                                {company.phone}
                              </TableCell>
                              <TableCell style={{ textAlign: "center" }}>
                                <Button
                                  className="link_in_table"
                                  onClick={() => handleShowProducts(company.email, "company")}
                                >
                                  View
                                </Button>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </Paper>
                </Grid>
              </div>
            </div>
          </div>
        </Grid>
      </Container>
    </>
  );
};

export default Admin;
