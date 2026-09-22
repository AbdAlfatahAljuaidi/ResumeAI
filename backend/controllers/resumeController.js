const Resume = require('../models/resume');

exports.deleteResume = async (req, res) => {
try{
const {userID ,resumeId } = req.params;

const resume = await Resume.findOneAndDelete({ _id: resumeId, userId: userID });
return res.status(200).json({error:false,message:"تم حذف السيرة الذاتية بنجاح"})



}catch(error){
    console.log(error)
    return res.status(500).json({error:true,message:"حدث خطأ"})
}
}


exports.updateResume = async (req, res) => {
    try {
      const { userID, resumeTitle } = req.params;
      const { personalInfo, experience, education, skills, resumeTitle: newTitle } = req.body;
  
      // البحث والتحديث باستخدام معرف المستخدم وعنوان السيرة الذاتية القديم
      const updatedResume = await Resume.findOneAndUpdate(
        { userId: userID, resumeTitle: resumeTitle },
        { 
          resumeTitle: newTitle || resumeTitle, 
          personalInfo, 
          experience, 
          education, 
          skills 
        },
        { new: true, runValidators: true }
      );
  
      if (!updatedResume) {
        return res.status(404).json({ error: true, message: "السيرة الذاتية غير موجودة" });
      }
  
      return res.status(200).json({ 
        error: false, 
        message: "تم تحديث السيرة الذاتية بنجاح", 
        resume: updatedResume 
      });
  
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: true, message: "حدث خطأ أثناء التحديث" });
    }
  };