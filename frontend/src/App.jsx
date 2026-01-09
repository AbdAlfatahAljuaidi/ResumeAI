import { Route, Routes } from "react-router-dom"
import Register from "./components/Registration/Register"
import Login from "./components/Registration/Login"
import Home from "./components/Home/Home"
import CvBuilder from "./components/CvBuilder/CvBuilder"
import ResumeThree from "./components/CvBuilder/ResumeThree"
import ResumeTwo from "./components/CvBuilder/Resume2"
import Resume from "./components/CvBuilder/Resume"
import Dashboard from "./components/User/Dashboard"
import {ToastContainer} from 'react-toastify'

function App() {

  return (
    <div className="" dir="rtl">
         <ToastContainer
      theme='dark'
      />
    <Routes>
<Route path='Register' element={<Register/>} />
<Route path='Login' element={<Login/>} />
<Route path='' element={<Home />} />
<Route path='CvBuilder' element={<CvBuilder />} />
<Route path='resumeThree/:userID/:resumeTitle' element={<ResumeThree />} />
<Route path='resumeTwo/:userID/:resumeTitle' element={<ResumeTwo />} />
<Route path='Resume/:userID/:resumeTitle' element={<Resume />} />
<Route path='Dashboard/:id' element={<Dashboard />} />


    </Routes>
    
    </div>
  )
}

export default App
