import React, { useEffect, useState } from 'react';
import toast from "react-hot-toast";
import axios from 'axios';
import CourseCompletion from './DashboardThemeComponents/CourseCompletion';
import Person from "../../../assets/Dashboard/person.png";
import uploadFileToS3 from '../../UploadComponent/s3Uploader';

const DashboardTheme = (
    { userInfo,
        orgData,
        orgLogoUrl,
        loginSidebarImage,
        titlesColor,
        dashboardTheme }) => {

    const [courseCompletionImg, setCourseCompletionImg] = useState(dashboardTheme?.courseCompletionImg || Person);
    const [courseCompletionText, setCourseCompletionText] = useState(dashboardTheme?.courseCompletionText || "Your course is");
    const [courseCompletionBgColor, setCourseCompletionBgColor] = useState(dashboardTheme?.courseCompletionBgColor || "#3E4DAC");
    const [addCourseCompletion, setAddCourseCompletion] = useState(true);
    const [fileLoading, setFileLoading] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const form = event.target;

        const orgInfo = {
            organizationName: orgData?.organizationName,
            email: orgData?.email,
            loginTitle: form.loginTitle?.value,
            loginSubTitle: form.loginSubTitle?.value,
            org_logo: orgLogoUrl,
            loginSidebarImage: loginSidebarImage,
            titlesColor: titlesColor,
            DashboardTheme: {
                addCourseCompletion,
                courseCompletionBgColor,
                courseCompletionImg,
                courseCompletionText
            }
        };
        console.log(orgInfo);

        // const updateOrg = await axios.put(
        //     `${process.env.REACT_APP_SERVER_API}/api/v1/organizations/${orgData?._id}`,
        //     orgInfo
        // );

        // if (updateOrg?.data?.acknowledged) {
        //     toast.success("Organization edited Successfully");
        //     // event.target.reset();
        // }
    };

    const handleAddCourseCompletion = () => {
        setAddCourseCompletion(!addCourseCompletion);
    };


    const uploadFile = async (e) => {
        e.preventDefault();
        setFileLoading(true);
        const files = e.target.files;
        if (files[0]) {
            const res = await uploadFileToS3(files[0]);
            if (res) {
                setCourseCompletionImg(res);
            }
        }
        setFileLoading(false);
    };


    // console.log(courseCompletionText);

    return (
        <div className='px-4 mt-4'>
            <form onSubmit={handleSubmit} className="mt-1">
                <div className='mt-5'>
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
                                className={`${addCourseCompletion ? 'bg-green translate-x-full' : 'bg-gray-300 translate-x-0'
                                    } absolute left-1 top-1 w-6 h-6 rounded-full transition-transform transform ease-in-out duration-300`}
                            >
                            </div>
                        </div>
                        <div className="ml-3 text-gray-700 font-semibold text-xl">
                            {!addCourseCompletion ? "Add Section" : "Remove Section"}
                        </div>
                    </label>
                </div>


                <CourseCompletion
                    courseCompletionImg={courseCompletionImg}
                    courseCompletionText={courseCompletionText}
                    courseCompletionBgColor={courseCompletionBgColor}
                />

                {
                    addCourseCompletion && <div className="mt-5 w-full mx-auto bg-white py-3 px-5 rounded shadow-md">
                        <div className="flex justify-between items-center gap-4">
                            {/* Text Input */}
                            <div className="">
                                <label htmlFor="textInput" className="block text-lg font-semibold text-gray-700">
                                    Change Text
                                </label>
                                <input
                                    type="text"
                                    id="courseCompletionText"
                                    name="courseCompletionText"
                                    defaultValue={courseCompletionText}
                                    onChange={(e) => setCourseCompletionText(e.target.value)}
                                    className="mt-1 p-2 min-w-[300px] border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                                />
                            </div>

                            {/* Color Input */}
                            <div className=" flex items-center">
                                <label htmlFor="colorInput" className="block text-lg font-medium text-gray-700">
                                    Change Color
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

                            {/* Image Input */}
                            <div className="">
                                <label htmlFor="imageInput" className="block text-lg font-medium text-gray-700">
                                    Change Image
                                </label>
                                {
                                    fileLoading ?
                                        <img
                                            className="mx-auto animate-ping"
                                            style={{ height: "30px", width: "30px" }}
                                            src="https://i.ibb.co/gJLdW8G/cloud-upload-regular-240.png"
                                            alt=""
                                        />
                                        : <input
                                            type="file"
                                            id="courseCompletionImg"
                                            name="courseCompletionImg"
                                            // defaultValue={courseCompletionImg}
                                            onChange={uploadFile}
                                            className="ml-2 p-2 min-w-[300px] border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                                        />
                                }

                            </div>
                        </div>
                    </div>
                }

                <input
                    className="bg-green my-5 hover:bg-opacity-60 text-white py-3 px-4 font-bold rounded-lg"
                    value="Save"
                    type="submit"
                />
            </form>
        </div>
    );
};

export default DashboardTheme;