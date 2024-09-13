import React from "react";
import { Input } from "../../Components/UsedInputs";
import SideBar from "./SideBar";

function Password() {
  return (
    <SideBar>
      <div className="flex flex-col gap-6">
        <h2 className="text-xl font-bold">Change Password</h2>
        <Input
          label="Previous Password"
          placeholder="********"
          type="password"
          bg={true}
        />
        <Input
          label="New Password"
          placeholder="********"
          type="password"
          bg={true}
        />
        <Input
          label="Confirm Password"
          placeholder="********"
          type="password"
          bg={true}
        />
        <div className="flex justify-end items-center my-4">
          <button className="bg-main font-medium transitions hover:bg-subMain border border-subMain text-white py-3 px-6 rounded w-full sm:w-auto">
            Change Password
          </button>
        </div>
      </div>
    </SideBar>
  );
}

export default Password;
