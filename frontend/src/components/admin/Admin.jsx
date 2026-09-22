import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { FaSpinner, FaExclamationTriangle, FaCheckCircle, FaClock, FaCommentDots, FaFilter, FaPaperPlane, FaUser, FaEnvelope } from 'react-icons/fa';

const apiUrl = import.meta.env.VITE_REACT_APP_BACKEND_BASEURL;

const AdminComplaints = () => {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('all');
  
  // تتبع حقول الرد لكل شكوى أثناء الكتابة
  const [adminResponses, setAdminResponses] = useState({});
  // تتبع الحالة المختارة للتحديث لكل شكوى
  const [selectedStatuses, setSelectedStatuses] = useState({});
  const [updatingId, setUpdatingId] = useState(null);

  // جلب جميع الشكاوى (للأدمن)
  const fetchAllComplaints = async () => {
    try {
      const { data } = await axios.get(`${apiUrl}/admin/complaints`, { withCredentials: true });
      if (data.success) {
        setComplaints(data.complaints);
        
        // تعيئة القيم الأولية للـ Select والحقول
        const initialResponses = {};
        const initialStatuses = {};
        data.complaints.forEach(item => {
          initialResponses[item._id] = item.adminResponse || '';
          initialStatuses[item._id] = item.status;
        });
        setAdminResponses(initialResponses);
        setSelectedStatuses(initialStatuses);
      }
    } catch (error) {
      console.error("Error fetching admin complaints:", error);
      toast.error("فشل في تحميل قائمة الشكاوى");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllComplaints();
  }, []);

  // تحديث الشكوى (الحالة أو الرد)
  const handleUpdate = async (complaintId) => {
    const newStatus = selectedStatuses[complaintId];
    const newResponse = adminResponses[complaintId];

    setUpdatingId(complaintId);
    try {
      const { data } = await axios.put(
        `${apiUrl}/admin/complaint/${complaintId}`,
        { status: newStatus, adminResponse: newResponse },
        { withCredentials: true }
      );

      if (data.success) {
        toast.success(data.message || "تم تحديث الشكوى بنجاح");
        // تحديث القائمة محلياً
        setComplaints(prev => 
          prev.map(item => item._id === complaintId ? data.complaint : item)
        );
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "فشل تحديث الشكوى");
    } finally {
      setUpdatingId(null);
    }
  };

  // فلترة الشكاوى حسب الحالة
  const filteredComplaints = complaints.filter((item) => {
    if (statusFilter === 'all') return true;
    return item.status === statusFilter;
  });

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
    <div className="max-w-6xl mx-auto p-6 md:p-12 font-sans" dir="rtl">
      
      {/* الهيدر */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
            <FaCommentDots className="text-blue-600" /> لوحة تحكم الشكاوى والدعم الفني
          </h1>
          <p className="text-gray-500 text-sm mt-1">متابعة شكاوى المستخدمين، الرد عليها، وتغيير حالتها.</p>
        </div>

        {/* أزرار الفلترة */}
        <div className="flex items-center gap-1 bg-gray-100 p-1.5 rounded-xl text-xs font-semibold overflow-x-auto">
          <span className="text-gray-400 px-2 flex items-center gap-1"><FaFilter /> فلترة:</span>
          <button 
            onClick={() => setStatusFilter('all')}
            className={`px-3 py-1.5 rounded-lg transition-colors ${statusFilter === 'all' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-600 hover:text-gray-900'}`}
          >
            الكل ({complaints.length})
          </button>
          <button 
            onClick={() => setStatusFilter('pending')}
            className={`px-3 py-1.5 rounded-lg transition-colors ${statusFilter === 'pending' ? 'bg-white text-yellow-600 shadow-sm' : 'text-gray-600 hover:text-gray-900'}`}
          >
            انتظار
          </button>
          <button 
            onClick={() => setStatusFilter('in_progress')}
            className={`px-3 py-1.5 rounded-lg transition-colors ${statusFilter === 'in_progress' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-600 hover:text-gray-900'}`}
          >
            معالجة
          </button>
          <button 
            onClick={() => setStatusFilter('resolved')}
            className={`px-3 py-1.5 rounded-lg transition-colors ${statusFilter === 'resolved' ? 'bg-white text-green-600 shadow-sm' : 'text-gray-600 hover:text-gray-900'}`}
          >
            تمت الإجابة
          </button>
        </div>
      </div>

      {/* المحتوى */}
      {loading ? (
        <div className="flex justify-center items-center py-32 bg-white border border-gray-200 rounded-3xl">
          <FaSpinner className="animate-spin text-3xl text-blue-600" />
        </div>
      ) : filteredComplaints.length > 0 ? (
        <div className="space-y-6">
          {filteredComplaints.map((item) => (
            <div key={item._id} className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm space-y-4">
              
              {/* معلومات المستخدم وعنوان الشكوى */}
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-2 pb-4 border-b border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center font-bold">
                    <FaUser />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">{item.userId?.name || "مستخدم مجهول"}</h3>
                    <p className="text-gray-400 text-xs flex items-center gap-1">
                      <FaEnvelope /> {item.userId?.email || "لا يوجد بريد"}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[11px] bg-gray-100 text-gray-600 px-2.5 py-1 rounded-md font-medium">
                    {item.category === 'technical' ? 'مشكلة تقنية' : item.category === 'resume_issue' ? 'مشكلة سيرة ذاتية' : item.category === 'billing' ? 'الاشتراكات' : 'أخرى'}
                  </span>
                  {getStatusBadge(item.status)}
                </div>
              </div>

              {/* تفاصيل الشكوى */}
              <div>
                <h4 className="font-bold text-base text-gray-900 mb-1">{item.subject}</h4>
                <p className="text-gray-600 text-sm leading-relaxed bg-gray-50 p-4 rounded-xl border border-gray-100">
                  {item.message}
                </p>
              </div>

              {/* قسم الرد وتغيير الحالة للأدمن */}
              <div className="bg-blue-50/50 border border-blue-100 rounded-xl p-4 space-y-3">
                <h5 className="font-bold text-xs text-blue-900">إدارة الشكوى والرد عليها:</h5>
                
                <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                  {/* صندوق كتابة الرد */}
                  <textarea
                    rows="2"
                    placeholder="اكتب رد الإدارة هنا..."
                    value={adminResponses[item._id] || ''}
                    onChange={(e) => setAdminResponses({ ...adminResponses, [item._id]: e.target.value })}
                    className="md:col-span-3 bg-white border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                  ></textarea>

                  {/* اختيار الحالة وحفظ التغييرات */}
                  <div className="flex flex-col gap-2">
                    <select
                      value={selectedStatuses[item._id] || 'pending'}
                      onChange={(e) => setSelectedStatuses({ ...selectedStatuses, [item._id]: e.target.value })}
                      className="bg-white border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="pending">قيد الانتظار</option>
                      <option value="in_progress">جاري المعالجة</option>
                      <option value="resolved">تمت الإجابة</option>
                      <option value="closed">مغلقة</option>
                    </select>

                    <button
                      onClick={() => handleUpdate(item._id)}
                      disabled={updatingId === item._id}
                      className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-xl transition-colors flex items-center justify-center gap-1.5 text-xs shadow-sm disabled:opacity-50"
                    >
                      {updatingId === item._id ? <FaSpinner className="animate-spin" /> : <FaPaperPlane />}
                      <span>حفظ التعديل</span>
                    </button>
                  </div>
                </div>
              </div>

              <div className="text-right text-gray-400 text-[11px] pt-1">
                تاريخ الإرسال: {new Date(item.createdAt).toLocaleString('ar-EG')}
              </div>

            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-white border border-gray-200 rounded-3xl">
          <FaExclamationTriangle className="mx-auto text-4xl text-gray-300 mb-2" />
          <h3 className="font-bold text-gray-700">لا توجد شكاوى مطابقة</h3>
          <p className="text-gray-400 text-xs mt-1">لا توجد أي شكاوى مسجلة حالياً بالحالة المحددة.</p>
        </div>
      )}

    </div>
  );
};

export default AdminComplaints;