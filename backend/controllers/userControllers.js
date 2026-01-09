const express = require("express")
const User = require("../models/user")
const Resume = require("../models/resume")
const jwt = require("jsonwebtoken")
const { GoogleGenAI }= require ("@google/genai");

const ai = new GoogleGenAI(process.env.GEMINI_API_KEY);

exports.SignUp = async (req,res) => {
    try {
        const {name,email,password,checkPassword} = req.body
        if(!name || !email || !password || !checkPassword){
            console.log("كل الحقول مطلوبة");
            return res.status(400).json({error:true,message:"يرجى ادخال جمبع الحقول"})
            
        }

        const checkUser = await User.findOne({email})
        if(checkUser){
          console.log("test");
          
          return res.status(400).json({error:true,message:"البريد الالكتروني مستخدم بالفعل"})
        }

        const user = User.create(req.body)
        return res.status(200).json({error:false, message:"تم انشاء مستخدم بنجاح" })
        
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({error:true, message:"Internl server error"})
    }
}


exports.Login = async (req,res) => {
  try {
    const {email,password} = req.body
    if(!email || !password){
      console.log("كل الحقول مطلوبة");
      return res.status(400).json({error:true,message:"كل الحقول مطلوبة"})
    }
    const user = await User.findOne({email})


    if(!user){
      console.log("المستخدم غير موجود ")
      return res.status(404).json({error:true,message:"المستخدم غير موجود"})
    }

    console.log(" user.passsword", user.password);
    

    if(password != user.password){
      console.log("كلمة السر غير صحيحة");
      return res.status(400).json({error:true,message:"كلمة السر غر صحيحة"})
      
    }

    const token = jwt.sign({
      id:user._id,
    },process.env.JWT_SECRET)

    console.log('token',token);
    

    res.cookie('token',token, {
      httpOnly:true,
      secure:false,
      sameSite:'lax',
      path: "/",
      maxAge: 24 * 60 * 60 * 1000 // 1 يوم مثلاً
    })

    console.log("save");
    

    return res.status(200).json({error:false,message:" مرحيا بك",user })

    }
 

   catch (error) {
    console.log(error);
    return  res.status(500).json({error:true,message:"Internl server error" })
  }
}

exports.addResume = async (req, res) => {
    try {
        const { userId, personalInfo, experience, education , skills,resumeTitle} = req.body;

        console.log("experience",experience)
        if (!userId) {
            return res.status(400).json({ error: 'userId is required' });
          }

        const newResume = await Resume.create({
          resumeTitle,
          userId,
          personalInfo,
          experience,
          education,
          skills
        });
        
  
      res.status(201).json({ message: 'Resume saved successfully', resume: newResume });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to save resume' , message:"حدث خطأ"});
    }
  };


  // جلب سيرة حسب userId و resumeTitle
exports.getResume =  async (req, res) => {
    try {
      const { userID, resumeTitle } = req.params;
      console.log(resumeTitle);
      
  
      // البحث عن السيرة
      const resume = await Resume.findOne({ userId:userID, resumeTitle });
      if (!resume) return res.status(404).json({ error: 'Resume not found' });
  
      res.json({ resume });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to fetch resume' });
    }
  };
  

// جلب السير الذاتية لمستخدم معين
 exports.userResumes = async (req, res) => {
  try {
    const resumes = await Resume.find({ userId: req.params.userId }).sort({ updatedAt: -1 });
    res.json(resumes);
  } catch (err) {
    res.status(500).json({ message: "حدث خطأ أثناء جلب البيانات" });
  }
};


exports.userData = async (req,res) => {
  try {
    console.log("0");
    const token = req.cookies.token
console.log("token222",token);

    if (!token) {
      return res.status(401).json({ error: true, message: "Unauthorized: No token provided" });
    }

   
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    const userID = decoded.id

    const user = await User.findById(userID)
    return res.status(200).json({error:false,user})


    
    
  } catch (error) {
    console.log(error);
    return res.status(500).json({error:true,message:"Internl server error"})
    
  }
}

exports.logout = async  (req,res) => {
  try{
    console.log("5555555555");
    
    console.log("الكوكيز قبل الحذف:", req.cookies);
res.clearCookie("token",{
  httpOnly:true,
  secure:false,
  sameSite:'lax',
  path: "/", 
})

console.log("logout");

return res.status(200).json({error:false})
  }catch(error){
    console.log(error);
    return res.status(500).json({error:true, message:"internal server error"})
  }

}



//google ai studio
exports.AI = async (req,res)=>{
  try{

const {summary} = req.body



      const response = await ai.models.generateContent({
          model: "gemini-2.5-flash",
          contents: `     

بدي تحسن الملخص المكتوب ما بدي تقولي ايش اعمل انت اعملي اياه جاهز و اعطيني اياه ${summary}
عشان انا  اضيفه بشكل مباشر للسيرة الذاتية
ما تعطيني نقاط عشان احسن النص انت حسن لحالك و ابعتلي التحسين تبعك 
و ما تكتبلي حسنا و بالتوفيق فقط اكتب التحسين تبعك
وما تقولي تفضل هاد الملخص`,
        });
        console.log(response.text);
        res.status(200).json({error:false,text:response.text})
  }catch(error){
      console.log(error);
      res.status(500).json({error:true})
  }

}
