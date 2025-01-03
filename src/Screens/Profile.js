import React, { useState, useEffect } from "react";
import { IoCameraOutline, IoPencil } from "react-icons/io5";
import {FaRegEdit} from "react-icons/fa";
import Layout from "../Layout/Layout";
import { getUserProfile, updateUserProfile } from "../firebase";
import { getAuth } from "firebase/auth";
import DeleteAccountPopup from "./Popup/DeleteAccountPopup";
import ChangePasswordPopup from "./Popup/ChangePasswordPopup";
import './Profile.css'

// Function to upload files to Cloudinary
const uploadToCloudinary = async (file, type) => {
  try {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'phuongahihi');
    formData.append('folder', type);

    const response = await fetch(
      `https://api.cloudinary.com/v1_1/dh9y38ito/${type}/upload`,
      {
        method: 'POST',
        body: formData,
      }
    );

    const data = await response.json();
    return data.secure_url;
  } catch (error) {
    console.error('Error uploading file to Cloudinary:', error);
  }
};
function Profile() {
  const [name, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");

  useEffect(() => {
    const fetchUserProfile = async () => {
      const auth = getAuth();
      const user = auth.currentUser;

      if (user) {
        const userProfile = await getUserProfile(user.uid);
        if (userProfile) {
          setUsername(userProfile.name || "");
          setEmail(userProfile.email || "");
          setBirthdate(userProfile.birthdate || "");
          setAvatarUrl(userProfile.avatarUrl || "");
        } else {
          console.log("No profile found");
        }
      }
    };

    fetchUserProfile();
  }, []);

  const handleAvatarChange = async (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const newAvatarUrl = await uploadToCloudinary(file, "image");

      if (newAvatarUrl) {
        setAvatarUrl(newAvatarUrl); // Update the avatar in the UI

        const auth = getAuth();
        const user = auth.currentUser;

        if (user) {
          await updateUserProfile(user.uid, { avatarUrl: newAvatarUrl });
        } else {
          console.log("No user is currently logged in.");
        }
      }
    }
  };


  const handleUpdate = async () => {
    const auth = getAuth();
    const user = auth.currentUser;

    if (user) {
      const updatedData = {
        name,
        birthdate,
        avatarUrl,
      };

      await updateUserProfile(user.uid, updatedData);
    } 
  };

  useEffect(() => {
    return () => {
      if (avatarUrl) {
        URL.revokeObjectURL(avatarUrl);
      }
    };
  }, [avatarUrl]);

  const [isChangePasswordPopupOpen, setIsChangePasswordPopupOpen] = useState(false);
  const [isDeleteAccountPopupOpen, setIsDeleteAccountPopupOpen] = useState(false);

  const toggleChangePasswordPopup = () => {
    setIsChangePasswordPopupOpen(!isChangePasswordPopupOpen);
  };

  const toggleDeleteAccountPopup = () => {
    setIsDeleteAccountPopupOpen(!isDeleteAccountPopupOpen);
  };

  return (
  <Layout>
    <div className="min-h-screen flex items-center justify-center bg-main p-4 mt-20">
      <form
        className="bg-[#333333] p-8 rounded shadow-md w-full max-w-lg"
        onSubmit={(e) => e.preventDefault()}
      >
        <h3 style={{ fontWeight: 500, fontSize: '20px' }} className="text-2xl text-[20px] ml-0 text-subMain">
                    HỒ SƠ
        </h3>
        <div className="flex flex-col items-center mb-6 text-base">
          {avatarUrl ? (
            <img
              src={avatarUrl}
              alt="Avatar"
              className="w-24 h-24 rounded-full object-cover mb-2"
            />
          ) : (
            <img
              src="/favicon.png"
              alt="Default Avatar"
              className="w-24 h-24 rounded-full object-cover mb-2"
            />
          )}
          <label htmlFor="avatar" className="cursor-pointer text-white text-base flex items-center">
            <IoCameraOutline className="mr-2 text-2xl" /> Chỉnh sửa ảnh đại diện
          </label>
          <input
            type="file"
            id="avatar"
            accept="image/*"
            className="hidden"
            onChange={handleAvatarChange}
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2 text-white" htmlFor="name">Tên người dùng</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-3 py-3 rounded-[15px] bg-main text-white text-base border border-1 border-gray-500"
            placeholder="Nhập tên của bạn"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2 text-white" htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            className="w-full px-3 py-3 rounded-[15px] bg-main text-white text-base border border-1 border-gray-500"
            disabled
          />
        </div>

        <div className="mb-6">
          <label className="block mb-2 text-white" htmlFor="birthdate">Ngày sinh</label>
          <input
            type="date"
            id="birthdate"
            value={birthdate}
            onChange={(e) => setBirthdate(e.target.value)}
            className="w-full px-3 py-3 rounded-[15px] bg-main text-white text-base border border-1 border-gray-500"
            placeholder="Chọn ngày sinh"
          />
        </div>
        <div className="mb-6 relative">
          <label className="block mb-2 text-white" htmlFor="password">Mật khẩu</label>
          <div className="relative">
            <input
              type="password"
              id="password"
              value="************"
              disabled
              className="w-full px-3 py-3 rounded-[15px] bg-main text-white text-base border border-1 border-gray-500 pr-10" // Add pr-10 for padding
            />
            <FaRegEdit color="#28bd11"
              onClick={toggleChangePasswordPopup}
              className="absolute top-1/2 right-3 transform -translate-y-1/2 text-white text-xl cursor-pointer"
            />
          </div>
        </div>


        {/* Popup đổi mật khẩu */}
        {isChangePasswordPopupOpen && <ChangePasswordPopup onClose={toggleChangePasswordPopup} />}

        <div className="flex justify-between items-center ml-12 mr-12">
          <button
            type="button"
            onClick={toggleDeleteAccountPopup}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition duration-300 mt-3 sm:text-sm"
          >
            Xóa tài khoản
          </button>

          {/* Hiển thị Popup khi isPopupOpen là true */}
          {isDeleteAccountPopupOpen && <DeleteAccountPopup onClose={toggleDeleteAccountPopup} />}

          <button
            type="submit"
            onClick={handleUpdate}
            className="bg-[#23bf0e] text-white px-4 py-2 rounded hover:bg-[#1a9d0b]  transition duration-300 mt-3 sm:text-sm"          >
            Cập nhật
          </button>
        </div>
      </form>
    </div>
    </Layout>
  );
}

export default Profile;
