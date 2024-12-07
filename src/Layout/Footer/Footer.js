import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" }); 
  }

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
      ],
    },
   
    {
      title: "Thông tin",
      links: [
        {
          name: "Hỗ trợ",
          link: "/support",
        },
        {
          name: "FAQs",
          link: "/faqs",
        },
        {
          name: "Liên hệ",
          link: "/contact-us",
        },
      ],
    },
    {
      title: "Dịch vụ",
      links: [
        {
          name: "Hợp đồng điện tử",
          link: "/support#4",
        },
        {
          name: "Điều khoản và điều kiện",
          link: "/support#5",
        },
        {
          name: "Chính sách bảo vệ thông tin cá nhân",
          link: "/support#6",
        },
      ],
    },
  ];
  return (
    <div className="bg-main py-4 border-t border-gray-400 border-opacity-50" onClick={scrollToTop}>
      <div className="container mx-auto px-2">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-col-7 xl:grid-cols-12 gap-5 sm:gap-9 lg:gap-11 xl:gap-7 py-10 justify-between">
          <div className="pb-3.5 sm:pb-0 col-span-1 md:col-span-2 lg:col-span-1 xl:col-span-3 mx-5 md:mx-10">
            <Link to="/">
              <img
                src="/images/logo.png"
                alt="logo"
                className="w-4/5 md:w-2/4 object-contain h-15"
              />
            </Link>

            <img
              src="/images/Link_2.png"
              alt="logo"
              className="w-4/5 md:w-2/4 object-contain h-10 mt-3"
            />
            <img
              src="/images/Link.png"
              alt="logo"
              className="w-4/5 md:w-2/4 object-contain h-10 mt-3"
            />
          </div>

          {Links.map((link, index) => (
            <div
              key={index}
              className="col-span-1 md:col-span-2 lg:col-span-1 xl:col-span-3 pb-3.5 sm:pb-0 mx-5 md:mx-10"
            >
              <h3 className="text-md lg:leading-7 font-medium mb-4 sm:mb-5 lg:mb-6 pb-0.5 text-subMain">
  {link.title}
              </h3>

              <ul className="text-sm flex flex-col space-y-3">
                {link.links.map((text, index) => (
                  <li key={index} className="flex items-baseline">
                    <Link
                      to={text.link}

                      className="text-border inline-block w-full hover:text-white"
                    >
                      {text.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="ml-5 lg:ml-10 flex flex-row justify-between gap-x-5 lg:gap-x-10">
          <p className="leading-7 text-sm text-border mt-3">
            <span>UIT ĐHQG HCM, Đường Hàn Thuyên, khu phố 6 P, Thủ Đức, Hồ Chí Minh, Việt Nam</span>
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
          <div className="mr-5 lg:mr-40 mt-8 text-subMain w-3/5 md:w-2/5 lg:w-1/5">
            <p>Liên hệ với chúng tôi</p>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-1 lg:gap-5">
              <a
                href="https://www.facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full object-contain h-10 mt-3"
              >
                <img src="/images/Facebook.png" alt="logo" />
              </a>

              <a
                href="https://www.tiktok.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full object-contain h-10 mt-3"
              >
                <img src="/images/Tiktok.png" alt="logo" />
              </a>

              <a
                href="https://www.instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full object-contain h-10 mt-3"
              >
                <img src="/images/Instagram.png" alt="logo" />
              </a>
              <a
                href="https://www.youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full object-contain h-10 mt-3"
              >
                <img src="/images/Youtube.png" alt="logo" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
