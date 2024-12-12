import React from "react";
import { FiPhoneCall, FiMapPin, FiMail } from "react-icons/fi";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import Layout1 from "../Layout/Layout1";
import { useContext } from "react";
import LayoutGuest1 from '../Layout/LayoutGuest1';
import { UserContext } from '../Context/UserContext';
import './ContactUs.css';

function ContactUs() {
  const { isLoggedIn } = useContext(UserContext);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  
  const teamMembers = [
    { name: 'Võ Nhất Phương', picture: '/images/phuong.jpg' },
    { name: 'Lê Nguyễn Thùy Dương', picture: '/images/duong.jpg' },
    { name: 'Nguyễn Đăng Hương Uyên', picture: '/images/uyen.jpg' },
    { name: 'Hoàng Gia Minh', picture: '/images/minh.jpg' },
    { name: 'Lê Thiên Phúc', picture: '/images/phuc.jpg' },
  ];
  const LayoutComponent = isLoggedIn ? Layout1 : LayoutGuest1;
  return (
    <LayoutComponent>
      <div className="min-height-screen container mx-auto px-2 my-6 text-center">
      <h3 style={{ fontWeight: 500, fontSize: '20px' }} className="text-2xl text-[20px] mt-12 text-subMain text-center">
        LIÊN HỆ
      </h3>
        <div className="about__content container">
          <section>
            <div className="intro row">
              <img
                className="information col-3 col-sm-12"
                src="/images/logo-slogan.png"
                alt="Logo MELON"
              />
              <p className="information col-9 col-sm-12 body-large">
              MELON là nền tảng giải trí hàng đầu, nơi hội tụ mọi trải nghiệm Phim-Show-Bóng đá-Truyền hình, được phát triển bởi Tổ hợp công nghệ truyền thông giải trí DatVietVAC. Với MELON, người dùng không chỉ được tận hưởng kho nội dung khổng lồ mà còn tiếp cận giải pháp giải trí toàn diện, giúp mỗi phút giây giải trí trở nên trọn vẹn hơn. Hãy để MELON dẫn lối, biến mọi khoảnh khắc của bạn thành những trải nghiệm đầy sắc màu! 🌟
              </p>
            </div>
          </section>
        </div>

        <div className="mt-4">
          <img
            className="picture1"
            src="/images/phuonghihi.png"
            alt="Phương"
          />
        </div>

      
        <p className="camket">
        MELON cam kết trở thành người bạn đồng hành lý tưởng của mọi khán giả, truyền cảm hứng giải trí đỉnh cao thông qua kho nội dung phim, show, bóng đá và truyền hình đặc sắc. Chúng tôi không chỉ mang đến trải nghiệm xem mượt mà và đa dạng, mà còn góp phần kết nối cộng đồng yêu giải trí, tạo nên không gian sáng tạo và sẻ chia.
        </p>
        <p className="mongmuon">
        MELON mong muốn định hình thói quen giải trí hiện đại, trở thành cầu nối lan tỏa những giá trị văn hóa và niềm vui bất tận đến khán giả khắp mọi nơi. Cùng MELON, chúng ta kiến tạo một thế giới giải trí không biên giới, nơi mọi khoảnh khắc đều đáng giá!
        </p>

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
                className="bg-[#E0FBDC] text-center rounded-lg shadow-md p-4"
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
        
        <h3 className="font-semibold text-xl text-subMain mb-4">Vị trí trên bản đồ</h3>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3723.213423010167!2d105.84917271529412!3d21.01370899300718!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ab64a1cb8f83%3A0xd5a9e5c9f4e0f8a2!2zNTUgUsOgbmcgVHJ1bmcgTmVndsOgbmggRGUgSGFpIFJhdHVuZywgSGFpbm9p!5e0!3m2!1svi!2s!4v1632952403450!5m2!1svi!2s"
          width="80%"
          height="200"
          style={{ border: 0, display: 'block', margin: '0 auto' }}
          allowFullScreen=""
          loading="lazy"
          title="Map Location"
        ></iframe>

      </div>
      
    </LayoutComponent>
  );
}

export default ContactUs;