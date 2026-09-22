import React, { useEffect, useState } from 'react';
import NavBar from './NavBar';
import axios from 'axios';
import { 
  FaEnvelope, FaPhone, FaMapMarkerAlt, FaLinkedin, FaGlobe, 
  FaAward, FaCalendarAlt, FaLanguage 
} from "react-icons/fa";
import { useParams } from 'react-router-dom';

const apiUrl = import.meta.env.VITE_REACT_APP_BACKEND_BASEURL;

const Resume = () => {
  const [data, setData] = useState(null);
  const [language, setLanguage] = useState('ar'); // افتراضياً عربي، ويمكن للمستخدم تبديله
  const params = useParams();

  const isRtl = language === 'ar';

  const getSkillTypeLabel = (type) => {
    const labelsArabic = { hard: "مهارات تقنية", soft: "مهارات شخصية", language: "لغات" };
    const labelsEnglish = { hard: "Hard Skills", soft: "Soft Skills", language: "Languages" };
    const currentLabels = isRtl ? labelsArabic : labelsEnglish;
    return currentLabels[type] || type;
  };

  const formatDate = (date) => {
    if (!date) return '';
    return date.split('T')[0];
  };

  const printCV = () => window.print();

  useEffect(() => {
    const fetchResume = async () => {
      try {
        const res = await axios.get(
          `${apiUrl}/resume/${params.userID}/${params.resumeTitle}`,
          { withCredentials: true }
        );
        setData(res.data.resume);
      } catch (err) {
        console.error(err);
      }
    };
    fetchResume();
  }, [params.userID, params.resumeTitle]);  

  if (!data) return <p className="text-center mt-10">جاري تحميل السيرة الذاتية...</p>;

  return (
    <div className="bg-gray-100 min-h-screen py-20 mt-10">
      <NavBar />

      {/* أزرار التحكم بالطباعة وتغيير اللغة (لا تظهر وقت الطباعة) */}
      <div className="flex justify-center items-center gap-4 mt-6 print:hidden">
        <button
          onClick={() => setLanguage(prev => prev === 'ar' ? 'en' : 'ar')}
          className="bg-gray-800 hover:bg-gray-900 text-white px-6 py-3 rounded-full font-bold shadow-lg flex items-center gap-2 transition-all cursor-pointer"
        >
          <FaLanguage /> 
          {isRtl ? "Switch to English 🌐" : "التحويل إلى العربية 🌐"}
        </button>

        <button
          onClick={printCV}
          className="bg-blue-600 hover:bg-blue-700 text-white px-10 py-3 rounded-full font-bold shadow-lg transition-all cursor-pointer"
        >
          {isRtl ? "حفظ / طباعة PDF" : "Save / Print PDF"}
        </button>
      </div>

      {/* CV */}
      <div
        id="cv-content"
        className={`max-w-[900px] mx-auto my-10 bg-white rounded-2xl shadow-xl p-12 ${isRtl ? 'text-right' : 'text-left'}`}
        dir={isRtl ? 'rtl' : 'ltr'}
      >
        {/* Header */}
        {data.personalInfo && (
          <header className="border-b pb-6 mb-8 text-center">
            <h1 className="text-4xl font-extrabold text-gray-900">
              {data.personalInfo.name}
            </h1>

            <div className={`flex flex-wrap justify-center gap-6 text-sm text-gray-600 mt-4 ${isRtl ? 'flex-row-reverse' : 'flex-row'}`}>
              {data.personalInfo.email && <span className="flex items-center gap-2"><FaEnvelope />{data.personalInfo.email}</span>}
              {data.personalInfo.phoneNumber && <span className="flex items-center gap-2"><FaPhone />{data.personalInfo.phoneNumber}</span>}
              {data.personalInfo.address && <span className="flex items-center gap-2"><FaMapMarkerAlt />{data.personalInfo.address}</span>}
            </div>

            <div className={`flex flex-wrap justify-center gap-6 text-sm text-blue-600 mt-2 ${isRtl ? 'flex-row-reverse' : 'flex-row'}`}>
              {data.personalInfo.linkedin && <span className="flex items-center gap-2"><FaLinkedin />{data.personalInfo.linkedin}</span>}
              {data.personalInfo.website && <span className="flex items-center gap-2"><FaGlobe />{data.personalInfo.website}</span>}
            </div>
          </header>
        )}

        {/* Summary */}
        {data.personalInfo?.summary && (
          <section className="mb-8">
            <h2 className="section-title">{isRtl ? "الملخص المهني" : "Professional Summary"}</h2>
            <p className="text-gray-700 leading-relaxed">{data.personalInfo.summary}</p>
          </section>
        )}

        {/* Experience */}
        {data.experience?.length > 0 && (
          <section className="mb-8">
            <h2 className="section-title">{isRtl ? "الخبرة العملية" : "Work Experience"}</h2>
            {data.experience.map((exp, i) => (
              <div key={i} className="mb-6 p-4 border rounded-xl bg-gray-50">
                <div className={`flex justify-between items-start ${isRtl ? '' : 'flex-row'}`}>
                  <div>
                    <h3 className="font-bold text-lg">{exp.title}</h3>
                    <p className="text-blue-700 font-medium">
                      {exp.companyName} <span className="text-gray-500 text-sm">| {exp.companyAddress}</span>
                    </p>
                  </div>
                  <div className={`text-sm text-gray-600 ${isRtl ? 'text-left' : 'text-right'}`}>
                    <div className={`flex items-center gap-1 ${isRtl ? 'justify-end' : 'justify-start'}`}>
                      <FaCalendarAlt />
                      {formatDate(exp.startDate)} - {exp.isCurrent ? (isRtl ? "الآن" : "Present") : formatDate(exp.endDate)}
                    </div>
                    {exp.isCurrent && (
                      <span className={`inline-block mt-1 text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full ${isRtl ? 'float-left' : 'float-right'}`}>
                        {isRtl ? "وظيفة حالية" : "Current Job"}
                      </span>
                    )}
                  </div>
                </div>
                <p className="text-gray-700 text-sm mt-3 whitespace-pre-line">{exp.description}</p>
              </div>
            ))}
          </section>
        )}

        {/* Education */}
        {data.education?.length > 0 && (
          <section className="mb-8">
            <h2 className="section-title">{isRtl ? "التعليم" : "Education"}</h2>
            {data.education.map((edu, i) => (
              <div key={i} className="mb-4 p-4 border rounded-xl">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold">{edu.faculty}</h3>
                    <p className="text-gray-600 text-sm">{edu.universityName} - {edu.address}</p>
                  </div>
                  <span className="text-sm text-gray-500">
                    {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                  </span>
                </div>
                {edu.grade && (
                  <div className={`flex items-center gap-2 text-sm text-orange-600 mt-2 ${isRtl ? '' : 'flex-row'}`}>
                    <FaAward /> {isRtl ? "المعدل:" : "GPA:"} {edu.grade}
                  </div>
                )}
              </div>
            ))}
          </section>
        )}

        {/* Skills */}
        {data.skills?.length > 0 && (
          <section>
            <h2 className="section-title">{isRtl ? "المهارات" : "Skills"}</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {['hard', 'soft', 'language'].map(type => {
                const skills = data.skills.filter(s => s.type === type);
                if (!skills.length) return null;
                return (
                  <div key={type}>
                    <h4 className="font-bold text-gray-500 mb-2">
                      {getSkillTypeLabel(type)}
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {skills.map((s, i) => (
                        <span
                          key={i}
                          className="px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-sm font-semibold"
                        >
                          {s.name} {s.level ? `• ${s.level}` : ''}
                        </span>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        )}
      </div>

      {/* Print CSS متكيف ديناميكياً مع اللغة المختارة */}
      <style dangerouslySetInnerHTML={{__html: `
        @media print {
          @page { 
            margin: 0 !important; 
            size: A4;
          }
          
          html, body {
            height: 100%;
            margin: 0 !important;
            padding: 0 !important;
            overflow: hidden !important;
            background: white !important;
          }

          body { 
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }

          body * { visibility: hidden; }
          #cv-content, #cv-content * { visibility: visible; }

          #cv-content { 
            position: fixed !important;
            top: 0 !important;
            ${isRtl ? 'right: 0 !important;' : 'left: 0 !important;'}
            width: 210mm !important;
            height: 297mm !important;
            max-height: 297mm !important;
            transform: scale(0.94) !important;
            transform-origin: ${isRtl ? 'top right' : 'top left'} !important;
            border: none !important;
            box-shadow: none !important;
            margin: 0 !important;
            padding: 10mm 12mm !important;
            box-sizing: border-box;
            display: block !important;
            overflow: hidden !important;
          }

          section {
            margin-top: 10px !important;
            margin-bottom: 12px !important;
          }

          .print\\:hidden, nav, footer, button { 
            display: none !important; 
          }
        }
      `}} />
    </div>
  );
};

export default Resume;