//AdminOrganizationThemeDetails


import React, { useState } from 'react';
import DialogLayout from '../../Shared/DialogLayout';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';


const AdminOrganizationThemeDetails = () => {
    const [editDashboardNameOpen, setEditDashboardNameOpen] = useState(false);

    return (
       <div className='mt-2 border p-4 rounded-xl grid grid-cols-2 gap-4'>

        <div className='flex justify-between items-center w-[100%]'>
          <p className='text-lg font-medium'>Organization ID</p>
            <input name='organizationID' type='text' className='border border-slate-300 rounded-lg p-2 w-[300px]' placeholder='Text here'/>
        </div>
        <div className='flex justify-between items-center w-[100%]'>
          <p className='text-lg font-medium'>Favicon</p>
            <input name='favicon' type='text' className='border border-slate-300 rounded-lg p-2 w-[300px]' placeholder='Text here'/>
        </div>
                    
        <div className='flex justify-between items-center w-[100%]'>
          <p className='text-lg font-medium'>Drag & Drop your file</p>
            <input name='dragAndDropYourFile' type='text' className='border border-slate-300 rounded-lg p-2 w-[300px]' placeholder='Text here'/>
        </div>
        <div className='flex justify-between items-center w-[100%]'>
          <p className='text-lg font-medium'>Upload Favicon</p>
            <input name='uploadFavicon' type='text' className='border border-slate-300 rounded-lg p-2 w-[300px]' placeholder='Text here'/>
        </div>
        <div className='flex justify-between items-center w-[100%]'>
          <p className='text-lg font-medium'>Logo</p>
            <input name='logo' type='text' className='border border-slate-300 rounded-lg p-2 w-[300px]' placeholder='Text here'/>
        </div>
        <div className='flex justify-between items-center w-[100%]'>
          <p className='text-lg font-medium'>Current Logo</p>
            <input name='currentLogo' type='text' className='border border-slate-300 rounded-lg p-2 w-[300px]' placeholder='Text here'/>
        </div>
        <div className='flex justify-between items-center w-[100%]'>
          <p className='text-lg font-medium'>Upload Logo</p>
            <input name='uploadLogo' type='text' className='border border-slate-300 rounded-lg p-2 w-[300px]' placeholder='Text here'/>
        </div>
                    
  
    
      

     


       </div>
    );
};

export default AdminOrganizationThemeDetails;