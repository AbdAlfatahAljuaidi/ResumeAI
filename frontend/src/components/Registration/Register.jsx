
import { useState } from "react";
import Image from '../../assets/Register.jpg'
import '../../index.css'
import { Link } from 'react-router-dom'
import { FaUser, FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import axios from "axios"

import{toast} from 'react-toastify'



const apiUrl = import.meta.env.VITE_REACT_APP_BACKEND_BASEURL;

const Register = () => {

  const [formData,setFormData] = useState({
    name:"",
    email:"",
    password:"",
    checkPassword:""
  })


    const onChange = (e) => {
setFormData({
    ...formData,
    [e.target.name]:e.target.value
})
    }


  const Signup = async () => {
console.log("start");

    try {
      const data = await axios.post(`${apiUrl}/signup`,
        formData,
        {withCredentials:true}
      )

      console.log("test");

      if(data.error==false){
        console.log("User created successfully");
      }
      setFormData({
  name:"",
  email:"",
  password:"",
  checkPassword:""
})
toast.success(data.message)
      
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message)
      
    }
  }
    
  return (
    <section className='h-screen'
    style={{
        background: `url(${Image})`,
        backgroundSize:"cover",
        backgroundPosition:"center"
    }}
    >

<div className='flex justify-center  items-center h-screen  '>
    <div className='bg-transparent wrapper bg-black py-14 px-14'>
    <h1 className='text-white w-fit mx-auto text-2xl font-bold'> إنشاء حساب</h1>
    <div className="relative mb-5 mt-10">
  <FaUser className="absolute right-4 top-1/2 -translate-y-1/2 text-white opacity-70" />
  <input
  onChange={onChange}
    type="text"
    name="name"
    value={formData.name}
    placeholder="اسم المستخدم"
    className="
      h-12 md:w-[350px]
      rounded-3xl
      bg-transparent
      border border-gray-400
      text-white
      placeholder:text-white
      pr-12 pl-4
      outline-none
    "
  />
</div>
<div className="relative mb-5">
  <FaEnvelope className="absolute right-4 top-1/2 -translate-y-1/2 text-white opacity-70" />
  <input
  onChange={onChange}
    type="email"
    name="email"
    value={formData.email}
    placeholder="البريد الالكتروني"
    className="
      h-12 md:w-[350px]
      rounded-3xl
      bg-transparent
      border border-gray-400
      text-white
      placeholder:text-white
      pr-12 pl-4
      outline-none
    "
  />
</div>
<div className="relative mb-5">
  <FaLock className="absolute right-4 top-1/2 -translate-y-1/2 text-white opacity-70" />
  <input
  value={formData.password}
    onChange={onChange}
  name="password"
    type="password"
    placeholder="كلمة السر"
    className="
      h-12 md:w-[350px]
      rounded-3xl
      bg-transparent
      border border-gray-400
      text-white
      placeholder:text-white
      pr-12 pl-4
      outline-none
    "
  />
</div>
<div className="relative mb-5">
  <FaLock className="absolute right-4 top-1/2 -translate-y-1/2 text-white opacity-70" />
  <input
  value={formData.checkPassword}
    onChange={onChange}
  name="checkPassword"
    type="password"
    placeholder="تأكيد كلمة السر"
    className="
      h-12 md:w-[350px]
      rounded-3xl
      bg-transparent
      border border-gray-400
      text-white
      placeholder:text-white
      pr-12 pl-4
      outline-none
    "
  />
</div>

  <button onClick={Signup} className='bg-white rounded-3xl px-6 py-2 w-full'>تسجيل حساب</button>
    <div className='mt-5 text-white'>

    <span className=''>هل لديك حساب بالفعل ؟</span> <Link className="hover:underline" to={"/Login"}>تسجيل الدخول</Link>
    </div>
    </div>


</div>

        
    </section>
  )
}

export default Register