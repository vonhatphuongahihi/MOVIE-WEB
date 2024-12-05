import React from "react";
import { FiPhoneCall, FiMapPin, FiMail } from "react-icons/fi";
import Layout_main from "../Layout/Layout_main";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";


function ContactUs() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const ContactData = [
    {
      id: 1,
      title: "Email",
      info: "Quý khách có thể liên hệ với chúng tôi thông qua địa chỉ thư điện tử.",
      icon: FiMail,
      contact: "[email protected]",
    },
    {
      id: 2,
      title: "Điện thoại",
      info: "Hoặc gọi về số điện thoại. Chúng tôi luôn sẵn sàng phục vụ quý khách.",
      icon: FiPhoneCall,
      contact: "+84 365 486 141",
    },
    {
      id: 3,
      title: "Địa chỉ",
      info: "UIT ĐHQG HCM, Đường Hàn Thuyên, khu phố 6 P, Thủ Đức, Hồ Chí Minh, Việt Nam",
      icon: FiMapPin,
      contact: "",
    },
  ];
  const teamMembers = [
    { name: 'Võ Nhất Phương', picture: '/images/phuong.jpg' },
    { name: 'Lê Nguyễn Thùy Dương', picture: '/images/duong.jpg' },
    { name: 'Nguyễn Đăng Hương Uyên', picture: '/images/uyen.jpg' },
    { name: 'Hoàng Gia Minh', picture: '/images/minh.jpg' },
    { name: 'Lê Thiên Phúc', picture: '/images/phuc.jpg' },
  ];
  return (
    <Layout_main>
      <div className="min-height-screen container mx-auto px-2 my-6 text-center">
      <h3 style={{ fontWeight: 500, fontSize: '20px' }} className="text-2xl text-[20px] mb-4 mt-6 text-subMain text-center">
        LIÊN HỆ
      </h3>

        <div className="mb-12">
          <div className="flex flex-col lg:flex-row  p-6">
            <div className="w-full md:w-2/3 mb-6">
              <h3 className="text-xl font-semibold text-subMain mb-4">Thông tin liên hệ</h3>

              <div className="mb-6">
                <h3 className="text-lg font-semibold">Trụ sở chính</h3>
                <p>Địa chỉ: Đường Hàn Thuyên, khu phố 6 P, Thủ Đức, Hồ Chí Minh</p>
                <p>Điện thoại: (028) 372 52002</p>
                <p>
                  Email:{" "}
                  <a
                    href="mailto:[email protected]"
                    className="text-blue-500 hover:underline"
                  >
                    [email protected]
                  </a>
                </p>
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-semibold">Chi nhánh tại TP. Hồ Chí Minh</h3>
                <p>Địa chỉ: Đường Hàn Thuyên, khu phố 6 P, Thủ Đức, Hồ Chí Minh</p>
                <p>Điện thoại: (028) 39350867</p>
                <p>
                  Email:{" "}
                  <a
                    href="mailto:[email protected]"
                    className="text-blue-500 hover:underline"
                  >
                    [email protected]
                  </a>
                </p>
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-semibold">Chi nhánh tại Miền Bắc</h3>
                <p>Địa chỉ: 144 Đ. Xuân Thủy, Dịch Vọng Hậu, Cầu Giấy, Hà Nội</p>
                <p>
                  Email:{" "}
                  <a
                    href="mailto:[email protected]"
                    className="text-blue-500 hover:underline"
                  >
                    [email protected]
                  </a>
                </p>
              </div>
            </div>

            <div className="text-center">
              <img
                src="images/lienhe.png"
                alt="Contact"
                className="max-w-full rounded-lg shadow-md"
              />
              <p className="text-white mt-4">
                Mọi ý kiến đóng góp xin vui lòng gửi về chúng tôi. Xin chân thành cảm ơn!
              </p>
            </div>
          </div>
        </div>

        <h3 className="font-semibold text-xl text-subMain mb-4">Vị trí trên bản đồ</h3>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3723.213423010167!2d105.84917271529412!3d21.01370899300718!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ab64a1cb8f83%3A0xd5a9e5c9f4e0f8a2!2zNTUgUsOgbmcgVHJ1bmcgTmVndsOgbmggRGUgSGFpIFJhdHVuZywgSGFpbm9p!5e0!3m2!1svi!2s!4v1632952403450!5m2!1svi!2s"
          width="100%"
          height="450"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          title="Map Location"
        ></iframe>

        {/* Thêm thông tin footer trong Contact Us */}
        <div className="text-center mt-12">
        <h3 className="text-xl text-subMain font-semibold">Kết nối với chúng tôi</h3>
        <div className="flex justify-center space-x-5 mt-4">
            <a
              href="https://www.facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10"
            >
              <img src="/images/Facebook.png" alt="Facebook" />
            </a>
            <a
              href="https://www.tiktok.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10"
            >
              <img src="/images/Tiktok.png" alt="TikTok" />
            </a>
            <a
              href="https://www.instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10"
            >
              <img src="/images/Instagram.png" alt="Instagram" />
            </a>
            <a
              href="https://www.youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10"
            >
              <img src="/images/Youtube.png" alt="YouTube" />
            </a>
          </div>
        </div>
        {/* Team Section */}
        <div className="container px-6 my-12">
          <h3 className="text-xl font-semibold text-subMain mb-4 text-center">Ban quản lý</h3>
          <Swiper
            spaceBetween={30}
            loop={true}
            pagination={{ clickable: true }}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            breakpoints={{
              1024: {
                slidesPerView: 3, 
                spaceBetween: 50,
              },
              768: {
                slidesPerView: 2, 
                spaceBetween: 30,
              },
              640: {
                slidesPerView: 1, 
                spaceBetween: 20,
              },
            }}
            className="mySwiper"
          >
            {teamMembers.map((member, index) => (
              <SwiperSlide
                key={index}
                className="bg-white text-center rounded-lg shadow-md p-4"
              >
                <img
                  src={member.picture}
                  alt={member.name}
                  className="w-40 h-40 object-cover rounded-full mx-auto"
                />
                <h5 className="mt-4 text-lg font-semibold text-[#28bd11]">
                  {member.name}
                </h5>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

      </div>
      
    </Layout_main>
  );
}

export default ContactUs;