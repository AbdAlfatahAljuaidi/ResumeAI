
import { useEffect, useState } from "react";
import Image from '../../assets/Register.jpg'
import '../../index.css'
import { Link } from 'react-router-dom'
import { FaUser, FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import axios from 'axios'
import { useNavigate } from "react-router-dom";

import{toast} from 'react-toastify'



const apiUrl = import.meta.env.VITE_REACT_APP_BACKEND_BASEURL;

const Login = () => {

  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")

  const navigate = useNavigate()

  useEffect(() => {
const userData = async () => {
try {
  const {data} = await axios.get(`${apiUrl}/userData`,{withCredentials:true})
  console.log("data",data);
  
  if(data.error == false){
navigate(`/Dashboard/${data.user._id}`)
  }
} catch (error) {
  console.log(error);
  
}
}
userData()
  },[])

const Login = async () => {
  try {
    const {data} = await axios.post(`${apiUrl}/login`,{
      email,
      password
    },{withCredentials:true})

console.log("data.error",data.error);

    if(data.error==false){
      toast.success(data.message)
      navigate(`/Dashboard/${data.user._id}`)
    }
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
    <h1 className='text-white w-fit mx-auto text-2xl mb-10 font-bold'> تسجيل دخول</h1>
 
<div className="relative mb-5">
  <FaEnvelope className="absolute right-4 top-1/2 -translate-y-1/2 text-white opacity-70" />
  <input
    type="email"
    onChange={(e)=> setEmail(e.target.value)}
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
    type="password"
    onChange={(e)=> setPassword(e.target.value)}
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
  <button onClick={Login} className='bg-white rounded-3xl px-6 py-2 w-full'>تسجيل دخول</button>
    <div className='mt-5 text-white'>

    <span className=''>  ليس لدي حساب ؟</span> <Link className="hover:underline" to={"/Register"}>إنشاء حساب </Link>
    </div>
    </div>


</div>

        
    </section>
  )
}

export default Login