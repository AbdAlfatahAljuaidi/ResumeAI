import React from "react";
import NavBar from "./NavBar";
import Main from "./Main";
import About from "./About";
import Services from "./Services";
import Templates from "./Templates";
import Footer from "./Footer";
import CallToAction from "./CallToAction";
import Contact from "./Contact";

const Home = () => {
  return (
   
  
    <div className="relative z-10">
      <NavBar />
      <Main />
      <About />
      <Services />
      <Templates />
      <CallToAction />
      {/* <Contact /> */}
      <Footer />

    
    </div>
  
  );
};

export default Home;
