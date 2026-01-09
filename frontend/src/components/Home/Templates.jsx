import React from 'react';
import { FaLaptopCode, FaRegFileAlt, FaStopwatch, FaArrowLeft } from 'react-icons/fa';

const Templates = () => {
  const templateTypes = [
    {
      icon: <FaLaptopCode />,
      title: "عصري",
      desc: "تصميم حديث ونظيف يركز على الوضوح، مثالي للوظائف التقنية والإبداعية.",
      previewColor: "bg-blue-600",
    },
    {
      icon: <FaRegFileAlt />,
      title: "كلاسيكي",
      desc: "تصميم رسمي وتقليدي يناسب الشركات الكبيرة والوظائف الإدارية والقانونية.",
      previewColor: "bg-gray-800",
    },
    {
      icon: <FaStopwatch />,
      title: "بسيط / سريع",
      desc: "قالب أنيق مع مساحات بيضاء متوازنة، مخصص للتعديل الفوري والعرض السريع.",
      previewColor: "bg-indigo-500",
    },
  ];

  return (
    <section className="py-24 px-6 relative overflow-hidden bg-gray-50/30" dir="rtl">
      {/* تأثيرات الخلفية الناعمة */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-100/40 rounded-full blur-[120px] -z-10"></div>

      <div className="max-w-6xl mx-auto">
        {/* الرأس - Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6">
            قوالب <span className="text-blue-600">احترافية</span> جاهزة
          </h2>
          <p className="text-gray-500 text-lg max-w-3xl mx-auto leading-relaxed">
            اختر من بين مجموعة من القوالب المصممة بعناية لتناسب احتياجاتك. جميع القوالب متوافقة مع أنظمة الـ ATS وجاهزة للتحميل الفوري.
          </p>
        </div>

        {/* شبكة القوالب - Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-16">
          {templateTypes.map((item, index) => (
            <div key={index} className="group cursor-pointer">
              {/* محاكي شكل القالب - بصرياً مثل الـ Dashboard */}
              <div className="relative h-80 bg-white rounded-[2rem] border border-gray-100 shadow-sm overflow-hidden mb-6 group-hover:shadow-2xl group-hover:shadow-blue-100 transition-all duration-300 group-hover:-translate-y-2">
                
                {/* الجزء العلوي الملون (Header Preview) */}
                <div className={`h-20 ${item.previewColor} opacity-90 group-hover:opacity-100 transition-opacity`}></div>
                
                {/* محاكاة محتوى السيرة الذاتية */}
                <div className="p-6 space-y-4">
                  <div className="h-3 w-1/2 bg-gray-200 rounded-full"></div>
                  <div className="space-y-2">
                    <div className="h-2 w-full bg-gray-100 rounded-full"></div>
                    <div className="h-2 w-full bg-gray-100 rounded-full"></div>
                    <div className="h-2 w-3/4 bg-gray-100 rounded-full"></div>
                  </div>
                  <div className="pt-4 flex gap-2">
                    <div className="h-6 w-12 bg-blue-50 rounded-md"></div>
                    <div className="h-6 w-12 bg-blue-50 rounded-md"></div>
                  </div>
                </div>

                {/* طبقة شفافة تظهر عند الـ Hover مع أيقونة */}
                <div className="absolute inset-0 bg-blue-600/5 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <div className="bg-white text-blue-600 px-6 py-2 rounded-xl font-bold shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-transform">
                        اختيار القالب
                    </div>
                </div>
              </div>

              {/* تفاصيل القالب */}
              <div className="text-center px-4">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-50 text-blue-600 rounded-xl mb-4 text-xl group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* زر الأكشن الرئيسي */}
        <div className="text-center">
          <button className="inline-flex items-center gap-3 bg-gray-900 text-white font-bold py-4 px-10 rounded-2xl hover:bg-blue-600 transition-all shadow-xl hover:shadow-blue-200 active:scale-95">
            <span>استكشف جميع التصاميم</span>
            <FaArrowLeft className="text-sm" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Templates;