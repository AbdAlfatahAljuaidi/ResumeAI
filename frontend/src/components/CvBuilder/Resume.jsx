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
    <div className="bg-gray-50 min-h-screen pb-20">
      <NavBar />

      {/* CV Content */}
      <div id="cv-content" className="max-w-[850px] mx-auto my-10 bg-white shadow-xl border border-gray-200 p-10 text-right" dir="rtl">
        
        {/* الرأس */}
        {data.personalInfo && (
        <header className="border-b-2 border-gray-800 pb-6 text-center">
          {data.personalInfo.name && <h1 className="text-4xl font-bold text-gray-900 mb-4">{data.personalInfo.name}</h1>}
          <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-600">
            {data.personalInfo.email && <span className="flex items-center gap-1"><FaEnvelope size={14} /> {data.personalInfo.email}</span>}
            {data.personalInfo.phoneNumber && <span className="flex items-center gap-1"><FaPhone size={14} /> {data.personalInfo.phoneNumber}</span>}
            {data.personalInfo.address && <span className="flex items-center gap-1"><FaMapMarkerAlt size={14} /> {data.personalInfo.address}</span>}
          </div>
          <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-600 mt-2">
            {data.personalInfo.linkedin && <span className="flex items-center gap-1"><FaLinkedin size={14} /> {data.personalInfo.linkedin}</span>}
            {data.personalInfo.website && <span className="flex items-center gap-1"><FaGlobe size={14} /> {data.personalInfo.website}</span>}
          </div>
        </header>
        )}

        {/* الملخص */}
        {data.personalInfo?.summary && (
          <section className="mt-8">
            <h2 className="text-xl font-bold text-gray-800 border-b border-gray-300 mb-3 pb-1">الملخص المهني</h2>
            <p className="text-gray-700 leading-relaxed text-justify">{data.personalInfo.summary}</p>
          </section>
        )}

        {/* الخبرة العملية */}
        {data.experience?.length > 0 && (
          <section className="mt-8">
            <h2 className="text-xl font-bold text-gray-800 border-b border-gray-300 mb-4 pb-1">الخبرة العملية</h2>
            {data.experience.map((exp, index) => (
              <div key={index} className="mb-6">
                <div className="flex justify-between items-start mb-1">
                  <div>
                    {exp.title && <h3 className="text-lg font-bold text-gray-900">{exp.title}</h3>}
                    {(exp.companyName || exp.companyAddress) && (
                      <p className="text-blue-700 font-medium">{exp.companyName} | <span className="text-gray-500 text-sm font-normal">{exp.companyAddress}</span></p>
                    )}
                  </div>
                  <div className="text-left">
                      {(exp.startDate || exp.endDate) && (
                        <span className="text-gray-600 text-sm font-semibold flex items-center gap-1 justify-end">
                          <FaCalendarAlt size={12}/> {formatDate(exp.startDate)} - {exp.isCurrent ? 'الآن' : formatDate(exp.endDate)}
                        </span>
                      )}
                      {exp.isCurrent && <span className="text-[10px] bg-green-100 text-green-700 px-2 py-0.5 rounded-full mt-1 inline-block">وظيفة حالية</span>}
                  </div>
                </div>
                {exp.description && <p className="text-gray-700 text-sm mt-2 whitespace-pre-line">{exp.description}</p>}
              </div>
            ))}
          </section>
        )}

        {/* التعليم */}
        {data.education?.length > 0 && (
          <section className="mt-8">
            <h2 className="text-xl font-bold text-gray-800 border-b border-gray-300 mb-4 pb-1">التعليم</h2>
            {data.education.map((edu, index) => (
              <div key={index} className="mb-4">
                <div className="flex justify-between items-start">
                  <div>
                    {edu.faculty && <h3 className="text-lg font-bold text-gray-900">{edu.faculty}</h3>}
                    {(edu.universityName || edu.address) && <p className="text-gray-700">{edu.universityName} - <span className="text-gray-500 text-sm">{edu.address}</span></p>}
                  </div>
                  <div className="text-left text-gray-600 text-sm font-semibold">
                    {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                  </div>
                </div>
                {edu.grade && (
                  <div className="flex items-center gap-1 text-sm text-gray-600 mt-1 italic">
                    <FaAward size={12} className="text-orange-500" />
                    <span>المعدل: {edu.grade}</span>
                  </div>
                )}
              </div>
            ))}
          </section>
        )}

        {/* المهارات */}
        {data.skills?.length > 0 && (
          <section className="mt-8">
            <h2 className="text-xl font-bold text-gray-800 border-b border-gray-300 mb-4 pb-1">المهارات</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {['hard', 'soft', 'language'].map((type) => {
                const filteredSkills = data.skills.filter(s => s.type === type);
                if (filteredSkills.length === 0) return null;
                return (
                  <div key={type} className="mb-2">
                    <h4 className="text-sm font-bold text-gray-500 mb-2 underline">{getSkillTypeLabel(type)}:</h4>
                    <div className="flex flex-wrap gap-2">
                      {filteredSkills.map((skill, i) => (
                        <div key={i} className="flex flex-col items-center bg-gray-50 border border-gray-200 rounded px-3 py-1">
                          <span className="text-sm font-medium text-gray-800">{skill.name}</span>
                          <span className="text-[9px] text-purple-600 font-bold uppercase">{skill.level}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        )}

      </div>

      {/* زر الطباعة */}
      <div className="max-w-[850px] mx-auto text-center print:hidden mt-4">
        <button 
          onClick={printCV} 
          className="bg-blue-600 text-white px-10 py-3 rounded-xl hover:bg-blue-700 transition-all shadow-lg font-bold"
        >
          طباعة السيرة الذاتية / حفظ PDF
        </button>
      </div>

      {/* CSS للطباعة بحيث يطبع فقط الـ CV */}
     {/* CSS للطباعة بحيث يطبع فقط الـ CV ويخفي العناوين الافتراضية */}
   {/* CSS احترافي للطباعة في صفحة واحدة ومنع الصفحة الثانية الفارغة */}
<style dangerouslySetInnerHTML={{__html: `
  @media print {
    @page { 
      margin: 0; 
      size: A4;
    }
    
    html, body {
      height: 100%;
      margin: 0 !important;
      padding: 0 !important;
      overflow: hidden; /* يمنع إنشاء صفحات إضافية */
    }

    body { 
      -webkit-print-color-adjust: exact;
    }

    #cv-content { 
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%; /* يجبر المحتوى على الالتزام بطول الصفحة */
      max-height: 29.7cm; /* طول ورقة A4 بالضبط */
      border: none !important;
      box-shadow: none !important;
      margin: 0 !important;
      padding: 1.5cm !important; /* هامش داخلي بديل لهوامش المتصفح */
      box-sizing: border-box;
      page-break-after: avoid;
    }

    /* تصغير المسافات بين الأقسام لتوفير مساحة */
    section {
      margin-top: 15px !important;
      page-break-inside: avoid;
    }

    /* إخفاء أي عناصر قد تسبب فراغاً أسفل الصفحة */
    .print\:hidden, nav, footer, button { 
      display: none !important; 
    }

    body * { visibility: hidden; }
    #cv-content, #cv-content * { visibility: visible; }
  }
`}} />
    </div>
  );
};

export default Resume;
