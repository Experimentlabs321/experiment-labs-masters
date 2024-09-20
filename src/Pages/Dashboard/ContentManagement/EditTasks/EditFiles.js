import { useContext, useEffect, useState } from "react";

import axios from "axios";
import { toast } from "react-hot-toast";
import { Link, useNavigate, useParams } from "react-router-dom";

import CloudUploadIcon from "@mui/icons-material/CloudUpload";

import required from "../../../../assets/ContentManagement/required.png";
import { AuthContext } from "../../../../contexts/AuthProvider";
import Loading from "../../../Shared/Loading/Loading";
import TextEditor from "../../../Shared/TextEditor/TextEditor";
import uploadFileToS3 from "../../../UploadComponent/s3Uploader";
import Layout from "../../Layout";
import FilesTask from "../../Week/FilesTask";
import ItemEarningParameter from "../Components/Shared/ItemEarningParameter";
import SkillBasedParameter from "../Components/Shared/SkillBasedParameter";

const EditFiles = () => {
  // upload file
  const [dragActive, setDragActive] = useState(true);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    //setDragActive(false);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const file = e.dataTransfer.files[0];
    setSelectedFile(file);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
  };

  // ----   code by shihab   ----
  const { user, userInfo } = useContext(AuthContext);
  const { id } = useParams();
  const [chapter, setChapter] = useState({});
  const [skillCategories, setSkillCategories] = useState([]);
  const [earningCategories, setEarningCategories] = useState([]);
  const [skillParameterData, setSkillParameterData] = useState([]);
  const [earningParameterData, setEarningParameterData] = useState([]);
  const [course, setCourse] = useState({});
  const [preview, setPreview] = useState(false);
  const [submitPermission, setSubmitPermission] = useState(false);
  const [fileData, setFileData] = useState({});
  const [fileDescription, setFileDescription] = useState("");
  const [batchesData, setBatchesData] = useState([]);
  const [selectedBatches, setSelectedBatches] = useState([]);
  const [orgData, setOrgData] = useState({});
  const [taskDrip, setTaskDrip] = useState();
  const [enableDownload, setEnableDownload] = useState(false);

  useEffect(() => {
    if (id)
      axios
        .get(
          `${process.env.REACT_APP_SERVERLESS_API}/api/v1/tasks/taskType/files/taskId/${id}`
        )
        .then((response) => {
          setFileData(response?.data);
          // setSelectedFile(response?.data?.additionalFiles);
          setSelectedBatches(
            response?.data?.batches ? response?.data?.batches : selectedBatches
          );
          setSkillParameterData(
            response?.data?.skillParameterData
              ? response?.data?.skillParameterData
              : skillParameterData
          );
          setEarningParameterData(
            response?.data?.earningParameterData
              ? response?.data?.earningParameterData
              : earningParameterData
          );
          setTaskDrip(
            response?.data?.taskDrip ? response?.data?.taskDrip : taskDrip
          );
          setEnableDownload(
            response?.data?.enableDownload
              ? response?.data?.enableDownload
              : enableDownload
          );
          setFileDescription(
            response?.data?.fileDescription
              ? response?.data?.fileDescription
              : fileDescription
          );
        });
  }, [id]);

  useEffect(() => {
    if (fileData?.chapterId)
      axios
        //.get(`${process.env.REACT_APP_BACKEND_API}/chapter/${fileData?.chapterId}`)
        .get(
          `${process.env.REACT_APP_SERVERLESS_API}/api/v1/chapters/${fileData?.chapterId}`
        )
        .then((res) => setChapter(res?.data))
        .catch((error) => console.error(error));
  }, [fileData]);

  useEffect(() => {
    const fetchData = {
      organizationId: userInfo?.organizationId,
      courseId: chapter?.courseId,
    };
    if (chapter?.courseId && userInfo?.organizationId) {
      axios
        .get(
          `${process.env.REACT_APP_SERVERLESS_API}/api/v1/skillCategories/organizationId/${fetchData?.organizationId}/courseId/${fetchData?.courseId}`,
          fetchData
        )
        .then((res) => setSkillCategories(res?.data))
        .catch((error) => console.error(error));
      axios
        .post(
          `${process.env.REACT_APP_BACKEND_API}/itemCategoryByCourseId`,
          fetchData
        )
        .then((res) => setEarningCategories(res?.data))
        .catch((error) => console.error(error));
    }
  }, [chapter, userInfo]);

  useEffect(() => {
    if (chapter?.courseId)
      axios
        .get(
          `${process.env.REACT_APP_SERVERLESS_API}/api/v1/courses/${chapter?.courseId}`
        )
        .then((response) => {
          setCourse(response?.data);
        });
  }, [chapter]);

  useEffect(() => {
    if (chapter?.courseId)
      axios
        .get(
          `${process.env.REACT_APP_SERVERLESS_API}/api/v1/batches/courseId/${chapter?.courseId}`
        )
        .then((response) => {
          setBatchesData(response?.data);
        })
        .catch((error) => console.error(error));
  }, [chapter]);

  useEffect(() => {
    if (userInfo?.organizationId)
      axios
        .get(
          `${process.env.REACT_APP_SERVERLESS_API}/api/v1/organizations/${userInfo?.organizationId}`
        )
        .then((response) => {
          setOrgData(response?.data);
        })
        .catch((error) => console.error(error));
  }, [userInfo]);

  const handleOptionChangeBatch = (event, optionValue) => {
    // const optionValue = event.target.value;
    const isChecked = event.target.checked;

    if (isChecked) {
      setSelectedBatches([
        ...selectedBatches,
        { batchName: optionValue?.batchName, batchId: optionValue?._id },
      ]);
    } else {
      setSelectedBatches(
        selectedBatches.filter((option) => option?.batchId !== optionValue?._id)
      );
    }
  };

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    Loading();
    let fileUrl = "";
    if (selectedFile) fileUrl = await uploadFileToS3(selectedFile);
    const form = event.target;
    const fileName = form.fileName?.value;

    const ManageFile = {
      fileName,
      taskName: fileName,
      additionalFiles: selectedFile ? fileUrl : fileData?.additionalFiles,
      skillParameterData: skillParameterData,
      earningParameterData: earningParameterData,
      chapterId: fileData?.chapterId,
      batches: selectedBatches,
      taskDrip,
      enableDownload,
      fileDescription,
    };

    setFileData(ManageFile);

    if (submitPermission) {
      const newTask = await axios.put(
        `${process.env.REACT_APP_SERVERLESS_API}/api/v1/tasks/taskType/files/taskId/${id}`,
        ManageFile
      );

      if (newTask?.data?.result?.acknowledged) {
        toast.success("File added Successfully");
        // event.target.reset();
      }

      console.log(ManageFile);
    }
    Loading().close();
    navigate(-1);
  };

  return (
    <div>
      <Layout>
        <div>
          <div className=" border-b-2 ">
            <div className="container flex-col lg:flex-row gap-3 lg:gap-0 mt-20 lg:mt-0 ml-4 lg:mx-auto px-4 flex items-center justify-between ">
              <div className="flex items-center pt-[30px] pb-[30px] ">
                <Link
                  to="/courseAccess"
                  className="text-[#168DE3] font-sans mr-[30px] text-[20px] font-[400] underline "
                >
                  My Courses
                </Link>
                <svg
                  className="mr-[30px]"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="25"
                  viewBox="0 0 24 25"
                  fill="none"
                >
                  <path
                    d="M9 18.667L15 12.667L9 6.66699"
                    stroke="black"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
                <Link
                  to={`/questLevels/${course?._id}`}
                  className="text-[#168DE3] font-sans mr-[30px] text-[20px] font-[400] underline "
                >
                  {course?.courseFullName}
                </Link>
                <svg
                  className="mr-[30px]"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="25"
                  viewBox="0 0 24 25"
                  fill="none"
                >
                  <path
                    d="M9 18.667L15 12.667L9 6.66699"
                    stroke="black"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
                <button className=" font-sans mr-[30px] text-[20px] font-[400] ">
                  {chapter?.chapterName}
                </button>
              </div>
              <div className="flex items-center mt-[-10px] lg:mb-0 mb-3">
                <div className="flex items-center text-black text-[16px] font-[600] mr-[32px] ">
                  <h1 className="mr-[16px]">Preview Mode</h1>
                  {preview ? (
                    <svg
                      className="cursor-pointer"
                      onClick={() => setPreview(!preview)}
                      xmlns="http://www.w3.org/2000/svg"
                      width="58"
                      height="27"
                      viewBox="0 0 58 27"
                      fill="none"
                    >
                      <rect
                        width="57.8422"
                        height="26.7841"
                        rx="13.392"
                        fill="#9747FF"
                      />
                      <circle
                        cx="44.4512"
                        cy="13.3916"
                        r="10.1153"
                        fill="white"
                      />
                    </svg>
                  ) : (
                    <svg
                      className="cursor-pointer"
                      onClick={() => setPreview(!preview)}
                      xmlns="http://www.w3.org/2000/svg"
                      width="58"
                      height="28"
                      viewBox="0 0 58 28"
                      fill="none"
                    >
                      <rect
                        y="0.608398"
                        width="57.8422"
                        height="26.7841"
                        rx="13.392"
                        fill="#A3A3A3"
                      />
                      <circle cx="13.3926" cy="14" r="10.1153" fill="white" />
                    </svg>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={`${preview ? "block" : "hidden"}`}>
          <FilesTask taskData={fileData} />
        </div>
        <div className={`${preview ? "hidden" : "block"}`}>
          <div className="text-[#3E4DAC] text-[26px] font-bold  py-[35px] ps-[40px]">
            <p>Manage File in {chapter?.chapterName}</p>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col lg:flex-row gap-3 lg:gap-0  me-20 py-[35px] ps-[40px]">
              <div className="w-full">
                <div className="w-full">
                  <div className="">
                    <div className="flex items-center gap-4">
                      <p className="h-2 w-2 bg-black rounded-full"></p>
                      <p className="font-bold text-lg me-[36px]">File Name</p>
                      <img src={required} alt="required" />
                    </div>
                    <input
                      required
                      defaultValue={fileData ? fileData?.fileName : ""}
                      className="mt-6 ms-6 border rounded-md w-3/4 h-[50px] ps-2 text-[#535353] focus:outline-0 bg-[#F6F7FF] "
                      name="fileName"
                      type="text"
                      placeholder="Eg. Entrepreneurship Lab"
                    />
                  </div>
                </div>
                <div className="w-full mt-10">
                  <div className="flex items-center gap-4">
                    <p className="h-2 w-2 bg-black rounded-full"></p>
                    <p className="font-bold text-lg me-[36px]">
                      File Description{" "}
                    </p>
                    <img src={required} alt="required" />
                  </div>

                  {/* Text editor */}
                  <div className="py-4 ms-5">
                    <div className="bg-white text-black textEditor">
                      <TextEditor
                        value={fileDescription}
                        setValue={setFileDescription}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="w-full">
                <div className=" flex flex-col">
                  <div className="flex items-center gap-4">
                    <p className="h-2 w-2 bg-black rounded-full"></p>
                    <p className="font-bold text-lg me-[36px]">Upload Files</p>
                  </div>

                  <div
                    className="w-3/4 h-[253px] bg-[#F6F7FF] flex flex-col items-center justify-center rounded-b-lg mt-6 ms-6"
                    onDragEnter={handleDragEnter}
                    onDragLeave={handleDragLeave}
                    onDragOver={handleDragOver}
                    onDrop={handleDrop}
                    style={{
                      border: "0.917px dashed #000",
                      background: "#F6F7FF",
                    }}
                  >
                    {dragActive ? (
                      <>
                        <CloudUploadIcon />
                        <p className="text-[17px] font-semibold mb-3 mt-3">
                          Drag and drop{" "}
                        </p>
                        <p className="text-sm font-medium mb-3">Or</p>
                      </>
                    ) : (
                      selectedFile && <p>Selected file: {selectedFile.name}</p>
                    )}
                    {selectedFile && (
                      <p className=" text-center break-words max-w-full overflow-hidden">
                        Selected file: {selectedFile.name}
                      </p>
                    )}
                    {!selectedFile && (
                      <>
                        <div className="flex gap-2 justify-center w-full">
                          <label
                            className="flex items-center px-5 py-2 rounded-lg bg-[#FFDB70] text-xs font-bold"
                            htmlFor="input-file-upload"
                          >
                            Browser
                          </label>
                          <input
                            className="w-[1%]"
                            defaultValue={
                              fileData ? fileData?.additionalFiles : ""
                            }
                            style={{ fontSize: "0", opacity: "0" }}
                            type="file"
                            // accept=".jpg, .jpeg, .png"
                            name="input-file-upload"
                            id="input-file-upload"
                            onChange={handleFileChange}
                            multiple
                          />
                        </div>
                      </>
                      // <input type="file" id="input-file-upload" onChange={handleFileChange} />
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="me-20 py-[35px] ps-[40px]">
              <div>
                <div className="flex items-center gap-4">
                  <p className="h-2 w-2 bg-black rounded-full"></p>
                  <p className="font-bold text-lg me-[36px]">Select Batch</p>
                  <img src={required} alt="required" />
                </div>
                <ul className="flex gap-4 flex-wrap ">
                  {batchesData?.map((option, index) => {
                    return (
                      <>
                        <li className="cursor-pointer flex mb-2 items-center py-2 text-[#6A6A6A] text-[14px] font-[400] ">
                          <input
                            type="checkbox"
                            id="student"
                            name={option?.batchName}
                            value={option?.batchName}
                            checked={selectedBatches.find(
                              (item) => item?.batchName === option?.batchName
                            )}
                            onChange={(e) => handleOptionChangeBatch(e, option)}
                            className=" mb-1"
                          />
                          <div className="flex mb-1 items-center">
                            <label className="ms-4" htmlFor={option?.batchName}>
                              {option?.batchName}
                            </label>
                          </div>
                        </li>
                      </>
                    );
                  })}
                </ul>
              </div>
            </div>

            <div className="space-y-4 mb-8 ps-[40px]">
              <fieldset>
                <div className="flex items-center gap-4 mb-5">
                  <p className="h-2 w-2 bg-black rounded-full"></p>
                  <p className="font-bold text-lg me-[36px]">Enable Drip</p>
                  <img src={required} alt="" />
                </div>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="radioYes"
                      name="radioOption"
                      checked={taskDrip === true}
                      onChange={() => setTaskDrip(true)}
                      disabled={course?.enableDrip}
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300"
                    />
                    <label
                      htmlFor="radioYes"
                      className={`ml-2 text-sm font-medium ${
                        course?.enableDrip ? "text-gray-400" : "text-gray-900"
                      }`}
                    >
                      Yes
                    </label>
                  </div>

                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="radioNo"
                      name="radioOption"
                      checked={taskDrip !== true}
                      onChange={() => setTaskDrip(false)}
                      disabled={course?.enableDrip}
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300"
                    />
                    <label
                      htmlFor="radioNo"
                      className={`ml-2 text-sm font-medium ${
                        course?.enableDrip ? "text-gray-400" : "text-gray-900"
                      }`}
                    >
                      No
                    </label>
                  </div>
                </div>
              </fieldset>

              {course?.enableDrip && (
                <p className="text-sm text-red-500">
                  Course Drip Must Be Turned Off to add Task Drip.
                </p>
              )}
            </div>

            <div className="ml-[40px] space-y-4 mb-8">
              <fieldset>
                <div className="flex items-center gap-4 mb-5">
                  <p className="h-2 w-2 bg-black rounded-full"></p>
                  <p className="font-bold text-lg me-[36px]">Enable Download</p>
                  <img src={required} alt="" />
                </div>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="radioDownloadYes"
                      name="radioDownloadOption"
                      checked={enableDownload === true}
                      onChange={() => setEnableDownload(true)}
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300"
                    />
                    <label
                      htmlFor="radioDownloadYes"
                      className={`ml-2 text-sm font-medium `}
                    >
                      Yes
                    </label>
                  </div>

                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="radioDownloadNo"
                      name="radioDownloadOption"
                      checked={enableDownload === false}
                      onChange={() => setEnableDownload(false)}
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300"
                    />
                    <label
                      htmlFor="radioDownloadNo"
                      className={`ml-2 text-sm font-medium `}
                    >
                      No
                    </label>
                  </div>
                </div>
              </fieldset>
            </div>

            <div className="px-4 my-10">
              {(orgData?.showPointsAndRedemptions ||
                orgData?.showSkillsManagement) && (
                <p className="text-[25px] font-bold mb-10">
                  Evaluation Parameter
                </p>
              )}
              {orgData?.showSkillsManagement && (
                <SkillBasedParameter
                  forEdit={true}
                  selectedData={skillParameterData}
                  setSelectedData={setSkillParameterData}
                  categories={skillCategories}
                />
              )}

              {orgData?.showPointsAndRedemptions && (
                <ItemEarningParameter
                  forEdit={true}
                  selectedData={earningParameterData}
                  setSelectedData={setEarningParameterData}
                  categories={earningCategories}
                />
              )}
            </div>
            <div className="flex items-center justify-center mt-20 mb-10">
              <input
                type="submit"
                value="Save"
                onClick={() => setSubmitPermission(true)}
                className="px-[30px] py-3 bg-[#3E4DAC] hover:bg-opacity-70 text-[#fff] cursor-pointer text-xl font-bold rounded-lg"
              />
              {/* <input
                type="submit"
                value="Save & Display"
                className="px-[30px] py-3 bg-[#FF557A] text-[#fff] text-xl font-bold rounded-lg ms-20"
              /> */}
            </div>
          </form>
        </div>
      </Layout>
    </div>
  );
};

export default EditFiles;
