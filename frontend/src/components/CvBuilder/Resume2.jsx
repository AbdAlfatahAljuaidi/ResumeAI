import React, { useEffect, useState } from 'react';
import NavBar from './NavBar';
import axios from 'axios';
import { 
  FaEnvelope, FaPhone, FaMapMarkerAlt, FaLinkedin, FaGlobe, FaAward, FaCalendarAlt
} from "react-icons/fa";
import { useParams } from 'react-router-dom';



const apiUrl = import.meta.env.VITE_REACT_APP_BACKEND_BASEURL;

const Resume = ({ userId, resumeTitle }) => {
  const [data, setData] = useState(null);

  const getSkillTypeLabel = (type) => {
    const labels = { hard: "تقنية", soft: "شخصية", language: "لغات" };
    return labels[type] || type;
  };

  const formatDate = (date) => {
    if (!date) return '';
    return date.split('T')[0]; // يحذف الوقت
  };

  const printCV = () => {
    window.print(); // سيطبع العنصر المحدد بـ CSS
  };


  const params = useParams()

  useEffect(() => {
    const fetchResume = async () => {
      try {
        console.log("user,id",params.userID)
        console.log("params.resumeID",params.resumeTitle)
        const res = await axios.get(`${apiUrl}/resume/${params.userID}/${params.resumeTitle}`,{withCredentials:true});
        setData(res.data.resume);
      } catch (err) {
        console.error("Failed to fetch resume:", err);
      }
    };
    fetchResume();
  }, [userId, resumeTitle]);

  if (!data) return <p className="text-center mt-10">جاري تحميل السيرة الذاتية...</p>;

  return (
    <div className=" pb-20 font-sans" dir="rtl">
    
  
    {/* CV Content */}
    <div 
      id="cv-content" 
      className="max-w-[850px] mx-auto my-10 bg-white shadow-2xl border border-gray-100 flex min-h-[29.7cm] relative overflow-hidden"
    >
      
      {/* الجانب الأيمن (العمود الجانبي - Sidebar) */}
      <aside className="w-1/3 bg-slate-800 text-white p-8 flex flex-col gap-8">
        
        {/* الصورة أو الحرف الأول */}
        <div className="flex flex-col items-center text-center">
        
          <h1 className="text-xl font-bold tracking-wide">{data.personalInfo.name}</h1>
        </div>
  
        {/* معلومات التواصل */}
        <section>
          <h2 className="text-blue-400 text-xs uppercase tracking-widest font-bold mb-4 border-b border-slate-700 pb-1">التواصل</h2>
          <div className="flex flex-col gap-3 text-sm">
            {data.personalInfo.email && <div className="flex items-center gap-3"><span className="bg-slate-700 p-1.5 rounded"><FaEnvelope className="text-blue-300" /></span> <span className="break-all">{data.personalInfo.email}</span></div>}
            {data.personalInfo.phoneNumber && <div className="flex items-center gap-3"><span className="bg-slate-700 p-1.5 rounded"><FaPhone className="text-blue-300" /></span> {data.personalInfo.phoneNumber}</div>}
            {data.personalInfo.address && <div className="flex items-center gap-3"><span className="bg-slate-700 p-1.5 rounded"><FaMapMarkerAlt className="text-blue-300" /></span> {data.personalInfo.address}</div>}
            {data.personalInfo.linkedin && <div className="flex items-center gap-3"><span className="bg-slate-700 p-1.5 rounded"><FaLinkedin className="text-blue-300" /></span> <span className="text-[10px] break-all">LinkedIn</span></div>}
          </div>
        </section>
  
        {/* المهارات */}
        {data.skills?.length > 0 && (
          <section>
            <h2 className="text-blue-400 text-xs uppercase tracking-widest font-bold mb-4 border-b border-slate-700 pb-1">المهارات</h2>
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
  
      {/* الجانب الأيسر (المحتوى الرئيسي - Main Content) */}
      <main className="w-2/3 p-10 text-right bg-white">
        
        {/* الملخص المهني */}
        {data.personalInfo?.summary && (
          <section className="mb-10">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-2 h-6 bg-blue-600 rounded-full"></div>
              <h2 className="text-xl font-black text-slate-800">الملخص المهني</h2>
            </div>
            <p className="text-slate-600 leading-relaxed text-sm text-justify leading-7">
              {data.personalInfo.summary}
            </p>
          </section>
        )}
  
        {/* الخبرة العملية */}
        {data.experience?.length > 0 && (
          <section className="mb-10">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-2 h-6 bg-blue-600 rounded-full"></div>
              <h2 className="text-xl font-black text-slate-800">الخبرة العملية</h2>
            </div>
            <div className="relative border-r-2 border-slate-100 pr-6 mr-1 flex flex-col gap-8">
              {data.experience.map((exp, index) => (
                <div key={index} className="relative">
                  {/* نقطة الزمن */}
                  <div className="absolute -right-[31px] top-1.5 w-4 h-4 rounded-full bg-white border-4 border-blue-600"></div>
                  
                  <div className="flex justify-between items-baseline mb-1">
                    <h3 className="text-lg font-bold text-slate-900">{exp.title}</h3>
                    <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded">
                      {formatDate(exp.startDate)} - {exp.isCurrent ? 'الآن' : formatDate(exp.endDate)}
                    </span>
                  </div>
                  <p className="text-blue-800 font-semibold text-sm mb-2">{exp.companyName} | <span className="text-slate-400 font-normal">{exp.companyAddress}</span></p>
                  {exp.description && <p className="text-slate-600 text-sm leading-6 whitespace-pre-line">{exp.description}</p>}
                </div>
              ))}
            </div>
          </section>
        )}
  
        {/* التعليم */}
        {data.education?.length > 0 && (
          <section>
            <div className="flex items-center gap-2 mb-6">
              <div className="w-2 h-6 bg-blue-600 rounded-full"></div>
              <h2 className="text-xl font-black text-slate-800">التعليم</h2>
            </div>
            <div className="flex flex-col gap-6">
              {data.education.map((edu, index) => (
                <div key={index} className="bg-slate-50 p-4 rounded-lg border-r-4 border-blue-600">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-[16px] font-bold text-slate-900">{edu.faculty}</h3>
                      <p className="text-slate-600 text-sm">{edu.universityName}</p>
                    </div>
                    <span className="text-[11px] text-slate-500 font-bold">{formatDate(edu.startDate)} - {formatDate(edu.endDate)}</span>
                  </div>
                  {edu.grade && (
                    <div className="mt-2 text-xs font-bold text-blue-700 flex items-center gap-1">
                      <FaAward /> المعدل: {edu.grade}
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
        onClick={window.print} 
        className="bg-slate-800 text-white px-12 py-4 rounded-full hover:bg-slate-900 transition-all shadow-xl font-bold flex items-center gap-3 mx-auto"
      >
       طباعة السيرة الذاتية (PDF)
      </button>
    </div>
  
    <style dangerouslySetInnerHTML={{__html: `
      @media print {
        @page { margin: 0; size: A4; }
        body { margin: 0; -webkit-print-color-adjust: exact; }
        #cv-content { 
          width: 210mm;
          height: 297mm;
          margin: 0 !important;
          border: none !important;
          box-shadow: none !important;
          display: flex !important; /* ضمان بقاء التخطيط الجانبي */
        }
        .print\\:hidden { display: none !important; }
      }
    `}} />
  </div>
  );
};

export default Resume;
