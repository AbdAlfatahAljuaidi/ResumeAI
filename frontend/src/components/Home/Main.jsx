import React from "react";
import { IoStar } from "react-icons/io5";
import { FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router-dom";

const Main = () => {
  return (
    <section className="pt-44 pb-20 px-4  h-screen">
        {/* أشكال خلفية */}
        <div className="absolute top-[-120px] right-[50px] w-96 h-96 bg-blue-400/30 rounded-full blur-3xl"></div>
        <div className="absolute top-[-120px] left-[50px] w-96 h-96 bg-blue-400/30 rounded-full blur-3xl"></div>

      {/* Badge */}
      <div className="flex items-center justify-center mb-6">
        <div className="flex items-center gap-2 bg-blue-50 text-blue-600 px-4 py-2 text-sm rounded-full">
          <IoStar className="text-yellow-300" />
          <span>منشئ السيرة الذاتية الذكي</span>
        </div>
      </div>

      {/* Title */}
      <h1 className="font-extrabold text-center text-3xl sm:text-4xl md:text-5xl leading-tight">
        أنشئ سيرة ذاتية احترافية{" "}
        <span className="text-blue-500 block sm:inline">
          في دقائق
        </span>
      </h1>

      {/* Description */}
      <p className="mt-6 text-base sm:text-lg md:text-xl max-w-2xl mx-auto text-gray-500 text-center leading-relaxed">
        يساعدك منشئ السيرة الذاتية المدعوم بالذكاء الاصطناعي على تصميم السيرة المثالية،
        تميز عن الآخرين واحصل على وظيفة أحلامك باستخدام قوالب مصممة بشكل احترافي.
      </p>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row justify-center items-center mt-12 gap-4">
        <Link to={"/CvBuilder"}>
        <button className="flex items-center gap-2 bg-blue-500 text-white px-7 py-3 rounded-full font-medium hover:bg-blue-600 transition">
          أنشئ سيرتك الذاتية
          <FaArrowLeft />
        </button>
        </Link>
      

        <button className="bg-black text-white px-7 py-3 rounded-full font-medium hover:bg-gray-800 transition">
          عرض القوالب
        </button>
      </div>

      {/* Footer text */}
      <p className="mt-10 text-sm sm:text-base max-w-lg mx-auto text-gray-400 text-center">
        انضم إلى الباحثين عن فرص عمل أفضل
      </p>
    </section>
  );
};

export default Main;


