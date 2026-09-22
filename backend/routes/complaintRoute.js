const express = require('express');
const router = express.Router();
const { createComplaint, getUserComplaints,getAllComplaintsForAdmin,updateComplaintStatus } = require('../controllers/complaintController');
// const { protect } = require('../middleware/authMiddleware'); // الـ Middleware الخاص بالتحقق من تسجيل الدخول

// مسار إرسال شكوى (يمكنك وضع الـ protect middleware هنا)
router.post('/complaint', createComplaint);

// مسار جلب شكاوى مستخدم معين
router.get('/complaints/:userId', getUserComplaints);

router.get('/admin/complaints', getAllComplaintsForAdmin);

// مسار تحديث حالة الشكوى والرد عليها
router.put('/admin/complaint/:complaintId', updateComplaintStatus);

module.exports = router;