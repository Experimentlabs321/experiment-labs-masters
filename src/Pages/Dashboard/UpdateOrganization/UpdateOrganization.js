import React, { useContext, useEffect, useState } from "react";
import Layout from "../Layout";
import { AuthContext } from "../../../contexts/AuthProvider";
import axios from "axios";
import UploadFile from "../../Shared/UploadFile/UploadFile";
import toast from "react-hot-toast";
import DashboardTheme from "./DashboardTheme";
import PaymentIntegration from "./PaymentIntegration";
import DeviceLimit from "./DeviceLimit";
import Loading from "../../Shared/Loading/Loading";
import { useNavigate } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import LanguageSetting from "./LanguageSetting/LanguageSetting";
import EmailIntegration from "./EmailIntegration";

const UpdateOrganization = () => {

  const navigate = useNavigate();
  const { userInfo } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(true);
  const [orgData, setOrgData] = useState({});
  const [orgLogoUrl, setOrgLogoUrl] = useState("");
  const [faviconUrl, setFaviconUrl] = useState("");
  const [loginPageOrgLogoUrl, setLoginPageOrgLogoUrl] = useState("");
  const [loginSidebarImage, setLoginSidebarImage] = useState("");
  const [paymentNavbarLogo, setPaymentNavbarLogo] = useState("");
  const [pWALogo, setPWALogo] = useState("");
  const [pWASplashscreenLogo, setPWASplashscreenLogo] = useState("");
  const [titlesColor, setTitlesColor] = useState("");
  const [dashboardTheme, setDashboardTheme] = useState({});
  const [currentPage, setCurrentPage] = useState("organizationTheme");
  const [paymentInstance, setPaymentInstance] = useState({});
  const [maxDeviceCount, setMaxDeviceCount] = useState(0);
  const [paymentNavbarColor, setPaymentNavbarColor] = useState(
    orgData?.paymentNavbarColor || "#3E4DAC"
  );
  const [
    paymentNavbarAccessDashboardButtonColor,
    setPaymentNavbarAccessDashboardButtonColor,
  ] = useState(orgData?.paymentNavbarAccessDashboardButtonColor || "#3E4DAC");
  const [
    paymentNavbarAccessDashboardButtonTextColor,
    setPaymentNavbarAccessDashboardButtonTextColor,
  ] = useState(orgData?.paymentNavbarAccessDashboardButtonTextColor || "#fff");
  const [paymentNavbarLogoutButtonColor, setPaymentNavbarLogoutButtonColor] =
    useState(orgData?.paymentNavbarLogoutButtonColor || "#3E4DAC");
  const [
    paymentNavbarLogoutButtonTextColor,
    setPaymentNavbarLogoutButtonTextColor,
  ] = useState(orgData?.paymentNavbarLogoutButtonTextColor || "#fff");
  const [courseAccessUrl, setCourseAccessUrl] = useState(
    `/courseAccess?state=allCourses`
  );
 /*  console.log(paymentNavbarAccessDashboardButtonColor);
  console.log(paymentNavbarAccessDashboardButtonTextColor);
  console.log(paymentNavbarLogoutButtonColor);
  console.log(paymentNavbarLogoutButtonTextColor); */
  const [loading, setLoading] = useState(false);
  const [itemDetails, setItemDetails] = useState();
  useEffect(() => {
    if (userInfo) {
      setLoading(true);
      axios
        .get(
          `${process.env.REACT_APP_SERVER_API}/api/v1/language/getUpdateOrganizationSubDetailsByOrganizationAndName/organizationTheme/organizationsId/${userInfo?.organizationId}`
        )
        .then((response) => {

          console.log(response)
          setItemDetails(response?.data);

        })
        .finally(() => {
          setLoading(false);
        });
    }
    setLoading(false);
  }, [userInfo]);
  //console.log(itemDetails)

  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_SERVER_API}/api/v1/organizations/${userInfo?.organizationId}`
      )
      .then((response) => {
        setOrgData(response?.data);
        setOrgLogoUrl(response?.data?.org_logo);
        setFaviconUrl(response?.data?.favicon);
        setLoginPageOrgLogoUrl(response?.data?.loginPageOrgLogo);
        setLoginSidebarImage(response?.data?.loginSidebarImage);
        setPaymentNavbarLogo(response?.data?.paymentNavbarLogo);
        setPWALogo(response?.data?.pWALogo);
        setPWASplashscreenLogo(response?.data?.pWASplashscreenLogo);
        setTitlesColor(response?.data?.titlesColor);
        setPaymentNavbarColor(response?.data?.paymentNavbarColor);
        setPaymentNavbarAccessDashboardButtonColor(
          response?.data?.paymentNavbarAccessDashboardButtonColor
        );
        setPaymentNavbarAccessDashboardButtonTextColor(
          response?.data?.paymentNavbarAccessDashboardButtonTextColor
        );
        setPaymentNavbarLogoutButtonColor(
          response?.data?.paymentNavbarLogoutButtonColor
        );
        setPaymentNavbarLogoutButtonTextColor(
          response?.data?.paymentNavbarLogoutButtonTextColor
        );
        setDashboardTheme(response?.data?.dashboardTheme || {});
        setPaymentInstance(response?.data?.paymentInstance || {});
        setMaxDeviceCount(response?.data?.maxDeviceCount || 0);
        setCourseAccessUrl(
          response?.data?.courseAccessUrl || "/courseAccess?state=allCourses"
        );
      })
      .catch((error) => console.error(error));
    setIsLoading(false);
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
      favicon: faviconUrl,
      loginPageOrgLogo: loginPageOrgLogoUrl,
      loginSidebarImage: loginSidebarImage,
      paymentNavbarLogo: paymentNavbarLogo,
      pWALogo: pWALogo,
      pWASplashscreenLogo: pWASplashscreenLogo,
      titlesColor: titlesColor,
      orgRootUrl: form.orgRootUrl?.value,
      paymentNavbarColor: paymentNavbarColor,
      paymentNavbarAccessDashboardButtonColor:
        paymentNavbarAccessDashboardButtonColor,
      paymentNavbarAccessDashboardButtonTextColor:
        paymentNavbarAccessDashboardButtonTextColor,
      paymentNavbarLogoutButtonColor: paymentNavbarLogoutButtonColor,
      paymentNavbarLogoutButtonTextColor: paymentNavbarLogoutButtonTextColor,
      dashboardTheme: dashboardTheme,
      courseAccessUrl,
    };
    console.log(orgInfo);

    const updateOrg = await axios.put(
      `${process.env.REACT_APP_SERVER_API}/api/v1/organizations/${orgData?._id}`,
      orgInfo
    );

    if (updateOrg?.data?.acknowledged) {
      toast.success("Organization edited Successfully");
      navigate(-1);
      // event.target.reset();
    }
  };

  console.log(paymentNavbarColor);

  return (
    <div>
      <Layout>
        <div className="px-4 mt-4 flex items-center gap-4 flex-wrap">
          <button
            onClick={() => setCurrentPage("organizationTheme")}
            className={`px-4 py-2 text-lg font-semibold rounded-lg ${
              currentPage === "organizationTheme"
                ? "bg-[#3E4DAC] text-white"
                : "bg-white border-2 border-gray-400 text-black"
            }`}
          >
            {itemDetails?.organizationTheme ? itemDetails?.organizationTheme :"Organization Theme"}
            
          </button>
          <button
            onClick={() => setCurrentPage("dashboardTheme")}
            className={`px-4 py-2 text-lg font-semibold rounded-lg ${
              currentPage === "dashboardTheme"
                ? "bg-[#3E4DAC] text-white"
                : "bg-white border-2 border-gray-400 text-black"
            }`}
          >
            {itemDetails?.dashboardTheme ? itemDetails?.dashboardTheme :"Dashboard Theme"}
            
          </button>
          <button
            onClick={() => setCurrentPage("paymentIntegration")}
            className={`px-4 py-2 text-lg font-semibold rounded-lg ${
              currentPage === "paymentIntegration"
                ? "bg-[#3E4DAC] text-white"
                : "bg-white border-2 border-gray-400 text-black"
            }`}
          >
            {itemDetails?.paymentIntegration ? itemDetails?.paymentIntegration :"Payment Integration"}
            
          </button>
          <button
            onClick={() => setCurrentPage("deviceLimit")}
            className={`px-4 py-2 text-lg font-semibold rounded-lg ${
              currentPage === "deviceLimit"
                ? "bg-[#3E4DAC] text-white"
                : "bg-white border-2 border-gray-400 text-black"
            }`}
          >
            {itemDetails?.limitDevice ? itemDetails?.limitDevice :"Limit Device"}
            
          </button>
          <button
            onClick={() => setCurrentPage("language Setting")}
            className={`px-4 py-2 text-lg font-semibold rounded-lg ${
              currentPage === "language Setting"
                ? "bg-[#3E4DAC] text-white"
                : "bg-white border-2 border-gray-400 text-black"
            }`}
          >
            {itemDetails?.languageSetting ? itemDetails?.languageSetting :"Language Setting"}
            
          </button>
          <button
            onClick={() => setCurrentPage("emailIntegration")}
            className={`px-4 py-2 text-lg font-semibold rounded-lg ${
              currentPage === "emailIntegration"
                ? "bg-[#3E4DAC] text-white"
                : "bg-white border-2 border-gray-400 text-black"
            }`}
          >
            {itemDetails?.emailIntegration ? itemDetails?.emailIntegration :"Email Integration"}
           
            
          </button>
        </div>

        {currentPage === "organizationTheme" && (
          <div>
            <h1 className="px-4 mt-4 text-lg font-bold font-sans">
            {itemDetails?.organizationID ? itemDetails?.organizationID :"Organization ID"} : {orgData?._id}
            </h1>
            <form onSubmit={handleSubmit} className="px-4 mt-1">
              <div className="flex gap-4">
                <div className="flex flex-col mt-5 basis-1/2">
                  <label className="font-bold text-lg">{itemDetails?.favicon ? itemDetails?.favicon :"Favicon"}</label>
                  <UploadFile setFileUrl={setFaviconUrl}>
                    <div>
                      <img
                        className="mx-auto animate-pulse"
                        style={{ height: "70px", width: "70px" }}
                        src="https://i.ibb.co/gJLdW8G/cloud-upload-regular-240.png"
                        alt=""
                      />
                      <p className="text-xl text-gray-400">
                      {itemDetails?.dragAndDropYourFile ? itemDetails?.dragAndDropYourFile :"Drag & Drop your file"}
                        
                      </p>
                      <p className="py-4">
                        <span className="rounded-lg bg-gray-400 px-3 py-3 font-semibold">
                          {/* <BiVideoPlus className="animate-bounce" /> */}
                          {itemDetails?.uploadFavicon ? itemDetails?.uploadFavicon :"Upload Favicon"}
                          
                        </span>
                      </p>
                    </div>
                  </UploadFile>
                </div>
                <div className="flex flex-col mt-5 basis-1/2">
                  <label className="font-bold text-lg"> {itemDetails?.currentFavicon ? itemDetails?.currentFavicon :"Current Favicon"}</label>
                  {faviconUrl ? (
                    <img
                      className="mx-auto my-auto max-w-[200px]"
                      src={faviconUrl}
                      alt="Logo"
                    />
                  ) : (
                    <p className="text-center font-bold text-lg my-auto">
                      {itemDetails?.faviconHasNotAdded ? itemDetails?.faviconHasNotAdded :"Favicon has not added"}
                      !
                    </p>
                  )}
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex flex-col mt-5 basis-1/2">
                  <label className="font-bold text-lg">{itemDetails?.logo ? itemDetails?.logo :"Logo"}</label>
                  <UploadFile setFileUrl={setOrgLogoUrl}>
                    <div>
                      <img
                        className="mx-auto animate-pulse"
                        style={{ height: "70px", width: "70px" }}
                        src="https://i.ibb.co/gJLdW8G/cloud-upload-regular-240.png"
                        alt=""
                      />
                      <p className="text-xl text-gray-400">
                      {itemDetails?.dragAndDropYourFile ? itemDetails?.dragAndDropYourFile :"Drag & Drop your file"}
                        
                      </p>
                      <p className="py-4">
                        <span className="rounded-lg bg-gray-400 px-3 py-3 font-semibold">
                          {/* <BiVideoPlus className="animate-bounce" /> */}
                          {itemDetails?.uploadLogo ? itemDetails?.uploadLogo :"Upload Logo"}
                          
                        </span>
                      </p>
                    </div>
                  </UploadFile>
                </div>
                <div className="flex flex-col mt-5 basis-1/2">
                  <label className="font-bold text-lg">{itemDetails?.currentLogo ? itemDetails?.currentLogo :"Current Logo"}</label>
                  {orgLogoUrl ? (
                    <img
                      className="mx-auto my-auto max-w-[200px]"
                      src={orgLogoUrl}
                      alt="Logo"
                    />
                  ) : (
                    <p className="text-center font-bold text-lg my-auto">
                      {itemDetails?.logoHasNotAdded ? itemDetails?.logoHasNotAdded :"Logo has not added"}
                      !
                    </p>
                  )}
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex flex-col mt-5 basis-1/2">
                  <label className="font-bold text-lg">
                  {itemDetails?.logoForLoginPage ? itemDetails?.logoForLoginPage :"Logo for login page"}
                    
                  </label>
                  <UploadFile setFileUrl={setLoginPageOrgLogoUrl}>
                    <div>
                      <img
                        className="mx-auto animate-pulse"
                        style={{ height: "70px", width: "70px" }}
                        src="https://i.ibb.co/gJLdW8G/cloud-upload-regular-240.png"
                        alt=""
                      />
                      <p className="text-xl text-gray-400">
                      {itemDetails?.dragAndDropYourFile ? itemDetails?.dragAndDropYourFile :"Drag & Drop your file"}
                        
                      </p>
                      <p className="py-4">
                        <span className="rounded-lg bg-gray-400 px-3 py-3 font-semibold">
                          {/* <BiVideoPlus className="animate-bounce" /> */}
                          {itemDetails?.uploadLogo ? itemDetails?.uploadLogo :"Upload Logo"}
                          
                        </span>
                      </p>
                    </div>
                  </UploadFile>
                </div>
                <div className="flex flex-col mt-5 basis-1/2">
                  <label className="font-bold text-lg">
                  {itemDetails?.currentLoginPageLogo ? itemDetails?.currentLoginPageLogo :"Current Login Page Logo"}
                    
                  </label>
                  {loginPageOrgLogoUrl ? (
                    <img
                      className="mx-auto my-auto max-w-[200px]"
                      src={loginPageOrgLogoUrl}
                      alt="Logo"
                    />
                  ) : (
                    <p className="text-center font-bold text-lg my-auto">
                      {itemDetails?.logoHasNotAdded ? itemDetails?.logoHasNotAdded :"Logo has not added"}
                      !
                    </p>
                  )}
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex flex-col mt-5 basis-1/2">
                  <label className="font-bold text-lg">{itemDetails?.loginTitle ? itemDetails?.loginTitle :"Login title"}</label>
                  <input
                    type="text"
                    defaultValue={orgData?.loginTitle}
                    name="loginTitle"
                    className="border rounded-md max-w-[430px] h-[50px] ps-2 text-[#535353] focus:outline-0 bg-[#F6F7FF]"
                  />
                </div>
                <div className="flex flex-col mt-5 basis-1/2">
                  <label className="font-bold text-lg">{itemDetails?.loginSubTitle ? itemDetails?.loginSubTitle :"Login sub-title"}</label>
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
                  <label className="font-bold text-lg">
                  {itemDetails?.loginSidebarImage ? itemDetails?.loginSidebarImage :"Login sidebar image"}
                    
                  </label>
                  <UploadFile setFileUrl={setLoginSidebarImage}>
                    <div>
                      <img
                        className="mx-auto animate-pulse"
                        style={{ height: "70px", width: "70px" }}
                        src="https://i.ibb.co/gJLdW8G/cloud-upload-regular-240.png"
                        alt=""
                      />
                      <p className="text-xl text-gray-400">
                      {itemDetails?.dragAndDropYourFile ? itemDetails?.dragAndDropYourFile :"Drag & Drop your file"}
                        
                      </p>
                      <p className="py-4">
                        <span className="rounded-lg bg-gray-400 px-3 py-3 font-semibold">
                          {/* <BiVideoPlus className="animate-bounce" /> */}
                          {itemDetails?.uploadImage ? itemDetails?.uploadImage :"Upload Image"}
                          
                        </span>
                      </p>
                    </div>
                  </UploadFile>
                </div>
                <div className="flex flex-col mt-5 basis-1/2">
                  <label className="font-bold text-lg">{itemDetails?.currentImage ? itemDetails?.currentImage :"Current image"}</label>
                  {loginSidebarImage ? (
                    <img
                      className="mx-auto my-auto max-w-[200px]"
                      src={loginSidebarImage}
                      alt="Logo"
                    />
                  ) : (
                    <p className="text-center font-bold text-lg my-auto">
                      {itemDetails?.imageHasNotAdded ? itemDetails?.imageHasNotAdded :"Image has not added"}
                      !
                    </p>
                  )}
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex flex-col mt-5 basis-1/2">
                  <label className="font-bold text-lg">
                  {itemDetails?.paymentNavbarLogo ? itemDetails?.paymentNavbarLogo :"Payment navbar logo"}
                    
                  </label>
                  <UploadFile setFileUrl={setPaymentNavbarLogo}>
                    <div>
                      <img
                        className="mx-auto animate-pulse"
                        style={{ height: "70px", width: "70px" }}
                        src="https://i.ibb.co/gJLdW8G/cloud-upload-regular-240.png"
                        alt=""
                      />
                      <p className="text-xl text-gray-400">
                      {itemDetails?.dragAndDropYourFile ? itemDetails?.dragAndDropYourFile :"Drag & Drop your file"}
                        
                      </p>
                      <p className="py-4">
                        <span className="rounded-lg bg-gray-400 px-3 py-3 font-semibold">
                          {/* <BiVideoPlus className="animate-bounce" /> */}
                          {itemDetails?.uploadImage ? itemDetails?.uploadImage :"Upload Image"}
                          
                        </span>
                      </p>
                    </div>
                  </UploadFile>
                </div>
                <div className="flex flex-col mt-5 basis-1/2">
                  <label className="font-bold text-lg"> {itemDetails?.currentImage ? itemDetails?.currentImage :"Current image"}</label>
                  {paymentNavbarLogo ? (
                    <img
                      className="mx-auto my-auto max-w-[200px]"
                      src={paymentNavbarLogo}
                      alt="Logo"
                    />
                  ) : (
                    <p className="text-center font-bold text-lg my-auto">
                       {itemDetails?.logoHasNotAdded ? itemDetails?.logoHasNotAdded :"Logo has not added"}
                      !
                    </p>
                  )}
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex flex-col mt-5 basis-1/2">
                  <label className="font-bold text-lg">
                  {itemDetails?.progressiveWebAppLogo ? itemDetails?.progressiveWebAppLogo :"Progressive web app logo"}
                    
                  </label>
                  <UploadFile setFileUrl={setPWALogo}>
                    <div>
                      <img
                        className="mx-auto animate-pulse"
                        style={{ height: "70px", width: "70px" }}
                        src="https://i.ibb.co/gJLdW8G/cloud-upload-regular-240.png"
                        alt=""
                      />
                      <p className="text-xl text-gray-400">
                      {itemDetails?.dragAndDropYourFile ? itemDetails?.dragAndDropYourFile :"Drag & Drop your file"}
                        
                      </p>
                      <p className="py-4">
                        <span className="rounded-lg bg-gray-400 px-3 py-3 font-semibold">
                          {/* <BiVideoPlus className="animate-bounce" /> */}
                          {itemDetails?.uploadImage ? itemDetails?.uploadImage :"Upload Image"}
                          
                        </span>
                      </p>
                    </div>
                  </UploadFile>
                </div>
                <div className="flex flex-col mt-5 basis-1/2">
                  <label className="font-bold text-lg"> {itemDetails?.currentImage ? itemDetails?.currentImage :"Current image"}</label>
                  {pWALogo ? (
                    <img
                      className="mx-auto my-auto max-w-[200px]"
                      src={pWALogo}
                      alt="Logo"
                    />
                  ) : (
                    <p className="text-center font-bold text-lg my-auto">
                       {itemDetails?.logoHasNotAdded ? itemDetails?.logoHasNotAdded :"Logo has not added"}
                      !
                    </p>
                  )}
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex flex-col mt-5 basis-1/2">
                  <label className="font-bold text-lg">
                  {itemDetails?.progressiveWebAppSplashScreenLogo ? itemDetails?.progressiveWebAppSplashScreenLogo :"Progressive web app splash screen logo"}
                    
                  </label>
                  <UploadFile setFileUrl={setPWASplashscreenLogo}>
                    <div>
                      <img
                        className="mx-auto animate-pulse"
                        style={{ height: "70px", width: "70px" }}
                        src="https://i.ibb.co/gJLdW8G/cloud-upload-regular-240.png"
                        alt=""
                      />
                      <p className="text-xl text-gray-400">
                      {itemDetails?.dragAndDropYourFile ? itemDetails?.dragAndDropYourFile :"Drag & Drop your file"}
                        
                      </p>
                      <p className="py-4">
                        <span className="rounded-lg bg-gray-400 px-3 py-3 font-semibold">
                          {/* <BiVideoPlus className="animate-bounce" /> */}
                          {itemDetails?.uploadImage ? itemDetails?.uploadImage :"Upload Image"}
                          
                        </span>
                      </p>
                    </div>
                  </UploadFile>
                </div>
                <div className="flex flex-col mt-5 basis-1/2">
                  <label className="font-bold text-lg">{itemDetails?.currentImage ? itemDetails?.currentImage :"Current image"}</label>
                  {pWASplashscreenLogo ? (
                    <img
                      className="mx-auto my-auto max-w-[200px]"
                      src={pWASplashscreenLogo}
                      alt="Logo"
                    />
                  ) : (
                    <p className="text-center font-bold text-lg my-auto">
                      {itemDetails?.logoHasNotAdded ? itemDetails?.logoHasNotAdded :"Logo has not added"}
                      !
                    </p>
                  )}
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex flex-col mt-5 basis-1/2">
                  <label className="font-bold text-lg">
                  {itemDetails?.organizationRootUrl ? itemDetails?.organizationRootUrl :"Organization Root Url"}
                    
                  </label>
                  <input
                    type="text"
                    defaultValue={orgData?.orgRootUrl}
                    name="orgRootUrl"
                    className="border rounded-md max-w-[430px] h-[50px] ps-2 text-[#535353] focus:outline-0 bg-[#F6F7FF]"
                  />
                </div>
                <div className="flex flex-col mt-5 basis-1/2">
                  {/* <label className="font-bold text-lg">Login sub-title</label>
                  <input
                    type="text"
                    name="loginSubTitle"
                    defaultValue={orgData?.loginSubTitle}
                    className="border rounded-md max-w-[430px] h-[50px] ps-2 text-[#535353] focus:outline-0 bg-[#F6F7FF]"
                  /> */}
                </div>
              </div>
              <div className="flex flex-col mt-5 basis-1/2">
                <label className="font-bold text-lg">{itemDetails?.courseAccessUrl ? itemDetails?.courseAccessUrl :"Course Access Url"}</label>
                <input
                  type="text"
                  defaultValue={courseAccessUrl}
                  onChange={(e) => setCourseAccessUrl(courseAccessUrl)}
                  name="courseAccessUrl"
                  className="border rounded-md max-w-[430px] h-[50px] ps-2 text-[#535353] focus:outline-0 bg-[#F6F7FF]"
                />
              </div>
              <div className="flex flex-col mt-5">
                <label className="font-bold text-lg">
                {itemDetails?.titleAndSubTitleColor ? itemDetails?.titleAndSubTitleColor :"Title & sub-title color"}
                  
                </label>
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
                      {itemDetails?.black ? itemDetails?.black :"Black"}
                        
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
                      {itemDetails?.white ? itemDetails?.white :"White"}
                        
                      </label>
                    </div>
                  </li>
                </ul>
              </div>

              <div className=" flex items-center my-5">
                <label
                  htmlFor="colorInput"
                  className="block text-lg font-medium text-gray-700"
                >
                  {itemDetails?.paymentNavbarColor ? itemDetails?.paymentNavbarColor :"Payment Navbar Color"}
                 
                </label>
                <input
                  type="color"
                  id="paymentNavbarColor"
                  name="paymentNavbarColor"
                  value={paymentNavbarColor}
                  onChange={(e) => setPaymentNavbarColor(e.target.value)}
                  className="ml-2 p-2 w-10 h-10 border rounded-md focus:outline-none focus:ring focus:border-blue-300 cursor-pointer"
                />
              </div>
              <div className=" flex items-center my-5">
                <label
                  htmlFor="colorInput"
                  className="block text-lg font-medium text-gray-700"
                >
                  {itemDetails?.paymentNavbarAccessDashboardButtonColor ? itemDetails?.paymentNavbarAccessDashboardButtonColor :"Payment Navbar Access Dashboard Button Color"}
                  
                </label>
                <input
                  type="color"
                  id="paymentNavbarAccessDashboardButtonColor"
                  name="paymentNavbarAccessDashboardButtonColor"
                  value={orgData?.paymentNavbarAccessDashboardButtonColor}
                  onChange={(e) =>
                    setPaymentNavbarAccessDashboardButtonColor(e.target.value)
                  }
                  className="ml-2 p-2 w-10 h-10 border rounded-md focus:outline-none focus:ring focus:border-blue-300 cursor-pointer"
                />
              </div>
              <div className=" flex items-center my-5">
                <label
                  htmlFor="colorInput"
                  className="block text-lg font-medium text-gray-700"
                >
                  {itemDetails?.paymentNavbarAccessDashboardButtonTextColor ? itemDetails?.paymentNavbarAccessDashboardButtonTextColor :"Payment Navbar Access Dashboard Button Text Color"}
                  
                </label>
                <input
                  type="color"
                  id="paymentNavbarAccessDashboardButtonTextColor"
                  name="paymentNavbarAccessDashboardButtonTextColor"
                  value={paymentNavbarAccessDashboardButtonTextColor}
                  onChange={(e) =>
                    setPaymentNavbarAccessDashboardButtonTextColor(
                      e.target.value
                    )
                  }
                  className="ml-2 p-2 w-10 h-10 border rounded-md focus:outline-none focus:ring focus:border-blue-300 cursor-pointer"
                />
              </div>
              <div className=" flex items-center my-5">
                <label
                  htmlFor="colorInput"
                  className="block text-lg font-medium text-gray-700"
                >
                  {itemDetails?.paymentNavbarLogoutButtonColor ? itemDetails?.paymentNavbarLogoutButtonColor :"Payment Navbar Logout Button Color"}
                  
                </label>
                <input
                  type="color"
                  id="paymentNavbarLogoutButtonColor"
                  name="paymentNavbarLogoutButtonColor"
                  value={paymentNavbarLogoutButtonColor}
                  onChange={(e) =>
                    setPaymentNavbarLogoutButtonColor(e.target.value)
                  }
                  className="ml-2 p-2 w-10 h-10 border rounded-md focus:outline-none focus:ring focus:border-blue-300 cursor-pointer"
                />
              </div>
              <div className=" flex items-center my-5">
                <label
                  htmlFor="colorInput"
                  className="block text-lg font-medium text-gray-700"
                >
                  {itemDetails?.paymentNavbarLogoutButtontextColor ? itemDetails?.paymentNavbarLogoutButtontextColor :"Payment Navbar Logout Button text Color"}
                  
                </label>
                <input
                  type="color"
                  id="paymentNavbarLogoutButtonTextColor"
                  name="paymentNavbarLogoutButtonTextColor"
                  value={paymentNavbarLogoutButtonTextColor}
                  onChange={(e) =>
                    setPaymentNavbarLogoutButtonTextColor(e.target.value)
                  }
                  className="ml-2 p-2 w-10 h-10 border rounded-md focus:outline-none focus:ring focus:border-blue-300 cursor-pointer"
                />
              </div>

              <input
                className="bg-green text-white py-3 px-4 font-bold rounded-lg mb-5 cursor-pointer"
                value={itemDetails?.save ? itemDetails?.save :"Save"}
                type="submit"
              />
            </form>
          </div>
        )}

        {currentPage === "dashboardTheme" && (
          <DashboardTheme
            userInfo={userInfo}
            orgData={orgData}
            orgLogoUrl={orgLogoUrl}
            loginSidebarImage={loginSidebarImage}
            titlesColor={titlesColor}
            dashboardTheme={dashboardTheme}
            setDashboardTheme={setDashboardTheme}
          />
        )}

        {currentPage === "paymentIntegration" && (
          <PaymentIntegration
            paymentInstance={paymentInstance}
            setPaymentInstance={setPaymentInstance}
            orgData={orgData}
          />
        )}

        {currentPage === "language Setting" && <LanguageSetting />}
        {currentPage === "deviceLimit" && (
          <DeviceLimit
            maxDeviceCount={maxDeviceCount}
            setMaxDeviceCount={setMaxDeviceCount}
            orgData={orgData}
          />
        )}
        {currentPage === "emailIntegration" && (
          <EmailIntegration orgData={orgData} />
        )}
      </Layout>
    </div>
  );
};

export default UpdateOrganization;
