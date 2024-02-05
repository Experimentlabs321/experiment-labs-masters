import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";
import io from "socket.io-client";

let socket;

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    socket = io("http://localhost:5000");
    console.log(socket);
    socket.on("connection", () => console.log("socket connected"));
    console.log("something");
    socket.on("notification", (newNotification) => {
      setNotifications((prevNotifications) => [
        newNotification,
        ...prevNotifications,
      ]);
    });
    // socket.emit("testing", { message: "this is message" });

    fetchNotifications();

    return () => {
      socket.off("notification");
    };
  }, []);
  const fetchNotifications = async () => {
    try {
      axios
        .get(`http://localhost:5000/api/v1/notifications`)
        .then((response) => {
          setNotifications(response?.data);
        })
        .catch((error) => console.error(error));
    } catch (error) {
      console.error("Error fetching notifications:", error);
    }
  };

  return (
    <NotificationContext.Provider
      value={{
        notifications,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotification = () => {
  return useContext(NotificationContext);
};
