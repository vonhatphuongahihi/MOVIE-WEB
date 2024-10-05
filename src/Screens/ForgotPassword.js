import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from 'react';


function ForgotPassword() {
  const [forgot, setForgotState] = useState("Trang1");
  const navigate = useNavigate()
  const goToLogin=()=>{
    navigate("/login");
  }
  return (
    <div class="w-dvw h-dvh flex-colo bg-black">
      <img class="w-[120px] top-[20px] left-[31px] xl:left-[122px] absolute" src="../../images/logo.png" alt="logo Melon"/>
      <div class="w-5/6 xl:w-1/3 h-2/3 bg-[#333333] rounded-[25px] relative"> 
        <div class="w-full h-full p-5 xl:pt-[75px] items-center">
          <div class="w-full h-auto xl:w-full xl:h-1/7 text-center text-white text-3xl xl:text-[32px] font-bold font-['Roboto Condensed'] p-5 xl:p-0">Quên mật khẩu</div>         
          {forgot === "Trang1"? 
          <div class="w-full h-4/5 xl:p-10">
            <div class="w-full h-auto text-[#737373] text-sm text-justify xl:text-lg font-normal font-['Roboto Condensed'] pb-5">Để tiếp tục quá trình thiết lập lại mật khẩu, vui lòng nhập tên người dùng ở phía trên</div>
            <input class="w-full h-auto bg-black p-5 text-white placeholder:text-base" placeholder="Tên người dùng"/>
            <div class="w-full m-[20px] h-auto mx-auto bg-[#28BD11] rounded-[4px]"> 
              <div class="p-[16px] cursor-pointer text-center text-white text-[16px] font-medium font-['Roboto Condensed']" onClick={()=>setForgotState("Trang2")}>Tiếp tục</div>
            </div>  
            <div class="w-auto h-auto right-5 xl:right-10 bottom-10 absolute text-right font-['Roboto Condensed'] text-sm xl:text-lg">
            <span className="text-[#737373] whitespace-pre">Quay trở lại </span>
            <span className="text-white cursor-pointer" onClick={()=>goToLogin()}>Đăng nhập</span>
            </div>          
          </div>
          :
          <div>
            {forgot === "Trang2"? 
            <div class="w-full h-4/5 xl:p-8">
              <div class="w-full h-auto text-[#737373] text-sm text-justify xl:text-lg font-normal font-['Roboto Condensed'] pb-5">Vui lòng kiểm tra email và nhập mã xác nhận để hoàn thành quá trình thiết lập lại mật khẩu</div>
              <input class="w-full h-auto bg-black p-5 text-white placeholder:text-base" placeholder="Mã xác nhận"/>
              <div class="w-full h-auto text-left text-sm xl:text-lg font-['Roboto Condensed'] pt-2">
                <span className="text-[#737373] whitespace-pre">Chưa nhận được mã xác nhận? </span>
                <span className="text-white cursor-pointer"> Gửi lại</span>
              </div>
              <div class="w-full m-[20px] h-auto mx-auto bg-[#28BD11] rounded-[4px]"> 
                <div class="p-[16px] cursor-pointer text-center text-white text-[16px] font-medium font-['Roboto Condensed']" onClick={()=>setForgotState("Trang3")}>Tiếp tục</div>
              </div>  
              <div class="w-full h-auto pt-[18px] xl:pt-[8px] cursor-pointer text-white text-sm xl:text-lg font-['Roboto Condensed']" onClick={()=>setForgotState("Trang1")}>Trang trước</div>
              <div class="w-auto h-auto right-5 xl:right-10 bottom-10 absolute text-right font-['Roboto Condensed'] text-sm xl:text-lg">
                <span className="text-[#737373] whitespace-pre">Quay trở lại </span>
                <span className="text-white cursor-pointer" onClick={()=>goToLogin()}>Đăng nhập</span>
              </div> 
            </div>
            : 
            <div class="w-full h-4/5 xl:p-10">
              <input class="w-full h-auto bg-black p-5 text-white placeholder:text-base my-5" placeholder="Nhập mật khẩu mới"/>
              <input class="w-full h-auto bg-black p-5 text-white placeholder:text-base" placeholder="Nhập lại mật khẩu"/>
              <div class="w-full m-[20px] h-auto mx-auto bg-[#28BD11] rounded-[4px] p-[16px] cursor-pointer text-center text-white text-[16px] font-medium font-['Roboto Condensed']" onClick={()=>goToLogin()}>Hoàn tất </div>
              </div>
            }
          </div>
          }          
          </div>
    </div>
</div>
  );
}

export default ForgotPassword;
