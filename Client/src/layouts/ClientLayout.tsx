import React from 'react';
import { Stack } from '@mui/material';
import { Outlet, useLocation } from 'react-router-dom';
import Footer from 'src/components/Footer';
import Header from 'src/components/Header';

const ClientLayout = () => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  return (
    <>
      {isHomePage && <Header />}
      <Stack>
        <Outlet />
        <Footer />
      </Stack>
    </>
  );
};

export default ClientLayout;
