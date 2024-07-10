import { Stack } from '@mui/material'
import React from 'react'
import { Outlet } from 'react-router-dom'
import Footer from 'src/components/Footer'
import Header from 'src/components/Header'

import SlideBar from 'src/components/SlideBar'

const ClientLayout = () => {
    return (
        <>        
            <Stack>
                <Header />
                <Outlet />
                <Footer/>
            </Stack>
        </>
    )
}

export default ClientLayout