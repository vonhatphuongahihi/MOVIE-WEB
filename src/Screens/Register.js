import React from "react";
import { Link } from "react-router-dom";
import { Input } from "../Components/UsedInputs";
import Layout from "../Layout/Layout";
import { FiLogIn } from "react-icons/fi";

function Register() {
  return (
    <Layout>
      <div className="container mx-auto px-2 my-14 flex-colo">
        <div className="w-full 2xl:w-2/5 gap-7 flex-colo p-8 sm:p-14 md:w-2/5 bg-dry rounded-lg border border-border">
          <img
            src="/images/logo.png"
            alt="logo"
            className="w-full h-12 object-contain"
          />
          <Input
            label="Full Name"
            placeholder="Melon Movies"
            type="text"
            bg={true}
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
            <FiLogIn /> Sign Up
          </Link>
          <p className="text-center text-border">
            Already have an account?{" "}
            <Link to="/login" className="text-dryGray font-semibold ml-2 hover:text-subMain">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </Layout>
  );
}

export default Register;