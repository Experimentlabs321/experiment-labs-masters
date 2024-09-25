import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";
import io from "socket.io-client";
import { AuthContext } from "./AuthProvider";
import Loading from "../Pages/Shared/Loading/Loading";

let socket;

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const { user } = useContext(AuthContext);
  const [notifications, setNotifications] = useState([]);
  const [unreadNotifications, setUnreadNotifications] = useState([]);
  const [announcements, setAnnouncements] = useState([]);
  const [unreadAnnouncements, setUnreadAnnouncements] = useState([]);
  const [numberOfUnreadNotification, setNumberOfUnreadNotification] =
    useState(0);

  const notificationFilter = (newNotification) => {
    if (user?.email) {
      axios
        .get(
          `${process.env.REACT_APP_SOCKET_SERVER_API}/api/v1/users?email=${user?.email}`
        )
        .then((userInfo) => {
          if (
            userInfo?.data?.role === "user" &&
            newNotification?.type === "Create Task"
          ) {
            if (
              newNotification?.recipient?.organizationId ===
              userInfo?.data?.organizationId
            ) {
              if (newNotification?.recipient?.type === "Students") {
                const findStudentCourse = userInfo?.data?.courses?.find(
                  (course) =>
                    course?.courseId === newNotification?.recipient?.courseId
                );
                if (findStudentCourse) {
                  const findStudentBatch =
                    newNotification?.recipient?.batches?.find(
                      (batch) => batch?.batchId === findStudentCourse?.batchId
                    );
                  // console.log(findStudentBatch);
                  if (findStudentBatch) {
                    setNotifications((prevNotifications) => [
                      newNotification,
                      ...prevNotifications,
                    ]);
                    setUnreadNotifications((prevNotifications) => [
                      newNotification,
                      ...prevNotifications,
                    ]);
                    setNumberOfUnreadNotification(unreadNotifications?.length);
                  }
                }
              } else if (
                newNotification?.recipient?.type === "Specific Student"
              ) {
                if (
                  newNotification?.recipient?.recipientEmail === user?.email
                ) {
                  setNotifications((prevNotifications) => [
                    newNotification,
                    ...prevNotifications,
                  ]);
                  setUnreadNotifications((prevNotifications) => [
                    newNotification,
                    ...prevNotifications,
                  ]);
                  setNumberOfUnreadNotification(unreadNotifications?.length);
                }
              }
            }
          } else if (
            userInfo?.data?.role === "admin" &&
            newNotification?.type === "Submission"
          ) {
            if (
              newNotification?.recipient?.organizationId ===
              userInfo?.data?.organizationId
            ) {
              if (newNotification?.recipient?.type === "Admins") {
                setNotifications((prevNotifications) => [
                  newNotification,
                  ...prevNotifications,
                ]);
                setUnreadNotifications((prevNotifications) => [
                  newNotification,
                  ...prevNotifications,
                ]);
                setNumberOfUnreadNotification(unreadNotifications?.length);
              } else if (
                newNotification?.recipient?.type === "Specific Student"
              ) {
              }
            }
          }
        })
        .catch((error) => console.error(error));
    }
  };

  const announcementFilter = (newAnnouncement) => {
    if (user?.email) {
      axios
        .get(
          `${process.env.REACT_APP_SOCKET_SERVER_API}/api/v1/users?email=${user?.email}`
        )
        .then((userInfo) => {
          if (
            userInfo?.data?.organizationId === newAnnouncement?.organizationId
          ) {
            setAnnouncements((prevAnnouncements) => [
              newAnnouncement,
              ...prevAnnouncements,
            ]);
            setUnreadAnnouncements((prevAnnouncements) => [
              newAnnouncement,
              ...prevAnnouncements,
            ]);
          }
        })
        .catch((error) => console.error(error));
    }
  };

  const countUnreadNotification = async () => {
    const unreadNotifications = notifications?.filter(
      (notification) =>
        !notification?.readBy?.find(
          (viewedBy) => viewedBy?.email === user?.email
        )
    );
  };

  useEffect(() => {
    // socket = io("https://test-server-henna-nine.vercel.app");
    const socket = io(`${process.env.REACT_APP_SOCKET_SERVER_API}`);
    socket.on("connection", () => console.log("socket connected"));
    socket.on("notification", (newNotification) => {
      notificationFilter(newNotification);
    });
    socket.on("notification", (newNotification) => {
      notificationFilter(newNotification);
    });
    socket.on("announcement", (newAnnouncement) => {
      announcementFilter(newAnnouncement);
    });
    // socket.emit("testing", { message: "this is message" });

    fetchNotifications();
    fetchAnnouncements();

    countUnreadNotification();
    return () => {
      socket.off("notification");
    };
  }, [user]);

  const fetchNotifications = async () => {
    try {
      if (user?.email) {
        await axios
          .get(
            `${process.env.REACT_APP_SOCKET_SERVER_API}/api/v1/notifications/getNotification/userEmail/${user?.email}`
          )
          .then(async (response) => {
            if (response?.data?.notifications) {
              response?.data?.notifications?.reverse();
              setNotifications(response?.data?.notifications);
              const unreadNotifications =
                await response?.data?.notifications?.filter(
                  (notification) =>
                    !notification?.readBy?.find(
                      (viewedBy) => viewedBy === user?.email
                    )
                );
              setUnreadNotifications(unreadNotifications);
              setNumberOfUnreadNotification(unreadNotifications?.length);
            }
          })
          .catch((error) => console.error(error));
      }
    } catch (error) {
      console.error("Error fetching notifications:", error);
    }
  };

  const clearAllNotifications = async () => {
    if (user?.email) {
      Loading();
      const clearAll = await axios.put(
        `${process.env.REACT_APP_SOCKET_SERVER_API}/api/v1/notifications/clearAll/userEmail/${user?.email}`
      );

      // console.log(clearAll);

      if (clearAll?.status === 200) {
        await fetchNotifications();
      }
      Loading().close();
    }
  };

  const fetchAnnouncements = async () => {
    if (user?.email) {
      axios
        .get(
          `${process.env.REACT_APP_SERVER_API}/api/v1/users?email=${user?.email}`
        )
        .then(async (userInfo) => {
          try {
            if (userInfo?.data?.organizationId) {
              await axios
                .get(
                  `${process.env.REACT_APP_SOCKET_SERVER_API}/api/v1/announcements/getAnnouncement/organizationId/${userInfo?.data?.organizationId}`
                )
                .then(async (response) => {
                  // console.log(response);
                  if (response?.data?.announcements) {
                    response?.data?.announcements?.reverse();
                    setAnnouncements(response?.data?.announcements);
                    const unreadAnnouncements =
                      await response?.data?.announcements?.filter(
                        (announcement) =>
                          !announcement?.readBy?.find(
                            (viewedBy) => viewedBy === user?.email
                          )
                      );
                    setUnreadAnnouncements(unreadAnnouncements);
                  }
                })
                .catch((error) => console.error(error));
            }
          } catch (error) {
            console.error("Error fetching notifications:", error);
          }
        })
        .catch((error) => console.error(error));
    }
  };

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        unreadNotifications,
        numberOfUnreadNotification,
        announcements,
        unreadAnnouncements,
        fetchAnnouncements,
        fetchNotifications,
        clearAllNotifications,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotification = () => {
  return useContext(NotificationContext);
};
