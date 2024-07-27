import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { TextField, Button, Box, Typography, MenuItem, Snackbar } from '@mui/material';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import { Product, Category } from 'src/types/product';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref,
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

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

  const [categories, setCategories] = useState<Category[]>([]);
  const [titleError, setTitleError] = useState(false);
  const [priceError, setPriceError] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [categoryError, setCategoryError] = useState(false);
  const [descriptionError, setDescriptionError] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await axios.get<Product>(`http://localhost:3000/products/${id}`);
        setProduct(data);
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };
    const fetchCategories = async () => {
      try {
        const { data } = await axios.get<Category[]>('http://localhost:3000/categories');
        setCategories(data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchProduct();
    fetchCategories();
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

    if (!product.category.id) {
      setCategoryError(true);
      return;
    } else {
      setCategoryError(false);
    }

    if (product.description.length < 10) {
      setDescriptionError(true);
      return;
    } else {
      setDescriptionError(false);
    }

    try {
      await axios.put(`http://localhost:3000/products/${id}`, product);
      setSnackbarOpen(true); // Open Snackbar on success
      setTimeout(() => {
        navigate('/admin/product/list');
      }, 2000); // Navigate after 2 seconds
    } catch (error) {
      console.error('Error editing product:', error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (name === 'category') {
      setProduct((prevProduct) => ({
        ...prevProduct,
        category: categories.find(category => category.id === Number(value)) || prevProduct.category,
      }));
    } else {
      setProduct((prevProduct) => ({
        ...prevProduct,
        [name]: value,
      }));
    }
  };

  const handleSnackbarClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
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
        error={descriptionError}
        name="description"
        label="Description"
        value={product.description}
        onChange={handleChange}
        fullWidth
        margin="normal"
        multiline
        rows={4}
        helperText={descriptionError ? 'Description must be at least 10 characters.' : ''}
      />
      <TextField
        select
        error={categoryError}
        name="category"
        label="Category"
        value={product.category.id}
        onChange={handleChange}
        fullWidth
        margin="normal"
        helperText={categoryError ? 'Category cannot be empty.' : ''}
      >
        {categories.map((category) => (
          <MenuItem key={category.id} value={category.id}>
            {category.name}
          </MenuItem>
        ))}
      </TextField>
      <Button
        variant="contained"
        color="primary"
        onClick={handleEditProduct}
        sx={{ mt: 2 }}
      >
        Edit Product
      </Button>

      {/* Snackbar for success message */}
      <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose}>
        <Alert onClose={handleSnackbarClose} severity="success" sx={{ width: '100%' }}>
          Cập nhật sản phẩm thành công
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default AdminEdit;
