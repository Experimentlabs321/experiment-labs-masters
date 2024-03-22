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
  const [batchesData, setBatchesData] = useState([]);
  const [selectedBatch, setSelectedBatch] = useState({});
  const [phone, setPhone] = useState("");
  const rootUrl = window.location.origin;
  const [loading, setLoading] = useState(false);
  const [itemDetails, setItemDetails] = useState();
  useEffect(() => {
    if (userInfo) {
      setLoading(true);
      axios
        .get(
          `${process.env.REACT_APP_SERVER_API}/api/v1/language/getMyLearnersSubDetailsByOrganizationAndName/addLearners/organizationsId/${userInfo?.organizationId}`
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
        `${process.env.REACT_APP_SERVER_API}/api/v1/courses/organizationId/${userInfo?.organizationId}`
      )
      .then((response) => {
        setCourses(response?.data);
      })
      .catch((error) => console.error(error));
  }, [userInfo]);

  useEffect(() => {
    if (selectedCourse?._id)
      axios
        .get(
          `${process.env.REACT_APP_SERVER_API}/api/v1/batches/courseId/${selectedCourse?._id}`
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
    const form = event?.target;
    console.log("Selected School:", schoolInfo?.schoolName);
    const userData = {
      name: form.name.value,
      email: form.email.value,
      phone: phone,
      organizationId: userInfo?.organizationId,
      organizationName: userInfo?.organizationName,
      role: "user",
      profileImg: studentProfileImg,
    };
    console.log(userData);
    console.log(form.studentStatus.value);
    if (form.studentStatus.value === "Paid") {
      const sendMail = await axios.post(
        `${process.env.REACT_APP_SERVER_API}/api/v1/sendMail`,
        {
          from: `${user?.email}`,
          // to: `${form.email.value},naman.j@experimentlabs.in`,
          to: `${form.email.value}`,
          subject: `Course purchase link`,
          message: `To purchase the ${selectedCourse?.courseFullName} course please goto the following link ${rootUrl}/payment/${selectedCourse?._id}?batch=${selectedBatch?._id}`,
        }
      );

      const newUser = await axios.post(
        `${process.env.REACT_APP_SERVER_API}/api/v1/users/addStudent`,
        {
          userData,
        }
      );

      if (newUser) {
        Swal.fire({
          title: "New User created successfully!",
          icon: "success",
        });
        // navigate("/schoolDashboard/myStudents");
      }
      form.reset();
    } else {
      const newUser = await axios.post(
        `${process.env.REACT_APP_SERVER_API}/api/v1/users/addOrUpdateUserWithCourse`,
        {
          user: userData,
          courseId: selectedCourse?._id,
          batchId: selectedBatch?._id,
        }
      );

      if (newUser) {
        Swal.fire({
          title: "New User created successfully!",
          icon: "success",
        });
        // navigate("/schoolDashboard/myStudents");
      }
      form.reset();
    }
  };

  console.log(selectedBatch);

  return (
    <div>
      {/* <Layout> */}
      <div className="p-4 mx-auto w-full">
        <div className="grid grid-flow-col mt-10 border-b border-[#D9D9D9] pb-2">
          <button>
            <img
              // onClick={handleBack}
              src={backIcon}
              alt=""
            />
          </button>
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
                {itemDetails?.bulkUpload ? itemDetails?.bulkUpload : "Bulk Upload"}
                
              </button>
            </div>
            <div className="mt-3">
              <h1 className=" text-[#737373] text-[24px] font-[500] mb-2 ">
              {itemDetails?.selectCourse ? itemDetails?.selectCourse : "Select Course"}
                
              </h1>
              <div className="flex flex-wrap">
                {!courses[0] && (
                  <div
                    className={`px-4 py-4 text-base border rounded-md font-semibold flex items-center justify-between gap-6 mr-1 text-[#949494]`}
                  >
                    {itemDetails?.noCourseAddedYet ? itemDetails?.noCourseAddedYet : "No course added yet"}
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
                    onClick={() => setSelectedCourse(item)}
                  >
                    {item?.courseFullName}
                  </button>
                ))}
              </div>
            </div>
            {selectedCourse?._id && (
              <div className="mt-3">
                <h1 className=" text-[#737373] text-[24px] font-[500] mb-2 ">
                {itemDetails?.selectBatch ? itemDetails?.selectBatch : "Select Batch"}
                  
                </h1>
                <div className="flex flex-wrap">
                  {!batchesData[0] && (
                    <div
                      className={`px-4 py-4 text-base border rounded-md font-semibold flex items-center justify-between gap-6 mr-1 text-[#949494]`}
                    >
                      {itemDetails?.noBatchAddedYet ? itemDetails?.noBatchAddedYet : "No batch added yet"}
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
                    {itemDetails?.studentName ? itemDetails?.studentName : "Student Name"}
                      
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
                    {itemDetails?.studentEmail ? itemDetails?.studentEmail : "Student Email"}
                      
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
                    {itemDetails?.studentPhoneNumber ? itemDetails?.studentPhoneNumber : "Student Phone Number"}
                      
                    </label>
                    <PhoneInput
                      style={{ backgroundColor: "#EEF0FF" }}
                      international="true"
                      className="bg-[#EEF0FF] px-[10px] py-1 rounded-md shadow"
                      defaultCountry="IN"
                      placeholder={itemDetails?.enterPhoneNumber ? itemDetails?.enterPhoneNumber : "Enter phone number"}
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
                    {itemDetails?.studentStatus ? itemDetails?.studentStatus : "Student Status"}
                      
                    </label>
                    <select
                      required
                      name="studentStatus"
                      id="studentStatus"
                      className="bg-[#EEF0FF] px-[10px] py-1 rounded-md shadow"
                    >
                      <option value={"Free"}>{itemDetails?.free ? itemDetails?.free : "Free"}</option>
                      <option value={"Paid"}>{itemDetails?.paid ? itemDetails?.paid : "Paid"}</option>
                    </select>
                  </div>
                </div>
                <div className="grid justify-center mt-10">
                  <button
                    type="submit"
                    className="flex gap-2 py-3 px-7 text-white bg-[#3E4DAC] items-center rounded-3xl"
                  >
                    {itemDetails?.addStudent ? itemDetails?.addStudent : "Add Student"}
                    
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
