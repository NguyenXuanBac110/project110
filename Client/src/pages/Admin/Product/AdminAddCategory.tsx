import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Box, Typography, TextField, Button, Snackbar } from '@mui/material';
import MuiAlert, { AlertProps } from '@mui/material/Alert';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref,
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function AdminAddCategory() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [nameError, setNameError] = useState(false);
  const [descriptionError, setDescriptionError] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const navigate = useNavigate();

  const handleAddCategory = async () => {
    // Validate inputs
    let error = false;

    if (name.trim().length < 3) {
      setNameError(true);
      error = true;
    } else {
      setNameError(false);
    }

    if (description.trim().length < 10) {
      setDescriptionError(true);
      error = true;
    } else {
      setDescriptionError(false);
    }

    if (error) {
      return;
    }

    try {
      const newCategory = {
        name,
        description,
      };

      await axios.post('http://localhost:3000/categories', newCategory);
      setSnackbarOpen(true);
      setTimeout(() => {
        navigate('/admin/product/add');
      }, 2000); // Adjust the timeout duration if needed
    } catch (error) {
      console.error('Error adding category:', error);
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
        Add Category
      </Typography>
      <TextField
        error={nameError}
        label="Category Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        fullWidth
        margin="normal"
        helperText={nameError ? 'Name must be at least 3 characters.' : ''}
      />
      <TextField
        error={descriptionError}
        label="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        fullWidth
        margin="normal"
        helperText={descriptionError ? 'Description must be at least 10 characters.' : ''}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleAddCategory}
        sx={{ mt: 2 }}
      >
        Add Category
      </Button>

      {/* Snackbar for success message */}
      <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose}>
        <Alert onClose={handleSnackbarClose} severity="success" sx={{ width: '100%' }}>
          Thêm danh mục thành công
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default AdminAddCategory;
