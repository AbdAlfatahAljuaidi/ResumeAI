import React, { useEffect, useState } from 'react';
import {
  FaHome, FaFileAlt, FaPlus, FaCloudUploadAlt, FaFilePdf, FaSearch, FaBell, FaEllipsisV, FaTimes, FaEdit, FaTrash
} from 'react-icons/fa';

import { Link, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import {toast} from 'react-toastify';

const apiUrl = import.meta.env.VITE_REACT_APP_BACKEND_BASEURL;

const Dashboard = () => {
  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState({});
  const [showHelpModal, setShowHelpModal] = useState(false);
  const [activeMenuId, setActiveMenuId] = useState(null);

  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    const fetchResumes = async () => {
      try {
        const response = await axios.get(`${apiUrl}/api/user-resumes/${params.id}`);
        setResumes(response.data);
      } catch (error) {
        console.error("Error fetching resumes:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchResumes();
  }, [params.id]);

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

  const handleDeleteResume = async (resumeID) => {
    try {
const deleteConfirmation = window.confirm("هل أنت متأكد أنك تريد حذف هذه السيرة الذاتية؟");

if(!deleteConfirmation) {

  return; // Exit the function if the user cancels the deletion

}

      await axios.delete(`${apiUrl}/delete-resume/${user?._id}/${resumeID}`, { withCredentials: true });
      setResumes(resumes.filter((r) => r._id !== resumeID));
      setActiveMenuId(null);
      toast.success("تم حذف السيرة الذاتية بنجاح");
    } catch (error) {
      console.error("Error deleting resume:", error);
      toast.error("حدث خطأ أثناء حذف السيرة الذاتية");
    }
  };

  return (
    <div className=''  dir="rtl">
      {/* Sidebar */}

      {/* Main Content */}
      <main className="flex-1 p-8 ">
        {/* Header */}
        <header className="flex justify-between items-center mb-10">
          <div className="relative w-1/3">
            <FaSearch className="absolute right-3 top-3 text-gray-400" />
            <input
              type="text"
              placeholder="بحث في السير الذاتية..."
              className="w-full pr-10 pl-4 py-2 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 border-none text-sm"
            />
          </div>
          <div className="flex items-center gap-4 text-gray-500 text-xl">
            <FaBell className="cursor-pointer hover:text-blue-600" />
            
            {/* زر الاستفهام */}
            <div 
              onClick={() => setShowHelpModal(true)} 
              className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-xs font-bold text-gray-600 cursor-pointer hover:bg-blue-100 hover:text-blue-600 transition-colors select-none"
              title="مساعدة ومعلومات عن الموقع"
            >
              ?
            </div>

            <button onClick={logout} className="text-[17px] bg-blue-500 text-white rounded-xl px-6 py-1">تسجيل الخروج</button>
          </div>
        </header>

        {/* Welcome Section */}
        <section className="mb-8">
          <h1 className="text-3xl font-extrabold text-gray-900">أهلاً بك مجدداً، {user.name}</h1>
          <p className="text-gray-500 mt-1">هل أنت مستعد للحصول على وظيفة أحلامك اليوم؟</p>
        </section>

        {/* Score Banner */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between mb-12">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center text-2xl">
              <span>✨</span>
            </div>
            <div>
              <h3 className="font-bold">قوة السيرة الذاتية</h3>
              <p className="text-sm text-gray-500">أضف ملخصاً مهنياً لتصل إلى 100% من قوة ملفك الشخصي.</p>
            </div>
          </div>
        </div>

        {/* Start New Section */}
        <section className="mb-12">
          <div className="flex items-center gap-2 mb-6">
            <span className="text-blue-500 transform -scale-x-100">🚀</span>
            <h2 className="text-xl font-bold">إنشاء جديد</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link to="/CvBuilder">
              <div className="relative bg-white p-8 rounded-2xl border-2 border-dashed border-gray-100 flex flex-col items-center justify-center text-center cursor-pointer hover:shadow-md transition-all group">
                <div className="text-3xl mb-4 transition-transform group-hover:scale-110">
                  <FaPlus className="text-blue-500" />
                </div>
                <h3 className="font-bold text-gray-800">ابدأ من الصفر</h3>
                <p className="text-xs text-gray-400 mt-1">استخدم مساعد الذكاء الاصطناعي</p>
              </div>
            </Link>

            <div className="relative bg-white p-8 rounded-2xl border-2 border-solid border-gray-100 flex flex-col items-center justify-center text-center cursor-not-allowed opacity-60 transition-all">
              <span className="absolute top-3 right-3 bg-yellow-400 text-white text-[10px] px-2 py-1 rounded-full font-bold shadow">
                قريباً
              </span>
              <div className="text-3xl mb-4">
                <FaCloudUploadAlt className="text-gray-600" />
              </div>
              <h3 className="font-bold text-gray-800">استيراد ملف</h3>
              <p className="text-xs text-gray-400 mt-1">نقبل ملفات PDF أو Word</p>
            </div>
          </div>
        </section>

        {/* Recent Documents Section */}
        <section>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold">المستندات الأخيرة</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {loading ? (
              <p>جاري التحميل...</p>
            ) : resumes.length > 0 ? (
              resumes.map((resume) => (
                // تم إزالة overflow-hidden لكي لا يغطي القائمة المنسدلة عند فتحها
                <div key={resume._id} className="bg-white rounded-3xl shadow-sm border border-gray-100 hover:shadow-lg transition-shadow duration-300 p-6 relative">
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <h4 className="font-bold text-lg text-gray-900 tracking-tight">{resume.resumeTitle}</h4>
                      <p className="text-xs text-gray-400 font-medium uppercase tracking-wider mt-1">
                        آخر تعديل: {new Date(resume.updatedAt).toLocaleDateString("ar-EG")}
                      </p>
                    </div>
                    
                    {/* زر الـ 3 نقاط والقائمة المنسدلة */}
                    <div className="relative">
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveMenuId(activeMenuId === resume._id ? null : resume._id);
                        }}
                        className="p-2 hover:bg-gray-50 rounded-full transition-colors"
                      >
                        <FaEllipsisV className="text-gray-400 cursor-pointer" />
                      </button>

                      {activeMenuId === resume._id && (
                        <div className="absolute left-0 mt-2 w-44 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-50">
                          <button
                            onClick={() => {
                              setActiveMenuId(null);
                              navigate(`/CvBuilder/${user?._id}/${resume.resumeTitle}`);
                            }}
                            className="w-full px-4 py-2 text-right text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                          >
                            <FaEdit className="text-blue-500" /> تعديل السيرة الذاتية
                          </button>
                          <button
                            onClick={() => handleDeleteResume(resume._id)}
                            className="w-full px-4 py-2 text-right text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
                          >
                            <FaTrash /> حذف السيرة الذاتية
                          </button>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                      { title: "كلاسيكي", link: `/Resume/${user?._id}/${resume.resumeTitle}` },
                      { title: "عصري", link: `/resumeTwo/${user?._id}/${resume.resumeTitle}` },
                      { title: "حديث", link: `/resumeThree/${user?._id}/${resume.resumeTitle}` }
                    ].map((item, index) => (
                      <Link key={index} to={item.link} className="group">
                        <div className="flex items-start gap-3 p-4 rounded-2xl border border-gray-100 bg-gray-50/50 hover:border-blue-200 hover:bg-white hover:shadow-md transition-all duration-200 h-full">
                          <div className="shrink-0 w-10 h-10 flex items-center justify-center rounded-lg bg-white shadow-sm text-red-500 group-hover:text-blue-600">
                            <FaFilePdf size={18} />
                          </div>
                          <div className="flex flex-col min-w-0 flex-1">
                            <span className="text-sm font-semibold text-gray-700 group-hover:text-blue-700 leading-snug break-words whitespace-normal">
                              {item.title}
                            </span>
                            <span className="text-[10px] text-gray-400 mt-1 uppercase">
                              PDF Document
                            </span>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-3 text-center py-10 border-2 border-dashed rounded-2xl text-gray-400">
                لا توجد سير ذاتية حالياً. ابدأ بإنشاء واحدة!
              </div>
            )}
          </div>
        </section>
      </main>

      {/* نافذة المساعدة (Modal) */}
      {showHelpModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl relative">
            <button 
              onClick={() => setShowHelpModal(false)}
              className="absolute top-4 left-4 text-gray-400 hover:text-gray-600 p-1"
            >
              <FaTimes />
            </button>
            <h3 className="text-xl font-bold text-gray-900 mb-3">دليلك السريع للموقع ✨</h3>
            <p className="text-gray-600 text-sm leading-relaxed mb-4">
              منصة ذكية متخصصة في إنشاء وإدارة السير الذاتية باحترافية عالية باستخدام الذكاء الاصطناعي.
            </p>
            <ul className="text-sm text-gray-600 space-y-2 mb-6 list-disc list-inside">
              <li>أنشئ سيرتك الذاتية من الصفر بخطوات سهلة.</li>
              <li>اختر من بين عدة قوالب احترافية </li>
              <li>قم بتعديل أو حذف مستنداتك في أي وقت من لوحة التحكم.</li>
            </ul>
            <button 
              onClick={() => setShowHelpModal(false)}
              className="w-full bg-blue-500 text-white py-2 rounded-xl font-semibold hover:bg-blue-600 transition-colors"
            >
              فهمت ذلك
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;