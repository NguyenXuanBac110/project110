import React from 'react';
import { Box, Typography, TextField, Button, Divider } from '@mui/material';
import { useCart } from 'src/components/CartContext';

const Bill = () => {
  const { cart } = useCart();
  const subtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);
  const total = subtotal; // Adjust if shipping or taxes are included

  return (
    <Box sx={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      <Typography variant="h4" gutterBottom>Checkout</Typography>
      
      <Box component="form" noValidate autoComplete="off" sx={{ mb: 4 }}>
        <Typography variant="h6" gutterBottom>Shipping Information</Typography>
        <TextField fullWidth margin="normal" label="First Name" variant="outlined" required />
        <TextField fullWidth margin="normal" label="Last Name" variant="outlined" required />
        <TextField fullWidth margin="normal" label="Company Name (Optional)" variant="outlined" />
        <TextField fullWidth margin="normal" label="Country / Region" variant="outlined" required />
        <TextField fullWidth margin="normal" label="Street Address" variant="outlined" required />
        <TextField fullWidth margin="normal" label="Town / City" variant="outlined" required />
        <TextField fullWidth margin="normal" label="Province" variant="outlined" required />
        <TextField fullWidth margin="normal" label="ZIP Code" variant="outlined" required />
        <TextField fullWidth margin="normal" label="Phone" variant="outlined" required />
        <TextField fullWidth margin="normal" label="Email Address" variant="outlined" required />
      </Box>

      <Box sx={{ padding: '20px', border: '1px solid #c9c9c9', borderRadius: '8px' }}>
        <Typography variant="h5" gutterBottom>Billing Summary</Typography>
        
        <Box display="flex" justifyContent="space-between" py={1}>
          <Typography variant="h6">Product</Typography>
          <Typography variant="h6">Asgaard Sofa</Typography>
        </Box>

        <Box display="flex" justifyContent="space-between" py={1}>
          <Typography variant="h6">Subtotal</Typography>
          <Typography variant="h6">25,000,000đ</Typography>
        </Box>
        
        <Divider sx={{ my: 2, borderColor: '#c9c9c9' }} />
        
        <Box display="flex" justifyContent="space-between" py={1}>
          <Typography variant="h6">Total</Typography>
          <Typography variant="h6">25,000,000đ</Typography>
        </Box>
        
        <Divider sx={{ my: 2, borderColor: '#c9c9c9' }} />
        
        <Typography variant="body2" paragraph>
          Make your payment directly into our bank account. Please use your Order ID as the payment reference. Your order will not be shipped until the funds have cleared in our account.
        </Typography>
        <Typography variant="body2" paragraph>
          Your personal data will be used to support your experience throughout this website, to manage access to your account, and for other purposes described in our privacy policy.
        </Typography>
        
        <Button variant="contained" color="warning" fullWidth sx={{ mt: 2 }}>
          Place Order
        </Button>
      </Box>
    </Box>
  );
};

export default Bill;
