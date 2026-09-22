const Complaint = require('../models/complaint');

// 1. إنشاء / إرسال شكوى جديدة
const createComplaint = async (req, res) => {
  try {
    const { subject, message, category, userId } = req.body;
    // افترض أنك تخزن بيانات المستخدم في req.user (عبر الـ Auth Middleware) أو تأتي من الـ params

    if (!subject || !message) {
      return res.status(400).json({ success: false, message: 'الرجاء إدخال العنوان والمحتوى' });
    }

    const newComplaint = await Complaint.create({
      userId,
      subject,
      message,
      category,
    });

    res.status(201).json({
      success: true,
      message: 'تم إرسال شكواك بنجاح وسيتم الرد عليك قريباً',
      complaint: newComplaint,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'حدث خطأ في الخادم' });
  }
};

// 2. جلب جميع شكاوى المستخدم الحالي
const getUserComplaints = async (req, res) => {
  try {
    const userId = req.user ? req.user._id : req.params.userId;
    
    const complaints = await Complaint.find({ userId }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: complaints.length,
      complaints,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'فشل في جلب الشكاوى' });
  }
};

// 3. جلب جميع الشكاوى للوحة تحكم الأدمن
const getAllComplaintsForAdmin = async (req, res) => {
  try {
    // جلب جميع الشكاوى مع بيانات المستخدم (الاسم والبريد) وترتيبها من الأحدث للأقدم
    const complaints = await Complaint.find({})
      .populate('userId', 'name email')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: complaints.length,
      complaints,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'فشل في جلب قائمة الشكاوى للأدمن' });
  }
};

// 4. تحديث حالة الشكوى والرد عليها من قِبل الأدمن
const updateComplaintStatus = async (req, res) => {
  try {
    const { complaintId } = req.params;
    const { status, adminResponse } = req.body;

    const updatedComplaint = await Complaint.findByIdAndUpdate(
      complaintId,
      { 
        ...(status && { status }), 
        ...(adminResponse !== undefined && { adminResponse }) 
      },
      { new: true, runValidators: true }
    ).populate('userId', 'name email');

    if (!updatedComplaint) {
      return res.status(404).json({ success: false, message: 'الشكوى غير موجودة' });
    }

    res.status(200).json({
      success: true,
      message: 'تم تحديث الشكوى والرد بنجاح',
      complaint: updatedComplaint,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'حدث خطأ أثناء تحديث الشكوى' });
  }
};

module.exports = {
  createComplaint,
  getUserComplaints,
  getAllComplaintsForAdmin,
  updateComplaintStatus,
};