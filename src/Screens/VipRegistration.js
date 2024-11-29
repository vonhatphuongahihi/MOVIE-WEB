import React from "react";
import { FaCheckCircle, FaStar } from "react-icons/fa";
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import LayoutMain from "../Layout/Layout_main";

function VipRegistration() {
  const navigate = useNavigate();

  const vipPackages = [
    { id: 1, name: "VIP", price: 50000 },
    { id: 2, name: "VIP DISNEY", price: 100000 },
    { id: 3, name: "KHÔNG GIỚI HẠN", price: 200000 },
  ];

  const handleChooseVip = (price, name) => {
    navigate("/payment", { state: { amount: price, packageName: name } });
  };

  return (
    <LayoutMain>
      <div className="container bg-white text-black mx-auto p-5 pt-16">
        <button
          onClick={() => navigate(-1)} // Điều hướng quay lại trang trước
          className="text-2xl text-subMain ml-2 rounded-lg"
        >
          <IoIosArrowBack />
        </button>
        <h2 className="text-xl font-bold mb-5 text-left ml-10">CÁC GÓI VIP</h2>
        <div className="mb-10 text-md flex gap-x-5 ml-16">
          <p className="flex gap-x-1 items-center"><FaCheckCircle className="text-subMain"/>100,000+ giờ giải trí</p>
          <p className="flex gap-x-1 items-center"><FaCheckCircle className="text-subMain"/>Xem sớm nhất</p>
          <p className="flex gap-x-1 items-center"><FaCheckCircle className="text-subMain"/>Không quảng cáo</p>
          <p className="flex gap-x-1 items-center"><FaCheckCircle className="text-subMain"/>Thuyết minh/Lồng tiếng/Phụ đề</p>
          <p className="flex gap-x-1 items-center"><FaCheckCircle className="text-subMain"/>Full HD/4K</p>
        </div>

        <div className="flex space-x-10 ml-10 mb-16">
          {vipPackages.map((pkg) => (
            <div key={pkg.id} className="border-2 border-black rounded-lg p-5 w-80">
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
    </LayoutMain>
  );
}

export default VipRegistration;
