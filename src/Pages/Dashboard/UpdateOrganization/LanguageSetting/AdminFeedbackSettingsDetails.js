//AdminFeedbackSettingsDetails

import React, { useState } from 'react';
import DialogLayout from '../../Shared/DialogLayout';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';


const AdminFeedbackSettingsDetails = () => {
    const [editDashboardNameOpen, setEditDashboardNameOpen] = useState(false);

    return (
       <div className='mt-2 border p-4 rounded-xl grid grid-cols-2 gap-4'>

        <div className='flex justify-between items-center w-[100%]'>
          <p className='text-lg font-medium'>Select Course</p>
            <input name='selectCourse' type='text' className='border border-slate-300 rounded-lg p-2 w-[300px]' placeholder='Text here'/>
        </div>
        <div className='flex justify-between items-center w-[100%]'>
          <p className='text-lg font-medium'>Select Course</p>
            <input name='selectCourse' type='text' className='border border-slate-300 rounded-lg p-2 w-[300px]' placeholder='Text here'/>
        </div>
        <div className='flex justify-between items-center w-[100%]'>
          <p className='text-lg font-medium'>Set Feedbacks</p>
            <input name='setFeedbacks' type='text' className='border border-slate-300 rounded-lg p-2 w-[300px]' placeholder='Text here'/>
        </div>
        <div className='flex justify-between items-center w-[100%]'>
          <p className='text-lg font-medium'>FeedbackCategory</p>
            <input name='feedbackCategory' type='text' className='border border-slate-300 rounded-lg p-2 w-[300px]' placeholder='Text here'/>
        </div>
        <div className='flex justify-between items-center w-[100%]'>
          <p className='text-lg font-medium'>Feedback Category</p>
            <input name='feedbackCategory' type='text' className='border border-slate-300 rounded-lg p-2 w-[300px]' placeholder='Text here'/>
        </div>
        <div className='flex justify-between items-center w-[100%]'>
          <p className='text-lg font-medium'>Feedback Item Name</p>
            <input name='feedbackItemName' type='text' className='border border-slate-300 rounded-lg p-2 w-[300px]' placeholder='Text here'/>
        </div>
        <div className='flex justify-between items-center w-[100%]'>
          <p className='text-lg font-medium'>Item Rating</p>
            <input name='itemRating' type='text' className='border border-slate-300 rounded-lg p-2 w-[300px]' placeholder='Text here'/>
        </div>
        <div className='flex justify-between items-center w-[100%]'>
          <p className='text-lg font-medium'>Give Access</p>
            <input name='giveAccess' type='text' className='border border-slate-300 rounded-lg p-2 w-[300px]' placeholder='Text here'/>
        </div>
        <div className='flex justify-between items-center w-[100%]'>
          <p className='text-lg font-medium'>Proceed</p>
            <input name='proceed' type='text' className='border border-slate-300 rounded-lg p-2 w-[300px]' placeholder='Text here'/>
        </div>
        <div className='flex justify-between items-center w-[100%]'>
          <p className='text-lg font-medium'>Update</p>
            <input name='update' type='text' className='border border-slate-300 rounded-lg p-2 w-[300px]' placeholder='Text here'/>
        </div>
        <div className='flex justify-between items-center w-[100%]'>
          <p className='text-lg font-medium'>Execution mentor</p>
            <input name='executionMentor' type='text' className='border border-slate-300 rounded-lg p-2 w-[300px]' placeholder='Text here'/>
        </div>
        <div className='flex justify-between items-center w-[100%]'>
          <p className='text-lg font-medium'>Expert mentor</p>
            <input name='expertMentor' type='text' className='border border-slate-300 rounded-lg p-2 w-[300px]' placeholder='Text here'/>
        </div>
        <div className='flex justify-between items-center w-[100%]'>
          <p className='text-lg font-medium'>Upload Icon</p>
            <input name='uploadIcon' type='text' className='border border-slate-300 rounded-lg p-2 w-[300px]' placeholder='Text here'/>
        </div>
        <div className='flex justify-between items-center w-[100%]'>
          <p className='text-lg font-medium'>Browser</p>
            <input name='browser' type='text' className='border border-slate-300 rounded-lg p-2 w-[300px]' placeholder='Text here'/>
        </div>
        <div className='flex justify-between items-center w-[100%]'>
          <p className='text-lg font-medium'>Edit Item</p>
            <input name='editItem' type='text' className='border border-slate-300 rounded-lg p-2 w-[300px]' placeholder='Text here'/>
        </div>
        <div className='flex justify-between items-center w-[100%]'>
          <p className='text-lg font-medium'>Delete Item</p>
            <input name='deleteItem' type='text' className='border border-slate-300 rounded-lg p-2 w-[300px]' placeholder='Text here'/>
        </div>
        <div className='flex justify-between items-center w-[100%]'>
          <p className='text-lg font-medium'>Edit Category Name</p>
            <input name='editCategoryName' type='text' className='border border-slate-300 rounded-lg p-2 w-[300px]' placeholder='Text here'/>
        </div>
        <div className='flex justify-between items-center w-[100%]'>
          <p className='text-lg font-medium'>Delete Category</p>
            <input name='deleteCategory' type='text' className='border border-slate-300 rounded-lg p-2 w-[300px]' placeholder='Text here'/>
        </div>
    
      

     


       </div>
    );
};

export default AdminFeedbackSettingsDetails;