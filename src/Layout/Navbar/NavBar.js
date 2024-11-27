import React, { useState } from 'react';
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
  const activeClassName = "relative text-subMain border-b-2 border-green-500 active-link";
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isFilterPopupOpen, setFilterPopupOpen] = useState(false);

  const getNavLinkClass = ({ isActive }) => (isActive ? activeClassName : hover);

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleFilterPopup = () => {
    setFilterPopupOpen(!isFilterPopupOpen);
  };

  return (
    <div>
      {/* Main NavBar */}
      <div className="bg-main shadow-md fixed top-0 left-0 right-0 z-20 border-b pb-1 border-gray-300 border-opacity-30 text-nowrap text-center text-sm xl:text-base">
        <div className="container mx-auto py-0 px-2 md:px-4 lg:px-6 xl:px-8 flex items-center justify-between">
          {/* Left Side - Logo */}
          <div className="flex items-center space-x-4 lg:space-x-6">
            <Link to="/" className="mr-2 mb-1">
              <img src="/images/logo.png" alt="logo" className="w-20 h-6 lg:w-20 object-contain" />
            </Link>
            {/* Main navigation links, hidden on smaller screens */}
            <div className="hidden lg:flex space-x-6">
              <NavLink to="/" className={getNavLinkClass}>
                <img src="/images/home_icon.svg" alt="Home Icon" className="w-5 h-5 inline-block mr-2 mb-1" />
                Trang chủ
              </NavLink>
              <NavLink to="/truyenhinh" className={getNavLinkClass}>
                <img src="/images/tv_icon.svg" alt="TV Show Icon" className="w-5 h-5 inline-block mr-2 mb-1" />
                Truyền hình
              </NavLink>
              <NavLink to="/phim" className={getNavLinkClass}>
                <img src="/images/sport_icon.svg" alt="Sport Icon" className="w-5 h-5 inline-block mr-2 mb-1" />
                Thể thao
              </NavLink>
            </div>
          </div>

          {/* Search Form */}
          <div className="flex col-span-3 items-center relative space-x-2 w-3/5 lg:w-1/3 ml-3">
            {/* SearchForm */}
            <div className="flex-grow">
              <SearchForm />
            </div>

            {/* Nút lọc bên phải */}
            <button 
              onClick={toggleFilterPopup} 
              className="block flex-shrink-0"
            >
              <IoFilter className="w-5 h-5 text-subMain cursor-pointer" />
            </button>
          </div>

          {/* Right Side Icons and Links */}
          <div className="flex col-span-3 items-center justify-end space-x-6 mx-3">
            <NavLink to="/dangkyvip" className={getNavLinkClass}>
              <img src="/images/dang_ky_goi_vip.png" alt="dangkyvip" className="hidden lg:flex w-20 h-10 object-contain" />
            </NavLink>

            {/* <IoMdNotificationsOutline className="w-7 h-7 text-subMain cursor-pointer mr-2" /> */}
            <NotificationIcon />

            {/* User Profile */}
            <div className="relative">
              <button onClick={toggleDropdown} className="mx-4">
                <FaRegUserCircle className="w-6 h-6 text-subMain cursor-pointer" />
              </button>
              
              {/* Dropdown Menu */}
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 bg-white shadow-lg rounded-lg w-48 py-2 text-center z-20">
                  <Link to="/profile" className="block text-sm py-2 text-gray-700 hover:bg-gray-200">Thông tin cá nhân</Link>
                  <button onClick={logout} className="block w-full text-sm py-2 text-gray-700 hover:bg-gray-200">Đăng xuất</button>
                </div>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center">
            <button onClick={toggleMobileMenu} className="text-subMain">
              <FaBars className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-main">
            <div className="flex flex-col items-center space-y-4 py-4">
              <NavLink to="/" className={getNavLinkClass}>Trang chủ</NavLink>
              <NavLink to="/truyenhinh" className={getNavLinkClass}>Show truyền hình</NavLink>
              <NavLink to="/phim" className={getNavLinkClass}>Phim</NavLink>
              <NavLink to="/dangkyvip" className={getNavLinkClass}>Đăng ký VIP</NavLink>
              <button onClick={toggleDropdown} className="text-subMain">Đăng xuất</button>
            </div>
          </div>
        )}

        {/* Filter Popup */}
        {isFilterPopupOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-main bg-opacity-50">
            <FilterPopup onClose={toggleFilterPopup} />
          </div>
        )}
      </div>

      {/* Secondary NavBar */}
      <div className="bg-secondary shadow-md fixed top-6 md:top-10 left-0 right-0 z-10 block">
        <div className="container mx-auto py-2 px-2 flex gap-4 justify-center items-center text-center text-wrap text-xs sm:text-sm lg:text-base bg-main">
          <NavLink to="/phimtrung" className={getNavLinkClass}>Phim Trung</NavLink>
          <NavLink to="/phimdienanh" className={getNavLinkClass}>Phim Điện Ảnh</NavLink>
          <NavLink to="/hoathinh" className={getNavLinkClass}>Hoạt Hình</NavLink>
          <NavLink to="/anhtraisayhi" className={getNavLinkClass}>Anh Trai Say Hi</NavLink>
          <NavLink to="/2n1d" className={getNavLinkClass}>2N1D</NavLink>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
