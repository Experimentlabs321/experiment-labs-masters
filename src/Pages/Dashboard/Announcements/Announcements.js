import React, { useContext, useState } from "react";
import Layout from "../Layout";
import AdminAnnouncementForm from "./AdminAnnouncementForm";
import { useNotification } from "../../../contexts/NotificationContext";
import DialogLayoutForFromControl from "../Shared/DialogLayoutForFromControl";
import { AuthContext } from "../../../contexts/AuthProvider";

const Announcements = () => {
  const { userInfo } = useContext(AuthContext);
  const { announcements, unreadAnnouncements } = useNotification();
  const [showAnnouncementForm, setShowAnnouncementForm] = useState(false);
  const [showAnnouncementDetailsDialog, setShowAnnouncementDetailsDialog] =
    useState(false);
  const [displayingAnnouncement, setDisplayingAnnouncement] = useState({});

  const handleDate = (dateTime) => {
    const date = new Date(dateTime).toDateString();
    return date;
  };

  const handleTime = (dateTime) => {
    const time = new Date(dateTime).toLocaleTimeString();
    return time;
  };

  return (
    <div>
      <Layout>
        <div className="p-4">
          <div className="flex items-center justify-between h-24 ">
            <h1 className="text-3xl font-bold">Announcements</h1>
            {userInfo?.role === "admin" && (
              <button
                onClick={() => setShowAnnouncementForm(true)}
                className="bg-sky-500 text-white px-4 py-2 font-medium rounded hover:bg-sky-600 transition duration-300"
              >
                Publish Announcement
              </button>
            )}
          </div>
          {showAnnouncementForm && (
            <AdminAnnouncementForm
              setShowAnnouncementForm={setShowAnnouncementForm}
            />
          )}
          <DialogLayoutForFromControl
            title={
              <p className=" h-[90px] text-[22px] font-[700] flex items-center text-[#3E4DAC] px-[32px] py-5 border-b-2">
                Announcement
              </p>
            }
            width={800}
            setOpen={setShowAnnouncementDetailsDialog}
            open={showAnnouncementDetailsDialog}
          >
            <div className="w-full">
              <div className=" mb-5 ">
                <div className=" rounded-md overflow-hidden h-full bg-[#EAEAEA]">
                  <img
                    alt="Announcement Img"
                    className=" h-full mx-auto object-contain"
                    src={displayingAnnouncement?.imageUrl}
                  />
                </div>
                <div className=" my-[10px] ">
                  <h1 className=" pt-[6px] text-[18px] font-medium ">
                    {displayingAnnouncement?.title}
                  </h1>
                  <div className=" flex justify-start items-center gap-[16px] mt-1">
                    <small className="text-[14px] font-medium text-gray-500 font-sans">
                      <span className="mr-1">
                        {handleDate(displayingAnnouncement?.dateTime)}
                      </span>
                      •
                      <span className="ml-1">
                        {handleTime(displayingAnnouncement?.dateTime)}
                      </span>
                    </small>
                    <div className=" bg-[#F7E7E9] text-[#E63946] w-fit h-fit py-[6px] px-[8px] rounded text-[12px] whitespace-nowrap font-bold uppercase">
                      {displayingAnnouncement?.urgency} URGENCY
                    </div>
                  </div>
                  <div className=" my-2">
                    <div
                      className="m-0 "
                      dangerouslySetInnerHTML={{
                        __html: displayingAnnouncement?.description,
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </DialogLayoutForFromControl>
          {announcements?.map((announcement, index) => {
            return (
              <div
                onClick={() => {
                  setDisplayingAnnouncement(announcement);
                  setShowAnnouncementDetailsDialog(true);
                }}
                key={index}
                className=" cursor-pointer"
              >
                <div className=" bg-[#f9fafb] grid grid-cols-12 mb-5 w-[700px] border border-[#E5E8EC] rounded-md">
                  <div className=" col-span-4 h-full bg-[#EAEAEA]">
                    <img
                      alt="Announcement Img"
                      className=" h-full mx-auto object-contain"
                      src={announcement?.imageUrl}
                    />
                  </div>
                  <div className=" col-span-8 my-[10px] mx-[20px]">
                    <div className=" flex justify-between items-center gap-[16px]">
                      <div className=" pt-[6px] text-[16px] font-medium ">
                        {announcement?.title}
                      </div>
                      <div className=" bg-[#F7E7E9] text-[#E63946] w-fit h-fit py-[6px] px-[8px] mt-1 rounded text-[12px] whitespace-nowrap font-bold uppercase">
                        {announcement?.urgency} URGENCY
                      </div>
                    </div>
                    <div className=" my-2">
                      <div
                        className="h-[100px] overflow-hidden m-0 text-[14px] text-gray-500 font-normal"
                        dangerouslySetInnerHTML={{
                          __html: announcement?.description,
                        }}
                      />
                    </div>
                    <small className="text-[14px] font-medium text-gray-500 font-sans">
                      <span className="mr-1">
                        {handleDate(announcement?.dateTime)}
                      </span>
                      •
                      <span className="ml-1">
                        {handleTime(announcement?.dateTime)}
                      </span>
                    </small>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Layout>
    </div>
  );
};

export default Announcements;