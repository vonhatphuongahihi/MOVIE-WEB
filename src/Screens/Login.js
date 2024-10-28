import React from "react";
import { Link } from "react-router-dom";
import { Input } from "../Components/UsedInputs";
import Layout from "../Layout/Layout";
import { FiLogIn } from "react-icons/fi";

function Login() {
  return (
    <Layout>
      <div className="container mx-auto px-2 my-14 flex-colo">
        <div className="grid grid-flow-row xl:grid-cols-2 gap-8 xl:gap-40 items-center mx-auto">
          <img
            className="w-full px-2 xl:block hidden h-header rounded-lg object-cover mx-5"
            src="/images/mobile.png"
            alt="notfound"
          />
          <div className="w-full 2xl:w-2/5 gap-8 flex-colo p-8 sm:p-14 md:w-4/5 bg-dry rounded-lg border border-border">
            <img
              src="/images/logo.png"
              alt="logo"
              className="w-full h-12 object-contain"
            />
            <Input
              label="Email"
              placeholder="melon@gmail.com"
              type="email"
              bg={true}
            />
            <Input
              label="Password"
              placeholder="********"
              type="password"
              bg={true}
            />
            <Link
              to="/dashboard"
              className="bg-subMain transitions hover:text-main flex-rows gap-4 text-white p-4 rounded-lg w-full"
            >
              <FiLogIn /> Sign In
            </Link>
            <p className="text-center text-border">
              Don't have an account?{" "}
              <Link to="/register" className="text-dryGray font-semibold ml-2 hover:text-subMain">
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Login;
