import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { FaPlus, FaEye, FaEdit, FaTrash, FaFileAlt, FaSpinner, FaSearch, FaBell, FaTimes, FaEnvelope, FaPhone, FaMapMarkerAlt, FaLinkedin, FaAward } from 'react-icons/fa';
import axios from 'axios';
import { toast } from 'react-toastify';

const apiUrl = import.meta.env.VITE_REACT_APP_BACKEND_BASEURL;

const MyResumes = () => {
  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState({});
  const [showHelpModal, setShowHelpModal] = useState(false);
  const navigate = useNavigate();
  const params = useParams();

  // جلب السير الذاتية الخاصة بالمستخدم عند تحميل الصفحة
  useEffect(() => {
    const fetchResumes = async () => {
      try {
        const { data } = await axios.get(`${apiUrl}/api/user-resumes/${params.id}`, { withCredentials: true });
        
        if (Array.isArray(data)) {
          setResumes(data);
        } else if (data.resumes && Array.isArray(data.resumes)) {
          setResumes(data.resumes);
        } else {
          setResumes([]);
        }
      } catch (error) {
        console.log(error);
        toast.error("فشل في تحميل السير الذاتية");
      } finally {
        setLoading(false);
      }
    };

    fetchResumes();
  }, [params.id]);

  // دالة حذف سيرة ذاتية
  const handleDelete = async (id) => {
    if (!window.confirm("هل أنت متأكد من حذف هذه السيرة الذاتية؟")) return;

    try {
      const { data } = await axios.delete(`${apiUrl}/resume/${id}`, { withCredentials: true });
      if (data.error === false || data.success) {
        toast.success(data.message || "تم الحذف بنجاح");
        setResumes(resumes.filter((resume) => resume._id !== id));
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "حدث خطأ أثناء الحذف");
    }
  };

  const logout = async () => {
    try {
      const { data } = await axios.post(
        `${apiUrl}/logout`,
        {},
        { withCredentials: true }
      );

      if (data.error === false || data.success) {
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
    }
  };


  
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
    <div className="min-h-screen bg-white text-gray-900 p-6 md:p-12 relative">
      
      {/* الهيدر العلوي */}
      <header className="flex justify-between items-center mb-10">
        <div className="relative w-1/3">
          <FaSearch className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="بحث في السير الذاتية..."
            className="w-full pr-10 pl-4 py-2 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 border-none text-sm"
          />
        </div>
        <div className="flex items-center gap-4 text-gray-500 text-xl">
          <FaBell className="cursor-pointer hover:text-blue-600 transition-colors" />
          
          {/* زر الاستفهام */}
          <div 
            onClick={() => setShowHelpModal(true)} 
            className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-xs font-bold text-gray-600 cursor-pointer hover:bg-blue-100 hover:text-blue-600 transition-colors select-none"
            title="مساعدة ومعلومات عن الموقع"
          >
            ?
          </div>

          <button onClick={logout} className="text-[17px] bg-blue-500 hover:bg-blue-600 text-white rounded-xl px-6 py-1 transition-colors">
            تسجيل الخروج
          </button>
        </div>
      </header>

      {/* المحتوى الرئيسي */}
      <div className="max-w-6xl mx-auto">
        
        {/* رأس الصفحة: العنوان وزر الإضافة */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">سيرتي الذاتية</h1>
            <p className="text-gray-500 text-sm mt-1">إدارة وتعديل السير الذاتية الخاصة بك بسهولة</p>
          </div>

          <Link
            to="/CvBuilder" 
            className="bg-blue-600 text-white font-semibold px-6 py-3 rounded-3xl flex items-center gap-2 hover:bg-blue-700 transition-colors shadow-lg shadow-blue-600/20"
          >
            <FaPlus />
            <span>إنشاء سيرة ذاتية جديدة</span>
          </Link>
        </div>

        {/* حالة التحميل */}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <FaSpinner className="animate-spin text-3xl text-blue-600" />
          </div>
        ) : resumes.length > 0 ? (
          /* شبكة عرض السير الذاتية (كل بطاعة تعرض الـ CV الحقيقي بحجم مصغر) */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {resumes.map((resume) => (
              <div 
                key={resume._id} 
                className="bg-white border-2 border-gray-200 rounded-2xl p-4 flex flex-col justify-between transition-all hover:border-blue-500 hover:shadow-xl group"
              >
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-xs bg-blue-50 text-blue-600 px-3 py-1 rounded-full font-bold">
                      {resume.resumeTitle || "سيرة ذاتية"}
                    </span>
                    <span className="text-gray-400 text-xs">
                      {new Date(resume.updatedAt).toLocaleDateString('ar-EG')}
                    </span>
                  </div>

                  {/* الحاوية المصغرة التي تحاكي هيكل صفحة الـ Resume الحقيقية تماماً */}
                  <div className="w-full h-[320px] bg-gray-50 border border-gray-200 rounded-xl overflow-hidden relative shadow-inner">
                    <div className="w-[850px] origin-top-right transform scale-[0.38] bg-white flex min-h-[1100px] pointer-events-none select-none" dir="rtl">
                      
                      {/* الجانب الأيمن (الـ Sidebar المصغر) */}
                      <aside className="w-1/3 bg-slate-800 text-white p-8 flex flex-col gap-6">
                        <div className="flex flex-col items-center text-center">
                          <h1 className="text-2xl font-bold tracking-wide">{resume.personalInfo?.name}</h1>
                        </div>
                        
                        <section>
                          <h2 className="text-blue-400 text-xs uppercase tracking-widest font-bold mb-3 border-b border-slate-700 pb-1">التواصل</h2>
                          <div className="flex flex-col gap-2 text-sm">
                            {resume.personalInfo?.email && <div className="flex items-center gap-2"><span className="bg-slate-700 p-1 rounded"><FaEnvelope className="text-blue-300" /></span> <span>{resume.personalInfo.email}</span></div>}
                            {resume.personalInfo?.phoneNumber && <div className="flex items-center gap-2"><span className="bg-slate-700 p-1 rounded"><FaPhone className="text-blue-300" /></span> {resume.personalInfo.phoneNumber}</div>}
                            {resume.personalInfo?.address && <div className="flex items-center gap-2"><span className="bg-slate-700 p-1 rounded"><FaMapMarkerAlt className="text-blue-300" /></span> {resume.personalInfo.address}</div>}
                          </div>
                        </section>

                        {resume.skills?.length > 0 && (
                          <section>
                            <h2 className="text-blue-400 text-xs uppercase tracking-widest font-bold mb-3 border-b border-slate-700 pb-1">المهارات</h2>
                            <div className="flex flex-wrap gap-2">
                              {resume.skills.map((skill, i) => (
                                <span key={i} className="text-xs bg-slate-700 px-2 py-1 rounded text-slate-200">
                                  {skill.name}
                                </span>
                              ))}
                            </div>
                          </section>
                        )}
                      </aside>

                      {/* الجانب الأيسر (المحتوى الرئيسي المصغر) */}
                      <main className="w-2/3 p-10 text-right bg-white">
                        {resume.personalInfo?.summary && (
                          <section className="mb-8">
                            <div className="flex items-center gap-2 mb-2">
                              <div className="w-2 h-6 bg-blue-600 rounded-full"></div>
                              <h2 className="text-xl font-black text-slate-800">الملخص المهني</h2>
                            </div>
                            <p className="text-slate-600 text-sm leading-6">{resume.personalInfo.summary}</p>
                          </section>
                        )}

                        {resume.experience?.length > 0 && (
                          <section className="mb-8">
                            <div className="flex items-center gap-2 mb-4">
                              <div className="w-2 h-6 bg-blue-600 rounded-full"></div>
                              <h2 className="text-xl font-black text-slate-800">الخبرة العملية</h2>
                            </div>
                            <div className="flex flex-col gap-4">
                              {resume.experience.map((exp, index) => (
                                <div key={index}>
                                  <h3 className="text-lg font-bold text-slate-900">{exp.title}</h3>
                                  <p className="text-blue-800 font-semibold text-sm">{exp.companyName}</p>
                                  <p className="text-slate-600 text-sm">{exp.description}</p>
                                </div>
                              ))}
                            </div>
                          </section>
                        )}

                        {resume.education?.length > 0 && (
                          <section>
                            <div className="flex items-center gap-2 mb-4">
                              <div className="w-2 h-6 bg-blue-600 rounded-full"></div>
                              <h2 className="text-xl font-black text-slate-800">التعليم</h2>
                            </div>
                            <div className="flex flex-col gap-4">
                              {resume.education.map((edu, index) => (
                                <div key={index} className="bg-slate-50 p-4 rounded-lg border-r-4 border-blue-600">
                                  <h3 className="text-base font-bold text-slate-900">{edu.faculty}</h3>
                                  <p className="text-slate-600 text-sm">{edu.universityName}</p>
                                </div>
                              ))}
                            </div>
                          </section>
                        )}
                      </main>

                    </div>
                  </div>
                </div>

                {/* أزرار الإجراءات (معاينة، تعديل، حذف) */}
                <div className="flex flex-wrap items-center justify-between gap-3 border-t border-gray-100 pt-4 mt-4">
  
  {/* مجموعة أزرار المعاينة للتصاميم المختلفة */}
  <div className="flex flex-wrap items-center gap-2">
    {[
      { path: 'resume', label: 'التصميم الكلاسيكي' },
      { path: 'resumeTwo', label: 'التصميم العصري' },
      { path: 'resumeThree', label: 'التصميم الحديث' },
    ].map((item, index) => (
      <Link 
        key={index}
        to={`/${item.path}/${params.id}/${resume.resumeTitle}`} 
        className="bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white px-3 py-1.5 rounded-xl flex items-center gap-1.5 text-xs font-bold transition-all shadow-sm"
      >
        <FaEye />  {item.label}
      </Link>
    ))}
  </div>

  {/* مجموعة أزرار التعديل والحذف */}
  <div className="flex items-center gap-4">
    <Link 
      to={`/CvBuilder/${user._id}/${resume.resumeTitle}`} 
      className="text-gray-600 hover:text-blue-600 flex items-center gap-1 text-xs font-semibold transition-colors"
    >
      <FaEdit /> تعديل
    </Link>

    <button 
      onClick={() => handleDelete(resume._id)} 
      className="text-red-500 hover:text-red-700 flex items-center gap-1 text-xs font-semibold transition-colors cursor-pointer"
    >
      <FaTrash /> حذف
    </button>
  </div>

</div>

              </div>
            ))}
          </div>
        ) : (
          /* في حال لم تكن هناك أي سير ذاتية */
          <div className="text-center py-20 bg-gray-50 border border-gray-200 rounded-3xl">
            <FaFileAlt className="mx-auto text-5xl text-blue-400 mb-4" />
            <h3 className="text-xl font-bold mb-2 text-gray-900">لا توجد سير ذاتية حتى الآن</h3>
            <p className="text-gray-500 text-sm mb-6">ابدأ بإنشاء سيرتك الذاتية الأولى لتزيد من فرص قبولك الوظيفي</p>
            <Link
              to="/create-resume"
              className="inline-flex items-center gap-2 bg-blue-600 text-white font-medium px-6 py-2.5 rounded-3xl hover:bg-blue-700 transition-colors shadow-md shadow-blue-600/20"
            >
              <FaPlus />
              <span>إنشاء سيرة ذاتية</span>
            </Link>
          </div>
        )}

      </div>

      {/* مودال المساعدة (Help Modal) */}
      {showHelpModal && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 p-4">
          <div className="bg-white w-full max-w-md rounded-2xl p-6 shadow-2xl relative">
            <button 
              onClick={() => setShowHelpModal(false)}
              className="absolute left-4 top-4 text-gray-400 hover:text-gray-700"
            >
              <FaTimes className="text-xl" />
            </button>
            <h3 className="text-xl font-bold text-gray-900 mb-4">مساعدة ومعلومات</h3>
            <p className="text-gray-600 text-sm leading-relaxed mb-6">
              مرحباً بك في منصة إدارة السير الذاتية. تعرض البطاقات أدناه معاينة مصغرة ودقيقة لشكل الـ CV الفعلي الخاص بك. يمكنك الضغط على زر "معاينة كاملة" لاستعراضها بالشكل الكامل أو طباعتها.
            </p>
            <button
              onClick={() => setShowHelpModal(false)}
              className="w-full bg-blue-600 text-white py-2.5 rounded-xl font-medium hover:bg-blue-700 transition-colors"
            >
              حسناً، فهمت
            </button>
          </div>
        </div>
      )}

    </div>
  );
};

export default MyResumes;