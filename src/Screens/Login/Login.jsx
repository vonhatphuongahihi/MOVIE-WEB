import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { login } from '../../firebase';
import './Login.css';

const Login = () => {
    const navigate = useNavigate(); 
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [rememberMe, setRememberMe] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleLogin = async (event) => {
        event.preventDefault();
        setLoading(true);
        // Kiểm tra nếu các trường bị trống
        if (!email) {
            toast.error("Vui lòng nhập email.");
            setLoading(false);
            return;
        }

        if (!password) {
            toast.error("Vui lòng nhập mật khẩu.");
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

        try {
            const userData = await login(email, password);
            if (userData) {
                const userRole = userData.role;
    
                if (userRole === "admin") {
                    toast.success("Đăng nhập thành công với quyền admin.");
                    navigate('/admin');
                } else {
                    toast.success("Đăng nhập thành công.");
                    navigate('/');
                }
            }
        } catch (error) {
            toast.error("Đăng nhập thất bại. Vui lòng kiểm tra lại thông tin đăng nhập.");
        } finally {
            setLoading(false);
        }
    };

    return (
        loading ? (
            <div className="loading">
                <img src="./images/spin.gif" alt="" />
            </div>
        ) : (
            <div className="login">
                <img src="/images/logo.png" alt="Logo" className='login-logo hidden md:block' />
                <div className="login-form">
                    <img src="/images/logo.png" alt="Logo" className='form-logo' />
                    <form onSubmit={handleLogin}>
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
                        <button type="submit" className='button'>Đăng nhập</button>
                        <div className="form-help">
                            <div className="remember">
                                <input
                                    type="checkbox"
                                    checked={rememberMe}
                                    onChange={() => setRememberMe(!rememberMe)}
                                />
                                <label>Ghi nhớ</label>
                            </div>
                            <p onClick={() => navigate('/forgot-password')} className="forgot-password">
                                Quên mật khẩu?
                            </p>
                        </div>
                    </form>
                    <div className="form-switch">
                        <p>Chưa có tài khoản? <span onClick={() => navigate('/signup')}>Đăng ký ngay</span></p>
                    </div>
                </div>
            </div>
        )
    );
};

export default Login;
