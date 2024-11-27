import React, { useState, useEffect } from 'react';
import { FaBars, FaRegUserCircle } from 'react-icons/fa';
import { IoMdNotificationsOutline } from 'react-icons/io';
import { IoFilter } from "react-icons/io5";
import { Link, NavLink } from 'react-router-dom';
import FilterPopup from '../../Components/FilterPopup';
import SearchForm from '../../Components/SearchForm';
import { logout } from '../../firebase';

function Navbar() {
  const [showDropdown, setShowDropdown] = useState(false);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isFilterPopupOpen, setFilterPopupOpen] = useState(false);

  const hover = "hover:text-subMain transition text-white";
  const activeClassName = "text-subMain border-b-2 border-green-500";

  const getNavLinkClass = ({ isActive }) => (isActive ? activeClassName : hover);

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
      <div className="bg-main shadow-md fixed top-0 left-0 right-0 z-20 border-b border-gray-300 border-opacity-50 text-center text-sm xl:text-base">
        <div className="container mx-auto py-2 px-4 flex items-center justify-between">
          {/* Left Side - Logo */}
          <div className="flex items-center space-x-4">
            <Link to="/" className="mr-2">
              <img src="/images/logo.png" alt="logo" className="w-20 h-6 object-contain" />
            </Link>
            <div className="hidden lg:flex space-x-6">
              <NavLink to="/" className={getNavLinkClass}>Trang chủ</NavLink>
              <NavLink to="/truyenhinh" className={getNavLinkClass}>Show truyền hình</NavLink>
              <NavLink to="/phim" className={getNavLinkClass}>Phim</NavLink>
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
            <IoMdNotificationsOutline className="w-7 h-7 text-subMain cursor-pointer" />
            <div className="relative dropdown-container">
              <FaRegUserCircle
                className="w-6 h-6 text-subMain cursor-pointer"
                onClick={toggleDropdown}
              />
              {showDropdown && (
                <div className="absolute right-0 mt-2 w-40 bg-main shadow-lg rounded-lg text-white z-30">
                  <NavLink to="/profile" className="block px-4 py-2 hover:text-subMain">Hồ sơ</NavLink>
                  <NavLink to="/recently" className="block px-4 py-2 hover:text-subMain">Lịch sử xem</NavLink>
                  <NavLink to="/phimyeuthich" className="block px-4 py-2 hover:text-subMain">Phim yêu thích</NavLink>
                  <button
                    onClick={() => {
                      logout();
                      setShowDropdown(false);
                    }}
                    className="block w-full text-center px-4 py-2 hover:text-subMain"
                  >
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
            <NavLink to="/" className={getNavLinkClass}>Trang chủ</NavLink>
            <NavLink to="/truyenhinh" className={getNavLinkClass}>Show truyền hình</NavLink>
            <NavLink to="/phim" className={getNavLinkClass}>Phim</NavLink>
            <NavLink to="/dangkyvip" className={getNavLinkClass}>Đăng ký VIP</NavLink>
          </div>
        )}

        {/* Filter Popup */}
        {isFilterPopupOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <FilterPopup onClose={toggleFilterPopup} />
          </div>
        )}
      </div>
    </div>
  );
}

export default Navbar;
