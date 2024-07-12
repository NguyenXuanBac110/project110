import { Stack } from '@mui/material';
import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

import SlideBar from 'src/components/SlideBar';

const AdminLayout = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    if (!token) {
      navigate("/login");
    } else if (userId !== "1") {
      navigate("/");
    }
  }, [navigate, token, userId]);

  return (
    <>
      <Stack direction={"row"}>
        <SlideBar />
        <Outlet />
      </Stack>
    </>
  );
};

export default AdminLayout;
