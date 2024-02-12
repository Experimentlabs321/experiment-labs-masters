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
    axios
      .get(
        `${process.env.REACT_APP_SERVER_API}/api/v1/users?email=${user?.email}`
      )
      .then((userInfo) => {
        console.log(newNotification, user, userInfo?.data);
        // setUserInfo(user?.data);

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
                console.log(findStudentBatch);
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
  };

  const announcementFilter = (newAnnouncement) => {
    axios
      .get(
        `${process.env.REACT_APP_SERVER_API}/api/v1/users?email=${user?.email}`
      )
      .then((userInfo) => {
        console.log(newAnnouncement, user, userInfo?.data);
        // setUserInfo(user?.data);

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
  };

  const countUnreadNotification = async () => {
    const unreadNotifications = notifications?.filter(
      (notification) =>
        !notification?.readBy?.find(
          (viewedBy) => viewedBy?.email === user?.email
        )
    );
    console.log(unreadNotifications?.length);
  };

  useEffect(() => {
    // socket = io("https://test-server-henna-nine.vercel.app");
    const socket = io("https://test-server-tg7l.onrender.com", {
      withCredentials: true,
      extraHeaders: {
        "my-custom-header": "abcd",
      },
    });
    socket.on("connection", () => console.log("socket connected"));
    socket.on("notification", (newNotification) => {
      notificationFilter(newNotification);
    });
    socket.on("notification", (newNotification) => {
      notificationFilter(newNotification);
    });
    socket.on("announcement", (newAnnouncement) => {
      announcementFilter(newAnnouncement);
      // notificationFilter(newAnnouncement);
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
    console.log(user);
    try {
      await axios
        .get(
          `https://test-server-tg7l.onrender.com/api/v1/notifications/getNotification/userEmail/${user?.email}`
        )
        .then(async (response) => {
          if (response?.data?.notifications) {
            response?.data?.notifications?.reverse();
            setNotifications(response?.data?.notifications);
            const unreadNotifications =
              await response?.data?.notifications?.filter(
                (notification) =>
                  !notification?.readBy?.find(
                    (viewedBy) => viewedBy?.email === user?.email
                  )
              );
            setUnreadNotifications(unreadNotifications);
            setNumberOfUnreadNotification(unreadNotifications?.length);
            console.log(unreadNotifications?.length);
          }
        })
        .catch((error) => console.error(error));
    } catch (error) {
      console.error("Error fetching notifications:", error);
    }
  };

  const fetchAnnouncements = async () => {
    axios
      .get(
        `${process.env.REACT_APP_SERVER_API}/api/v1/users?email=${user?.email}`
      )
      .then(async (userInfo) => {
        console.log(userInfo?.data);
        try {
          await axios
            .get(
              `https://test-server-tg7l.onrender.com/api/v1/announcements/getAnnouncement/organizationId/${userInfo?.data?.organizationId}`
            )
            .then(async (response) => {
              if (response?.data?.announcements) {
                response?.data?.announcements?.reverse();
                setAnnouncements(response?.data?.announcements);
                const unreadAnnouncements =
                  await response?.data?.announcements?.filter(
                    (announcement) =>
                      !announcement?.readBy?.find(
                        (viewedBy) => viewedBy?.email === user?.email
                      )
                  );
                setUnreadAnnouncements(unreadAnnouncements);
              }
            })
            .catch((error) => console.error(error));
        } catch (error) {
          console.error("Error fetching notifications:", error);
        }
      })
      .catch((error) => console.error(error));
  };

  console.log(notifications);

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        unreadNotifications,
        numberOfUnreadNotification,
        announcements,
        unreadAnnouncements,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotification = () => {
  return useContext(NotificationContext);
};
