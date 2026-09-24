import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const apiUrl = import.meta.env.VITE_REACT_APP_BACKEND_BASEURL;
import { FaHome, FaFileAlt, FaBars, FaTimes, FaBell } from 'react-icons/fa';

const Aside = ({ page, setPage }) => {
    const [user, setUser] = useState({});
    const [isOpen, setIsOpen] = useState(false); 
    const [showHelpModal, setShowHelpModal] = useState(false); 
    const navigate = useNavigate();

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

    const handlePageChange = (newPage) => {
        setPage(newPage);
        setIsOpen(false); 
    };

    const logout = async () => {
        try {
            const { data } = await axios.post(
                `${apiUrl}/logout`,
                {},
                { withCredentials: true }
            );

            if (data.error === false) {
                navigate("/login");
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            {/* زر القائمة للشاشات الصغيرة (Mobile Top Bar) */}
            <div className="md:hidden flex items-center justify-between bg-white border-b border-gray-200 px-4 py-3 fixed top-0 left-0 right-0 z-40">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 text-white rounded-full flex items-center justify-center font-bold bg-blue-500 text-sm">
                        {user?.name?.charAt(0)?.toUpperCase()}
                    </div>
                    <span className="font-bold text-sm text-gray-800">{user?.name}</span>
                </div>
                
                <div className="flex items-center gap-3">
                    <div className="flex items-center gap-3 text-gray-500 text-lg">
                        <FaBell className="cursor-pointer hover:text-blue-600" />
                        <div 
                            onClick={() => setShowHelpModal(true)} 
                            className="w-7 h-7 bg-gray-200 rounded-full flex items-center justify-center text-xs font-bold text-gray-600 cursor-pointer hover:bg-blue-100 hover:text-blue-600 transition-colors select-none"
                            title="مساعدة ومعلومات عن الموقع"
                        >
                            ?
                        </div>
                    </div>
                    <button 
                        onClick={() => setIsOpen(!isOpen)} 
                        className="text-gray-600 focus:outline-none text-xl p-1"
                    >
                        <FaBars />
                    </button>
                </div>
            </div>

            {/* طبقة مظلمة خلف القائمة عند فتحها على الموبايل */}
            {isOpen && (
                <div 
                    onClick={() => setIsOpen(false)} 
                    className="fixed inset-0 bg-black/50 z-40 md:hidden transition-opacity"
                />
            )}

            {/* الشريط الجانبي (Aside) - تم التعديل إلى h-screen و sticky top-0 */}
            <aside className={`
                w-64 h-screen bg-white border-l border-gray-200 flex flex-col fixed md:sticky top-0 right-0 z-50
                transition-transform duration-300 ease-in-out
                ${isOpen ? 'translate-x-0' : 'translate-x-full md:translate-x-0'}
            `}>
                {/* رأس القائمة للشاشات الكبيرة */}
                <div className="p-6 hidden md:flex items-center gap-3">
                    <div className="w-10 h-10 text-white rounded-full flex items-center justify-center font-bold bg-blue-500">
                        {user?.name?.charAt(0)?.toUpperCase()}
                    </div>
                    <div>
                        <h2 className="font-bold text-sm">{user?.name}</h2>
                        <p className="text-xs text-blue-500">الخطة المجانية</p>
                    </div>
                </div>

                {/* رأس القائمة للشاشات الصغيرة */}
                <div className="p-4 flex md:hidden items-center justify-between border-b border-gray-100">
                    <span className="font-bold text-sm text-gray-800">القائمة الرئيسية</span>
                    <button onClick={() => setIsOpen(false)} className="text-gray-500 text-xl p-1">
                        <FaTimes />
                    </button>
                </div>

                {/* روابط التنقل */}
                <nav className="mt-2 md:mt-0 flex-1">
                    <div 
                        onClick={() => handlePageChange("Dashboard")} 
                        className={`flex items-center gap-4 px-6 py-3 cursor-pointer transition-all ${page === "Dashboard" ? "bg-blue-50 text-blue-600 border-l-4 border-blue-600" : "text-gray-500 hover:bg-gray-50"}`}
                    >
                        <span className="text-lg"><FaHome /></span>
                        <span className="font-medium text-sm">الرئيسية</span>
                    </div>

                    <div 
                        onClick={() => handlePageChange("MyResumes")} 
                        className={`flex items-center gap-4 px-6 py-3 cursor-pointer transition-all ${page === "MyResumes" ? "bg-blue-50 text-blue-600 border-l-4 border-blue-600" : "text-gray-500 hover:bg-gray-50"}`}
                    >
                        <span className="text-lg"><FaFileAlt /></span>
                        <span className="font-medium text-sm">سيرتي الذاتية</span>
                    </div>

                    <div 
                        onClick={() => handlePageChange("Complaints")} 
                        className={`flex items-center gap-4 px-6 py-3 cursor-pointer transition-all ${page === "Complaints" ? "bg-blue-50 text-blue-600 border-l-4 border-blue-600" : "text-gray-500 hover:bg-gray-50"}`}
                    >
                        <span className="text-lg"><FaFileAlt /></span>
                        <span className="font-medium text-sm">الشكاوي و الاقتراحات</span>
                    </div>
                </nav>

                {/* أزرار الإشعارات، المساعدة، وتسجيل الخروج في الأسفل */}
                <div className="p-4 border-t border-gray-200  md:flex flex-col gap-4 hidden">
                    <div className="flex items-center justify-around text-gray-500 text-xl">
                        <FaBell className="cursor-pointer hover:text-blue-600" title="الإشعارات" />
                        
                        <div 
                            onClick={() => setShowHelpModal(true)} 
                            className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-xs font-bold text-gray-600 cursor-pointer hover:bg-blue-100 hover:text-blue-600 transition-colors select-none"
                            title="مساعدة ومعلومات عن الموقع"
                        >
                            ?
                        </div>
                    </div>
                    <button 
                        onClick={logout} 
                        className="w-full text-[17px] bg-blue-500 text-white rounded-xl py-2 hover:bg-blue-600 transition-colors cursor-pointer"
                    >
                        تسجيل الخروج
                    </button>
                </div>
                <div className='px-4 md:hidden'>
                <button 
                        onClick={logout} 
                        className="w-full text-[17px] bg-blue-500 text-white rounded-xl py-2 hover:bg-blue-600 transition-colors cursor-pointer"
                    >
                        تسجيل الخروج
                    </button>
                </div>
              
            </aside>

            {/* نافذة المساعدة (Help Modal) */}
            {showHelpModal && (
                <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl relative">
                        <button 
                            onClick={() => setShowHelpModal(false)}
                            className="absolute top-4 left-4 text-gray-400 hover:text-gray-600 p-1 cursor-pointer"
                        >
                            <FaTimes />
                        </button>
                        <h3 className="text-xl font-bold text-gray-900 mb-3">دليلك السريع للموقع ✨</h3>
                        <p className="text-gray-600 text-sm leading-relaxed mb-4">
                            منصة ذكية متخصصة في إنشاء وإدارة السير الذاتية باحترافية عالية باستخدام الذكاء الاصطناعي.
                        </p>
                        <ul className="text-sm text-gray-600 space-y-2 mb-6 list-disc list-inside">
                            <li>أنشئ سيرتك الذاتية من الصفر بخطوات سهلة.</li>
                            <li>اختر من بين عدة قوالب احترافية.</li>
                            <li>قم بتعديل أو حذف مستنداتك في أي وقت من لوحة التحكم.</li>
                        </ul>
                        <button 
                            onClick={() => setShowHelpModal(false)}
                            className="w-full bg-blue-500 text-white py-2 rounded-xl font-semibold hover:bg-blue-600 transition-colors cursor-pointer"
                        >
                            فهمت ذلك
                        </button>
                    </div>
                </div>
            )}
        </>
    );
};

Aside.defaultProps = {
  page: "Dashboard",
  setPage: () => {}
};

Aside.defaultProps = {
  page: "Dashboard",
  setPage: () => {}
};

export default Aside;