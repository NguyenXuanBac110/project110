import { Stack } from '@mui/material'
import React, { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'

import SlideBar from 'src/components/SlideBar'

const AdminLayout = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem("token");
    useEffect(() => {
        if (!token) {
            navigate("/login");
            return;
        }
    }, []);
    return (
        <>
            <Stack direction={"row"}>
                <SlideBar />
                <Outlet />
            </Stack>
        </>
    )
}

export default AdminLayout