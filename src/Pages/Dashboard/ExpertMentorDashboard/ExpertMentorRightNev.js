//ExpertMentorRightNev

import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import React, { useContext, useState } from "react";
import Rectangle5 from '../../../assets/ExecutionMentor/Rectangle5.svg'
import profile from '../../../assets/ExpertMentorDashboard/profile.svg'
import delete1 from '../../../assets/ExpertMentorDashboard/Delete.svg'
import edit from '../../../assets/ExpertMentorDashboard/edit.svg'

import { Link } from "react-router-dom";




const ExpertMentorRightNev = () => {
    const [selectedDate, setSelectedDate] = useState(new Date());

    const highlightDates = [
        new Date('2023-08-16'),
        new Date('2023-08-24'),
        new Date('2023-08-25'),
    ];

    const handleDateChange = date => {
        setSelectedDate(date);
    };

    return (
        <div className="ms-5  w-[70%] p-5 mt-10"
            style={{
                borderRadius: "16px",
                border: "1px solid #EAEAEA",
                background: "var(--primary-100, #FFF)",
                boxShadow: "4px 4px 10px 0px rgba(0, 0, 0, 0.25)"
            }}
        >

            <div className="flex items-center gap-4 mt-10">
                <div className='rounded-full '>
                    <img className='rounded-full' src={profile} alt="profile" />
                </div>
                <div>
                    <p className="text-lg font-medium">Shekhar Yadav</p>
                    <p className="text-[#9D9D9D] text-base font-medium">Designation</p>
                </div>
            </div>

            <div className="flex flex-col items-center mt-8">

                <Calendar
                    onChange={handleDateChange}
                    value={selectedDate}
                    tileClassName={({ date }) =>
                        highlightDates.some(hDate => hDate.toDateString() === date.toDateString())
                            ? ' text-blue font-bold'
                            : ''
                    }
                    style={{ border: '1px solis #fff' }}
                />
            </div>

            <div className='my-7'>

                <div className='text-sm font-normal'>
                    <div className='flex gap-3 items-center '>
                        <p className='rounded-full bg-[#3076FF] h-[10px] w-[10px]'></p>
                        <p><span className='text-[#A0A7AF] me-2'>Date :</span> 5th June, 2023</p>

                    </div>
                    <p className='ms-5 '><span className='text-[#A0A7AF] me-2'>Time :</span> 9.30 pm</p>

                </div>

                <div className='text-sm font-normal mt-2'>
                    <div className='flex gap-3 items-center '>
                        <p className='rounded-full bg-[#3076FF] h-[10px] w-[10px]'></p>
                        <p><span className='text-[#A0A7AF] me-2'>Date :</span> 5th June, 2023</p>

                    </div>
                    <p className='ms-5 '><span className='text-[#A0A7AF] me-2'>Time :</span> 9.30 pm</p>

                </div>

            </div>

            <div className='flex gap-3 items-center'>
                <p className=''
                    style={{
                        borderRadius: "6px",
                        border: "1px solid #8F8F8F",
                        background: "var(--primary-100, #FFF)"
                    }}
                ><img className='p-2' src={delete1} alt='icon' /></p>
                <p
                    style={{
                        borderRadius: "6px",
                        background: "var(--secondary-95, #E5EEFF)"
                    }}
                ><img className='p-2' src={edit} alt='icon' /></p>
                <p className='bg-[#3076FF] text-[#fff] rounded-md text-sm font-bold py-2 px-5'>Book Slot - Week 1 </p>
            </div>














        </div >

    );
};

export default ExpertMentorRightNev;

