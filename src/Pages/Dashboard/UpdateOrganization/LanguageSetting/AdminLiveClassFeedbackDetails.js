//AdminLiveClassFeedbackDetails

import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { AuthContext } from '../../../../contexts/AuthProvider';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';


const AdminLiveClassFeedbackDetails = () => {
  const { userInfo } = useContext(AuthContext)
  const [adminLoading, setAdminLoading] = useState(false);
  const [itemDetails, setItemDetails] = useState();
  useEffect(() => {
    if (userInfo) {
      setAdminLoading(true);
      axios
        .get(
          `${process.env.REACT_APP_SERVER_API}/api/v1/language/getFeedbackSubDetailsByOrganizationAndName/liveClassFeedback/organizationsId/${userInfo?.organizationId}`
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
          `${process.env.REACT_APP_SERVER_API}/api/v1/language/getFeedbackSubDetailsByOrganizationAndName/liveClassFeedback/organizationsId/${userInfo?.organizationId}`
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

    const newSelectCourseName = form.selectCourse?.value;
    const newSelectClassName = form.selectClass?.value;
    const newClassNotFoundName = form.classNotFound?.value;
    const newRatingName = form.rating?.value;
    const newTotalStudentsName = form.totalStudents?.value;
    const newThereIsNoResultName = form.thereIsNoResult?.value;
    const newStudentsName = form.students?.value;
    const noCourseAddedYet = form.noCourseAddedYet?.value;
  
    const allComments = form.allComments?.value;
    const studentFeedback = form.studentFeedback?.value;



    const itemDetail = {
      selectCourse: newSelectCourseName,
      selectClass: newSelectClassName,
      classNotFound: newClassNotFoundName,
      rating: newRatingName,
      totalStudents: newTotalStudentsName,
      thereIsNoResult: newThereIsNoResultName,
      students: newStudentsName,
      noCourseAddedYet: noCourseAddedYet,
      
      allComments: allComments,
      studentFeedback: studentFeedback,
    



    };
    console.log(itemDetail)
    const item = await axios.post(
      `${process.env.REACT_APP_SERVER_API}/api/v1/language/addFeedbackSubDetails/liveClassFeedback/organizationId/${userInfo?.organizationId}`,
      itemDetail
    );
    console.log(item)
    if (item?.data === "Feedback SubDetails updated successfully") {
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
                <p className='text-lg font-medium'>Select Course</p>
                <input name='selectCourse' defaultValue={itemDetails?.selectCourse} type='text' className='border border-slate-300 rounded-lg p-2 w-[300px]' placeholder='Text here' />
              </div>
              <div className='flex justify-between items-center w-[100%]'>
                <p className='text-lg font-medium'>Select Class</p>
                <input name='selectClass' defaultValue={itemDetails?.selectClass} type='text' className='border border-slate-300 rounded-lg p-2 w-[300px]' placeholder='Text here' />
              </div>
              <div className='flex justify-between items-center w-[100%]'>
                <p className='text-lg font-medium'>Class not found</p>
                <input name='classNotFound' defaultValue={itemDetails?.classNotFound} type='text' className='border border-slate-300 rounded-lg p-2 w-[300px]' placeholder='Text here' />
              </div>
              <div className='flex justify-between items-center w-[100%]'>
                <p className='text-lg font-medium'>Rating</p>
                <input name='rating' defaultValue={itemDetails?.rating} type='text' className='border border-slate-300 rounded-lg p-2 w-[300px]' placeholder='Text here' />
              </div>
              <div className='flex justify-between items-center w-[100%]'>
                <p className='text-lg font-medium'>Total Students</p>
                <input name='totalStudents' defaultValue={itemDetails?.totalStudents} type='text' className='border border-slate-300 rounded-lg p-2 w-[300px]' placeholder='Text here' />
              </div>
              <div className='flex justify-between items-center w-[100%]'>
                <p className='text-lg font-medium'>There is no Result</p>
                <input name='thereIsNoResult' defaultValue={itemDetails?.thereIsNoResult} type='text' className='border border-slate-300 rounded-lg p-2 w-[300px]' placeholder='Text here' />
              </div>
              <div className='flex justify-between items-center w-[100%]'>
                <p className='text-lg font-medium'>Students</p>
                <input name='students' type='text' defaultValue={itemDetails?.students} className='border border-slate-300 rounded-lg p-2 w-[300px]' placeholder='Text here' />
              </div>
              <div className='flex justify-between items-center w-[100%]'>
                <p className='text-lg font-medium'>No course added yet!</p>
                <input name='noCourseAddedYet' type='text' defaultValue={itemDetails?.noCourseAddedYet} className='border border-slate-300 rounded-lg p-2 w-[300px]' placeholder='Text here' />
              </div>
             
              <div className='flex justify-between items-center w-[100%]'>
                <p className='text-lg font-medium'>All Comments</p>
                <input name='allComments' type='text' defaultValue={itemDetails?.allComments} className='border border-slate-300 rounded-lg p-2 w-[300px]' placeholder='Text here' />
              </div>
              <div className='flex justify-between items-center w-[100%]'>
                <p className='text-lg font-medium'>Student Feedback</p>
                <input name='studentFeedback' type='text' defaultValue={itemDetails?.studentFeedback} className='border border-slate-300 rounded-lg p-2 w-[300px]' placeholder='Text here' />
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

export default AdminLiveClassFeedbackDetails;