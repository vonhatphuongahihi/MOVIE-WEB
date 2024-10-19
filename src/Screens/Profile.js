// src/Pages/Profile.jsx
import React, { useState, useEffect } from "react";
import { FaUserCircle, FaCamera } from "react-icons/fa";
import Layout from "../Layout/Layout";

function Profile() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState(null);

  const handleAvatarChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setAvatar(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleDeleteAccount = () => {
    // Implement account deletion logic here
    alert("Account deletion functionality is not implemented yet.");
  };

  const handleUpdate = () => {
    // Implement profile update logic here
    alert("Profile update functionality is not implemented yet.");
  };

  // Cleanup URL object to avoid memory leaks
  useEffect(() => {
    return () => {
      if (avatar) {
        URL.revokeObjectURL(avatar);
      }
    };
  }, [avatar]);

  return (
    <Layout>
      <div className="min-h-screen flex items-center justify-center bg-[#080a1a] p-4">
        <form
          className="bg-[#0b0f29] p-8 rounded shadow-md w-full max-w-lg"
          onSubmit={(e) => e.preventDefault()}
        >
          <h2 className="text-3xl font-semibold mb-6 text-center text-subMain">
            HỒ SƠ
          </h2>

          {/* Ảnh đại diện */}
          <div className="flex flex-col items-center mb-6 text-base">
            {avatar ? (
              <img
                src={avatar}
                alt="Avatar"
                className="w-24 h-24 rounded-full object-cover mb-2"
              />
            ) : (
              <FaUserCircle className="w-24 h-24 text-subMain mb-2" />
            )}
            <label
              htmlFor="avatar"
              className="cursor-pointer text-white hover:underline text-base flex items-center"
            >
              <FaCamera className="mr-2" />
              Thay đổi ảnh đại diện
            </label>
            <input
              type="file"
              id="avatar"
              accept="image/*"
              className="hidden"
              onChange={handleAvatarChange}
            />
          </div>

          {/* Tên người dùng */}
          <div className="mb-4">
            <label
              className="block text-subMain mb-2 text-lg"
              htmlFor="username"
            >
              Tên người dùng
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-3 py-2 rounded focus:outline-none focus:ring focus:border-blue-300 bg-white text-black text-base border-gray-300"
              placeholder="Nhập tên của bạn"
            />
          </div>

          {/* Email */}
          <div className="mb-4">
            <label
              className="block text-subMain mb-2 text-lg"
              htmlFor="email"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 rounded focus:outline-none focus:ring focus:border-blue-300 bg-white text-black text-base border-gray-300"
              placeholder="Nhập email của bạn"
            />
          </div>

          {/* Mật khẩu */}
          <div className="mb-6">
            <label
              className="block text-subMain mb-2 text-lg"
              htmlFor="password"
            >
              Mật khẩu
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 rounded focus:outline-none focus:ring focus:border-blue-300 bg-white text-black text-base border-gray-300"
              placeholder="Nhập mật khẩu mới"
            />
          </div>

          {/* Nút để thực hiện hành động */}
          <div className="flex justify-between">
            <button
              type="button"
              onClick={handleDeleteAccount}
              className="bg-black text-white px-4 py-2 rounded hover:bg-red-600 focus:outline-none text-base"
            >
              XOÁ TÀI KHOẢN
            </button>
            <button
              type="button"
              onClick={handleUpdate}
              className="bg-[#23bf0e] text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none text-base"
            >
              CẬP NHẬT
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
}

export default Profile;
