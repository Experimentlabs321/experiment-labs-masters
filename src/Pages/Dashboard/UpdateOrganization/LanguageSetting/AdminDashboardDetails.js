//DashboardDetails
import React, { useState } from 'react';
import DialogLayout from '../../Shared/DialogLayout';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';


const AdminDashboardDetails = () => {
    const [editDashboardNameOpen, setEditDashboardNameOpen] = useState(false);

    return (
       <div className='mt-2 border p-4 rounded-xl grid grid-cols-2 gap-4'>

        <div className='flex justify-between items-center w-[100%]'>
          <p className='text-lg font-medium'>Welcome</p>
            <input name='welcome' type='text' className='border border-slate-300 rounded-lg p-2 w-[300px]' placeholder='Text here'/>
        </div>

        <div className='flex justify-between items-center w-[100%] '>
          <p className='text-lg font-medium'>Overview</p>
            <input name='overview' type='text' className='border border-slate-300 rounded-lg p-2 w-[300px]' placeholder='Text here'/>
        </div>       

        <div className='flex justify-between items-center w-[100%] mt-4'>
          <p className='text-lg font-medium'>Select Filter</p>
            <input name='selectFilter' type='text' className='border border-slate-300 rounded-lg p-2 w-[300px]' placeholder='Text here'/>
        </div>
        <div className='flex justify-between items-center w-[100%] mt-4'>
          <p className='text-lg font-medium'>Last 7 Days</p>
            <input name='lastSevenDays' type='text' className='border border-slate-300 rounded-lg p-2 w-[300px]' placeholder='Text here'/>
        </div>
        <div className='flex justify-between items-center w-[100%] mt-4'>
          <p className='text-lg font-medium'>Last 30 Days</p>
            <input name='lastThirtyDays' type='text' className='border border-slate-300 rounded-lg p-2 w-[300px]' placeholder='Text here'/>
        </div>
        <div className='flex justify-between items-center w-[100%] mt-4'>
          <p className='text-lg font-medium'>Last year</p>
            <input name='lastYear' type='text' className='border border-slate-300 rounded-lg p-2 w-[300px]' placeholder='Text here'/>
        </div>
        <div className='flex justify-between items-center w-[100%] mt-4'>
          <p className='text-lg font-medium'>Overall</p>
            <input name='overall' type='text' className='border border-slate-300 rounded-lg p-2 w-[300px]' placeholder='Text here'/>
        </div>
        <div className='flex justify-between items-center w-[100%] mt-4'>
          <p className='text-lg font-medium'>Custom date</p>
            <input name='customDate' type='text' className='border border-slate-300 rounded-lg p-2 w-[300px]' placeholder='Text here'/>
        </div>
        <div className='flex justify-between items-center w-[100%] mt-4'>
          <p className='text-lg font-medium'>From Date</p>
            <input name='fromDate' type='text' className='border border-slate-300 rounded-lg p-2 w-[300px]' placeholder='Text here'/>
        </div>
        <div className='flex justify-between items-center w-[100%] mt-4'>
          <p className='text-lg font-medium'>To Date</p>
            <input name='toDate' type='text' className='border border-slate-300 rounded-lg p-2 w-[300px]' placeholder='Text here'/>
        </div>
        <div className='flex justify-between items-center w-[100%] mt-4'>
          <p className='text-lg font-medium'>Total Students</p>
            <input name='totalStudents' type='text' className='border border-slate-300 rounded-lg p-2 w-[300px]' placeholder='Text here'/>
        </div>
        <div className='flex justify-between items-center w-[100%] mt-4'>
          <p className='text-lg font-medium'>Enrolled Students</p>
            <input name='enrolledStudents' type='text' className='border border-slate-300 rounded-lg p-2 w-[300px]' placeholder='Text here'/>
        </div>
        <div className='flex justify-between items-center w-[100%] mt-4'>
          <p className='text-lg font-medium'>Total Revenue</p>
            <input name='totalRevenue' type='text' className='border border-slate-300 rounded-lg p-2 w-[300px]' placeholder='Text here'/>
        </div>
        <div className='flex justify-between items-center w-[100%] mt-4'>
          <p className='text-lg font-medium'>Unevaluated Assignments</p>
            <input name='unevaluatedAssignments' type='text' className='border border-slate-300 rounded-lg p-2 w-[300px]' placeholder='Text here'/>
        </div>
        <div className='flex justify-between items-center w-[100%] mt-4'>
          <p className='text-lg font-medium'>Meetings Today</p>
            <input name='meetingsToday' type='text' className='border border-slate-300 rounded-lg p-2 w-[300px]' placeholder='Text here'/>
        </div>
        <div className='flex justify-between items-center w-[100%] mt-4'>
          <p className='text-lg font-medium'>Total Students Vs Enrolled Students</p>
            <input name='totalStudentsVsEnrolledStudents' type='text' className='border border-slate-300 rounded-lg p-2 w-[300px]' placeholder='Text here'/>
        </div>
        <div className='flex justify-between items-center w-[100%] mt-4'>
          <p className='text-lg font-medium'>Total Revenue Vs Total Discount</p>
            <input name='totalRevenueVsTotalDiscount' type='text' className='border border-slate-300 rounded-lg p-2 w-[300px]' placeholder='Text here'/>
        </div>

       </div>
    );
};

export default AdminDashboardDetails;