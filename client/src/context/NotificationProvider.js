import classNames from "classnames";
import React, { createContext, useState } from "react";

export const NotificationContext = createContext();
let timeoutId;

const NotificationProvider = ({ children }) => {
  const [notification, setNotification] = useState("");
  const [classes, setClasses] = useState("");

  const updateNotification = (type, value) => {
    if (timeoutId) clearTimeout(timeoutId);

    switch (type) {
      case "error":
        setClasses("bg-red-500");
        break;
      case "success":
        setClasses("bg-green-500");
        break;
      case "warning":
        setClasses("bg-orange-500");
        break;
      default:
        setClasses("bg-red-500");
    }
    setNotification(value);

    timeoutId = setTimeout(() => {
      setNotification("");
    }, 2000);
  };

  return (
    <NotificationContext.Provider value={{ updateNotification }}>
      {children}
      {notification && (
        <div className="fixed left-1/2 -translate-x-1/2 top-24">
          <div
            className={classNames(
              "bounce-custom shadow-md shadow-gray-400 rounded",
              classes
            )}
          >
            <p className="text-white px-4 py-2">{notification}</p>
          </div>
        </div>
      )}
    </NotificationContext.Provider>
  );
};

export default NotificationProvider;