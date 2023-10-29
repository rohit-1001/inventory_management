import React, { useState, useEffect } from 'react';
import { Container, Grid, Paper, Typography, Button, Modal, Box, TextField } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import image1 from '../assets/testi1.jpg';
import axios from 'axios'

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
  const getUserInfo = async () => {
    try {
      const c = await axios.get('/profile', {
        withCredentials: true
      })
      const { name, email, phone } = c.data
      setUser({ name, email, phone })
      setNewUser({ name, email, phone })
    } catch (error) {
      if (error.response) {
        alert(error.response.data.error)
      }
    }
  }
  // Sample data for company info
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    document.title = 'Sangrah | Profile';
    getUserInfo()
  }, []);

  const [companyInfo, setCompanyInfo] = useState({
    name: 'Sample Company',
    email: 'sample@email.com',
    contactNumber: '+1234567890',
    address: '123 Main St, City, Country', // Add address
    companyGenre: 'Food', // Add company genre
    logo: image1,
    password: '123',
    GSTNO: 3000423,
    Grole: "Vendor",
    dob: "01/01/2000",
  });

  const [openModal, setOpenModal] = useState(false);

  const handleOpenModal = async () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleSubmit = async () => {
    try {
      const c = await axios.post('/updateprofile', { name: newuser.name, email: newuser.email, phone: newuser.phone }, {
        withCredentials: true
      })

      if (c.status === 200) {
        alert(c.data.msg)
      }
    } catch (error) {
      if (error.response) {
        alert(error.response.data.error)
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
                <Typography variant="h5">{user.name}</Typography>
                <Typography variant="subtitle1">Email: {user.email}</Typography>
                <Typography variant="subtitle1">Contact Number: {user.phone}</Typography>
                <Typography variant="subtitle1">Address: {companyInfo.address}</Typography>
                <Typography variant="subtitle1">Company Type: {companyInfo.companyGenre}</Typography>
                <Typography variant="subtitle1">GST No: {companyInfo.GSTNO}</Typography>
                <Typography variant="subtitle1">Role: {companyInfo.Grole}</Typography>
                <Typography variant="subtitle1">Date of Birth: {companyInfo.dob}</Typography>
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
            transform: 'translate(-50%, -50%)',
            maxWidth: '90%', // Adjust the maximum width as needed
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
          <form>
            <TextField
              label="Name"
              fullWidth
              value={newuser.name}
              onChange={(e) => setNewUser({ ...newuser, name: e.target.value })}
            />
            <br></br>
            <br></br>
            <TextField
              label="Email"
              fullWidth
              value={newuser.email}
              disabled
            />
            <br></br>
            <br></br>
            <TextField
              label="Contact Number"
              fullWidth
              value={newuser.phone}
              onChange={(e) => setNewUser({ ...newuser, phone: e.target.value })}
            />
            <br></br>
            <br></br>
            <TextField
              label="Address"
              fullWidth
              value={companyInfo.address}

            />
            <br></br>
            <br></br>
            <TextField
              label="Company Type"
              fullWidth
              value={companyInfo.companyGenre}

            />
            <br></br>
            <br></br>
            <TextField
              label="GST No"
              fullWidth
              value={companyInfo.GSTNO}
              disabled
            />
            <br></br>
            <br></br>
            <TextField
              label="Role"
              fullWidth
              value={companyInfo.Grole}
              disabled
            />
            <br></br>
            <br></br>
            <TextField
              label="Date of Birth"
              fullWidth
              value={companyInfo.dob}
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
