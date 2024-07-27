import React from 'react';
import { Snackbar, Alert } from '@mui/material';
import { useError } from './ErrorContext';


const ErrorNotification = () => {
  const { error, setError } = useError();

  const handleClose = () => {
    setError(null);
  };

  return (
    <Snackbar
      open={Boolean(error)}
      autoHideDuration={6000}
      onClose={handleClose}
    >
      <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
        {error}
      </Alert>
    </Snackbar>
  );
};

export default ErrorNotification;
