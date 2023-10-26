import React, { useContext, useEffect, useState } from "react";
import Layout from "../Layout";
import { AuthContext } from "../../../contexts/AuthProvider";
import axios from "axios";

const UpdateOrganization = () => {
  const { userInfo } = useContext(AuthContext);
  const [orgData, setOrgData] = useState({});
  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_SERVER_API}/api/v1/organizations/${userInfo?.organizationId}`
      )
      .then((response) => {
        setOrgData(response?.data);
      })
      .catch((error) => console.error(error));
  }, [userInfo]);
  console.log(orgData);
  return (
    <div>
      <Layout>
        <div className="px-4 mt-5">
          <div className="flex flex-col mt-5">
            <label className="font-bold text-lg">Login title</label>
            <input
              type="text"
              name="loginTitle"
              className="border rounded-md max-w-[430px] h-[50px] ps-2 text-[#535353] focus:outline-0 bg-[#F6F7FF]"
            />
          </div>
          <div className="flex flex-col mt-5">
            <label className="font-bold text-lg">Login sub-title</label>
            <input
              type="text"
              name="loginSubTitle"
              className="border rounded-md max-w-[430px] h-[50px] ps-2 text-[#535353] focus:outline-0 bg-[#F6F7FF]"
            />
          </div>
          <div className="flex flex-col mt-5">
            <label className="font-bold text-lg">Titles color</label>
            <ul className="flex gap-4 flex-wrap ">
              <li className="cursor-pointer flex mb-2 items-center py-2 text-[#6A6A6A] text-[14px] font-[400] ">
                <input
                  type="radio"
                  id="student"
                  name="black"
                  value="black"
                  checked={orgData?.titlesColor === "black"}
                  // onChange={() => setSelectedBatch(option)}
                  className=" mb-1"
                />
                <div className="flex mb-1 items-center">
                  <label className="ms-4" htmlFor="black">
                    Black
                  </label>
                </div>
              </li>
              <li className="cursor-pointer flex mb-2 items-center py-2 text-[#6A6A6A] text-[14px] font-[400] ">
                <input
                  type="radio"
                  id="student"
                  name="white"
                  value="white"
                  checked={orgData?.titlesColor === "white"}
                  // onChange={() => setSelectedBatch(option)}
                  className=" mb-1"
                />
                <div className="flex mb-1 items-center">
                  <label className="ms-4" htmlFor="white">
                    White
                  </label>
                </div>
              </li>
              <li className="cursor-pointer flex mb-2 items-center py-2 text-[#6A6A6A] text-[14px] font-[400] ">
                <input
                  type="radio"
                  id="student"
                  name="green"
                  value="green"
                  checked={orgData?.titlesColor === "green"}
                  // onChange={() => setSelectedBatch(option)}
                  className=" mb-1"
                />
                <div className="flex mb-1 items-center">
                  <label className="ms-4" htmlFor="green">
                    Green
                  </label>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default UpdateOrganization;
