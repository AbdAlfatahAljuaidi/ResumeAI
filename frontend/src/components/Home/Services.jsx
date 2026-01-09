import React from "react";
import {
  FaBrain,
  FaFileAlt,
  FaRegFilePdf,
  FaRegEye,
  FaLock,
  FaStopwatch,
} from "react-icons/fa";

const Services = () => {
  const serviceList = [
    {
      icon: <FaBrain />,
      title: "الكتابة بالذكاء الاصطناعي",
      desc: "تحويل المعلومات البسيطة إلى محتوى احترافي يجذب مسؤولي التوظيف.",
    },
    {
      icon: <FaFileAlt />,
      title: "قوالب متوافقة مع ATS",
      desc: "مصممة لتجاوز أنظمة التوظيف الآلية والوصول للمراجعة البشرية.",
    },
    {
      icon: <FaRegFilePdf />,
      title: "تصدير PDF بجودة عالية",
      desc: "تحميل السيرة الذاتية جاهزة للإرسال فورًا لأصحاب العمل.",
    },
    {
      icon: <FaRegEye />,
      title: "معاينة فورية",
      desc: "شاهد شكل سيرتك الذاتية مباشرة أثناء التعديل بنقرة واحدة.",
    },
    {
      icon: <FaLock />,
      title: "خصوصية وأمان",
      desc: "نحافظ على بياناتك مشفرة ولا نشاركها مع أي طرف ثالث أبداً.",
    },
    {
      icon: <FaStopwatch />,
      title: "جاهز خلال دقائق",
      desc: "أنشئ سيرة كاملة احترافية خلال أقل من 10 دقائق فقط.",
    },
  ];

  return (
    <section className="relative py-24 px-6 bg-white overflow-hidden" dir="rtl">
      {/* خلفية جمالية مطابقة للـ Dashboard */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-50/40 rounded-full blur-[120px] -z-10"></div>
      
      <div className="max-w-6xl mx-auto">
        {/* العنوان الرأسي */}
        <div className="text-center mb-20">
          <span className="text-blue-600 font-bold text-sm bg-blue-50 px-4 py-2 rounded-xl border border-blue-100">
            لماذا تختار سيرتي الذكية؟
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 mt-6 leading-tight">
            منشئ السيرة الذاتية <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-l from-blue-600 to-indigo-600">
              المدعوم بالذكاء الاصطناعي
            </span>
          </h2>
          <p className="mt-6 text-gray-500 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            نحن نجمع بين التكنولوجيا المتطورة وسهولة الاستخدام لنضعك على أول طريق النجاح المهني.
          </p>
        </div>

        {/* شبكة الخدمات - ستايل الـ Dashboard Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {serviceList.map((item, index) => (
            <div
              key={index}
              className="group relative bg-white border border-gray-100 p-8 rounded-[2rem] transition-all duration-300 hover:shadow-2xl hover:shadow-blue-100 hover:-translate-y-2"
            >
              {/* أيقونة بستايل Dashboard */}
              <div className="w-14 h-14 mb-6 flex items-center justify-center bg-gray-50 text-blue-600 text-2xl rounded-2xl group-hover:bg-blue-600 group-hover:text-white group-hover:rotate-6 transition-all duration-300 shadow-sm">
                {item.icon}
              </div>

              <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                {item.title}
              </h3>
              
              <p className="text-gray-500 leading-relaxed text-sm font-medium">
                {item.desc}
              </p>

              {/* خط ديكوري سفلي يظهر عند الـ hover */}
              <div className="absolute bottom-0 right-1/2 translate-x-1/2 w-0 h-1 bg-blue-600 rounded-full group-hover:w-1/3 transition-all duration-500"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;