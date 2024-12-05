import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { sendPasswordResetEmail } from "firebase/auth";
import { toast } from "react-toastify";
import { auth } from "../firebase";
import "./ForgotPassword.css";

function ForgotPassword() {
  const [forgot, setForgotState] = useState("Trang1");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Chuyển hướng về trang đăng nhập
  const goToLogin = () => {
    navigate("/login");
  };

  // Gửi email reset password
  const handleSendEmail = async () => {
    setLoading(true);
     // Kiểm tra trường email
     if (!email) {
      toast.error("Vui lòng nhập email."); 
      setLoading(false);
      return;
  }

  // Kiểm tra định dạng email (regex cơ bản)
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
      toast.error("Email không hợp lệ. Vui lòng nhập đúng định dạng."); 
      setLoading(false);
      return;
  }
    try {
      await sendPasswordResetEmail(auth, email);
      setForgotState("Trang2"); // Chuyển sang Trang2 sau khi gửi email
    } catch (error) {
      console.error("Lỗi khi gửi email: ", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="forgot-password-container">
      <img className="forgot-password-logo hidden md:block" src="../../images/logo.png" alt="logo Melon" />
      <div className="forgot-password-box">
        <div className="forgot-password-content">
          <img src="/images/logo.png" alt="Logo" className="form-logo" />
          {forgot === "Trang1" ? (
            <div className="forgot-password-step">
              <div className="forgot-password-text">
                Để tiếp tục quá trình thiết lập lại mật khẩu, vui lòng nhập email của bạn.
              </div>
              <input
                className="forgot-password-input"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <div className="forgot-password-button" onClick={handleSendEmail} disabled={loading}>
                <div className="button-text">Tiếp tục</div>
              </div>
              <div className="forgot-password-back">
                <span className="back-text">Quay trở lại </span>
                <span className="back-link" onClick={goToLogin}>Đăng nhập</span>
              </div>
            </div>
          ) : (
            <div className="forgot-password-step">
              <div className="forgot-password-text">
                Vui lòng kiểm tra email để hoàn thành quá trình thiết lập lại mật khẩu.
              </div>
              <div className="resend-code">
                <span className="back-text">Chưa nhận được email? </span>
                <span className="back-link" onClick={handleSendEmail}>Gửi lại</span>
              </div>
              <div className="forgot-password-back">
                <span className="back-text">Quay trở lại </span>
                <span className="back-link" onClick={goToLogin}>Đăng nhập</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
