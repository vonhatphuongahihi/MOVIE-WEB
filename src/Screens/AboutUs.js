import React from "react";
import Head from "../Components/Head";
import Layout from "./../Layout/Layout";

function AboutUs() {
  return (
    <Layout>
      <div className="min-height-screen container mx-auto px-2 my-6">
        <Head title="About Us" />
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
    </Layout>
  );
}

export default AboutUs;
