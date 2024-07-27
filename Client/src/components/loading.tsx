import React from 'react';
import { Box, LinearProgress } from '@mui/material';
import { useLoading } from './LoadingContext';


const Loading = () => {
  const { loading } = useLoading();

  return (
    <>
      {loading && (
        <Box sx={{ width: '100%' }}>
          <LinearProgress />
        </Box>
      )}
    </>
  );
};

export default Loading;
