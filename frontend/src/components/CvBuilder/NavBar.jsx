import React from "react";
import { MdOutlineDarkMode } from "react-icons/md";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <nav className="w-full fixed top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        
        {/* Logo / Name */}
        <Link to="/">
        
        <h1 className="text-xl font-bold text-gray-900 cursor-pointer">
          سيرتي الذكية
        </h1>
        </Link>


<div>
  <nav>
  <ul className="flex gap-7">
    <Link to="/Dashboard" className="text-gray-700 hover:text-black"><li>الصفحة الرئيسية</li></Link>
    <Link to={"/CvBuilder"} className="text-gray-700 hover:text-black"><li>بناء سيرة ذاتية</li></Link>
    <Link className="text-gray-700 hover:text-black"><li>قوالب</li></Link>
  </ul>
  </nav>
</div>


        {/* Actions */}
        <div className="flex items-center gap-4">
          
          {/* Dark mode icon */}
          <button
            className="p-2 rounded-full hover:bg-gray-100 transition"
            aria-label="Toggle dark mode"
          >
            <MdOutlineDarkMode size={22} />
          </button>

          {/* Register button */}
          <Link
            to="/register"
            className="bg-black text-white px-5 py-2 rounded-full text-sm font-medium hover:bg-gray-800 transition"
          >
           ترقية
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
