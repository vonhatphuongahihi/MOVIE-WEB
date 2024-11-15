import React from "react";
import Head from "../Components/Head";
import Layout_2 from "./../Layout/Layout_2";

function AboutUs() {
  return (
    <Layout_2>
      <div className="min-height-screen container mx-auto px-2 my-6">
        {/*Khuyen mai-làm trưng hoi, chứ hổng bấm vô được đâu :)))*/}
        <div className="xl:pt-20 pt-10 px-4">
          <h3 className="text-xl lg:text-3xl mb-4 font-semibold text-subMain">
                KHUYẾN MÃI
          </h3>  
          <div className="grid grid-flow-row xl:grid-cols-4 gap-4 xl:gap-10 items-center ">
            <div className="w-full bg-dry items-center rounded-lg p-5">
            <img src="/images/KM1.png" alt="khuyen-mai-1"
            className="w-full h-1/2 h-auto rounded-lg mb-5"
            />
              <div className="w-full text-lg text-text font-bold mb-5">
                <p>Giảm 10% tối đa 20K cho khách hàng
                  lần đầu thanh toán gói Melon bằng ZaloPay                  
                </p>
              </div>
            <div className="bg-text h-px"></div>  {/*đường kẻ*/}
            <div className="w-full text-base text-text mt-5">
                <p>{new Date() > new Date('2024-11-20')?"Đã hết hạn":"Thời hạn: từ 15/11 đến 20/11"}                 
                </p>
              </div>
            </div>
            <div className="w-full bg-dry items-center rounded-lg p-5">
            <img src="/images/KM2.png" alt="khuyen-mai-1"
            className="w-full h-1/2 h-auto rounded-lg mb-5"
            />
              <div className="w-full text-lg text-text font-bold mb-5">
                <p>Tri ân ngày Nhà Giáo Việt Nam (20/11) tặng ngay gói
                  VIP 3 tháng chỉ 199K                  
                </p>
              </div>
            <div className="bg-text h-px"></div>  {/*đường kẻ*/}
            <div className="w-full text-base text-text mt-5">
                <p>{new Date() > new Date('2024-12-01')?"Đã hết hạn":"Thời hạn: từ 15/11 đến 1/12"}                 
                </p>
              </div>
            </div>
            <div className="w-full bg-dry items-center rounded-lg p-5">
            <img src="/images/KM3.png" alt="khuyen-mai-1"
            className="w-full h-1/2 h-auto rounded-lg mb-5"
            />
              <div className="w-full text-lg text-text font-bold mb-5">
                <p>HOT: Tri ân Phụ nữ Việt Nam (20/10) giảm 20%
                  khi đăng ký gói 3 tháng tại Melon               
                </p>
              </div>
            <div className="bg-text h-px"></div>  {/*đường kẻ*/}
            <div className="w-full text-base text-text mt-5">
                <p>{new Date() > new Date('2024-11-01')?"Đã hết hạn":"Thời hạn: từ 15/10 đến 1/11"}                 
                </p>
              </div>
            </div>
            <div className="w-full bg-dry items-center rounded-lg p-5">
            <img src="/images/KM4.png" alt="khuyen-mai-1"
            className="w-full h-1/2 h-auto rounded-lg mb-5"
            />
              <div className="w-full text-lg text-text font-bold mb-5">
                <p>Vui trung thu: Giảm 20% gói 3 tháng cho các "bé thiếu nhi" xem phim thả ga!      
                </p>
              </div>
            <div className="bg-text h-px"></div>  {/*đường kẻ*/}
            <div className="w-full text-base text-text mt-5">
                <p>{new Date() > new Date('2024-09-20')?"Đã hết hạn":"Thời hạn: từ 10/9 đến 20/9"}                
                </p>
              </div>
            </div>
          </div>
        </div>

        {/*Gioi thieu*/}
        <div className="xl:py-20 py-10 px-4">
          <div className="grid grid-flow-row xl:grid-cols-2 gap-4 xl:gap-16 items-center">
            <div>
              <h3 className="text-xl lg:text-3xl mb-4 font-semibold text-subMain">
                GIỚI THIỆU VỀ MELON
              </h3>
              <div className="mt-3 text-sm leading-8 text-text">
                <p>
                  MELON là siêu ứng dụng giải trí xem Phim-Show-Bóng đá-Truyền
                  hình được phát triển bởi Tổ hợp công nghệ truyền thông giải
                  trí DatVietVAC. MELONmang đến cho người dùng giải pháp giải trí
                  toàn diện với những tiện ích nổi trội bao gồm: <br />
                </p>
                <div>
                <ul style={{ listStyleType: "disc"}} >
                  <li className=" mt-8"> <strong>Hàng trăm ngàn nội dung hấp dẫn:</strong>
                  <ul className=" px-10">
                    <li>
                      {" "}
                      -MELON Original: Loạt phim, show độc quyền do VieON sản
                      xuất: 7 Năm Chưa Cưới Sẽ Chia Tay, Yêu Trước Ngày Cưới,
                      Ước Mình Cùng Bay, Anh Trai 'Say Hi', 2 Ngày 1 Đêm,
                    </li>
                    <li>
                      {" "}
                      -Phim truyền hình Châu Á mới nhất chiếu song song với nước
                      sản xuất như Trung, Nhật, Hàn,...
                    </li>
                    <li>-Hơn 140 kênh truyền hình trong nước và quốc tế...</li>
                    <li>-Kho phim HBO GO đình đám.</li>
                    <li>
                      -Livestream các sự kiện giải trí đình đám như đại nhạc hội,
                      sự kiện văn hóa, thời trang trực tiếp từ khắp nơi trên thế
                      giới.
                    </li>
                    <li>
                      {" "}
                      -Kho nội dung VOD đồ sộ: Loạt phim điện ảnh kinh điển trên
                      toàn thế giới và các chương trình giải trí không giới hạn.
                    </li>
                    <li>
                      -Trọn vẹn và sắc nét các giải thể thao hấp dẫn nhất hành
                      tinh: Premier League (Ngoại Hạng Anh)
                    </li>
                  </ul> </li>

                  <li className=" mt-8 "><strong>Trải nghiệm người dùng mượt mà, linh hoạt</strong>
                  <ul className=" px-10">
                    <li>
                      {" "}
                      -Chất lượng hình ảnh Full HD/4K, không quảng cáo đối với
                      các gói trả phí.
                    </li>
                    <li>
                      -Công nghệ Đề xuất nội dung (Recommendation) và Cá nhân hóa
                      trải nghiệm (Personalization) giúp phân bổ nội dung theo
                      sở thích của người dùng.
                    </li>
                    <li>-Tùy chọn phụ đề, lồng tiếng, thuyết minh</li>
                    <li>
                      -Sử dụng được trên mọi thiết bị: Điện thoại, Smart TV, Máy
                      Tính Bảng, Laptop
                    </li>
                  </ul> </li>
                </ul>
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-6 mt-8">
                <div className="p-8 bg-dry rounded-lg">
                  <span className="text-3xl block font-extrabold">10K</span>
                  <h4 className="text-lg font-semibold my-2">Bộ phim</h4>
                  <p className="mb-0 text-text leading-7 text-sm">
                  Mang đến trải nghiệm giải trí phong phú, chất lượng cao
                  </p>
                </div>
                <div className="p-8 bg-dry rounded-lg">
                  <span className="text-3xl block font-extrabold">8K</span>
                  <h4 className="text-lg font-semibold my-2">Người dùng</h4>
                  <p className="mb-0 text-text leading-7 text-sm">
                  Khám phá thế giới giải trí không giới hạn với hàng ngàn người dùng!
                  </p>
                </div>
              </div>
            </div>
            <img
              src="/images/Khuyenmai.png"
              alt="aboutus"
              className="w-full xl:block hidden h-header rounded-lg object-cover"
            />
          </div>
        </div>
      </div>
    </Layout_2>
  );
}

export default AboutUs;
