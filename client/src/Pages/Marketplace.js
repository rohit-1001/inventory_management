import React from 'react'
import { useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import { Card, CardContent, CardMedia, Typography, Container, Grid } from '@mui/material';
import { makeStyles } from '@mui/styles';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import ListItemText from '@mui/material/ListItemText';
import ListItem from '@mui/material/ListItem';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
const useStyles = makeStyles((theme) => ({
    card: {
        maxWidth: 345,
    },
    media: {
        height: 140,
    },
}));

const companies = [
    {
        name: 'Company A',
        description: 'A company description goes here.',
        logo: 'https://via.placeholder.com/150',
        products: [
            { name: 'Product A', price: 10 },
            { name: 'Product B', price: 15 },
        ],
    },
    {
        name: 'Company B',
        description: 'Another company description goes here.',
        logo: 'https://via.placeholder.com/150',
        products: [
            { name: 'Soap', price: 10 },
            { name: 'table', price: 15 },
        ],
    },
    {
        name: 'Company C',
        description: 'Company C description.',
        logo: 'https://via.placeholder.com/150',
        products: [
            { name: 'Product A', price: 10 },
            { name: 'Product B', price: 15 },
        ],
    },
    {
        name: 'Company C',
        description: 'Company C description.',
        logo: 'https://via.placeholder.com/150',
        products: [
            { name: 'Product A', price: 10 },
            { name: 'Product B', price: 15 },
        ],
    },
    {
        name: 'Company C',
        description: 'Company C description.',
        logo: 'https://via.placeholder.com/150',
        products: [
            { name: 'Product A', price: 10 },
            { name: 'Product B', price: 15 },
        ],
    },
    {
        name: 'Company C',
        description: 'Company C description.',
        logo: 'https://via.placeholder.com/150',
        products: [
            { name: 'Product A', price: 10 },
            { name: 'Product B', price: 15 },
        ],
    },
    {
        name: 'Company C',
        description: 'Company C description.',
        logo: 'https://via.placeholder.com/150',
        products: [
            { name: 'Product A', price: 10 },
            { name: 'Product B', price: 15 },
        ],
    },
];

// function orderProduct(company) {
//     alert(`You have ordered ${company.name}`)
// }

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const Marketplace = () => {
    const [search, setSearch] = useState('');
    const classes = useStyles();
    const [currcompany, setcurrcompany] = useState('undefined');
    const [open, setOpen] = React.useState(false);

    const [selectedProducts, setSelectedProducts] = useState([]);
    const addProduct = (product, quantity) => {
        setSelectedProducts([...selectedProducts, { product, quantity }]);
    };
    function handleClickOpen(company) {
        setcurrcompany(company);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const handleSearch = (e) => {
        e.preventDefault();
        setSearch(e.target.value);
    }
    return (
        <div>
            <form style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
            }} onSubmit={(e) => {
                e.preventDefault()
                window.location.href = `/search/:${search}`;
            }}>
                <input type="text" name='searchquery' placeholder='Search here' onChange={handleSearch} value={search} style={{
                    borderRadius: '50px',
                    height: '50px',
                    padding: '10px',
                    margin: "1rem",
                    width: "30%",
                    border: '1px solid #545e6f',
                }} />
                <SearchIcon style={{
                    alignSelf: 'center',
                    cursor: 'pointer',
                    position: 'relative',
                    right: '60px'
                }} onClick={() => {
                    window.location.href = `/search/:${search}`;
                }}></SearchIcon>
            </form>
            <Container maxWidth="lg">
                <Grid container spacing={3}>
                    {companies.map((company, index) => (
                        <Grid item xs={12} sm={6} md={4} key={index}>
                            <Card className={classes.card} style={{
                                display: 'flex',
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                height: '100%',
                                alignItems: 'center',
                                padding: '1rem',
                                boxShadow: 'rgba(9, 30, 66, 0.25) 0px 4px 8px -2px, rgba(9, 30, 66, 0.08) 0px 0px 0px 1px',
                            }}>
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
                                <Button variant="outlined" onClick={(e) => {
                                    e.preventDefault()
                                    handleClickOpen(company)
                                }}>Order</Button>
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
                    <AppBar sx={{ position: 'relative' }}>
                        <Toolbar>
                            <IconButton
                                edge="start"
                                color="inherit"
                                onClick={handleClose}
                                aria-label="close"
                            >
                                <CloseIcon onClick={
                                    () => {
                                        handleClose();
                                        setcurrcompany('undefined');
                                        setSelectedProducts([]);
                                    }
                                } />
                            </IconButton>
                            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                                Order Details
                            </Typography>
                            <Button autoFocus color="inherit" onClick={handleClose}>
                                Order
                            </Button>
                        </Toolbar>
                    </AppBar>
                    <List>
                        <ListItem>
                            <ListItemText primary="Company Name" secondary={currcompany.name} />
                        </ListItem>
                        <Divider />
                        <ListItem>
                            <ListItemText primary="Company Description" secondary={currcompany.description} />
                        </ListItem>
                        <Divider />
                        {selectedProducts.length === 0 ? <ListItemText primary="No Products Selected" style={{
                            textAlign: 'left',
                            marginLeft: '1rem',
                            fontSize: '1.5rem',
                        }} /> : <><List>
                            <ListItemText primary="Products Selected" style={{
                                textAlign: 'left',
                                marginLeft: '1rem',
                                fontSize: '1.5rem',
                            }} />

                            {selectedProducts.map((item, index) => (
                                <div key={index}>
                                    <ListItem>
                                        <ListItemText primary={`Product Name: ${item.product}`} secondary={`Quantity: ${item.quantity}`} />
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
                        </List></>}

                        <Divider />
                        <div style={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'space-around',
                            alignItems: 'center',
                            width: '100%',
                            backgroundColor: '#f5f5f5',
                        }}>
                            <div style={{
                                // backgroundColor: '#f5f5f5',
                                width: '400px',
                            }}>
                                <ListItem style={{
                                    width: '100%',
                                }}>
                                    <ListItemText primary="Select Product" />
                                    {currcompany === 'undefined' ? <></> : <select>
                                        {currcompany.products.map((product, index) => (
                                            <option key={index} value={product.name}>
                                                {product.name}
                                            </option>
                                        ))}
                                    </select>}
                                </ListItem>
                            </div>
                            <Divider />
                            <div style={{
                                // backgroundColor: '#f5f5f5',
                                width: '400px',
                            }}>
                                <ListItem style={{
                                    width: '100%',
                                }}>
                                    <ListItemText primary="Quantity" />
                                    <input type="number" min="1" id="quan" style={{
                                        width: '100px',
                                    }} />
                                </ListItem>
                            </div>
                            <Divider />
                            <ListItem>
                                <Button
                                    variant="outlined"
                                    onClick={() => {
                                        // Get the selected product and quantity
                                        const selectedProduct = document.querySelector('select').value;
                                        const quantity = parseInt(document.querySelector('#quan').value);

                                        // Add the product to the order
                                        addProduct(selectedProduct, quantity);
                                    }}
                                >
                                    Add to Order
                                </Button>
                            </ListItem>
                        </div>
                    </List>

                </Dialog>
            </div>
        </div >
    )
}

export default Marketplace
