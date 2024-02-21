//AdminSkillsManagementDetails

import React, { useState } from 'react';
import DialogLayout from '../../Shared/DialogLayout';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';


const AdminSkillsManagementDetails = () => {
    const [editDashboardNameOpen, setEditDashboardNameOpen] = useState(false);

    return (
       <div className='mt-2 border p-4 rounded-xl grid grid-cols-2 gap-4'>

        <div className='flex justify-between items-center w-[100%]'>
          <p className='text-lg font-medium'>Skills Management</p>
            <input name='skillsManagement' type='text' className='border border-slate-300 rounded-lg p-2 w-[300px]' placeholder='Text here'/>
        </div>

        <div className='flex justify-between items-center w-[100%] '>
          <p className='text-lg font-medium'>Search</p>
            <input name='search' type='text' className='border border-slate-300 rounded-lg p-2 w-[300px]' placeholder='Text here'/>
        </div>       
        <div className='flex justify-between items-center w-[100%] '>
          <p className='text-lg font-medium'>Show Skills Management</p>
            <input name='showSkillsManagement' type='text' className='border border-slate-300 rounded-lg p-2 w-[300px]' placeholder='Text here'/>
        </div>       
        <div className='flex justify-between items-center w-[100%] '>
          <p className='text-lg font-medium'>Skills Creations</p>
            <input name='skillsCreations' type='text' className='border border-slate-300 rounded-lg p-2 w-[300px]' placeholder='Text here'/>
        </div>       
        <div className='flex justify-between items-center w-[100%] '>
          <p className='text-lg font-medium'>Skills Improvement Engine</p>
            <input name='skillsImprovementEngine' type='text' className='border border-slate-300 rounded-lg p-2 w-[300px]' placeholder='Text here'/>
        </div>       
            



       </div>
    );
};

export default AdminSkillsManagementDetails;