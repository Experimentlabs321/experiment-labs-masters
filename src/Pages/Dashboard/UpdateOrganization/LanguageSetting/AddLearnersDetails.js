//AddLearnersDetails


import React, { useContext, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { AuthContext } from '../../../../contexts/AuthProvider';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import axios from 'axios';


const AddLearnersDetails = () => {
  const { userInfo } = useContext(AuthContext)
  const [adminLoading, setAdminLoading] = useState(false);
  const [itemDetails, setItemDetails] = useState();
  useEffect(() => {
    if (userInfo) {
      setAdminLoading(true);
      axios
        .get(
          `${process.env.REACT_APP_SERVER_API}/api/v1/language/getMyLearnersSubDetailsByOrganizationAndName/addLearners/organizationsId/${userInfo?.organizationId}`
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
          `${process.env.REACT_APP_SERVER_API}/api/v1/language/getMyLearnersSubDetailsByOrganizationAndName/addLearners/organizationsId/${userInfo?.organizationId}`
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

    const addStudent = form.addStudent?.value;
    const bulkUpload = form.bulkUpload?.value;
    const selectCourse = form.selectCourse?.value;
    const studentName = form.studentName?.value;
    const studentEmail = form.studentEmail?.value;
    const studentPhoneNumber = form.studentPhoneNumber?.value;
    const studentStatus = form.studentStatus?.value;
    const free = form.free?.value;
    const paid = form.paid?.value;


    const itemDetail = {

      addStudent: addStudent,
      bulkUpload: bulkUpload,
      selectCourse: selectCourse,
      studentName: studentName,
      studentEmail: studentEmail,
      studentPhoneNumber: studentPhoneNumber,
      studentStatus: studentStatus,
      free: free,
      paid: paid,


    };
    console.log(itemDetail)
    const item = await axios.post(
      `${process.env.REACT_APP_SERVER_API}/api/v1/language/addMyLearnersSubDetails/addLearners/organizationId/${userInfo?.organizationId}`,
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
          <form onSubmit={handleSubmit} className='mt-2 border p-4 rounded-xl '>
            <div className='grid grid-cols-2 gap-4'>

              <div className='flex justify-between items-center w-[100%]'>
                <p className='text-lg font-medium'>Add Student</p>
                <input name='addStudent' defaultValue={itemDetails?.addStudent} type='text' className='border border-slate-300 rounded-lg p-2 w-[300px]' placeholder='Text here' />
              </div>
              <div className='flex justify-between items-center w-[100%]'>
                <p className='text-lg font-medium'>Bulk Upload</p>
                <input name='bulkUpload' defaultValue={itemDetails?.bulkUpload} type='text' className='border border-slate-300 rounded-lg p-2 w-[300px]' placeholder='Text here' />
              </div>
              <div className='flex justify-between items-center w-[100%]'>
                <p className='text-lg font-medium'>Select Course</p>
                <input name='selectCourse' defaultValue={itemDetails?.selectCourse} type='text' className='border border-slate-300 rounded-lg p-2 w-[300px]' placeholder='Text here' />
              </div>
              <div className='flex justify-between items-center w-[100%]'>
                <p className='text-lg font-medium'>Student Name</p>
                <input name='studentName' defaultValue={itemDetails?.studentName} type='text' className='border border-slate-300 rounded-lg p-2 w-[300px]' placeholder='Text here' />
              </div>
              <div className='flex justify-between items-center w-[100%]'>
                <p className='text-lg font-medium'>Student Email</p>
                <input name='studentEmail' defaultValue={itemDetails?.studentEmail} type='text' className='border border-slate-300 rounded-lg p-2 w-[300px]' placeholder='Text here' />
              </div>
              <div className='flex justify-between items-center w-[100%]'>
                <p className='text-lg font-medium'>Student Phone Number</p>
                <input name='studentPhoneNumber' defaultValue={itemDetails?.studentPhoneNumber} type='text' className='border border-slate-300 rounded-lg p-2 w-[300px]' placeholder='Text here' />
              </div>
              <div className='flex justify-between items-center w-[100%]'>
                <p className='text-lg font-medium'>Student Status</p>
                <input name='studentStatus' defaultValue={itemDetails?.studentStatus} type='text' className='border border-slate-300 rounded-lg p-2 w-[300px]' placeholder='Text here' />
              </div>
              <div className='flex justify-between items-center w-[100%]'>
                <p className='text-lg font-medium'>Free</p>
                <input name='free' defaultValue={itemDetails?.free} type='text' className='border border-slate-300 rounded-lg p-2 w-[300px]' placeholder='Text here' />
              </div>

              <div className='flex justify-between items-center w-[100%]'>
                <p className='text-lg font-medium'>Paid</p>
                <input name='paid' defaultValue={itemDetails?.paid} type='text' className='border border-slate-300 rounded-lg p-2 w-[300px]' placeholder='Text here' />
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

export default AddLearnersDetails;