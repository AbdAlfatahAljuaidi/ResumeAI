import React, { useEffect, useState } from 'react';
import { CgProfile } from "react-icons/cg";
import { FaUser, FaEnvelope, FaPhone,FaMagic,FaRobot, FaMapMarkerAlt, FaGlobe, FaLinkedin, FaPen, FaGraduationCap, FaBriefcase, FaTools, FaPlus, FaCalendarAlt, FaUniversity, FaAward } from "react-icons/fa";

import { FcViewDetails } from "react-icons/fc";
import axios from 'axios'
import {useNavigate} from 'react-router-dom'

import{toast} from 'react-toastify'



const apiUrl = import.meta.env.VITE_REACT_APP_BACKEND_BASEURL;
const Create = () => {
  const [user,setUser] = useState({})
  const [wait, setWait] = useState(false)
  const [waitJob, setWaitJob] = useState(false)


  const navigate = useNavigate()

  // --- Personal Info ---
  const [personalInfo, setPersonalInfo] = useState({ name: '', email: '', phoneNumber: '', address: '', website: '', linkedin: '', summary: '' });

  // --- Experience ---
  const [experience, setExperience] = useState([]);
  const [currentExp, setCurrentExp] = useState({ jobName: '', companyName: '', companyAddress: '', startDate: '', endDate: '', stillWorking: false, description: '' });

  // --- Education ---
  const [education, setEducation] = useState([]);
  const [currentEdu, setCurrentEdu] = useState({ faculty: '', universityName: '', address: '', grade: '', startDate: '', endDate: '' });

  // --- Skills ---
  const [skills, setSkills] = useState([]);
  const [currentSkill, setCurrentSkill] = useState({ name: '', type: '', level: '' });

  // Handlers
  const handleAddExperience = () => { setExperience([...experience, currentExp]); setCurrentExp({ jobName: '', companyName: '', companyAddress: '', startDate: '', endDate: '', stillWorking: false, description: '' }); };
  const handleAddEducation = () => { setEducation([...education, currentEdu]); setCurrentEdu({ faculty: '', universityName: '', address: '', grade: '', startDate: '', endDate: '' }); };
  const handleAddSkill = () => { setSkills([...skills, currentSkill]); setCurrentSkill({ name: '', type: '', level: '' }); };


const [resumeTitle,setResumeTitle] = useState("")



useEffect(() => {
  const userData = async () => {
    try {
      const {data} = await axios.get(`${apiUrl}/userData`,{withCredentials:true})
  setUser(data.user)
  console.log(user)
  
      
    } catch (error) {
      console.log(error);
      
    }
  }

  userData()

},[])


const imporveSummary = async () => {
  try {
    setWait(true)
    const {data} = await axios.post(`${apiUrl}/AI`,{
      summary:  personalInfo.summary
    },{withCredentials:true}) 

    if(data.error==false){
      console.log("تم التحسين sadsda");

      setPersonalInfo(prev => ({
        ...prev,
        summary: data.text
      }));
      

      

    }
    setWait(false)
  } catch (error) {
    console.log(error);
    setWait(false)
  }
}


const imporoveJob= async () => {
  try {
    setWaitJob(true)
    const {data} = await axios.post(`${apiUrl}/AI`,{
      summary:  currentExp.description
    },{withCredentials:true}) 

    if(data.error==false){
      console.log("تم التحسين sadsda");

      setCurrentExp(prev => ({
        ...prev,
        description: data.text
       
      }));
      

      

    }
    setWaitJob(false)
  } catch (error) {
    console.log(error);
    setWaitJob(false)
  }
}





  const handleSubmit = async () => {
    // Ensure we don't lose the currently typed info that hasn't been "Added" yet
    const finalExperience = [...experience];
    if (currentExp.jobName) finalExperience.push(currentExp);
  
    const finalEducation = [...education];
    if (currentEdu.faculty) finalEducation.push(currentEdu);
  
    const finalSkills = [...skills];
    if (currentSkill.name) finalSkills.push(currentSkill);
  
    const resumeData = {
      userId: user._id, // Replace with actual logged-in user ID
      resumeTitle: resumeTitle, 
      personalInfo,
      experience: finalExperience,
      education: finalEducation,
      skills: finalSkills
    };
  
    try {
      const res = await axios.post(`${apiUrl}/api/resume`, resumeData,{withCredentials:true});
      toast.success(res.data.message)
      navigate(`/Dashboard/${user._id}`)
    } catch (err) {
      console.error(err);
      toast.error(err.response.data.message)
    }
  };

  // Add this helper function
const removeItem = (index, type) => {
  if (type === 'exp') setExperience(experience.filter((_, i) => i !== index));
  if (type === 'edu') setEducation(education.filter((_, i) => i !== index));
  if (type === 'skill') setSkills(skills.filter((_, i) => i !== index));
};

// Update your mapping (Example for Experience)
{experience.map((exp, idx) => (
  <div key={idx} className='flex justify-between items-center p-4 border border-gray-200 rounded-xl bg-gray-50 mb-2'>
    <span>{exp.jobName} في {exp.companyName}</span>
    <button onClick={() => removeItem(idx, 'exp')} className="text-red-500 hover:text-red-700">حذف</button>
  </div>
))}

  return (
    <div className='mt-32 px-4 md:px-10 max-w-6xl mx-auto mb-20' dir='rtl'>

      {/* Header and Personal Info Section here */}
      <section className='mt-12 text-right'>

<section>
  
<div className='flex items-center gap-3 mb-8 text-2xl font-bold text-gray-800 border-b-2 border-blue-600 pb-2 w-fit'>
<FcViewDetails className='text-blue-600 text-3xl' />
<h1>المعلومات السيرة الذاتية</h1>
</div>
  <input type='text' placeholder=' اسم السيرة الذاتية' value={resumeTitle} onChange={e=>setResumeTitle(e.target.value)} className='border-2 border-gray-100 rounded-xl px-4 py-2 focus:border-blue-500 w-full' />

</section>


<div className='flex items-center gap-3 my-8 text-2xl font-bold text-gray-800 border-b-2 border-blue-600 pb-2 w-fit'>
<CgProfile className='text-blue-600 text-3xl'/>
<h1>المعلومات الشخصية</h1>
</div>
<div className='p-8 space-y-6 bg-white rounded-2xl shadow-sm border border-gray-100'>
<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
<input type='text' placeholder='الاسم الكامل' value={personalInfo.name} onChange={e=>setPersonalInfo({...personalInfo, name:e.target.value})} className='border-2 border-gray-100 rounded-xl px-4 py-2 focus:border-blue-500 w-full' />
<input type='email' placeholder='البريد الإلكتروني' value={personalInfo.email} onChange={e=>setPersonalInfo({...personalInfo, email:e.target.value})} className='border-2 border-gray-100 rounded-xl px-4 py-2 focus:border-blue-500 w-full' />
<input type='text' placeholder='رقم الهاتف' value={personalInfo.phoneNumber} onChange={e=>setPersonalInfo({...personalInfo, phoneNumber:e.target.value})} className='border-2 border-gray-100 rounded-xl px-4 py-2 focus:border-blue-500 w-full' />
<input type='text' placeholder='العنوان' value={personalInfo.address} onChange={e=>setPersonalInfo({...personalInfo, address:e.target.value})} className='border-2 border-gray-100 rounded-xl px-4 py-2 focus:border-blue-500 w-full' />
<input type='text' placeholder='رابط الموقع' value={personalInfo.website} onChange={e=>setPersonalInfo({...personalInfo, website:e.target.value})} className='border-2 border-gray-100 rounded-xl px-4 py-2 focus:border-blue-500 w-full' />
<input type='text' placeholder='لينكد إن' value={personalInfo.linkedin} onChange={e=>setPersonalInfo({...personalInfo, linkedin:e.target.value})} className='border-2 border-gray-100 rounded-xl px-4 py-2 focus:border-blue-500 w-full' />
</div>
<button
onClick={()=>imporveSummary()}
className="
  relative flex items-center gap-2
  px-6 py-3
  rounded-xl
  text-white font-semibold
  bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-400
  shadow-lg shadow-blue-500/40
  hover:shadow-cyan-400/60
  hover:scale-105
  transition-all duration-300
  overflow-hidden
">
  {/* تأثير الموجة */}
  <span className="
    absolute inset-0
    bg-gradient-to-r from-transparent via-white/20 to-transparent
    translate-x-[-100%]
    hover:translate-x-[100%]
    transition-transform duration-700
  "></span>

  <FaRobot className="relative text-lg animate-pulse" />
  <span className="relative">
{wait ?   "يتم التحميل" :  "تحسين بالذكاء الاصطناعي" }



  </span>
</button>
<textarea placeholder='ملخص عنك' rows={3} value={personalInfo.summary} onChange={e=>setPersonalInfo({...personalInfo, summary:e.target.value})} className='w-full border-2 border-gray-100 rounded-xl px-4 py-2 focus:border-blue-500 resize-none'></textarea>


{/* Display Personal Info */}
<div className='mt-4 p-4 border border-gray-200 rounded-xl bg-gray-50'>
<p>الاسم: {personalInfo.name}</p>
<p>البريد الإلكتروني: {personalInfo.email}</p>
<p>الهاتف: {personalInfo.phoneNumber}</p>
<p>العنوان: {personalInfo.address}</p>
<p>الموقع: {personalInfo.website}</p>
<p>لينكد إن: {personalInfo.linkedin}</p>
<p>ملخص: {personalInfo.summary}</p>
</div>
</div>
</section>

      {/* Experience Section */}
      <section className='mt-12 text-right'>
        <div className='flex items-center gap-3 mb-8 text-2xl font-bold text-gray-800 border-b-2 border-blue-600 pb-2 w-fit'>
          <FaBriefcase className='text-blue-600 text-3xl' />
          <h1>الخبرة العملية</h1>
        </div>
        <div className='p-8 space-y-6 bg-white rounded-2xl shadow-sm border border-gray-100'>
          {/* Form Inputs */}
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <input type='text' placeholder='المسمى الوظيفي' value={currentExp.jobName} onChange={e=>setCurrentExp({...currentExp, jobName:e.target.value})} className='border-2 border-gray-100 rounded-xl px-4 py-2 focus:border-blue-500 w-full' />
            <input type='text' placeholder='اسم الشركة' value={currentExp.companyName} onChange={e=>setCurrentExp({...currentExp, companyName:e.target.value})} className='border-2 border-gray-100 rounded-xl px-4 py-2 focus:border-blue-500 w-full' />
            <input type='text' placeholder='موقع الشركة' value={currentExp.companyAddress} onChange={e=>setCurrentExp({...currentExp, companyAddress:e.target.value})} className='border-2 border-gray-100 rounded-xl px-4 py-2 focus:border-blue-500 w-full' />
            <input type='date' placeholder='تاريخ البدء' value={currentExp.startDate} onChange={e=>setCurrentExp({...currentExp, startDate:e.target.value})} className='border-2 border-gray-100 rounded-xl px-4 py-2 focus:border-blue-500 w-full' />
            <input type='text' placeholder='تاريخ الانتهاء' value={currentExp.endDate} onChange={e=>setCurrentExp({...currentExp, endDate:e.target.value})} className='border-2 border-gray-100 rounded-xl px-4 py-2 focus:border-blue-500 w-full' />
            <div className='flex items-center gap-2'>
              <input type='checkbox' checked={currentExp.stillWorking} onChange={e=>setCurrentExp({...currentExp, stillWorking:e.target.checked})} className='w-4 h-4 accent-blue-600' />
              <label>أعمل هنا حالياً</label>
            </div>
          </div>






          
<button
onClick={()=> imporoveJob()}
className="
  relative flex items-center gap-2
  px-6 py-3
  rounded-xl
  text-white font-semibold
  bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-400
  shadow-lg shadow-blue-500/40
  hover:shadow-cyan-400/60
  hover:scale-105
  transition-all duration-300
  overflow-hidden
">
  {/* تأثير الموجة */}
  <span className="
    absolute inset-0
    bg-gradient-to-r from-transparent via-white/20 to-transparent
    translate-x-[-100%]
    hover:translate-x-[100%]
    transition-transform duration-700
  "></span>

  <FaRobot className="relative text-lg animate-pulse" />
  <span className="relative">
{waitJob ?   "يتم التحميل" :  "تحسين بالذكاء الاصطناعي" }



  </span>
</button>
          <textarea  placeholder='شرح المهام والمسؤوليات' rows={4} value={currentExp.description} onChange={e=>setCurrentExp({...currentExp, description:e.target.value})} className='w-full border-2 border-gray-100 rounded-xl px-4 py-2 focus:border-blue-500 resize-none'></textarea>
          <button onClick={handleAddExperience} className='flex items-center gap-2 text-blue-600 font-bold border-2 border-blue-50 px-4 py-2 rounded-xl hover:bg-blue-50 transition-all'><FaPlus /> إضافة خبرة أخرى</button>
          {/* Display Added Experiences */}
          {experience.map((exp, idx)=>(<div key={idx} className='p-4 border border-gray-200 rounded-xl bg-gray-50'>{exp.jobName} في {exp.companyName}</div>))}
        </div>
      </section>

      {/* Education Section */}
      <section className='mt-12 text-right'>
        <div className='flex items-center gap-3 mb-8 text-2xl font-bold text-gray-800 border-b-2 border-blue-600 pb-2 w-fit'>
          <FaGraduationCap className='text-blue-600 text-3xl' />
          <h1>التعليم</h1>
        </div>
        <div className='p-8 space-y-6 bg-white rounded-2xl shadow-sm border border-gray-100'>
          <input type='text' placeholder='الشهادة / التخصص' value={currentEdu.faculty} onChange={e=>setCurrentEdu({...currentEdu, faculty:e.target.value})} className='border-2 border-gray-100 rounded-xl px-4 py-2 focus:border-blue-500 w-full' />
          <input type='text' placeholder='اسم الجامعة أو المؤسسة' value={currentEdu.universityName} onChange={e=>setCurrentEdu({...currentEdu, universityName:e.target.value})} className='border-2 border-gray-100 rounded-xl px-4 py-2 focus:border-blue-500 w-full' />
          <input type='text' placeholder='الموقع' value={currentEdu.address} onChange={e=>setCurrentEdu({...currentEdu, address:e.target.value})} className='border-2 border-gray-100 rounded-xl px-4 py-2 focus:border-blue-500 w-full' />
          <input type='number' placeholder='المعدل / التقدير' value={currentEdu.grade} onChange={e=>setCurrentEdu({...currentEdu, grade:e.target.value})} className='border-2 border-gray-100 rounded-xl px-4 py-2 focus:border-blue-500 w-full' />
          <input type='date' placeholder='تاريخ البدء' value={currentEdu.startDate} onChange={e=>setCurrentEdu({...currentEdu, startDate:e.target.value})} className='border-2 border-gray-100 rounded-xl px-4 py-2 focus:border-blue-500 w-full' />
          <input type='date' placeholder='تاريخ التخرج' value={currentEdu.endDate} onChange={e=>setCurrentEdu({...currentEdu, endDate:e.target.value})} className='border-2 border-gray-100 rounded-xl px-4 py-2 focus:border-blue-500 w-full' />
          <button onClick={handleAddEducation} className='flex items-center gap-2 text-blue-600 font-bold border-2 border-blue-50 px-4 py-2 rounded-xl hover:bg-blue-50 transition-all'><FaPlus /> إضافة تعليم آخر</button>
          {education.map((edu, idx)=>(<div key={idx} className='p-4 border border-gray-200 rounded-xl bg-gray-50'>{edu.faculty} - {edu.universityName}</div>))}
        </div>
      </section>

      {/* Skills Section */}
      <section className='mt-12 text-right'>
        <div className='flex items-center gap-3 mb-8 text-2xl font-bold text-gray-800 border-b-2 border-blue-600 pb-2 w-fit'>
          <FaTools className='text-blue-600 text-3xl' />
          <h1>المهارات</h1>
        </div>
        <div className='p-8 bg-white rounded-2xl shadow-sm border border-gray-100'>
          <div className='grid grid-cols-1 md:grid-cols-4 gap-4'>
            <input type='text' placeholder='اسم المهارة' value={currentSkill.name} onChange={e=>setCurrentSkill({...currentSkill, name:e.target.value})} className='border-2 border-gray-100 rounded-xl px-4 py-2 focus:border-blue-500 w-full' />
            <select value={currentSkill.type} onChange={e=>setCurrentSkill({...currentSkill, type:e.target.value})} className='border-2 border-gray-100 rounded-xl px-4 py-2 focus:border-blue-500 w-full bg-white'>
              <option value=''>نوع المهارة</option>
              <option value='hard'>مهارات تقنية</option>
              <option value='soft'>مهارات شخصية</option>
              <option value='language'>لغات</option>
            </select>
            <select value={currentSkill.level} onChange={e=>setCurrentSkill({...currentSkill, level:e.target.value})} className='border-2 border-gray-100 rounded-xl px-4 py-2 focus:border-blue-500 w-full bg-white'>
              <option value=''>المستوى</option>
              <option value='beginner'>مبتدئ</option>
              <option value='intermediate'>متوسط</option>
              <option value='advanced'>متقدم</option>
              <option value='expert'>خبير</option>
            </select>
            <button onClick={handleAddSkill} className='bg-blue-600 text-white font-bold py-2 rounded-xl hover:bg-blue-700 transition-colors flex items-center justify-center gap-2'><FaPlus /> إضافة مهارة</button>
          </div>
          {skills.map((skill, idx)=>(<div key={idx} className='p-4 border border-gray-200 rounded-xl bg-gray-50'>{skill.name} - {skill.type} - {skill.level}</div>))}
        </div>
      </section>

      <div className='flex justify-end gap-4 mt-12'>
        <button className='bg-gray-200 text-gray-700 font-bold py-3 px-8 rounded-xl hover:bg-gray-300 transition-all'>معاينة</button>
        <button onClick={handleSubmit} className='bg-blue-600 text-white font-bold py-3 px-12 rounded-xl shadow-lg hover:bg-blue-700 transition-all'>حفظ السيرة الذاتية</button>
      </div>

    </div>
  );
};

export default Create;