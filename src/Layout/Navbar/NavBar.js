import React, { useState } from 'react';
import { FaRegUserCircle, FaSearch } from 'react-icons/fa';
import { IoMdNotificationsOutline } from 'react-icons/io';
import { Link, NavLink } from 'react-router-dom';
import { logout } from '../../firebase';

function Navbar() {
  const [showDropdown, setShowDropdown] = useState(false); // State quản lý menu dropdown
  const hover = "hover:text-subMain transition text-white";
  const activeClassName = "text-subMain border-b-2 border-green-500";

  const getNavLinkClass = ({ isActive }) =>
    isActive ? activeClassName : hover;

  // Hàm toggle dropdown
  const toggleDropdown = () => setShowDropdown((prev) => !prev);

  // Hàm đóng dropdown khi nhấn ngoài vùng menu
  const handleClickOutside = (event) => {
    if (!event.target.closest('.dropdown-container')) {
      setShowDropdown(false);
    }
  };

  React.useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  return (
    <div>
      {/* Main NavBar */}
      <div className="bg-main shadow-md sticky top-0 z-20 border-b border-gray-300 border-opacity-50">
        <div className="container mx-auto py-0 px-2 lg:grid gap-12 grid-cols-10 justify-between items-center">
          <div className="col-span-4 flex items-center">
            <Link to="/" className="mr-2 mb-1">
              <img src="/images/logo.png" alt="logo" className="w-20 h-6 object-contain" />
            </Link>
            <NavLink to="/" className={getNavLinkClass}>
              Trang chủ
            </NavLink>
            <NavLink to="/truyenhinh" className={getNavLinkClass}>
              Show truyền hình
            </NavLink>
            <NavLink to="/phim" className={getNavLinkClass}>
              Phim
            </NavLink>
          </div>

          {/* Search Form */}
          <div className="col-span-3 flex items-center">
            <form className="w-full text-sm bg-white rounded flex items-center gap-2">
              <button
                type="submit"
                className="w-12 flex justify-center items-center h-8 rounded text-subMain"
              >
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
          <div className="col-span-3 flex items-center justify-end">
            <NavLink to="/dangkyvip" className={getNavLinkClass}>
              <img src="/images/dang_ky_goi_vip.png" alt="dangkyvip" className="w-20 h-10 object-contain" />
            </NavLink>
            <IoMdNotificationsOutline className="w-7 h-7 text-subMain cursor-pointer mr-2" />

            {/* User Icon with Dropdown */}
            <div className="relative dropdown-container" >
              <FaRegUserCircle
                className="w-6 h-6 text-subMain cursor-pointer"
                onClick={toggleDropdown}
              />
              {showDropdown && (
                <div className="absolute right-0 mt-2 w-40 bg-main shadow-lg rounded-lg text-white z-30">
                  <NavLink
                    to="/profile"
                    className="block px-4 py-2 hover:text-subMain"
                    onClick={() => setShowDropdown(false)}
                  >
                    Hồ sơ
                  </NavLink>
                  <NavLink
                    to="/recently"
                    className="block px-4 py-2 hover:text-subMain"
                    onClick={() => setShowDropdown(false)}
                  >
                    Lịch sử xem 
                  </NavLink>
                  <NavLink
                    to="/phimyeuthich"
                    className="block px-4 py-2 hover:text-subMain"
                    onClick={() => setShowDropdown(false)}
                  >
                    Phim yêu thích
                  </NavLink>
                  <button
                    onClick={() => {
                    logout(); 
                    setShowDropdown(false); 
                     }}
                   className="block w-full text-left px-4 py-2 hover:text-subMain"
                  >
                    Đăng xuất
                  </button>
                </div>
              )}
            </div>

            <img src="/images/moon.png" id="icon" alt="avatar" className="w-8 h-8 object-contain" 
            style={{ width: '40px', cursor: 'pointer' }} />
          </div>
        </div>
      </div>

      {/* Secondary NavBar */}
      <div className="bg-secondary shadow-md sticky top-12 z-10">
        <div className="container mx-auto py-2 px-2 lg:flex gap-4 justify-center items-center">
          <NavLink to="/phimbo" className={getNavLinkClass}>
            Phim Bộ
          </NavLink>
          <NavLink to="/phimdienanh" className={getNavLinkClass}>
            Phim Điện Ảnh
          </NavLink>
          <NavLink to="/hoathinh" className={getNavLinkClass}>
            Hoạt Hình
          </NavLink>
          <NavLink to="/tvshow" className={getNavLinkClass}>
            TV Show
          </NavLink>
          <NavLink to="/2n1d" className={getNavLinkClass}>
            2N1D
          </NavLink>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
