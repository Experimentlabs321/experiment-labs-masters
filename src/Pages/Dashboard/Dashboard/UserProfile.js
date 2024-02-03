import React, { useContext, useEffect, useState } from 'react';
import addStudentProfile from "../../../assets/Dashboard/addStudentProfile.png";
import Layout from '../Layout';
import OffersTop from './OffersComponent/OffersTop';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import CancelIcon from '@mui/icons-material/Cancel';
import { red } from '@mui/material/colors';
import Swal from 'sweetalert2';
import { AuthContext } from '../../../contexts/AuthProvider';
import uploadFileToS3 from "../../UploadComponent/s3Uploader";
import EmailIcon from '@mui/icons-material/Email';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import PhoneInput from 'react-phone-number-input';
const UserProfile = () => {
    const { email } = useParams();
    const [profileInfo, setProfileInfo] = useState({});
    const [courseData, setCourseData] = useState([]);
    const [tableWidth, setTableWidth] = useState("100%");
    const { userInfo } = useContext(AuthContext);
    const [fileLoading, setFileLoading] = useState(false);
    const [selectedFile, setSelectedFile] = useState();
    const [schoolInfo, setSchoolInfo] = useState({});
    const [studentProfileImg, setStudentProfileImg] = useState("");
    const [addBulkUpload, setAddBulkUpload] = useState(false);
    const [dragActive, setDragActive] = useState(false);
    const [page, setPage] = useState(0);
    const [phone, setPhone] = useState("");
    console.log(userInfo);
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
    const handleUi = (f) => {
        setPage(f)
    }
    return (
        <div>
            <Layout>
                <div className='p-4 mt-5'>
                    <p className='text-3xl text-center font-medium'>My <span className='text-sky-500'>Profile</span></p>
                    <form className='flex justify-center gap-10 mt-12 '>
                        <div className='bg-slate-50  shadow-lg p-4 rounded-md'>
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
                                    className="hidden"
                                    type="file"
                                    name="file"
                                    placeholder="upload"
                                    onChange={handleFileChange}
                                />
                            </label>
                            <p className='text-2xl my-4 text-center font-semibold'>{userInfo?.name}</p>
                            <p className='text-lg my-2 flex justify-between px-2 font-medium'><EmailIcon></EmailIcon><span>{userInfo?.email}</span></p>
                            <p className='text-lg my-2 flex justify-between px-2 font-medium'><PhoneAndroidIcon></PhoneAndroidIcon><span>{userInfo?.phone}</span></p>
                        </div>
                        <div className='bg-slate-50  shadow-lg p-4 rounded-md'>
                            <div className='flex gap-4'>
                                <button
                                    type="button"
                                    className={`border-b-2 ${page === 0 ? 'border-sky-500' : ''}`}
                                    onClick={() => handleUi(0)}
                                >
                                    Personal
                                </button>
                            </div>
                            <div>
                                <div className='flex gap-4 mt-4'>
                                    <div className='w-[100%]' >
                                        <label className='text-lg font-medium'>Student Name</label>
                                        <input name="username" id="username" type="text" className='w-full rounded-md p-2 border-2 border-slate-200' defaultValue={userInfo?.name} />
                                    </div>
                                </div>
                                <div className='flex gap-4 mt-4'>
                                    <div className='w-[50%]'>
                                        <label className='text-lg font-medium'>Email</label>
                                        <input name="useremail" id="useremail" type="email" className='w-full rounded-md p-2 border-2 border-slate-200' value={userInfo?.email} />
                                    </div>
                                    <div className='w-[50%]'>
                                        <label htmlFor="username" className="block">
                                            Phone Number
                                        </label>
                                        {/* <input
                                            type="phone"
                                            name="phone"
                                            id="phone"
                                            placeholder="Enter Phone"
                                            className="w-full rounded-xl border px-4 py-3 border-gray-300 bg-gray-50 text-gray-800 focus:border-red-600"
                                            required
                                        /> */}
                                        <PhoneInput
                                            international="true"
                                            className="w-full rounded-xl border px-4 py-3 border-gray-300 bg-gray-50 text-gray-800 focus:border-red-600"
                                            defaultCountry="IN"
                                            // className='w-full focus:outline-0'
                                            placeholder="Enter phone number"
                                            value={phone}
                                            onChange={setPhone} />
                                        {/* {error && <p className="text-red-600">Need Phone Number to Register</p>} */}
                                    </div>
                                </div>
                                <div className='flex gap-4 mt-4'>
                                    <div className='w-[50%]'>
                                        <label className='text-lg font-medium'>Date of Birth</label>
                                        <input name="birthdate" id="birthdate" type="date" className='w-full rounded-md p-2 border-2 border-slate-200' />
                                    </div>
                                    <div className='w-[50%]'>
                                        <label className='text-lg font-medium'>Gender</label>
                                        <select name="gender" id="gender" className='w-full rounded-md p-2 border-2 border-slate-200'>
                                            <option value="male">Male</option>
                                            <option value="female">Female</option>
                                            <option value="other">Other</option>
                                        </select>
                                    </div>
                                </div>
                                <div className='flex gap-4 mt-4'>
                                    <div className='w-[50%]' >
                                        <label className='text-lg font-medium'>Address</label>
                                        <input name="address" id="address" type="text" className='w-full rounded-md p-2 border-2 border-slate-200' defaultValue='' />
                                    </div>
                                    <div className='w-[50%]'>
                                        <label className='text-lg font-medium'>Zip Code</label>
                                        <input name="zip" id="zip" type="text" className='w-full rounded-md p-2 border-2 border-slate-200' defaultValue='' />
                                    </div>
                                </div>
                            </div>


                        </div>
                    </form>
                </div>
            </Layout>
        </div>
    );
};

export default UserProfile;