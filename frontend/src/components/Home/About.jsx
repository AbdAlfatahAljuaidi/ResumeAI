import React from "react";
import { FaClock, FaRobot, FaFilePdf } from "react-icons/fa";

const About = () => {
  const features = [
    {
      icon: <FaClock />,
      title: "أقل من 5 دقائق",
      desc: "نظام ذكي يختصر عليك ساعات من الكتابة والتنسيق اليدوي الممل.",
      color: "bg-blue-50 text-blue-600",
    },
    {
      icon: <FaRobot />,
      title: "ذكاء اصطناعي",
      desc: "خوارزميات متطورة تقترح عليك أفضل الكلمات المفتاحية لمهنتك.",
      color: "bg-indigo-50 text-indigo-600",
    },
    {
      icon: <FaFilePdf />,
      title: "جاهزة للتقديم",
      desc: "قوالب متوافقة مع أنظمة الـ ATS لضمان وصول ملفك للمدير المسؤول.",
      color: "bg-cyan-50 text-cyan-600",
    },
  ];

  return (
    <section className="py-24 px-6 relative overflow-hidden bg-gray-50/30" dir="rtl">
      {/* دوائر الخلفية الناعمة - مطابقة لروح الـ Dashboard */}
      <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-blue-50/50 rounded-full blur-[100px] -z-10"></div>
      <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-indigo-50/50 rounded-full blur-[100px] -z-10"></div>

      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-20">
          <span className="text-blue-600 font-bold tracking-widest uppercase text-sm bg-blue-50 px-4 py-1.5 rounded-full">
            مميزات المنصة
          </span>
          <h2 className="text-3xl md:text-5xl font-black text-gray-900 mt-6 mb-6">
            ابنِ سيرتك الذاتية <span className="text-blue-600 font-black">بطريقة أذكى</span>
          </h2>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto leading-relaxed">
            لقد قمنا بتبسيط عملية التوظيف المعقدة في خطوات بسيطة وذكية تساعدك على التميز.
          </p>
        </div>

        {/* شبكة المميزات - تصميم الـ Cards المطور */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((item, index) => (
            <div
              key={index}
              className="group bg-white border border-gray-100 p-10 rounded-[2.5rem] transition-all duration-300 hover:border-blue-200 hover:shadow-2xl hover:shadow-blue-100/50 relative overflow-hidden"
            >
              {/* تأثير زخرفي عند الـ Hover */}
              <div className="absolute -top-10 -left-10 w-32 h-32 bg-blue-50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-0"></div>

              <div className="relative z-10">
                <div className={`w-16 h-16 ${item.color} rounded-2xl flex items-center justify-center text-3xl mb-8 group-hover:scale-110 transition-transform duration-300 shadow-sm`}>
                  {item.icon}
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors">
                  {item.title}
                </h3>
                <p className="text-gray-500 leading-relaxed font-medium">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;