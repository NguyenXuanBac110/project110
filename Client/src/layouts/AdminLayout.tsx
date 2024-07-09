import React from 'react'
import { Outlet } from 'react-router-dom'

import SlideBar from 'src/components/SlideBar'

const AdminLayout = () => {
    return (
        <>        
            <SlideBar />
            <Outlet/>
        </>
    )
}

export default AdminLayout