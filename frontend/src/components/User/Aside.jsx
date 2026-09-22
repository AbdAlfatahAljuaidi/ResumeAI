import React, { useEffect, useState } from 'react';
import axios from 'axios'
const apiUrl = import.meta.env.VITE_REACT_APP_BACKEND_BASEURL;
import {
    FaHome, FaFileAlt
  } from 'react-icons/fa';

const Aside = ({page,setPage}) => {

    const [user, setUser] = useState({});

    useEffect(() => {
        const userData = async () => {
            try {
                const { data } = await axios.get(`${apiUrl}/userData`, { withCredentials: true });
                setUser(data.user);
            } catch (error) {
                console.log(error);
            }
        };

        userData();
    }, []);
    return (
        <div>
            <aside className="w-64 h-full bg-white border-l border-gray-200 hidden md:flex flex-col">
                <div className="p-6 flex items-center gap-3">
                    <div className="w-10 h-10 text-white rounded-full flex items-center justify-center font-bold bg-blue-500">
                        {user?.name?.charAt(0)?.toUpperCase()}
                    </div>
                    <div>
                        <h2 className="font-bold text-sm">{user.name}</h2>
                        <p className="text-xs text-blue-500">الخطة المجانية</p>
                    </div>
                </div>

                <nav className="mt-4 flex-1">
                    <div  onClick={()=> setPage("Dashboard")} className={`flex items-center gap-4 px-6 py-3 cursor-pointer transition-all ${page==="Dashboard" ? "bg-blue-50 text-blue-600 border-l-4 border-blue-600" :" text-gray-500 hover:bg-gray-50"} `}>
                        <span className="text-lg"><FaHome /></span>
                        <span className="font-medium text-sm">الرئيسية</span>
                    </div>
                    <div onClick={()=> setPage("MyResumes")} className={`flex items-center gap-4 px-6 py-3 cursor-pointer transition-all ${page==="MyResumes" ? "bg-blue-50 text-blue-600 border-l-4 border-blue-600" :" text-gray-500 hover:bg-gray-50"}`}>
                        <span className="text-lg"><FaFileAlt /></span>
                        <span  className="font-medium text-sm">سيرتي الذاتية</span>
                    </div>
                    <div onClick={()=> setPage("Complaints")} className={`flex items-center gap-4 px-6 py-3 cursor-pointer transition-all ${page==="Complaints" ? "bg-blue-50 text-blue-600 border-l-4 border-blue-600" :" text-gray-500 hover:bg-gray-50"}`}>
                        <span className="text-lg"><FaFileAlt /></span>
                        <span  className="font-medium text-sm">الشكاوي و الاقتراحات</span>
                    </div>
                </nav>
            </aside>
        </div>
    )
}

export default Aside