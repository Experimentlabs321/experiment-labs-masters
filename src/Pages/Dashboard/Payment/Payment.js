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
    <div className="bg-[#f6f7ff91] h-[100vh]">
      <NavBar></NavBar>
      <div className="container mx-auto px-4 py-28">
        <div className="flex flex-col md:flex-row md:justify-center gap-20">
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
          <div className="max-w-[500px] min-w-[350px]">
            <div className="mt-3">
              <h1 className=" text-black text-base font-[500] ">
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
                {batchesData[0] && (
                  <select
                    className="mt-1 p-2 border w-full rounded-md bg-white"
                    onChange={(e) =>
                      setSelectedBatch(batchesData[e.target.value])
                    }
                  >
                    <option className="hidden">Select Batch</option>
                    {batchesData?.map((item, index) => (
                      <option
                        key={index}
                        className={`px-3 py-3 text-base border rounded-md font-semibold flex items-center justify-between gap-6 m-1 ${
                          selectedBatch?._id === item?._id
                            ? "text-[#0A98EA] border-t-2 border-t-[#0A98EA]"
                            : "text-[#949494]"
                        }`}
                        value={index}
                        // onClick={() => handleSelectCourse(item)}
                        onMouseDown={() => setSelectedBatch(item)}
                      >
                        {item?.batchName}
                      </option>
                    ))}
                  </select>
                )}
              </div>
            </div>
            {selectedBatch?._id && (
              <>
                <div className="mt-3">
                  <h1 className=" text-black text-base font-[500] ">
                    Apply Coupon
                  </h1>
                  <div className="flex mt-1 border w-full rounded-md bg-white">
                    <input
                      className=" bg-transparent w-full p-2 focus:outline-none"
                      type="text"
                      placeholder="Enter Coupon Code"
                    />
                    <button className=" text-[#5e52ff] bg-[#5e52ff0c] p-2 rounded-sm">
                      Apply
                    </button>
                  </div>
                </div>
                <div className="mt-3">
                  <h1 className=" text-gray-400 mb-1 text-base font-[500] ">
                    Applicable Coupons
                  </h1>
                  <div className="bg-gradient-to-b from-white to-[#ebf1ff] rounded-[7px] border border-blue px-[10px] py-[12px]">
                    <div className="flex items-center justify-between uppercase text-[1.25rem] font-bold">
                      <h3>23.1%</h3>
                      <h4 className=" text-blue">PRES23</h4>
                    </div>
                    <p className=" flex items-center justify-between text-[14px]">
                      <span>UPTO ₹300</span>
                      <span>EXPIRES ON 31 Mar 2024</span>
                    </p>
                    <p className="mt-[10px] font-[600] text-[1.07rem]">
                      Valid for first 20 learners daily.{" "}
                    </p>
                  </div>
                </div>
                <hr className="my-6" />
                <div className="mt-3">
                  <div className="p-3 border rounded-md shadow">
                    <label className=" text-[#2a2a2a80] py-2">
                      Price Details
                    </label>
                    <div className="table-responsive price-details">
                      <table className="table w-full">
                        <tbody>
                          <tr>
                            <td id="bundle-cost-name" className="py-2">
                              Total Price
                            </td>
                            <td id="bundle-cost" className="py-2">
                              ₹1299
                            </td>
                          </tr>
                          <tr
                            style={{
                              display: "table-row",
                            }}
                            className="py-2"
                          >
                            <td>Coupon Discount</td>
                            <td className="py-2" id="coupon-discount">
                              ₹0
                            </td>
                          </tr>
                        </tbody>
                        <tfoot className="border-t">
                          <tr>
                            <td className="py-2">Total</td>
                            <td className="py-2" id="total-to-be-paid">
                              ₹1299.00
                            </td>
                          </tr>
                        </tfoot>
                      </table>
                    </div>
                  </div>
                </div>
                <hr className="mt-6" />
                <div className="mt-3">
                  <div className="flex justify-between mb-5">
                    <div className="sum-block-details">
                      <p className="m-0">Net Payable amount</p>
                      <h4 className="m-0 text-2xl">₹999.00</h4>
                    </div>
                    <div>
                      <button
                        id="enroll-now-btn"
                        className=" px-[18px] py-[9px] text-white font-bold bg-blue rounded-md"
                      >
                        Pay Now
                      </button>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
