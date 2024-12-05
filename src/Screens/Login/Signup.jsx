import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { signup } from '../../firebase';
import TermsPopup from '../Popup/TermsPopup';
import './Signup.css';

const Signup = () => {
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [agreeToTerms, setAgreeToTerms] = useState(false);
    const [showTermsPopup, setShowTermsPopup] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSignup = async (event) => {
        event.preventDefault();
        setLoading(true);
        // Kiểm tra trường hợp tên người dùng rỗng
        if (!name.trim()) {
            toast.error("Tên người dùng không được để trống.");
            setLoading(false);
            return;
        }

        // Kiểm tra độ dài tên người dùng
        if (name.length < 3) {
            toast.error("Tên người dùng phải có ít nhất 3 ký tự.");
            setLoading(false);
            return;
        }

        // Kiểm tra định dạng email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            toast.error("Email không hợp lệ. Vui lòng nhập đúng định dạng.");
            setLoading(false);
            return;
        }

        // Kiểm tra độ dài mật khẩu
        if (password.length < 6) {
            toast.error("Mật khẩu phải có ít nhất 6 ký tự.");
            setLoading(false);
            return;
        }

        // Kiểm tra mật khẩu và xác nhận mật khẩu
        if (password !== confirmPassword) {
            toast.error("Mật khẩu không khớp. Vui lòng thử lại.");
            setLoading(false);
            return;
        }

        // Kiểm tra điều khoản và điều kiện
        if (!agreeToTerms) {
            toast.error("Bạn cần đồng ý với điều khoản và điều kiện.");
            setLoading(false);
            return;
        }


        try {
            // Set default values for the additional fields
            const additionalData = {
                role: "user",
                birthdate: "",
                fav: "",
                gender: "",
                avatarUrl: "",
                history: []
            };
            await signup(name, email, password, additionalData);
            toast.info("Email xác thực đã được gửi. Vui lòng kiểm tra hộp thư của bạn.");
            navigate('/login');
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        loading ? (
            <div className="loading">
                <img src="/images/spin.gif" alt="loading" />
            </div>
        ) : (
            <div className="signup">
                <img src="/images/logo.png" alt="Logo" className='signup-logo hidden md:block' />
                <div className="signup-form">
                    <img src="/images/logo.png" alt="Logo" className='form-logo' />
                    <form onSubmit={handleSignup}>
                        <input
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            type="text"
                            placeholder='Tên người dùng'
                            required
                        />
                        <input
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            type="email"
                            placeholder='Email'
                            required
                        />
                        <input
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            type="password"
                            placeholder='Mật khẩu'
                            required
                        />
                        <input
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            type="password"
                            placeholder='Nhập lại mật khẩu'
                            required
                        />

                        {/* Checkbox for terms and conditions */}
                        <div className="terms">
                                <input
                                    type="checkbox"
                                    checked={agreeToTerms}
                                    onChange={() => setAgreeToTerms(!agreeToTerms)}
                                />
                            <label>
                            Tôi đã đồng ý với <span className="terms-link" onClick={() => setShowTermsPopup(true)}>điều khoản và điều kiện</span>
                            </label>
                        </div>

                        <button type="submit" className='button'>Đăng ký</button>
                    </form>
                    <div className="form-switch">
                        <p>Đã có tài khoản? <span onClick={() => navigate('/login')}>Đăng nhập ngay</span></p>
                    </div>
                </div>
                {showTermsPopup && <TermsPopup onClose={() => setShowTermsPopup(false)} />}
            </div>
        )
    );
};

export default Signup;
