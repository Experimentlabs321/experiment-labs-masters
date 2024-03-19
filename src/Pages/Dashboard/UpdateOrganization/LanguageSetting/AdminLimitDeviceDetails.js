//AdminLimitDeviceDetails


import React, { useContext, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { AuthContext } from '../../../../contexts/AuthProvider';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import axios from 'axios';


const AdminLimitDeviceDetails = () => {
  const { userInfo } = useContext(AuthContext)
  const [adminLoading, setAdminLoading] = useState(false);
  const [itemDetails, setItemDetails] = useState();
  useEffect(() => {
    if (userInfo) {
      setAdminLoading(true);
      axios
        .get(
          `${process.env.REACT_APP_SERVER_API}/api/v1/language/getUpdateOrganizationSubDetailsByOrganizationAndName/limitDevice/organizationsId/${userInfo?.organizationId}`
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
          `${process.env.REACT_APP_SERVER_API}/api/v1/language/getUpdateOrganizationSubDetailsByOrganizationAndName/limitDevice/organizationsId/${userInfo?.organizationId}`
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

    const deviceLimit = form.deviceLimit?.value;
 
    const save = form.save?.value;
    const updatedSuccessfully = form.updatedSuccessfully?.value;

    const itemDetail = {

      deviceLimit: deviceLimit,
      updatedSuccessfully: updatedSuccessfully,
    
      save: save,

    };
    console.log(itemDetail)
    const item = await axios.post(
      `${process.env.REACT_APP_SERVER_API}/api/v1/language/addUpdateOrganizationSubDetails/limitDevice/organizationId/${userInfo?.organizationId}`,
      itemDetail
    );
    console.log(item)
    if (item?.data === "Update Organization SubDetails updated successfully") {
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
                <p className='text-lg font-medium'>Device Limit</p>
                <input name='deviceLimit' defaultValue={itemDetails?.deviceLimit} type='text' className='border border-slate-300 rounded-lg p-2 w-[300px]' placeholder='Text here' />
              </div>

              <div className='flex justify-between items-center w-[100%]'>
                <p className='text-lg font-medium'>Save</p>
                <input name='save' defaultValue={itemDetails?.save} type='text' className='border border-slate-300 rounded-lg p-2 w-[300px]' placeholder='Text here' />
              </div>
              <div className='flex justify-between items-center w-[100%]'>
                <p className='text-lg font-medium'>Updated successfully!</p>
                <input name='updatedSuccessfully' defaultValue={itemDetails?.updatedSuccessfully} type='text' className='border border-slate-300 rounded-lg p-2 w-[300px]' placeholder='Text here' />
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

export default AdminLimitDeviceDetails;