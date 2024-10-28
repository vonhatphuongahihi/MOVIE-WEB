import React, { useState } from 'react';
import { FaRegUserCircle, FaSearch, FaBars } from 'react-icons/fa';
import { IoMdNotificationsOutline } from 'react-icons/io';
import { Link, NavLink } from 'react-router-dom';
import { logout } from '../../firebase';

function Navbar() {
  const hover = "hover:text-subMain transition text-white";
  const activeClassName = "text-subMain border-b-2 border-green-500";
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const getNavLinkClass = ({ isActive }) => (isActive ? activeClassName : hover);

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div>
      {/* Main NavBar */}
      <div className="bg-main shadow-md fixed top-0 left-0 right-0 z-20 border-b border-gray-300 border-opacity-50">
        <div className="container mx-auto py-0 px-2 md:px-4 lg:px-6 xl:px-8 flex items-center justify-between">
          {/* Left Side - Logo */}
          <div className="flex items-center space-x-4 lg:space-x-6">
            <Link to="/" className="mr-2 mb-1">
              <img src="/images/logo.png" alt="logo" className="w-20 h-6 lg:w-20 object-contain" />
            </Link>
            {/* Main navigation links, hidden on smaller screens */}
            <div className="hidden lg:flex space-x-6">
              <NavLink to="/" className={getNavLinkClass}>Trang chủ</NavLink>
              <NavLink to="/truyenhinh" className={getNavLinkClass}>Show truyền hình</NavLink>
              <NavLink to="/phim" className={getNavLinkClass}>Phim</NavLink>
            </div>
          </div>

          {/* Search Form */}
          <div className="hidden lg:flex col-span-3 items-center w-1/3 ">
            <form className="w-full text-sm bg-white rounded flex items-center gap-2">
              <button type="submit" className="w-12 flex justify-center items-center h-8 rounded text-subMain">
                <FaSearch />
              </button>
              <input
                type="text"
                placeholder="Tìm kiếm"
                className="font-medium placeholder:text-border text-sm w-full h-8 bg-transparent border-none px-2 text-black"
              />
            </form>
          </div>

          {/* Right Side Icons and Links */}
          <div className="hidden lg:flex col-span-3 items-center justify-end space-x-6">
            <NavLink to="/dangkyvip" className={getNavLinkClass}>
              <img src="/images/dang_ky_goi_vip.png" alt="dangkyvip" className="w-20 h-10 object-contain" />
            </NavLink>
            <IoMdNotificationsOutline className="w-7 h-7 text-subMain cursor-pointer mr-2" />
            <NavLink to="/profile" className="mx-4">
              <FaRegUserCircle className="w-6 h-6 text-subMain cursor-pointer" />
            </NavLink>

            {/* Dropdown for logout */}
            <div className="relative">
              <button onClick={toggleDropdown} className="text-white">
                Đăng xuất
              </button>
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 bg-white shadow-lg rounded-md w-40 z-10">
                  <button onClick={() => logout()} className="w-full text-left px-4 py-2 hover:bg-gray-100">Xác nhận Đăng xuất</button>
                  <button onClick={() => setDropdownOpen(false)} className="w-full text-left px-4 py-2 hover:bg-gray-100">Hủy</button>
                </div>
              )}
            </div>
            <img src="/images/moon.png" id="icon" alt="avatar" className="w-8 h-8 object-contain" style={{ width: '40px', cursor: 'pointer' }} />
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center">
            <button onClick={toggleMobileMenu} className="text-white">
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
              <button onClick={toggleDropdown} className="text-white">Đăng xuất</button>
            </div>
          </div>
        )}
      </div>

      {/* Secondary NavBar */}
      <div className="bg-secondary shadow-md fixed top-12 left-0 right-0  z-10 hidden lg:block">
        <div className="container mx-auto py-2 px-2 lg:flex gap-4 justify-center items-center">
          <NavLink to="/phimbo" className={getNavLinkClass}>Phim Bộ</NavLink>
          <NavLink to="/phimdienanh" className={getNavLinkClass}>Phim Điện Ảnh</NavLink>
          <NavLink to="/hoathinh" className={getNavLinkClass}>Hoạt Hình</NavLink>
          <NavLink to="/tvshow" className={getNavLinkClass}>TV Show</NavLink>
          <NavLink to="/2n1d" className={getNavLinkClass}>2N1D</NavLink>
          <NavLink to="/recently" className={getNavLinkClass}>Lịch sử xem phim</NavLink>
          <NavLink to="/phimyeuthich" className={getNavLinkClass}>Phim Yêu Thích</NavLink>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
