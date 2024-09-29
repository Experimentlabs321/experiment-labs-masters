import React, { useContext, useEffect, useState } from "react";
import backIcon from "../../../assets/Dashboard/backIcon.svg";
import addStudentProfile from "../../../assets/Dashboard/addStudentProfile.png";
import Layout from "../Layout";
import BulkUpload from "./BulkUpload";
import axios from "axios";
import { AuthContext } from "../../../contexts/AuthProvider";
import Swal from "sweetalert2";
import uploadFileToS3 from "../../UploadComponent/s3Uploader";
import PhoneInput from "react-phone-number-input";
import Loading from "../../Shared/Loading/Loading";

const AddStudent = () => {
  const { user, userInfo } = useContext(AuthContext);
  const [fileLoading, setFileLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState();
  const [schoolInfo, setSchoolInfo] = useState({});
  const [studentProfileImg, setStudentProfileImg] = useState("");
  const [addBulkUpload, setAddBulkUpload] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState({});
  const [selectedBundle, setSelectedBundle] = useState({});
  const [batchesData, setBatchesData] = useState([]);
  const [selectedBatch, setSelectedBatch] = useState({});
  const [phone, setPhone] = useState("");
  const rootUrl = window.location.origin;
  const [loading, setLoading] = useState(false);
  const [itemDetails, setItemDetails] = useState();
  const [organizationData, setOrganizationData] = useState([]);
  const [studentStatus, setStudentStatus] = useState("Prepaid");
  const [mode, setMode] = useState("course");
  const [bundles, setBundles] = useState([]);
  useEffect(() => {
    if (userInfo) {
      setLoading(true);
      axios
        .get(
          `${process.env.REACT_APP_SERVERLESS_API}/api/v1/language/getMyLearnersSubDetailsByOrganizationAndName/addLearners/organizationsId/${userInfo?.organizationId}`
        )
        .then((response) => {
          // console.log(response);
          setItemDetails(response?.data);
        })
        .finally(() => {
          setLoading(false);
        });
    }
    setLoading(false);
  }, [userInfo]);

  useEffect(() => {
    if (userInfo?.organizationId)
      axios
        .get(
          `${process.env.REACT_APP_SERVERLESS_API}/api/v1/organizations/${userInfo?.organizationId}`
        )
        .then((response) => {
          setOrganizationData(response?.data);
        })
        .catch((error) => console.error(error));
  }, [userInfo]);
  //console.log(itemDetails)

  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_SERVERLESS_API}/api/v1/courses/organizationId/${userInfo?.organizationId}`
      )
      .then((response) => {
        setCourses(response?.data);
      })
      .catch((error) => console.error(error));

    axios
      .get(
        `${process.env.REACT_APP_SERVERLESS_API}/api/v1/bundles/organizationId/${userInfo.organizationId}`
      )
      .then((response) => {
        setBundles(response?.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [userInfo]);
  // console.log(bundles);

  useEffect(() => {
    if (selectedCourse?._id)
      axios
        .get(
          `${process.env.REACT_APP_SERVERLESS_API}/api/v1/batches/courseId/${selectedCourse?._id}`
        )
        .then((response) => {
          setBatchesData(response?.data);
        })
        .catch((error) => console.error(error));
  }, [selectedCourse]);

  const handleBack = () => {
    if (addBulkUpload) setAddBulkUpload(false);
    // else setShowAddStudent(false);
  };

  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    setFileLoading(false);

    const file = e.dataTransfer.files[0];
    try {
      setStudentProfileImg(await uploadFileToS3(file));
    } catch (error) {
      console.error("Error uploading file:", error);
    }
    setSelectedFile(file);
    setFileLoading(true);
  };

  const handleFileChange = async (e) => {
    setFileLoading(true);
    const file = e.target.files[0];
    try {
      setStudentProfileImg(await uploadFileToS3(file));
    } catch (error) {
      console.error("Error uploading file:", error);
    }
    setSelectedFile(file);
    setFileLoading(false);
  };

  const handleAddStudent = async (event) => {
    event.preventDefault();
    Loading();
    try {
      const form = event?.target;
      // console.log("Selected School:", schoolInfo?.schoolName);
      const userData = {
        name: form.name.value,
        email: form.email.value,
        phone: phone,
        organizationId: userInfo?.organizationId,
        organizationName: userInfo?.organizationName,
        role: "user",
        profileImg: studentProfileImg,
      };
      // console.log(userData);
      // console.log(form.studentStatus.value);
      if (form.studentStatus.value === "Paid") {
        if (mode === "course") {
          const newData = {
            from: organizationData?.emailIntegration?.email,
            to: userData?.email,
            templateType: "emailAction",
            organizationId: organizationData?._id,
            templateName: "learnerCreated",
            learner_name: userData?.name,
            course_name: selectedCourse?.courseFullName,
            site_url: `${rootUrl}/payment/${selectedCourse?._id}?batch=${selectedBatch?._id}`,
          };

          const updateOrg = await axios.post(
            `${process.env.REACT_APP_SERVERLESS_API}/api/v1/sendMail`,
            // `http://localhost:5000/api/v1/sendMail`,
            newData
          );
          if (updateOrg) {
            Swal.fire({
              title: "New user created successfully!",
              icon: "success",
            });
            // navigate("/schoolDashboard/myStudents");
          } else {
            Loading().close();
          }
        } else {
          const newData = {
            from: organizationData?.emailIntegration?.email,
            to: userData?.email,
            templateType: "emailAction",
            organizationId: organizationData?._id,
            templateName: "learnerCreated",
            learner_name: userData?.name,
            course_name: selectedBundle?.bundleFullName,
            site_url: `${rootUrl}/bundle/payment/${selectedBundle?._id}`,
          };

          const updateOrg = await axios.post(
            `${process.env.REACT_APP_SERVERLESS_API}/api/v1/sendMail`,
            // `http://localhost:5000/api/v1/sendMail`,
            newData
          );
          if (updateOrg) {
            Swal.fire({
              title: "New user created successfully!",
              icon: "success",
            });
            // navigate("/schoolDashboard/myStudents");
          } else {
            Loading().close();
          }
        }
        setStudentStatus("Prepaid");
        form.reset();
      } else {
        if (!selectedBatch?._id) {
          Swal.fire({
            title: "Pleas select a batch!",
            icon: "error",
          });
          return;
        }
        if (mode === "course") {
          const newUser = await axios.post(
            `${process.env.REACT_APP_SERVERLESS_API}/api/v1/users/addOrUpdateUserWithCourse`,
            // `http://localhost:5000/api/v1/users/addOrUpdateUserWithCourse`,
            {
              user: userData,
              courseId: selectedCourse?._id,
              batchId: selectedBatch?._id,
            }
          );

          // console.log(newUser);

          if (newUser) {
            const enrollData = {
              courses: [
                {
                  courseId: selectedCourse?._id,
                  batchId: selectedBatch?._id,
                },
              ], // Array of objects, each containing courseId and batchId
              coupon: "",
              couponId: "",
              discountAmount: "",
              email: userData?.email,
              organizationId: userInfo?.organizationId,
              organizationName: userInfo?.organizationName,
              originalPrice: +form.originalPrice.value,
              paidAmount: +form.paidAmount.value,
              userId: newUser?.data?.insertedUser
                ? newUser?.data?.insertedUser?.insertedId
                : newUser?.data?.existingUser?._id,
            };
            // console.log("EnrollData ============>", enrollData);
            const res = await axios.post(
              // `http://localhost:5000/api/v1/users/unpaidUsers/enroll`,
              `${process.env.REACT_APP_SERVERLESS_API}/api/v1/users/unpaidUsers/enroll`,
              enrollData
            );
            if (res.data.success) {
              const newData = {
                from: organizationData?.emailIntegration?.email,
                to: userData?.email,
                templateType: "emailAction",
                organizationId: organizationData?._id,
                templateName: "courseWelcome",
                learner_name: userData?.name,
                course_name: selectedCourse?.courseFullName,
                site_name: organizationData?.organizationName,
                site_email: organizationData?.email,
              };

              const updateOrg = await axios.post(
                `${process.env.REACT_APP_SERVERLESS_API}/api/v1/sendMail`,
                // `http://localhost:5000/api/v1/sendMail`,
                newData
              );
              Swal.fire({
                title: "New user created successfully!",
                icon: "success",
              });
            }
            // navigate("/schoolDashboard/myStudents");
          }
        } else {
          const newUser = await axios.post(
            `${process.env.REACT_APP_SERVERLESS_API}/api/v1/users/addOrUpdateUserWithBundle`,
            // `http://localhost:5000/api/v1/users/addOrUpdateUserWithBundle`,
            {
              user: userData,
              bundleId: selectedBundle?._id,
              courses: selectedBundle?.courses,
            }
          );

          // console.log(newUser);

          if (newUser) {
            const enrollData = {
              courses: selectedBundle?.courses, // Array of objects, each containing courseId and batchId
              bundleId: selectedBundle?._id,
              coupon: "",
              couponId: "",
              discountAmount: "",
              email: userData?.email,
              organizationId: userInfo?.organizationId,
              organizationName: userInfo?.organizationName,
              originalPrice: +form.originalPrice.value,
              paidAmount: +form.paidAmount.value,
              userId: newUser?.data?.insertedUser
                ? newUser?.data?.insertedUser?.insertedId
                : newUser?.data?.existingUser?._id,
            };
            // console.log("EnrollData ============>", enrollData);
            const res = await axios.post(
              // `http://localhost:5000/api/v1/users/unpaidUsers/enroll`,
              `${process.env.REACT_APP_SERVERLESS_API}/api/v1/users/unpaidUsers/enroll`,
              enrollData
            );
            if (res.data.success) {
              const newData = {
                to: userData?.email,
                templateType: "emailAction",
                templateName: "courseWelcome",
                organizationId: organizationData?._id,
                learner_name: userData?.name,
                course_name: selectedBundle?.bundleFullName,
                site_name: organizationData?.organizationName,
                site_email: organizationData?.email,
              };

              const updateOrg = await axios.post(
                `${process.env.REACT_APP_SERVERLESS_API}/api/v1/sendMail`,
                // `http://localhost:5000/api/v1/sendMail`,
                newData
              );
              Swal.fire({
                title: "New user created successfully!",
                icon: "success",
              });
            }
            // navigate("/schoolDashboard/myStudents");
          }
        }
        form.reset();
      }
    } catch (error) {
      Loading().close();
    }
  };

  // console.log(selectedCourse);

  return (
    <div>
      {/* <Layout> */}
      <div className="p-4 mx-auto w-full">
        <div className="grid grid-flow-col mt-10 border-b border-[#D9D9D9] pb-2">
          {/*    <button>
            <img
               onClick={handleBack}
              src={backIcon}
              alt=""
            />
          </button> */}
          <p className=" text-left text-[20px] text-[#3F3F3F] font-medium tracking-wider">
            {itemDetails?.addStudent ? itemDetails?.addStudent : "Add Student"}
          </p>
        </div>
        {addBulkUpload && (
          <div className="w-full overflow-hidden">
            <BulkUpload
              itemDetails={itemDetails}
              //  schoolInfo={schoolInfo}
            />
          </div>
        )}
        {!addBulkUpload && (
          <>
            <div className="mt-5">
              <button
                onClick={() => setAddBulkUpload(true)}
                className="flex gap-2 py-1 px-7 text-white bg-[#3E4DAC] items-center rounded-3xl"
              >
                {itemDetails?.bulkUpload
                  ? itemDetails?.bulkUpload
                  : "Bulk Upload"}
              </button>
            </div>
            <div className="mt-3">
              <div className="mb-4">
                <button
                  onClick={() => {
                    setMode("course");
                    setSelectedCourse({});
                    setSelectedBatch({});
                    setSelectedBundle({});
                  }}
                  className={`px-5 border-sky-500 w-[50%] text-[24px] font-[500]  ${
                    mode === "course"
                      ? "pt-2 pb-1 border-t-2 border-r-2 rounded-tr-md text-sky-500 font-semibold"
                      : "pb-2 pt-1 border-b-2 border-r-2 rounded-br-md text-[#737373]"
                  }`}
                >
                  Select Course
                </button>
                <button
                  onClick={() => {
                    setMode("bundle");
                    setSelectedCourse({});
                    setSelectedBatch({});
                    setSelectedBundle({});
                  }}
                  className={`px-5 border-sky-500 w-[50%] ml-[-2px] text-[24px] font-[500]  ${
                    mode === "bundle"
                      ? "pb-1 pt-2 border-t-2 border-l-2 rounded-tl-md text-sky-500 font-semibold"
                      : "pt-1 pb-2 border-b-2 border-l-2 rounded-bl-md text-[#737373]"
                  }`}
                >
                  Select Bundle
                </button>
              </div>
              {/* <h1 className=" text-[#737373] text-[24px] font-[500] mb-2 ">
                {itemDetails?.selectCourse
                  ? itemDetails?.selectCourse
                  : "Select Course"}
              </h1> */}
            </div>
            {mode === "bundle" && (
              <>
                <div className="flex flex-wrap">
                  {!bundles[0] && (
                    <div
                      className={`px-4 py-4 text-base border rounded-md font-semibold flex items-center justify-between gap-6 mr-1 text-[#949494]`}
                    >
                      {itemDetails?.noCourseAddedYet
                        ? itemDetails?.noCourseAddedYet
                        : "No bundle added yet"}
                      !
                    </div>
                  )}
                  {bundles?.map((item, index) => (
                    <button
                      key={index}
                      className={`px-3 py-3 text-base border rounded-md font-semibold flex items-center justify-between gap-6 m-1 ${
                        selectedBundle?._id === item?._id
                          ? "text-[#0A98EA] border-t-2 border-t-[#0A98EA]"
                          : "text-[#949494]"
                      }`}
                      // onClick={() => handleSelectCourse(item)}
                      onClick={() => {
                        setSelectedBundle(item);
                        setSelectedBatch({});
                      }}
                    >
                      {item?.bundleFullName}
                    </button>
                  ))}
                </div>
              </>
            )}
            {mode === "course" && (
              <>
                <div className="flex flex-wrap">
                  {!courses[0] && (
                    <div
                      className={`px-4 py-4 text-base border rounded-md font-semibold flex items-center justify-between gap-6 mr-1 text-[#949494]`}
                    >
                      {itemDetails?.noCourseAddedYet
                        ? itemDetails?.noCourseAddedYet
                        : "No course added yet"}
                      !
                    </div>
                  )}
                  {courses?.map((item, index) => (
                    <button
                      key={index}
                      className={`px-3 py-3 text-base border rounded-md font-semibold flex items-center justify-between gap-6 m-1 ${
                        selectedCourse?._id === item?._id
                          ? "text-[#0A98EA] border-t-2 border-t-[#0A98EA]"
                          : "text-[#949494]"
                      }`}
                      // onClick={() => handleSelectCourse(item)}
                      onClick={() => {
                        setSelectedCourse(item);
                        setSelectedBatch({});
                      }}
                    >
                      {item?.courseFullName}
                    </button>
                  ))}
                </div>
                {selectedCourse?._id && (
                  <div className="mt-3">
                    <h1 className=" text-[#737373] text-[24px] font-[500] mb-2 ">
                      {itemDetails?.selectBatch
                        ? itemDetails?.selectBatch
                        : "Select Batch"}
                    </h1>
                    <div className="flex flex-wrap">
                      {!batchesData[0] && (
                        <div
                          className={`px-4 py-4 text-base border rounded-md font-semibold flex items-center justify-between gap-6 mr-1 text-[#949494]`}
                        >
                          {itemDetails?.noBatchAddedYet
                            ? itemDetails?.noBatchAddedYet
                            : "No batch added yet"}
                          !
                        </div>
                      )}
                      {batchesData?.map((item, index) => (
                        <button
                          key={index}
                          className={`px-3 py-3 text-base border rounded-md font-semibold flex items-center justify-between gap-6 m-1 ${
                            selectedBatch?._id === item?._id
                              ? "text-[#0A98EA] border-t-2 border-t-[#0A98EA]"
                              : "text-[#949494]"
                          }`}
                          // onClick={() => handleSelectCourse(item)}
                          onClick={() => setSelectedBatch(item)}
                        >
                          {item?.batchName}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </>
            )}
            <div className="my-4">
              <form onSubmit={handleAddStudent} autoComplete="on">
                <label>
                  <div
                    className="grid justify-center w-fit mx-auto "
                    onDragOver={handleDragOver}
                    onDragEnter={handleDragEnter}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                  >
                    {fileLoading && (
                      <div className=" min-w-[242px] min-h-[114px]">
                        <img
                          src={addStudentProfile}
                          className="mx-auto mt-2 animate-ping"
                          alt="addImg"
                        />
                      </div>
                    )}
                    {!fileLoading && (
                      <div className=" min-w-[242px] min-h-[114px]">
                        <img
                          src={addStudentProfile}
                          className="mx-auto mt-2"
                          alt="inputImg"
                        />
                        {selectedFile && (
                          <p className="text-[18px] font-[700] m-[5px] ">
                            {itemDetails?.file ? itemDetails?.file : "File"}:{" "}
                            <span className="font-[500]">
                              {selectedFile?.name}
                            </span>
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                  <input
                    className="hidden"
                    type="file"
                    name="file"
                    placeholder="upload"
                    onChange={handleFileChange}
                  />
                </label>
                {studentProfileImg && (
                  <img
                    src={studentProfileImg}
                    className="mx-auto my-4"
                    alt="studentProfileImg"
                  />
                )}

                <div className="flex justify-between my-4">
                  <div className="flex flex-col gap-2  w-[40%]">
                    <label htmlFor="name" className="text-[17px] font-medium">
                      {itemDetails?.studentName
                        ? itemDetails?.studentName
                        : "Student Name"}
                    </label>
                    <input
                      required
                      placeholder="write student name"
                      type="text"
                      name="name"
                      id="name"
                      className="bg-[#EEF0FF] px-[10px] py-1 rounded-md shadow"
                    />
                  </div>
                  <div className="flex flex-col gap-2  w-[40%]">
                    <label htmlFor="email" className="text-[17px] font-medium">
                      {itemDetails?.studentEmail
                        ? itemDetails?.studentEmail
                        : "Student Email"}
                    </label>
                    <input
                      required
                      placeholder="write student email"
                      type="email"
                      name="email"
                      id="email"
                      className="bg-[#EEF0FF] px-[10px] py-1 rounded-md shadow"
                    />
                  </div>
                </div>
                <div className="flex justify-between my-4">
                  <div className="flex flex-col gap-2  w-[40%]">
                    <label htmlFor="phone" className="text-[17px] font-medium">
                      {itemDetails?.studentPhoneNumber
                        ? itemDetails?.studentPhoneNumber
                        : "Student Phone Number"}
                    </label>
                    <PhoneInput
                      style={{ backgroundColor: "#EEF0FF" }}
                      international="true"
                      className="bg-[#EEF0FF] px-[10px] py-1 rounded-md shadow"
                      defaultCountry="IN"
                      placeholder={
                        itemDetails?.enterPhoneNumber
                          ? itemDetails?.enterPhoneNumber
                          : "Enter phone number"
                      }
                      value={phone}
                      onChange={setPhone}
                    />
                    {/* <input
                      required
                      placeholder="write student phone no."
                      type="number"
                      name="phone"
                      id="phone"
                      className="bg-[#EEF0FF] px-[10px] py-1 rounded-md shadow"
                    /> */}
                  </div>
                  <div className="flex flex-col gap-2  w-[40%]">
                    <label htmlFor="email" className="text-[17px] font-medium">
                      {itemDetails?.studentStatus
                        ? itemDetails?.studentStatus
                        : "Student Status"}
                    </label>
                    <select
                      required
                      onChange={(e) => setStudentStatus(e.target.value)}
                      name="studentStatus"
                      id="studentStatus"
                      className="bg-[#EEF0FF] px-[10px] py-1 rounded-md shadow"
                    >
                      <option value={"Prepaid"}>
                        {/* {itemDetails?.free ? itemDetails?.free : "Free"} */}
                        Prepaid
                      </option>
                      <option value={"Paid"}>
                        {/* {itemDetails?.paid ? itemDetails?.paid : "Paid"} */}
                        Paid
                      </option>
                    </select>
                  </div>
                </div>
                {studentStatus === "Prepaid" && (
                  <div className="flex justify-between my-4">
                    <div className="flex flex-col gap-2  w-[40%]">
                      <label htmlFor="name" className="text-[17px] font-medium">
                        Paid Amount
                      </label>
                      <input
                        required
                        placeholder="Paid Amount"
                        type="number"
                        name="paidAmount"
                        id="paidAmount"
                        className="bg-[#EEF0FF] px-[10px] py-1 rounded-md shadow"
                      />
                    </div>
                    <div className="flex flex-col gap-2  w-[40%]">
                      <label htmlFor="name" className="text-[17px] font-medium">
                        Original Price
                      </label>
                      <input
                        required
                        placeholder="Original Price"
                        type="number"
                        name="originalPrice"
                        id="originalPrice"
                        value={
                          mode === "course"
                            ? selectedBatch?.price
                              ? selectedBatch?.price
                              : 0
                            : selectedBundle?.price
                            ? selectedBundle?.price
                            : 0
                        }
                        className="bg-[#EEF0FF] px-[10px] py-1 rounded-md shadow"
                      />
                    </div>
                  </div>
                )}
                <div className="grid justify-center mt-10">
                  <button
                    type="submit"
                    className="flex gap-2 py-3 px-7 text-white bg-[#3E4DAC] items-center rounded-3xl"
                  >
                    {itemDetails?.addStudent
                      ? itemDetails?.addStudent
                      : "Add Student"}
                  </button>
                </div>
              </form>
            </div>
          </>
        )}
      </div>
      {/* </Layout> */}
    </div>
  );
};

export default AddStudent;
