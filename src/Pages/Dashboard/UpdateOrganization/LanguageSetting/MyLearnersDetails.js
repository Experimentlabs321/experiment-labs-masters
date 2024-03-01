//MyLearnersDetails

import React, { useContext, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { AuthContext } from '../../../../contexts/AuthProvider';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import axios from 'axios';


const MyLearnersDetails = () => {
  const { userInfo } = useContext(AuthContext)
  const [adminLoading, setAdminLoading] = useState(false);
  const [itemDetails, setItemDetails] = useState();
  useEffect(() => {
    if (userInfo) {
      setAdminLoading(true);
      axios
        .get(
          `${process.env.REACT_APP_SERVER_API}/api/v1/language/getMyLearnersSubDetailsByOrganizationAndName/myLearners/organizationsId/${userInfo?.organizationId}`
        )
        .then((response) => {

          console.log(response)
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
          `${process.env.REACT_APP_SERVER_API}/api/v1/language/getMyLearnersSubDetailsByOrganizationAndName/myLearners/organizationsId/${userInfo?.organizationId}`
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

    const myLearners = form.myLearners?.value;
    const search = form.search?.value;
    const addLearners = form.addLearners?.value;
    const selectCourse = form.selectCourse?.value;
    const selectBatch = form.selectBatch?.value;
    const selectValidation = form.selectValidation?.value;
    const paid = form.paid?.value;
    const unpaid = form.unpaid?.value;
    const expired = form.expired?.value;
    const name = form.name?.value;
    const email = form.email?.value;
    const phone = form.phone?.value;
    const joiningDate = form.joiningDate?.value;
    const paidOrUnpaid = form.paidOrUnpaid?.value;

    const itemDetail = {

      myLearners: myLearners,
      addLearners: addLearners,
      search: search,
      selectCourse: selectCourse,
      selectBatch: selectBatch,
      selectValidation: selectValidation,
      paid: paid,
      unpaid: unpaid,
      expired: expired,
      name: name,
      email: email,
      phone: phone,
      joiningDate: joiningDate,
      paidOrUnpaid: paidOrUnpaid,

    };
    console.log(itemDetail)
    const item = await axios.post(
      `${process.env.REACT_APP_SERVER_API}/api/v1/language/addMyLearnersSubDetails/myLearners/organizationId/${userInfo?.organizationId}`,
      itemDetail
    );
    console.log(item)
    if (item?.data === "MyLearners SubDetails updated successfully") {
      setItemDetails({ ...itemDetails });
      fetchContentDetails();
      toast.success("Items Names added Successfully");
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
                <p className='text-lg font-medium'>My Learners</p>
                <input name='myLearners' defaultValue={itemDetails?.myLearners} type='text' className='border border-slate-300 rounded-lg p-2 w-[300px]' placeholder='Text here' />
              </div>
              <div className='flex justify-between items-center w-[100%]'>
                <p className='text-lg font-medium'>Add Learners</p>
                <input name='addLearners' defaultValue={itemDetails?.addLearners} type='text' className='border border-slate-300 rounded-lg p-2 w-[300px]' placeholder='Text here' />
              </div>

              <div className='flex justify-between items-center w-[100%]'>
                <p className='text-lg font-medium'>Search</p>
                <input name='search' defaultValue={itemDetails?.search} type='text' className='border border-slate-300 rounded-lg p-2 w-[300px]' placeholder='Text here' />
              </div>
              <div className='flex justify-between items-center w-[100%]'>
                <p className='text-lg font-medium'>Select Course</p>
                <input name='selectCourse' defaultValue={itemDetails?.selectCourse} type='text' className='border border-slate-300 rounded-lg p-2 w-[300px]' placeholder='Text here' />
              </div>
              <div className='flex justify-between items-center w-[100%]'>
                <p className='text-lg font-medium'>Select Batch</p>
                <input name='selectBatch' defaultValue={itemDetails?.selectBatch} type='text' className='border border-slate-300 rounded-lg p-2 w-[300px]' placeholder='Text here' />
              </div>
              <div className='flex justify-between items-center w-[100%]'>
                <p className='text-lg font-medium'>Select Validation</p>
                <input name='selectValidation' defaultValue={itemDetails?.selectValidation} type='text' className='border border-slate-300 rounded-lg p-2 w-[300px]' placeholder='Text here' />
              </div>
              <div className='flex justify-between items-center w-[100%]'>
                <p className='text-lg font-medium'>Paid</p>
                <input name='paid' defaultValue={itemDetails?.paid} type='text' className='border border-slate-300 rounded-lg p-2 w-[300px]' placeholder='Text here' />
              </div>
              <div className='flex justify-between items-center w-[100%]'>
                <p className='text-lg font-medium'>Unpaid</p>
                <input name='unpaid' defaultValue={itemDetails?.unpaid} type='text' className='border border-slate-300 rounded-lg p-2 w-[300px]' placeholder='Text here' />
              </div>
              <div className='flex justify-between items-center w-[100%]'>
                <p className='text-lg font-medium'>Expired</p>
                <input name='expired' defaultValue={itemDetails?.expired} type='text' className='border border-slate-300 rounded-lg p-2 w-[300px]' placeholder='Text here' />
              </div>
              <div className='flex justify-between items-center w-[100%]'>
                <p className='text-lg font-medium'>Name</p>
                <input name='name' defaultValue={itemDetails?.name} type='text' className='border border-slate-300 rounded-lg p-2 w-[300px]' placeholder='Text here' />
              </div>
              <div className='flex justify-between items-center w-[100%]'>
                <p className='text-lg font-medium'>Email</p>
                <input name='email' defaultValue={itemDetails?.email} type='text' className='border border-slate-300 rounded-lg p-2 w-[300px]' placeholder='Text here' />
              </div>
              <div className='flex justify-between items-center w-[100%]'>
                <p className='text-lg font-medium'>phone</p>
                <input name='phone' defaultValue={itemDetails?.phone} type='text' className='border border-slate-300 rounded-lg p-2 w-[300px]' placeholder='Text here' />
              </div>
              <div className='flex justify-between items-center w-[100%]'>
                <p className='text-lg font-medium'>Joining Date</p>
                <input name='joiningDate' defaultValue={itemDetails?.joiningDate} type='text' className='border border-slate-300 rounded-lg p-2 w-[300px]' placeholder='Text here' />
              </div>
              <div className='flex justify-between items-center w-[100%]'>
                <p className='text-lg font-medium'>Paid/Unpaid</p>
                <input name='paidOrUnpaid' defaultValue={itemDetails?.paidOrUnpaid} type='text' className='border border-slate-300 rounded-lg p-2 w-[300px]' placeholder='Text here' />
              </div>



            </div>
            <div className="flex items-center justify-center mt-20 mb-10">
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

export default MyLearnersDetails;