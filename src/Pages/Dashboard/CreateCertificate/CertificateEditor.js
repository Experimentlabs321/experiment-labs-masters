import React, { useEffect, useState } from "react";
import uploadFileToS3 from "../../UploadComponent/s3Uploader";
// import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import axios from "axios";
import Swal from "sweetalert2";
import Loading from "../../Shared/Loading/Loading";

const CertificateEditor = ({
  courseName,
  setCourseName,
  certificateText,
  setCertificateText,
  certificateTextFontSize,
  setCertificateTextFontSize,
  courseNameFontSize,
  setCourseNameFontSize,
  certificateTextColor,
  setCertificateTextColor,
  courseNameColor,
  setCourseNameColor,
  certificateTextFontFamily,
  setCertificateTextFontFamily,
  courseNameFontFamily,
  setCourseNameFontFamily,
  selectedBackgroundTemplate,
  setSelectedBackgroundTemplate,
  imageDimensions,
  setImageDimensions,
  zoom,
  setZoom,
  gapInTopAndBottom,
  setGapInTopAndBottom,
  recipientName,
  setRecipientName,
  headerTitle,
  setHeaderTitle,
  headerSubtitle,
  setHeaderSubtitle,
  recipientNameAboveText,
  setRecipientNameAboveText,
  headerTitleFontSize,
  setHeaderTitleFontSize,
  headerSubtitleFontSize,
  setHeaderSubtitleFontSize,
  recipientNameFontSize,
  setRecipientNameFontSize,
  recipientNameAboveTextFontSize,
  setRecipientNameAboveTextFontSize,
  headerTitleColor,
  setHeaderTitleColor,
  headerSubtitleColor,
  setHeaderSubtitleColor,
  recipientNameColor,
  setRecipientNameColor,
  recipientNameAboveTextColor,
  setRecipientNameAboveTextColor,
  headerTitleFontFamily,
  setHeaderTitleFontFamily,
  headerSubtitleFontFamily,
  setHeaderSubtitleFontFamily,
  recipientNameFontFamily,
  setRecipientNameFontFamily,
  recipientNameAboveTextFontFamily,
  setRecipientNameAboveTextFontFamily,
  authors,
  setAuthors,
  count,
  setCount,
  authorNameFontSize,
  setAuthorNameFontSize,
  authorNameColor,
  setAuthorNameColor,
  authorNameFontFamily,
  setAuthorNameFontFamily,
  authorPositionFontSize,
  setAuthorPositionFontSize,
  authorPositionColor,
  setAuthorPositionColor,
  authorPositionFontFamily,
  setAuthorPositionFontFamily,
  courses,
  setCourses,
  selectedCourse,
  setSelectedCourse,
  batchesData,
  setBatchesData,
  selectedBatch,
  setSelectedBatch,
  certificateTextContents,
  setCertificateTextContents,
  orgLogo,
  setOrgLogo,
  orgLogoSize,
  setOrgLogoSize,
  showOrgLogo,
  setShowOrgLogo,
  orgLogoPosition,
  setOrgLogoPosition,
  showRecipientNameUnderline,
  setShowRecipientNameUnderline,
  underlineColor,
  setUnderlineColor,
  backgroundTemplates,
  setBackgroundTemplates,
}) => {
  const [mode, setMode] = useState("add");
  const [certificateTemplate, setCertificateTemplate] = useState({});

  useEffect(() => {
    if (mode === "edit" && selectedCourse && selectedBatch)
      axios
        .get(
          `${process.env.REACT_APP_SERVER_API}/api/v1/certificateTemplates/courseId/${selectedCourse?._id}/batchId/${selectedBatch?._id}`
        )
        .then((response) => {
          setCertificateTemplate(response?.data?.template);
          setSelectedBackgroundTemplate(
            response?.data?.template?.selectedBackgroundTemplate
          );
          if (
            !backgroundTemplates?.find(
              (item) =>
                item === response?.data?.template?.selectedBackgroundTemplate
            )
          ) {
            const allTemplate = [
              response?.data?.template?.selectedBackgroundTemplate,
              ...backgroundTemplates,
            ];
            setBackgroundTemplates(allTemplate);
          }
          setShowOrgLogo(response?.data?.template?.showOrgLogo);
          setShowRecipientNameUnderline(
            response?.data?.template?.showRecipientNameUnderline
          );
          setImageDimensions(response?.data?.template?.imageDimensions);
          setGapInTopAndBottom(response?.data?.template?.gapInTopAndBottom);
          setRecipientName(response?.data?.template?.recipientName);
          setRecipientNameAboveText(
            response?.data?.template?.recipientNameAboveText
          );
          setRecipientNameFontSize(
            response?.data?.template?.recipientNameFontSize
          );
          setRecipientNameAboveTextFontSize(
            response?.data?.template?.recipientNameAboveTextFontSize
          );
          setRecipientNameColor(response?.data?.template?.recipientNameColor);
          setRecipientNameAboveTextColor(
            response?.data?.template?.recipientNameAboveTextColor
          );
          setRecipientNameFontFamily(
            response?.data?.template?.recipientNameFontFamily
          );
          setRecipientNameAboveTextFontFamily(
            response?.data?.template?.recipientNameAboveTextFontFamily
          );
          setRequiredCompletionPercentage(
            response?.data?.template?.requiredCompletionPercentage
          );
          setHeaderTitleFontSize(response?.data?.template?.headerTitleFontSize);
          setHeaderSubtitleFontSize(
            response?.data?.template?.headerSubtitleFontSize
          );
          setHeaderTitleColor(response?.data?.template?.headerTitleColor);
          setHeaderSubtitleColor(response?.data?.template?.headerSubtitleColor);
          setHeaderTitleFontFamily(
            response?.data?.template?.headerTitleFontFamily
          );
          setHeaderSubtitleFontFamily(
            response?.data?.template?.headerSubtitleFontFamily
          );
          setHeaderTitle(response?.data?.template?.headerTitle);
          setHeaderSubtitle(response?.data?.template?.headerSubtitle);
          setAuthors(response?.data?.template?.authors);
          setAuthorNameFontSize(response?.data?.template?.authorNameFontSize);
          setAuthorNameColor(response?.data?.template?.authorNameColor);
          setAuthorNameFontFamily(
            response?.data?.template?.authorNameFontFamily
          );
          setAuthorPositionFontSize(
            response?.data?.template?.authorPositionFontSize
          );
          setAuthorPositionColor(response?.data?.template?.authorPositionColor);
          setAuthorPositionFontFamily(
            response?.data?.template?.authorPositionFontFamily
          );
          setCertificateTextContents(
            response?.data?.template?.certificateTextContents
          );
          setOrgLogo(response?.data?.template?.orgLogo);
          setOrgLogoSize(response?.data?.template?.orgLogoSize);
          setOrgLogoPosition(response?.data?.template?.orgLogoPosition);
          setUnderlineColor(response?.data?.template?.underlineColor);
          setZoom(response?.data?.template?.zoom);
        })
        .catch((error) => console.error(error));
  }, [selectedCourse, selectedBatch, mode]);

  console.log([...backgroundTemplates, selectedBackgroundTemplate]);

  const fontFamilies = [
    "Anton",
    "Barlow Condensed",
    "Bebas Neue",
    "Caveat",
    "Courgette",
    "Dancing Script",
    "Exo 2",
    "Fjalla One",
    "Grape Nuts",
    "Great Vibes",
    "Holland",
    "Indie Flower",
    "Inter",
    "Kanit",
    "Lobster",
    "Lobster Two",
    "Lora",
    "Macondo",
    "Meie Script",
    "Montserrat",
    "Noto Sans",
    "Nunito",
    "Open Sans",
    "Oswald",
    "Oxygen",
    "Playfair Display",
    "Poppins",
    "PT Serif",
    "Quicksand",
    "Raleway",
    "Roboto",
    "Roboto Condensed",
    "Rubik",
    "Satisfy",
    "Sevillana",
    "Ubuntu",
    "Zabal",
  ];
  const dynamicContents = [
    "Recipient name",
    "Course name",
    "Batch name",
    "Organization name",
  ];
  const orgLogoPositions = [
    "Top Right",
    "Top Center",
    "Top Left",
    "Bottom Right",
    "Bottom Left",
  ];
  const [requiredCompletionPercentage, setRequiredCompletionPercentage] =
    useState(70);
  const handleSubmitCertificateTemplate = async () => {
    Loading();
    if (selectedCourse?._id && selectedBatch?._id) {
      const templateData = {
        selectedBackgroundTemplate,
        imageDimensions,
        zoom,
        gapInTopAndBottom,
        recipientName,
        headerTitle,
        headerSubtitle,
        recipientNameAboveText,
        headerTitleFontSize,
        headerSubtitleFontSize,
        recipientNameFontSize,
        recipientNameAboveTextFontSize,
        headerTitleColor,
        headerSubtitleColor,
        recipientNameColor,
        recipientNameAboveTextColor,
        headerTitleFontFamily,
        headerSubtitleFontFamily,
        recipientNameFontFamily,
        recipientNameAboveTextFontFamily,
        authors,
        authorNameFontSize,
        authorNameColor,
        authorNameFontFamily,
        authorPositionFontSize,
        authorPositionColor,
        authorPositionFontFamily,
        certificateTextContents,
        orgLogo,
        orgLogoSize,
        orgLogoPosition,
        showOrgLogo,
        showRecipientNameUnderline,
        underlineColor,
        requiredCompletionPercentage,
        courseId: selectedCourse?._id,
        batchId: selectedBatch?._id,
      };
      // console.log(templateData);
      const addTemplate = await axios.post(
        `${process.env.REACT_APP_SERVER_API}/api/v1/certificateTemplates`,
        templateData
      );

      if (addTemplate?.status === 200) {
        Swal.fire({
          title: addTemplate?.data?.message,
          icon: "success",
        });
        // navigate("/schoolDashboard/myStudents");
      } else {
        Swal.fire({
          title: addTemplate?.data?.message,
          icon: "error",
        });
      }
    } else {
      Swal.fire({
        title: "Please select course and batch!",
        icon: "error",
      });
    }
  };

  return (
    <div className="col-span-3 border-l border-black h-[100vh] overflow-y-scroll p-1 relative flex justify-center items-start">
      <div className="mb-4 w-max mx-auto text-center mt-6 fixed bottom-0 ">
        <button
          className=" px-4 py-2 bg-green rounded-md text-white font-semibold"
          onClick={() => handleSubmitCertificateTemplate()}
        >
          Submit Certificate Template
        </button>
      </div>

      <div className="font-sans w-full">
        <h1 className="text-lg font-semibold mb-3">
          Certificate Credentials Form
        </h1>

        <div className="mb-4">
          <button
            onClick={() => setMode("add")}
            className={`px-5 border-sky-500 w-[50%]  ${
              mode === "add"
                ? "pt-2 pb-1 border-t-2 border-r-2 rounded-tr-md text-sky-500 font-semibold"
                : "pb-2 pt-1 border-b-2 border-r-2 rounded-br-md"
            }`}
          >
            Add
          </button>
          <button
            onClick={() => setMode("edit")}
            className={`px-5 border-sky-500 w-[50%] ml-[-2px]  ${
              mode === "edit"
                ? "pb-1 pt-2 border-t-2 border-l-2 rounded-tl-md text-sky-500 font-semibold"
                : "pt-1 pb-2 border-b-2 border-l-2 rounded-bl-md"
            }`}
          >
            Edit
          </button>
        </div>

        <>
          <div className="mb-4">
            <label
              htmlFor="selectCourse"
              className="block text-sm font-medium text-gray-700"
            >
              Select course
            </label>
            <select
              className="mt-1 p-2 border w-full rounded-md bg-white"
              onChange={(e) => setSelectedCourse(courses[e.target.value])}
            >
              <option className="hidden">Select Course</option>
              {courses?.map((item, index) => (
                <option
                  key={index}
                  className={`px-3 py-3 text-base border rounded-md font-semibold flex items-center justify-between gap-6 m-1 ${
                    selectedCourse?._id === item?._id
                      ? "text-[#0A98EA] border-t-2 border-t-[#0A98EA]"
                      : "text-[#949494]"
                  }`}
                  value={index}
                >
                  {item?.courseFullName}
                </option>
              ))}
            </select>
          </div>

          {selectedCourse?._id && (
            <div className="mb-4">
              <label
                htmlFor="selectBatch"
                className="block text-sm font-medium text-gray-700"
              >
                Select batch
              </label>
              <select
                className="mt-1 p-2 border w-full rounded-md bg-white"
                onChange={(e) => setSelectedBatch(batchesData[e.target.value])}
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
                  >
                    {item?.batchName}
                  </option>
                ))}
              </select>
            </div>
          )}

          {(mode === "add" ||
            (mode === "edit" && selectedCourse?._id && selectedBatch?._id)) && (
            <>
              <div className="mb-4">
                <label
                  htmlFor="gapInTopAndBottom"
                  className="block text-sm font-medium text-gray-700"
                >
                  Gap in top and bottom
                </label>
                <input
                  type="number"
                  id="gapInTopAndBottom"
                  name="gapInTopAndBottom"
                  className="mt-1 p-2 border w-full rounded-md"
                  value={gapInTopAndBottom}
                  onChange={(e) => setGapInTopAndBottom(e.target.value)}
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="requiredCompletionPercentage"
                  className="block text-sm font-medium text-gray-700"
                >
                  Required Completion Percentage
                </label>
                <input
                  type="number"
                  id="requiredCompletionPercentage"
                  name="requiredCompletionPercentage"
                  className="mt-1 p-2 border w-full rounded-md"
                  value={requiredCompletionPercentage}
                  onChange={(e) =>
                    setRequiredCompletionPercentage(e.target.value)
                  }
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="orgLogo"
                  className="block text-sm font-medium text-gray-700"
                >
                  Organization Logo
                </label>
                <input
                  type="file"
                  id="orgLogo"
                  name="orgLogo"
                  className="mt-1 p-2 border w-full rounded-md"
                  // value={authors[index].signature}
                  onChange={async (e) => {
                    e.preventDefault();
                    const file = e.target.files[0];
                    try {
                      if (file) {
                        setOrgLogo(await uploadFileToS3(file));
                        setCount(count + 1);
                        // const reader = new FileReader();

                        // reader.onloadend = async () => {
                        //   // setOrgLogo(await reader.result);
                        //   setCount(count + 1);
                        // };

                        // reader.readAsDataURL(file);
                      }
                      // authors[index].signature = await uploadFileToS3(file);
                      // authors[index].signature = file.name;
                    } catch (error) {
                      console.error("Error uploading file:", error);
                    }
                  }}
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="orgLogSize"
                  className="block text-sm font-medium text-gray-700"
                >
                  Organization Logo position
                </label>
                <div className="flex flex-wrap mb-4">
                  {orgLogoPositions?.map((position, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        setOrgLogoPosition(position);
                      }}
                      className={`w-fit px-2 py-1 ${
                        position === orgLogoPosition
                          ? "bg-slate-300"
                          : "bg-slate-100"
                      } border`}
                    >
                      {position}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mb-4">
                <label
                  htmlFor="orgLogSize"
                  className="block text-sm font-medium text-gray-700"
                >
                  Organization Logo size
                </label>
                <input
                  type="number"
                  id="orgLogSize"
                  name="orgLogSize"
                  className="mt-1 p-2 border w-full rounded-md"
                  value={orgLogoSize}
                  onChange={(e) => setOrgLogoSize(e.target.value)}
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="headerTitle"
                  className="block text-sm font-medium text-gray-700"
                >
                  Header title
                </label>
                <input
                  type="text"
                  placeholder="CERTIFICATE"
                  id="headerTitle"
                  name="headerTitle"
                  className="mt-1 p-2 border w-full rounded-md"
                  value={headerTitle}
                  onChange={(e) => setHeaderTitle(e.target.value)}
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="headerTitleFontFamily"
                  className="block text-sm font-medium text-gray-700"
                >
                  Header title font family
                </label>
                <select
                  id="headerTitleFontFamily"
                  name="headerTitleFontFamily"
                  style={{
                    fontFamily: `${headerTitleFontFamily}`,
                  }}
                  className="mt-1 p-2 border w-full rounded-md bg-white"
                  value={headerTitleFontFamily}
                  onChange={(e) => setHeaderTitleFontFamily(e.target.value)}
                >
                  {fontFamilies.map((font) => (
                    <option
                      style={{
                        fontFamily: `${font}`,
                      }}
                      key={font}
                      value={font}
                    >
                      {font}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-4">
                <label
                  htmlFor="headerTitleFontSize"
                  className="block text-sm font-medium text-gray-700"
                >
                  Header title font size
                </label>
                <input
                  type="number"
                  id="headerTitleFontSize"
                  name="headerTitleFontSize"
                  className="mt-1 p-2 border w-full rounded-md"
                  value={headerTitleFontSize}
                  onChange={(e) => setHeaderTitleFontSize(e.target.value)}
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="headerTitleColor"
                  className="block text-sm font-medium text-gray-700"
                >
                  Header title color
                </label>
                <div className="flex items-center ">
                  <input
                    type="color"
                    id="headerTitleColor"
                    name="headerTitleColor"
                    className=" p-1 w-10 h-10 border rounded-l-md focus:outline-none focus:ring focus:border-blue-300 cursor-pointer"
                    value={headerTitleColor}
                    onChange={(e) => setHeaderTitleColor(e.target.value)}
                  />
                  <span className=" p-2 h-10 border font-sans rounded-r-md">
                    {headerTitleColor}
                  </span>
                </div>
              </div>

              <div className="mb-4">
                <label
                  htmlFor="headerSubtitle"
                  className="block text-sm font-medium text-gray-700"
                >
                  Header subtitle
                </label>
                <input
                  type="text"
                  placeholder="OF RECOGNITION"
                  id="headerSubtitle"
                  name="headerSubtitle"
                  className="mt-1 p-2 border w-full rounded-md"
                  value={headerSubtitle}
                  onChange={(e) => setHeaderSubtitle(e.target.value)}
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="headerSubtitleFontFamily"
                  className="block text-sm font-medium text-gray-700"
                >
                  Header subtitle font family
                </label>
                <select
                  id="headerSubtitleFontFamily"
                  name="headerSubtitleFontFamily"
                  style={{
                    fontFamily: `${headerSubtitleFontFamily}`,
                  }}
                  className="mt-1 p-2 border w-full rounded-md bg-white"
                  value={headerSubtitleFontFamily}
                  onChange={(e) => setHeaderSubtitleFontFamily(e.target.value)}
                >
                  {fontFamilies.map((font) => (
                    <option
                      style={{
                        fontFamily: `${font}`,
                      }}
                      key={font}
                      value={font}
                    >
                      {font}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-4">
                <label
                  htmlFor="headerSubtitleFontSize"
                  className="block text-sm font-medium text-gray-700"
                >
                  Header subtitle font size
                </label>
                <input
                  type="number"
                  id="headerSubtitleFontSize"
                  name="headerSubtitleFontSize"
                  className="mt-1 p-2 border w-full rounded-md"
                  value={headerSubtitleFontSize}
                  onChange={(e) => setHeaderSubtitleFontSize(e.target.value)}
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="headerSubtitleColor"
                  className="block text-sm font-medium text-gray-700"
                >
                  Header subtitle color
                </label>
                <div className="flex items-center ">
                  <input
                    type="color"
                    id="headerSubtitleColor"
                    name="headerSubtitleColor"
                    className=" p-1 w-10 h-10 border rounded-l-md focus:outline-none focus:ring focus:border-blue-300 cursor-pointer"
                    value={headerSubtitleColor}
                    onChange={(e) => setHeaderSubtitleColor(e.target.value)}
                  />
                  <span className=" p-2 h-10 border font-sans rounded-r-md">
                    {headerSubtitleColor}
                  </span>
                </div>
              </div>

              <div className="mb-4">
                <label
                  htmlFor="recipientNameAboveText"
                  className="block text-sm font-medium text-gray-700"
                >
                  Recipient name above text
                </label>
                <textarea
                  placeholder="This certificate is proudly presented for honorable achievement to"
                  id="recipientNameAboveText"
                  name="recipientNameAboveText"
                  rows="4"
                  className="mt-1 p-2 border w-full rounded-md"
                  value={recipientNameAboveText}
                  onChange={(e) => setRecipientNameAboveText(e.target.value)}
                ></textarea>
              </div>

              <div className="mb-4">
                <label
                  htmlFor="recipientNameAboveTextFontFamily"
                  className="block text-sm font-medium text-gray-700"
                >
                  Recipient name above text font family
                </label>
                <select
                  id="recipientNameAboveTextFontFamily"
                  name="recipientNameAboveTextFontFamily"
                  style={{
                    fontFamily: `${recipientNameAboveTextFontFamily}`,
                  }}
                  className="mt-1 p-2 border w-full rounded-md bg-white"
                  value={recipientNameAboveTextFontFamily}
                  onChange={(e) =>
                    setRecipientNameAboveTextFontFamily(e.target.value)
                  }
                >
                  {fontFamilies.map((font) => (
                    <option
                      style={{
                        fontFamily: `${font}`,
                      }}
                      key={font}
                      value={font}
                    >
                      {font}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-4">
                <label
                  htmlFor="recipientNameAboveTextFontSize"
                  className="block text-sm font-medium text-gray-700"
                >
                  Recipient name above text font size
                </label>
                <input
                  type="number"
                  id="recipientNameAboveTextFontSize"
                  name="recipientNameAboveTextFontSize"
                  className="mt-1 p-2 border w-full rounded-md"
                  value={recipientNameAboveTextFontSize}
                  onChange={(e) =>
                    setRecipientNameAboveTextFontSize(e.target.value)
                  }
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="recipientNameAboveTextColor"
                  className="block text-sm font-medium text-gray-700"
                >
                  Recipient name above text color
                </label>
                <div className="flex items-center ">
                  <input
                    type="color"
                    id="recipientNameAboveTextColor"
                    name="recipientNameAboveTextColor"
                    className=" p-1 w-10 h-10 border rounded-l-md focus:outline-none focus:ring focus:border-blue-300 cursor-pointer"
                    value={recipientNameAboveTextColor}
                    onChange={(e) =>
                      setRecipientNameAboveTextColor(e.target.value)
                    }
                  />
                  <span className=" p-2 h-10 border font-sans rounded-r-md">
                    {recipientNameAboveTextColor}
                  </span>
                </div>
              </div>

              <div className="mb-4">
                <label
                  htmlFor="recipientName"
                  className="block text-sm font-medium text-gray-700"
                >
                  Recipient name
                </label>
                <input
                  type="text"
                  id="recipientName"
                  name="recipientName"
                  className="mt-1 p-2 border w-full rounded-md"
                  value={recipientName}
                  onChange={(e) => setRecipientName(e.target.value)}
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="recipientNameFontFamily"
                  className="block text-sm font-medium text-gray-700"
                >
                  Recipient name font family
                </label>
                <select
                  id="recipientNameFontFamily"
                  name="recipientNameFontFamily"
                  style={{
                    fontFamily: `${recipientNameFontFamily}`,
                  }}
                  className="mt-1 p-2 border w-full rounded-md bg-white"
                  value={recipientNameFontFamily}
                  onChange={(e) => setRecipientNameFontFamily(e.target.value)}
                >
                  {fontFamilies.map((font) => (
                    <option
                      style={{
                        fontFamily: `${font}`,
                      }}
                      key={font}
                      value={font}
                    >
                      {font}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-4">
                <label
                  htmlFor="recipientNameFontSize"
                  className="block text-sm font-medium text-gray-700"
                >
                  Recipient name font size
                </label>
                <input
                  type="number"
                  id="recipientNameFontSize"
                  name="recipientNameFontSize"
                  className="mt-1 p-2 border w-full rounded-md"
                  value={recipientNameFontSize}
                  onChange={(e) => setRecipientNameFontSize(e.target.value)}
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="recipientNameColor"
                  className="block text-sm font-medium text-gray-700"
                >
                  Recipient name color
                </label>
                <div className="flex items-center ">
                  <input
                    type="color"
                    id="recipientNameColor"
                    name="recipientNameColor"
                    className=" p-1 w-10 h-10 border rounded-l-md focus:outline-none focus:ring focus:border-blue-300 cursor-pointer"
                    value={recipientNameColor}
                    onChange={(e) => setRecipientNameColor(e.target.value)}
                  />
                  <span className=" p-2 h-10 border font-sans rounded-r-md">
                    {recipientNameColor}
                  </span>
                </div>
              </div>

              <div className="mb-4">
                <label
                  htmlFor="recipientNameUnderline"
                  className="block text-sm font-medium text-gray-700"
                >
                  Underline recipient name
                </label>

                <input
                  type="radio"
                  checked={
                    showRecipientNameUnderline === true ||
                    showRecipientNameUnderline !== false
                  }
                  value={true}
                  onChange={(e) => {
                    // e.preventDefault();
                    // certificateTextContents[index].type = await e.target.value;
                    setShowRecipientNameUnderline(true);
                    setCount(count + 1);
                  }}
                />
                <span className="ml-1 mr-3">Show</span>
                <input
                  type="radio"
                  checked={
                    showRecipientNameUnderline === false ||
                    showRecipientNameUnderline !== true
                  }
                  value={false}
                  onChange={(e) => {
                    // e.preventDefault();
                    // certificateTextContents[index].type = await e.target.value;
                    setShowRecipientNameUnderline(false);
                    setCount(count + 1);
                  }}
                />
                <span className="ml-1">Hide</span>
              </div>

              <div className="mb-4">
                <label
                  htmlFor="underlineColor"
                  className="block text-sm font-medium text-gray-700"
                >
                  Underline color
                </label>
                <div className="flex items-center ">
                  <input
                    type="color"
                    id="underlineColor"
                    name="underlineColor"
                    className=" p-1 w-10 h-10 border rounded-l-md focus:outline-none focus:ring focus:border-blue-300 cursor-pointer"
                    value={underlineColor}
                    onChange={(e) => setUnderlineColor(e.target.value)}
                  />
                  <span className=" p-2 h-10 border font-sans rounded-r-md">
                    {underlineColor}
                  </span>
                </div>
              </div>

              {certificateTextContents?.map((content, index) => (
                <div>
                  <div className="mb-4">
                    <label
                      htmlFor={content?.type + index}
                      className="block text-sm font-medium text-gray-700"
                    >
                      Content {index + 1} type
                    </label>
                    <input
                      type="radio"
                      checked={
                        content?.type === "Static" ||
                        content?.type !== "Dynamic"
                      }
                      value={"Static"}
                      onChange={async (e) => {
                        // e.preventDefault();
                        certificateTextContents[index].type = await e.target
                          .value;
                        setCount(count + 1);
                        content.type = e.target.value;
                        setCount(count + 1);
                      }}
                    />
                    <span className="ml-1 mr-3">Static</span>
                    <input
                      type="radio"
                      checked={
                        content?.type === "Dynamic" ||
                        content?.type !== "Static"
                      }
                      value={"Dynamic"}
                      onChange={async (e) => {
                        // e.preventDefault();
                        certificateTextContents[index].type = await e.target
                          .value;
                        setCount(count + 1);
                        content.type = e.target.value;
                        setCount(count + 1);
                      }}
                    />
                    <span className="ml-1">Dynamic</span>
                  </div>

                  {content?.type === "Static" ? (
                    <div className="mb-4">
                      <label
                        htmlFor={"certificateText" + index}
                        className="block text-sm font-medium text-gray-700"
                      >
                        Certificate content {index + 1}
                      </label>
                      <textarea
                        placeholder="Participating in Workshop about Take Care of Health to Prevent..."
                        id={"certificateText" + index}
                        name={"certificateText" + index}
                        rows="4"
                        className="mt-1 p-2 border w-full rounded-md"
                        defaultValue={content.content}
                        onChange={async (e) => {
                          // e.preventDefault();
                          certificateTextContents[index].content = await e
                            .target.value;
                          setCount(count + 1);
                          content.content = e.target.value;
                          setCount(count + 1);
                        }}
                      ></textarea>
                    </div>
                  ) : (
                    <div className="mb-4">
                      <label
                        htmlFor={"certificateText" + index}
                        className="block text-sm font-medium text-gray-700"
                      >
                        Certificate content {index + 1}
                      </label>
                      <select
                        id={"certificateText" + index}
                        name={"certificateText" + index}
                        className="mt-1 p-2 border w-full rounded-md bg-white"
                        onChange={async (e) => {
                          // e.preventDefault();
                          certificateTextContents[index].content = await e
                            .target.value;
                          setCount(count + 1);
                          content.content = e.target.value;
                          setCount(count + 1);
                        }}
                      >
                        <option className="hidden" value="">
                          Select dynamic content
                        </option>
                        {dynamicContents.map((dynamicContent) => (
                          <option key={dynamicContent} value={dynamicContent}>
                            {dynamicContent}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}

                  <div className="mb-4">
                    <label
                      htmlFor={"certificateTextFontFamily" + index}
                      className="block text-sm font-medium text-gray-700"
                    >
                      Certificate content {index + 1} font family
                    </label>
                    <select
                      id={"certificateTextFontFamily" + index}
                      name={"certificateTextFontFamily" + index}
                      style={{
                        fontFamily: `${content.contentFontFamily}`,
                      }}
                      className="mt-1 p-2 border w-full rounded-md bg-white"
                      onChange={async (e) => {
                        // e.preventDefault();
                        certificateTextContents[index].contentFontFamily =
                          await e.target.value;
                        setCount(count + 1);
                        content.contentFontFamily = e.target.value;
                        setCount(count + 1);
                      }}
                    >
                      {fontFamilies.map((font) => (
                        <option
                          style={{
                            fontFamily: `${font}`,
                          }}
                          key={font}
                          value={font}
                        >
                          {font}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="mb-4">
                    <label
                      htmlFor={"certificateTextFontSize" + index}
                      className="block text-sm font-medium text-gray-700"
                    >
                      Certificate content {index + 1} font size
                    </label>
                    <input
                      type="number"
                      id={"certificateTextFontSize" + index}
                      name={"certificateTextFontSize" + index}
                      className="mt-1 p-2 border w-full rounded-md"
                      defaultValue={content.contentFontSize}
                      onChange={async (e) => {
                        // e.preventDefault();
                        certificateTextContents[index].contentFontSize = await e
                          .target.value;
                        setCount(count + 1);
                        content.contentFontSize = e.target.value;
                        setCount(count + 1);
                      }}
                    />
                  </div>

                  <div className="mb-4">
                    <label
                      htmlFor={"certificateTextColor" + index}
                      className="block text-sm font-medium text-gray-700"
                    >
                      Certificate content {index + 1} color
                    </label>
                    <div className="flex items-center ">
                      <input
                        type="color"
                        id={"certificateTextColor" + index}
                        name={"certificateTextColor" + index}
                        className=" p-1 w-10 h-10 border rounded-l-md focus:outline-none focus:ring focus:border-blue-300 cursor-pointer"
                        defaultValue={content.contentColor}
                        onChange={async (e) => {
                          // e.preventDefault();
                          certificateTextContents[index].contentColor = await e
                            .target.value;
                          setCount(count + 1);
                          content.contentColor = e.target.value;
                          setCount(count + 1);
                        }}
                      />
                      <span className=" p-2 h-10 border font-sans rounded-r-md">
                        {content.contentColor}{" "}
                      </span>
                    </div>
                  </div>
                </div>
              ))}

              <button
                onClick={() => {
                  setCertificateTextContents([
                    ...certificateTextContents,
                    {
                      type: "Static",
                      content: "",
                      contentFontFamily: "",
                      contentColor: "#000000",
                      contentFontSize: 20,
                    },
                  ]);
                }}
                className="flex items-center gap-2 mb-4 bg-[#F6F7FF] border-[1px] border-[#CECECE] rounded-[6px] py-2 px-3"
              >
                Add More Content
                <span className="bg-black rounded-full">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 25 25"
                    fill="none"
                  >
                    <path
                      d="M19.6641 11.2275H13.6641V5.22754H11.6641V11.2275H5.66406V13.2275H11.6641V19.2275H13.6641V13.2275H19.6641V11.2275Z"
                      fill="white"
                    />
                  </svg>
                </span>
              </button>

              {authors?.map((author, index) => (
                <div>
                  <div className="mb-4">
                    <label
                      htmlFor={author?.name + index}
                      className="block text-sm font-medium text-gray-700"
                    >
                      Author {index + 1} name
                    </label>
                    <input
                      type="text"
                      id={author?.name + index}
                      name={author?.name + index}
                      className="mt-1 p-2 border w-full rounded-md"
                      defaultValue={authors[index].name}
                      onChange={(e) => {
                        e.preventDefault();
                        authors[index].name = e.target.value;
                        setCount(count + 1);
                      }}
                    />
                  </div>

                  <div className="mb-4">
                    <label
                      htmlFor={author?.name + index}
                      className="block text-sm font-medium text-gray-700"
                    >
                      Author {index + 1} designation
                    </label>
                    <input
                      type="text"
                      id={author?.position + index}
                      name={author?.position + index}
                      className="mt-1 p-2 border w-full rounded-md"
                      defaultValue={authors[index].position}
                      onChange={(e) => {
                        e.preventDefault();
                        authors[index].position = e.target.value;
                        setCount(count + 1);
                      }}
                    />
                  </div>

                  <div className="mb-4">
                    <label
                      htmlFor={author?.signature + index}
                      className="block text-sm font-medium text-gray-700"
                    >
                      Author {index + 1} signature
                    </label>
                    <input
                      type="file"
                      id={author?.signature + index}
                      name={author?.signature + index}
                      className="mt-1 p-2 border w-full rounded-md"
                      // value={authors[index].signature}
                      onChange={async (e) => {
                        e.preventDefault();
                        const file = e.target.files[0];
                        try {
                          if (file) {
                            const url = await uploadFileToS3(file);
                            const reader = new FileReader();

                            reader.onloadend = async () => {
                              authors[index].signature = await url;
                              setCount(count + 1);
                            };

                            reader.readAsDataURL(file);
                          }
                          // authors[index].signature = await uploadFileToS3(file);
                          // authors[index].signature = file.name;
                        } catch (error) {
                          console.error("Error uploading file:", error);
                        }
                        authors[index].signature = e.target.value;
                      }}
                    />
                  </div>

                  <div className="mb-4">
                    <label
                      htmlFor={
                        author?.signature + author?.signatureSize + index
                      }
                      className="block text-sm font-medium text-gray-700"
                    >
                      Author {index + 1} signature size
                    </label>
                    <input
                      type="number"
                      id={author?.signature + author?.signatureSize + index}
                      name={author?.signature + author?.signatureSize + index}
                      className="mt-1 p-2 border w-full rounded-md"
                      defaultValue={authors[index].signatureSize}
                      onChange={(e) => {
                        e.preventDefault();
                        authors[index].signatureSize = e.target.value;
                        setCount(count + 1);
                      }}
                      // onChange={(e) => setAuthorNameFontSize(e.target.value)}
                    />
                  </div>
                </div>
              ))}
              <button
                onClick={() => {
                  setAuthors([
                    ...authors,
                    {
                      name: "",
                      position: "",
                      signature: "",
                      signatureSize: 400,
                    },
                  ]);
                }}
                className="flex items-center gap-2 mb-4 bg-[#F6F7FF] border-[1px] border-[#CECECE] rounded-[6px] py-2 px-3"
              >
                Add Author
                <span className="bg-black rounded-full">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 25 25"
                    fill="none"
                  >
                    <path
                      d="M19.6641 11.2275H13.6641V5.22754H11.6641V11.2275H5.66406V13.2275H11.6641V19.2275H13.6641V13.2275H19.6641V11.2275Z"
                      fill="white"
                    />
                  </svg>
                </span>
              </button>

              <div className="mb-4">
                <label
                  htmlFor="authorNameFontFamily"
                  className="block text-sm font-medium text-gray-700"
                >
                  Auth name font family
                </label>
                <select
                  id="authorNameFontFamily"
                  name="authorNameFontFamily"
                  style={{
                    fontFamily: `${authorNameFontFamily}`,
                  }}
                  className="mt-1 p-2 border w-full rounded-md bg-white"
                  value={authorNameFontFamily}
                  onChange={(e) => setAuthorNameFontFamily(e.target.value)}
                >
                  {fontFamilies.map((font) => (
                    <option
                      style={{
                        fontFamily: `${font}`,
                      }}
                      key={font}
                      value={font}
                    >
                      {font}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-4">
                <label
                  htmlFor="authorNameFontSize"
                  className="block text-sm font-medium text-gray-700"
                >
                  Author name font size
                </label>
                <input
                  type="number"
                  id="authorNameFontSize"
                  name="authorNameFontSize"
                  className="mt-1 p-2 border w-full rounded-md"
                  value={authorNameFontSize}
                  onChange={(e) => setAuthorNameFontSize(e.target.value)}
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="authorNameColor"
                  className="block text-sm font-medium text-gray-700"
                >
                  Author name color
                </label>
                <div className="flex items-center ">
                  <input
                    type="color"
                    id="authorNameColor"
                    name="authorNameColor"
                    className=" p-1 w-10 h-10 border rounded-l-md focus:outline-none focus:ring focus:border-blue-300 cursor-pointer"
                    value={authorNameColor}
                    onChange={(e) => setAuthorNameColor(e.target.value)}
                  />
                  <span className=" p-2 h-10 border font-sans rounded-r-md">
                    {authorNameColor}
                  </span>
                </div>
              </div>

              <div className="mb-4">
                <label
                  htmlFor="authorPositionFontFamily"
                  className="block text-sm font-medium text-gray-700"
                >
                  Auth designation font family
                </label>
                <select
                  id="authorPositionFontFamily"
                  name="authorPositionFontFamily"
                  style={{
                    fontFamily: `${authorPositionFontFamily}`,
                  }}
                  className="mt-1 p-2 border w-full rounded-md bg-white"
                  value={authorPositionFontFamily}
                  onChange={(e) => setAuthorPositionFontFamily(e.target.value)}
                >
                  {fontFamilies.map((font) => (
                    <option
                      style={{
                        fontFamily: `${font}`,
                      }}
                      key={font}
                      value={font}
                    >
                      {font}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-4">
                <label
                  htmlFor="authorPositionFontSize"
                  className="block text-sm font-medium text-gray-700"
                >
                  Author designation font size
                </label>
                <input
                  type="number"
                  id="authorPositionFontSize"
                  name="authorPositionFontSize"
                  className="mt-1 p-2 border w-full rounded-md"
                  value={authorPositionFontSize}
                  onChange={(e) => setAuthorPositionFontSize(e.target.value)}
                />
              </div>

              <div className=" mb-20 ">
                <label
                  htmlFor="authorPositionColor"
                  className="block text-sm font-medium text-gray-700"
                >
                  Author designation color
                </label>
                <div className="flex items-center ">
                  <input
                    type="color"
                    id="authorPositionColor"
                    name="authorPositionColor"
                    className=" p-1 w-10 h-10 border rounded-l-md focus:outline-none focus:ring focus:border-blue-300 cursor-pointer"
                    value={authorPositionColor}
                    onChange={(e) => setAuthorPositionColor(e.target.value)}
                  />
                  <span className=" p-2 h-10 border font-sans rounded-r-md">
                    {authorPositionColor}
                  </span>
                </div>
              </div>
            </>
          )}
        </>
      </div>
    </div>
  );
};

export default CertificateEditor;
