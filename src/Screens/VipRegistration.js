import React from "react";
import { FaCheckCircle, FaStar } from "react-icons/fa";
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { useContext } from 'react';
import LayoutGuest1 from '../Layout/LayoutGuest1';
import Layout1 from "../Layout/Layout1";
import { UserContext } from '../Context/UserContext';

function VipRegistration() {
  const { isLoggedIn } = useContext(UserContext);
  const navigate = useNavigate();

  const vipPackages = [
    { id: 1, name: "VIP", price: 50000 },
    { id: 2, name: "VIP DISNEY", price: 100000 },
    { id: 3, name: "KHÔNG GIỚI HẠN", price: 200000 },
  ];

  const handleChooseVip = (price, name) => {
    navigate("/payment", { state: { amount: price, packageName: name } });
  };
  
  const LayoutComponent = isLoggedIn ? Layout1 : LayoutGuest1;
  return (
    <LayoutComponent>
      <div className="container bg-white text-black mx-auto p-5 pt-16">
        <button
          onClick={() => navigate(-1)} // Điều hướng quay lại trang trước
          className="text-2xl text-subMain ml-2 rounded-lg"
        >
          <IoIosArrowBack />
        </button>
        <h2 className="text-xl font-bold mb-5 text-left ml-10">CÁC GÓI VIP</h2>
        <div className="flex-col md:flex-row mb-10 text-sm md:text-md flex gap-x-5 ml-10">
          <p className="flex gap-x-1 items-center text-nowrap"><FaCheckCircle className="text-subMain"/>100,000+ giờ giải trí</p>
          <p className="flex gap-x-1 items-center text-nowrap"><FaCheckCircle className="text-subMain"/>Xem sớm nhất</p>
          <p className="flex gap-x-1 items-center text-nowrap"><FaCheckCircle className="text-subMain"/>Không quảng cáo</p>
          <p className="flex gap-x-1 items-center text-nowrap"><FaCheckCircle className="text-subMain"/>Thuyết minh/Lồng tiếng/Phụ đề</p>
          <p className="flex gap-x-1 items-center text-nowrap"><FaCheckCircle className="text-subMain"/>Full HD/4K</p>
        </div>

        <div className="flex-col md:flex-row flex justify-center items-center">
          {vipPackages.map((pkg) => (
            <div key={pkg.id} className="border-2 border-black rounded-lg p-5 w-80 mx-10 md:mx-5 mb-10">
              <img
                src={`/images/VIP_image_${pkg.id}.png`}
                alt="VIP Offer"
                className="w-full mb-5 rounded-md"
              />
              <button
                onClick={() => handleChooseVip(pkg.price, pkg.name)}
                className="bg-subMain w-full text-white py-2 px-4 rounded-lg transition mb-5 hover:bg-[#23a30f]"
                
              >
                Chọn gói VIP
              </button>
              <ul className="list-none text-left space-y-2 text-base">
                <li className="flex gap-x-3 items-center"><FaStar className="text-yellow-300"/> Phim/Show Onion độc quyền</li>
                <li className="flex gap-x-3 items-center"><FaStar className="text-yellow-300"/> Kho phim châu Á lớn nhất</li>
                <li className="flex gap-x-3 items-center"><FaStar className="text-yellow-300"/> Xem phim trên nhiều thiết bị</li>
              </ul>
            </div>
          ))}
        </div>

      </div>
    </LayoutComponent>
  );
}

export default VipRegistration;
