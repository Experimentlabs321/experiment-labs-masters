//AdminStatistics
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../contexts/AuthProvider";
import axios from "axios";



const AdminStatistics = () => {
    const { userInfo } = useContext(AuthContext);
    const [statCount, setStatCount] = useState();
  

    useEffect(() => {
        axios
            .get(
                `http://localhost:5000/api/v1/stats/organizationId/${userInfo?.organizationId}`
            )
            .then((response) => {
                setStatCount(response?.data);
            })
            .catch((error) => console.error(error));
    }, [userInfo]);
    console.log(statCount)
    return (
        <div>

            <h1 className="text-3xl font-bold my-10"> OverView </h1>

            <div className='flex gap-5'>
                <div className="w-[160px] justify-center items-stretch shadow-sm bg-[#8064F0] flex flex-col px-2 rounded-md py-4">
                    <div className="justify-between items-stretch flex gap-5">
                        <div className="text-white text-sm font-medium tracking-widest">
                            Total Students
                        </div>
                        <img
                         alt="icon"
                            loading="lazy"
                            src="https://cdn.builder.io/api/v1/image/assets/TEMP/db26dcaf06bcfb06dcf05364f8b5adebd0dae4e7fd89ad91201a634754a6cda5?"
                            className="aspect-[0.94] object-contain object-center w-4 overflow-hidden self-center shrink-0 max-w-full my-auto"
                        />
                    </div>
                    <div className="text-white text-3xl font-bold tracking-[2.96px] whitespace-nowrap mt-3">
                        {statCount?.totalStudent?statCount?.totalStudent : "0"}
                    </div>
                </div>
                <div className="w-[160px] justify-center items-stretch shadow-sm bg-[#0A98EA] flex flex-col px-2 rounded-md py-4">
                    <div className="justify-between items-stretch flex gap-5">
                        <div className="text-white text-sm font-medium tracking-widest">
                           Enrolled Students
                        </div>
                        <img
                            loading="lazy"
                            src="https://cdn.builder.io/api/v1/image/assets/TEMP/db26dcaf06bcfb06dcf05364f8b5adebd0dae4e7fd89ad91201a634754a6cda5?"
                            className="aspect-[0.94] object-contain object-center w-4 overflow-hidden self-center shrink-0 max-w-full my-auto"
                            alt="icon"/>
                    </div>
                    <div className="text-white text-3xl font-bold tracking-[2.96px] whitespace-nowrap mt-3">
                    {statCount?.enrollStudents?statCount?.enrollStudents : "0"}
                    </div>
                </div>
                <div className="w-[160px] justify-center items-stretch shadow-sm bg-[#6278FF] flex flex-col px-2 rounded-md py-4">
                    <div className="justify-between items-stretch flex gap-5">
                        <div className="text-white text-sm font-medium tracking-widest">
                          Unevaluated Students
                        </div>
                        <img
                      
                            alt="icon"
                            loading="lazy"
                            src="https://cdn.builder.io/api/v1/image/assets/TEMP/db26dcaf06bcfb06dcf05364f8b5adebd0dae4e7fd89ad91201a634754a6cda5?"
                            className="aspect-[0.94] object-contain object-center w-4 overflow-hidden self-center shrink-0 max-w-full my-auto"
                        />
                    </div>
                    <div className="text-white text-3xl font-bold tracking-[2.96px] whitespace-nowrap mt-3">
                    {statCount?.unevaluatedStudents?statCount?.unevaluatedStudents : "0"}
                    </div>
                </div>
              
                <div className="w-[160px] justify-center items-stretch shadow-sm bg-[#E8B912] flex flex-col px-2 rounded-md py-4">
                    <div className="justify-between items-stretch flex gap-5">
                        <div className="text-white text-sm font-medium tracking-widest">
                           Meetings Today
                        </div>
                        <img
                            loading="lazy"
                            src="https://cdn.builder.io/api/v1/image/assets/TEMP/db26dcaf06bcfb06dcf05364f8b5adebd0dae4e7fd89ad91201a634754a6cda5?"
                            className="aspect-[0.94] object-contain object-center w-4 overflow-hidden self-center shrink-0 max-w-full my-auto"
                       alt="icon"
                       />
                    </div>
                    <div className="text-white text-3xl font-bold tracking-[2.96px] whitespace-nowrap mt-3">
                    {statCount?.totalMeeting?statCount?.totalMeeting : "0"}
                    </div>
                </div>
              {/*   <div className="w-[160px] justify-center items-stretch shadow-sm bg-[#DD2025] flex flex-col px-2 rounded-md py-4">
                    <div className="justify-between items-stretch flex gap-5">
                        <div className="text-white text-sm font-medium tracking-widest">
                            Completion Rate
                        </div>
                        <img
                            loading="lazy"
                            src="https://cdn.builder.io/api/v1/image/assets/TEMP/db26dcaf06bcfb06dcf05364f8b5adebd0dae4e7fd89ad91201a634754a6cda5?"
                            className="aspect-[0.94] object-contain object-center w-4 overflow-hidden self-center shrink-0 max-w-full my-auto"
                            alt="icon"/>
                    </div>
                    <div className="text-white text-3xl font-bold tracking-[2.96px] whitespace-nowrap mt-3">
                        100
                    </div>
                </div> */}


            </div>

        </div>
    );
};

export default AdminStatistics;
