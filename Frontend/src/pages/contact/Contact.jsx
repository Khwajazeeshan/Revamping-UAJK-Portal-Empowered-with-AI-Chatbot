import React from "react";
import "./Contact.css";
import { useState } from 'react'
import Chatbot from '../../pages/chatbot/chatbot'



const Contact = () => {
  const [chatOpen, setChatOpen] = useState(false); // chatbot state

  const handleToggleChat = () => setChatOpen((prev) => !prev);
  const handleOpenChat = () => setChatOpen(true);
  return (
    <div className="contact-page">
      <h1 className="title">University Contact Directory</h1>

      {/* Administration Section */}
      <section className="section">
        <h2>Administration</h2>

        <div className="office">
          <h3>Vice Chancellor Office</h3>
          <p className="person">Dr. Nasir Jamal Khattak (PhD, Amherst)</p>
          <div className="contact-info">
            <span>📞 +92.5822.960479</span>
            <span>📠 Fax: +92.5822.960480</span>
            <span>📧 <a href="mailto:vice.chancellor@uajk.edu.pk">vice.chancellor@uajk.edu.pk</a></span>
          </div>
        </div>

        <div className="office">
          <h3>Registrar Office</h3>
          <div className="contact-info">
            <span>📞 +92.5822.960418</span>
            <span>📠 Fax: +92.5822.960437</span>
            <span>📧 <a href="mailto:registrar@uajk.edu.pk">registrar@uajk.edu.pk</a></span>
          </div>
        </div>

        <div className="office">
          <h3>Director Finance and Planning (Chella Campus)</h3>
          <div className="contact-info">
            <span>📞 +92.5822.960417</span>
            <span>📧 <a href="mailto:director.finance@uajk.edu.pk">director.finance@uajk.edu.pk</a></span>
          </div>
        </div>

        <div className="office">
          <h3>Controller of Examinations</h3>
          <div className="contact-info">
            <span>📞 +92.5822.960400</span>
            <span>📠 Fax: +92.5822.960478</span>
            <span>📧 <a href="mailto:controller@uajk.edu.pk">controller@uajk.edu.pk</a></span>
            <span>🆘 Help Desk: +92.5822.960465</span>
          </div>
        </div>
      </section>

      {/* Deans Section */}
      <section className="section">
        <h2>Deans</h2>

        <div className="office">
          <h3>Faculty of Humanities and Social Sciences</h3>
          <div className="contact-info">
            <span>📞 +92.5822.960485</span>
            <span>📧 <a href="mailto:dean.arts@uajk.edu.pk">dean.arts@uajk.edu.pk</a></span>
          </div>
        </div>

        <div className="office">
          <h3>Faculty of Science</h3>
          <div className="contact-info">
            <span>📞 +92.5822.962331</span>
            <span>📧 <a href="mailto:dean.sciences@uajk.edu.pk">dean.sciences@uajk.edu.pk</a></span>
          </div>
        </div>

        <div className="office">
          <h3>Faculty of Engineering</h3>
          <div className="contact-info">
            <span>📞 +92.5822.960462</span>
            <span>📧 <a href="mailto:dean.engineering@uajk.edu.pk">dean.engineering@uajk.edu.pk</a></span>,{" "}
            <a href="mailto:saadat.hanif@uajk.edu.pk">saadat.hanif@uajk.edu.pk</a>
          </div>
        </div>
      </section>

      {/* Student Help Desk */}
      <section className="section">
        <h2>Student Help Desk</h2>

        <div className="office">
          <h3>Deputy Director (Chella Campus)</h3>
          <p className="person">Dr. Muhammad Yousaf Mir</p>
          <div className="contact-info">
            <span>📞 +92.5822.960463</span>
          </div>
        </div>

        <div className="office">
          <h3>Assistant Director</h3>
          <div className="contact-info">
            <span>📞 +92.5822.962324</span>
          </div>
        </div>

        <div className="office">
          <h3>Office Contact (Chella Campus)</h3>
          <div className="contact-info">
            <span>📞 +92.5822.960463</span>
            <span>📧 <a href="mailto:dsa@uajk.edu.pk">dsa@uajk.edu.pk</a></span>
          </div>
        </div>
      </section>

      {/* Examination Related */}
      <section className="section">
        <h2>Examination Related</h2>

        <div className="office">
          <h3>Controller of Examinations</h3>
          <div className="contact-info">
            <span>📞 +92.5822.960400</span>
          </div>
        </div>

        <div className="office">
          <h3>Result Section</h3>
          <div className="contact-info">
            <span>📞 +92.5822.920735</span>
          </div>
        </div>

        <div className="office">
          <h3>Coordinator For Affiliated Colleges</h3>
          <p className="person">Dr. Anees-ur-Rasheed Hashmi</p>
          <div className="contact-info">
            <span>📞 +92.5822.960519</span>
            <span>📱 0308.1417168</span>
          </div>
        </div>
      </section>

      {/* Scholarship Queries */}
      <section className="section">
        <h2>Scholarship Queries</h2>

        <div className="office">
          <h3>Directorate of Student Financial Assistance & University Advancement</h3>
          <div className="contact-info">
            <span>📞 +92.5822.960410</span>
            <span>📠 Fax: +92.5822.960432</span>
            <span>📧 <a href="mailto:director.sfaua@uajk.edu.pk">director.sfaua@uajk.edu.pk</a></span>
          </div>
        </div>
      </section>

      {/* Guest House */}
      <section className="section">
        <h2>University Guest House</h2>

        <div className="office">
          <h3>University Guest House (Chella Campus)</h3>
          <p className="person">Raja Fahim Akhtar</p>
          <div className="contact-info">
            <span>📞 +92.5822.960511</span>
            <span>📱 0301.6296744</span>
            <span>📧 <a href="mailto:guest.house@uajk.edu.pk">guest.house@uajk.edu.pk</a></span>
          </div>
        </div>
      </section>
      <Chatbot open={chatOpen} onToggle={handleToggleChat} />
    </div>
  );
};

export default Contact;
