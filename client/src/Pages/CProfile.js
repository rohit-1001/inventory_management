import React, { useState, useEffect } from 'react';
import { Container, Grid, Paper, Typography, Button, Modal, Box, TextField } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import image1 from '../assets/testi1.jpg';
import axios from 'axios'
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
function CProfile() {
  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: null
  })
  const [newuser, setNewUser] = useState({
    name: "",
    email: "",
    phone: null
  })
  const [companyInfo, setCompanyInfo] = useState({
    name: '',
    email: '',
    phone: 0,
    address: '', // Add address
    companyGenre: '', // Add company genre
    logo: '',
    GSTNO: 0,
    Grole: "",
    dob: "",
  });
  const [companyInfoEdit, setCompanyInfoEdit] = useState({
    name: '',
    email: '',
    phone: 0,
    address: '', // Add address
    companyGenre: '', // Add company genre
    logo: '',
    GSTNO: 0,
    Grole: "",
    dob: "",
  });
  const getUserInfo = async () => {
    try {
      const c = await axios.get('/profile', {
        withCredentials: true
      })
      const { name, email, phone, address, companyGenre, logo, GSTNO, Grole, dob } = c.data
      setCompanyInfo({ name, email, phone, address, companyGenre, logo, GSTNO, Grole, dob })
      setCompanyInfoEdit({ name, email, phone, address, companyGenre, logo, GSTNO, Grole, dob })
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.error);
      } else {
        toast.error("Some error occured");
      }
    }
  }
  // Sample data for company info
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    document.title = 'Sangrah | Profile';
    getUserInfo()
  }, []);


  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const base64Image = event.target.result;
        console.log(base64Image)
        setCompanyInfoEdit({ ...companyInfoEdit, logo: base64Image });
      };
      reader.readAsDataURL(file);
    }
  };

  const [openModal, setOpenModal] = useState(false);

  const handleOpenModal = async () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleSubmit = async () => {
    try {
      const c = await axios.post('/updateprofile', { name: companyInfoEdit.name, email: companyInfoEdit.email, phone: companyInfoEdit.phone, address:companyInfoEdit.address, companyGenre:companyInfoEdit.companyGenre, logo:companyInfoEdit.logo, GSTNO:companyInfoEdit.GSTNO, Grole:companyInfoEdit.Grole, dob:companyInfoEdit.dob }, {
        withCredentials: true
      })

      if (c.status === 200) {
        toast.success(c.data.msg)
      }
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.error);
      } else {
        toast.error("Some error occured");
      }
    }
    getUserInfo()
    handleCloseModal();
  };

  return (
    <>
      <br />
      <Container maxWidth="lg">
        <Grid container spacing={3}>
          {/* Company Profile */}
          <Grid item xs={12}>
            <Paper elevation={3} style={{ padding: '60px', textAlign: 'center', display: "flex" }}>
              <div style={{ width: "100%", margin: "0 auto" }}>
                <img
                  src={companyInfo.logo}
                  alt="Company Logo"
                  style={{ width: '250px', height: '250px', borderRadius: '50%', marginBottom: '10px' }}
                />
              </div>
              <div style={{ width: "100%", margin: "0 auto", display: "flex", justifyContent: "flex-start", alignItems: "flex-start", flexDirection: "column" }}>
                <div style={{ marginBottom: '17px' }}>
                  <Typography variant="h5">{companyInfo.name}</Typography>
                </div>
                <div style={{ marginBottom: '5px' }}>
                  <Typography variant="subtitle1">Email: {companyInfo.email}</Typography>
                </div>
                <div style={{ marginBottom: '5px' }}>
                  <Typography variant="subtitle1">Contact Number: {companyInfo.phone}</Typography>
                </div>
                <div style={{ marginBottom: '5px' }}>
                  <Typography variant="subtitle1">Address: {companyInfo.address}</Typography>
                </div>
                <div style={{ marginBottom: '5px' }}>
                  <Typography variant="subtitle1">Company Type: {companyInfo.companyGenre}</Typography>
                </div>
                <div style={{ marginBottom: '5px' }}>
                  <Typography variant="subtitle1">GST No: {companyInfo.GSTNO===0 ? " ---" : companyInfo.GSTNO}</Typography>
                </div>
                <div style={{ marginBottom: '5px' }}>
                  <Typography variant="subtitle1">Role: {companyInfo.Grole==="vendor" ? "Vendor" : "Company"}</Typography>
                </div>
                <div style={{ marginBottom: '5px' }}>
                  <Typography variant="subtitle1">Date of Birth: {companyInfo.dob}</Typography>
                </div>
              </div>
            </Paper>
            <br></br>
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
              <Button variant="contained" color="primary" onClick={handleOpenModal} startIcon={<EditIcon />}>
                Edit
              </Button>
            </div>
          </Grid>
        </Grid>
      </Container>
      {/* Modal for editing company info */}
      <Modal open={openModal} onClose={handleCloseModal}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            width: "600px",
            transform: 'translate(-50%, -50%)',
            maxWidth: '100%', // Adjust the maximum width as needed
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
            overflowY: 'auto', // Enable vertical scrolling
            maxHeight: '90vh', // Limit the maximum height to the viewport height
          }}
        >
          <Typography variant="h6" gutterBottom>
            Edit Company Info
          </Typography>
          <br></br>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <img
              src={companyInfoEdit.logo}
              alt="Company Logo"
              style={{ width: '250px', height: '250px', borderRadius: '50%', marginBottom: '10px' }}
            />
            <input type="file" accept="image/*" onChange={handleImageUpload} />
            <br></br>
            <br></br>
          </div>
          <form>
            <TextField
              label="Name"
              fullWidth
              value={companyInfoEdit.name}
              onChange={(e) => setCompanyInfoEdit({ ...companyInfoEdit, name: e.target.value })}
            />
            <br></br>
            <br></br>
            <TextField
              label="Email"
              fullWidth
              value={companyInfoEdit.email}
              disabled
            />
            <br></br>
            <br></br>
            <TextField
              label="Contact Number"
              fullWidth
              value={companyInfoEdit.phone}
              onChange={(e) => setCompanyInfoEdit({ ...companyInfoEdit, phone: e.target.value })}
            />
            <br></br>
            <br></br>
            <TextField
              label="Address"
              fullWidth
              value={companyInfoEdit.address}
              onChange={(e) => setCompanyInfoEdit({ ...companyInfoEdit, address: e.target.value })}
            />
            <br></br>
            <br></br>
            <TextField
              label="Company Type"
              fullWidth
              value={companyInfoEdit.companyGenre}
              onChange={(e) => setCompanyInfoEdit({ ...companyInfoEdit, companyGenre: e.target.value })}
            />
            <br></br>
            <br></br>
            <TextField
              label="GST No"
              fullWidth
              value={companyInfoEdit.GSTNO}
              onChange={(e) => setCompanyInfoEdit({ ...companyInfoEdit, GSTNO: e.target.value })}
            />
            <br></br>
            <br></br>
            <TextField
              label="Role"
              fullWidth
              value={companyInfo.Grole==="vendor" ? "Vendor" : "Company"}
              disabled
            />
            <br></br>
            <br></br>
            <TextField
              label="Date of Birth"
              fullWidth
              type="date" // Use the date type input
              value={companyInfoEdit.dob} // Display the date as is
              onChange={(e) => setCompanyInfoEdit({ ...companyInfoEdit, dob: e.target.value })}
            />
            <br></br>
            <br></br>
            <Button variant="contained" color="primary" onClick={handleSubmit}>
              Submit
            </Button>
          </form>
        </Box>
      </Modal>
    </>
  );
}

export default CProfile;
