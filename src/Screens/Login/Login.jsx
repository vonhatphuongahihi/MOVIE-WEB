import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { login, signup } from '../../firebase';
import './Login.css';



const Login = () => {
    const navigate = useNavigate(); 
    const [signState, setSignState] = useState("Đăng nhập");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const user_auth = async (event) => {
        event.preventDefault();
        setLoading(true);
        
        try {
            if (signState === "Đăng nhập") {
                const userCredential = await login(email, password);
                const user = userCredential.user;

                if (!user.emailVerified) {
                    toast.error("Vui lòng kiểm tra email của bạn để xác thực tài khoản.");
                    setLoading(false);
                    return; 
                }

                toast.success("Đăng nhập thành công.");
                navigate('/'); 
            } else {
                await signup(name, email, password);
                toast.info("Email xác thực đã được gửi. Vui lòng kiểm tra hộp thư của bạn.");
            
                setSignState("Đăng nhập"); 
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
                <img src="/images/logo.png" alt="" className='login-logo' />
                <div className="login-form">
                    <h1>{signState}</h1>
                    <form>
                        {signState === "Đăng ký" && (
                            <input
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                type="text"
                                placeholder='Tên người dùng'
                            />
                        )}
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
                        <button onClick={user_auth} type="submit" className='button'>{signState}</button>
                        <div className="form-help">
                            <div className="remember">
                                <input type="checkbox" />
                                <label htmlFor=''>Ghi nhớ</label>
                            </div>
                            <p>Bạn cần giúp đỡ?</p>
                        </div>
                    </form>
                    <div className="form-switch">
                        {signState === "Đăng nhập" ? (
                            <p>Chưa có tài khoản Melon? <span onClick={() => setSignState("Đăng ký")}>Đăng ký ngay</span></p>
                        ) : (
                            <p>Đã có tài khoản Melon? <span onClick={() => setSignState("Đăng nhập")}>Đăng nhập ngay</span></p>
                        )}
                        <p><Link to='/forgot'>Quên mật khẩu?</Link></p>
                    </div>
                </div>
            </div>
        )
    );
};

export default Login;
