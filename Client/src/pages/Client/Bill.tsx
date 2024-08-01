import React, { useState, ChangeEvent } from 'react';
import { Box, Typography, TextField, Button, Divider, AppBar, Toolbar, Snackbar, Alert } from '@mui/material';
import { useCart } from 'src/components/CartContext';
import { useNavigate } from 'react-router-dom';

const Bill = () => {
  const { cart } = useCart();
  const navigate = useNavigate();
  const [openSnackbar, setOpenSnackbar] = useState(false);

  // State for customer information
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    companyName: '',
    country: '',
    streetAddress: '',
    townCity: '',
    province: '',
    zipCode: '',
    phone: '',
    email: '',
  });

  const subtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);
  const total = subtotal; // Adjust if shipping or taxes are included

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  const handleOrder = () => {
    // Store order details and redirect to "Show Order" page
    const orderDetails = {
      ...formData,
      orderDate: new Date().toLocaleDateString(),
      orderTime: new Date().toLocaleTimeString(),
    };
    localStorage.setItem('orderDetails', JSON.stringify(orderDetails));
    setOpenSnackbar(true);
    navigate('/showOrder');
  };

  return (
    <Box sx={{ backgroundColor: 'white' }}>
      <AppBar position="static" sx={{ backgroundColor: 'white', color: 'black', boxShadow: 'none' }}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1, color: 'black' }}>
            <img src="https://censor.vn/wp-content/uploads/2022/03/logo-cac-hang-giay-noi-tieng-1.png" alt="Logo" style={{ width: '50px', height: 'auto' }} />
          </Typography>
          <Box>
            <Button color="inherit" sx={{ color: 'black' }}>Home</Button>
            <Button color="inherit" sx={{ color: 'black' }}>Bags</Button>
            <Button color="inherit" sx={{ color: 'black' }}>Sneakers</Button>
            <Button color="inherit" sx={{ color: 'black' }}>Belt</Button>
            <Button color="inherit" sx={{ color: 'black' }}>Contact</Button>
          </Box>
        </Toolbar>
      </AppBar>
      <Box sx={{ padding: '20px', maxWidth: '1200px', margin: '0 auto', display: 'flex', flexDirection: 'row', gap: '20px' }}>
        <Box sx={{ flex: 3 }}>
          <Typography variant="h4" gutterBottom>Checkout</Typography>
          <Box component="form" noValidate autoComplete="off" sx={{ mb: 4 }}>
            <Typography variant="h6" gutterBottom>Shipping Information</Typography>
            <TextField 
              fullWidth 
              margin="normal" 
              label="First Name" 
              variant="outlined" 
              required 
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
            />
            <TextField 
              fullWidth 
              margin="normal" 
              label="Last Name" 
              variant="outlined" 
              required 
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
            />
            <TextField 
              fullWidth 
              margin="normal" 
              label="Company Name (Optional)" 
              variant="outlined" 
              name="companyName"
              value={formData.companyName}
              onChange={handleInputChange}
            />
            <TextField 
              fullWidth 
              margin="normal" 
              label="Country / Region" 
              variant="outlined" 
              required 
              name="country"
              value={formData.country}
              onChange={handleInputChange}
            />
            <TextField 
              fullWidth 
              margin="normal" 
              label="Street Address" 
              variant="outlined" 
              required 
              name="streetAddress"
              value={formData.streetAddress}
              onChange={handleInputChange}
            />
            <TextField 
              fullWidth 
              margin="normal" 
              label="Town / City" 
              variant="outlined" 
              required 
              name="townCity"
              value={formData.townCity}
              onChange={handleInputChange}
            />
            <TextField 
              fullWidth 
              margin="normal" 
              label="Province" 
              variant="outlined" 
              required 
              name="province"
              value={formData.province}
              onChange={handleInputChange}
            />
            <TextField 
              fullWidth 
              margin="normal" 
              label="ZIP Code" 
              variant="outlined" 
              required 
              name="zipCode"
              value={formData.zipCode}
              onChange={handleInputChange}
            />
            <TextField 
              fullWidth 
              margin="normal" 
              label="Phone" 
              variant="outlined" 
              required 
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
            />
            <TextField 
              fullWidth 
              margin="normal" 
              label="Email Address" 
              variant="outlined" 
              required 
              name="email"
              value={formData.email}
              onChange={handleInputChange}
            />
          </Box>
        </Box>
        <Box sx={{ flex: 2, padding: '20px', borderRadius: '8px' }}>
          <Typography variant="h5" gutterBottom>Billing Summary</Typography>
          {cart.map((item) => (
            <Box display="flex" justifyContent="space-between" py={1} key={item.id}>
              <Typography variant="body1">{item.title} x {item.quantity}</Typography>
              <Typography variant="body1">${(item.price * item.quantity).toFixed()}</Typography>
            </Box>
          ))}
          <Divider sx={{ my: 2, borderColor: '#c9c9c9' }} />
          <Box display="flex" justifyContent="space-between" py={1}>
            <Typography variant="body1">Subtotal</Typography>
            <Typography variant="body1">${subtotal.toFixed()}</Typography>
          </Box>
          <Box display="flex" justifyContent="space-between" py={1}>
            <Typography variant="body1">Total</Typography>
            <Typography variant="body1">${total.toFixed()}</Typography>
          </Box>
          <Divider sx={{ my: 2, borderColor: '#c9c9c9' }} />
          <Typography variant="body2" paragraph>
            Make your payment directly into our bank account. Please use your Order ID as the payment reference. Your order will not be shipped until the funds have cleared in our account.
          </Typography>
          <Typography variant="body2" paragraph>
            Your personal data will be used to support your experience throughout this website, to manage access to your account, and for other purposes described in our privacy policy.
          </Typography>
          <Button variant="contained" color="warning" fullWidth sx={{ mt: 2 }} onClick={handleOrder}>
            Place Order
          </Button>
        </Box>
      </Box>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={() => setOpenSnackbar(false)}
      >
        <Alert onClose={() => setOpenSnackbar(false)} severity="success">
          Your order has been placed successfully!
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Bill;
