import React from 'react';
import { FaRegUserCircle, FaSearch } from 'react-icons/fa';
import { IoMdNotificationsOutline } from 'react-icons/io';
import { Link, NavLink } from 'react-router-dom';
import { logout } from '../../firebase';
// Make sure to import any other necessary icons or components

function Navbar() {
  const hover = "hover:text-subMain transition text-white";
  const activeClassName = "text-subMain border-b-2 border-green-500"; // Class for active state

  // Function to determine class based on active state
  const getNavLinkClass = ({ isActive }) =>
    isActive ? activeClassName : hover;

  return (
    <div>
      {/* Main NavBar */}
      <div className="bg-main shadow-md sticky top-0 z-20 border-b border-gray-300 border-opacity-50">
        <div className="container mx-auto py-0 px-2 lg:grid gap-12 grid-cols-10 justify-between items-center">
          <div className="col-span-4 flex items-center">
            <Link to="/" className="mr-2 mb-1">
              <img src="/images/logo.png" alt="logo" className="w-20 h-6 object-contain" />
            </Link>
            <NavLink
              to="/"
              className={getNavLinkClass}
            >
              Trang chủ
            </NavLink>
            <NavLink
              to="/truyenhinh"
              className={getNavLinkClass}
            >
              Show truyền hình
            </NavLink>
            <NavLink
              to="/phim"
              className={getNavLinkClass}
            >
              Phim
            </NavLink>
          </div>

          {/* Search Form */}
          <div className="col-span-3 flex items-center ">
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
              <div className="flex items-center">
                <svg
                  width="25"
                  height="24"
                  viewBox="0 0 25 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="cursor-pointer"
                >
                  <g id="icon">
                    <path
                      id="Vector"
                      d="M6.72168 13H18.7217V11H6.72168V13ZM3.72168 6V8H21.7217V6H3.72168ZM10.7217 18H14.7217V16H10.7217V18Z"
                      fill="#28BD11"
                    />
                  </g>
                </svg>
              </div>
            </form>
          </div>

          {/* Right Side Icons and Links */}
          <div className="col-span-3 flex items-center justify-end">
            <NavLink to="/dangkyvip" className={getNavLinkClass}>
              <img src="/images/dang_ky_goi_vip.png" alt="dangkyvip" className="w-20 h-10 object-contain" />
            </NavLink>
            <IoMdNotificationsOutline className="w-7 h-7 text-subMain cursor-pointer mr-2" />
            {/* Wrap the user icon with NavLink to navigate to Profile */}
            <NavLink to="/profile" className="mx-4">
              <FaRegUserCircle className="w-6 h-6 text-subMain cursor-pointer" />
            </NavLink>
            <div className="dropdown">
              <button onClick={() => { logout(); }}>Đăng xuất</button>
            </div>
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
          <NavLink to="/anhtraisayhi" className={getNavLinkClass}>
            Anh Trai Say Hi
          </NavLink>
          <NavLink to="/phimyeuthich" className={getNavLinkClass}>
            Phim Yêu Thích
          </NavLink>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
