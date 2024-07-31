import React, { useContext } from "react";
import Layout from "../Layout";
import axios from "axios";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { AuthContext } from "../../../contexts/AuthProvider";
import Loading from "../../Shared/Loading/Loading";

const FindSchedule = () => {
    const {userInfo} = useContext(AuthContext)
  // const windowsUrl = `${window.location.origin}/taskDetails/${taskData?._id}?taskType=Schedule`

  const handleClick = async () => {
  /*  Loading()
    try {
        const response = await axios.post('http://localhost:5000/api/v1/tasks/findschedule',{userInfo});
      setCourse(response.data);
      Loading().close()
    } catch (error) {
      console.error(error);
      Loading().close()
    }  */
  };
  console.log(userInfo)

  const copyToClipboard = () => {
    const link = "https://www.youtube.com/";
    navigator.clipboard
      .writeText(link)
      .then(() => {
        toast("Link copied to clipboard!");
      })
      .catch((err) => {
        console.error("Failed to copy: ", err);
      });
  };

  return (
    <div>
      <Layout>
        <div className="bg-black h-[83px]"></div>

        <div className="pt-[300px] flex flex-col gap-10 justify-center items-center">
          <button
            onClick={handleClick}
            className="bg-indigo-700 text-white w-[200px] rounded-xl py-2 font-semibold"
          >
            Find schedule
          </button>
          <div className="flex items-center">
            <Link
              to={"https://www.youtube.com/"}
              className="border-2 border-black-500 shadow-md rounded-lg w-[400px] p-2"
            >
              https://www.youtube.com/
            </Link>
            <button
              onClick={copyToClipboard}
              className="ml-2 p-2 bg-blue-500  rounded-md"
            >
              <ContentCopyIcon/>
            </button>
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default FindSchedule;
