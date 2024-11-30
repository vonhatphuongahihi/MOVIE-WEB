import React from "react";
import { deleteUserProfile, logout } from "../../firebase";
import { useNavigate } from "react-router-dom";

const DeleteAccountPopup = ({ onClose }) => {
    const navigate = useNavigate();
    const deleteAccount = async () => {
        try {
          const success = await deleteUserProfile();
          if (success) {
            onClose();
            logout(); 
            navigate("/login");
          } else {
            alert("Có lỗi xảy ra khi xóa tài khoản.");
          }
        } catch (error) {
          console.error("Lỗi khi xóa tài khoản:", error);
        }
      };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-96 p-6">
        <h2 className="text-xl font-bold text-red-600 mb-4">XÓA TÀI KHOẢN</h2>
        <p className="font-bold text-black">Hậu quả của việc xóa tài khoản vĩnh viễn của bạn:</p>
        <ol className="list-decimal list-inside mt-4 space-y-2 text-gray-600">
          <li>
            Bạn sẽ không thể đăng nhập, truy cập, sử dụng hoặc kích hoạt lại tài khoản này nữa.
          </li>
          <li>
            Tất cả các quyền lợi của tài khoản này, chẳng hạn như quyền lợi
            thành viên và điểm tích lũy sẽ bị xóa và không có khoản hoàn tiền nào.
          </li>
          <li>
            Nội dung, thông tin, dữ liệu và hồ sơ dưới tài khoản này, ví dụ: lịch sử xem, yêu thích,... sẽ bị xóa.
          </li>
        </ol>
        <div className="flex justify-end mt-6 space-x-4">
          
          <button
            onClick={onClose} // Gọi hàm đóng Popup
            className="px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-800 rounded-lg"
          >
            Hủy bỏ
          </button>
          
          <button
            onClick={deleteAccount}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg"
          >
            Xóa
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteAccountPopup;
