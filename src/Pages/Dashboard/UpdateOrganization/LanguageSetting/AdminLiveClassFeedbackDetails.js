//AdminLiveClassFeedbackDetails

import React, { useState } from 'react';
import DialogLayout from '../../Shared/DialogLayout';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';


const AdminLiveClassFeedbackDetails = () => {
    const [editDashboardNameOpen, setEditDashboardNameOpen] = useState(false);

    return (
       <div className='mt-2 border p-4 rounded-xl grid grid-cols-2 gap-4'>

        <div className='flex justify-between items-center w-[100%]'>
          <p className='text-lg font-medium'>Select Course</p>
            <input name='selectCourse' type='text' className='border border-slate-300 rounded-lg p-2 w-[300px]' placeholder='Text here'/>
        </div>
        <div className='flex justify-between items-center w-[100%]'>
          <p className='text-lg font-medium'>Select Class</p>
            <input name='selectClass' type='text' className='border border-slate-300 rounded-lg p-2 w-[300px]' placeholder='Text here'/>
        </div>
        <div className='flex justify-between items-center w-[100%]'>
          <p className='text-lg font-medium'>Class not found</p>
            <input name='classNotFound' type='text' className='border border-slate-300 rounded-lg p-2 w-[300px]' placeholder='Text here'/>
        </div>
        <div className='flex justify-between items-center w-[100%]'>
          <p className='text-lg font-medium'>Rating</p>
            <input name='rating' type='text' className='border border-slate-300 rounded-lg p-2 w-[300px]' placeholder='Text here'/>
        </div>
        <div className='flex justify-between items-center w-[100%]'>
          <p className='text-lg font-medium'>Total Students</p>
            <input name='totalStudents' type='text' className='border border-slate-300 rounded-lg p-2 w-[300px]' placeholder='Text here'/>
        </div>
        <div className='flex justify-between items-center w-[100%]'>
          <p className='text-lg font-medium'>There is no Result</p>
            <input name='thereIsNoResult' type='text' className='border border-slate-300 rounded-lg p-2 w-[300px]' placeholder='Text here'/>
        </div>

     


       </div>
    );
};

export default AdminLiveClassFeedbackDetails;