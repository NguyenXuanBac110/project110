import React, { useEffect, useState } from 'react';
import { Stack, Typography, Box, Container, IconButton, Button } from '@mui/material';
import axios from 'axios';
import { useLoading } from 'src/components/LoadingContext';
import { useError } from 'src/components/ErrorContext';
import ProductCard from 'src/components/ProductCard';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import ProductList from 'src/components/ProductList';
import { Product } from 'src/types/product';
import icon1 from '../../images/box-tick.png'
import icon2 from '../../images/crown.png'
import icon3 from '../../images/shield-security.png'
import icon4 from '../../images/z5521588173585_97272411fc21cb1e7ded746b518929db.jpg'
import icon5 from '../../images/z5521588199817_b05378a670a0a25d3ed7b687ce66b22c.jpg'
import icon6 from '../../images/z5521588202180_39b01098c868ff8b9dc2f8346e4708ba.jpg'

import icon10 from '../../images/brand-8.png'
import icon11 from '../../images/brand-4.png'
import icon12 from '../../images/brand-5.png'
import icon13 from '../../images/brand-6.png'
import icon14 from '../../images/brand-7.png'



function Homepage() {
  const [products, setProducts] = useState<Product[]>([]);
  const { setLoading } = useLoading();
  const { setError } = useError();

  const getAllProduct = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get('http://localhost:3000/products');
      setProducts(data);
    } catch (error) {
      setError('Failed to fetch products.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllProduct();
  }, []);

  return (
    <Box sx={{ backgroundColor: '#f9f9f9', pt: 4 }}>
      <Stack spacing={4} width="100%">
        <Container maxWidth={false} sx={{ px: 2 }}>
          <Typography variant="h2" gutterBottom>New Arrivals</Typography>
          <Box mt={2} position="relative">
            <Carousel
              showThumbs={false}
              showStatus={false}
              infiniteLoop
              centerMode
              centerSlidePercentage={50}
              renderArrowPrev={(onClickHandler, hasPrev, label) =>
                hasPrev && (
                  <IconButton
                    onClick={onClickHandler}
                    title={label}
                    sx={{
                      position: 'absolute',
                      top: '50%',
                      left: 0,
                      transform: 'translateY(-50%)',
                      zIndex: 1,
                      backgroundColor: 'rgba(0,0,0,0.5)',
                      color: 'white',
                      '&:hover': {
                        backgroundColor: 'rgba(0,0,0,0.7)'
                      }
                    }}
                  >
                    <NavigateBeforeIcon fontSize="large" />
                  </IconButton>
                )
              }
              renderArrowNext={(onClickHandler, hasNext, label) =>
                hasNext && (
                  <IconButton
                    onClick={onClickHandler}
                    title={label}
                    sx={{
                      position: 'absolute',
                      top: '50%',
                      right: 0,
                      transform: 'translateY(-50%)',
                      zIndex: 1,
                      backgroundColor: 'rgba(0,0,0,0.5)',
                      color: 'white',
                      '&:hover': {
                        backgroundColor: 'rgba(0,0,0,0.7)'
                      }
                    }}
                  >
                    <NavigateNextIcon fontSize="large" />
                  </IconButton>
                )
              }
            >
              {products.slice(0, 4).map((product) => (
                <Box key={product.id} display="flex" justifyContent="center">
                  <ProductCard product={product} />
                </Box>
              ))}
            </Carousel>
          </Box>
        </Container>

        <Container maxWidth={false} sx={{ px: 2 }}>
          <Typography variant="h2" gutterBottom>Shop</Typography>
          <Box mt={2}>
            <ProductList products={products} />
          </Box>
        </Container>

        

        {/* Benefits Section */}
        <Container maxWidth={false} sx={{ px: 2, mt: 4 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', flex: 1, backgroundColor: '#E2F4FF', borderRadius: '16px', p: 2 }}>
              <img src={icon1} alt="Free delivery" style={{ width: '50px', height: '50px', marginRight: '16px' }} />
              <Box>
                <Typography variant="h6" fontWeight="bold">Free Delivery</Typography>
                <Typography variant="body2">On orders above $50</Typography>
              </Box>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', flex: 1, backgroundColor: '#E2F4FF', borderRadius: '16px', p: 2 }}>
              <img src={icon2} alt="Best quality" style={{ width: '50px', height: '50px', marginRight: '16px' }} />
              <Box>
                <Typography variant="h6" fontWeight="bold">Best Quality</Typography>
                <Typography variant="body2">Best quality at low prices</Typography>
              </Box>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', flex: 1, backgroundColor: '#E2F4FF', borderRadius: '16px', p: 2 }}>
              <img src={icon3} alt="1 year warranty" style={{ width: '50px', height: '50px', marginRight: '16px' }} />
              <Box>
                <Typography variant="h6" fontWeight="bold">1 Year Warranty</Typography>
                <Typography variant="body2">Available warranty</Typography>
              </Box>
            </Box>
          </Box>
        </Container>

        {/* Testimonials Section */}
        <Container maxWidth={false} sx={{ px: 2, mt: 4 }}>
        <Typography variant="h2" gutterBottom sx={{ fontWeight: 'bold', textAlign: 'center', mt: 4 }}>What Our Customers Say</Typography>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 2 }}>
            {[
              { name: 'Savannah', image: icon4, review: 'Lorem ipsum dolor sit amet consectetur.' },
              { name: 'Nguyen Xuan Bac', image: icon5, review: 'Nec sit enim tellus faucibus bibendum ullamcorper.' },
              { name: 'Bac', image: icon6, review: 'Phasellus tristique aenean at lorem sed scelerisque.' }
            ].map((testimonial, index) => (
              <Box key={index} sx={{ flex: 1, border: '2px solid #EDA415', borderRadius: '16px', p: 3, backgroundColor: 'white', boxShadow: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <img src={testimonial.image} alt={testimonial.name} style={{ width: '80px', height: '80px', borderRadius: '50%', marginRight: '16px' }} />
                  <Typography variant="h6">{testimonial.name}</Typography>
                </Box>
                <Typography variant="body2">{testimonial.review}</Typography>
              </Box>
            ))}
          </Box>
        </Container>

        {/* Brand Section */}
        <Container maxWidth={false} sx={{ px: 2, mt: 10 }}>
  <Typography variant="h2" gutterBottom sx={{ fontWeight: 'bold', textAlign: 'center', mt: 4 }}>Our Brands</Typography>
  <Box sx={{ 
    display: 'flex', 
    justifyContent: 'center', 
    gap: 4, 
    flexWrap: 'wrap', 
    alignItems: 'center' 
  }}>
    {[
      icon10,
      icon11,
      icon12,
      icon13,
      icon14
    ].map((src, index) => (
      <Box key={index} sx={{ flex: '0 1 auto', p: 2 }}>
        <img src={src} alt={`Brand ${index + 1}`} style={{ 
          width: '150px',  // Increase width
          height: 'auto', 
          display: 'block', 
          margin: 'auto' // Center horizontally
        }} />
      </Box>
    ))}
  </Box>
</Container>

      </Stack>
    </Box>
  );
}

export default Homepage;
