import React, { useState, useEffect } from "react";
import DialogLayoutForFromControl from "../Shared/DialogLayoutForFromControl";
import axios from "axios";
import toast from "react-hot-toast";

const ClassRecord = ({
  classRecordOpen,
  setClassRecordOpen,
  classRecordId,
  organizationId,
}) => {
  const [zoomInfo, setUserZoomInfo] = useState();

  useEffect(() => {
    const fetchZoomInfos = async () => {
      try {
        try {
          const response = await axios.post(
            `${process.env.REACT_APP_SERVERLESS_API}/api/v1/events/recording/organizationId/${organizationId}`,

            {
              meetingId: classRecordId,
              // meetingId: 87024149412,
            }
          );
         
          setUserZoomInfo(response?.data);
        } catch (error) {
          console.error(
            "Error fetching Zoom info for event ID:",
            classRecordId,

            error
          );
        }
      } catch (error) {
        console.error("Error in fetching Zoom infos:", error);
      }
    };
    if (classRecordId) {
      fetchZoomInfos();
    }
  }, [classRecordId, organizationId]);

 
  return (
    <div>
      <DialogLayoutForFromControl
        open={classRecordOpen}
        setOpen={(open) => {
          setClassRecordOpen(open);
        }}
        width={800}
        title={
          <p className="h-[90px] text-[22px] font-[700] flex items-center text-[#3E4DAC] px-[32px] py-5 border-b-2">
            Class Record
          </p>
        }
      >
        <div className="w-full">
          {zoomInfo ? (
            <div className="flex flex-col p-5">
              <p>
                <p className="text-xl font-semibold">
                  {" "}
                  Class record download link:{" "}
                </p>
                <p className="text-sm">
                  {zoomInfo?.recording_files[0]?.download_url}
                </p>
              </p>

              <a
                className="bg-blue text-white font-semibold rounded-lg p-3 w-[100px] mt-5"
                href={zoomInfo?.recording_files[0]?.download_url}
                target="_blank"
                rel="noopener noreferrer"
              >
                Download
              </a>
            </div>
          ) : (
            <p className="text-center py-5 text-lg font-semibold">No record exists.</p>
          )}
        </div>
      </DialogLayoutForFromControl>
    </div>
  );
};

export default ClassRecord;
