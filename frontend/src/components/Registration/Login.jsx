import { useEffect, useState } from "react";
import Image from '../../assets/Register.jpg';
import '../../index.css';
import { Link } from 'react-router-dom';
import { FaLock, FaSpinner, FaPhone } from "react-icons/fa";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';

const apiUrl = import.meta.env.VITE_REACT_APP_BACKEND_BASEURL;

const Login = () => {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const userData = async () => {
      try {
        const { data } = await axios.get(`${apiUrl}/userData`, { withCredentials: true });
        console.log("data", data);
        
        if (data.error == false) {
          navigate(`/Layout/${data.user._id}`);
        }
      } catch (error) {
        console.log(error);
      }
    };
    userData();
  }, [navigate]);

  const handleLogin = async () => {
    setLoading(true);

    try {
      const { data } = await axios.post(`${apiUrl}/login`, {
        phone,
        password
      }, { withCredentials: true });

      console.log("data.error", data.error);

      if (data.error == false) {
        toast.success(data.message);
        navigate(`/Layout/${data.user._id}`);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "حدث خطأ ما");
    } finally {
      setLoading(false);
    }
  };
    
  return (
    <section 
      className='h-screen w-full relative bg-cover bg-center flex justify-center items-center px-4'
      style={{ backgroundImage: `url(${Image})` }}
    >
      {/* صندوق النموذج الرئيسي */}
      <div className='w-full max-w-[420px] bg-transparent wrapper bg-black  py-10 px-8 rounded-xl shadow-2xl'>
        
        {/* العنوان */}
        <h1 className='text-white text-center text-2xl font-bold mb-8'>
          تسجيل دخول
        </h1>
     
        {/* حقل رقم الهاتف */}
        <div className="relative mb-4">
          <FaPhone className="absolute right-4 top-1/2 -translate-y-1/2 text-white opacity-70" />
          <input
            type="text"
            onChange={(e) => setPhone(e.target.value)}
            placeholder="رقم الهاتف"
            className="w-full h-12 rounded-3xl bg-transparent border border-gray-400 text-white placeholder:text-white pr-12 pl-4 outline-none focus:border-white transition-colors"
          />
        </div>

        {/* حقل كلمة السر */}
        <div className="relative mb-6">
          <FaLock className="absolute right-4 top-1/2 -translate-y-1/2 text-white opacity-70" />
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            placeholder="كلمة السر"
            className="w-full h-12 rounded-3xl bg-transparent border border-gray-400 text-white placeholder:text-white pr-12 pl-4 outline-none focus:border-white transition-colors"
          />
        </div>

        {/* زر تسجيل الدخول */}
        <button 
          onClick={handleLogin} 
          disabled={loading}
          className={`w-full h-12 bg-white text-black rounded-3xl px-6 flex justify-center items-center gap-2 font-medium transition-opacity ${
            loading ? "cursor-not-allowed opacity-50" : "cursor-pointer hover:bg-gray-100"
          }`}
        >
          {loading && <FaSpinner className="animate-spin text-lg" />}
          <span>{loading ? "جاري تسجيل الدخول..." : "تسجيل دخول"}</span>
        </button>

        {/* روابط التنقل السفلية */}
        <div className='mt-6 space-y-2 text-center text-sm'>
          <div className='text-gray-300'>
            <span>ليس لدي حساب؟</span> 
            <Link className="hover:underline text-white font-medium ms-1" to={"/Register"}>
              إنشاء حساب
            </Link>
          </div>
          <div className='text-gray-300'>
            <span>هل نسيت كلمة السر؟</span> 
            <Link className="hover:underline text-white font-medium ms-1" to={"/ResetPassword"}>
              إعادة تعيين كلمة السر
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Login;