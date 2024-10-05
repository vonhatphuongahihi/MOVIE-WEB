import React from 'react'
import { useState } from 'react'
import './Login.css'
import { login, signup } from '../../firebase'
import { Link } from "react-router-dom";
const Login =()=>{
    const [signState, setSignState] = useState("Đăng nhập");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);  

    const user_auth = async (event)=>{
        event.preventDefault();
        setLoading(true);
        if(signState === "Đăng nhập"){
            await login(email, password);
        }else{
            await signup(name, email, password);
        }
        setLoading(false);
    }
    return(
        loading?<div className="loading">
            <img src="./images/spin.gif" alt="" />
        </div>:
        <div className="login">
            <img src="/images/logo.png" alt="" className='login-logo'/>
            <div className="login-form">
                <h1>{signState}</h1>
                <form>
                    {signState === "Đăng ký"?
                    <input value={name} onChange={(e)=>{setName(e.target.value)}} type="text" placeholder='Tên người dùng'/>:<></>}
                    <input value={email} onChange={(e)=>{setEmail(e.target.value)}}  type="email" placeholder='Email'/>
                    <input value={password} onChange={(e)=>{setPassword(e.target.value)}}  type="pass" placeholder='Mật khẩu'/>
                    <button onClick={user_auth} type="submit" className='button'>{signState}</button>
                    <div className="form-help">
                        <div className="remember">
                            <input type="checkbox"/>
                            <label htmlFor=''>Ghi nhớ</label> 
                        </div>
                        <p><Link to='/forgot'>Quên mật khẩu?</Link></p>
                    </div>
                </form>
                <div className="form-switch">
                    {signState === "Đăng nhập"?<p>Chưa có tài khoản Melon? <span onClick={()=>setSignState("Đăng ký")}>Đăng ký ngay</span></p>:<></>}
                    {signState === "Đăng ký"?<p>Đã có tài khoản Melon? <span onClick={()=>setSignState("Đăng nhập")}>Đăng nhập ngay</span></p>:<></>}
                
                </div>
            </div>
        </div>
    )
}
export default Login