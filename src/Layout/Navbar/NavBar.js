import React, { useState, useEffect } from 'react';
import { FaBars, FaRegUserCircle } from 'react-icons/fa';
import { IoMdNotificationsOutline } from 'react-icons/io';
import { IoFilter } from "react-icons/io5";
import { Link, NavLink } from 'react-router-dom';
import FilterPopup from '../../Components/FilterPopup';
import SearchForm from '../../Components/SearchForm';
import { logout } from '../../firebase';
import NotificationIcon from '../../Components/Notification/NotificationIcon';

import './NavBar.css'

function Navbar() {
  const hover = "hover:text-subMain transition text-subMain";
  const activeClassName = "relative text-subMain border-b-2 border-green-500";
  
  const getNavLinkClass = ({ isActive }) => {
    return isActive ? `${activeClassName} text-subMain` : hover;
  };
  const [showDropdown, setShowDropdown] = useState(false);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isFilterPopupOpen, setFilterPopupOpen] = useState(false);
  
  const toggleDropdown = () => {
    setShowDropdown((prev) => !prev);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen((prev) => !prev);
  };

  const toggleFilterPopup = () => {
    setFilterPopupOpen((prev) => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.dropdown-container')) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <div>
      {/* Main NavBar */}
      <div className="bg-main shadow-md fixed top-0 left-0 right-0 z-20 border-b pb-1 border-gray-300 border-opacity-30 text-nowrap text-center text-sm xl:text-base text-subMain">
        <div className="container mx-auto py-2 px-4 flex items-center justify-between">
          {/* Left Side - Logo */}
          <div className="flex items-center space-x-4 text-subMain">
            <Link to="/" className="mr-2">
              <img src="/images/logo.png" alt="logo" className="w-20 h-6 object-contain" />
            </Link>
            <div className="hidden lg:flex space-x-6">
              <NavLink to="/" className={getNavLinkClass}>
                <img src="/images/home_icon.svg" alt="Home Icon" className="w-5 h-5 inline-block mr-2 mb-1" />
                Trang chủ
              </NavLink>
              <NavLink to="/truyenhinh" className={getNavLinkClass}>
                <img src="/images/tv_icon.svg" alt="TV Show Icon" className="w-5  h-5 inline-block mr-2 mb-1 text-subMain" />
                Truyền hình
              </NavLink>
              <NavLink to="/phim" className={getNavLinkClass}>
                <img src="/images/sport_icon.svg" alt="Sport Icon" className="w-5 h-5 inline-block mr-2 mb-1" />
                Thể thao
              </NavLink>
            </div>
          </div>

          {/* Search Form */}
          <div className="flex items-center space-x-2 w-1/3">
            <SearchForm />
            <button onClick={toggleFilterPopup} className="block">
              <IoFilter className="w-5 h-5 text-subMain cursor-pointer" />
            </button>
          </div>

          {/* Right Side */}
          <div className="flex items-center space-x-6">
            <NavLink to="/dangkyvip" className={getNavLinkClass}>
              <img src="/images/dang_ky_goi_vip.png" alt="VIP" className="hidden lg:block w-20 h-10 object-contain" />
            </NavLink>
            <NotificationIcon />
            <div className="relative dropdown-container">
              <button onClick={toggleDropdown} className="mx-4">
                <FaRegUserCircle className="w-6 h-6 text-subMain cursor-pointer" />
              </button>
              {showDropdown && (
                <div className="absolute right-0 mt-2 bg-[#8B8B8B] shadow-lg rounded-lg w-40 py-1 z-20">
                  <NavLink 
                    to="/profile" 
                    className="flex items-center px-3 py-1.5 mt-1 hover:bg-[#545454] text-white text-sm"
                  >
                    <img src="images/ho_so_icon.svg" alt="Hồ sơ" className="w-4 h-4 mr-2" />
                    Hồ sơ
                  </NavLink>
                  <NavLink 
                    to="/recently" 
                    className="flex items-center px-3 py-1.5 mt-1 hover:bg-[#545454] text-white text-sm"
                  >
                    <img src="images/lich_su_xem_icon.svg" alt="Lịch sử xem" className="w-4 h-4 mr-2" />
                    Lịch sử xem
                  </NavLink>
                  <NavLink 
                    to="/phimyeuthich" 
                    className="flex items-center px-3 py-1.5 mt-1 hover:bg-[#545454] text-white text-sm"
                  >
                    <img src="images/yeu_thich_icon.svg" alt="Phim yêu thích" className="w-4 h-4 mr-2" />
                    Danh sách yêu thích
                  </NavLink>
                  <NavLink 
                    to="/recently" 
                    className="flex items-center px-3 py-1.5 mt-1 hover:bg-[#545454] text-white text-sm"
                  >
                    <img src="images/hen_gio_ngu_icon.svg" alt="Hẹn giờ đi ngủ" className="w-4 h-4 mr-2" />
                    Hẹn giờ đi ngủ
                  </NavLink>
                  <button
                    onClick={() => {
                      logout();
                      setShowDropdown(false);
                    }}
                    className="flex items-center w-full px-3 py-1.5 mt-1 hover:bg-[#545454] text-white text-sm"
                  >
                    <img src="images/dang_xuat_icon.svg" alt="Đăng xuất" className="w-4 h-4 mr-2" />
                    Đăng xuất
                  </button>
                </div>
              )}


            </div>
          </div>
        </div>
          
        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-main py-4">
            <div className="flex flex-col items-center space-y-4">
              <NavLink to="/" className={getNavLinkClass}>Trang chủ</NavLink>
              <NavLink to="/truyenhinh" className={getNavLinkClass}>Show truyền hình</NavLink>
              <NavLink to="/phim" className={getNavLinkClass}>Phim</NavLink>
              <NavLink to="/dangkyvip" className={getNavLinkClass}>Đăng ký VIP</NavLink>
            </div>
          </div>
        )}
        {/* Secondary NavBar */}
      <div className="bg-main shadow-md fixed top-8 md:top-12 left-0 right-0 z-10 block">
        <div className="container mx-auto py-2 px-2 flex gap-4 justify-center items-center text-center text-wrap text-xs sm:text-sm lg:text-base">
          <NavLink to="/phimtrung" className={getNavLinkClass}>Phim Trung</NavLink>
          <NavLink to="/phimdienanh" className={getNavLinkClass}>Phim Điện Ảnh</NavLink>
          <NavLink to="/anime" className={getNavLinkClass}>Anime</NavLink>
          <NavLink to="/2n1d" className={getNavLinkClass}>2N1D</NavLink>
          <NavLink to="/anhtraisayhi" className={getNavLinkClass}>Anh Trai Say Hi</NavLink>
        </div>
      </div>

        {/* Filter Popup */}
        {isFilterPopupOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-main bg-opacity-50">
            <FilterPopup onClose={toggleFilterPopup} />
          </div>
        )}
      </div>
    </div>
  );
}

export default Navbar;