//FeedbackPage


import React, { useState } from 'react';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import AdminLiveClassFeedbackDetails from './AdminLiveClassFeedbackDetails';
import AdminFeedbackSettingsDetails from './AdminFeedbackSettingsDetails';


const FeedbackPage = () => {
    //Live class Feedback

    const [adminLiveClassFeedbackDetailsOpen, setAdminLiveClassFeedbackDetailsOpen] = useState(false);
    //Feedback Settings

    const [adminFeedbackSettingsDetailsOpen, setAdminFeedbackSettingsDetailsOpen] = useState(false);

    return (
        <div className=''>

            {/* Live class Feedback */}
            <div className='mt-2'>
                <div className={`w-[100%] flex items-center justify-between border p-2 rounded-xl ${adminLiveClassFeedbackDetailsOpen ? "bg-slate-100" : ""} `}>
                    <div className='flex items-center gap-7'>
                        <p className='text-xl font-medium'>
                            
                          Live Class Feedback
                            
                        </p>
                      
                    </div>
                    {
                        (adminLiveClassFeedbackDetailsOpen) ? <KeyboardArrowUpIcon className='cursor-pointer' onClick={() => {
                            setAdminLiveClassFeedbackDetailsOpen(false);

                        }} /> : <KeyboardArrowDownIcon className='cursor-pointer' onClick={() => {
                            setAdminLiveClassFeedbackDetailsOpen(true);

                        }} />
                    }

                </div>

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
                            
                              Feedback Settings                          
                        </p>
                      
                    </div>
                    {
                        (adminFeedbackSettingsDetailsOpen) ? <KeyboardArrowUpIcon className='cursor-pointer' onClick={() => {
                            setAdminFeedbackSettingsDetailsOpen(false);

                        }} /> : <KeyboardArrowDownIcon className='cursor-pointer' onClick={() => {
                            setAdminFeedbackSettingsDetailsOpen(true);

                        }} />
                    }

                </div>

                {
                    (adminFeedbackSettingsDetailsOpen) && (
                        <AdminFeedbackSettingsDetails />
                    )
                }


            </div>




        </div>
    );
};

export default FeedbackPage;