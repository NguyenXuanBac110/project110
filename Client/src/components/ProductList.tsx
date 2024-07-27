// src/components/ProductList.tsx

import React, { useState } from 'react';
import { Box, Card, CardMedia, CardContent, Typography, Button, Pagination } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Product } from 'src/types/product';
import { useCart } from './CartContext'; // Adjust the path to where your CartContext is located

interface ProductListProps {
  products: Product[];
}

const ProductList: React.FC<ProductListProps> = ({ products }) => {
  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const { addToCart } = useCart(); // Use the imported useCart hook
  const navigate = useNavigate();

  const handleAddToCart = (product: Product) => {
    addToCart(product, 1);
    navigate('/cart');
  };

  const handlePageChange = (event: React.ChangeEvent<unknown>, page: number) => {
    setCurrentPage(page);
  };

  const paginatedProducts = products.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <Box>
      {products.length === 0 ? (
        <Typography variant="h6" align="center">No products available</Typography>
      ) : (
        <Box>
          <Box
            display="flex"
            flexWrap="wrap"
            justifyContent="space-between"
            px={5} // Adds 50px padding to the left and right
          >
            {paginatedProducts.map((product) => (
              <Box
                key={product.id}
                sx={{
                  width: '370px', // Fixed width
                  mb: 4,
                  backgroundColor: '#f5f5f5', // Light gray background
                  borderRadius: '20px', // Rounded corners
                  padding: '20px',
                  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
              >
                <Card sx={{ width: '100%', borderRadius: '20px', overflow: 'hidden' }}>
                  <CardMedia
                    component="img"
                    image={product.image}
                    alt={product.title}
                    sx={{ height: '200px', objectFit: 'cover', borderRadius: '20px' }}
                  />
                  <CardContent sx={{ textAlign: 'center' }}>
                    <Typography variant="h6" sx={{ mb: 1 }}>
                      {product.title}
                    </Typography>
                    <Typography variant="body1" sx={{ color: 'red', mb: 1 }}>
                      ${product.price}
                    </Typography>
                    <Typography variant="body2" sx={{ mb: 2 }}>
                      {product.description.length > 50
                        ? `${product.description.split(' ').slice(0, 14).join(' ')}...`
                        : product.description}
                    </Typography>
                    <Box display="flex" justifyContent="space-between">
                      <Button
                        variant="contained"
                        sx={{
                          borderRadius: '20px',
                          marginRight: '10px',
                          backgroundColor: '#f5f5f5', // Gray background
                          color: '#000', // Black text
                          '&:hover': {
                            backgroundColor: '#e0e0e0' // Darker gray on hover
                          }
                        }}
                        onClick={() => navigate(`/products/${product.id}`)}
                      >
                        View More
                      </Button>
                      <Button
                        variant="contained"
                        sx={{
                          borderRadius: '20px',
                          backgroundColor: '#B22424', // Red background
                          color: '#fff', // White text
                          '&:hover': {
                            backgroundColor: '#a12323' // Darker red on hover
                          }
                        }}
                        onClick={() => handleAddToCart(product)}
                      >
                        Buy Now
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              </Box>
            ))}
          </Box>
          <Box display="flex" justifyContent="center" mt={4}>
            <Pagination
              count={Math.ceil(products.length / itemsPerPage)}
              page={currentPage}
              onChange={handlePageChange}
              color="primary"
            />
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default ProductList;
