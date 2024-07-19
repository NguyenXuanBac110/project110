import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { TextField, Button, Box, Typography } from '@mui/material';
import { Product } from 'src/types/product';

function AdminEdit() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState<Product>({
    id: 0,
    title: '',
    price: 0,
    image: '',
    category: { id: 0, name: '', description: '' },
    description: '',
    rating: null,
    isShow: false,
  });

  const [titleError, setTitleError] = useState(false);
  const [priceError, setPriceError] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [categoryError, setCategoryError] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await axios.get<Product>(`http://localhost:3000/products/${id}`);
        setProduct(data);
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };
    fetchProduct();
  }, [id]);

  const handleEditProduct = async () => {
    // Validate inputs
    if (product.title.length < 6) {
      setTitleError(true);
      return;
    } else {
      setTitleError(false);
    }

    if (isNaN(parseFloat(product.price.toString())) || parseFloat(product.price.toString()) < 0) {
      setPriceError(true);
      return;
    } else {
      setPriceError(false);
    }

    if (!product.image.trim()) {
      setImageError(true);
      return;
    } else {
      setImageError(false);
    }

    if (!product.category.name.trim()) {
      setCategoryError(true);
      return;
    } else {
      setCategoryError(false);
    }

    try {
      await axios.put(`http://localhost:3000/products/${id}`, product);
      navigate('/admin/product/list');
    } catch (error) {
      console.error('Error editing product:', error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  return (
    <Box sx={{ maxWidth: 600, mx: 'auto', p: 2 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Edit Product
      </Typography>
      <TextField
        error={titleError}
        name="title"
        label="Title"
        value={product.title}
        onChange={handleChange}
        fullWidth
        margin="normal"
        helperText={titleError ? 'Title must be at least 6 characters.' : ''}
      />
      <TextField
        error={priceError}
        name="price"
        label="Price"
        value={product.price.toString()}
        onChange={handleChange}
        fullWidth
        margin="normal"
        type="number"
        helperText={priceError ? 'Price must be a non-negative number.' : ''}
      />
      <TextField
        error={imageError}
        name="image"
        label="Image URL"
        value={product.image}
        onChange={handleChange}
        fullWidth
        margin="normal"
        helperText={imageError ? 'Image URL cannot be empty.' : ''}
      />
      <TextField
        error={categoryError}
        name="category.name"
        label="Category"
        value={product.category.name}
        onChange={handleChange}
        fullWidth
        margin="normal"
        helperText={categoryError ? 'Category cannot be empty.' : ''}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleEditProduct}
        sx={{ mt: 2 }}
      >
        Edit Product
      </Button>
    </Box>
  );
}

export default AdminEdit;
