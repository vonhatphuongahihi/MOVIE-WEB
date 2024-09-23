import React from "react";
import { Link, NavLink } from "react-router-dom";
import { FaSearch, FaHeart } from "react-icons/fa";
import { FaRegUserCircle } from "react-icons/fa";
import { IoMdNotificationsOutline } from "react-icons/io";


function NavBar() {
  const hover = "hover:text-subMain transitions text-white";
  const Hover = ({ isActive }) => (isActive ? "text-subMain" : hover);

  return (
    <div className="bg-main shadow-md sticky top-0 z-20">
      <div className="container mx-auto py-2 px-2 lg:grid gap-12 grid-cols-10 justify-between items-center">
        <div className="col-span-4 flex items-center">
          <Link to="/" className="mr-2">
            <img src="/images/logo.png" alt="logo" className="w-20 h-6 object-contain" />
          </Link>
          <NavLink to="/" className={`${Hover} mx-2`}>
            <img src="/images/trangchu.png" alt="trangchu" className="w-30 h-12 object-contain" />
          </NavLink>
          <NavLink to="/truyenhinh" className={`${Hover} mx-2`}>
            <img src="/images/truyenhinh.png" alt="truyenhinh" className="w-30 h-12 object-contain"/>
          </NavLink>
          <NavLink to="/hbg" className={`${Hover} mx-2`}>
            <img src="/images/hbg.png" alt="hbg" className="w-30 h-12 object-contain"/>
          </NavLink>
          <NavLink to="/thethao" className={`${Hover} mx-2`}>
            <img src="/images/thethao.png" alt="thethao" className="w-30 h-12 object-contain"/>
          </NavLink>
          <NavLink to="/thieunhi" className={`${Hover} mx-2`}>
            <img src="/images/thieunhi.png" alt="thieunhi" className="w-30 h-12 object-contain"/>
          </NavLink>
        </div>
        {/* search Form */}
        <div className="col-span-3 flex items-center justify-end">
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
              className="font-medium placeholder:text-border text-sm w-11/12 h-8 bg-transparent border-none px-2 text-black"
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
        </div>
      </div>
    </div>
  );
}

export default NavBar;
