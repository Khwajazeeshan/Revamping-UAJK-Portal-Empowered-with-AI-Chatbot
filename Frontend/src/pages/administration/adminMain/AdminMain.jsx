import React from 'react';
import "./AdminMain.css";

const AdminMain = ({ mainImg, mainTitle, mainDetails }) => {
    return (
        <div className="admin-main-container">
            <div className="admin-main">
                <div className="admin-main-img">
                    <img src={mainImg} alt={mainTitle} />
                </div>

                <div className="admin-main-content">
                    <h1 className="admin-main-title">{mainTitle}</h1>
                    <ul className="admin-main-list">
                        {mainDetails.map((detail, index) => (
                            <li key={index}>{detail}</li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default AdminMain;
