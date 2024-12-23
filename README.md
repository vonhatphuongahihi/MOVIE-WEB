# **MELON - Nền Tảng Xem Phim Trực Tuyến**

**MELON** là website xem phim trực tuyến hiện đại, mang đến trải nghiệm giải trí tuyệt vời với giao diện thân thiện và tính năng thông minh. Khám phá kho phim phong phú và dễ dàng lưu trữ các bộ phim yêu thích.

---

## **Cài đặt và khởi chạy dự án**

### **Yêu cầu hệ thống**
- **Node.js** (Phiên bản >= 16.x)
- **npm** (Được tích hợp sẵn với Node.js)

### **Hướng dẫn cài đặt**

1. **Tải mã nguồn và cài đặt**  
   Tải mã nguồn dự án về máy và cài đặt thư viện cần thiết:
   ```bash
   git clone https://github.com/vonhatphuongahihi/MOVIE-WEB
   cd MOVIE-WEB
   npm install aos firebase react-router-dom react-toastify styled-components react-icons classnames swiper transformers numpy sentence-transformers flask flask-cors

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

