import React, { useState } from "react";
import { FaPaperPlane, FaComments } from "react-icons/fa";

const Contact = () => {
  const [message, setMessage] = useState("");

  const handleSend = () => {
    if (message.trim()) {
      alert("تم إرسال رسالتك بنجاح");
      setMessage("");
    }
  };

  return (
    <section className="relative py-32 px-6  overflow-hidden">
      
      {/* خلفيات هادئة */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-blue-300/30 rounded-full blur-3xl animate-pulse-slow"></div>
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-blue-500/30 rounded-full blur-3xl animate-pulse-slow"></div>

      <div className="relative max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-20 items-center">

        {/* قسم النص */}
        <div className="text-right space-y-6 max-w-lg">
          <div className="w-16 h-16 flex items-center justify-center rounded-full bg-blue-100 text-blue-600 text-3xl shadow-md">
            <FaComments />
          </div>

          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight">
            تواصل معنا
          </h2>

          <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
            لأي استفسار، اقتراح، أو ملاحظة، أرسل رسالتك مباشرة من هنا. فريقنا سيرد عليك في أقرب وقت ممكن.
          </p>

          <ul className="text-gray-500 space-y-2 text-sm md:text-base">
            <li>✔ تواصل مباشر وسهل</li>
            <li>✔ رد خلال 24 ساعة</li>
            <li>✔ خصوصية وسرية تامة</li>
          </ul>
        </div>

        {/* الفورم */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-10 flex flex-col gap-6">
          <textarea
            className="border border-gray-300 rounded-2xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none text-gray-800 text-lg transition-all duration-200"
            placeholder="اكتب رسالتك هنا..."
            rows={7}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />

          <button
            onClick={handleSend}
            disabled={!message.trim()}
            className={`font-bold px-6 py-4 rounded-2xl flex items-center justify-center gap-3 transition-all duration-300 shadow-md
              ${message.trim()
                ? "bg-blue-600 hover:bg-blue-700 text-white transform hover:-translate-y-1"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
          >
            إرسال الرسالة
            <FaPaperPlane />
          </button>

          <p className="text-center text-sm text-gray-500 mt-2">
            🔒 رسالتك تُعامل بسرية تامة
          </p>
        </div>

      </div>
    </section>
  );
};

export default Contact;
