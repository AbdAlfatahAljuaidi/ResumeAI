import React,{useEffect,useState} from 'react';
import { 
  FaHome, FaFileAlt, FaUserCog, FaCreditCard, 
  FaPlus, FaCloudUploadAlt,FaChevronRight,FaFilePdf,FaLinkedin, FaSearch, FaBell, FaEllipsisV, FaThLarge 
} from 'react-icons/fa';

import {Link,useParams , useNavigate} from 'react-router-dom' 
import axios from 'axios'



const apiUrl = import.meta.env.VITE_REACT_APP_BACKEND_BASEURL;

const Dashboard = () => {


  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user,setUser] = useState({})

const navigate = useNavigate()
const params = useParams()



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
  }, []);


  useEffect(() => {
    const userData = async () => {
      try {
        const {data} = await axios.get(`${apiUrl}/userData`,{withCredentials:true})
    setUser(data.user)
    console.log(user)
    
        
      } catch (error) {
        console.log(error);
        
      }
    }

    userData()

  },[])

  const logout = async () => {
    try {
      const {data} = await axios.post(`${apiUrl}/logout`,{credentials: 'include'})
      if(data.error == false){
        navigate("/login")
      }
    } catch (error) {
      console.log(error);
      
    }
  }


  return (
    // تم تغيير dir إلى rtl وتغيير الخط ليكون متناسقاً مع العربية
    <div className="flex min-h-screen bg-gray-50 text-gray-800 font-sans" dir="rtl">
      
      {/* Sidebar - القائمة الجانبية */}
      <aside className="w-64 bg-white border-l border-gray-200 hidden md:flex flex-col">
        <div className="p-6 flex items-center gap-3">
          <div  className={`w-10 h-10 text-white rounded-full flex items-center justify-center font-bold bg-blue-500
  )}`}>
          {user?.name?.charAt(0)?.toUpperCase()}
          </div>
          <div>
            <h2 className="font-bold text-sm"> {user.name}</h2>
            <p className="text-xs text-blue-500">الخطة المجانية</p>
          </div>
        </div>

        <nav className="mt-4 flex-1">
          <NavItem icon={<FaHome />} label="الرئيسية" active />
          <NavItem icon={<FaFileAlt />} label="سيري الذاتية" />
          <NavItem icon={<FaThLarge />} label="النماذج" />
          <NavItem icon={<FaUserCog />} label="إعدادات الحساب" />
          <NavItem icon={<FaCreditCard />} label="الاشتراك والدفع" />
        </nav>
      </aside>

      {/* Main Content - المحتوى الرئيسي */}
      <main className="flex-1 p-8">
        
        {/* Header - الرأس */}
        <header className="flex justify-between items-center mb-10">
          <div className="relative w-1/3">
            {/* تم نقل الأيقونة لليسار قليلاً لتناسب حقل البحث العربي */}
            <FaSearch className="absolute right-3 top-3 text-gray-400" />
            <input 
              type="text" 
              placeholder="بحث في السير الذاتية..." 
              className="w-full pr-10 pl-4 py-2 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 border-none text-sm"
            />
          </div>
          <div className="flex items-center gap-4 text-gray-500 text-xl">
            <FaBell className="cursor-pointer hover:text-blue-600" />
            <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-xs font-bold text-gray-600">?</div>
        <button onClick={()=>logout()} className='text-[17px] bg-blue-500 text-white rounded-xl px-6 py-1'>تسجيل الخروج</button>
        
          </div>
        </header>

        {/* Welcome Section */}
        <section className="mb-8">
          <h1 className="text-3xl font-extrabold text-gray-900">أهلاً بك مجدداً، {user.name}</h1>
          <p className="text-gray-500 mt-1">هل أنت مستعد للحصول على وظيفة أحلامك اليوم؟</p>
        </section>

        {/* Score Banner - بنر النتيجة */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between mb-12">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center text-2xl">
              <span>✨</span>
            </div>
            <div>
              <h3 className="font-bold">قوة السيرة الذاتية: <span className="text-blue-600">85%</span></h3>
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
    <CreateCard 
      icon={<FaPlus className="text-blue-500" />} 
      title="ابدأ من الصفر" 
      desc="استخدم مساعد الذكاء الاصطناعي" 
      borderStyle="border-dashed"
    />
  </Link>

  <CreateCard 
    icon={<FaCloudUploadAlt className="text-gray-600" />} 
    title="استيراد ملف" 
    desc="نقبل ملفات PDF أو Word" 
    badge="قريبًا"
    disabled
  />

  <CreateCard 
    icon={<FaLinkedin className="text-blue-700" />} 
    title="استيراد من LinkedIn" 
    desc="حول ملفك الشخصي إلى سيرة ذاتية" 
    badge="قريبًا"
    disabled
  />
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
      <ResumeCard
        key={resume._id}
        title={resume.resumeTitle}
        edited={`عدل في ${new Date(resume.updatedAt).toLocaleDateString("ar-EG")}`}
        
        resumeOne="كلاسيكي"
        resumeTwo="عصري"
        resumeThree="حديث"

        linkOne={`/Resume/${user?._id}/${resume.resumeTitle}`}
        linkTwo={`/resumeTwo/${user._id}/${resume.resumeTitle}`}
        linkThree={`/resumeThree/${user._id}/${resume.resumeTitle}`}     
 
      />
    ))
  ) : (
    <div className="col-span-3 text-center py-10 border-2 border-dashed rounded-2xl text-gray-400">
      لا توجد سير ذاتية حالياً. ابدأ بإنشاء واحدة!
    </div>
  )}
</div>




        </section>
      </main>
    </div>
  );
};

// المكونات الفرعية

const NavItem = ({ icon, label, active = false }) => (
  <div className={`flex items-center gap-4 px-6 py-3 cursor-pointer transition-all ${active ? 'bg-blue-50 text-blue-600 border-l-4 border-blue-600' : 'text-gray-500 hover:bg-gray-50'}`}>
    <span className="text-lg">{icon}</span>
    <span className="font-medium text-sm">{label}</span>
  </div>
);

const CreateCard = ({ icon, title, desc, borderStyle = "border-solid", badge, disabled }) => (
  <div className={`
    relative bg-white p-8 rounded-2xl border-2 ${borderStyle} border-gray-100
    flex flex-col items-center justify-center text-center
    cursor-pointer
    ${disabled ? "cursor-not-allowed opacity-60 hover:shadow-none" : "hover:shadow-md"}
    transition-all group
  `}>
    
    {/* Badge إذا موجود */}
    {badge && (
      <span className="absolute top-3 right-3 bg-yellow-400 text-white text-[10px] px-2 py-1 rounded-full font-bold shadow">
        {badge}
      </span>
    )}

    <div className={`text-3xl mb-4 transition-transform ${disabled ? "" : "group-hover:scale-110"}`}>
      {icon}
    </div>
    <h3 className="font-bold text-gray-800">{title}</h3>
    <p className="text-xs text-gray-400 mt-1">{desc}</p>
  </div>
);


const ResumeCard = ({ title, edited, score, resumeOne, linkOne, resumeTwo, linkTwo, resumeThree, linkThree }) => {
  const resumes = [
    { title: resumeOne, link: linkOne },
    { title: resumeTwo, link: linkTwo },
    { title: resumeThree, link: linkThree }
  ].filter(item => item.title && item.link);

  return (
    <div className="bg-white rounded-3xl shadow-sm border border-gray-100 hover:shadow-lg transition-shadow duration-300 overflow-hidden">
      <div className="p-6">
        {/* Header Section */}
        <div className="flex justify-between items-start mb-6">
          <div>
            <h4 className="font-bold text-lg text-gray-900 tracking-tight">{title}</h4>
            <p className="text-xs text-gray-400 font-medium uppercase tracking-wider mt-1">
              آخر تعديل: {edited}
            </p>
          </div>
          <button className="p-2 hover:bg-gray-50 rounded-full transition-colors">
            <FaEllipsisV className="text-gray-400 cursor-pointer" />
          </button>
        </div>

        {/* Resumes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4"> {/* توزيع عمودين ليعطي مساحة أكبر لكل ملف */}
  {resumes.map((item, index) => (
    <Link key={index} to={item.link} className="group">
      <div className="
        flex items-start gap-3 p-4
        rounded-2xl border border-gray-100 bg-gray-50/50
        hover:border-blue-200 hover:bg-white hover:shadow-md
        transition-all duration-200 h-full
      ">
        {/* أيقونة ثابتة الحجم لا تتقلص */}
        <div className="
          shrink-0 w-10 h-10 flex items-center justify-center
          rounded-lg bg-white shadow-sm
          text-red-500 group-hover:text-blue-600
        ">
          <FaFilePdf size={18} />
        </div>
        
        {/* منطقة النص التي تتمدد */}
        <div className="flex flex-col min-w-0 flex-1">
          <span className="
            text-sm font-semibold text-gray-700 group-hover:text-blue-700
            leading-snug break-words whitespace-normal
          ">
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
    </div>
  );
};


export default Dashboard;