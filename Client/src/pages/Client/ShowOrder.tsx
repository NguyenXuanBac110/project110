import React from 'react';
import { Box, Typography, Divider, AppBar, Toolbar, Button } from '@mui/material';
import { useCart } from 'src/components/CartContext';
import { useNavigate } from 'react-router-dom';
interface CartItem {
    id: string;
    title: string;
    price: number;
    quantity: number;
  }
  
  interface OrderDetails {
    firstName: string;
    lastName: string;
    companyName?: string;
    country: string;
    streetAddress: string;
    townCity: string;
    province: string;
    zipCode: string;
    phone: string;
    email: string;
    orderDate: string;
    orderTime: string;
    cart: CartItem[];
    subtotal: number;
    total: number;
  }  

const ShowOrder = () => {
  const { cart } = useCart();
  const navigate = useNavigate();
  const subtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);
  const total = subtotal; // Adjust if shipping or taxes are included

  // Retrieve order details from localStorage
  const orderDetailsString = localStorage.getItem('orderDetails');
  let orderDetails: OrderDetails | null = null;

  try {
    orderDetails = orderDetailsString ? JSON.parse(orderDetailsString) : null;
  } catch (error) {
    orderDetails = null;
  }

  if (!orderDetails) {
    return (
      <Box sx={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
        <Typography variant="h5">No order found.</Typography>
      </Box>
    );
  }

  const {
    firstName,
    lastName,
    companyName,
    country,
    streetAddress,
    townCity,
    province,
    zipCode,
    phone,
    email,
    orderDate,
    orderTime,
  } = orderDetails;
  return (
    <Box sx={{ backgroundColor: 'white' }}>
      <AppBar position="static" sx={{ backgroundColor: 'white', color: 'black', boxShadow: 'none' }}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1, color: 'black' }}>
            <img src="https://censor.vn/wp-content/uploads/2022/03/logo-cac-hang-giay-noi-tieng-1.png" alt="Logo" style={{ width: '50px', height: 'auto' }} />
          </Typography>
          <Box>
            <Button color="inherit" sx={{ color: 'black' }} onClick={() => navigate('/')}>Home</Button>
            <Button color="inherit" sx={{ color: 'black' }}>Bags</Button>
            <Button color="inherit" sx={{ color: 'black' }}>Sneakers</Button>
            <Button color="inherit" sx={{ color: 'black' }}>Belt</Button>
            <Button color="inherit" sx={{ color: 'black' }}>Contact</Button>
          </Box>
        </Toolbar>
      </AppBar>
      <Box sx={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <Typography variant="h4" gutterBottom>Order Details</Typography>
        
        <Typography variant="h6" gutterBottom>Customer Information</Typography>
        <Typography variant="body1">First Name: {firstName}</Typography>
        <Typography variant="body1">Last Name: {lastName}</Typography>
        <Typography variant="body1">Company Name: {companyName}</Typography>
        <Typography variant="body1">Country: {country}</Typography>
        <Typography variant="body1">Street Address: {streetAddress}</Typography>
        <Typography variant="body1">Town/City: {townCity}</Typography>
        <Typography variant="body1">Province: {province}</Typography>
        <Typography variant="body1">ZIP Code: {zipCode}</Typography>
        <Typography variant="body1">Phone: {phone}</Typography>
        <Typography variant="body1">Email: {email}</Typography>
        <Typography variant="body1">Order Date: {orderDate}</Typography>
        <Typography variant="body1">Order Time: {orderTime}</Typography>
        
        <Box sx={{ mb: 4 }}>
          <Typography variant="h5" gutterBottom>-----</Typography>
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
        </Box>
        
        <Typography variant="body2" paragraph>
          Thank you for your order! We will send you an email confirmation with the details of your order.
        </Typography>
      </Box>
    </Box>
  );
};

export default ShowOrder;
