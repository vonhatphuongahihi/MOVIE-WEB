import React, { useEffect, useState } from "react";
import { IoMdNotificationsOutline } from "react-icons/io";
import classNames from "classnames/bind";
import Notification from "./Notification"; // Component cho một thông báo
import { getNotifications } from "../../firebase";
import PopperWrapper from "../Popper/Popper";
import TippyHeadless from "@tippyjs/react/headless";
import styles from "./notification.css";
const cx = classNames.bind(styles);
const NotificationIcon = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      const data = await getNotifications();
      setNotifications(data);
      console.log(data); // In thông tin thông báo ra console để debug
    };

    fetchNotifications();
  }, []);

  return (
    <div>
    <TippyHeadless
      interactive
      placement="bottom"
      render={() => (
        <PopperWrapper className={cx("notification-popper")}>
          <div className={cx("notification-header")}>
            <span className="text-white">{`Thông báo (${notifications.length})`}</span>
          </div>
          {notifications.length > 0 ? (
            <div className={cx("notification-items")}>
              {notifications.map((item) => (
                <Notification key={item.id} {...item} />
              ))}
            </div>
          ) : (
            <div className="w-72 flex flex-col items-center">
              <span>Chưa có thông báo nào...</span>
            </div>
          )}
        </PopperWrapper>
      )}
      hideOnClick={false} // Giữ cho thông báo mở khi click bên ngoài
    >
      <button className={cx("notification-btn")}>
        <IoMdNotificationsOutline className="w-7 h-7 text-subMain cursor-pointer mr-2" />
        {notifications.length > 0 && (
          <div className={cx("quantity")}>
            <span className="text-white">{notifications.length}</span>
          </div>
        )}
      </button>
    </TippyHeadless>
    </div>
  );
};

export default NotificationIcon;
