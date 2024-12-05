import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { login } from '../../firebase';
import './Login.css';
import { Link } from "react-router-dom";

const Login = () => {
    const navigate = useNavigate(); 
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [rememberMe, setRememberMe] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleLogin = async (event) => {
        event.preventDefault();
        setLoading(true);

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
            toast.error(error.message);
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
                <Link to={`/`}>
                <img src="/images/logo.png" alt="Logo" className='login-logo' />
                </Link>
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
