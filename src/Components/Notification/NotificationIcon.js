import React, { useEffect, useState } from "react";
import { IoMdNotificationsOutline } from "react-icons/io";
import classNames from "classnames/bind";
import Notification from "./Notification"; // Component cho một thông báo
import {
  getNotifications,
  updateAllNotificationsAsRead,
  addNotificationsForAllUsers,
} from "../../firebase";
import PopperWrapper from "../Popper/Popper";
import styles from "./notification.css";
import { getAuth } from "firebase/auth";
const cx = classNames.bind(styles);

const NotificationIcon = () => {
  const [notifications, setNotifications] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null); // Use state to store user
  const [newNotificationsCount, setNewNotificationsCount] = useState(0);

  useEffect(() => {
    const auth = getAuth();
    const currentUser = auth.currentUser; // Get the current user
    setUser(currentUser); // Set user state when the component mounts
  }, []);

  // Lấy danh sách thông báo và tính số lượng thông báo "new"
  useEffect(() => {
    const fetchNotifications = async () => {
      const data = await getNotifications();
      setNotifications(data);

      // Đếm thông báo "new" nếu người dùng hiện tại tồn tại
      if (user) {
        const newCount = data.reduce((count, notification) => {
          const userStatus = notification.users?.[user.uid];
          return userStatus === "new" ? count + 1 : count;
        }, 0);

        setNewNotificationsCount(newCount);
      }
    };

    fetchNotifications();
  }, [user]);

  // Hàm toggle mở/đóng thông báo
  const toggleNotifications = () => {
    setIsOpen((prev) => !prev);
  };

  // Handle "Mark all as read" button click
  const handleMarkAllAsRead = async () => {
    if (user) {
      await updateAllNotificationsAsRead(user.uid);

      const updatedNotifications = notifications.map((notification) => ({
        ...notification,
        users: {
          ...(notification.users || {}), // Fallback nếu users bị undefined
          [user.uid]: "seen",
        },
      }));

      setNotifications(updatedNotifications);
      setNewNotificationsCount(0);
    }
  };

  return (
    <div className="relative">
      {isOpen && (
        <PopperWrapper className={cx("notification-popper", { show: isOpen })}>
          <div className={cx("notification-header")}>
            <span className="text-white">{`Thông báo (${notifications.length})`}</span>
            <span
              className="text-white text-xs lg:text-sm cursor-pointer"
              onClick={handleMarkAllAsRead}
            >{`Đánh dấu tất cả là đã đọc`}</span>
          </div>

          {notifications.length > 0 ? (
            <div className={cx("notification-items")}>
              {notifications.map((item) => {
                // Kiểm tra xem thông báo của người dùng hiện tại có trạng thái "new" không
                const isNew = item.users?.[user?.uid] === "new";

                return <Notification key={item.id} {...item} isBold={isNew} />;
              })}
            </div>
          ) : (
            <div className="w-72 flex flex-col items-center">
              <span>Chưa có thông báo nào...</span>
            </div>
          )}
        </PopperWrapper>
      )}

      <button className={cx("notification-btn")} onClick={toggleNotifications}>
        <IoMdNotificationsOutline className="w-7 h-7 text-subMain cursor-pointer mr-2" />
        {newNotificationsCount > 0 && (
          <div className={cx("quantity")}>
            <span className="text-white text-xs lg:text-sm">
              {newNotificationsCount}
            </span>
          </div>
        )}
      </button>
    </div>
  );
};

export default NotificationIcon;
