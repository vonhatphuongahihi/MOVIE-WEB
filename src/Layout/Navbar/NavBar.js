import React, { useEffect, useState } from 'react';
import { FaRegUserCircle } from 'react-icons/fa';
import { IoFilter, IoListSharp } from "react-icons/io5";
import { Link, NavLink } from 'react-router-dom';
import FilterPopup from '../../Components/FilterPopup';
import NotificationIcon from '../../Components/Notification/NotificationIcon';
import SearchForm from '../../Components/SearchForm';
import { getUserProfile, logout } from "../../firebase";
import { getAuth } from "firebase/auth";
import './NavBar.css';

function Navbar() {
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
      if (!event.target.closest('.dropdown-menu')) {
        setMobileMenuOpen(false);
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
        <div div className="container mx-auto px-1 md:px-4 flex items-center justify-between">
          {/* Left Side - Logo */}
          <div className="flex items-center space-x-1 lg:space-x-4 text-subMain">
            <div className='block lg:hidden dropdown-menu'>
              <button onClick={toggleMobileMenu} className='mt-1'>
                <IoListSharp className="w-6 h-6 text-subMain cursor-pointer" />
              </button>              
            {isMobileMenuOpen && (
              <div className='absolute left-0 mt-1 bg-main shadow-lg rounded-lg w-48 py-1 z-20'>
                <NavLink 
                    to="/" 
                    className="flex items-center px-3 py-1.5 mt-1 hover:bg-[#545454] text-white text-sm"
                  >
                    <img src="/images/home_icon.svg" alt="Home Icon" className="w-4 h-4 inline-block mr-2 mb-1" />
                    Trang chủ
                  </NavLink>
                  <NavLink 
                    to="/phimdienanh" 
                    className="flex items-center px-16 py-1.5 mt-1 hover:bg-[#545454] text-white text-sm"
                  >
                    Phim Điện Ảnh
                  </NavLink>
                  <NavLink 
                    to="/anime" 
                    className="flex items-center px-16 py-1.5 mt-1 hover:bg-[#545454] text-white text-sm"
                  >
                    Anime
                  </NavLink>
                  <NavLink 
                    to="/2n1d" 
                    className="flex items-center px-16 py-1.5 mt-1 hover:bg-[#545454] text-white text-sm"
                  >
                    2N1D
                  </NavLink>
                  <NavLink 
                    to="/anhtraisayhi" 
                    className="flex items-center px-16 py-1.5 mt-1 hover:bg-[#545454] text-white text-sm"
                  >
                    Anh Trai Say Hi
                  </NavLink>
                  <NavLink 
                    to="/thethao" 
                    className="flex items-center px-3 py-1.5 mt-1 hover:bg-[#545454] text-white text-sm"
                  >
                    <img src="/images/sport_icon.svg" alt="Sport Icon" className="w-4 h-4 inline-block mr-2 mb-1" />
                    Thể thao
                  </NavLink>
                  <NavLink 
                    to="/thieunhi" 
                    className="flex items-center px-3 py-1.5 mt-1 hover:bg-[#545454] text-white text-sm"
                  >
                    <img src="/images/thieu_nhi_icon.svg" alt="TV Show Icon" className="w-5  h-5 inline-block mr-2 mb-1 text-subMain" />
                    Thiếu nhi
                  </NavLink>
              </div>
            )}
            </div>
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
          <div className="flex items-center space-x-1 w-1/3 z-20">
            <SearchForm />
            <button onClick={toggleFilterPopup} className="block">
              <IoFilter className="w-5 h-5 text-subMain cursor-pointer block" />
            </button>
          </div>

          {/* Right Side */}
          <div className="flex items-center space-x-1 lg:space-x-6">
            <NavLink to="/dangkyvip" className={getNavLinkClass}>
              <img src="/images/dang_ky_goi_vip.png" alt="VIP" className="w-15 lg:w-20 h-6 object-contain" />
            </NavLink>
            <NotificationIcon />
            <div className="relative dropdown-container">
              <button onClick={toggleDropdown} className="mx-0 lg:mx-4 mt-1">
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
          
        {/* Secondary NavBar */}
      <div  className={`${
          isScrolled
            ? 'bg-main bg-opacity-90'
            : 'bg-main bg-opacity-50'
        } shadow-md fixed left-0  border-t border-gray-400 border-opacity-50 right-0 z-10 block transition-all duration-300 hidden lg:block`}>
        <div className="container mx-auto py-1 px-2 flex gap-4 justify-center items-center text-center text-wrap text-xs sm:text-sm lg:text-base">
          <NavLink to="/phimdienanh" className={getNavLinkClass} style={{ fontSize: '14px' }}>Phim Điện Ảnh</NavLink>
          <img src="/images/divider.svg" alt="Line" className="w-1 h-4" />
          <NavLink to="/anime" className={getNavLinkClass} style={{ fontSize: '14px' }}>Anime</NavLink>
          <img src="/images/divider.svg" alt="Line" className="w-1 h-4" />
          <NavLink to="/2n1d" className={getNavLinkClass} style={{ fontSize: '14px' }}>2N1D</NavLink>
          <img src="/images/divider.svg" alt="Line" className="w-1 h-4" />
          <NavLink to="/anhtraisayhi" className={getNavLinkClass} style={{ fontSize: '14px' }}>Anh Trai Say Hi</NavLink>
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