import React from "react";
import { Link } from "react-router-dom";
import { Input } from "../Components/UsedInputs";
import Layout from "../Layout/Layout";

import { MdLockReset } from "react-icons/md";

function Login() {
  return (
    <Layout>       
      <div className=" my-14 justify-center ">
        <div className=" gap-8 xl:gap-40 items-center mx-auto ">
              
        <div className="w-full 2xl:w-2/5 gap-8 flex-colo p-8 sm:p-14 md:w-4/5 bg-dry rounded-lg border border-border">
          <img
            src="/images/logo.png"
            alt="logo"
            className="w-full h-12 object-contain"
          />
          <Input
            label="Nhập mật khẩu mới"
            placeholder="********"
            type="password"
            bg={true}
          />
          <Input
            label="Nhập lại mật khẩu mới"
            placeholder="********"
            type="password"
            bg={true}
          />
          <Link
            to="#"
            className="bg-subMain transitions hover:text-main flex-rows gap-4 text-white p-4 rounded-lg w-full"
          >
            <MdLockReset className="w-10 h-10" /> Đổi mật khẩu
          </Link>
          
        </div>
        </div>
     </div>
    </Layout>
  );
}

export default Login;
