import React, { useEffect, useState } from 'react';
import toast from "react-hot-toast";
import axios from 'axios';
import CourseCompletion from './DashboardThemeComponents/CourseCompletion';
import uploadFileToS3 from '../../UploadComponent/s3Uploader';
import OpenBox from './DashboardThemeComponents/OpenBox';
import JoinQuest from './DashboardThemeComponents/JoinQuest';

const DashboardTheme = (
    { userInfo,
        orgData,
        orgLogoUrl,
        loginSidebarImage,
        titlesColor,
        dashboardTheme }) => {

    const [courseCompletionText, setCourseCompletionText] = useState(dashboardTheme?.courseCompletionText || "Your course is");
    const [courseCompletionBgColor, setCourseCompletionBgColor] = useState(dashboardTheme?.courseCompletionBgColor || "#3E4DAC");
    const [addCourseCompletion, setAddCourseCompletion] = useState(true);
    const [addOpenBox, setAddOpenBox] = useState(true);
    const [addJoinQuest, setAddJoinQuest] = useState(true);
    const [isAvatar, setIsAvatar] = useState(false);
    const [avatarBg, setAvatarBg] = useState(dashboardTheme?.avatarBg || "#32CD62");
    const [openBoxButtonText, setOpenBoxButtonText] = useState(dashboardTheme?.openBoxButtonText || "Open Box");
    const [openBoxImage, setOpenBoxImage] = useState(dashboardTheme?.openBoxImage || null);
    const [openBoxButtonBg, setOpenBoxButtonBg] = useState(dashboardTheme?.openBoxButtonBg || "#3E4DAC");
    const [openBoxCardBg, setOpenBoxCardBg] = useState(dashboardTheme?.openBoxCardBg || "#FFC7C7");
    const [fileLoading, setFileLoading] = useState(false);
    const [joinQuestBtnText, setJoinQuestBtnText] = useState(dashboardTheme?.joinQuestBtnText || "Join Quest");
    const [joinQuestBtnBg, setJoinQuestBtnBg] = useState(dashboardTheme?.joinQuestBtnBg || "#FFDB70");
    const [joinQuestCardBg, setJoinQuestCardBg] = useState(dashboardTheme?.joinQuestCardBg || "#0F3934");
    const [joinQuestImgBg, setJoinQuestImgBg] = useState(dashboardTheme?.joinQuestImgBg || "#FF74BE");
    const [joinQuestImg, setJoinQuestImg] = useState(dashboardTheme?.joinQuestImg || null);

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
                courseCompletionText,
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
                joinQuestImg
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

    const handleAddOpenBox = () => {
        setAddOpenBox(!addOpenBox);
    };


    const handleAddJoinQuest = () => {
        setAddJoinQuest(!addJoinQuest);
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



    // console.log(courseCompletionText);

    return (
        <div className='px-4 mt-4'>
            <form onSubmit={handleSubmit} className="mt-1">

                {/* Toggle */}
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
                {/* Toggle End */}

                {/* Design */}
                <CourseCompletion
                    courseCompletionText={courseCompletionText}
                    courseCompletionBgColor={courseCompletionBgColor}
                    isAvatar={isAvatar}
                    avatarBg={avatarBg}
                />
                {/* Design End*/}


                {/* Edit */}
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
                                    className="mt-1 p-2 min-w-[200px] border rounded-md focus:outline-none focus:ring focus:border-blue-300"
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

                            {/* Avatar Type Input */}
                            <div className="flex flex-col items-start">
                                <label className="block text-lg font-medium text-gray-700">Image Type</label>
                                <div className="ml-2 flex items-center space-x-4">
                                    <label className="flex items-center">
                                        <input
                                            type="radio"
                                            name="isAvatar"
                                            checked={!isAvatar}
                                            onChange={() => setIsAvatar(!isAvatar)}
                                            className="mr-1"
                                        />
                                        <span>Default</span>
                                    </label>
                                    <label className="flex items-center">
                                        <input
                                            type="radio"
                                            name="isAvatar"
                                            className="mr-1"
                                            checked={isAvatar}
                                            onChange={() => setIsAvatar(!isAvatar)}
                                        />
                                        <span>Avatar</span>
                                    </label>
                                </div>
                            </div>

                            {/* Avatar Background Color Input (Conditional) */}
                            {isAvatar && (
                                <div className="flex items-center">
                                    <label htmlFor="avatarBgColor" className="block text-lg font-medium text-gray-700">
                                        Avatar Background
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
                }
                {/* Edit End*/}


                {/* OpenBox Start */}

                <div className='my-8'>
                    <label htmlFor="OpenBoxToggle" className="flex items-center cursor-pointer">
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
                                className={`${addOpenBox ? 'bg-green translate-x-full' : 'bg-gray-300 translate-x-0'
                                    } absolute left-1 top-1 w-6 h-6 rounded-full transition-transform transform ease-in-out duration-300`}
                            >
                            </div>
                        </div>
                        <div className="ml-3 text-gray-700 font-semibold text-xl">
                            {!addOpenBox ? "Add Section" : "Remove Section"}
                        </div>
                    </label>
                </div>

                <OpenBox
                    openBoxButtonText={openBoxButtonText}
                    openBoxImage={openBoxImage}
                    openBoxButtonBg={openBoxButtonBg}
                    openBoxCardBg={openBoxCardBg}
                />


                {
                    addOpenBox && <div className="mt-5 w-full mx-auto bg-white py-3 px-5 rounded shadow-md">
                        <div className="flex justify-between items-center gap-4">
                            {/* Text Input */}
                            <div className="">
                                <label htmlFor="textInput" className="block text-lg font-semibold text-gray-700">
                                    Button Text
                                </label>
                                <input
                                    type="text"
                                    id="openBoxButtonText"
                                    name="openBoxButtonText"
                                    defaultValue={openBoxButtonText}
                                    onChange={(e) => setOpenBoxButtonText(e.target.value)}
                                    className="mt-1 p-2 min-w-[200px] border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                                />
                            </div>

                            {/* Color Input */}
                            <div className=" flex items-center">
                                <label htmlFor="colorInput" className="block text-lg font-medium text-gray-700">
                                    Change Button
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
                                <label htmlFor="colorInput" className="block text-lg font-medium text-gray-700">
                                    Change Card
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
                                            id="openBoxImg"
                                            name="openBoxImg"
                                            // defaultValue={courseCompletionImg}
                                            onChange={uploadOpenBoxImg}
                                            className="ml-2 p-2 w-[200px] border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                                        />
                                }

                            </div>
                        </div>
                    </div>
                }

                {/* OpenBox End */}


                {/* Join Quest Start */}
                <div className='my-8'>
                    <label htmlFor="joinQuestToggle" className="flex items-center cursor-pointer">
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
                                className={`${addJoinQuest ? 'bg-green translate-x-full' : 'bg-gray-300 translate-x-0'
                                    } absolute left-1 top-1 w-6 h-6 rounded-full transition-transform transform ease-in-out duration-300`}
                            >
                            </div>
                        </div>
                        <div className="ml-3 text-gray-700 font-semibold text-xl">
                            {!addJoinQuest ? "Add Section" : "Remove Section"}
                        </div>
                    </label>
                </div>


                <JoinQuest
                    joinQuestBtnText={joinQuestBtnText}
                    joinQuestBtnBg={joinQuestBtnBg}
                    joinQuestCardBg={joinQuestCardBg}
                    joinQuestImgBg={joinQuestImgBg}
                    joinQuestImg={joinQuestImg}
                />

                {
                    addJoinQuest && <div className="mt-5 w-full mx-auto bg-white py-3 px-5 rounded shadow-md">
                        <div className="flex justify-between items-center gap-4">
                            {/* Text Input */}
                            <div className="">
                                <label htmlFor="textInput" className="block text-lg font-semibold text-gray-700">
                                    Button Text
                                </label>
                                <input
                                    type="text"
                                    id="joinQuestBtnText"
                                    name="joinQuestBtnText"
                                    defaultValue={joinQuestBtnText}
                                    onChange={(e) => setJoinQuestBtnText(e.target.value)}
                                    className="mt-1 p-2 min-w-[200px] border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                                />
                            </div>

                            {/* Color Input */}
                            <div className=" flex items-center">
                                <label htmlFor="colorInput" className="block text-lg font-medium text-gray-700">
                                    Change Button
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
                                <label htmlFor="colorInput" className="block text-lg font-medium text-gray-700">
                                    Change Card
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
                                <label htmlFor="colorInput" className="block text-lg font-medium text-gray-700">
                                    Change ImageBg
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
                                            id="joinQuestImg"
                                            name="joinQuestImg"
                                            // defaultValue={courseCompletionImg}
                                            onChange={uploadJoinQuestImg}
                                            className="ml-2 p-2 w-[200px] border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                                        />
                                }

                            </div>
                        </div>
                    </div>
                }


                {/* Join Quest End */}


                {/* Submit Button */}
                <input
                    className="bg-green my-8 hover:bg-opacity-60 text-white py-3 px-4 font-bold rounded-lg"
                    value="Save"
                    type="submit"
                />
            </form>
        </div>
    );
};

export default DashboardTheme;