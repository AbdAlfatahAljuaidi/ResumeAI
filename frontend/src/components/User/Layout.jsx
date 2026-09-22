import React, { useState } from 'react'
import Aside from './Aside'
import Dashboard from './Dashboard'
import MyResumes from './MyResumes'
import Complaints from '../settings/Complaints'

const Layout = () => {
    const [page, setPage] = useState("Dashboard")
    
    return (
        <div className="flex min-h-screen bg-gray-50 text-gray-800 font-sans" dir="rtl">
            <Aside page={page} setPage={setPage} />

            <div className="flex-1">
                {page === "Dashboard" && <Dashboard />}
                {page === "MyResumes" && <MyResumes />}
                {page === "Complaints" && <Complaints />}
            </div>
        </div>
    )
}

export default Layout