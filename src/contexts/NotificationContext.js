import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";
import io from "socket.io-client";
import { AuthContext } from "./AuthProvider";

let socket;

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const { user, userInfo } = useContext(AuthContext);
  const [notifications, setNotifications] = useState([]);

  // useEffect(() => {
  //   socket = io("http://localhost:5000");
  //   socket.on("connection", () => console.log("socket connected"));
  //   console.log("something");
  //   socket.on("notification", (newNotification) => {
  //     setNotifications((prevNotifications) => [
  //       newNotification,
  //       ...prevNotifications,
  //     ]);
  //   });
  //   // socket.emit("testing", { message: "this is message" });

  //   fetchNotifications();

  //   return () => {
  //     socket.off("notification");
  //   };
  // }, [user]);
  // const fetchNotifications = async () => {
  //   console.log(user);
  //   try {
  //     axios
  //       .get(
  //         `http://localhost:5000/api/v1/notifications/getNotification/userEmail/${user?.email}`
  //       )
  //       .then((response) => {
  //         console.log(response?.data);
  //         setNotifications(response?.data?.notifications);
  //       })
  //       .catch((error) => console.error(error));
  //   } catch (error) {
  //     console.error("Error fetching notifications:", error);
  //   }
  // };

  console.log(notifications);

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
