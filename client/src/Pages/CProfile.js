import React, { useState, useEffect } from 'react';
import { Container, Grid, Paper, Typography, Button, Modal, Box, TextField } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import image1 from '../assets/testi1.jpg';

function CProfile() {
  // Sample data for company info
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    document.title = 'Sangrah | Profile';
  }, [])
  const [companyInfo, setCompanyInfo] = useState({
    name: 'Sample Company',
    email: 'sample@email.com',
    contactNumber: '+1234567890',
    logo: image1,
    password: '123',
  });

  const [openModal, setOpenModal] = useState(false);

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleSubmit = () => {
    // Handle the form submission here
    // You can update the companyInfo state and perform any other necessary actions
    handleCloseModal();
  };

  return (
    <>
      <br />
      <Container maxWidth="lg">
        <Grid container spacing={3}>
          {/* Company Profile */}
          <Grid item xs={12}>
            <Paper elevation={3} style={{ padding: '20px', textAlign: 'center' }}>
              <div>
                <img
                  src={companyInfo.logo}
                  alt="Company Logo"
                  style={{ width: '100px', height: '100px', borderRadius: '50%', marginBottom: '10px' }}
                />
              </div>
              <Typography variant="h5">{companyInfo.name}</Typography>
              <Typography variant="subtitle1">Email: {companyInfo.email}</Typography>
              <Typography variant="subtitle1">Contact Number: {companyInfo.contactNumber}</Typography>
              <Typography variant="subtitle1">Password: {companyInfo.password}</Typography>
              <Button variant="contained" color="primary" onClick={handleOpenModal} startIcon={<EditIcon />}>
                Edit
              </Button>
            </Paper>
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
            width: 400,
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography variant="h6" gutterBottom>
            Edit Company Info
          </Typography>
          <form>
            <TextField
              label="Name"
              fullWidth
              value={companyInfo.name}
              onChange={(e) => setCompanyInfo({ ...companyInfo, name: e.target.value })}
            />
            <br></br>
            <br></br>
            <TextField
              label="Email"
              fullWidth
              value={companyInfo.email}
              onChange={(e) => setCompanyInfo({ ...companyInfo, email: e.target.value })}
            />
            <br></br>
            <br></br>
            <TextField
              label="Contact Number"
              fullWidth
              value={companyInfo.contactNumber}
              onChange={(e) => setCompanyInfo({ ...companyInfo, contactNumber: e.target.value })}
            />
            <br></br>
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
