# **:memo:MELON - Website Xem Phim Trực Tuyến**

**MELON** là website xem phim trực tuyến hiện đại, mang đến trải nghiệm giải trí tuyệt vời với giao diện thân thiện và tính năng thông minh. Khám phá kho phim phong phú và dễ dàng lưu trữ các bộ phim yêu thích.

---
## 🎬 Tính Năng Nổi Bật

- **🎥 Xem phim chất lượng cao**: Trải nghiệm xem phim mượt mà với đa dạng tùy chọn chất lượng.
- **❤️ Danh sách yêu thích**: Lưu lại những bộ phim yêu thích của bạn để xem sau một cách dễ dàng.
- **📜 Lịch sử xem**: Lưu lại lịch sử xem của người dùng, không lo bỏ lỡ bất kỳ nội dung nào.
- **⏰ Hẹn giờ đi ngủ**: Đặt thời gian nhắc nhở đi ngủ, giúp bạn dù xem phim nhưng vẫn có thể quản lý thời gian của mình.
- **🌐 Chia sẻ phim lên mạng xã hội**: Dễ dàng chia sẻ phim yêu thích qua mạng xã hội hoặc mã QR với bạn bè.
- **💎 Đăng ký VIP**: Truy cập kho phim không giới hạn với gói thành viên VIP.
- **💬 Bình luận, đánh giá**: ham gia bình luận, đánh giá phim và chia sẻ cảm nghĩ với cộng đồng.
- **🔍 Tìm kiếm thông minh**: Tìm phim nhanh chóng với bộ lọc tìm kiếm.
- **🎞️ Kho phim và show truyền hình**: Cập nhật liên tục với hàng trăm bộ phim và các chương trình truyền hình, thực tế hấp dẫn như 2N1D, Anh trai say hi.
- **🤖 Chatbot thông minh**: Tìm kiếm thông tin, trả lời câu hỏi về website, giải đáp thắc mắc cho người dùng.

## ⚙️ Yêu Cầu Hệ Thống
- **🟢 Node.js**: Phiên bản 16 trở lên để đảm bảo tương thích với các thư viện và framework được sử dụng.
- **📦 npm**: Công cụ quản lý gói để cài đặt các phụ thuộc của dự án.

## 📚 Công nghệ sử dụng
- **React.js**: Phiên bản 16 trở lên để đảm bảo tương thích với các thư viện và framework được sử dụng.
- **Tailwind CSS**: Tạo giao diện đẹp mắt và hiện đại với các utility classes linh hoạt. Tailwind CSS giúp tối ưu hóa quy trình phát triển giao diện mà không cần phải viết nhiều CSS thủ công.
- **Firebase**: Lưu trữ và quản lý cơ sở dữ liệu trực tuyến với Firebase, cung cấp các dịch vụ như Realtime Database, Firestore và Authentication.
- **Momo Payment**: Tích hợp thanh toán nhanh cho ứng dụng, hỗ trợ người dùng thanh toán trực tuyến qua Momo.
- **Ngrok**: Tạo URL forwarding để thử nghiệm và chia sẻ ứng dụng ở môi trường phát triển. Ngrok giúp bạn tạo ra các URL tạm thời có thể chia sẻ cho các đối tác hoặc thử nghiệm từ xa.
- **Python**: Dùng để xây dựng chatbot, với các thư viện hỗ trợ như `nltk`, `transformers` để xử lý ngôn ngữ tự nhiên và trả lời tự động.
- **Node.js**: Cung cấp môi trường runtime cho JavaScript, hỗ trợ backend của ứng dụng và giúp xây dựng các API RESTful hoặc WebSocket cho việc xử lý giao tiếp giữa frontend và backend.

## 📂 Cấu Trúc Thư Mục Chính
```
├── vs/                    # Tài nguyên hỗ trợ hệ thống.
├── Data/                  # Dữ liệu nguồn hoặc bộ dữ liệu.
├── chipmunk/segmenter     # Công cụ phân đoạn văn bản.
├── experimental/          # Thử nghiệm và mã chưa hoàn chỉnh.
├── languages.shorttext/   # Tài nguyên xử lý văn bản ngắn.
├── languages/             # Tài nguyên ngôn ngữ cho mô hình NLP.
├── lemming/lemma/         # Công cụ lemmatization.
├── marmot/                # Công cụ xử lý dữ liệu.
├── net/arnx/jsonic/       # Thư viện mạng và JSON.
├── public/                # Tài nguyên tĩnh (hình ảnh, CSS, JS).
├── server/                # Mã nguồn server (Momo).
├── src/                   # Mã nguồn chính.
│   ├── Chatbot/           # Chức năng chatbot.
│   ├── Components/        # Thành phần giao diện người dùng.
│   ├── Context/           # Quản lý trạng thái.
│   ├── Data/              # Hỗ trợ dữ liệu và bộ lọc tìm kiếm.
│   ├── Layout/            # Bố cục giao diện.
│   ├── Screens/           # Các màn hình giao diện.
├── src_vn/                # Tài nguyên cho tiếng Việt.
├── vn/                    # Tài nguyên ngôn ngữ tiếng Việt.
├── .env                   # Biến môi trường.
├── .gitignore             # Tệp bỏ qua trong Git.
├── LICENSE                # Giấy phép dự án.
├── README.md              # Tài liệu dự án.
├── get-pip.py             # Cài đặt pip.
├── log4j.properties       # Cấu hình logging.
├── package.json           # Thông tin và phụ thuộc Node.js.
└── tailwind.config.js     # Cấu hình Tailwind CSS.
```
## :clipboard: **Hướng dẫn cài đặt**

1. **Tải mã nguồn và cài đặt**  

   Tải mã nguồn dự án về máy và cài đặt thư viện cần thiết:
   ```bash
   git clone https://github.com/vonhatphuongahihi/MOVIE-WEB
   cd MOVIE-WEB
   npm install aos firebase react-router-dom react-toastify styled-components react-icons classnames swiper 

2. **Cài đặt một số cấu hình cần thiết**

   2.1. Cài đặt ngrok
      - Truy cập [ngrok](https://ngrok.com/) và tạo tài khoản.  
      - Đăng nhập bằng tài khoản vừa tạo (hoặc đăng nhập bằng Google).  
      - Trong tab **Setup & Installation**, chọn **Download** và tải phiên bản ngrok phù hợp với hệ điều hành.  
      - Giải nén tệp zip và mở file `ngrok.exe`.

      2.2. Cấu hình và khởi chạy ngrok
      - Thêm mã xác thực cá nhân vào cấu hình bằng lệnh:
   
         ```bash
         ngrok config add-authtoken $YOUR_AUTHTOKEN
         ```
      - Thay `$YOUR_AUTHTOKEN` bằng giá trị trong mục **Your Authtoken** của tab **Your Authtoken**.
      - Chạy lệnh sau để thiết lập đường dẫn forwarding:
   
         ```bash
         ngrok http 5000
         ```
      - Sao chép đường dẫn forwarding xuất hiện ở mục **Forwarding**, ví dụ: `https://f53a-113-161-91-27.ngrok-free.app`.

      2.3. Cấu hình ipnUrl  
      - Mở file sau trong Visual Studio Code:
   
           ```
           server/src/momo/momo_server.js
           ```
      - Tìm đến dòng 40, chỉnh sửa giá trị của biến `ipnUrl` thành đường dẫn forwarding vừa sao chép, giữ nguyên phần `/callback` ở cuối. Sau đó lưu file lại.

      2.4. Khởi chạy server
      - Mở terminal mới và chạy lệnh:

         ```bash
         node .\server\src\momo\momo_server.js
         ```
3. **Cài đặt và khởi chạy Chatbot**

   3.1. Cài đặt Chabot
      - Di chuyển đến thư mục Chatbot:
   
         ```bash
         cd src/Chatbot
         ```
      - Tải các gói cần thiết:
      
         ```bash
         pip install transformers numpy sentence-transformers flask flask-cors
         ```
   3.2. Huấn luyện và chạy chatbot  
      - Huấn luyện mô hình chatbot:
          
         ```bash
         python train.py
         ```
      - Chạy chatbot:
       
         ```bash
         python chat.py
         ```
      - Khởi động chatbot với Flask:

        ```bash
         python chatbot.py
         ```
4. **Khởi động dự án**
  ```bash
   npm run start
  ```

## :rocket: **Tính Năng Sắp Tới**
- 🤖 Tích hợp AI gợi ý phim dựa trên sở thích người dùng
- 🌍 Hỗ trợ nhiều ngôn ngữ hơn
- 🌐 Phát triển website trên hosting
- 📱 Tạo app mobile MELON
  
## :link: **Liên Kết Quan Trọng**
- [Trang GitHub của dự án](https://github.com/vonhatphuongahihi/MOVIE-WEB)
- [Website deploy trên Vercel của MELON](https://melon-movie-web.vercel.app/)

## 📊 GitHub Stats
![GitHub stars](https://img.shields.io/github/stars/vonhatphuongahihi/MOVIE-WEB?style=social)
![GitHub forks](https://img.shields.io/github/forks/vonhatphuongahihi/MOVIE-WEB?style=social)
![GitHub issues](https://img.shields.io/github/issues/vonhatphuongahihi/MOVIE-WEB)
![GitHub pull requests](https://img.shields.io/github/issues-pr/vonhatphuongahihi/MOVIE-WEB)

## :email: **Liên Hệ**
Nếu bạn có bất kỳ câu hỏi nào hoặc cần hỗ trợ, vui lòng liên hệ với tôi qua email: [vonhatphuongahihi@gmail.com](mailto:vonhatphuong@gmail.com).

