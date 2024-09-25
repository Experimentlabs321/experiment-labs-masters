import React, { useContext, useEffect, useState } from "react";
import addStudentProfile from "../../../assets/Dashboard/addStudentProfile.png";
import Layout from "../Layout";
import OffersTop from "./OffersComponent/OffersTop";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import CancelIcon from "@mui/icons-material/Cancel";
import { red } from "@mui/material/colors";
import Swal from "sweetalert2";
import { AuthContext } from "../../../contexts/AuthProvider";
import uploadFileToS3 from "../../UploadComponent/s3Uploader";
import EmailIcon from "@mui/icons-material/Email";
import PhoneAndroidIcon from "@mui/icons-material/PhoneAndroid";
import PhoneInput from "react-phone-number-input";
import { toast } from "react-hot-toast";
const UserProfile = () => {
  const { email } = useParams();
  const [profileInfo, setProfileInfo] = useState({});
  const [courseData, setCourseData] = useState([]);
  const [tableWidth, setTableWidth] = useState("100%");
  const { userInfo, setUserInfo, forgotPassword } = useContext(AuthContext);
  const [fileLoading, setFileLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState();
  const [schoolInfo, setSchoolInfo] = useState({});
  const [profileImg, setprofileImg] = useState(userInfo?.profileImg);
  const [addBulkUpload, setAddBulkUpload] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [page, setPage] = useState(0);
  const [phone, setPhone] = useState("");
  const [formChanges, setFormChanges] = useState(false);
  const navigate = useNavigate();

  // console.log(userInfo);

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
      setprofileImg(await uploadFileToS3(file));
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
      setprofileImg(await uploadFileToS3(file));
    } catch (error) {
      console.error("Error uploading file:", error);
    }
    setSelectedFile(file);
    setFileLoading(false);
    setFormChanges(true); // Add this line to trigger form changes on file upload
  };

  const handleInputChange = () => {
    setFormChanges(true);
  };
  useEffect(() => {
    if (phone !== "") {
      setFormChanges(true);
    }
  }, [phone]);
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Fetch form values
    const name = e.target.elements.username.value;
    const email = e.target.elements.useremail.value;
    const dateOfBirth = e.target.elements.birthdate.value;
    const gender = e.target.elements.gender.value;
    const address = e.target.elements.address.value;
    const zip = e.target.elements.zip.value;

    // Upload image if a new file is selected
    if (selectedFile) {
      try {
        const imageUrl = await uploadFileToS3(selectedFile);
        // console.log("Image URL:", imageUrl); // Log the imageUrl
        setprofileImg(imageUrl);
      } catch (error) {
        console.error("Error uploading file:", error);
      }
    }

    // Log form inputs
    // console.log("Form Inputs:", {
    //     name,
    //     email,
    //     phone, // Use the phone state value directly
    //     dateOfBirth,
    //     gender,
    //     address,
    //     zip,
    //     profileImg,
    // });

    const profileUpload = await axios.put(
      `${process.env.REACT_APP_SERVERLESS_API}/api/v1/users/updateUser/email/${userInfo?.email}`,
      {
        name,
        phone,
        dateOfBirth,
        gender,
        address,
        zip,
        profileImg,
      }
    );
    // console.log(profileUpload);
    setUserInfo({
      _id: userInfo?._id,
      role: userInfo?.role,
      organizationName: userInfo?.organizationName,
      organizationId: userInfo?.organizationId,
      name,
      email,
      phone, // Use the phone state value directly
      dateOfBirth,
      gender,
      address,
      zip,
      profileImg,
    });
    if (profileUpload?.status === 200) {
      toast.success("User Profile Updated Successfully!");
    }
  };
  const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const handleResetPassword = () => {
    forgotPassword();
  };

  return (
    <div>
      <Layout>
        <div className="p-4 mt-5">
          <p className="text-3xl text-center font-medium">
            My <span className="text-sky-500">Profile</span>
          </p>
          <form className="mt-12 " onSubmit={handleSubmit}>
            <div className="flex justify-center gap-10 ">
              <div className="bg-slate-50  shadow-lg p-4 rounded-md">
                <label>
                  <div
                    className="grid justify-center w-fit mx-auto "
                    onDragOver={handleDragOver}
                    onDragEnter={handleDragEnter}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                  >
                    {fileLoading && (
                      <div className="min-w-[242px] min-h-[114px]">
                        <img
                          src={addStudentProfile}
                          className="mx-auto mt-2 animate-ping"
                          alt="addImg"
                        />
                      </div>
                    )}
                    {!fileLoading && (
                      <div className="min-w-[242px] min-h-[114px]">
                        {profileImg ? (
                          <div className="flex justify-center">
                            <img
                              src={profileImg}
                              alt="userAvatar"
                              className="w-[199px] h-[199px] rounded-full  object-cover"
                            />
                          </div>
                        ) : (
                          <img
                            src={
                              userInfo?.profileImg
                                ? userInfo?.profileImg
                                : addStudentProfile
                            }
                            className={`${
                              userInfo?.profileImg
                                ? "w-[199px] h-[199px] rounded-full object-cover"
                                : "mx-auto mt-2"
                            }`}
                            alt="inputImg"
                          />
                        )}
                        {selectedFile && (
                          <p className="text-[18px] font-[700] m-[5px] ">
                            File:{" "}
                            <span className="font-[500]">
                              {selectedFile?.name}
                            </span>
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                  <input
                    required={selectedFile ? true : false}
                    className="hidden"
                    type="file"
                    name="file"
                    placeholder="upload"
                    onChange={handleFileChange}
                  />
                </label>
                <p className="text-2xl my-4 text-center font-semibold">
                  {userInfo?.name}
                </p>
                <p className="text-lg my-2 flex justify-between px-2 font-medium">
                  <EmailIcon></EmailIcon>
                  <span>{userInfo?.email}</span>
                </p>
                <p className="text-lg my-2 flex justify-between px-2 font-medium">
                  <PhoneAndroidIcon></PhoneAndroidIcon>
                  <span>{userInfo?.phone}</span>
                </p>
              </div>
              <div className="bg-slate-50  shadow-lg p-4 rounded-md">
                <div className="flex gap-4">
                  <button
                    type="button"
                    className={`border-b-2 ${
                      page === 0 ? "border-sky-500" : ""
                    }`}
                    // onClick={() => handleUi(0)}
                  >
                    Personal
                  </button>
                </div>
                <div>
                  <div className="flex gap-4 mt-4">
                    <div className="w-[100%]">
                      <label className="text-lg font-medium">
                        Student Name
                      </label>
                      <input
                        name="username"
                        id="username"
                        type="text"
                        className="w-full rounded-md p-2 border-2 border-slate-200"
                        defaultValue={userInfo?.name}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  <div className="flex gap-4 mt-4">
                    <div className="w-[50%]">
                      <label className="text-lg font-medium">Email</label>
                      <input
                        name="useremail"
                        id="useremail"
                        type="email"
                        className="w-full rounded-md p-2 border-2 border-slate-200"
                        value={userInfo?.email}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="w-[50%]">
                      <label htmlFor="username" className="block">
                        Phone Number
                      </label>
                      <PhoneInput
                        required
                        international="true"
                        className="w-full rounded-xl border px-4 py-3 border-gray-300 bg-gray-50 text-gray-800 focus:border-red-600"
                        placeholder="Enter phone number"
                        value={userInfo?.phone}
                        onChange={setPhone}
                      />
                    </div>
                  </div>
                  <div className="flex gap-4 mt-4">
                    <div className="w-[50%]">
                      <label className="text-lg font-medium">
                        Date of Birth
                      </label>
                      <input
                        max={getCurrentDate()}
                        defaultValue={userInfo?.dateOfBirth}
                        name="birthdate"
                        id="birthdate"
                        type="date"
                        className="w-full rounded-md p-2 border-2 border-slate-200"
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="w-[50%]">
                      <label className="text-lg font-medium">Gender</label>
                      <select
                        name="gender"
                        id="gender"
                        className="w-full rounded-md p-2 border-2 border-slate-200"
                        onChange={handleInputChange}
                      >
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </div>
                  <div className="flex gap-4 mt-4">
                    <div className="w-[50%]">
                      <label className="text-lg font-medium">Address</label>
                      <input
                        name="address"
                        id="address"
                        type="text"
                        className="w-full rounded-md p-2 border-2 border-slate-200"
                        defaultValue={userInfo?.address}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="w-[50%]">
                      <label className="text-lg font-medium">Zip Code</label>
                      <input
                        name="zip"
                        id="zip"
                        type="text"
                        className="w-full rounded-md p-2 border-2 border-slate-200"
                        defaultValue={userInfo?.zip}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="grid justify-center gap-10 mt-10">
              {formChanges && (
                <input
                  type="submit"
                  value="Save Profile"
                  className="block w-full p-3 text-center rounded-xl text-gray-50 bg-cyan hover:bg-opacity-70 font-bold hover:transition-all hover:delay-200 hover:ease-out"
                />
              )}
              <input
                type="button"
                value="Reset Password"
                className="block w-full p-3 text-center rounded-xl text-gray-50 bg-amber-400 hover:bg-opacity-70 font-bold hover:transition-all hover:delay-200 hover:ease-out"
                onClick={handleResetPassword}
              />
            </div>
          </form>
        </div>
      </Layout>
    </div>
  );
};

export default UserProfile;
