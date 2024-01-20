import React, { useContext, useEffect, useState } from "react";
import Layout from "../Layout";
import { AuthContext } from "../../../contexts/AuthProvider";
import axios from "axios";
import UploadFile from "../../Shared/UploadFile/UploadFile";
import toast from "react-hot-toast";
import DashboardTheme from "./DashboardTheme";

const UpdateOrganization = () => {
  const { userInfo } = useContext(AuthContext);
  const [orgData, setOrgData] = useState({});
  const [orgLogoUrl, setOrgLogoUrl] = useState("");
  const [loginSidebarImage, setLoginSidebarImage] = useState("");
  const [titlesColor, setTitlesColor] = useState("");
  const [dashboardTheme, setDashboardTheme] = useState({});
  const [currentPage, setCurrentPage] = useState("organizationTheme")


  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_SERVER_API}/api/v1/organizations/${userInfo?.organizationId}`
      )
      .then((response) => {
        setOrgData(response?.data);
        setOrgLogoUrl(response?.data?.org_logo);
        setLoginSidebarImage(response?.data?.loginSidebarImage);
        setTitlesColor(response?.data?.titlesColor);
        setDashboardTheme(response?.data?.dashboardTheme || {});
      })
      .catch((error) => console.error(error));
  }, [userInfo]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.target;

    const orgInfo = {
      organizationName: orgData?.organizationName,
      email: orgData?.email,
      loginTitle: form.loginTitle?.value,
      loginSubTitle: form.loginSubTitle?.value,
      org_logo: orgLogoUrl,
      loginSidebarImage: loginSidebarImage,
      titlesColor: titlesColor,
      DashboardTheme: dashboardTheme
    };
    console.log(orgInfo);

    const updateOrg = await axios.put(
      `${process.env.REACT_APP_SERVER_API}/api/v1/organizations/${orgData?._id}`,
      orgInfo
    );

    if (updateOrg?.data?.acknowledged) {
      toast.success("Organization edited Successfully");
      // event.target.reset();
    }
  };

  return (
    <div>
      <Layout>

        <div className="px-4 mt-4 flex items-center gap-4">
          <button
            onClick={() => setCurrentPage("organizationTheme")}
            className={`px-4 py-2 text-lg font-semibold rounded-lg ${currentPage === "organizationTheme" ? "bg-[#3E4DAC] text-white" : "bg-white border-2 border-gray-400 text-black"}`}>
            Organization Theme
          </button>
          <button
            onClick={() => setCurrentPage("dashboardTheme")}
            className={`px-4 py-2 text-lg font-semibold rounded-lg ${currentPage === "dashboardTheme" ? "bg-[#3E4DAC] text-white" : "bg-white border-2 border-gray-400 text-black"}`}>
            Dashboard Theme
          </button>
        </div>

        {currentPage === "organizationTheme" && <div>
          <h1 className="px-4 mt-4 text-lg font-bold font-sans">
            Organization ID: {orgData?._id}
          </h1>
          <form onSubmit={handleSubmit} className="px-4 mt-1">
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
                  defaultValue={orgData?.loginTitle}
                  name="loginTitle"
                  className="border rounded-md max-w-[430px] h-[50px] ps-2 text-[#535353] focus:outline-0 bg-[#F6F7FF]"
                />
              </div>
              <div className="flex flex-col mt-5 basis-1/2">
                <label className="font-bold text-lg">Login sub-title</label>
                <input
                  type="text"
                  name="loginSubTitle"
                  defaultValue={orgData?.loginSubTitle}
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
              <label className="font-bold text-lg">Title & sub-title color</label>
              <ul className="flex gap-4 flex-wrap ">
                <li className="cursor-pointer flex mb-2 items-center py-2 text-[#6A6A6A] text-[14px] font-[400] ">
                  <input
                    type="radio"
                    id="student"
                    name="black"
                    value="black"
                    checked={titlesColor === "black"}
                    onChange={() => setTitlesColor("black")}
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
                    checked={titlesColor === "white"}
                    onChange={() => setTitlesColor("white")}
                    className=" mb-1"
                  />
                  <div className="flex mb-1 items-center">
                    <label className="ms-4" htmlFor="white">
                      White
                    </label>
                  </div>
                </li>
              </ul>
            </div>
            <input
              className="bg-green text-white py-3 px-4 font-bold rounded-lg"
              value="Save"
              type="submit"
            />
          </form>
        </div>}

        {
          currentPage === "dashboardTheme" &&
          <DashboardTheme
            userInfo={userInfo}
            orgData={orgData}
            orgLogoUrl={orgLogoUrl}
            loginSidebarImage={loginSidebarImage}
            titlesColor={titlesColor}
            dashboardTheme={dashboardTheme}
            setDashboardTheme={setDashboardTheme}
          />
        }
      </Layout>
    </div>
  );
};

export default UpdateOrganization;
