//AdminScheduleDetails


import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../../contexts/AuthProvider';
import axios from 'axios';
import toast from 'react-hot-toast';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';

const AdminScheduleDetails = () => {
  const { userInfo } = useContext(AuthContext)
  const [adminLoading, setAdminLoading] = useState(false);
  const [itemDetails, setItemDetails] = useState();

  useEffect(() => {
    if (userInfo) {
      setAdminLoading(true);
      axios
        .get(
          `${process.env.REACT_APP_SERVERLESS_API}/api/v1/language/getItemDetailsByOrganizationAndName/schedule/organizationsId/${userInfo?.organizationId}`
        )
        .then((response) => {
          setItemDetails(response?.data);

        })
        .finally(() => {
          setAdminLoading(false);
        });
    }
    setAdminLoading(false);
  }, [userInfo]);
  console.log(itemDetails)
  
  const fetchContentDetails = () => {
    if (userInfo) {
      setAdminLoading(true);
      axios
        .get(
          `${process.env.REACT_APP_SERVERLESS_API}/api/v1/language/getItemDetailsByOrganizationAndName/schedule/organizationsId/${userInfo?.organizationId}`
        )
        .then((response) => {
          setItemDetails(response?.data);
        })
        .finally(() => {
          setAdminLoading(false);
        });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.target;

    const newMyScheduleName = form.mySchedule?.value;
    const newMonthName = form.month?.value;
    const newWeekName = form.week?.value;
    const newDayName = form.day?.value;
    const newListName = form.list?.value;



    const itemDetails = {
      mySchedule: newMyScheduleName,
      month: newMonthName,
      week: newWeekName,
      day: newDayName,
      list: newListName,



    };
    console.log(itemDetails)
    const item = await axios.post(
      `${process.env.REACT_APP_SERVERLESS_API}/api/v1/language/addNavItemsDetails/schedule/organizationId/${userInfo?.organizationId}`,
      itemDetails
    );
    console.log(item)
    if (item?.data === "Items Name updated successfully") {
      setItemDetails({ ...itemDetails });
      fetchContentDetails();
      toast.success("Items Name added Successfully");
      form.reset();
    }
  };



  return (
    <div>
      {
        adminLoading ?
          <div className='flex justify-center'>
            <Box sx={{ display: 'flex' }}>
              <CircularProgress />
            </Box>
          </div>
          :
          <form onSubmit={handleSubmit} className='mt-2 border p-4 rounded-xl'>
            <div className=' grid grid-cols-2 gap-4'>

              <div className='flex justify-between items-center w-[100%]'>
                <p className='text-lg font-medium'>My Schedule</p>
                <input name='mySchedule' defaultValue={itemDetails?.mySchedule} type='text' className='border border-slate-300 rounded-lg p-2 w-[300px]' placeholder='Text here' />
              </div>

              <div className='flex justify-between items-center w-[100%]'>
                <p className='text-lg font-medium'>month</p>
                <input name='month' defaultValue={itemDetails?.month} type='text' className='border border-slate-300 rounded-lg p-2 w-[300px]' placeholder='Text here' />
              </div>
              <div className='flex justify-between items-center w-[100%]'>
                <p className='text-lg font-medium'>week</p>
                <input name='week' defaultValue={itemDetails?.week} type='text' className='border border-slate-300 rounded-lg p-2 w-[300px]' placeholder='Text here' />
              </div>
              <div className='flex justify-between items-center w-[100%]'>
                <p className='text-lg font-medium'>day</p>
                <input name='day' defaultValue={itemDetails?.day} type='text' className='border border-slate-300 rounded-lg p-2 w-[300px]' placeholder='Text here' />
              </div>
              <div className='flex justify-between items-center w-[100%]'>
                <p className='text-lg font-medium'>list</p>
                <input name='list' type='text' defaultValue={itemDetails?.list} className='border border-slate-300 rounded-lg p-2 w-[300px]' placeholder='Text here' />
              </div>



            </div>
            <div className="flex items-center justify-center mt-20 mb-10 ">
              <input
                type="submit"
                value="Save"
                className="px-[30px] py-3 bg-[#3E4DAC] hover:bg-opacity-70 text-[#fff] cursor-pointer text-xl font-bold rounded-lg"
              />
            </div>

          </form>
      }
    </div>


  );
};

export default AdminScheduleDetails;