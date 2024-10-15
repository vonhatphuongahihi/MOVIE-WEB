import React from "react";
import { FaRegUserCircle } from "react-icons/fa";
import { Link, NavLink } from "react-router-dom";

function Navbar2() {
  const hover = "hover:text-subMain transitions text-white";
  const activeClassName = "text-subMain border-b-2 border-green-500"; // Class cho trạng thái active

  const Hover = ({ isActive }) =>
    isActive ? activeClassName : hover;
  return (
    <div>

      <div className="bg-main shadow-md sticky top-0 z-20 border-b border-gray-300 border-opacity-50">
        <div className="container mx-auto py-0 px-2 flex justify-between items-center">
          <div className="flex items-center">
            <Link to="/" className="mr-2 mb-1">
              <img src="/images/logo.png" alt="logo" className="w-20 h-6 object-contain" />
            </Link>
          </div>
          <div className="flex items-center justify-end space-x-4 mt-2 mb-2 lg:mr-2">
            <NavLink to="/about-us" className="w-auto px-4 h-10 flex items-center justify-center object-contain hover:text-subMain text-[15px]">
              Khuyến mãi
            </NavLink>
            <NavLink to="/about-us" className="w-auto px-4 h-10 flex items-center justify-center object-contain hover:text-subMain text-[15px]">
              Về MELON
            </NavLink>
            <NavLink to="/support" className="w-auto px-4 h-10 flex items-center justify-center object-contain hover:text-subMain text-[15px]">
              Hỗ trợ
            </NavLink>
            <NavLink to="/profile" className="mx-4">
              <FaRegUserCircle className="w-6 h-6 text-subMain cursor-pointer" />
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar2;