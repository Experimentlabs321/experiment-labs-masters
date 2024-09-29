//AdminOrganizationThemeDetails

import React, { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { AuthContext } from "../../../../contexts/AuthProvider";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import axios from "axios";

const AdminOrganizationThemeDetails = () => {
  const { userInfo } = useContext(AuthContext);
  const [adminLoading, setAdminLoading] = useState(false);
  const [itemDetails, setItemDetails] = useState();
  useEffect(() => {
    if (userInfo) {
      setAdminLoading(true);
      axios
        .get(
          `${process.env.REACT_APP_SERVERLESS_API}/api/v1/language/getUpdateOrganizationSubDetailsByOrganizationAndName/organizationTheme/organizationsId/${userInfo?.organizationId}`
        )
        .then((response) => {
          // console.log(response)
          setItemDetails(response?.data);
        })
        .finally(() => {
          setAdminLoading(false);
        });
    }
    setAdminLoading(false);
  }, [userInfo]);
  // console.log(itemDetails)
  const fetchContentDetails = () => {
    if (userInfo) {
      setAdminLoading(true);
      axios
        .get(
          `${process.env.REACT_APP_SERVERLESS_API}/api/v1/language/getUpdateOrganizationSubDetailsByOrganizationAndName/organizationTheme/organizationsId/${userInfo?.organizationId}`
        )
        .then((response) => {
          setItemDetails(response?.data);
        })
        .finally(() => {
          setAdminLoading(false);
        });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.target;

    const organizationID = form.organizationID?.value;
    const favicon = form.favicon?.value;
    const dragAndDropYourFile = form.dragAndDropYourFile?.value;
    const uploadFavicon = form.uploadFavicon?.value;
    const logo = form.logo?.value;
    const currentLogo = form.currentLogo?.value;
    const uploadLogo = form.uploadLogo?.value;
    const logoForLoginPage = form.logoForLoginPage?.value;
    const currentLoginPageLogo = form.currentLoginPageLogo?.value;
    const loginTitle = form.loginTitle?.value;
    const loginSubTitle = form.loginSubTitle?.value;
    const loginSidebarImage = form.loginSidebarImage?.value;
    const currentImage = form.currentImage?.value;
    const uploadImage = form.uploadImage?.value;
    const paymentNavbarLogo = form.paymentNavbarLogo?.value;
    const progressiveWebAppLogo = form.progressiveWebAppLogo?.value;
    const progressiveWebAppSplashScreenLogo =
      form.progressiveWebAppSplashScreenLogo?.value;
    const organizationRootUrl = form.organizationRootUrl?.value;
    const courseAccessUrl = form.courseAccessUrl?.value;
    const titleAndSubTitleColor = form.titleAndSubTitleColor?.value;
    const black = form.black?.value;
    const white = form.white?.value;
    const paymentNavbarColor = form.paymentNavbarColor?.value;
    const paymentNavbarAccessDashboardButtonColor =
      form.paymentNavbarAccessDashboardButtonColor?.value;
    const paymentNavbarAccessDashboardButtonTextColor =
      form.paymentNavbarAccessDashboardButtonTextColor?.value;
    const paymentNavbarLogoutButtonColor =
      form.paymentNavbarLogoutButtonColor?.value;
    const paymentNavbarLogoutButtontextColor =
      form.paymentNavbarLogoutButtontextColor?.value;
    const save = form.save?.value;
    const organizationTheme = form.organizationTheme?.value;
    const paymentIntegration = form.paymentIntegration?.value;
    const languageSetting = form.languageSetting?.value;
    const limitDevice = form.limitDevice?.value;
    const dashboardTheme = form.dashboardTheme?.value;
    const emailIntegration = form.emailIntegration?.value;
    const currentFavicon = form.currentFavicon?.value;
    const faviconHasNotAdded = form.faviconHasNotAdded?.value;
    const logoHasNotAdded = form.logoHasNotAdded?.value;
    const imageHasNotAdded = form.imageHasNotAdded?.value;

    const itemDetail = {
      organizationID: organizationID,
      favicon: favicon,
      dragAndDropYourFile: dragAndDropYourFile,
      uploadFavicon: uploadFavicon,
      logo: logo,
      currentLogo: currentLogo,
      uploadLogo: uploadLogo,
      logoForLoginPage: logoForLoginPage,
      currentLoginPageLogo: currentLoginPageLogo,
      loginTitle: loginTitle,
      loginSubTitle: loginSubTitle,
      loginSidebarImage: loginSidebarImage,
      currentImage: currentImage,
      uploadImage: uploadImage,
      paymentNavbarLogo: paymentNavbarLogo,
      progressiveWebAppLogo: progressiveWebAppLogo,
      progressiveWebAppSplashScreenLogo: progressiveWebAppSplashScreenLogo,
      organizationRootUrl: organizationRootUrl,
      courseAccessUrl: courseAccessUrl,
      titleAndSubTitleColor: titleAndSubTitleColor,
      black: black,
      white: white,
      paymentNavbarColor: paymentNavbarColor,
      paymentNavbarAccessDashboardButtonColor:
        paymentNavbarAccessDashboardButtonColor,
      paymentNavbarAccessDashboardButtonTextColor:
        paymentNavbarAccessDashboardButtonTextColor,
      paymentNavbarLogoutButtonColor: paymentNavbarLogoutButtonColor,
      paymentNavbarLogoutButtontextColor: paymentNavbarLogoutButtontextColor,
      save: save,
      organizationTheme: organizationTheme,
      dashboardTheme: dashboardTheme,
      paymentIntegration: paymentIntegration,
      languageSetting: languageSetting,
      limitDevice: limitDevice,
      emailIntegration: emailIntegration,
      currentFavicon: currentFavicon,
      faviconHasNotAdded: faviconHasNotAdded,
      logoHasNotAdded: logoHasNotAdded,
      imageHasNotAdded: imageHasNotAdded,
    };
    // console.log(itemDetail)
    const item = await axios.post(
      `${process.env.REACT_APP_SERVERLESS_API}/api/v1/language/addUpdateOrganizationSubDetails/organizationTheme/organizationId/${userInfo?.organizationId}`,
      itemDetail
    );
    // console.log(item)
    if (item?.data === "Update Organization SubDetails updated successfully") {
      setItemDetails({ ...itemDetails });
      fetchContentDetails();
      toast.success("Items Names added Successfully");
      form.reset();
    }
  };

  return (
    <div>
      {adminLoading ? (
        <div className="flex justify-center">
          <Box sx={{ display: "flex" }}>
            <CircularProgress />
          </Box>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="mt-2 border p-4 rounded-xl">
          <div className=" grid grid-cols-2 gap-4">
            <div className="flex justify-between items-center w-[100%]">
              <p className="text-lg font-medium">Organization ID</p>
              <input
                name="organizationID"
                defaultValue={itemDetails?.organizationID}
                type="text"
                className="border border-slate-300 rounded-lg p-2 w-[300px]"
                placeholder="Text here"
              />
            </div>
            <div className="flex justify-between items-center w-[100%]">
              <p className="text-lg font-medium">Favicon</p>
              <input
                name="favicon"
                defaultValue={itemDetails?.favicon}
                type="text"
                className="border border-slate-300 rounded-lg p-2 w-[300px]"
                placeholder="Text here"
              />
            </div>
            <div className="flex justify-between items-center w-[100%]">
              <p className="text-lg font-medium">Drag & Drop your file</p>
              <input
                name="dragAndDropYourFile"
                defaultValue={itemDetails?.dragAndDropYourFile}
                type="text"
                className="border border-slate-300 rounded-lg p-2 w-[300px]"
                placeholder="Text here"
              />
            </div>
            <div className="flex justify-between items-center w-[100%]">
              <p className="text-lg font-medium">Upload Favicon</p>
              <input
                name="uploadFavicon"
                defaultValue={itemDetails?.uploadFavicon}
                type="text"
                className="border border-slate-300 rounded-lg p-2 w-[300px]"
                placeholder="Text here"
              />
            </div>
            <div className="flex justify-between items-center w-[100%]">
              <p className="text-lg font-medium">Logo</p>
              <input
                name="logo"
                defaultValue={itemDetails?.logo}
                type="text"
                className="border border-slate-300 rounded-lg p-2 w-[300px]"
                placeholder="Text here"
              />
            </div>
            <div className="flex justify-between items-center w-[100%]">
              <p className="text-lg font-medium">Current Logo</p>
              <input
                name="currentLogo"
                defaultValue={itemDetails?.currentLogo}
                type="text"
                className="border border-slate-300 rounded-lg p-2 w-[300px]"
                placeholder="Text here"
              />
            </div>
            <div className="flex justify-between items-center w-[100%]">
              <p className="text-lg font-medium">Upload Logo</p>
              <input
                name="uploadLogo"
                defaultValue={itemDetails?.uploadLogo}
                type="text"
                className="border border-slate-300 rounded-lg p-2 w-[300px]"
                placeholder="Text here"
              />
            </div>
            <div className="flex justify-between items-center w-[100%]">
              <p className="text-lg font-medium">Logo for login page</p>
              <input
                name="logoForLoginPage"
                defaultValue={itemDetails?.logoForLoginPage}
                type="text"
                className="border border-slate-300 rounded-lg p-2 w-[300px]"
                placeholder="Text here"
              />
            </div>
            <div className="flex justify-between items-center w-[100%]">
              <p className="text-lg font-medium">Current Login Page Logo</p>
              <input
                name="currentLoginPageLogo"
                defaultValue={itemDetails?.currentLoginPageLogo}
                type="text"
                className="border border-slate-300 rounded-lg p-2 w-[300px]"
                placeholder="Text here"
              />
            </div>
            <div className="flex justify-between items-center w-[100%]">
              <p className="text-lg font-medium">Login title</p>
              <input
                name="loginTitle"
                defaultValue={itemDetails?.loginTitle}
                type="text"
                className="border border-slate-300 rounded-lg p-2 w-[300px]"
                placeholder="Text here"
              />
            </div>
            <div className="flex justify-between items-center w-[100%]">
              <p className="text-lg font-medium">Login sub-title</p>
              <input
                name="loginSubTitle"
                defaultValue={itemDetails?.loginSubTitle}
                type="text"
                className="border border-slate-300 rounded-lg p-2 w-[300px]"
                placeholder="Text here"
              />
            </div>
            <div className="flex justify-between items-center w-[100%]">
              <p className="text-lg font-medium">Login sidebar image</p>
              <input
                name="loginSidebarImage"
                defaultValue={itemDetails?.loginSidebarImage}
                type="text"
                className="border border-slate-300 rounded-lg p-2 w-[300px]"
                placeholder="Text here"
              />
            </div>
            <div className="flex justify-between items-center w-[100%]">
              <p className="text-lg font-medium">Current image</p>
              <input
                name="currentImage"
                defaultValue={itemDetails?.currentImage}
                type="text"
                className="border border-slate-300 rounded-lg p-2 w-[300px]"
                placeholder="Text here"
              />
            </div>
            <div className="flex justify-between items-center w-[100%]">
              <p className="text-lg font-medium">Upload Image</p>
              <input
                name="uploadImage"
                defaultValue={itemDetails?.uploadImage}
                type="text"
                className="border border-slate-300 rounded-lg p-2 w-[300px]"
                placeholder="Text here"
              />
            </div>
            <div className="flex justify-between items-center w-[100%]">
              <p className="text-lg font-medium">Payment navbar logo</p>
              <input
                name="paymentNavbarLogo"
                defaultValue={itemDetails?.paymentNavbarLogo}
                type="text"
                className="border border-slate-300 rounded-lg p-2 w-[300px]"
                placeholder="Text here"
              />
            </div>
            <div className="flex justify-between items-center w-[100%]">
              <p className="text-lg font-medium">Progressive web app logo</p>
              <input
                name="progressiveWebAppLogo"
                defaultValue={itemDetails?.progressiveWebAppLogo}
                type="text"
                className="border border-slate-300 rounded-lg p-2 w-[300px]"
                placeholder="Text here"
              />
            </div>
            <div className="flex justify-between items-center w-[100%]">
              <p className="text-lg font-medium">
                Progressive web app splash screen logo
              </p>
              <input
                name="progressiveWebAppSplashScreenLogo"
                defaultValue={itemDetails?.progressiveWebAppSplashScreenLogo}
                type="text"
                className="border border-slate-300 rounded-lg p-2 w-[300px]"
                placeholder="Text here"
              />
            </div>
            <div className="flex justify-between items-center w-[100%]">
              <p className="text-lg font-medium">Organization Root Url</p>
              <input
                name="organizationRootUrl"
                defaultValue={itemDetails?.organizationRootUrl}
                type="text"
                className="border border-slate-300 rounded-lg p-2 w-[300px]"
                placeholder="Text here"
              />
            </div>
            <div className="flex justify-between items-center w-[100%]">
              <p className="text-lg font-medium">Course Access Url</p>
              <input
                name="courseAccessUrl"
                defaultValue={itemDetails?.courseAccessUrl}
                type="text"
                className="border border-slate-300 rounded-lg p-2 w-[300px]"
                placeholder="Text here"
              />
            </div>
            <div className="flex justify-between items-center w-[100%]">
              <p className="text-lg font-medium">Title & sub-title color</p>
              <input
                name="titleAndSubTitleColor"
                defaultValue={itemDetails?.titleAndSubTitleColor}
                type="text"
                className="border border-slate-300 rounded-lg p-2 w-[300px]"
                placeholder="Text here"
              />
            </div>
            <div className="flex justify-between items-center w-[100%]">
              <p className="text-lg font-medium">Black</p>
              <input
                name="black"
                type="text"
                defaultValue={itemDetails?.black}
                className="border border-slate-300 rounded-lg p-2 w-[300px]"
                placeholder="Text here"
              />
            </div>
            <div className="flex justify-between items-center w-[100%]">
              <p className="text-lg font-medium">White</p>
              <input
                name="white"
                type="text"
                defaultValue={itemDetails?.white}
                className="border border-slate-300 rounded-lg p-2 w-[300px]"
                placeholder="Text here"
              />
            </div>
            <div className="flex justify-between items-center w-[100%]">
              <p className="text-lg font-medium">Payment Navbar Color</p>
              <input
                name="paymentNavbarColor"
                defaultValue={itemDetails?.paymentNavbarColor}
                type="text"
                className="border border-slate-300 rounded-lg p-2 w-[300px]"
                placeholder="Text here"
              />
            </div>
            <div className="flex justify-between items-center w-[100%]">
              <p className="text-lg font-medium">
                Payment Navbar Access Dashboard Button Color
              </p>
              <input
                name="paymentNavbarAccessDashboardButtonColor"
                defaultValue={
                  itemDetails?.paymentNavbarAccessDashboardButtonColor
                }
                type="text"
                className="border border-slate-300 rounded-lg p-2 w-[300px]"
                placeholder="Text here"
              />
            </div>
            <div className="flex justify-between items-center w-[100%]">
              <p className="text-lg font-medium">
                Payment Navbar Access Dashboard Button Text Color
              </p>
              <input
                name="paymentNavbarAccessDashboardButtonTextColor"
                defaultValue={
                  itemDetails?.paymentNavbarAccessDashboardButtonTextColor
                }
                type="text"
                className="border border-slate-300 rounded-lg p-2 w-[300px]"
                placeholder="Text here"
              />
            </div>
            <div className="flex justify-between items-center w-[100%]">
              <p className="text-lg font-medium">
                Payment Navbar Logout Button Color
              </p>
              <input
                name="paymentNavbarLogoutButtonColor"
                defaultValue={itemDetails?.paymentNavbarLogoutButtonColor}
                type="text"
                className="border border-slate-300 rounded-lg p-2 w-[300px]"
                placeholder="Text here"
              />
            </div>
            <div className="flex justify-between items-center w-[100%]">
              <p className="text-lg font-medium">
                Payment Navbar Logout Button text Color
              </p>
              <input
                name="paymentNavbarLogoutButtontextColor"
                defaultValue={itemDetails?.paymentNavbarLogoutButtontextColor}
                type="text"
                className="border border-slate-300 rounded-lg p-2 w-[300px]"
                placeholder="Text here"
              />
            </div>
            <div className="flex justify-between items-center w-[100%]">
              <p className="text-lg font-medium">Save</p>
              <input
                name="save"
                type="text"
                defaultValue={itemDetails?.save}
                className="border border-slate-300 rounded-lg p-2 w-[300px]"
                placeholder="Text here"
              />
            </div>
            <div className="flex justify-between items-center w-[100%]">
              <p className="text-lg font-medium">Organization Theme</p>
              <input
                name="organizationTheme"
                type="text"
                defaultValue={itemDetails?.organizationTheme}
                className="border border-slate-300 rounded-lg p-2 w-[300px]"
                placeholder="Text here"
              />
            </div>
            <div className="flex justify-between items-center w-[100%]">
              <p className="text-lg font-medium">Payment Integration</p>
              <input
                name="paymentIntegration"
                type="text"
                defaultValue={itemDetails?.paymentIntegration}
                className="border border-slate-300 rounded-lg p-2 w-[300px]"
                placeholder="Text here"
              />
            </div>
            <div className="flex justify-between items-center w-[100%]">
              <p className="text-lg font-medium">Limit Device</p>
              <input
                name="limitDevice"
                type="text"
                defaultValue={itemDetails?.limitDevice}
                className="border border-slate-300 rounded-lg p-2 w-[300px]"
                placeholder="Text here"
              />
            </div>
            <div className="flex justify-between items-center w-[100%]">
              <p className="text-lg font-medium">Language Setting</p>
              <input
                name="languageSetting"
                type="text"
                defaultValue={itemDetails?.languageSetting}
                className="border border-slate-300 rounded-lg p-2 w-[300px]"
                placeholder="Text here"
              />
            </div>
            <div className="flex justify-between items-center w-[100%]">
              <p className="text-lg font-medium">Dashboard Theme</p>
              <input
                name="dashboardTheme"
                type="text"
                defaultValue={itemDetails?.dashboardTheme}
                className="border border-slate-300 rounded-lg p-2 w-[300px]"
                placeholder="Text here"
              />
            </div>
            <div className="flex justify-between items-center w-[100%]">
              <p className="text-lg font-medium">Email Integration</p>
              <input
                name="emailIntegration"
                type="text"
                defaultValue={itemDetails?.emailIntegration}
                className="border border-slate-300 rounded-lg p-2 w-[300px]"
                placeholder="Text here"
              />
            </div>
            <div className="flex justify-between items-center w-[100%]">
              <p className="text-lg font-medium">Current Favicon</p>
              <input
                name="currentFavicon"
                type="text"
                defaultValue={itemDetails?.currentFavicon}
                className="border border-slate-300 rounded-lg p-2 w-[300px]"
                placeholder="Text here"
              />
            </div>
            <div className="flex justify-between items-center w-[100%]">
              <p className="text-lg font-medium">Favicon has not added</p>
              <input
                name="faviconHasNotAdded"
                type="text"
                defaultValue={itemDetails?.faviconHasNotAdded}
                className="border border-slate-300 rounded-lg p-2 w-[300px]"
                placeholder="Text here"
              />
            </div>
            <div className="flex justify-between items-center w-[100%]">
              <p className="text-lg font-medium">Logo has not added</p>
              <input
                name="logoHasNotAdded"
                type="text"
                defaultValue={itemDetails?.logoHasNotAdded}
                className="border border-slate-300 rounded-lg p-2 w-[300px]"
                placeholder="Text here"
              />
            </div>
            <div className="flex justify-between items-center w-[100%]">
              <p className="text-lg font-medium">Image has not added</p>
              <input
                name="imageHasNotAdded"
                type="text"
                defaultValue={itemDetails?.imageHasNotAdded}
                className="border border-slate-300 rounded-lg p-2 w-[300px]"
                placeholder="Text here"
              />
            </div>
          </div>
          <div className="flex items-center justify-center mt-20 mb-10">
            <input
              type="submit"
              value="Save"
              className="px-[30px] py-3 bg-[#3E4DAC] hover:bg-opacity-70 text-[#fff] cursor-pointer text-xl font-bold rounded-lg"
            />
          </div>
        </form>
      )}
    </div>
  );
};

export default AdminOrganizationThemeDetails;
