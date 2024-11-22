import React from "react";
import { FiPhoneCall, FiMapPin, FiMail } from "react-icons/fi";
import Layout2 from "../Layout/Layout_2";

function ContactUs() {
  const ContactData = [
    {
      id: 1,
      title: "Email",
      info: "Quý khách có thể liên hệ với chúng tôi thông qua địa chỉ thư điện tử.",
      icon: FiMail,
      contact: "melon@gmail.com",
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
      info: "UIT ĐHQG HCM, Đông Hòa, Dĩ An, Bình Dương, Việt Nam,",
      icon: FiMapPin,
      contact: "",
    },
  ];
  return (
    <Layout2>
      <div className="min-height-screen container mx-auto px-2 my-6">
        <h2 className="text-xl lg:text-3xl font-semibold text-subMain">
          LIÊN HỆ
        </h2>
        <div className="mb-12">
          <div className="container mx-auto p-6 font-sans flex flex-col md:flex-row">
            <div className="truso w-full md:w-2/3 mb-6 md:mb-0">
              <div className="mb-6">
                <h2 className="text-2xl font-semibold">Trụ sở chính</h2>
                <p>
                  Địa chỉ: Đường Hàn Thuyên, khu phố 6 P, Thủ Đức, Hồ Chí Minh
                </p>
                <p>Điện thoại: (028) 372 52002</p>
                <p>Fax: (028) 372 52148</p>
                <p>
                  Email:{" "}
                  <a
                    href="mailto:contact@nxbkimdong.com.vn"
                    className="text-blue-500 hover:underline"
                  >
                    melon@gmail.com
                  </a>
                </p>
              </div>

              <div className="mb-6">
                <h2 className="text-2xl font-semibold">
                  Chi nhánh tại TP. Hồ Chí Minh
                </h2>
                <p>
                  Địa chỉ: Đường Hàn Thuyên, khu phố 6 P, Thủ Đức, Hồ Chí Minh
                </p>
                <p>Điện thoại: (028) 39350867</p>
                <p>
                  Email:{" "}
                  <a
                    href="mailto:cnkmindo@nxbkimdong.com.vn"
                    className="text-blue-500 hover:underline"
                  >
                    melon_hcm@gmail.com
                  </a>
                </p>
              </div>

              <div className="mb-6">
                <h2 className="text-2xl font-semibold">
                  Chi nhánh tại Miền Bắc
                </h2>
                <p>144 Đ. Xuân Thủy, Dịch Vọng Hậu, Cầu Giấy, Hà Nội</p>
                <p>
                  Email:{" "}
                  <a
                    href="mailto:contact@nxbkimdong.com.vn"
                    className="text-blue-500 hover:underline"
                  >
                    melon_hn@gmail.com
                  </a>
                </p>
              </div>
            </div>
            <div className="text-center">
              <img
                src="https://mennonitebusinessconference.com/wp-content/uploads/2024/04/contactus.jpg"
                alt="FAQ Illustration"
                className="max-w-full rounded-lg shadow-md"
              />
              <p className="text-white mt-4">
                Mọi ý kiến đóng góp xin vui lòng gửi về chúng tôi. Xin chân
                thành cảm ơn!
              </p>
            </div>
          </div>
        </div>
        <div className="grid mg:grid-cols-2 gap-6 lg:my-20 my-10 lg:grid-cols-3 xl:gap-8">
          {ContactData.map((item) => (
            <div
              key={item.id}
              className="border border-border flex-colo p-10 bg-dry rounded-lg text-center"
            >
              <span className="flex-colo w-20 h-20 mb-4 rounded-full bg-main text-subMain text-2xl">
                <item.icon />
              </span>
              <h5 className="text-xl font-semibold mb-2">{item.title}</h5>
              <p className="mb-0 text-sm text-text leading-7">
                <a href={`mailto:${item.contact}`} className="text-blue-600">
                  {item.contact}
                </a>{" "}
                {item.info}
              </p>
            </div>
          ))}
        </div>
        <div className="mb-6">
          <h2 className="text-l lg:text-2xl mb-4 font-semibold text-subMain">
            Vị trí trên bản đồ:
          </h2>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3723.213423010167!2d105.84917271529412!3d21.01370899300718!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ab64a1cb8f83%3A0xd5a9e5c9f4e0f8a2!2zNTUgUsOgbmcgVHJ1bmcgTmVndsOgbmggRGUgSGFpIFJhdHVuZywgSGFpbm9p!5e0!3m2!1svi!2s!4v1632952403450!5m2!1svi!2s"
            width="100%"
            height="450"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            title="Map Location"
          ></iframe>
        </div>
      </div>
    </Layout2>
  );
}

export default ContactUs;
