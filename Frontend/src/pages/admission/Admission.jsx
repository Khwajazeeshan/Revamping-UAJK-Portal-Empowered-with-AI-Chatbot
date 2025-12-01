import React from 'react'
import { Link } from 'react-router-dom'
import "./Admission.css"
import HeroBanner from '../../components/heroBanner/HeroBanner'
import { useState } from 'react'
import Chatbot from '../../pages/chatbot/chatbot'


const Admission = () => {
  const [chatOpen, setChatOpen] = useState(false); // chatbot state

  const handleToggleChat = () => setChatOpen((prev) => !prev);
  const handleOpenChat = () => setChatOpen(true);
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <HeroBanner pageTitle="Admission Panel" subTitle="Start Your Journey with UAJK Now" />

      <div className="admission-page admission-page-student">
        <div className="admission-content">
          <h2 className="admission-title">Welcome Back!</h2>
          <p className="admission-text">
            Please login to your account or sign up to get started. Access all features by registering quickly and securely.
          </p>



          <div className="admission-btns-wrapper">
            <div className="admission-btns admission-btns-student">
              <Link to="/signup" onClick={scrollToTop}>
                <button><span>Signup</span></button>
              </Link>
            </div>
            <div className="admission-btns admission-btns-student">
              <Link to="/login" onClick={scrollToTop}>
                <button><span>Login</span></button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* <div className="admission-page admission-page-admin">
        <div className="admission-content">
          <h2 className="admission-title">Admin Login</h2>
          <p className="admission-text">
            Please login to your account to get started.
          </p>

          <div className="admission-btns-wrapper">
            <div className="admission-btns">
              <Link to="/admin/login" onClick={scrollToTop}>
                <button><span>Admin Login</span></button>
              </Link>
            </div>
          </div>
        </div>
      </div> */}
      <Chatbot open={chatOpen} onToggle={handleToggleChat} />
    </>
  )
}

export default Admission