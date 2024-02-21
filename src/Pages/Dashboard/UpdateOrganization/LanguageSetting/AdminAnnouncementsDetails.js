//AdminAnnouncementsDetails

import React, { useState } from 'react';
import DialogLayout from '../../Shared/DialogLayout';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';


const AdminAnnouncementsDetails = () => {
    const [editDashboardNameOpen, setEditDashboardNameOpen] = useState(false);

    return (
       <div className='mt-2 border p-4 rounded-xl grid grid-cols-2 gap-4'>

        <div className='flex justify-between items-center w-[100%]'>
          <p className='text-lg font-medium'>Announcements</p>
            <input name='announcements' type='text' className='border border-slate-300 rounded-lg p-2 w-[300px]' placeholder='Text here'/>
        </div>

        <div className='flex justify-between items-center w-[100%] '>
          <p className='text-lg font-medium'>Publish Announcement</p>
            <input name='publishAnnouncement' type='text' className='border border-slate-300 rounded-lg p-2 w-[300px]' placeholder='Text here'/>
        </div>       



       </div>
    );
};

export default AdminAnnouncementsDetails;