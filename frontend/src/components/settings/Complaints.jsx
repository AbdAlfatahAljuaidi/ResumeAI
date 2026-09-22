import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { FaPaperPlane, FaSpinner, FaExclamationTriangle, FaCheckCircle, FaClock, FaCommentDots, FaFilter, FaChevronRight, FaChevronLeft } from 'react-icons/fa';
import { useParams } from 'react-router-dom';

const apiUrl = import.meta.env.VITE_REACT_APP_BACKEND_BASEURL;

const Complaints = ({ page, setPage }) => {
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [category, setCategory] = useState('technical');
  const [submitting, setSubmitting] = useState(false);
  
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);

  // حالات جديدة للفلترة والـ Pagination
  const [statusFilter, setStatusFilter] = useState('all'); // 'all', 'pending', 'in_progress', 'resolved'
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 2; // عدد الشكاوى في كل صفحة (يمكنك تعديلها)

  const params = useParams();
  const userId = params.id;

  // جلب شكاوى المستخدم السابقة عند تحميل الصفحة
  const fetchComplaints = async () => {
    try {
      const { data } = await axios.get(`${apiUrl}/complaints/${userId}`, { withCredentials: true });
      if (data.success) {
        setComplaints(data.complaints);
      }
    } catch (error) {
      console.error("Error fetching complaints:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userId) {
      fetchComplaints();
    } else {
      setLoading(false);
    }
  }, [userId]);

  // إرسال شكوى جديدة
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!subject.trim() || !message.trim()) {
      return toast.error("الرجاء إدخال عنوان ومحتوى الشكوى");
    }

    setSubmitting(true);
    try {
      const { data } = await axios.post(
        `${apiUrl}/complaint`,
        { subject, message, category, userId },
        { withCredentials: true }
      );

      if (data.success) {
        toast.success(data.message || "تم إرسال شكواك بنجاح");
        setSubject('');
        setMessage('');
        setCategory('technical');
        fetchComplaints(); // تحديث القائمة فوراً
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "فشل إرسال الشكوى، حاول مرة أخرى");
    } finally {
      setSubmitting(false);
    }
  };

  // 1. تصفية الشكاوى بناءً على الحالة المحددة
  const filteredComplaints = complaints.filter((item) => {
    if (statusFilter === 'all') return true;
    return item.status === statusFilter;
  });

  // 2. حساب عناصر الصفحة الحالية (Pagination)
  const totalPages = Math.ceil(filteredComplaints.length / itemsPerPage) || 1;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentComplaints = filteredComplaints.slice(indexOfFirstItem, indexOfLastItem);

  // إعادة تعيين الصفحة الأولى عند تغيير الفلتر
  const handleFilterChange = (status) => {
    setStatusFilter(status);
    setCurrentPage(1);
  };

  // ترجمة حالات الشكوى لعرضها بشكل جميل
  const getStatusBadge = (status) => {
    switch (status) {
      case 'pending':
        return <span className="bg-yellow-100 text-yellow-700 px-2.5 py-1 rounded-full text-xs font-bold flex items-center gap-1"><FaClock /> قيد الانتظار</span>;
      case 'in_progress':
        return <span className="bg-blue-100 text-blue-700 px-2.5 py-1 rounded-full text-xs font-bold flex items-center gap-1"><FaSpinner className="animate-spin" /> جاري المعالجة</span>;
      case 'resolved':
        return <span className="bg-green-100 text-green-700 px-2.5 py-1 rounded-full text-xs font-bold flex items-center gap-1"><FaCheckCircle /> تمت الإجابة</span>;
      default:
        return <span className="bg-gray-100 text-gray-700 px-2.5 py-1 rounded-full text-xs font-bold">مغلقة</span>;
    }
  };

  return (
    <div className="w-full mx-auto p-6 font-sans" dir="rtl">
      
      {/* عنوان الصفحة */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
          <FaCommentDots className="text-blue-600" /> الشكاوى والدعم الفني
        </h1>
        <p className="text-gray-500 text-sm mt-1">واجهتك مشكلة تقنية أو استفسار؟ أرسل شكواك وسيقوم فريقنا بمتابعتها فوراً.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* نموذج إرسال شكوى جديدة */}
        <div className="md:col-span-1 bg-white border border-gray-200 rounded-2xl p-6 shadow-sm h-fit">
          <h2 className="text-lg font-bold text-gray-800 mb-4 pb-2 border-b border-gray-100">إرسال شكوى جديدة</h2>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">نوع الشكوى</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="technical">مشكلة تقنية</option>
                <option value="resume_issue">مشكلة في السيرة الذاتية</option>
                <option value="billing">الاشتراكات والمدفوعات</option>
                <option value="other">أخرى</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">عنوان الشكوى</label>
              <input
                type="text"
                placeholder="مثال: خطأ في تحميل الـ CV"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">تفاصيل المشكلة</label>
              <textarea
                rows="4"
                placeholder="اشرح المشكلة بالتفصيل..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                required
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 rounded-xl transition-colors flex items-center justify-center gap-2 text-sm shadow-md shadow-blue-600/20 disabled:opacity-50"
            >
              {submitting ? <FaSpinner className="animate-spin" /> : <FaPaperPlane />}
              <span>{submitting ? 'جاري الإرسال...' : 'إرسال الشكوى'}</span>
            </button>
          </form>
        </div>

        {/* عرض الشكاوى السابقة مع الفلترة والصفحات */}
        <div className="md:col-span-2 space-y-4">
          
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
            <h2 className="text-lg font-bold text-gray-800">سجل شكاويك السابقة</h2>
            
            {/* أزرار الفلترة حسب الحالة */}
            <div className="flex items-center gap-1.5 bg-gray-100 p-1 rounded-xl text-xs font-semibold overflow-x-auto max-w-full">
              <span className="text-gray-400 px-2 flex items-center gap-1"><FaFilter /> تصفية:</span>
              <button 
                onClick={() => handleFilterChange('all')}
                className={`px-3 py-1.5 rounded-lg transition-colors ${statusFilter === 'all' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-600 hover:text-gray-900'}`}
              >
                الكل
              </button>
              <button 
                onClick={() => handleFilterChange('pending')}
                className={`px-3 py-1.5 rounded-lg transition-colors ${statusFilter === 'pending' ? 'bg-white text-yellow-600 shadow-sm' : 'text-gray-600 hover:text-gray-900'}`}
              >
                انتظار
              </button>
              <button 
                onClick={() => handleFilterChange('in_progress')}
                className={`px-3 py-1.5 rounded-lg transition-colors ${statusFilter === 'in_progress' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-600 hover:text-gray-900'}`}
              >
                معالجة
              </button>
              <button 
                onClick={() => handleFilterChange('resolved')}
                className={`px-3 py-1.5 rounded-lg transition-colors ${statusFilter === 'resolved' ? 'bg-white text-green-600 shadow-sm' : 'text-gray-600 hover:text-gray-900'}`}
              >
                تمت الإجابة
              </button>
            </div>
          </div>

          {loading ? (
            <div className="flex justify-center items-center py-20 bg-white border border-gray-200 rounded-2xl">
              <FaSpinner className="animate-spin text-2xl text-blue-600" />
            </div>
          ) : currentComplaints.length > 0 ? (
            <div className="space-y-4">
              {currentComplaints.map((item) => (
                <div key={item._id} className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm space-y-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="text-[11px] bg-gray-100 text-gray-600 px-2 py-0.5 rounded font-medium">
                        {item.category === 'technical' ? 'مشكلة تقنية' : item.category === 'resume_issue' ? 'مشكلة سيرة ذاتية' : item.category === 'billing' ? 'الاشتراكات' : 'أخرى'}
                      </span>
                      <h3 className="font-bold text-base text-gray-900 mt-1">{item.subject}</h3>
                    </div>
                    {getStatusBadge(item.status)}
                  </div>

                  <p className="text-gray-600 text-sm leading-relaxed bg-gray-50 p-3 rounded-xl border border-gray-100">
                    {item.message}
                  </p>

                  {/* رد الأدمن إن وجد */}
                  {item.adminResponse && (
                    <div className="bg-blue-50 border-r-4 border-blue-600 p-3 rounded-lg text-xs text-blue-900 space-y-1">
                      <span className="font-bold block">رد الإدارة:</span>
                      <p>{item.adminResponse}</p>
                    </div>
                  )}

                  <div className="text-right text-gray-400 text-[11px] pt-2 border-t border-gray-100">
                    تاريخ الإرسال: {new Date(item.createdAt).toLocaleDateString('ar-EG')}
                  </div>
                </div>
              ))}

              {/* أزرار التنقل بين الصفحات (Pagination Controls) */}
              {totalPages > 1 && (
                <div className="flex justify-center items-center gap-2 pt-4">
                  <button
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="p-2 bg-white border border-gray-200 rounded-xl text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                    title="الصفحة السابقة"
                  >
                    <FaChevronRight className="text-xs" />
                  </button>

                  <span className="text-xs font-bold text-gray-600 px-3">
                    صفحة {currentPage} من {totalPages}
                  </span>

                  <button
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="p-2 bg-white border border-gray-200 rounded-xl text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                    title="الصفحة التالية"
                  >
                    <FaChevronLeft className="text-xs" />
                  </button>
                </div>
              )}

            </div>
          ) : (
            <div className="text-center py-16 bg-white border border-gray-200 rounded-2xl">
              <FaExclamationTriangle className="mx-auto text-4xl text-gray-300 mb-2" />
              <h3 className="font-bold text-gray-700">لا توجد شكاوى مطابقة</h3>
              <p className="text-gray-400 text-xs mt-1">لا توجد أي شكاوى بالحالة المحددة حالياً.</p>
            </div>
          )}
        </div>

      </div>

    </div>
  );
};

export default Complaints;