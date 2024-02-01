import React, { useEffect, useState } from 'react';
import Layout from '../Layout';
import OffersTop from './OffersComponent/OffersTop';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const Profile = () => {
    const { email } = useParams();
    const [profileInfo, setProfileInfo] = useState({});
    useEffect(() => {
        axios
            .get(`${process.env.REACT_APP_SERVER_API}/api/v1/users?email=${email}`)
            .then((user) => {
                setProfileInfo(user?.data);
            })
            .catch((error) => console.error(error));
    }, [email]);
    console.log("profile ", profileInfo);
    // console.log(profileInfo.name);

    const handleSubmit = async (event) => {
        event.preventDefault();


        const form = event.target;

        const scheduleName = form.scheduleName?.value;
        const dateRange = form.dateRange?.value;
        const minimumTime = form.minimumTime?.value;
        const maximumTime = form.maximumTime?.value;
        const meetingDuration = form.meetingDuration?.value;
    };
    return (
        <div>
            <Layout>
                <div className='p-8'>
                    <h1 className='font-bold text-2xl text-center'>Profile Details</h1>
                    {
                        profileInfo?._id && <form onSubmit={handleSubmit} className="ms-[40px]  mt-8">
                            <div className="grid grid-cols-1 justify-items-center gap-5 px-3">
                                <div className="mt-3">
                                    <p className="font-semibold text-lg">Name</p>
                                    <input
                                        required
                                        className="mt-2 border rounded-md w-[500px] h-[50px] ps-2 text-[#535353] focus:outline-0 bg-[#f6f7ffa1] "
                                        name="userName"
                                        type="text"
                                        defaultValue={profileInfo?.name}
                                    />
                                </div>
                                <div className="">
                                    <p className="font-semibold text-lg">Email</p>
                                    <input
                                        required
                                        className="mt-2 border rounded-md w-[500px] h-[50px] ps-2 text-[#535353] focus:outline-0 bg-[#f6f7ffa1] "
                                        name="userEmail"
                                        type="text"
                                        defaultValue={profileInfo?.email}
                                    />
                                </div>
                                <div className="">
                                    <p className="font-semibold text-lg">Mobile</p>
                                    <input
                                        required
                                        className="mt-2 border rounded-md w-[500px] h-[50px] ps-2 text-[#535353] focus:outline-0 bg-[#f6f7ffa1] "
                                        name="userPhone"
                                        type="text"
                                        defaultValue={profileInfo?.phone}
                                    />
                                </div>
                                <div className="">
                                    <p className="font-semibold text-lg">Role</p>
                                    <input
                                        required
                                        className="mt-2 border rounded-md w-[500px] h-[50px] ps-2 text-[#535353] focus:outline-0 bg-[#f6f7ffa1] "
                                        name="userRole"
                                        type="text"
                                        defaultValue={profileInfo?.role}
                                    />
                                </div>
                                <div className="items-start justify-start">
                                    <p className="font-semibold text-lg ">Device Usage</p>
                                    <p className='mt-1'>Device Connected : {profileInfo?.devices?.length}</p>
                                </div>

                            </div>





                            {/* <div className="flex items-center gap-10 justify-center mt-20 mb-10">
                            <button className="px-[30px] py-3 bg-[#FF557A] text-[#fff] text-xl font-bold rounded-lg ms-20 " type="submit">Save</button>
                        </div> */}
                        </form>
                    }
                </div>
            </Layout>
        </div>
    );
};

export default Profile;