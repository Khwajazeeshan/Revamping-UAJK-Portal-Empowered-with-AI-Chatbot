import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Nav.css";
import logo from "../../assets/uajk-monogram.png";

const Nav = () => {
    const location = useLocation();
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, [location.pathname]);

    const toggleMenu = () => setMenuOpen(!menuOpen);
    const closeMenu = () => {
        setMenuOpen(false);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <div className="nav-wrapper">
            <nav>
                <div className="nav-logo">
                    <img className="nav-logo-img" src={logo} alt="UAJK Logo" />
                    <p className="nav-title">The University of Azad Jammu & Kashmir</p>
                </div>

                <div className={`nav-links ${menuOpen ? "open" : ""}`}>
                    {location.pathname !== "/" && (
                        <Link to="/" className="nav-link" onClick={closeMenu}>Home</Link>
                    )}
                    <Link to="/introduction" className={`nav-link ${location.pathname === "/introduction" ? "active" : ""}`} onClick={closeMenu}>Introduction</Link>
                    <Link to="/admission" className={`nav-link ${location.pathname === "/admission" ? "active" : ""}`} onClick={closeMenu}>Admission</Link>
                    <Link to="/administration" className={`nav-link ${location.pathname === "/administration" ? "active" : ""}`} onClick={closeMenu}>Admin Offices</Link>
                    <Link to="/contact" className={`nav-link ${location.pathname === "/contact" ? "active" : ""}`} onClick={closeMenu}>Contact us</Link>
                </div>

                <div className={`hamburger ${menuOpen ? "active" : ""}`} onClick={toggleMenu}>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </nav>

            {menuOpen && <div className="overlay" onClick={closeMenu}></div>}
        </div>
    );
};

export default Nav;
