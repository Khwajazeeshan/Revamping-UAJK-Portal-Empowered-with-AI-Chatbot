import React from 'react';
import './AdminStaff.css';

const AdminStaff = ({ staffTitle, staff }) => {
  return (
    <>
      <div className="admin-staff-title">
        <h2>{staffTitle}</h2>
      </div>

      <div className="admin-staff-wrapper">
        {staff.map((member, index) => (
          <div key={index} className="admin-staff-card">
            <div className="admin-staff-img-wrap">
              <img className="admin-staff-img" src={member.image} alt={member.name} />
            </div>
            <div className="admin-staff-info">
              <h3 className="admin-staff-name">{member.name}</h3>
              <p className="admin-staff-role">{member.designation}</p>
              <ul className="admin-staff-contact">
                {member.contactDetails.map((detail, idx) => (
                  <li key={idx}>{detail}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default AdminStaff;
