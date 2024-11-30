import React, { useState, useEffect } from "react";
import { FaUserCircle, FaCamera } from "react-icons/fa";
import Layout from "../Layout/Layout";
import { getUserProfile, updateUserProfile } from "../firebase";
import { getAuth } from "firebase/auth";
import DeleteAccountPopup from "./Popup/DeleteAccountPopup";

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
      const newAvatarUrl = URL.createObjectURL(file);
      setAvatarUrl(newAvatarUrl);

      const auth = getAuth();
      const user = auth.currentUser;

      if (user) {
        await updateUserProfile(user.uid, { avatarUrl: newAvatarUrl });
      } else {
        console.log("No user is currently logged in.");
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

      const success = await updateUserProfile(user.uid, updatedData);
    } 
  };

  useEffect(() => {
    return () => {
      if (avatarUrl) {
        URL.revokeObjectURL(avatarUrl);
      }
    };
  }, [avatarUrl]);

  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  return (
    <Layout>
      <div className="min-h-screen flex items-center justify-center bg-[#080a1a] p-4 mt-20">
        <form
          className="bg-[#0b0f29] p-8 rounded shadow-md w-full max-w-lg"
          onSubmit={(e) => e.preventDefault()}
        >
          <h2 className="text-3xl font-semibold mb-6 text-center text-subMain">HỒ SƠ</h2>

          <div className="flex flex-col items-center mb-6 text-base">
            {avatarUrl ? (
              <img
                src={avatarUrl}
                alt="Avatar"
                className="w-24 h-24 rounded-full object-cover mb-2"
              />
            ) : (
              <FaUserCircle className="w-24 h-24 text-subMain mb-2" />
            )}
            <label htmlFor="avatar" className="cursor-pointer text-white hover:underline text-base flex items-center">
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

          <div className="mb-4">
            <label className="block text-subMain mb-2 text-lg" htmlFor="name">
              Tên người dùng
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-3 py-2 rounded bg-white text-black text-base border-gray-300"
              placeholder="Nhập tên của bạn"
            />
          </div>

          <div className="mb-4">
            <label className="block text-subMain mb-2 text-lg" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              className="w-full px-3 py-2 rounded bg-gray-200 text-black text-base border-gray-300"
              disabled
            />
          </div>

          <div className="mb-6">
            <label className="block text-subMain mb-2 text-lg" htmlFor="birthdate">
              Ngày sinh
            </label>
            <input
              type="text"
              id="birthdate"
              value={birthdate}
              onChange={(e) => setBirthdate(e.target.value)}
              className="w-full px-3 py-2 rounded bg-white text-black text-base border-gray-300"
              placeholder="Nhập ngày sinh mới"
            />
          </div>

          <div className="flex justify-between">
            <button
              type="button"
              onClick={togglePopup}
              className="bg-black text-white px-4 py-2 rounded hover:bg-red-600 text-base"
            >
              XOÁ TÀI KHOẢN
            </button>
             {/* Hiển thị Popup khi isPopupOpen là true */}
      {isPopupOpen && <DeleteAccountPopup onClose={() => setIsPopupOpen(false)} />}
            <button
              type="button"
              onClick={handleUpdate}
              className="bg-[#23bf0e] text-white px-4 py-2 rounded hover:bg-blue-600 text-base"
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
