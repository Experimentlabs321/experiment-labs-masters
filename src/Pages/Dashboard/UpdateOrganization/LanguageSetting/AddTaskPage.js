//AddTaskPage

import React, { useState } from 'react';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import ClassesDetails from './ClassesDetails';
import AssignmentDetails from './AssignmentDetails';
import ReadingDetails from './ReadingDetails';
import VideoDetails from './VideoDetails';
import AudioDetails from './AudioDetails';
import FileDetails from './FileDetails';
import ScheduleDetails from './ScheduleDetails';


const AddTaskPage = () => {

    //Classes
    const [adminClassesDetailsOpen, setAdminClassesDetailsOpen] = useState(false);
    //Assignment
    const [adminAssignmentDetailsOpen, setAdminAssignmentDetailsOpen] = useState(false);
    //Reading
    const [adminReadingDetailsOpen, setAdminReadingDetailsOpen] = useState(false);
    //Video
    const [adminVideoDetailsOpen, setAdminVideoDetailsOpen] = useState(false);
    //Audio
    const [adminAudioDetailsOpen, setAdminAudioDetailsOpen] = useState(false);
    //File
    const [adminFileDetailsOpen, setAdminFileDetailsOpen] = useState(false);
    //Schedule
    const [adminScheduleDetailsOpen, setAdminScheduleDetailsOpen] = useState(false);
 



    return (
        <div className=''>


            {/*Classes*/}
            <div className='mt-2'>
                <div className={`w-[100%] flex items-center justify-between border p-2 rounded-xl ${adminClassesDetailsOpen ? "bg-slate-100" : ""} `}>
                    <div className='flex items-center gap-7'>
                        <p className='text-xl font-medium'>                          
                        Classes                      
                        </p>
                      
                    </div>
                    {
                        (adminClassesDetailsOpen) ? <KeyboardArrowUpIcon className='cursor-pointer' onClick={() => {
                            setAdminClassesDetailsOpen(false);

                        }} /> : <KeyboardArrowDownIcon className='cursor-pointer' onClick={() => {
                            setAdminClassesDetailsOpen(true);

                        }} />
                    }

                </div>
             
                {
                    (adminClassesDetailsOpen) && (
                        <ClassesDetails />
                    )
                }

            </div>
            {/*Assignment*/}
            <div className='mt-2'>
                <div className={`w-[100%] flex items-center justify-between border p-2 rounded-xl ${adminAssignmentDetailsOpen ? "bg-slate-100" : ""} `}>
                    <div className='flex items-center gap-7'>
                        <p className='text-xl font-medium'>                          
                        Assignment                      
                        </p>
                      
                    </div>
                    {
                        (adminAssignmentDetailsOpen) ? <KeyboardArrowUpIcon className='cursor-pointer' onClick={() => {
                            setAdminAssignmentDetailsOpen(false);

                        }} /> : <KeyboardArrowDownIcon className='cursor-pointer' onClick={() => {
                            setAdminAssignmentDetailsOpen(true);

                        }} />
                    }

                </div>
             
                {
                    (adminAssignmentDetailsOpen) && (
                        <AssignmentDetails />
                    )
                }

            </div>
            {/*Reading*/}
            <div className='mt-2'>
                <div className={`w-[100%] flex items-center justify-between border p-2 rounded-xl ${adminReadingDetailsOpen ? "bg-slate-100" : ""} `}>
                    <div className='flex items-center gap-7'>
                        <p className='text-xl font-medium'>                          
                        Reading                      
                        </p>
                      
                    </div>
                    {
                        (adminReadingDetailsOpen) ? <KeyboardArrowUpIcon className='cursor-pointer' onClick={() => {
                            setAdminReadingDetailsOpen(false);

                        }} /> : <KeyboardArrowDownIcon className='cursor-pointer' onClick={() => {
                            setAdminReadingDetailsOpen(true);

                        }} />
                    }

                </div>
             
                {
                    (adminReadingDetailsOpen) && (
                        <ReadingDetails />
                    )
                }

            </div>
            {/*Video*/}
            <div className='mt-2'>
                <div className={`w-[100%] flex items-center justify-between border p-2 rounded-xl ${adminVideoDetailsOpen ? "bg-slate-100" : ""} `}>
                    <div className='flex items-center gap-7'>
                        <p className='text-xl font-medium'>                          
                        Video                      
                        </p>
                      
                    </div>
                    {
                        (adminVideoDetailsOpen) ? <KeyboardArrowUpIcon className='cursor-pointer' onClick={() => {
                            setAdminVideoDetailsOpen(false);

                        }} /> : <KeyboardArrowDownIcon className='cursor-pointer' onClick={() => {
                            setAdminVideoDetailsOpen(true);

                        }} />
                    }

                </div>
             
                {
                    (adminVideoDetailsOpen) && (
                        <VideoDetails />
                    )
                }

            </div>
            {/*Audio*/}
            <div className='mt-2'>
                <div className={`w-[100%] flex items-center justify-between border p-2 rounded-xl ${adminAudioDetailsOpen ? "bg-slate-100" : ""} `}>
                    <div className='flex items-center gap-7'>
                        <p className='text-xl font-medium'>                          
                        Audio                      
                        </p>
                      
                    </div>
                    {
                        (adminAudioDetailsOpen) ? <KeyboardArrowUpIcon className='cursor-pointer' onClick={() => {
                            setAdminAudioDetailsOpen(false);

                        }} /> : <KeyboardArrowDownIcon className='cursor-pointer' onClick={() => {
                            setAdminAudioDetailsOpen(true);

                        }} />
                    }

                </div>
             
                {
                    (adminAudioDetailsOpen) && (
                        <AudioDetails />
                    )
                }

            </div>
            {/*File*/}
            <div className='mt-2'>
                <div className={`w-[100%] flex items-center justify-between border p-2 rounded-xl ${adminFileDetailsOpen ? "bg-slate-100" : ""} `}>
                    <div className='flex items-center gap-7'>
                        <p className='text-xl font-medium'>                          
                        File                      
                        </p>
                      
                    </div>
                    {
                        (adminFileDetailsOpen) ? <KeyboardArrowUpIcon className='cursor-pointer' onClick={() => {
                            setAdminFileDetailsOpen(false);

                        }} /> : <KeyboardArrowDownIcon className='cursor-pointer' onClick={() => {
                            setAdminFileDetailsOpen(true);

                        }} />
                    }

                </div>
             
                {
                    (adminFileDetailsOpen) && (
                        <FileDetails />
                    )
                }

            </div>
            {/*Schedule*/}
            <div className='mt-2'>
                <div className={`w-[100%] flex items-center justify-between border p-2 rounded-xl ${adminScheduleDetailsOpen ? "bg-slate-100" : ""} `}>
                    <div className='flex items-center gap-7'>
                        <p className='text-xl font-medium'>                          
                        Schedule                      
                        </p>
                      
                    </div>
                    {
                        (adminScheduleDetailsOpen) ? <KeyboardArrowUpIcon className='cursor-pointer' onClick={() => {
                            setAdminScheduleDetailsOpen(false);

                        }} /> : <KeyboardArrowDownIcon className='cursor-pointer' onClick={() => {
                            setAdminScheduleDetailsOpen(true);

                        }} />
                    }

                </div>
             
                {
                    (adminScheduleDetailsOpen) && (
                        <ScheduleDetails />
                    )
                }

            </div>

        </div>
    );
};

export default AddTaskPage;