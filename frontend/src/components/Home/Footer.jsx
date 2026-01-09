import React from "react";
import { FaBrain, FaEnvelope, FaFileAlt, FaHome, FaShieldAlt, FaLinkedin, FaTwitter, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-white pt-20 pb-10 border-t border-gray-100 relative overflow-hidden" dir="rtl">
      {/* لمسة خلفية ناعمة */}
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-50/50 rounded-full blur-[100px] -z-10"></div>

      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          
          {/* قسم العلامة التجارية - مساحة أكبر */}
          <div className="md:col-span-2 space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 flex items-center justify-center rounded-2xl bg-blue-600 text-white text-2xl shadow-lg shadow-blue-200">
                <FaBrain />
              </div>
              <span className="text-2xl font-black text-gray-900 tracking-tight">سيرتي الذكية</span>
            </div>
            <p className="text-gray-500 text-base leading-relaxed max-w-sm font-medium">
              المنصة العربية الأولى المتكاملة لإنشاء سير ذاتية احترافية مدعومة بالذكاء الاصطناعي، صُممت لتنقل مسيرتك المهنية إلى المستوى التالي.
            </p>
            {/* أيقونات التواصل الاجتماعي */}
            <div className="flex gap-4 pt-2">
              <SocialIcon icon={<FaLinkedin />} />
              <SocialIcon icon={<FaTwitter />} />
              <SocialIcon icon={<FaInstagram />} />
            </div>
          </div>

          {/* روابط سريعة - تنظيم عمودي نظيف */}
          <div>
            <h3 className="font-bold text-gray-900 text-lg mb-6 relative inline-block">
              روابط سريعة
              <span className="absolute bottom-[-8px] right-0 w-8 h-1 bg-blue-600 rounded-full"></span>
            </h3>
            <ul className="space-y-4">
              <FooterLink icon={<FaHome />} label="الرئيسية" />
              <FooterLink icon={<FaFileAlt />} label="إنشاء سيرة ذاتية" />
              <FooterLink icon={<FaEnvelope />} label="تواصل معنا" />
              <FooterLink icon={<FaShieldAlt />} label="سياسة الخصوصية" />
            </ul>
          </div>

          {/* قسم المميزات / معلومات */}
          <div>
            <h3 className="font-bold text-gray-900 text-lg mb-6 relative inline-block">
              لماذا نحن؟
              <span className="absolute bottom-[-8px] right-0 w-8 h-1 bg-blue-600 rounded-full"></span>
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-2 text-gray-500 text-sm font-medium leading-tight">
                <span className="text-blue-600">✦</span>
                قوالب متوافقة مع أنظمة الـ ATS
              </li>
              <li className="flex items-start gap-2 text-gray-500 text-sm font-medium leading-tight">
                <span className="text-blue-600">✦</span>
                تصدير PDF بجودة طباعة عالية
              </li>
              <li className="flex items-start gap-2 text-gray-500 text-sm font-medium leading-tight">
                <span className="text-blue-600">✦</span>
                دعم كامل للغة العربية والانجليزية
              </li>
            </ul>
          </div>
        </div>

        {/* الخط الفاصل السفلي */}
        <div className="border-t border-gray-100 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-400 text-sm font-medium">
            &copy; 2025 سيرتي الذكية – جميع الحقوق محفوظة. صنع بكل ❤️ للمحترفين العرب.
          </p>
          <div className="flex gap-6 text-sm text-gray-400 font-medium">
            <button className="hover:text-blue-600 transition-colors">الشروط والأحكام</button>
            <button className="hover:text-blue-600 transition-colors">ملفات تعريف الارتباط</button>
          </div>
        </div>
      </div>
    </footer>
  );
};

// مكونات فرعية لتنظيف الكود
const FooterLink = ({ icon, label }) => (
  <li className="flex items-center gap-3 text-gray-500 hover:text-blue-600 cursor-pointer transition-all duration-300 group">
    <span className="text-gray-300 group-hover:text-blue-600 transition-colors">{icon}</span>
    <span className="font-medium text-[15px]">{label}</span>
  </li>
);

const SocialIcon = ({ icon }) => (
  <button className="w-10 h-10 flex items-center justify-center rounded-xl bg-gray-50 text-gray-400 hover:bg-blue-600 hover:text-white hover:-translate-y-1 transition-all duration-300 shadow-sm">
    {icon}
  </button>
);

export default Footer;