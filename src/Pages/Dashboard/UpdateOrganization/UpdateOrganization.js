import React, { useContext, useEffect, useState } from "react";
import Layout from "../Layout";
import { AuthContext } from "../../../contexts/AuthProvider";
import axios from "axios";
import UploadFile from "../../Shared/UploadFile/UploadFile";

const UpdateOrganization = () => {
  const { userInfo } = useContext(AuthContext);
  const [orgData, setOrgData] = useState({});
  const [orgLogoUrl, setOrgLogoUrl] = useState("");
  const [loginSidebarImage, setLoginSidebarImage] = useState("");

  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_SERVER_API}/api/v1/organizations/${userInfo?.organizationId}`
      )
      .then((response) => {
        setOrgData(response?.data);
        setOrgLogoUrl(response?.data?.org_logo);
      })
      .catch((error) => console.error(error));
  }, [userInfo]);
  console.log(orgLogoUrl);
  const handleSubmit = async (event) => {};
  return (
    <div>
      <Layout>
        <form onSubmit={handleSubmit} className="px-4 mt-5">
          <div className="flex gap-4">
            <div className="flex flex-col mt-5 basis-1/2">
              <label className="font-bold text-lg">Logo</label>
              <UploadFile setFileUrl={setOrgLogoUrl}>
                <div>
                  <img
                    className="mx-auto animate-pulse"
                    style={{ height: "70px", width: "70px" }}
                    src="https://i.ibb.co/gJLdW8G/cloud-upload-regular-240.png"
                    alt=""
                  />
                  <p className="text-xl text-gray-400">Drag & Drop your file</p>
                  <p className="py-4">
                    <span className="rounded-lg bg-gray-400 px-3 py-3 font-semibold">
                      {/* <BiVideoPlus className="animate-bounce" /> */}
                      Upload Logo
                    </span>
                  </p>
                </div>
              </UploadFile>
            </div>
            <div className="flex flex-col mt-5 basis-1/2">
              <label className="font-bold text-lg">Current Logo</label>
              {orgLogoUrl ? (
                <img
                  className="mx-auto my-auto max-w-[200px]"
                  src={orgLogoUrl}
                  alt="Logo"
                />
              ) : (
                <p className="text-center font-bold text-lg my-auto">
                  Logo has not added!
                </p>
              )}
            </div>
          </div>
          <div className="flex gap-4">
            <div className="flex flex-col mt-5 basis-1/2">
              <label className="font-bold text-lg">Login title</label>
              <input
                type="text"
                name="loginTitle"
                className="border rounded-md max-w-[430px] h-[50px] ps-2 text-[#535353] focus:outline-0 bg-[#F6F7FF]"
              />
            </div>
            <div className="flex flex-col mt-5 basis-1/2">
              <label className="font-bold text-lg">Login sub-title</label>
              <input
                type="text"
                name="loginSubTitle"
                className="border rounded-md max-w-[430px] h-[50px] ps-2 text-[#535353] focus:outline-0 bg-[#F6F7FF]"
              />
            </div>
          </div>
          <div className="flex gap-4">
            <div className="flex flex-col mt-5 basis-1/2">
              <label className="font-bold text-lg">Login sidebar image</label>
              <UploadFile setFileUrl={setLoginSidebarImage}>
                <div>
                  <img
                    className="mx-auto animate-pulse"
                    style={{ height: "70px", width: "70px" }}
                    src="https://i.ibb.co/gJLdW8G/cloud-upload-regular-240.png"
                    alt=""
                  />
                  <p className="text-xl text-gray-400">Drag & Drop your file</p>
                  <p className="py-4">
                    <span className="rounded-lg bg-gray-400 px-3 py-3 font-semibold">
                      {/* <BiVideoPlus className="animate-bounce" /> */}
                      Upload Image
                    </span>
                  </p>
                </div>
              </UploadFile>
            </div>
            <div className="flex flex-col mt-5 basis-1/2">
              <label className="font-bold text-lg">Current image</label>
              {loginSidebarImage ? (
                <img
                  className="mx-auto my-auto max-w-[200px]"
                  src={loginSidebarImage}
                  alt="Logo"
                />
              ) : (
                <p className="text-center font-bold text-lg my-auto">
                  Image has not added!
                </p>
              )}
            </div>
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
        </form>
      </Layout>
    </div>
  );
};

export default UpdateOrganization;
