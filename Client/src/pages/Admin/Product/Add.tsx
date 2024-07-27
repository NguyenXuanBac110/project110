import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Box, Typography, TextField, MenuItem, Button, Snackbar, IconButton } from '@mui/material';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import { Category } from 'src/types/product';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref,
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function AdminAdd() {
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<number | string>('');
  const [categories, setCategories] = useState<Category[]>([]);
  const [titleError, setTitleError] = useState(false);
  const [priceError, setPriceError] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [descriptionError, setDescriptionError] = useState(false);
  const [categoryError, setCategoryError] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await axios.get<Category[]>('http://localhost:3000/categories');
        setCategories(data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  const handleAddProduct = async () => {
    // Validate inputs
    let error = false;

    if (title.length < 6) {
      setTitleError(true);
      error = true;
    } else {
      setTitleError(false);
    }

    if (isNaN(parseFloat(price)) || parseFloat(price) < 0) {
      setPriceError(true);
      error = true;
    } else {
      setPriceError(false);
    }

    if (!image.trim()) {
      setImageError(true);
      error = true;
    } else {
      setImageError(false);
    }

    if (!description.trim()) {
      setDescriptionError(true);
      error = true;
    } else {
      setDescriptionError(false);
    }

    if (!category) {
      setCategoryError(true);
      error = true;
    } else {
      setCategoryError(false);
    }

    if (error) {
      return;
    }

    try {
      const selectedCategory = categories.find((cat) => cat.id === Number(category));

      const newProduct = {
        title,
        price: parseFloat(price),
        image,
        description,
        category: selectedCategory,
        isShow: true,
        rating: { rate: 0, count: 0 }
      };

      await axios.post('http://localhost:3000/products', newProduct);
      setSnackbarOpen(true);
      setTimeout(() => {
        navigate('/admin/product/list');
      }, 2000); // Adjust the timeout duration if needed
    } catch (error) {
      console.error('Error adding product:', error);
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
        Add Product
      </Typography>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <Link to="/admin/product/addCategory">
          <IconButton color="primary" aria-label="Add Category">
            <AddCircleOutlineIcon />
          </IconButton>
        </Link>
        <Typography variant="body1" sx={{ ml: 1 }}>
          Add New Category
        </Typography>
      </Box>
      <TextField
        error={titleError}
        label="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        fullWidth
        margin="normal"
        helperText={titleError ? 'Title must be at least 6 characters.' : ''}
      />
      <TextField
        error={priceError}
        label="Price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        fullWidth
        margin="normal"
        type="number"
        helperText={priceError ? 'Price must be a non-negative number.' : ''}
      />
      <TextField
        error={imageError}
        label="Image URL"
        value={image}
        onChange={(e) => setImage(e.target.value)}
        fullWidth
        margin="normal"
        helperText={imageError ? 'Image URL cannot be empty.' : ''}
      />
      <TextField
        error={descriptionError}
        label="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        fullWidth
        margin="normal"
        helperText={descriptionError ? 'Description cannot be empty.' : ''}
      />
      <TextField
        select
        error={categoryError}
        label="Category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        fullWidth
        margin="normal"
        helperText={categoryError ? 'Category must be selected.' : ''}
      >
        {categories.map((cat) => (
          <MenuItem key={cat.id} value={cat.id}>
            {cat.name}
          </MenuItem>
        ))}
      </TextField>
      <Button
        variant="contained"
        color="primary"
        onClick={handleAddProduct}
        sx={{ mt: 2 }}
      >
        Add Product
      </Button>

      {/* Snackbar for success message */}
      <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose}>
        <Alert onClose={handleSnackbarClose} severity="success" sx={{ width: '100%' }}>
          Thêm sản phẩm thành công
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default AdminAdd;
