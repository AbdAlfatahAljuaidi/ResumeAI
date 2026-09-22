import { useState } from "react";
import Image from '../../assets/Register.jpg'
import '../../index.css'
import { Link,useNavigate } from 'react-router-dom'
import { FaUser, FaLock, FaSpinner,FaPhone } from "react-icons/fa";
import axios from "axios"
import {toast} from 'react-toastify'


const apiUrl = import.meta.env.VITE_REACT_APP_BACKEND_BASEURL;

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    password: "",
    checkPassword: ""
  })

  const navigate = useNavigate()

  // إضافة حالة للتحميل
  const [loading, setLoading] = useState(false);

  const onChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const Signup = async () => {
    console.log("start");
    setLoading(true); // تفعيل حالة التحميل عند بدء الطلب

    try {
      const {data} = await axios.post(`${apiUrl}/signup`,
        formData,
        { withCredentials: true }
      )

      console.log("test");

      if (data.error == false) {
        console.log("User created successfully");
        setFormData({
          name: "",
          phone: "",
          password: "",
          checkPassword: ""
        })
        toast.success(data.message || "تم انشاء مستخدم بنجاح")
      }

      navigate("/Login")
    
      
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "حدث خطأ ما")
      
    } finally {
      setLoading(false); // إيقاف حالة التحميل سواء نجحت العملية أو فشلت
    }
  }
    
  return (
    <section 
    className='h-screen w-full relative bg-cover bg-center flex justify-center items-center px-4'
    style={{ backgroundImage: `url(${Image})` }}
  >
    {/* صندوق النموذج الرئيسي */}
    <div className='w-full max-w-[420px] bg-transparent wrapper bg-black  py-10 px-8 rounded-xl shadow-2xl'>
      
      {/* العنوان */}
      <h1 className='text-white text-center text-2xl font-bold mb-8'>
        إنشاء حساب
      </h1>
  
      {/* حقل اسم المستخدم */}
      <div className="relative mb-4">
        <FaUser className="absolute right-4 top-1/2 -translate-y-1/2 text-white opacity-70" />
        <input
          onChange={onChange}
          type="text"
          name="name"
          value={formData.name}
          placeholder="اسم المستخدم"
          className="w-full h-12 rounded-3xl bg-transparent border border-gray-400 text-white placeholder:text-white pr-12 pl-4 outline-none focus:border-white transition-colors"
        />
      </div>
  
      {/* حقل رقم الهاتف */}
      <div className="relative mb-4">
        <FaPhone className="absolute right-4 top-1/2 -translate-y-1/2 text-white opacity-70" />
        <input
          onChange={onChange}
          type="text"
          name="phone"
          value={formData.phone}
          placeholder="رقم الهاتف"
          className="w-full h-12 rounded-3xl bg-transparent border border-gray-400 text-white placeholder:text-white pr-12 pl-4 outline-none focus:border-white transition-colors"
        />
      </div>
  
      {/* حقل كلمة السر */}
      <div className="relative mb-4">
        <FaLock className="absolute right-4 top-1/2 -translate-y-1/2 text-white opacity-70" />
        <input
          value={formData.password}
          onChange={onChange}
          name="password"
          type="password"
          placeholder="كلمة السر"
          className="w-full h-12 rounded-3xl bg-transparent border border-gray-400 text-white placeholder:text-white pr-12 pl-4 outline-none focus:border-white transition-colors"
        />
      </div>
  
      {/* حقل تأكيد كلمة السر */}
      <div className="relative mb-6">
        <FaLock className="absolute right-4 top-1/2 -translate-y-1/2 text-white opacity-70" />
        <input
          value={formData.checkPassword}
          onChange={onChange}
          name="checkPassword"
          type="password"
          placeholder="تأكيد كلمة السر"
          className="w-full h-12 rounded-3xl bg-transparent border border-gray-400 text-white placeholder:text-white pr-12 pl-4 outline-none focus:border-white transition-colors"
        />
      </div>
  
      {/* زر التسجيل */}
      <button 
        onClick={() => Signup()} 
        disabled={loading}
        className={`w-full h-12 bg-white text-black rounded-3xl px-6 flex justify-center items-center gap-2 font-medium transition-opacity ${
          loading ? "cursor-not-allowed opacity-50" : "cursor-pointer hover:bg-gray-100"
        }`}
      >
        {loading && <FaSpinner className="animate-spin text-lg" />}
        <span>{loading ? "جاري التسجيل..." : "تسجيل حساب"}</span>
      </button>
  
      {/* رابط الانتقال لتسجيل الدخول */}
      <div className='mt-6 text-center text-white'>
        <span>هل لديك حساب بالفعل؟ </span> 
        <Link className="hover:underline ms-1" to={"/Login"}>
          تسجيل الدخول
        </Link>
      </div>
  
    </div>
  </section>
  )
}

export default Register