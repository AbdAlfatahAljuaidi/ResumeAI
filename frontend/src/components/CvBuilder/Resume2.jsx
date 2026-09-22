import React, { useEffect, useState } from 'react';
import NavBar from './NavBar';
import axios from 'axios';
import { 
  FaEnvelope, FaPhone, FaMapMarkerAlt, FaLinkedin, FaGlobe, FaAward, FaCalendarAlt, FaLanguage
} from "react-icons/fa";
import { useParams } from 'react-router-dom';

const apiUrl = import.meta.env.VITE_REACT_APP_BACKEND_BASEURL;

const Resume = ({ userId, resumeTitle }) => {
  const [data, setData] = useState(null);
  const [language, setLanguage] = useState('ar'); // افتراضياً عربي، ويمكن للمستخدم تغييره
  const params = useParams();

  const isRtl = language === 'ar';

  const getSkillTypeLabel = (type) => {
    const labelsArabic = { hard: "تقنية", soft: "شخصية", language: "لغات" };
    const labelsEnglish = { hard: "Hard Skills", soft: "Soft Skills", language: "Languages" };
    const currentLabels = isRtl ? labelsArabic : labelsEnglish;
    return currentLabels[type] || type;
  };

  const formatDate = (date) => {
    if (!date) return '';
    return date.split('T')[0]; // يحذف الوقت
  };

  const printCV = () => {
    window.print();
  };

  useEffect(() => {
    const fetchResume = async () => {
      try {
        const res = await axios.get(`${apiUrl}/resume/${params.userID}/${params.resumeTitle}`, { withCredentials: true });
        setData(res.data.resume);
      } catch (err) {
        console.error("Failed to fetch resume:", err);
      }
    };
    fetchResume();
  }, [userId, resumeTitle, params.userID, params.resumeTitle]);

  if (!data) return <p className="text-center mt-10">جاري تحميل السيرة الذاتية...</p>;

  return (
    <div className={`pb-20 font-sans ${isRtl ? 'rtl' : 'ltr'}`} dir={isRtl ? 'rtl' : 'ltr'}>
      <NavBar />

      {/* أزرار التحكم (تغيير اللغة والطباعة) - لا تظهر عند الطباعة */}
    {/* أزرار التحكم (تغيير اللغة والطباعة) - لا تظهر عند الطباعة */}
<div className="flex justify-center items-center gap-4 mt-8 print:hidden pt-20">
  <button
    onClick={() => setLanguage(prev => prev === 'ar' ? 'en' : 'ar')}
    className="bg-slate-700 hover:bg-slate-900 text-white px-6 py-3.5 rounded-full font-bold shadow-lg flex items-center gap-2 transition-all cursor-pointer text-sm"
  >
    <FaLanguage className="text-lg" /> 
    {isRtl ? "Switch to English 🌐" : "التحويل إلى العربية 🌐"}
  </button>

  <button 
    onClick={printCV} 
    className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3.5 rounded-full font-bold shadow-lg flex items-center gap-2 transition-all cursor-pointer text-sm"
  >
    {isRtl ? "طباعة السيرة الذاتية (PDF)" : "Print Resume (PDF)"}
  </button>
</div>
    
      {/* CV Content */}
      <div 
        id="cv-content" 
        className={`max-w-[850px] mx-auto my-10 bg-white shadow-2xl border border-gray-100 flex min-h-[29.7cm] relative overflow-hidden ${isRtl ? 'flex-row' : 'flex-row-reverse'}`}
      >
        
        {/* الجانب الأيمن بالعربي / الأيسر بالإنجليزي (Sidebar) */}
        <aside className="w-1/3 bg-slate-800 text-white p-8 flex flex-col gap-8">
          <div className="flex flex-col items-center text-center">
            <h1 className="text-xl font-bold tracking-wide">{data.personalInfo.name}</h1>
          </div>
  
          {/* معلومات التواصل */}
          <section>
            <h2 className="text-blue-400 text-xs uppercase tracking-widest font-bold mb-4 border-b border-slate-700 pb-1">
              {isRtl ? "التواصل" : "Contact"}
            </h2>
            <div className={`flex flex-col gap-3 text-sm ${isRtl ? 'text-right' : 'text-left'}`}>
              {data.personalInfo.email && (
                <div className={`flex items-center gap-3 ${isRtl ? '' : 'flex-row-reverse'}`}>
                  <span className="bg-slate-700 p-1.5 rounded"><FaEnvelope className="text-blue-300" /></span> 
                  <span className="break-all">{data.personalInfo.email}</span>
                </div>
              )}
              {data.personalInfo.phoneNumber && (
                <div className={`flex items-center gap-3 ${isRtl ? '' : 'flex-row-reverse'}`}>
                  <span className="bg-slate-700 p-1.5 rounded"><FaPhone className="text-blue-300" /></span> 
                  {data.personalInfo.phoneNumber}
                </div>
              )}
              {data.personalInfo.address && (
                <div className={`flex items-center gap-3 ${isRtl ? '' : 'flex-row-reverse'}`}>
                  <span className="bg-slate-700 p-1.5 rounded"><FaMapMarkerAlt className="text-blue-300" /></span> 
                  {data.personalInfo.address}
                </div>
              )}
              {data.personalInfo.linkedin && (
                <div className={`flex items-center gap-3 ${isRtl ? '' : 'flex-row-reverse'}`}>
                  <span className="bg-slate-700 p-1.5 rounded"><FaLinkedin className="text-blue-300" /></span> 
                  <span className="text-[10px] break-all">LinkedIn</span>
                </div>
              )}
            </div>
          </section>
  
          {/* المهارات */}
          {data.skills?.length > 0 && (
            <section>
              <h2 className="text-blue-400 text-xs uppercase tracking-widest font-bold mb-4 border-b border-slate-700 pb-1">
                {isRtl ? "المهارات" : "Skills"}
              </h2>
              {['hard', 'soft', 'language'].map((type) => {
                const filteredSkills = data.skills.filter(s => s.type === type);
                if (filteredSkills.length === 0) return null;
                return (
                  <div key={type} className="mb-4">
                    <h4 className="text-[10px] text-slate-400 mb-2 font-bold">{getSkillTypeLabel(type)}</h4>
                    <div className="flex flex-wrap gap-2">
                      {filteredSkills.map((skill, i) => (
                        <span key={i} className="text-[11px] bg-slate-700 px-2 py-1 rounded text-slate-200">
                          {skill.name}
                        </span>
                      ))}
                    </div>
                  </div>
                );
              })}
            </section>
          )}
        </aside>
  
        {/* المحتوى الرئيسي (Main Content) */}
        <main className={`w-2/3 p-10 bg-white ${isRtl ? 'text-right' : 'text-left'}`}>
          
          {/* الملخص المهني */}
          {data.personalInfo?.summary && (
            <section className="mb-10">
              <div className={`flex items-center gap-2 mb-3 ${isRtl ? '' : 'flex-row-reverse'}`}>
                <div className="w-2 h-6 bg-blue-600 rounded-full"></div>
                <h2 className="text-xl font-black text-slate-800">{isRtl ? "الملخص المهني" : "Professional Summary"}</h2>
              </div>
              <p className="text-slate-600 leading-relaxed text-sm text-justify leading-7">
                {data.personalInfo.summary}
              </p>
            </section>
          )}
  
          {/* الخبرة العملية */}
          {data.experience?.length > 0 && (
            <section className="mb-10">
              <div className={`flex items-center gap-2 mb-6 ${isRtl ? '' : 'flex-row-reverse'}`}>
                <div className="w-2 h-6 bg-blue-600 rounded-full"></div>
                <h2 className="text-xl font-black text-slate-800">{isRtl ? "الخبرة العملية" : "Work Experience"}</h2>
              </div>
              <div className={`relative flex flex-col gap-8 ${isRtl ? 'border-r-2 border-slate-100 pr-6 mr-1' : 'border-l-2 border-slate-100 pl-6 ml-1'}`}>
                {data.experience.map((exp, index) => (
                  <div key={index} className="relative">
                    {/* نقطة الزمن */}
                    <div className={`absolute top-1.5 w-4 h-4 rounded-full bg-white border-4 border-blue-600 ${isRtl ? '-right-[31px]' : '-left-[31px]'}`}></div>
                    
                    <div className={`flex justify-between items-baseline mb-1 ${isRtl ? '' : 'flex-row-reverse'}`}>
                      <h3 className="text-lg font-bold text-slate-900">{exp.title}</h3>
                      <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded">
                        {formatDate(exp.startDate)} - {exp.isCurrent ? (isRtl ? 'الآن' : 'Present') : formatDate(exp.endDate)}
                      </span>
                    </div>
                    <p className="text-blue-800 font-semibold text-sm mb-2">
                      {exp.companyName} | <span className="text-slate-400 font-normal">{exp.companyAddress}</span>
                    </p>
                    {exp.description && <p className="text-slate-600 text-sm leading-6 whitespace-pre-line">{exp.description}</p>}
                  </div>
                ))}
              </div>
            </section>
          )}
  
          {/* التعليم */}
          {data.education?.length > 0 && (
            <section>
              <div className={`flex items-center gap-2 mb-6 ${isRtl ? '' : 'flex-row-reverse'}`}>
                <div className="w-2 h-6 bg-blue-600 rounded-full"></div>
                <h2 className="text-xl font-black text-slate-800">{isRtl ? "التعليم" : "Education"}</h2>
              </div>
              <div className="flex flex-col gap-6">
                {data.education.map((edu, index) => (
                  <div key={index} className={`bg-slate-50 p-4 rounded-lg ${isRtl ? 'border-r-4 border-blue-600' : 'border-l-4 border-blue-600'}`}>
                    <div className={`flex justify-between items-start ${isRtl ? '' : 'flex-row-reverse'}`}>
                      <div>
                        <h3 className="text-[16px] font-bold text-slate-900">{edu.faculty}</h3>
                        <p className="text-slate-600 text-sm">{edu.universityName}</p>
                      </div>
                      <span className="text-[11px] text-slate-500 font-bold">{formatDate(edu.startDate)} - {formatDate(edu.endDate)}</span>
                    </div>
                    {edu.grade && (
                      <div className={`mt-2 text-xs font-bold text-blue-700 flex items-center gap-1 ${isRtl ? '' : 'flex-row-reverse'}`}>
                        <FaAward /> {isRtl ? "المعدل:" : "GPA:"} {edu.grade}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}
        </main>
      </div>
  
      {/* زر الطباعة المطور */}
      <div className="max-w-[850px] mx-auto text-center print:hidden mt-8">
        <button 
          onClick={printCV} 
          className="bg-slate-800 text-white px-12 py-4 rounded-full hover:bg-slate-900 transition-all shadow-xl font-bold flex items-center gap-3 mx-auto cursor-pointer"
        >
          {isRtl ? "طباعة السيرة الذاتية (PDF)" : "Print Resume (PDF)"}
        </button>
      </div>
  
      <style dangerouslySetInnerHTML={{__html: `
        @media print {
          @page { 
            size: A4; 
            margin: 0 !important; 
          }
          body, html { 
            margin: 0 !important; 
            padding: 0 !important;
            background: white !important;
            -webkit-print-color-adjust: exact; 
            print-color-adjust: exact;
          }
          body * {
            visibility: hidden;
          }
          #cv-content, #cv-content * {
            visibility: visible;
          }
          #cv-content { 
            position: fixed !important;
            top: 0 !important;
            ${isRtl ? 'right: 0 !important;' : 'left: 0 !important;'}
            width: 210mm !important;
            height: 297mm !important;
            max-height: 297mm !important;
            transform: scale(0.95) !important; 
            transform-origin: ${isRtl ? 'top right' : 'top left'} !important; 
            margin: 0 !important;
            padding: 0 !important;
            border: none !important;
            box-shadow: none !important;
            display: flex !important; 
            overflow: hidden !important;
          }
          .print\\:hidden { display: none !important; }
        }
      `}} />
    </div>
  );
};

export default  Resume; // أو تصديرك العادي export default Resume;