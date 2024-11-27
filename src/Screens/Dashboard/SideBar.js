import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { BsFillGridFill } from "react-icons/bs";
import { FaListAlt, FaUsers, FaHeart, FaBars } from "react-icons/fa";
import { RiMovie2Fill, RiLockPasswordLine } from "react-icons/ri";
import { HiViewGridAdd } from "react-icons/hi";
import { FiSettings } from "react-icons/fi";
import { Link, NavLink } from 'react-router-dom';
import './SideBar.css';

function Header() {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const SideLinks = [
    { name: "Dashboard", link: "/admin", icon: BsFillGridFill },
    { name: "Movies List", link: "/admin/movieslist", icon: FaListAlt },
    { name: "Shows List", link: "/admin/showslist", icon: RiMovie2Fill },
    { name: "Add Movies", link: "/admin/addmovie", icon: RiMovie2Fill },
    { name: "Add Shows", link: "/admin/addshow", icon: RiMovie2Fill },
    { name: "Users List", link: "/admin/userslist", icon: FaUsers },
  ];

  const hover = "hover:text-white hover:bg-main transition text-sm";
  const activeClassName = "active navbar-item"; 

  const toggleMobileMenu = () => setMobileMenuOpen(!isMobileMenuOpen);

  const navigate = useNavigate(); 

  const handleLogout = () => {
    navigate("/login"); 
  };
  return (
    <div>
      {/* Header */}
      <div className="header-container">
        <div className="header-content">
          {/* Left Side - Logo */}
          <div className="header-logo">
            <Link to="/" className="mr-2 mb-1">
              <img src="/images/logo.png" alt="logo" />
            </Link>

            <div className="navbar">
              {SideLinks.map((link, index) => (
                <NavLink
                  key={index}
                  to={link.link}
                  className={({ isActive }) => isActive ? `${activeClassName} navbar-item` : "navbar-item"}
                >
                  <link.icon className="icon mr-2" />{link.name}
                </NavLink>
              ))}
            </div>
          </div>

          {/* Right Side - Logout button */}
          <div className="header-logout">
            <button onClick={handleLogout} className="logout-button">
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="mobile-menu">
          <div className="flex flex-col items-center space-y-4">
            {SideLinks.map((link, index) => (
              <NavLink
                key={index}
                to={link.link}
                className={({ isActive }) => isActive ? `${activeClassName} navbar-item` : "navbar-item"}
              >
                <link.icon className="mr-2" />{link.name}
              </NavLink>
            ))}
            {/* Mobile Logout Button */}
            <button onClick={handleLogout} className="mobile-logout-button">
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Header;
