// src/pages/Admin/Product/AddCategory.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { TextField, Button, Box, Typography } from '@mui/material';

function AdminAddCategory() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const navigate = useNavigate();

  const handleAddCategory = async () => {
    try {
      const newCategory = { name, description };
      await axios.post('http://localhost:3000/categories', newCategory);
      navigate('/admin/product/list');
    } catch (error) {
      console.error('Error adding category:', error);
    }
  };

  return (
    <Box sx={{ maxWidth: 600, mx: 'auto', p: 2 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Add Category
      </Typography>
      <TextField
        label="Category Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        fullWidth
        margin="normal"
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleAddCategory}
        sx={{ mt: 2 }}
      >
        Add Category
      </Button>
    </Box>
  );
}

export default AdminAddCategory;
