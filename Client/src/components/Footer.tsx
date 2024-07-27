import React from 'react';
import { Box, Typography, Button, Divider, Stack } from '@mui/material';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <Box
      sx={{
        height: '520px',
        backgroundColor: '#E2F4FF',
        marginTop: '20px',
        color: '#1B5A7D',
        paddingLeft: '90px',
        paddingRight: '90px',
        paddingTop: '50px',
      }}
    >
      <Stack
        direction="row"
        spacing={8}
        sx={{
          marginLeft: '20px',
          padding: '10px',
          backgroundColor: 'white',
          borderRadius: '8px',
          marginBottom: '10px',
          fontSize: '14px',
        }}
      >
        <Typography variant="h6" sx={{ fontSize: '29px', fontWeight: 'bold' }}>
          Subscribe to our newsletter
        </Typography>
        <Button
          variant="contained"
          sx={{
            backgroundColor: '#EDA415',
            color: 'white',
            borderRadius: '30px',
            width: '380px',
            height: '63px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <span>Email address</span>
          <img src="assets/images/send.png" alt="Send" />
        </Button>
        <Stack direction="row" spacing={1} alignItems="center">
          <img src="assets/images/headphone.png" alt="Headphone" style={{ marginBottom: '2px', marginRight: '2px' }} />
          <Stack>
            <Typography>Call us 24/7:</Typography>
            <Typography>(+62) 0123 567 789</Typography>
          </Stack>
        </Stack>
      </Stack>

      <Stack
        direction="row"
        spacing={8}
        sx={{
          marginLeft: '20px',
          marginTop: '20px',
          fontSize: '19px',
          fontWeight: 'regular',
        }}
      >
        <Stack spacing={2}>
          <img src="assets/images/logo2.png" alt="Logo" />
          <Typography sx={{ fontSize: '16px', width: '200px', paddingBottom: '5px', paddingTop: '5px' }}>
            64 St James Boulevard, Hoswick, ZE2 7ZJ
          </Typography>
          <Divider sx={{ borderColor: '#9D9D9D' }} />
          <Stack direction="row" spacing={2} sx={{ paddingTop: '5px' }}>
            <img src="assets/images/google.png" alt="Google" />
            <img src="assets/images/facebook.png" alt="Facebook" />
            <img src="assets/images/whatsapp.png" alt="WhatsApp" />
          </Stack>
        </Stack>

        <Stack spacing={1}>
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
            Find product
          </Typography>
          <ul>
            <li>Brownze Arnold</li>
            <li>Chronograph Blue</li>
            <li>Smart Phones</li>
            <li>Automatic Watch</li>
            <li>Hair Straighteners</li>
          </ul>
        </Stack>

        <Stack spacing={1}>
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
            Get Help
          </Typography>
          <ul>
            <li>Brownze Arnold</li>
            <li>Chronograph Blue</li>
            <li>Smart Phones</li>
            <li>Automatic Watch</li>
            <li>Hair Straighteners</li>
          </ul>
        </Stack>

        <Stack spacing={1}>
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
            About Us
          </Typography>
          <ul>
            <li>Brownze Arnold</li>
            <li>Chronograph Blue</li>
            <li>Smart Phones</li>
            <li>Automatic Watch</li>
            <li>Hair Straighteners</li>
          </ul>
        </Stack>
      </Stack>
    </Box>
  );
};

export default Footer;
