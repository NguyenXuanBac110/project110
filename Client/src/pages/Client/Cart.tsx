import React from 'react';
import { Box, Button, Typography, IconButton, CardMedia } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import { useCart } from 'src/components/CartContext';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const { cart, addToCart, removeFromCart } = useCart();
  const navigate = useNavigate();

  // Handle quantity change by modifying the quantity of the item
  const handleQuantityChange = (productId: string, delta: number) => {
    const product = cart.find(item => item.id === productId);
    if (product) {
      addToCart(product, delta); // Pass product and quantityChange
    }
  };

  // Calculate subtotal and total amounts
  const subtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);
  const shipping = 0; // Define shipping cost if needed
  const total = subtotal + shipping;

  return (
    <Box>
      <Box display="flex" justifyContent="center" gap={6} mt={4}>
        <Box sx={{ overflowX: 'auto' }}>
          <Box sx={{ width: '1072px', border: 'none' }}>
            <Box component="thead">
              <Box display="flex" justifyContent="space-between" bgcolor="#E2F4FF" py={2} px={3} fontSize="20px" color="#232323">
                <Typography variant="h6" flex="1">Product</Typography>
                <Typography variant="h6" flex="1">Price</Typography>
                <Typography variant="h6" flex="1" textAlign="center">Quantity</Typography>
                <Typography variant="h6" flex="1" textAlign="center">Subtotal</Typography>
              </Box>
            </Box>
            <Box component="tbody" borderBottom="2px solid">
              {cart.map(item => (
                <Box key={item.id} display="flex" py={2} px={3} alignItems="center" borderBottom="1px solid #c9c9c9">
                  <Box display="flex" alignItems="center" flex="1">
                    <CardMedia
                      component="img"
                      image={item.image}
                      alt={item.title}
                      sx={{ width: '132px', height: 'auto' }}
                    />
                    <Box ml={2} fontSize="20px" color="#2F2F2F">
                      <Typography variant="h6" color="#003F62">{item.title}</Typography>
                      <Typography>Color:</Typography>
                      <Typography>Size:</Typography>
                    </Box>
                  </Box>
                  <Box flex="1" textAlign="center">
                    <Typography variant="h6">${item.price.toFixed(2)}</Typography>
                  </Box>
                  <Box flex="1" display="flex" justifyContent="center" alignItems="center">
                    <IconButton 
                      aria-label="decrease quantity" 
                      onClick={() => handleQuantityChange(item.id, -1)} 
                      disabled={item.quantity <= 1}
                    >
                      <RemoveIcon />
                    </IconButton>
                    <Typography variant="body1">{item.quantity}</Typography>
                    <IconButton 
                      aria-label="increase quantity" 
                      onClick={() => handleQuantityChange(item.id, 1)}
                    >
                      <AddIcon />
                    </IconButton>
                  </Box>
                  <Box flex="1" display="flex" justifyContent="space-between" alignItems="center">
                    <Typography variant="h6">${(item.price * item.quantity).toFixed(2)}</Typography>
                    <IconButton aria-label="remove item" onClick={() => removeFromCart(item.id)}>
                      <CloseIcon />
                    </IconButton>
                  </Box>
                </Box>
              ))}
            </Box>
          </Box>

          <Box display="flex" justifyContent="center" gap={4} mt={2}>
            <Button variant="contained" color="warning" sx={{ width: '315px', height: '63px' }}>
              Continue Shopping
            </Button>
            <Button variant="outlined" color="primary" sx={{ width: '253px', height: '63px' }}>
              Update Cart
            </Button>
            <Button variant="outlined" color="error" sx={{ width: '253px', height: '63px' }}>
              Clear Cart
            </Button>
          </Box>
        </Box>

        <Box sx={{ width: '450px', height: '499px', border: '1px solid #c9c9c9', padding: '16px' }}>
          <Box bgcolor="#E2F4FF" textAlign="center" py={1} fontSize="20px" fontWeight="bold">
            Cart Total
          </Box>
          <Box display="flex" justifyContent="space-between" py={2} fontSize="19px">
            <Typography>Subtotal</Typography>
            <Typography>${subtotal.toFixed(2)}</Typography>
          </Box>
          <Box component="hr" sx={{ borderColor: '#c9c9c9' }} />
          <Box display="flex" justifyContent="space-between" alignItems="center" border="1px solid #c9c9c9" borderRadius="8px" p={1}>
            <Typography fontSize="16px">Enter coupon code</Typography>
            <Button variant="outlined" color="primary">Apply</Button>
          </Box>
          <Box component="hr" sx={{ borderColor: '#c9c9c9' }} />
          <Box display="flex" justifyContent="space-between" alignItems="center" border="1px solid #c9c9c9" borderRadius="8px" p={1}>
            <Typography fontSize="16px">Country</Typography>
            <Button variant="outlined" color="primary" endIcon={<img src="/assets/images/arrow-down.png" alt="Dropdown" />}>
              Select
            </Button>
          </Box>
          <Box component="hr" sx={{ borderColor: '#c9c9c9' }} />
          <Box display="flex" justifyContent="space-between" py={2} fontSize="16px">
            <Typography>Total</Typography>
            <Typography>${total.toFixed(2)}</Typography>
          </Box>
          <Button variant="contained" color="warning" sx={{ width: '340px', height: '52px' }} onClick={() => navigate('/bill')}>
            Proceed to Checkout
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Cart;
