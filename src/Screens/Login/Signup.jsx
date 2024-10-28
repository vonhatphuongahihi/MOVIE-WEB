import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { signup } from '../../firebase';
import './Signup.css';

const Signup = () => {
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [agreeToTerms, setAgreeToTerms] = useState(false); // State for terms agreement
    const [loading, setLoading] = useState(false);

    const handleSignup = async (event) => {
        event.preventDefault();
        setLoading(true);

        if (!agreeToTerms) {
            toast.error("Bạn cần đồng ý với điều khoản và điều kiện.");
            setLoading(false);
            return;
        }

        if (password !== confirmPassword) {
            toast.error("Mật khẩu không khớp. Vui lòng thử lại.");
            setLoading(false);
            return;
        }

        try {
            await signup(name, email, password);
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
                <img src="/images/logo.png" alt="Logo" className='signup-logo' />
                <div className="signup-form">
                    <form onSubmit={handleSignup}>
                        <input
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            type="text"
                            placeholder='Tên người dùng'
                        />
                        <input
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            type="email"
                            placeholder='Email'
                        />
                        <input
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            type="password"
                            placeholder='Mật khẩu'
                        />
                        <input
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            type="password"
                            placeholder='Nhập lại mật khẩu'
                        />
                        
                        {/* Checkbox for terms and conditions */}
                        <div className="terms">
                            <input
                                type="checkbox"
                                checked={agreeToTerms}
                                onChange={() => setAgreeToTerms(!agreeToTerms)}
                            />
                            <label>
                                Tôi đã đồng ý với <a href="/terms" target="_blank" rel="noopener noreferrer">điều khoản và điều kiện</a>
                            </label>
                        </div>

                        <button type="submit" className='button'>Đăng ký</button>
                    </form>
                    <div className="form-switch">
                        <p>Đã có tài khoản? <span onClick={() => navigate('/login')}>Đăng nhập ngay</span></p>
                    </div>
                </div>
            </div>
        )
    );
};

export default Signup;
