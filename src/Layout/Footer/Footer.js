import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  const Links = [
    {
      title: "Giới thiệu",
      links: [
        {
          name: "Trang chủ",
          link: "/",
        },
        {
          name: "Giới thiệu về Melon",
          link: "/about-us",
        },
        {
          name: "Liên hệ",
          link: "/contact-us",
        },
        
      ],
    },
    {
      title: "Quy định",
      links: [
        {
          name: "Hợp đồng điện tử",
          link: "/support",
        },
        {
          name: "Điều khoản và điều kiện",
          link: "/support",
        },
        {
          name: "Chính sách bảo vệ thông tin cá nhân",
          link: "/support",
        },
        
      ],
    },
    {
      title: "Thông tin",
      links: [
        {
          name: "Thông báo",
          link: "#",
        },
        {
          name: "FAQs",
          link: "#",
        },
        {
          name: "Tải ứng dụng",
          link: "#",
        },
        
      ],
    },
  ];
  return (
    <div className="bg-dry py-4 bprder=t-2 border-black">
      <div className="container mx-auto px-2">
        <div className="grid grid-cols-2 md:grid-cols-7 xl:grid-cols-12 gap-5 sm:gap-9 lg:gap-11 xl:gap-7 py-10 justify-between">
          <div className="pb-3.5 sm:pb-0 col-span-1 md:col-span-2 lg:col-span-3 mx-10">
            <Link to="/">
              <img
                src="/images/logo.png"
                alt="logo"
                className="w-2/4 object-contain h-15"
              />
            </Link>

            <img
              src="/images/Link_2.png"
              alt="logo"
              className="w-2/4 object-contain h-10 mt-3"
            />
            <img
              src="/images/Link.png"
              alt="logo"
              className="w-2/4 object-contain h-10 mt-3"
            />
          </div>

          {Links.map((link, index) => (
            <div
              key={index}
              className="col-span-1 md:col-span-2 lg:col-span-3 pb-3.5 sm:pb-0"
            >
              <h3 className="text-md lg:leading-7 font-medium mb-4 sm:mb-5 lg:mb-6 pb-0.5">
                {link.title}
              </h3>
              <ul className="text-sm flex flex-col space-y-3">
                {link.links.map((text, index) => (
                  <li key={index} className="flex items-baseline">
                    <Link
                      to={text.link}
                      className="text-border inline-block w-full hover:text-subMain"
                    >
                      {text.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex flex-row justify-between">
          <p className="leading-7 text-sm text-border mt-3">
            <span>UIT ĐHQG HCM, Đông Hòa, Dĩ An, Bình Dương, Việt Nam</span>
            <br />
            <span>Hotline: +84 365 486 141</span>
            <br />
            <span>
              Giấy phép Cung cấp Dịch vụ Phát thanh, Truyền hình trả tiền số
              247/GP-BTTTT cấp ngày 21/07/2023.
            </span>{" "}
            <br />
            <span>
              Giấy Chứng Nhận Đăng Ký Doanh Nghiệp số: 0314415573 do Sở Kế Hoạch
              Đầu Tư Thành Phố Hồ Chí Minh cấp ngày 19/05/2017
            </span>
          </p>
          <div className="mr-40 mt-8">
            <p>Liên hệ với chúng tôi</p>
            <div className="flex flex-row gap-5">
              <img
                src="/images/Facebook.png"
                alt="logo"
                className="w-2/4 object-contain h-10 mt-3"
              />
              <img
                src="/images/Tiktok.png"
                alt="logo"
                className="w-2/4 object-contain h-10 mt-3"
              />

              <img
                src="/images/Instagram.png"
                alt="logo"
                className="w-2/4 object-contain h-10 mt-3"
              />
              <img
                src="/images/Youtube.png"
                alt="logo"
                className="w-2/4 object-contain h-10 mt-3"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
