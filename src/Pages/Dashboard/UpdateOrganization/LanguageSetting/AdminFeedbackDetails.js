//AdminFeedbackDetails

import React, { useState } from 'react';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import DialogLayoutForFromControl from '../../Shared/DialogLayoutForFromControl';
import AdminLiveClassFeedbackDetails from './AdminLiveClassFeedbackDetails';
import AdminFeedbackSettingsDetails from './AdminFeedbackSettingsDetails';


const AdminFeedbackDetails = () => {
    //Live class Feedback
    const [liveClassFeedbackNameInput, setLiveClassFeedbackNameInput] = useState('');
    const [editLiveClassFeedbackNameOpen, setEditLiveClassFeedbackNameOpen] = useState(false);
    const [adminLiveClassFeedbackDetailsOpen, setAdminLiveClassFeedbackDetailsOpen] = useState(false);
    //Feedback Settings
    const [feedbackSettingsNameInput, setFeedbackSettingsNameInput] = useState('');
    const [editFeedbackSettingsNameOpen, setEditFeedbackSettingsNameOpen] = useState(false);
    const [adminFeedbackSettingsDetailsOpen, setAdminFeedbackSettingsDetailsOpen] = useState(false);

    return (
        <div className=''>

            {/* Live class Feedback */}
            <div className='mt-2'>
                <div className={`w-[100%] flex items-center justify-between border p-2 rounded-xl ${adminLiveClassFeedbackDetailsOpen ? "bg-slate-100" : ""} `}>
                    <div className='flex items-center gap-7'>
                        <p className='text-xl font-medium'>
                            {
                                liveClassFeedbackNameInput ? liveClassFeedbackNameInput : "Live Class Feedback"
                            }

                        </p>
                        <button
                            onClick={() => {
                                setEditLiveClassFeedbackNameOpen(true);
                                /*    setChapterData({
                                     ...chapter,
                                     index: index,
                                   }); */
                            }}
                            className="ml-[24px]"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="18"
                                height="20"
                                viewBox="0 0 18 20"
                                fill="none"
                            >
                                <path
                                    d="M13.648 0.961914L17.3711 4.88525L14.5329 7.87744L10.8098 3.95411L13.648 0.961914ZM0.0117188 19.2551H3.73478L12.7781 9.72533L9.05502 5.802L0.0117188 15.3318V19.2551Z"
                                    fill="#282828"
                                />
                            </svg>
                        </button>
                    </div>
                    {
                        (adminLiveClassFeedbackDetailsOpen) ? <KeyboardArrowUpIcon className='cursor-pointer' onClick={() => {
                            setAdminLiveClassFeedbackDetailsOpen(false);

                        }} /> : <KeyboardArrowDownIcon className='cursor-pointer' onClick={() => {
                            setAdminLiveClassFeedbackDetailsOpen(true);

                        }} />
                    }



                </div>
                <DialogLayoutForFromControl
                    open={editLiveClassFeedbackNameOpen}
                    setOpen={setEditLiveClassFeedbackNameOpen}
                    width={400}
                    borderRadius="15px"
                    title={
                        <p className=" h-[90px] text-[19px] font-[700] flex items-center text-[#3E4DAC] px-[32px] py-5 border-b-2">
                            Edit Live Class Feedback Name
                        </p>
                    }
                >

                    <div>
                        <input
                            className="mt-6 border rounded-md w-[358px] h-[50px] ps-2 text-[#535353] focus:outline-0 bg-[#F6F7FF] "
                            name="liveClassFeedbackName"
                            type="text"
                            placeholder="Live Class Feedback"
                            value={liveClassFeedbackNameInput}
                            onChange={(e) => setLiveClassFeedbackNameInput(e.target.value)}
                        />
                        <div className="flex justify-center mt-5">

                            <button
                                className="px-[20px] py-3 bg-[#3E4DAC] hover:bg-opacity-70 text-[#fff] cursor-pointer text-xl font-bold rounded-lg"
                                onClick={() => setEditLiveClassFeedbackNameOpen(false)}

                            >Add</button>


                        </div>

                    </div>
                </DialogLayoutForFromControl>

                {
                    (adminLiveClassFeedbackDetailsOpen) && (
                        <AdminLiveClassFeedbackDetails />
                    )
                }


            </div>

            {/*    Feedback Settings */}

            <div className='mt-2'>
                <div className={`w-[100%] flex items-center justify-between border p-2 rounded-xl ${adminFeedbackSettingsDetailsOpen ? "bg-slate-100" : ""} `}>
                    <div className='flex items-center gap-7'>
                        <p className='text-xl font-medium'>
                            {
                                feedbackSettingsNameInput ? feedbackSettingsNameInput : "Feedback Settings"
                            }

                        </p>
                        <button
                            onClick={() => {
                                setEditFeedbackSettingsNameOpen(true);
                                /*    setChapterData({
                                     ...chapter,
                                     index: index,
                                   }); */
                            }}
                            className="ml-[24px]"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="18"
                                height="20"
                                viewBox="0 0 18 20"
                                fill="none"
                            >
                                <path
                                    d="M13.648 0.961914L17.3711 4.88525L14.5329 7.87744L10.8098 3.95411L13.648 0.961914ZM0.0117188 19.2551H3.73478L12.7781 9.72533L9.05502 5.802L0.0117188 15.3318V19.2551Z"
                                    fill="#282828"
                                />
                            </svg>
                        </button>
                    </div>
                    {
                        (adminFeedbackSettingsDetailsOpen) ? <KeyboardArrowUpIcon className='cursor-pointer' onClick={() => {
                            setAdminFeedbackSettingsDetailsOpen(false);

                        }} /> : <KeyboardArrowDownIcon className='cursor-pointer' onClick={() => {
                            setAdminFeedbackSettingsDetailsOpen(true);

                        }} />
                    }



                </div>
                <DialogLayoutForFromControl
                    open={editFeedbackSettingsNameOpen}
                    setOpen={setEditFeedbackSettingsNameOpen}
                    width={400}
                    borderRadius="15px"
                    title={
                        <p className=" h-[90px] text-[19px] font-[700] flex items-center text-[#3E4DAC] px-[32px] py-5 border-b-2">
                            Edit Feedback Settings Name
                        </p>
                    }
                >

                    <div>
                        <input
                            className="mt-6 border rounded-md w-[358px] h-[50px] ps-2 text-[#535353] focus:outline-0 bg-[#F6F7FF] "
                            name="feedbackSettings"
                            type="text"
                            placeholder="Feedback Settings"
                            value={feedbackSettingsNameInput}
                            onChange={(e) => setFeedbackSettingsNameInput(e.target.value)}
                        />
                        <div className="flex justify-center mt-5">

                            <button
                                className="px-[20px] py-3 bg-[#3E4DAC] hover:bg-opacity-70 text-[#fff] cursor-pointer text-xl font-bold rounded-lg"
                                onClick={() => setEditFeedbackSettingsNameOpen(false)}

                            >Add</button>


                        </div>

                    </div>
                </DialogLayoutForFromControl>

                {
                    (adminFeedbackSettingsDetailsOpen) && (
                        <AdminFeedbackSettingsDetails />
                    )
                }


            </div>




        </div>
    );
};

export default AdminFeedbackDetails;