import React from "react";
import { Link, NavLink } from "react-router-dom";
import { FaSearch, FaHeart } from "react-icons/fa";
import { FaRegUserCircle } from "react-icons/fa";
import { IoMdNotificationsOutline } from "react-icons/io";
import { logout } from "../../firebase";

function Navbar() {
  const hover = "hover:text-subMain transitions text-white";
  const activeClassName = "text-subMain border-b-2 border-green-500"; // Class cho trạng thái active

  const Hover = ({ isActive }) =>
    isActive ? activeClassName : hover;
  return (
    <div>
      {/* Thanh NavBar chính */}
      <div className="bg-main shadow-md sticky top-0 z-20 border-b border-gray-300 border-opacity-50">
        <div className="container mx-auto py-0 px-2 lg:grid gap-12 grid-cols-10 justify-between items-center">
          <div className="col-span-4 flex items-center">
            <Link to="/" className="mr-2 mb-1">
              <img src="/images/logo.png" alt="logo" className="w-20 h-6 object-contain" />
            </Link>
            <NavLink to="/" className="mx-4 w-30 h-10 object-contain hover:class-name mt-4 hover:text-subMain text-[15px]">Trang chủ</NavLink>
            <NavLink to="/truyenhinh" className="mx-4 mt-4 w-30 h-10 object-contain hover:class-name hover:text-subMain text-[15px]">
            Show truyền hình</NavLink>
            <NavLink to="/phim" className="mx-4 mt-4 w-30 h-10 object-contain hover:class-name hover:text-subMain text-[15px]">
            Phim</NavLink>
          </div>
  
          {/* search Form */}
          <div className="col-span-3 flex items-center ">
            <form className="w-full text-sm bg-white rounded flex items-center gap-2">
              <button
                type="submit"
                className="w-12 flex-colo h-8 rounded text-subMain"
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
          <div className="col-span-3 flex items-center justify-end">
            <NavLink to="/dangkyvip" className={`${Hover} mx-9`}>
              <img src="/images/dang_ky_goi_vip.png" alt="dangkyvip" className="w-20 h-10 object-contain"/>
            </NavLink>
            <IoMdNotificationsOutline className="w-7 h-7 text-subMain cursor-pointer mr-2" />
            <FaRegUserCircle className="w-6 h-6 text-subMain cursor-pointer ml-4 mr-2" />
            <div className="dropdown">
              <button onClick={()=>{logout()}}>Đăng xuất</button>
            </div>
            <img src="/images/moon.png" id="icon" alt="avatar" className="w-8 h-8 object-contain" 
            style={{width: '40px', cursor: 'pointer'}}/>
          </div>
        </div>
      </div>
    
      {/* Thanh NavBar phụ */}
      <div className="bg-secondary shadow-md sticky top-12 z-10">
        <div className="container mx-auto py-2 px-2 lg:flex gap-4 justify-center items-center">
          <NavLink to="/phimbo" className={`${Hover} mx-4 text-subMain text-[13px] hover:text-customGreen`}>
            Phim Bộ
          </NavLink>
          <NavLink to="/phimdienanh" className={`${Hover} mx-4 text-subMain text-[13px] hover:text-customGreen`}>
            Phim Điện Ảnh
          </NavLink>
          <NavLink to="/hoathinh" className={`${Hover} mx-4 text-subMain text-[13px] hover:text-customGreen`}>
            Hoạt Hình
          </NavLink>
          <NavLink to="/tvshow" className={`${Hover} mx-4 text-subMain text-[13px] hover:text-customGreen`}>
            TV Show
          </NavLink>
          <NavLink to="/2n1d" className={`${Hover} mx-4 text-subMain text-[13px] hover:text-customGreen`}>
            2N1D
          </NavLink>
          <NavLink to="/anhtraisayhi" className={`${Hover} mx-4 text-subMain text-[13px] hover:text-customGreen`}>
            Anh Trai Say Hi
          </NavLink>
        </div>
      </div>
    </div>
  );
}

export default Navbar;