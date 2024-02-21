//AdminContentManagementDetails



import React, { useState } from 'react';
import DialogLayout from '../../Shared/DialogLayout';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';


const AdminContentManagementDetails = () => {
    const [editDashboardNameOpen, setEditDashboardNameOpen] = useState(false);

    return (
       <div className='mt-2 border p-4 rounded-xl grid grid-cols-2 gap-4'>

        <div className='flex justify-between items-center w-[100%]'>
          <p className='text-lg font-medium'>My courses</p>
            <input name='myCourses' type='text' className='border border-slate-300 rounded-lg p-2 w-[300px]' placeholder='Text here'/>
        </div>

        <div className='flex justify-between items-center w-[100%] '>
          <p className='text-lg font-medium'>Create new bundle</p>
            <input name='createNewBundle' type='text' className='border border-slate-300 rounded-lg p-2 w-[300px]' placeholder='Text here'/>
        </div>       

        <div className='flex justify-between items-center w-[100%] '>
          <p className='text-lg font-medium'>Create new course</p>
            <input name='createNewCourse' type='text' className='border border-slate-300 rounded-lg p-2 w-[300px]' placeholder='Text here'/>
        </div>       
        <div className='flex justify-between items-center w-[100%] '>
          <p className='text-lg font-medium'>All Courses</p>
            <input name='allCourses' type='text' className='border border-slate-300 rounded-lg p-2 w-[300px]' placeholder='Text here'/>
        </div>       
        <div className='flex justify-between items-center w-[100%] '>
          <p className='text-lg font-medium'>Sort By</p>
            <input name='sortBy' type='text' className='border border-slate-300 rounded-lg p-2 w-[300px]' placeholder='Text here'/>
        </div>       
        <div className='flex justify-between items-center w-[100%] '>
          <p className='text-lg font-medium'>Category</p>
            <input name='category' type='text' className='border border-slate-300 rounded-lg p-2 w-[300px]' placeholder='Text here'/>
        </div>       
        <div className='flex justify-between items-center w-[100%] '>
          <p className='text-lg font-medium'>Show Bundles</p>
            <input name='showBundles' type='text' className='border border-slate-300 rounded-lg p-2 w-[300px]' placeholder='Text here'/>
        </div>       
        <div className='flex justify-between items-center w-[100%] '>
          <p className='text-lg font-medium'>Search</p>
            <input name='search' type='text' className='border border-slate-300 rounded-lg p-2 w-[300px]' placeholder='Text here'/>
        </div>       



       </div>
    );
};

export default AdminContentManagementDetails;