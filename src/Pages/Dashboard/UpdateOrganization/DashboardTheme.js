import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import CourseCompletion from "./DashboardThemeComponents/CourseCompletion";
import uploadFileToS3 from "../../UploadComponent/s3Uploader";
import OpenBox from "./DashboardThemeComponents/OpenBox";
import JoinQuest from "./DashboardThemeComponents/JoinQuest";
import Challenges from "./DashboardThemeComponents/Challenges";
import RequestSlots from "./DashboardThemeComponents/RequestSlots";

const DashboardTheme = ({
  userInfo,
  orgData,
  orgLogoUrl,
  loginSidebarImage,
  titlesColor,
  dashboardTheme,
  setDashboardTheme,
}) => {
  const [loading, setLoading] = useState(false);
  const [itemDetails, setItemDetails] = useState();
  useEffect(() => {
    if (userInfo) {
      setLoading(true);
      axios
        .get(
          `${process.env.REACT_APP_SERVERLESS_API}/api/v1/language/getUpdateOrganizationSubDetailsByOrganizationAndName/dashboardTheme/organizationsId/${userInfo?.organizationId}`
        )
        .then((response) => {
          // console.log(response)
          setItemDetails(response?.data);
        })
        .finally(() => {
          setLoading(false);
        });
    }
    setLoading(false);
  }, [userInfo]);
  // console.log(itemDetails)
  const [courseCompletionText, setCourseCompletionText] = useState(
    dashboardTheme?.courseCompletionText || "Your course is"
  );
  const [courseCompletionBgColor, setCourseCompletionBgColor] = useState(
    dashboardTheme?.courseCompletionBgColor || "#3E4DAC"
  );
  const [courseCompletionDesign, setCourseCompletionDesign] = useState(
    dashboardTheme?.courseCompletionDesign === false
      ? dashboardTheme?.courseCompletionDesign
      : true
  );
  const [addCourseCompletion, setAddCourseCompletion] = useState(
    dashboardTheme?.addCourseCompletion === false
      ? dashboardTheme?.addCourseCompletion
      : true
  );
  const [addOpenBox, setAddOpenBox] = useState(
    dashboardTheme?.addOpenBox === false ? dashboardTheme?.addOpenBox : true
  );
  const [addJoinQuest, setAddJoinQuest] = useState(
    dashboardTheme?.addJoinQuest === false ? dashboardTheme?.addJoinQuest : true
  );
  const [addChallenges, setAddChallenges] = useState(
    dashboardTheme?.addChallenges === false
      ? dashboardTheme?.addChallenges
      : true
  );
  const [addRequestSlots, setAddRequestSlots] = useState(
    dashboardTheme?.addRequestSlots === false
      ? dashboardTheme?.addRequestSlots
      : true
  );
  const [isAvatar, setIsAvatar] = useState(
    dashboardTheme?.isAvatar === true ? dashboardTheme?.isAvatar : false
  );
  const [avatarBg, setAvatarBg] = useState(
    dashboardTheme?.avatarBg || "#32CD62"
  );
  const [openBoxButtonText, setOpenBoxButtonText] = useState(
    dashboardTheme?.openBoxButtonText || "Open Box"
  );
  const [openBoxImage, setOpenBoxImage] = useState(
    dashboardTheme?.openBoxImage || null
  );
  const [openBoxButtonBg, setOpenBoxButtonBg] = useState(
    dashboardTheme?.openBoxButtonBg || "#3E4DAC"
  );
  const [openBoxCardBg, setOpenBoxCardBg] = useState(
    dashboardTheme?.openBoxCardBg || "#FFC7C7"
  );
  const [fileLoading, setFileLoading] = useState(false);
  const [joinQuestBtnText, setJoinQuestBtnText] = useState(
    dashboardTheme?.joinQuestBtnText || "Join Quest"
  );
  const [joinQuestBtnBg, setJoinQuestBtnBg] = useState(
    dashboardTheme?.joinQuestBtnBg || "#FFDB70"
  );
  const [joinQuestCardBg, setJoinQuestCardBg] = useState(
    dashboardTheme?.joinQuestCardBg || "#0F3934"
  );
  const [joinQuestImgBg, setJoinQuestImgBg] = useState(
    dashboardTheme?.joinQuestImgBg || "#FF74BE"
  );
  const [joinQuestImg, setJoinQuestImg] = useState(
    dashboardTheme?.joinQuestImg || null
  );
  const [challengesHeaderText, setChallengesHeaderText] = useState(
    dashboardTheme?.challengesHeaderText || "Challenges"
  );
  const [challengesBtnText, setChallengesBtnText] = useState(
    dashboardTheme?.challengesBtnText || "Complete Challenge"
  );
  const [challengesBtnBg, setChallengesBtnBg] = useState(
    dashboardTheme?.challengesBtnBg || "#FFDB70"
  );
  const [challengesCardBg, setChallengesCardBg] = useState(
    dashboardTheme?.challengesCardBg || "#2B0825"
  );
  const [challengesProgressBg, setChallengesProgressBg] = useState(
    dashboardTheme?.challengesProgressBg || "#3E4DAC"
  );
  const [challengesImgBg, setChallengesImgBg] = useState(
    dashboardTheme?.challengesImgBg || "#FF881B"
  );
  const [challengesImg, setChallengesImg] = useState(
    dashboardTheme?.challengesImg || null
  );
  const [slotsHeaderText, setSlotsHeaderText] = useState(
    dashboardTheme?.slotsHeaderText || "Request Slots"
  );
  const [slotsBtnText, setSlotsBtnText] = useState(
    dashboardTheme?.slotsBtnText || "Request Event"
  );
  const [slotsBtnBg, setSlotsBtnBg] = useState(
    dashboardTheme?.slotsBtnBg || "#3E4DAC"
  );
  const [slotsCardBg, setSlotsCardBg] = useState(
    dashboardTheme?.slotsCardBg || "#0E2749"
  );
  const [addCourses, setAddCourses] = useState(
    dashboardTheme?.addCourses === false ? dashboardTheme?.addCourses : true
  );
  const [myCoursesChecked, setMyCoursesChecked] = useState(
    dashboardTheme?.myCoursesChecked === false
      ? dashboardTheme?.myCoursesChecked
      : true
  );
  const [allCoursesChecked, setAllCoursesChecked] = useState(
    dashboardTheme?.allCoursesChecked === false
      ? dashboardTheme?.allCoursesChecked
      : true
  );
  const [showLabJourney, setShowLabJourney] = useState(
    dashboardTheme?.showLabJourney === false
      ? dashboardTheme?.showLabJourney
      : true
  );
  const [showSchedule, setShowSchedule] = useState(
    dashboardTheme?.showSchedule === false ? dashboardTheme?.showSchedule : true
  );

  // console.log(dashboardTheme);

  const handleSubmit = async (event) => {
    event.preventDefault();
    // const form = event.target;

    const orgInfo = {
      organizationName: orgData?.organizationName,
      email: orgData?.email,
      loginTitle: orgData?.loginTitle,
      loginSubTitle: orgData?.loginSubTitle,
      org_logo: orgLogoUrl,
      loginSidebarImage: loginSidebarImage,
      titlesColor: titlesColor,
      dashboardTheme: {
        addCourseCompletion,
        courseCompletionBgColor,
        courseCompletionText,
        courseCompletionDesign,
        isAvatar,
        avatarBg,
        addOpenBox,
        openBoxButtonText,
        openBoxImage,
        openBoxButtonBg,
        openBoxCardBg,
        addJoinQuest,
        joinQuestBtnText,
        joinQuestBtnBg,
        joinQuestCardBg,
        joinQuestImgBg,
        joinQuestImg,
        addChallenges,
        challengesHeaderText,
        challengesBtnText,
        challengesBtnBg,
        challengesCardBg,
        challengesProgressBg,
        challengesImgBg,
        challengesImg,
        addRequestSlots,
        slotsHeaderText,
        slotsBtnText,
        slotsBtnBg,
        slotsCardBg,
        addCourses,
        myCoursesChecked,
        allCoursesChecked,
        showLabJourney,
        showSchedule,
      },
    };
    // console.log("Data ==========>",orgInfo);

    const updateOrg = await axios.put(
      `${process.env.REACT_APP_SERVERLESS_API}/api/v1/organizations/${orgData?._id}`,
      orgInfo
    );

    if (updateOrg?.data?.acknowledged) {
      setDashboardTheme(orgInfo?.dashboardTheme);
      toast.success("Organization edited Successfully");
      // event.target.reset();
    }
  };

  // console.log(dashboardTheme?.courseCompletionDesign);
  // console.log(courseCompletionDesign);

  const handleAddCourseCompletion = () => {
    setAddCourseCompletion(!addCourseCompletion);
  };

  const handleAddOpenBox = () => {
    setAddOpenBox(!addOpenBox);
  };

  const handleAddJoinQuest = () => {
    setAddJoinQuest(!addJoinQuest);
  };

  const handleAddChallenges = () => {
    setAddChallenges(!addChallenges);
  };

  const handleAddRequestSlots = () => {
    setAddRequestSlots(!addRequestSlots);
  };

  const handleAddCourses = () => {
    setAddCourses(!addCourses);
  };

  const uploadOpenBoxImg = async (e) => {
    e.preventDefault();
    setFileLoading(true);
    const files = e.target.files;
    if (files[0]) {
      const res = await uploadFileToS3(files[0]);
      if (res) {
        setOpenBoxImage(res);
      }
    }
    setFileLoading(false);
  };

  const uploadJoinQuestImg = async (e) => {
    e.preventDefault();
    setFileLoading(true);
    const files = e.target.files;
    if (files[0]) {
      const res = await uploadFileToS3(files[0]);
      if (res) {
        setJoinQuestImg(res);
      }
    }
    setFileLoading(false);
  };

  const uploadChallengesImg = async (e) => {
    e.preventDefault();
    setFileLoading(true);
    const files = e.target.files;
    if (files[0]) {
      const res = await uploadFileToS3(files[0]);
      if (res) {
        setChallengesImg(res);
      }
    }
    setFileLoading(false);
  };

  //   console.log(showLabJourney);

  return (
    <div className="px-4 mt-4">
      <form onSubmit={handleSubmit} className="mt-1">
        {/* Toggle */}
        <div className="mt-5">
          <label htmlFor="toggle" className="flex items-center cursor-pointer">
            <div className="relative">
              <input
                type="checkbox"
                id="toggle"
                className="sr-only"
                checked={addCourseCompletion}
                onChange={handleAddCourseCompletion}
              />
              <div className="block bg-gray-600 w-14 h-8 rounded-full"></div>
              <div
                className={`${
                  addCourseCompletion
                    ? "bg-green translate-x-full"
                    : "bg-gray-300 translate-x-0"
                } absolute left-1 top-1 w-6 h-6 rounded-full transition-transform transform ease-in-out duration-300`}
              ></div>
            </div>
            <div className="ml-3 text-gray-700 font-semibold text-xl">
              {!addCourseCompletion
                ? itemDetails?.addSection
                  ? itemDetails?.addSection
                  : "Add Section"
                : itemDetails?.removeSection
                ? itemDetails?.removeSection
                : "Remove Section"}
            </div>
          </label>
        </div>
        {/* Toggle End */}

        {/* Design */}
        <CourseCompletion
          complete={itemDetails?.complete ? itemDetails?.complete : "Complete"}
          courseCompletionText={courseCompletionText}
          courseCompletionBgColor={courseCompletionBgColor}
          isAvatar={isAvatar}
          avatarBg={avatarBg}
          courseCompletionDesign={courseCompletionDesign}
        />
        {/* Design End*/}

        {/* Edit */}
        {addCourseCompletion && (
          <div className="mt-5 w-full mx-auto bg-white py-3 px-5 rounded shadow-md">
            <div className="flex justify-between items-center gap-4">
              {/* Text Input */}
              <div className="">
                <label
                  htmlFor="textInput"
                  className="block text-lg font-semibold text-gray-700"
                >
                  {itemDetails?.changeText
                    ? itemDetails?.changeText
                    : "Change Text"}
                </label>
                <input
                  type="text"
                  id="courseCompletionText"
                  name="courseCompletionText"
                  defaultValue={courseCompletionText}
                  onChange={(e) => setCourseCompletionText(e.target.value)}
                  className="mt-1 p-2 min-w-[200px] border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                />
              </div>

              {/* Color Input */}
              <div className=" flex items-center">
                <label
                  htmlFor="colorInput"
                  className="block text-lg font-medium text-gray-700"
                >
                  {itemDetails?.changeColor
                    ? itemDetails?.changeColor
                    : "Change Color"}
                </label>
                <input
                  type="color"
                  id="courseCompletionBgColor"
                  name="courseCompletionBgColor"
                  defaultValue={courseCompletionBgColor}
                  onChange={(e) => setCourseCompletionBgColor(e.target.value)}
                  className="ml-2 p-2 w-10 h-10 border rounded-md focus:outline-none focus:ring focus:border-blue-300 cursor-pointer"
                />
              </div>

              <div className="flex flex-col items-start">
                <label className="block text-lg font-medium text-gray-700">
                  {itemDetails?.design ? itemDetails?.design : "Design"}
                </label>
                <div className="ml-2 flex items-center space-x-4">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="courseCompletionDesign"
                      checked={courseCompletionDesign}
                      onChange={() =>
                        setCourseCompletionDesign(!courseCompletionDesign)
                      }
                      className="mr-1"
                    />
                    <span>{itemDetails?.add ? itemDetails?.add : "Add"}</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="courseCompletionDesign"
                      className="mr-1"
                      checked={!courseCompletionDesign}
                      onChange={() =>
                        setCourseCompletionDesign(!courseCompletionDesign)
                      }
                    />
                    <span>
                      {itemDetails?.remove ? itemDetails?.remove : "Remove"}
                    </span>
                  </label>
                </div>
              </div>

              {/* Avatar Type Input */}
              <div className="flex flex-col items-start">
                <label className="block text-lg font-medium text-gray-700">
                  {itemDetails?.imageType
                    ? itemDetails?.imageType
                    : "Image Type"}
                </label>
                <div className="ml-2 flex items-center space-x-4">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="isAvatar"
                      checked={!isAvatar}
                      onChange={() => setIsAvatar(!isAvatar)}
                      className="mr-1"
                    />
                    <span>
                      {itemDetails?.default ? itemDetails?.default : "Default"}
                    </span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="isAvatar"
                      className="mr-1"
                      checked={isAvatar}
                      onChange={() => setIsAvatar(!isAvatar)}
                    />
                    <span>
                      {itemDetails?.avatar ? itemDetails?.avatar : "Avatar"}
                    </span>
                  </label>
                </div>
              </div>

              {/* Avatar Background Color Input (Conditional) */}
              {isAvatar && (
                <div className="flex items-center">
                  <label
                    htmlFor="avatarBgColor"
                    className="block text-lg font-medium text-gray-700"
                  >
                    {itemDetails?.avatarBackground
                      ? itemDetails?.avatarBackground
                      : "Avatar Background"}
                  </label>
                  <input
                    type="color"
                    id="avatarBg"
                    name="avatarBg"
                    defaultValue={avatarBg}
                    onChange={(e) => setAvatarBg(e.target.value)}
                    className="ml-2 p-2 w-10 h-10 border rounded-md focus:outline-none focus:ring focus:border-blue-300 cursor-pointer"
                  />
                </div>
              )}
            </div>
          </div>
        )}
        {/* Edit End*/}

        {/* OpenBox Start */}

        <div className="my-8">
          <label
            htmlFor="OpenBoxToggle"
            className="flex items-center cursor-pointer"
          >
            <div className="relative">
              <input
                type="checkbox"
                id="OpenBoxToggle"
                className="sr-only"
                checked={addOpenBox}
                onChange={handleAddOpenBox}
              />
              <div className="block bg-gray-600 w-14 h-8 rounded-full"></div>
              <div
                className={`${
                  addOpenBox
                    ? "bg-green translate-x-full"
                    : "bg-gray-300 translate-x-0"
                } absolute left-1 top-1 w-6 h-6 rounded-full transition-transform transform ease-in-out duration-300`}
              ></div>
            </div>
            <div className="ml-3 text-gray-700 font-semibold text-xl">
              {!addOpenBox
                ? itemDetails?.addSection
                  ? itemDetails?.addSection
                  : "Add Section"
                : itemDetails?.removeSection
                ? itemDetails?.removeSection
                : "Remove Section"}
            </div>
          </label>
        </div>

        <OpenBox
          openBoxButtonText={openBoxButtonText}
          openBoxImage={openBoxImage}
          openBoxButtonBg={openBoxButtonBg}
          openBoxCardBg={openBoxCardBg}
        />

        {addOpenBox && (
          <div className="mt-5 w-full mx-auto bg-white py-3 px-5 rounded shadow-md">
            <div className="flex justify-between items-center gap-4">
              {/* Text Input */}
              <div className="">
                <label
                  htmlFor="textInput"
                  className="block text-lg font-semibold text-gray-700"
                >
                  {itemDetails?.buttonText
                    ? itemDetails?.buttonText
                    : "Button Text"}
                </label>
                <input
                  type="text"
                  id="openBoxButtonText"
                  name="openBoxButtonText"
                  defaultValue={openBoxButtonText}
                  maxLength="10"
                  onChange={(e) => setOpenBoxButtonText(e.target.value)}
                  className="mt-1 p-2 min-w-[200px] border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                />
              </div>

              {/* Color Input */}
              <div className=" flex items-center">
                <label
                  htmlFor="colorInput"
                  className="block text-lg font-medium text-gray-700"
                >
                  {itemDetails?.changeButton
                    ? itemDetails?.changeButton
                    : "Change Button"}
                </label>
                <input
                  type="color"
                  id="openBoxButtonBg"
                  name="openBoxButtonBg"
                  defaultValue={openBoxButtonBg}
                  onChange={(e) => setOpenBoxButtonBg(e.target.value)}
                  className="ml-2 p-2 w-10 h-10 border rounded-md focus:outline-none focus:ring focus:border-blue-300 cursor-pointer"
                />
              </div>

              <div className=" flex items-center">
                <label
                  htmlFor="colorInput"
                  className="block text-lg font-medium text-gray-700"
                >
                  {itemDetails?.changeCard
                    ? itemDetails?.changeCard
                    : "Change Card"}
                </label>
                <input
                  type="color"
                  id="openBoxCardBg"
                  name="openBoxCardBg"
                  defaultValue={openBoxCardBg}
                  onChange={(e) => setOpenBoxCardBg(e.target.value)}
                  className="ml-2 p-2 w-10 h-10 border rounded-md focus:outline-none focus:ring focus:border-blue-300 cursor-pointer"
                />
              </div>

              {/* Image Input */}
              <div className="">
                <label
                  htmlFor="imageInput"
                  className="block text-lg font-medium text-gray-700"
                >
                  {itemDetails?.changeImage
                    ? itemDetails?.changeImage
                    : "Change Image"}
                </label>
                {fileLoading ? (
                  <img
                    className="mx-auto animate-ping"
                    style={{ height: "30px", width: "30px" }}
                    src="https://i.ibb.co/gJLdW8G/cloud-upload-regular-240.png"
                    alt=""
                  />
                ) : (
                  <input
                    type="file"
                    id="openBoxImg"
                    name="openBoxImg"
                    // defaultValue={courseCompletionImg}
                    onChange={uploadOpenBoxImg}
                    className="ml-2 p-2 w-[200px] border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                  />
                )}
              </div>
            </div>
          </div>
        )}

        {/* OpenBox End */}

        {/* Join Quest Start */}
        <div className="my-8">
          <label
            htmlFor="joinQuestToggle"
            className="flex items-center cursor-pointer"
          >
            <div className="relative">
              <input
                type="checkbox"
                id="joinQuestToggle"
                className="sr-only"
                checked={addJoinQuest}
                onChange={handleAddJoinQuest}
              />
              <div className="block bg-gray-600 w-14 h-8 rounded-full"></div>
              <div
                className={`${
                  addJoinQuest
                    ? "bg-green translate-x-full"
                    : "bg-gray-300 translate-x-0"
                } absolute left-1 top-1 w-6 h-6 rounded-full transition-transform transform ease-in-out duration-300`}
              ></div>
            </div>
            <div className="ml-3 text-gray-700 font-semibold text-xl">
              {!addJoinQuest
                ? itemDetails?.addSection
                  ? itemDetails?.addSection
                  : "Add Section"
                : itemDetails?.removeSection
                ? itemDetails?.removeSection
                : "Remove Section"}
            </div>
          </label>
        </div>

        <JoinQuest
          weekOne={itemDetails?.weekOne ? itemDetails?.weekOne : "Week 1"}
          joinQuestBtnText={joinQuestBtnText}
          joinQuestBtnBg={joinQuestBtnBg}
          joinQuestCardBg={joinQuestCardBg}
          joinQuestImgBg={joinQuestImgBg}
          joinQuestImg={joinQuestImg}
        />

        {addJoinQuest && (
          <div className="mt-5 w-full mx-auto bg-white py-3 px-5 rounded shadow-md">
            <div className="flex justify-between items-center gap-4">
              {/* Text Input */}
              <div className="">
                <label
                  htmlFor="textInput"
                  className="block text-lg font-semibold text-gray-700"
                >
                  {itemDetails?.buttonText
                    ? itemDetails?.buttonText
                    : "Button Text"}
                </label>
                <input
                  type="text"
                  id="joinQuestBtnText"
                  name="joinQuestBtnText"
                  maxLength="10"
                  defaultValue={joinQuestBtnText}
                  onChange={(e) => setJoinQuestBtnText(e.target.value)}
                  className="mt-1 p-2 min-w-[200px] border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                />
              </div>

              {/* Color Input */}
              <div className=" flex items-center">
                <label
                  htmlFor="colorInput"
                  className="block text-lg font-medium text-gray-700"
                >
                  {itemDetails?.changeButton
                    ? itemDetails?.changeButton
                    : "Change Button"}
                </label>
                <input
                  type="color"
                  id="joinQuestBtnBg"
                  name="joinQuestBtnBg"
                  defaultValue={joinQuestBtnBg}
                  onChange={(e) => setJoinQuestBtnBg(e.target.value)}
                  className="ml-2 p-2 w-10 h-10 border rounded-md focus:outline-none focus:ring focus:border-blue-300 cursor-pointer"
                />
              </div>

              <div className=" flex items-center">
                <label
                  htmlFor="colorInput"
                  className="block text-lg font-medium text-gray-700"
                >
                  {itemDetails?.changeCard
                    ? itemDetails?.changeCard
                    : "Change Card"}
                </label>
                <input
                  type="color"
                  id="joinQuestCardBg"
                  name="joinQuestCardBg"
                  defaultValue={joinQuestCardBg}
                  onChange={(e) => setJoinQuestCardBg(e.target.value)}
                  className="ml-2 p-2 w-10 h-10 border rounded-md focus:outline-none focus:ring focus:border-blue-300 cursor-pointer"
                />
              </div>

              <div className=" flex items-center">
                <label
                  htmlFor="colorInput"
                  className="block text-lg font-medium text-gray-700"
                >
                  {itemDetails?.changeImageBg
                    ? itemDetails?.changeImageBg
                    : "Change ImageBg"}
                </label>
                <input
                  type="color"
                  id="joinQuestImgBg"
                  name="joinQuestImgBg"
                  defaultValue={joinQuestImgBg}
                  onChange={(e) => setJoinQuestImgBg(e.target.value)}
                  className="ml-2 p-2 w-10 h-10 border rounded-md focus:outline-none focus:ring focus:border-blue-300 cursor-pointer"
                />
              </div>

              {/* Image Input */}
              <div className="">
                <label
                  htmlFor="imageInput"
                  className="block text-lg font-medium text-gray-700"
                >
                  {itemDetails?.changeImage
                    ? itemDetails?.changeImage
                    : "Change Image"}
                </label>
                {fileLoading ? (
                  <img
                    className="mx-auto animate-ping"
                    style={{ height: "30px", width: "30px" }}
                    src="https://i.ibb.co/gJLdW8G/cloud-upload-regular-240.png"
                    alt=""
                  />
                ) : (
                  <input
                    type="file"
                    id="joinQuestImg"
                    name="joinQuestImg"
                    // defaultValue={courseCompletionImg}
                    onChange={uploadJoinQuestImg}
                    className="ml-2 p-2 w-[200px] border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                  />
                )}
              </div>
            </div>
          </div>
        )}

        {/* Join Quest End */}

        {/* Challenges Start */}

        <div className="my-8">
          <label
            htmlFor="challengesToggle"
            className="flex items-center cursor-pointer"
          >
            <div className="relative">
              <input
                type="checkbox"
                id="challengesToggle"
                className="sr-only"
                checked={addChallenges}
                onChange={handleAddChallenges}
              />
              <div className="block bg-gray-600 w-14 h-8 rounded-full"></div>
              <div
                className={`${
                  addChallenges
                    ? "bg-green translate-x-full"
                    : "bg-gray-300 translate-x-0"
                } absolute left-1 top-1 w-6 h-6 rounded-full transition-transform transform ease-in-out duration-300`}
              ></div>
            </div>
            <div className="ml-3 text-gray-700 font-semibold text-xl">
              {!addChallenges
                ? itemDetails?.addSection
                  ? itemDetails?.addSection
                  : "Add Section"
                : itemDetails?.removeSection
                ? itemDetails?.removeSection
                : "Remove Section"}
            </div>
          </label>
        </div>

        <Challenges
          completed={
            itemDetails?.completed ? itemDetails?.completed : "Completed"
          }
          challengesHeaderText={challengesHeaderText}
          challengesBtnText={challengesBtnText}
          challengesBtnBg={challengesBtnBg}
          challengesCardBg={challengesCardBg}
          challengesProgressBg={challengesProgressBg}
          challengesImgBg={challengesImgBg}
          challengesImg={challengesImg}
        />

        {addChallenges && (
          <div className="mt-24 w-full mx-auto bg-white py-3 px-5 rounded shadow-md">
            <div className="flex items-center gap-8 flex-wrap">
              {/* Text Input */}
              <div className="">
                <label
                  htmlFor="textInput"
                  className="block text-lg font-semibold text-gray-700"
                >
                  {itemDetails?.headerText
                    ? itemDetails?.headerText
                    : "Header Text"}
                </label>
                <input
                  type="text"
                  id="challengesHeaderText"
                  name="challengesHeaderText"
                  defaultValue={challengesHeaderText}
                  onChange={(e) => setChallengesHeaderText(e.target.value)}
                  className="mt-1 p-2 min-w-[200px] border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                />
              </div>

              {/* Text Input */}
              <div className="">
                <label
                  htmlFor="textInput"
                  className="block text-lg font-semibold text-gray-700"
                >
                  {itemDetails?.buttonText
                    ? itemDetails?.buttonText
                    : "Button Text"}
                </label>
                <input
                  type="text"
                  id="challengesBtnText"
                  name="challengesBtnText"
                  maxLength="20"
                  defaultValue={challengesBtnText}
                  onChange={(e) => setChallengesBtnText(e.target.value)}
                  className="mt-1 p-2 min-w-[200px] border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                />
              </div>

              {/* Color Input */}
              <div className=" flex items-center">
                <label
                  htmlFor="colorInput"
                  className="block text-lg font-medium text-gray-700"
                >
                  {itemDetails?.changeButton
                    ? itemDetails?.changeButton
                    : "Change Button"}
                </label>
                <input
                  type="color"
                  id="challengesBtnBg"
                  name="challengesBtnBg"
                  defaultValue={challengesBtnBg}
                  onChange={(e) => setChallengesBtnBg(e.target.value)}
                  className="ml-2 p-2 w-10 h-10 border rounded-md focus:outline-none focus:ring focus:border-blue-300 cursor-pointer"
                />
              </div>

              <div className=" flex items-center">
                <label
                  htmlFor="colorInput"
                  className="block text-lg font-medium text-gray-700"
                >
                  {itemDetails?.changeCard
                    ? itemDetails?.changeCard
                    : "Change Card"}
                </label>
                <input
                  type="color"
                  id="challengesCardBg"
                  name="challengesCardBg"
                  defaultValue={challengesCardBg}
                  onChange={(e) => setChallengesCardBg(e.target.value)}
                  className="ml-2 p-2 w-10 h-10 border rounded-md focus:outline-none focus:ring focus:border-blue-300 cursor-pointer"
                />
              </div>

              <div className=" flex items-center">
                <label
                  htmlFor="colorInput"
                  className="block text-lg font-medium text-gray-700"
                >
                  {itemDetails?.changeProgress
                    ? itemDetails?.changeProgress
                    : "Change Progress"}
                </label>
                <input
                  type="color"
                  id="challengesProgressBg"
                  name="challengesProgressBg"
                  defaultValue={challengesProgressBg}
                  onChange={(e) => setChallengesProgressBg(e.target.value)}
                  className="ml-2 p-2 w-10 h-10 border rounded-md focus:outline-none focus:ring focus:border-blue-300 cursor-pointer"
                />
              </div>

              <div className=" flex items-center">
                <label
                  htmlFor="colorInput"
                  className="block text-lg font-medium text-gray-700"
                >
                  {itemDetails?.changeImageBg
                    ? itemDetails?.changeImageBg
                    : "Change ImageBg"}
                </label>
                <input
                  type="color"
                  id="challengesImgBg"
                  name="challengesImgBg"
                  defaultValue={challengesImgBg}
                  onChange={(e) => setChallengesImgBg(e.target.value)}
                  className="ml-2 p-2 w-10 h-10 border rounded-md focus:outline-none focus:ring focus:border-blue-300 cursor-pointer"
                />
              </div>

              {/* Image Input */}
              <div className="">
                <label
                  htmlFor="imageInput"
                  className="block text-lg font-medium text-gray-700"
                >
                  {itemDetails?.changeImage
                    ? itemDetails?.changeImage
                    : "Change Image"}
                </label>
                {fileLoading ? (
                  <img
                    className="mx-auto animate-ping"
                    style={{ height: "30px", width: "30px" }}
                    src="https://i.ibb.co/gJLdW8G/cloud-upload-regular-240.png"
                    alt=""
                  />
                ) : (
                  <input
                    type="file"
                    id="challengesImg"
                    name="challengesImg"
                    // defaultValue={courseCompletionImg}
                    onChange={uploadChallengesImg}
                    className="ml-2 p-2 w-[200px] border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                  />
                )}
              </div>
            </div>
          </div>
        )}

        {!addChallenges && <div className="mt-24"></div>}

        {/* Challenges End */}

        {/* Request Slots Start */}

        <div className="my-8">
          <label
            htmlFor="requestSlotsToggle"
            className="flex items-center cursor-pointer"
          >
            <div className="relative">
              <input
                type="checkbox"
                id="requestSlotsToggle"
                className="sr-only"
                checked={addRequestSlots}
                onChange={handleAddRequestSlots}
              />
              <div className="block bg-gray-600 w-14 h-8 rounded-full"></div>
              <div
                className={`${
                  addRequestSlots
                    ? "bg-green translate-x-full"
                    : "bg-gray-300 translate-x-0"
                } absolute left-1 top-1 w-6 h-6 rounded-full transition-transform transform ease-in-out duration-300`}
              ></div>
            </div>
            <div className="ml-3 text-gray-700 font-semibold text-xl">
              {!addRequestSlots
                ? itemDetails?.addSection
                  ? itemDetails?.addSection
                  : "Add Section"
                : itemDetails?.removeSection
                ? itemDetails?.removeSection
                : "Remove Section"}
            </div>
          </label>
        </div>

        <RequestSlots
          itemDetails={itemDetails}
          slotsHeaderText={slotsHeaderText}
          slotsBtnText={slotsBtnText}
          slotsBtnBg={slotsBtnBg}
          slotsCardBg={slotsCardBg}
        />

        {addRequestSlots && (
          <div className="mt-24 w-full mx-auto bg-white py-3 px-5 rounded shadow-md">
            <div className="flex justify-between items-center gap-8">
              {/* Text Input */}
              <div className="">
                <label
                  htmlFor="textInput"
                  className="block text-lg font-semibold text-gray-700"
                >
                  {itemDetails?.headerText
                    ? itemDetails?.headerText
                    : "Header Text"}
                </label>
                <input
                  type="text"
                  id="slotsHeaderText"
                  name="slotsHeaderText"
                  defaultValue={slotsHeaderText}
                  onChange={(e) => setSlotsHeaderText(e.target.value)}
                  className="mt-1 p-2 min-w-[200px] border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                />
              </div>

              {/* Text Input */}
              <div className="">
                <label
                  htmlFor="textInput"
                  className="block text-lg font-semibold text-gray-700"
                >
                  {itemDetails?.buttonText
                    ? itemDetails?.buttonText
                    : "Button Text"}
                </label>
                <input
                  type="text"
                  id="slotsBtnText"
                  name="slotsBtnText"
                  maxLength="20"
                  defaultValue={slotsBtnText}
                  onChange={(e) => setSlotsBtnText(e.target.value)}
                  className="mt-1 p-2 min-w-[200px] border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                />
              </div>

              {/* Color Input */}
              <div className=" flex items-center">
                <label
                  htmlFor="colorInput"
                  className="block text-lg font-medium text-gray-700"
                >
                  {itemDetails?.changeButton
                    ? itemDetails?.changeButton
                    : "Change Button"}
                </label>
                <input
                  type="color"
                  id="slotsBtnBg"
                  name="slotsBtnBg"
                  defaultValue={slotsBtnBg}
                  onChange={(e) => setSlotsBtnBg(e.target.value)}
                  className="ml-2 p-2 w-10 h-10 border rounded-md focus:outline-none focus:ring focus:border-blue-300 cursor-pointer"
                />
              </div>

              <div className=" flex items-center">
                <label
                  htmlFor="colorInput"
                  className="block text-lg font-medium text-gray-700"
                >
                  {itemDetails?.changeCard
                    ? itemDetails?.changeCard
                    : "Change Card"}
                </label>
                <input
                  type="color"
                  id="slotsCardBg"
                  name="slotsCardBg"
                  defaultValue={slotsCardBg}
                  onChange={(e) => setSlotsCardBg(e.target.value)}
                  className="ml-2 p-2 w-10 h-10 border rounded-md focus:outline-none focus:ring focus:border-blue-300 cursor-pointer"
                />
              </div>
            </div>
          </div>
        )}
        {!addRequestSlots && <div className="mt-20"></div>}

        {/* Request Slots End */}

        <div className="my-8">
          <label
            htmlFor="addCoursesToggle"
            className="flex items-center cursor-pointer"
          >
            <div className="relative">
              <input
                type="checkbox"
                id="addCoursesToggle"
                className="sr-only"
                checked={addCourses}
                onChange={handleAddCourses}
              />
              <div className="block bg-gray-600 w-14 h-8 rounded-full"></div>
              <div
                className={`${
                  addCourses
                    ? "bg-green translate-x-full"
                    : "bg-gray-300 translate-x-0"
                } absolute left-1 top-1 w-6 h-6 rounded-full transition-transform transform ease-in-out duration-300`}
              ></div>
            </div>
            <div className="ml-3 text-gray-700 font-semibold text-xl">
              {!addCourses
                ? itemDetails?.addSection
                  ? itemDetails?.addSection
                  : "Add Section"
                : itemDetails?.removeSection
                ? itemDetails?.removeSection
                : "Remove Section"}
            </div>
          </label>
        </div>

        {addCourses && (
          <div className="w-full mx-auto bg-white py-3 px-5 rounded shadow-md">
            <div className="flex justify-between items-center gap-8">
              <div className="flex flex-col items-start">
                <label className="block text-lg font-medium text-gray-700">
                  {itemDetails?.courseType
                    ? itemDetails?.courseType
                    : "Course Type"}
                </label>
                <div className="ml-2 flex items-center space-x-4">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      name="myCourses"
                      checked={myCoursesChecked}
                      onChange={() => setMyCoursesChecked(!myCoursesChecked)}
                      className="mr-1"
                    />
                    <span>
                      {itemDetails?.myCourses
                        ? itemDetails?.myCourses
                        : "My Courses"}{" "}
                    </span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      name="allCourses"
                      className="mr-1"
                      checked={allCoursesChecked}
                      onChange={() => setAllCoursesChecked(!allCoursesChecked)}
                    />
                    <span>
                      {itemDetails?.allCourses
                        ? itemDetails?.allCourses
                        : "All Courses"}
                    </span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="my-8">
          <label
            htmlFor="showLabJourneyToggle"
            className="flex items-center cursor-pointer"
          >
            <div className="relative">
              <input
                type="checkbox"
                id="showLabJourneyToggle"
                className="sr-only"
                checked={showLabJourney}
                onChange={() => setShowLabJourney(!showLabJourney)}
              />
              <div className="block bg-gray-600 w-14 h-8 rounded-full"></div>
              <div
                className={`${
                  showLabJourney
                    ? "bg-green translate-x-full"
                    : "bg-gray-300 translate-x-0"
                } absolute left-1 top-1 w-6 h-6 rounded-full transition-transform transform ease-in-out duration-300`}
              ></div>
            </div>
            <div className="ml-3 text-gray-700 font-semibold text-xl">
              {!showLabJourney
                ? itemDetails?.add
                  ? itemDetails?.add
                  : "Add"
                : itemDetails?.remove
                ? itemDetails?.remove
                : "Remove"}{" "}
              {itemDetails?.labJourneySection
                ? itemDetails?.labJourneySection
                : "Lab Journey Section"}
            </div>
          </label>
        </div>
        <div className="my-8">
          <label
            htmlFor="showScheduleToggle"
            className="flex items-center cursor-pointer"
          >
            <div className="relative">
              <input
                type="checkbox"
                id="showScheduleToggle"
                className="sr-only"
                checked={showSchedule}
                onChange={() => setShowSchedule(!showSchedule)}
              />
              <div className="block bg-gray-600 w-14 h-8 rounded-full"></div>
              <div
                className={`${
                  showSchedule
                    ? "bg-green translate-x-full"
                    : "bg-gray-300 translate-x-0"
                } absolute left-1 top-1 w-6 h-6 rounded-full transition-transform transform ease-in-out duration-300`}
              ></div>
            </div>
            <div className="ml-3 text-gray-700 font-semibold text-xl">
              {!showSchedule
                ? itemDetails?.add
                  ? itemDetails?.add
                  : "Add"
                : itemDetails?.remove
                ? itemDetails?.remove
                : "Remove"}{" "}
              {itemDetails?.schedule ? itemDetails?.schedule : "Schedule"}
            </div>
          </label>
        </div>

        {/* Submit Button */}
        <input
          className="bg-green my-8 hover:bg-opacity-60 text-white py-3 px-4 font-bold rounded-lg"
          value={itemDetails?.save ? itemDetails?.save : "Save"}
          type="submit"
        />
      </form>
    </div>
  );
};

export default DashboardTheme;
