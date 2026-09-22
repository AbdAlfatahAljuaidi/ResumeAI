const mongoose = require('mongoose');

const complaintSchema = new mongoose.Schema(
  {
    // ربط الشكوى بالمستخدم الذي أرسلها
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // تأكد أن اسم الـ Model الخاص بالمستخدم يتطابق مع هذا
      required: true,
    },
    
    // عنوان الشكوى أو موضوعها
    subject: {
      type: String,
      required: [true, 'عنوان الشكوى مطلوب'],
      trim: true,
      maxlength: [100, 'العنوان يجب ألا يتجاوز 100 حرف'],
    },

    // تفاصيل الشكوى أو محتواها
    message: {
      type: String,
      required: [true, 'محتوى الشكوى مطلوب'],
      trim: true,
      maxlength: [1000, 'الرسالة يجب ألا تتجاوز 1000 حرف'],
    },

    // نوع الشكوى أو فئتها (اختياري لتنظيم الدعم الفني)
    category: {
      type: String,
      enum: ['technical', 'billing', 'resume_issue', 'other'],
      default: 'technical',
    },

    // حالة الشكوى (هل تمت معالجتها أم لا)
    status: {
      type: String,
      enum: ['pending', 'in_progress', 'resolved', 'closed'],
      default: 'pending',
    },

    // رد الإدارة أو الدعم الفني على الشكوى (اختياري)
    adminResponse: {
      type: String,
      trim: true,
      default: '',
    },
  },
  {
    timestamps: true, // يضيف تلقائياً حقول createdAt و updatedAt
  }
);

const complaintModel = mongoose.model('Complaint', complaintSchema);

module.exports = complaintModel;