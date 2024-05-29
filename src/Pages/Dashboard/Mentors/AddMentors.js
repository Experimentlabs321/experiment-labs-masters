import React, { useContext, useState } from "react";
import uploadFileToS3 from "../../UploadComponent/s3Uploader";
import addStudentProfile from "../../../assets/Dashboard/addStudentProfile.png";
import PhoneInput from "react-phone-number-input";
import Loading from "../../Shared/Loading/Loading";
import { AuthContext } from "../../../contexts/AuthProvider";
import axios from "axios";
import Swal from "sweetalert2";

export default function AddMentors() {
  const { userInfo } = useContext(AuthContext);

  const [dragActive, setDragActive] = useState(false);
  const [fileLoading, setFileLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState();
  const [mentorProfileImg, setMentorProfileImg] = useState("");
  const [phone, setPhone] = useState("");

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
      setMentorProfileImg(await uploadFileToS3(file));
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
      setMentorProfileImg(await uploadFileToS3(file));
    } catch (error) {
      console.error("Error uploading file:", error);
    }
    setSelectedFile(file);
    setFileLoading(false);
  };

  const handleAddMentor = async (event) => {
    event.preventDefault();
    Loading();
    try {
      const form = event?.target;
      const userData = {
        name: form.name.value,
        email: form.email.value,
        phone: phone,
        organizationId: userInfo?.organizationId,
        organizationName: userInfo?.organizationName,
        role: form.role.value,
        profileImg: mentorProfileImg,
      };

      const newUser = await axios.post(
        `${process.env.REACT_APP_SERVERLESS_API}/api/v1/users/addOrUpdateMentor`,
        // `http://localhost:5000/api/v1/users/addOrUpdateMentor`,
        {
          user: userData,
        }
      );

      if (newUser) {
        Swal.fire({
          title: "New mentor added successfully!",
          icon: "success",
        });
        form.reset();
        Loading().close();
      }
    } catch (error) {
      Loading().close();
    }
  };

  return (
    <div className="px-4">
      <div className="my-4">
        <form onSubmit={handleAddMentor} autoComplete="on">
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
                      File{" "}
                      <span className="font-[500]">{selectedFile?.name}</span>
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
          {mentorProfileImg && (
            <img
              src={mentorProfileImg}
              className="mx-auto my-4"
              alt="mentorProfileImg"
            />
          )}

          <div className="flex justify-between my-4">
            <div className="flex flex-col gap-2  w-[40%]">
              <label htmlFor="name" className="text-[17px] font-medium">
                Mentor Name
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
                Mentor Email
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
                Mentor Phone Number
              </label>
              <PhoneInput
                style={{ backgroundColor: "#EEF0FF" }}
                international="true"
                className="bg-[#EEF0FF] px-[10px] py-1 rounded-md shadow"
                defaultCountry="IN"
                placeholder="Enter phone number"
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
                Mentor Role
              </label>
              <select
                required
                // onChange={(e) => setStudentStatus(e.target.value)}
                name="role"
                id="role"
                className="bg-[#EEF0FF] px-[10px] py-1 rounded-md shadow"
              >
                <option value={"execution mentor"}>Execution Mentor</option>
                <option value={"expert mentor"}>Expert Mentor</option>
              </select>
            </div>
          </div>
          <div className="grid justify-center mt-10">
            <button
              type="submit"
              className="flex gap-2 py-3 px-7 text-white bg-[#3E4DAC] items-center rounded-3xl"
            >
              Add Mentor
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
