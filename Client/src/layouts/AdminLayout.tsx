import { Stack } from '@mui/material'
import React from 'react'
import { Outlet } from 'react-router-dom'

import SlideBar from 'src/components/SlideBar'

const AdminLayout = () => {
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