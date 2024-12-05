import React, { useEffect, useState } from 'react';
import { FaRegUserCircle } from 'react-icons/fa';
import { IoFilter } from "react-icons/io5";
import { Link, NavLink } from 'react-router-dom';
import FilterPopup from '../../Components/FilterPopup';
import NotificationIcon from '../../Components/Notification/NotificationIcon';
import SearchForm from '../../Components/SearchForm';
import { getUserProfile, logout } from "../../firebase";
import { getAuth } from "firebase/auth";
import './NavBar.css';

function Navbar_main() {
  const hover = "hover:text-subMain transition text-subMain";
  const activeClassName = "relative text-subMain border-b-2 border-green-500";
  
  const getNavLinkClass = ({ isActive }) => {
    return isActive ? `${activeClassName} text-subMain` : hover;
  };
  const [isScrolled, setIsScrolled] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isFilterPopupOpen, setFilterPopupOpen] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState(null);
  const toggleDropdown = () => {
    setShowDropdown((prev) => !prev);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen((prev) => !prev);
  };

  const toggleFilterPopup = () => {
    setFilterPopupOpen((prev) => !prev);
  };

  // Lấy avatar khi người dùng đã đăng nhập.
  useEffect(() => {
    const fetchUserAvatar = async () => {
      const auth = getAuth();
      const user = auth.currentUser;

      if (user) {
        const userProfile = await getUserProfile(user.uid); // Hàm lấy dữ liệu từ Firestore
        if (userProfile?.avatarUrl) {
          setAvatarUrl(userProfile.avatarUrl); // Lưu avatar URL vào state
        }
      }
    };

    fetchUserAvatar();
  }, []);

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
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true); 
      } else {
        setIsScrolled(false); 
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div>
      {/* Main NavBar */}
      <div className="bg-main shadow-md fixed top-0 left-0 right-0 z-20 border-b border-gray-300 text-nowrap text-center text-base xl:text-base text-subMain fixed-font">
        <div div className="container mx-auto px-4 flex items-center justify-between">
          {/* Left Side - Logo */}
          <div className="flex items-center space-x-4 text-subMain">
            <Link to="/" className="mr-2">
              <img src="/images/logo.png" alt="logo" className="w-20 h-10 object-contain" />
            </Link>
            <div className="hidden lg:flex space-x-6">
              <NavLink to="/" className={getNavLinkClass} style={{ fontSize: '14px' }}>
                <img src="/images/home_icon.svg" alt="Home Icon" className="w-4 h-4 inline-block mr-2 mb-1" />
                Trang chủ
              </NavLink>
              <NavLink to="/thethao" className={getNavLinkClass} style={{ fontSize: '14px' }}>
                <img src="/images/sport_icon.svg" alt="Sport Icon" className="w-4 h-4 inline-block mr-2 mb-1" />
                Thể thao
              </NavLink>
              <NavLink to="/thieunhi" className={getNavLinkClass} style={{ fontSize: '14px' }}>
                <img src="/images/thieu_nhi_icon.svg" alt="TV Show Icon" className="w-5  h-5 inline-block mr-2 mb-1 text-subMain" />
                Thiếu nhi
              </NavLink>
            </div>
          </div>

          {/* Search Form */}
          <div className="flex items-center space-x-2 w-1/3 z-20">
            <SearchForm />
            <button onClick={toggleFilterPopup} className="block">
              <IoFilter className="w-5 h-5 text-subMain cursor-pointer hidden lg:block" />
            </button>
          </div>

          {/* Right Side */}
          <div className="flex items-center space-x-6">
            <NavLink to="/dangkyvip" className={getNavLinkClass}>
              <img src="/images/dang_ky_goi_vip.png" alt="VIP" className=" w-20 h-6 object-contain" />
            </NavLink>
            <NotificationIcon />
            <div className="relative dropdown-container">
              <button onClick={toggleDropdown} className="mx-4 mt-1">
                {avatarUrl ? (
                    <img
                      src={avatarUrl}
                      alt="User Avatar"
                      className="w-6 h-6 rounded-full object-cover cursor-pointer"
                    />
                  ) : (
                    <FaRegUserCircle className="w-6 h-6 text-subMain cursor-pointer" />
                  )}
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

export default Navbar_main;