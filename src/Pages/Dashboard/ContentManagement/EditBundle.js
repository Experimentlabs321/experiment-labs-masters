import React, { useContext, useEffect, useState } from "react";
import Layout from "../Layout";
import required from "../../../assets/ContentManagement/required.png";
import { AuthContext } from "../../../contexts/AuthProvider";
import axios from "axios";
import uploadFileToS3 from "../../UploadComponent/s3Uploader";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import backIcon from "../../../assets/Dashboard/backIcon.svg";

const EditBundle = () => {
  const { id } = useParams();
  const [selectedCourses, setSelectedCourses] = useState([]);
  const [selectedBatches, setSelectedBatches] = useState([]);
  const [availableCourses, setAvailableCourses] = useState([]);
  const [courseInput, setCourseInput] = useState("");
  const [courseDropdown, setCourseDropdown] = useState(false);
  const [errors, setErrors] = useState({});
  const [selectedFile, setSelectedFile] = useState(null);
  const [submitPermission, setSubmitPermission] = useState(false);
  const [selectedCoursesAndBatches, setSelectedCoursesAndBatches] = useState(
    []
  );
  const [bundleData, setBundleData] = useState({});
  const [bundleVisibility, setBundleVisibility] = useState();
  const [count, setCount] = useState(0);

  const { user, userInfo } = useContext(AuthContext);
  const rootUrl = window.location.origin;
  const router = useNavigate();

  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_SERVERLESS_API}/api/v1/bundles/bundleId/${id}`
      )
      .then((response) => {
        setBundleData(response?.data);
        setSelectedCoursesAndBatches(response?.data?.courses);
        if (
          response?.data?.bundleVisibility === "true" ||
          response?.data?.bundleVisibility === true
        )
          setBundleVisibility(true);
        else setBundleVisibility(false);
      })
      .catch((error) => console.error(error));
  }, [id]);

  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_SERVERLESS_API}/api/v1/courses/organizationId/${userInfo?.organizationId}`
      )
      .then((response) => {
        const previousSelectedCourse = response?.data?.filter((item) =>
          bundleData?.courses?.find(
            (bundleItem) => bundleItem?.courseId === item?._id
          )
        );
        previousSelectedCourse?.forEach(async (element, index) => {
          const { data } = await axios.get(
            `${process.env.REACT_APP_SERVERLESS_API}/api/v1/batches/courseId/${element._id}`
          );
          // console.log("element: ", data);
          previousSelectedCourse[index].batches = data;
          setSelectedCourses([...previousSelectedCourse]);
        });
        const previousSelectedBatch = [];
        bundleData?.courses?.forEach((element) => {
          previousSelectedBatch.push(element?.batchId);
        });
        setSelectedBatches(previousSelectedBatch);
        setAvailableCourses(response?.data);
      })
      .catch((error) => console.error(error));
  }, [userInfo, bundleData]);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  const handleCourseInputChange = (event) => {
    if (event.target.value.length > 0) setCourseDropdown(true);
    setCourseInput(event.target.value);
  };

  const handleCourseSelect = async (selectedCourse) => {
    setCourseInput("");
    setCourseDropdown(false);

    const { data } = await axios.get(
      `${process.env.REACT_APP_SERVERLESS_API}/api/v1/batches/courseId/${selectedCourse._id}`
    );
    selectedCourse.batches = data;
    // console.log("Selected Course", selectedCourse);

    if (!selectedCourses?.includes(selectedCourse)) {
      setSelectedCourses([...selectedCourses, selectedCourse]);
    }
  };

  const removeSelectedCourse = (removedCourse) => {
    const newSelectedCourses = selectedCourses.filter(
      (course) => course !== removedCourse
    );
    setSelectedCourses(newSelectedCourses);
  };

  const handleBatches = (course, batch) => {
    // console.log(course, batch);
    if (
      !selectedCoursesAndBatches?.find((item) => item?.courseId === course?._id)
    ) {
      if (!selectedBatches?.includes(batch._id)) {
        setSelectedBatches([...selectedBatches, batch._id]);
        setSelectedCoursesAndBatches([
          ...selectedCoursesAndBatches,
          { courseId: course?._id, batchId: batch?._id },
        ]);
      } else {
        // console.log(selectedBatches, batch._id);
        const newSelectedBatches = selectedBatches.filter(
          (removeBatch) => removeBatch !== batch._id
        );
        const newSelectedCoursesAndBatches = selectedCoursesAndBatches.filter(
          (removeBatch) => removeBatch?.courseId !== course._id
        );
        setSelectedBatches(newSelectedBatches);
        setSelectedCoursesAndBatches(newSelectedCoursesAndBatches);
      }
    } else {
      const findPreviousBatchId = selectedCoursesAndBatches.find(
        (removeBatch) => removeBatch?.courseId === course._id
      )?.batchId;
      // console.log(findPreviousBatchId);
      const newSelectedBatches = selectedBatches.filter(
        (removeBatch) => removeBatch !== findPreviousBatchId
      );
      const newSelectedCoursesAndBatches = selectedCoursesAndBatches.filter(
        (removeBatch) => removeBatch?.courseId !== course._id
      );
      setSelectedBatches([...newSelectedBatches, batch?._id]);
      setSelectedCoursesAndBatches([
        ...newSelectedCoursesAndBatches,
        { courseId: course?._id, batchId: batch?._id },
      ]);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.target;

    const bundleFullName = form.bundleFullName.value;
    const bundleShortName = form.bundleShortName.value;
    const bundleStartingDate = form.bundleStartingDate.value;
    const bundleEndingDate = form.bundleEndingDate.value;
    const bundleDescription = form.bundleDescription.value;
    // const bundlePurchaseUrl = form.bundlePurchaseUrl.value;
    const bundleVisibility = form.bundleVisibility.value;
    const bundleIDNumber = form.bundleIDNumber.value;
    const price = form.price.value;

    let fileUrl = "";
    if (selectedFile) {
      fileUrl = await uploadFileToS3(selectedFile);
    }

    const addBundle = {
      bundleFullName,
      bundleShortName,
      bundleStartingDate,
      bundleEndingDate,
      bundleDescription,
      bundlePurchaseUrl: bundleData?.bundlePurchaseUrl,
      bundleVisibility,
      bundleIDNumber,
      price,
      bundleThumbnail: fileUrl,
      creator: {
        email: user?.email,
      },
      organizationId: userInfo?.organizationId,
      organization: {
        organizationId: userInfo?.organizationId,
        organizationName: userInfo?.organizationName,
      },
      courses: selectedCoursesAndBatches,
    };
    if (submitPermission) {
      const updateBundle = await axios.put(
        `${process.env.REACT_APP_SERVERLESS_API}/api/v1/bundles/updateBundle/bundleId/${id}`,
        addBundle
      );

      // console.log(updateBundle);

      if (updateBundle?.data?.acknowledged) {
        toast.success("Bundle Updated Successfully");
        // router("/courseAccess");
        form.reset();
      }

      // console.log("Add Course----->", addBundle);
    }
  };

  // console.log(selectedCourses);

  return (
    <div>
      <Layout>
        <div className="text-[#3E4DAC] flex items-center gap-4 text-[26px] font-bold border-b border-b-[#A4A4A4] py-[35px] ps-[40px]">
          <button>
            <img
              onClick={() => router("/courseAccess")}
              src={backIcon}
              alt=""
            />
          </button>{" "}
          <p>Create/Edit Bundle</p>
        </div>
        <form onSubmit={handleSubmit} className="">
          <div className="px-4">
            <div className="mb-[40px] mt-[40px]">
              <div className="relative">
                <div className="flex items-center gap-4">
                  <p className="h-2 w-2 bg-black rounded-full"></p>
                  <p className="font-bold text-lg me-[36px]"> Select Courses</p>
                  <img src={required} alt="" />
                </div>
                <div className="ps-6">
                  <input
                    // onKeyPress={handleKeyPress}
                    onChange={handleCourseInputChange}
                    // onFocus={() => setCourseDropdown(true)}
                    onBlur={() => setCourseDropdown(false)}
                    value={courseInput}
                    autoComplete="off"
                    name="Courses"
                    placeholder="Start typing to select courses"
                    className="block px-4 py-2 w-full mt-2 rounded-md border bg-white border-[#B7B7B7] focus:border-blue-500 focus:outline-none focus:ring"
                  />
                </div>
                {errors.courseAdded && (
                  <p className="text-red-500 text-sm">{errors.courseAdded}</p>
                )}
                {courseDropdown && (
                  <div className="absolute z-10 bg-white border border-gray-300 mt-1 w-full rounded-md shadow-lg max-h-[200px] overflow-y-auto">
                    {availableCourses
                      ?.filter((course) =>
                        course.courseFullName
                          ?.toLowerCase()
                          ?.includes(courseInput?.toLowerCase())
                      )
                      ?.map((course, index) => (
                        <div
                          key={index}
                          className={`px-4 py-2 cursor-pointer hover:bg-gray-100`}
                          onMouseDown={() => handleCourseSelect(course)}
                        >
                          {course?.courseFullName}
                        </div>
                      ))}
                  </div>
                )}

                {selectedCourses[0] && (
                  <div className="tag-container my-2 flex flex-wrap rounded-lg border-2 p-2">
                    {selectedCourses?.map((course, index) => {
                      return (
                        <div
                          key={index}
                          className="m-1 h-fit rounded-lg border-2 py-1 px-2"
                        >
                          {course?.courseFullName}{" "}
                          <span
                            className="cursor-pointer pl-1 text-xl font-bold"
                            onClick={() => removeSelectedCourse(course)}
                          >
                            ×
                          </span>
                        </div>
                      );
                    })}
                  </div>
                )}

                {selectedCourses[0] && (
                  <div className="tag-container my-2 flex flex-col rounded-lg border-2 p-2">
                    {selectedCourses?.map((course, index) => {
                      return (
                        <div key={index} className="">
                          <h1 className="font-semibold">
                            {course?.courseFullName}{" "}
                          </h1>
                          <div className="flex gap-2 mt-2 flex-wrap mb-2">
                            {course?.batches?.map((batch, batchIndex) => {
                              return (
                                <div
                                  onClick={() => handleBatches(course, batch)}
                                  className={`px-2 py-1 border-2 rounded-full cursor-pointer ${
                                    selectedBatches?.includes(batch._id) &&
                                    "bg-[#39249957]"
                                  }`}
                                  key={batchIndex}
                                >
                                  {batch.batchName}
                                </div>
                              );
                            })}
                          </div>
                          {errors.batchAdded && (
                            <p className="text-red-500 text-sm">
                              {errors.batchAdded}
                            </p>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
            <div className="dropdown-menu mb-[45px] flex justify-between me-10">
              <div>
                <div className="">
                  <div className="flex items-center gap-4">
                    <p className="h-2 w-2 bg-black rounded-full"></p>
                    <p className="font-bold text-lg me-[36px]">
                      {" "}
                      Bundle or Package Full Name
                    </p>
                    <img src={required} alt="" />
                  </div>

                  <input
                    required
                    className="mt-6 ms-6 border rounded-md w-[90%] h-[50px] ps-2 text-[#535353] focus:outline-0 bg-[#F6F7FF] "
                    name="bundleFullName"
                    defaultValue={bundleData?.bundleFullName}
                    type="text"
                    placeholder="Eg. Entrepreneurship Lab"
                  />
                </div>

                <div className="mt-20">
                  <div className="flex items-center gap-4">
                    <p className="h-2 w-2 bg-black rounded-full"></p>
                    <p className="font-bold text-lg me-[36px]">
                      {" "}
                      Bundle or Package Short Name
                    </p>
                    <img src={required} alt="" />
                  </div>

                  <input
                    required
                    className="mt-6 ms-6 border rounded-md w-[90%] h-[50px] ps-2 text-[#535353] focus:outline-0 bg-[#F6F7FF] "
                    name="bundleShortName"
                    defaultValue={bundleData?.bundleShortName}
                    type="text"
                    placeholder="Eg. Entrepreneurship Lab"
                  />
                </div>
                <div className="mt-20 flex flex-col">
                  <div className="flex items-center gap-4">
                    <p className="h-2 w-2 bg-black rounded-full"></p>
                    <p className="font-bold text-lg me-[36px]">
                      {" "}
                      Bundle or Package Starting Date and Time{" "}
                    </p>
                    <img src={required} alt="" />
                  </div>

                  <input
                    required
                    className="mt-6 ms-6 border rounded-md w-[307px] h-[50px] ps-2 text-[#535353] focus:outline-0 bg-[#F6F7FF] "
                    name="bundleStartingDate"
                    defaultValue={bundleData?.bundleStartingDate}
                    type="datetime-local"
                    placeholder="Eg. Entrepreneurship Lab"
                  />
                  {/* <input required className='mt-4 ms-6 border rounded-md w-[307px] h-[50px] ps-2 text-[#535353] focus:outline-0 bg-[#F6F7FF] ' name='courseStartingTime' type="time" placeholder='Eg. Entrepreneurship Lab' /> */}
                </div>
                <div className="mt-20 flex flex-col">
                  <div className="flex items-center gap-4">
                    <p className="h-2 w-2 bg-black rounded-full"></p>
                    <p className="font-bold text-lg me-[36px]">
                      {" "}
                      Bundle or Package Ending Date and Time{" "}
                    </p>
                  </div>

                  <input
                    className="mt-6 ms-6 border rounded-md w-[307px] h-[50px] ps-2 text-[#535353] focus:outline-0 bg-[#F6F7FF] "
                    name="bundleEndingDate"
                    defaultValue={bundleData?.bundleEndingDate}
                    type="datetime-local"
                    placeholder="Eg. Entrepreneurship Lab"
                  />
                  {/* <input className='mt-4 ms-6 border rounded-md w-[307px] h-[50px] ps-2 text-[#535353] focus:outline-0 bg-[#F6F7FF] ' name='courseEndingTime' type="time" placeholder='Eg. Entrepreneurship Lab' /> */}
                </div>
                <div className="mt-20">
                  <div className="flex items-center gap-4">
                    <p className="h-2 w-2 bg-black rounded-full"></p>
                    <p className="font-bold text-lg me-[36px]">
                      Bundle or Package Description
                    </p>
                  </div>

                  <input
                    className="mt-6 ms-6 border rounded-md w-[90%] h-[97px] ps-2 text-[#535353] focus:outline-0 bg-[#F6F7FF] "
                    name="bundleDescription"
                    defaultValue={bundleData?.bundleDescription}
                    type="text"
                    placeholder="Eg. This Lab will teach you about...."
                  />
                </div>

                <div className="mt-20">
                  <div className="flex items-center gap-4">
                    <p className="h-2 w-2 bg-black rounded-full"></p>
                    <p className="font-bold text-lg me-[36px]">
                      Bundle or Package purchase url
                    </p>
                  </div>
                  <div className="flex">
                    <button
                      onMouseDown={async (e) => {
                        e.preventDefault();
                        try {
                          await navigator.clipboard.writeText(
                            `${rootUrl}/bundle/payment/${id}`
                          );
                          toast.success("Url Copied!");
                        } catch (err) {
                          console.error("Unable to copy to clipboard", err);
                        }
                      }}
                      className="mt-6 ms-6 border rounded-l-md w-fit h-[50px] p-2 text-[#535353] focus:outline-0 bg-[#F6F7FF] "
                    >{`${rootUrl}/bundle/payment/${id}`}</button>
                    <button
                      className="mt-6 border rounded-r-md w-fit h-[50px] p-2 text-[#535353] focus:outline-0 bg-[#F6F7FF] "
                      onClick={async (e) => {
                        e.preventDefault();
                        try {
                          await navigator.clipboard.writeText(
                            `${rootUrl}/bundle/payment/${id}`
                          );
                          toast.success("Url Copied!");
                        } catch (err) {
                          console.error("Unable to copy to clipboard", err);
                        }
                      }}
                    >
                      <FileCopyIcon />
                    </button>
                  </div>
                  {/* <input
                    className="mt-6 ms-6 border rounded-md w-[90%] h-[50px] ps-2 text-[#535353] focus:outline-0 bg-[#F6F7FF] "
                    name="bundlePurchaseUrl"
                    type="url"
                    placeholder="https://www.google.com/"
                  /> */}
                </div>
              </div>

              <div>
                {/* <div className="">
                  <div className="flex items-center gap-4">
                    <p className="h-2 w-2 bg-black rounded-full"></p>
                    <p className="font-bold text-lg me-[36px]">
                      Course Category
                    </p>
                    <img src={required} alt="" />
                  </div>

                  <div className=" flex gap-2  mt-6 ms-6 border rounded-md w-[381px] h-[50px] ps-2 text-[#535353] focus:outline-0 bg-[#F6F7FF]  ">
                    <select
                      required
                      className="w-full bg-[#F6F7FF] text-[#3E4DAC] text-base font-semibold focus:outline-0"
                      name="courseCategory"
                      // id="option"
                    >
                      <option className="" value="Web Development">
                        Web Development
                      </option>
                      // <option value="Parent"></option>
                      // <option value="Counselor"></option>
                      // <option value="Others"></option>
                    </select>
                    <div
                      onClick={openModaladdcoursecategory}
                      className="w-[96px] bg-[#FFDB70] text-[] text-base font-semibold flex gap-2 justify-center items-center"
                    >
                      <p className="text-2xl">+</p>
                      <div>
                        <p className="w-full">Add</p>
                      </div>
                    </div>
                  </div>
                  <div>
                    {isOpenaddcoursecategory && (
                    <div className="modal-overla w-[438px] h-[325px] rounded-md mt-3 bg-[#fff] border">
                      <div className="modal-content">
                        <div className="border-b flex justify-between items-center pt-6 px-10 pb-5 text-[#3E4DAC] text-xl font-bold">
                          <p>Add Course Category</p>
                          <p
                            onClick={closeModaladdcoursecategory}
                            className=" flex justify-center items-center rounded-full w-6 h-6 bg-[#A1A1A1] font-bold text-[#000000]"
                          >
                            x
                          </p>
                        </div>
                        <div className="mt-6 mx-10">
                          <div className="flex items-center gap-4">
                            <p className="font-bold text-lg me-[36px]">
                              {" "}
                              Course Category Name
                            </p>
                          </div>

                          <input
                            className="mt-6 border rounded-md w-[358px] h-[50px] ps-2 text-[#535353] focus:outline-0 bg-[#F6F7FF] "
                            name="courseCategory"
                            type="text"
                            placeholder="Eg. Entrepreneurship Lab"
                          ></input>
                        </div>
                      </div>
                    </div>
                    )}
                  </div>
                </div> */}

                <div>
                  <div className="flex items-center gap-4">
                    <p className="h-2 w-2 bg-black rounded-full"></p>

                    <p className="font-bold text-lg me-[36px]">
                      Bundle or Package Thumbnail
                    </p>
                  </div>

                  <div
                    onChange={handleFileChange}
                    className=" flex gap-2  mt-6 ms-6 border rounded-md w-[319px] h-[50px] ps-2 text-[#535353] focus:outline-0 bg-[#F6F7FF]  "
                  >
                    <div className=" flex items-center">
                      <input
                        className="w-full h-full flex items-center text-[#3E4DAC] text-base font-semibold mt-4"
                        type="file"
                      />
                      <p className="w-[105px] h-full bg-[#FFDB70] text-[] text-base font-semibold flex gap-2 justify-center items-center">
                        Browse
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-20">
                  <div className="flex items-center gap-4">
                    <p className="h-2 w-2 bg-black rounded-full"></p>
                    <p className="font-bold text-lg me-[36px]">
                      Bundle or Package Visibility
                    </p>
                  </div>
                  <div className=" items-center flex gap-2  mt-2 ms-6  w-[319px] h-[50px] ps-2 text-[#535353] focus:outline-0 ">
                    <div className="">
                      <input
                        type="radio"
                        id="Yes"
                        name="bundleVisibility"
                        value={true}
                        checked={bundleVisibility === true}
                        onChange={() => setBundleVisibility(true)}
                      />
                      <lebel> Show</lebel>
                    </div>
                    <div className=" ms-[55px]">
                      <input
                        type="radio"
                        id="No"
                        name="bundleVisibility"
                        value={false}
                        checked={bundleVisibility === false}
                        onChange={() => setBundleVisibility(false)}
                      />
                      <lebel> Hide</lebel>
                    </div>
                  </div>

                  <div className="mt-20">
                    <div className="flex items-center gap-4">
                      <p className="h-2 w-2 bg-black rounded-full"></p>
                      <p className="font-bold text-lg me-[36px]">
                        Bundle or Package ID Number
                      </p>
                    </div>

                    <input
                      className="mt-6 ms-6 border rounded-md w-[272px] h-[50px] ps-2 text-[#535353] focus:outline-0 bg-[#F6F7FF] "
                      name="bundleIDNumber"
                      defaultValue={bundleData?.bundleIDNumber}
                      type="text"
                      placeholder="Eg. 02283847"
                    ></input>
                  </div>

                  <div className="mt-20">
                    <div className="flex items-center gap-4">
                      <p className="h-2 w-2 bg-black rounded-full"></p>
                      <p className="font-bold text-lg me-[36px]">Price</p>
                    </div>

                    <input
                      className="mt-6 ms-6 font-sans border rounded-md w-[272px] h-[50px] ps-2 text-[#535353] focus:outline-0 bg-[#F6F7FF] "
                      name="price"
                      defaultValue={bundleData?.price}
                      type="number"
                      placeholder="Eg. 5000"
                    ></input>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center mt-20 mb-10">
            <input
              type="submit"
              value="Save"
              onClick={() => setSubmitPermission(true)}
              className="px-[30px] cursor-pointer py-3 bg-[#3E4DAC] text-[#fff] text-xl font-bold rounded-lg"
            />
            {/* <input
              type="submit"
              value="Save & Display"
              className="px-[30px] py-3 bg-[#FF557A] text-[#fff] text-xl font-bold rounded-lg ms-20"
            /> */}
          </div>
        </form>
      </Layout>
    </div>
  );
};

export default EditBundle;
