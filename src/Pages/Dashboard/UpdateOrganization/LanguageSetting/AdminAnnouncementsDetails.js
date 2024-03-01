//AdminAnnouncementsDetails

import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../../contexts/AuthProvider';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import axios from 'axios';
import toast from 'react-hot-toast';

const AdminAnnouncementsDetails = () => {

  const { userInfo } = useContext(AuthContext)
  const [adminLoading, setAdminLoading] = useState(false);
  const [itemDetails, setItemDetails] = useState();
  useEffect(() => {
    if (userInfo) {
      setAdminLoading(true);
      axios
        .get(
          `${process.env.REACT_APP_SERVER_API}/api/v1/language/getItemDetailsByOrganizationAndName/announcements/organizationsId/${userInfo?.organizationId}`
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
                `${process.env.REACT_APP_SERVER_API}/api/v1/language/getItemDetailsByOrganizationAndName/announcements/organizationsId/${userInfo?.organizationId}`
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

    const newAnnouncementsName = form.announcements?.value;
    const newPublishAnnouncementName = form.publishAnnouncement?.value;
    const title = form.title?.value;
    const description = form.description?.value;
    const urgency = form.urgency?.value;
    const selectUrgency = form.selectUrgency?.value;
    const high = form.high?.value;
    const medium = form.medium?.value;
    const low = form.low?.value;
    const announcementImage = form.announcementImage?.value;
    const publish = form.publish?.value;

    const itemDetail = {
      announcements: newAnnouncementsName,
      publishAnnouncement: newPublishAnnouncementName,
      title: title,
      description: description,
      urgency: urgency,
      selectUrgency: selectUrgency,
      high: high,
      medium: medium,
      low: low,
      announcementImage: announcementImage,
      publish: publish,

    };
    console.log(itemDetail)
    const item = await axios.post(
      `${process.env.REACT_APP_SERVER_API}/api/v1/language/addNavItemsDetails/announcements/organizationId/${userInfo?.organizationId}`,
      itemDetail
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
            <div className='grid grid-cols-2 gap-4'>

              <div className='flex justify-between items-center w-[100%]'>
                <p className='text-lg font-medium'>Announcements</p>
                <input name='announcements' defaultValue={itemDetails?.announcements} type='text' className='border border-slate-300 rounded-lg p-2 w-[300px]' placeholder='Text here' />
              </div>

              <div className='flex justify-between items-center w-[100%] '>
                <p className='text-lg font-medium'>Publish Announcement</p>
                <input name='publishAnnouncement' type='text' defaultValue={itemDetails?.publishAnnouncement}  className='border border-slate-300 rounded-lg p-2 w-[300px]' placeholder='Text here' />
              </div>
              <div className='flex justify-between items-center w-[100%] '>
                <p className='text-lg font-medium'>Title</p>
                <input name='title' type='text' defaultValue={itemDetails?.title}  className='border border-slate-300 rounded-lg p-2 w-[300px]' placeholder='Text here' />
              </div>
              <div className='flex justify-between items-center w-[100%] '>
                <p className='text-lg font-medium'>Description</p>
                <input name='description' type='text' defaultValue={itemDetails?.description}  className='border border-slate-300 rounded-lg p-2 w-[300px]' placeholder='Text here' />
              </div>
              <div className='flex justify-between items-center w-[100%] '>
                <p className='text-lg font-medium'>Urgency</p>
                <input name='urgency' type='text' defaultValue={itemDetails?.urgency}  className='border border-slate-300 rounded-lg p-2 w-[300px]' placeholder='Text here' />
              </div>
              <div className='flex justify-between items-center w-[100%] '>
                <p className='text-lg font-medium'>Select urgency</p>
                <input name='selectUrgency' type='text' defaultValue={itemDetails?.selectUrgency}  className='border border-slate-300 rounded-lg p-2 w-[300px]' placeholder='Text here' />
              </div>
              <div className='flex justify-between items-center w-[100%] '>
                <p className='text-lg font-medium'>High</p>
                <input name='high' type='text' defaultValue={itemDetails?.high}  className='border border-slate-300 rounded-lg p-2 w-[300px]' placeholder='Text here' />
              </div>
              <div className='flex justify-between items-center w-[100%] '>
                <p className='text-lg font-medium'>Medium</p>
                <input name='medium' type='text' defaultValue={itemDetails?.medium}  className='border border-slate-300 rounded-lg p-2 w-[300px]' placeholder='Text here' />
              </div>
              <div className='flex justify-between items-center w-[100%] '>
                <p className='text-lg font-medium'>Low</p>
                <input name='low' type='text' defaultValue={itemDetails?.low}  className='border border-slate-300 rounded-lg p-2 w-[300px]' placeholder='Text here' />
              </div>
              <div className='flex justify-between items-center w-[100%] '>
                <p className='text-lg font-medium'>Announcement Image</p>
                <input name='announcementImage' type='text' defaultValue={itemDetails?.announcementImage}  className='border border-slate-300 rounded-lg p-2 w-[300px]' placeholder='Text here' />
              </div>
              <div className='flex justify-between items-center w-[100%] '>
                <p className='text-lg font-medium'>Publish</p>
                <input name='publish' type='text' defaultValue={itemDetails?.publish}  className='border border-slate-300 rounded-lg p-2 w-[300px]' placeholder='Text here' />
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

export default AdminAnnouncementsDetails;