import React from 'react';
import './TermsPopup.css';
import { FaTimes } from 'react-icons/fa'; // Thêm icon đóng từ react-icons

const TermsPopup = ({ onClose }) => {
    return (
        <div className="terms-popup-overlay">
            <div className="terms-popup">
                <button className="close-button" onClick={onClose}>
                    <FaTimes />
                </button>
                <h2 style={{ fontSize: '20px', color: '#28bd11', textAlign: 'center' }}>Điều khoản của Melon</h2>
                <p>
                    <strong>1. Quyền truy cập:</strong><br/>
                    - Người dùng phải từ 6 tuổi trở lên để sử dụng dịch vụ. Việc truy cập và sử dụng trang web đồng nghĩa với việc bạn đồng ý với các điều khoản này.
                </p>
                <p>
                    <strong>2. Nội dung bản quyền:</strong><br/>
                    - Mọi nội dung trên Melon thuộc bản quyền của nhà cung cấp hoặc đối tác. Nghiêm cấm sao chép, tải xuống, hoặc phân phối khi chưa có sự đồng ý.
                </p>
                <p>
                    <strong>3. Trách nhiệm người dùng:</strong><br/>
                    - Không sử dụng trang web cho mục đích phi pháp.<br/>
                    Không can thiệp vào hoạt động của hệ thống hoặc sử dụng công cụ gây tổn hại cho trang web.
                </p>
                <p>
                    <strong>4. Dữ liệu cá nhân:</strong><br/>
                    - Melom cam kết bảo vệ dữ liệu cá nhân theo chính sách bảo mật.
                </p>
                <p>
                    <strong>5. Thay đổi dịch vụ:</strong><br/>
                    - Trang web có quyền thay đổi nội dung, chức năng, hoặc điều khoản sử dụng mà không cần thông báo trước.
                </p>
                <p>
                    <strong>6. Giới hạn trách nhiệm:</strong><br/>
                    - Melon không chịu trách nhiệm về nội dung từ bên thứ ba hoặc các sự cố kỹ thuật không mong muốn.
                </p>
            </div>
        </div>
    );
};

export default TermsPopup;