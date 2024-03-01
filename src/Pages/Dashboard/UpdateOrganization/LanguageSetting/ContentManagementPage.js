
import React, { useState } from 'react';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import DialogLayoutForFromControl from '../../Shared/DialogLayoutForFromControl';
import CreateNewBundleDetails from './CreateNewBundleDetails';
import CreateNewCourseDetails from './CreateNewCourseDetails';
import CourseDetailsPage from './CourseDetailsPage';
import AddWeekDetails from './AddWeekDetails';
import EditWeekDetails from './EditWeekDetails';
import AddNewBatchDetails from './AddNewBatchDetails';
import AddTaskDetails from './AddTaskDetails';
import ClassesDetails from './ClassesDetails';
import AddTaskPage from './AddTaskPage';


const ContentManagementPage = () => {
    //Create new bundle
    const [adminCreateNewBundleDetailsOpen, setAdminCreateNewBundleDetailsOpen] = useState(false);

    //Create new course
    const [adminCreateNewCourseDetailsOpen, setAdminCreateNewCourseDetailsOpen] = useState(false);

    //Course Details
    const [adminCourseDetailsOpen, setAdminCourseDetailsOpen] = useState(false);
    //Add Week details 
    const [adminAddWeekDetailsOpen, setAdminAddWeekDetailsOpen] = useState(false);
    //Edit Week details 
    const [adminEditWeekDetailsOpen, setAdminEditWeekDetailsOpen] = useState(false);
    //Add New Batch
    const [adminAddNewBatchDetailsOpen, setAdminAddNewBatchDetailsOpen] = useState(false);
    //Add Task
    const [adminAddTaskDetailsOpen, setAdminAddTaskDetailsOpen] = useState(false);
    //Classes
    const [adminClassesDetailsOpen, setAdminClassesDetailsOpen] = useState(false);




    return (
        <div className=''>

            {/*Create New Bundle */}
            <div className='mt-2'>
                <div className={`w-[100%] flex items-center justify-between border p-2 rounded-xl ${adminCreateNewBundleDetailsOpen ? "bg-slate-100" : ""} `}>
                    <div className='flex items-center gap-7'>
                        <p className='text-xl font-medium'>
                            Create New Bundle
                        </p>

                    </div>
                    {
                        (adminCreateNewBundleDetailsOpen) ? <KeyboardArrowUpIcon className='cursor-pointer' onClick={() => {
                            setAdminCreateNewBundleDetailsOpen(false);

                        }} /> : <KeyboardArrowDownIcon className='cursor-pointer' onClick={() => {
                            setAdminCreateNewBundleDetailsOpen(true);

                        }} />
                    }



                </div>


                {
                    (adminCreateNewBundleDetailsOpen) && (
                        <CreateNewBundleDetails />
                    )
                }


            </div>

            {/*Create new course */}
            <div className='mt-2'>
                <div className={`w-[100%] flex items-center justify-between border p-2 rounded-xl ${adminCreateNewCourseDetailsOpen ? "bg-slate-100" : ""} `}>
                    <div className='flex items-center gap-7'>
                        <p className='text-xl font-medium'>
                            Create New Course
                        </p>

                    </div>
                    {
                        (adminCreateNewCourseDetailsOpen) ? <KeyboardArrowUpIcon className='cursor-pointer' onClick={() => {
                            setAdminCreateNewCourseDetailsOpen(false);
                        }} /> : <KeyboardArrowDownIcon className='cursor-pointer' onClick={() => {
                            setAdminCreateNewCourseDetailsOpen(true);
                        }} />
                    }
                </div>
                {
                    (adminCreateNewCourseDetailsOpen) && (
                        <CreateNewCourseDetails />
                    )
                }
            </div>

            {/*Course Details*/}
            <div className='mt-2'>
                <div className={`w-[100%] flex items-center justify-between border p-2 rounded-xl ${adminCourseDetailsOpen ? "bg-slate-100" : ""} `}>
                    <div className='flex items-center gap-7'>
                        <p className='text-xl font-medium'>
                            Course Details
                        </p>

                    </div>
                    {
                        (adminCourseDetailsOpen) ? <KeyboardArrowUpIcon className='cursor-pointer' onClick={() => {
                            setAdminCourseDetailsOpen(false);

                        }} /> : <KeyboardArrowDownIcon className='cursor-pointer' onClick={() => {
                            setAdminCourseDetailsOpen(true);

                        }} />
                    }

                </div>

                {
                    (adminCourseDetailsOpen) && (
                        <CourseDetailsPage />
                    )
                }

            </div>
            {/*Add Week Details*/}
            <div className='mt-2'>
                <div className={`w-[100%] flex items-center justify-between border p-2 rounded-xl ${adminAddWeekDetailsOpen ? "bg-slate-100" : ""} `}>
                    <div className='flex items-center gap-7'>
                        <p className='text-xl font-medium'>
                            Add Week details
                        </p>

                    </div>
                    {
                        (adminAddWeekDetailsOpen) ? <KeyboardArrowUpIcon className='cursor-pointer' onClick={() => {
                            setAdminAddWeekDetailsOpen(false);

                        }} /> : <KeyboardArrowDownIcon className='cursor-pointer' onClick={() => {
                            setAdminAddWeekDetailsOpen(true);

                        }} />
                    }

                </div>

                {
                    (adminAddWeekDetailsOpen) && (
                        <AddWeekDetails />
                    )
                }

            </div>
            {/*Edit Week Details*/}
            <div className='mt-2'>
                <div className={`w-[100%] flex items-center justify-between border p-2 rounded-xl ${adminEditWeekDetailsOpen ? "bg-slate-100" : ""} `}>
                    <div className='flex items-center gap-7'>
                        <p className='text-xl font-medium'>
                            Edit Week details
                        </p>

                    </div>
                    {
                        (adminEditWeekDetailsOpen) ? <KeyboardArrowUpIcon className='cursor-pointer' onClick={() => {
                            setAdminEditWeekDetailsOpen(false);

                        }} /> : <KeyboardArrowDownIcon className='cursor-pointer' onClick={() => {
                            setAdminEditWeekDetailsOpen(true);

                        }} />
                    }

                </div>

                {
                    (adminEditWeekDetailsOpen) && (
                        <EditWeekDetails />
                    )
                }

            </div>
            {/*Add New Batch*/}
            <div className='mt-2'>
                <div className={`w-[100%] flex items-center justify-between border p-2 rounded-xl ${adminAddNewBatchDetailsOpen ? "bg-slate-100" : ""} `}>
                    <div className='flex items-center gap-7'>
                        <p className='text-xl font-medium'>
                            Add New Batch
                        </p>

                    </div>
                    {
                        (adminAddNewBatchDetailsOpen) ? <KeyboardArrowUpIcon className='cursor-pointer' onClick={() => {
                            setAdminAddNewBatchDetailsOpen(false);

                        }} /> : <KeyboardArrowDownIcon className='cursor-pointer' onClick={() => {
                            setAdminAddNewBatchDetailsOpen(true);

                        }} />
                    }

                </div>

                {
                    (adminAddNewBatchDetailsOpen) && (
                        <AddNewBatchDetails />
                    )
                }

            </div>
            {/*Add Task*/}
            <div className='mt-2'>
                <div className={`w-[100%] flex items-center justify-between border p-2 rounded-xl ${adminAddTaskDetailsOpen ? "bg-slate-100" : ""} `}>
                    <div className='flex items-center gap-7'>
                        <p className='text-xl font-medium'>
                            Add Task
                        </p>

                    </div>
                    {
                        (adminAddTaskDetailsOpen) ? <KeyboardArrowUpIcon className='cursor-pointer' onClick={() => {
                            setAdminAddTaskDetailsOpen(false);

                        }} /> : <KeyboardArrowDownIcon className='cursor-pointer' onClick={() => {
                            setAdminAddTaskDetailsOpen(true);

                        }} />
                    }

                </div>

                {
                    (adminAddTaskDetailsOpen) && (
                        <div>
                            <AddTaskDetails />
                            <AddTaskPage />
                        </div>


                    )
                }

            </div>


        </div>
    );
};

export default ContentManagementPage;