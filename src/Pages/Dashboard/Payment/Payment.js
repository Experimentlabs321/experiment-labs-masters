import React, { useContext, useEffect, useState } from "react";
import NavBar from "../../Shared/AppBar/NavBar";
import CourseTham from "../../../assets/Dashboard/CourseTham.png";
import axios from "axios";
import { AuthContext } from "../../../contexts/AuthProvider";
import { useParams } from "react-router-dom";

const Payment = () => {
  const { userInfo } = useContext(AuthContext);
  const { id } = useParams();
  const [course, setCourse] = useState([]);
  const [batchesData, setBatchesData] = useState([]);
  const [selectedBatch, setSelectedBatch] = useState({});
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_SERVER_API}/api/v1/courses/${id}`)
      .then((response) => {
        setCourse(response?.data);
      })
      .catch((error) => console.error(error));

    axios
      .get(`${process.env.REACT_APP_SERVER_API}/api/v1/batches/courseId/${id}`)
      .then((response) => {
        setBatchesData(response?.data);
      })
      .catch((error) => console.error(error));
  }, [id]);

  const date = new Date(course?.courseStartingDate);
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return (
    <div>
      <NavBar></NavBar>
      <div className="container mx-auto px-4 py-20">
        <div className="flex flex-col md:flex-row md:justify-center gap-10">
          <div>
            <div className="bg-[#F6F7FF] rounded-[20px] p-[20px] max-w-[340px] shadow-[4px_4px_4px_0px_#0000001a]">
              <div>
                <div className="card-content">
                  <div className="relative">
                    <img
                      className="w-full rounded-lg"
                      src={
                        course?.courseThumbnail
                          ? course?.courseThumbnail
                          : CourseTham
                      }
                      alt="CourseTham"
                    />
                  </div>
                  <h1 className="text-[#3E4DAC] text-[16px] font-[800] mt-[16px] mb-[12px]">
                    {course?.courseFullName}
                  </h1>
                  <p className="text-[#7A7A7A] text-[12px] font-[500] mb-[16px]">
                    {course?.courseDescription}
                  </p>
                  <div className="flex items-center justify-between">
                    <p className="bg-[#E1D7FF] px-[16px] py-[8px] rounded-[16px] text-[12px] font-[600] ">
                      {course?.courseCategory}
                    </p>
                    <button className="bg-[#CEDBFF] px-[16px] py-[8px] rounded-[16px] text-[12px] font-[600] ">
                      {date?.toLocaleDateString("en-US", options)}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="max-w-[450px]">
            <div className="mt-3">
              <h1 className=" text-[#737373] text-[24px] font-[500] mb-2 ">
                Select Batch
              </h1>
              <div className="flex flex-wrap">
                {!batchesData[0] && (
                  <div
                    className={`px-4 py-4 text-base border rounded-md font-semibold flex items-center justify-between gap-6 mr-1 text-[#949494]`}
                  >
                    No batch added yet!
                  </div>
                )}
                <select onChange={() => setSelectedBatch()}>
                  <option>Select Batch</option>
                  {batchesData?.map((item, index) => (
                    <option
                      key={index}
                      className={`px-3 py-3 text-base border rounded-md font-semibold flex items-center justify-between gap-6 m-1 ${
                        selectedBatch?._id === item?._id
                          ? "text-[#0A98EA] border-t-2 border-t-[#0A98EA]"
                          : "text-[#949494]"
                      }`}
                      // onClick={() => handleSelectCourse(item)}
                      onMouseEnter={() => setSelectedBatch(item)}
                    >
                      {item?.batchName}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
