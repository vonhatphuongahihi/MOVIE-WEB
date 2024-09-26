import React from 'react'
import { useState } from 'react'
import './Login.css'
const Login =()=>{
    const [signState, setSignState] = useState("Đăng nhập")
    return(
        <div className="login">
            <img src="/images/logo.png" alt="" className='login-logo'/>
            <div className="login-form">
                <h1>{signState}</h1>
                <form>
                    {signState === "Đăng ký"?<input type="text" placeholder='Tên người dùng'/>:<></>}
                <input type="email" placeholder='Email'/>
                <input type="pass" placeholder='Mật khẩu'/>
                <button className='button'>Đăng ký</button>
                <div className="form-help">
                    <div className="remember">
                        <input type="checkbox"/>
                        <label htmlFor=''>Ghi nhớ</label> 
                    </div>
                    <p>Bạn cần giúp đỡ?</p>
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