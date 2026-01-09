import React from 'react';
import { Link } from 'react-router-dom';
import { FaArrowLeft, FaRocket } from 'react-icons/fa';

const CallToAction = () => {
  return (
    <section className="py-24 px-6 relative overflow-hidden" dir="rtl">
      {/* دوائر خلفية جمالية */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-50/50 rounded-full blur-[120px] -z-10"></div>
      
      <div className="max-w-5xl mx-auto">
        {/* الحاوية الرئيسية بستايل الـ Premium Card */}
        <div className="relative bg-gradient-to-br from-blue-600 to-indigo-700 rounded-[3rem] p-12 md:p-20 text-center shadow-2xl shadow-blue-200 overflow-hidden">
          
          {/* زخرفة داخلية خفيفة */}
          <div className="absolute top-[-20%] left-[-10%] w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-[-20%] right-[-10%] w-64 h-64 bg-black/10 rounded-full blur-3xl"></div>

          <div className="relative z-10">
            {/* أيقونة صاروخ صغيرة */}
            <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 backdrop-blur-md rounded-2xl mb-8 animate-bounce">
              <FaRocket className="text-white text-3xl transform -scale-x-100" />
            </div>

            {/* العنوان */}
            <h2 className="text-3xl md:text-5xl font-black text-white mb-6 leading-tight">
              جاهز للحصول على <br className="hidden md:block" /> وظيفة أحلامك؟
            </h2>

            {/* الفقرة الوصفية */}
            <p className="text-blue-100 text-lg md:text-xl max-w-2xl mx-auto mb-12 leading-relaxed opacity-90 font-medium">
              انضم إلى آلاف المحترفين الذين وثقوا بذكائنا الاصطناعي لتصميم مستقبلهم المهني. ابدأ الآن مجاناً!
            </p>

            {/* الأزرار */}
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
              <Link to="/CvBuilder" className="w-full sm:w-auto">
                <button className="w-full flex items-center justify-center gap-3 bg-white text-blue-600 px-10 py-4 rounded-2xl font-black text-lg hover:bg-blue-50 transition-all shadow-lg hover:-translate-y-1 active:scale-95">
                  أنشئ سيرتك الذاتية الآن
                  <FaArrowLeft className="text-sm" />
                </button>
              </Link>
              
              <button className="text-white font-bold hover:underline underline-offset-8 transition-all">
                تواصل مع الدعم الفني
              </button>
            </div>
          </div>
        </div>

        {/* نص إضافي بسيط أسفل الكرت */}
        <p className="mt-8 text-gray-400 text-center text-sm font-medium">
          لا يتطلب بطاقة ائتمان • البدء في أقل من دقيقة • متوافق مع ATS
        </p>
      </div>
    </section>
  );
};

export default CallToAction;