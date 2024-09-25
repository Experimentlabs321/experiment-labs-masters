import "react-circular-progressbar/dist/styles.css";

import React, { useContext, useEffect, useRef, useState } from "react";

import axios from "axios";
import { red } from "@mui/material/colors";
import { AuthContext } from "../../../contexts/AuthProvider";
import Layout from "../Layout";
import Loading from "../../Shared/Loading/Loading";
import { Link } from "react-router-dom";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import AccessAlarmOutlinedIcon from "@mui/icons-material/AccessAlarmOutlined";
import googlemeet from "../../../assets/icons/googlemeet.png";
import zoom from "../../../assets/icons/zoom-240.png";
import eye from "../../../assets/ExecutionMentor/eye.svg";
import toast from "react-hot-toast";
import ExecutionMentorBookSchedule from "./ExecutionMentorBookSchedule";
const RecordingMentor = ({ zoomId }) => {
  const { user, userInfo } = useContext(AuthContext);
  const [userZoomInfo, setUserZoomInfo] = useState({});
  // console.log(userInfo)
  useEffect(() => {
    const fetchZoomInfos = async () => {
      try {
        // Initialize an array to hold the combined data for each event
        let combinedZoomInfos = [];
        try {
          const response = await axios.post(
            `${process.env.REACT_APP_SERVERLESS_API}/api/v1/events/recording/organizationId/${userInfo?.organizationId}`,
            {
              meetingId: zoomId,
            }
          );
          // console.log(response);
          setUserZoomInfo(response?.data);
        } catch (error) {
          console.error(
            "Error fetching Zoom info for event ID:",
            zoomId,
            error
          );
        }
      } catch (error) {
        console.error("Error in fetching Zoom infos:", error);
      }
    };
    if (zoomId) {
      fetchZoomInfos();
    }
  }, [zoomId]);

  // console.log("zoominfo ",userZoomInfo)

  return (
    <div>
      {userZoomInfo?.account_id ? (
        <a
          className="bg-teal-500 text-white py-2 px-4 rounded-lg"
          target="_blank"
          rel="noreferrer"
          href={userZoomInfo?.recording_files[0]?.play_url}
        >
          Recording
        </a>
      ) : (
        <p className="text-sm text-left">Not available</p>
      )}
    </div>
  );
};

export default RecordingMentor;
