import React, { useState } from "react";
import {
  getAuth,
  updatePassword,
  EmailAuthProvider,
  reauthenticateWithCredential,
} from "firebase/auth";

function ChangePasswordPopup({ onClose }) {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handlePasswordChange = async () => {
    setErrorMessage(""); // Reset lỗi
    setSuccessMessage(""); // Reset thông báo thành công

    if (!oldPassword || !newPassword || !confirmPassword) {
      setErrorMessage("Vui lòng nhập đầy đủ thông tin.");
      return;
    }

    if (newPassword.length < 6) {
      setErrorMessage("Mật khẩu mới phải chứa ít nhất 6 ký tự.");
      return;
    }
    if (newPassword === oldPassword) {
        setErrorMessage("Mật khẩu mới phải khác mật khẩu cũ.");
        return;
      }    

    if (newPassword !== confirmPassword) {
      setErrorMessage("Mật khẩu xác nhận không khớp.");
      return;
    }

    const auth = getAuth();
    const user = auth.currentUser;

    if (user) {
      try {
        const credential = EmailAuthProvider.credential(user.email, oldPassword);

        await reauthenticateWithCredential(user, credential);

        await updatePassword(user, newPassword);
        alert("Mật khẩu đã được cập nhật thành công!");
        setSuccessMessage("Mật khẩu đã được cập nhật thành công!");
        setOldPassword("");
        setNewPassword("");
        setConfirmPassword("");
        onClose(); 
      } catch (error) {
        setErrorMessage(
          "Lỗi: " + (error.message || "Vui lòng kiểm tra mật khẩu cũ.")
        );
      }
    } else {
      setErrorMessage("Không tìm thấy thông tin người dùng.");
    }
  };

  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-[#333333] p-6 rounded-md  w-[500px] shadow-lg">
        <h3 className="text-xl font-semibold mb-8 text-[#28bd11]" style={{ fontSize: "18px" }}
        >
          ĐỔI MẬT KHẨU
        </h3>

        <div className="mb-6">
          <label className="block mb-1 text-white">Mật khẩu cũ</label>
          <input
            type="password"
            className="w-full px-3 py-2 bg-[#111111] border border-gray-600 text-white rounded-[10px] focus:outline-none focus:ring-2 focus:ring-[#28bd11]"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            placeholder="Nhập mật khẩu cũ"
          />
        </div>

        <div className="mb-6">
          <label className="block mb-1 text-white">Mật khẩu mới</label>
          <input
            type="password"
            className="w-full px-3 py-2 bg-[#111111] border border-gray-600 text-white rounded-[10px] focus:outline-none focus:ring-2 focus:ring-[#28bd11]"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="Nhập mật khẩu mới"
          />
        </div>

        <div className="mb-6">
          <label className="block mb-1 text-white">Xác nhận mật khẩu</label>
          <input
            type="password"
            className="w-full px-3 py-2 bg-[#111111] border border-gray-600 text-white rounded-[10px] focus:outline-none focus:ring-2 focus:ring-[#28bd11]"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Nhập lại mật khẩu mới"
          />
        </div>

        {errorMessage && (
          <p className="text-red-500 text-sm text-center mb-4">
            {errorMessage}
          </p>
        )}
        {successMessage && (
          <p className="text-green-500 text-sm text-center mb-4">
            {successMessage}
          </p>
        )}

        <div className="flex justify-between mt-4">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition"
          >
            Hủy
          </button>
          <button
            type="button"
            onClick={handlePasswordChange}
            className="px-4 py-2 bg-[#28bd11] text-white rounded hover:bg-green-600 transition"
          >
            Đổi mật khẩu
          </button>
        </div>
      </div>
    </div>
  );
}

export default ChangePasswordPopup;
