//AdminPointsRedemptionsDetails


import React, { useState } from 'react';
import DialogLayout from '../../Shared/DialogLayout';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';


const AdminPointsRedemptionsDetails = () => {
    const [editDashboardNameOpen, setEditDashboardNameOpen] = useState(false);

    return (
       <div className='mt-2 border p-4 rounded-xl grid grid-cols-2 gap-4'>

        <div className='flex justify-between items-center w-[100%]'>
          <p className='text-lg font-medium'>Points And Redemptions</p>
            <input name='pointsAndRedemptions' type='text' className='border border-slate-300 rounded-lg p-2 w-[300px]' placeholder='Text here'/>
        </div>

        <div className='flex justify-between items-center w-[100%] '>
          <p className='text-lg font-medium'>Search</p>
            <input name='search' type='text' className='border border-slate-300 rounded-lg p-2 w-[300px]' placeholder='Text here'/>
        </div>       
        <div className='flex justify-between items-center w-[100%] '>
          <p className='text-lg font-medium'>Show Points And Redemptions</p>
            <input name='showPointsAndRedemptions' type='text' className='border border-slate-300 rounded-lg p-2 w-[300px]' placeholder='Text here'/>
        </div>       
        <div className='flex justify-between items-center w-[100%] '>
          <p className='text-lg font-medium'>Gamified Setting</p>
            <input name='gamifiedSetting' type='text' className='border border-slate-300 rounded-lg p-2 w-[300px]' placeholder='Text here'/>
        </div>       
        <div className='flex justify-between items-center w-[100%] '>
          <p className='text-lg font-medium'>Earning Logic</p>
            <input name='earningLogic' type='text' className='border border-slate-300 rounded-lg p-2 w-[300px]' placeholder='Text here'/>
        </div>       
        <div className='flex justify-between items-center w-[100%] '>
          <p className='text-lg font-medium'>Redemption Logic</p>
            <input name='RedemptionLogic' type='text' className='border border-slate-300 rounded-lg p-2 w-[300px]' placeholder='Text here'/>
        </div>       



       </div>
    );
};

export default AdminPointsRedemptionsDetails;