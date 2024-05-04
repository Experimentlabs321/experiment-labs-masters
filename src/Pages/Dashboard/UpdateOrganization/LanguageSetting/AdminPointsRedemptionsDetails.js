//AdminPointsRedemptionsDetails

import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../../contexts/AuthProvider';
import axios from 'axios';
import toast from 'react-hot-toast';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';


const AdminPointsRedemptionsDetails = () => {
  const { userInfo } = useContext(AuthContext)
  const [adminLoading, setAdminLoading] = useState(false);
  const [itemDetails, setItemDetails] = useState();

  useEffect(() => {
    if (userInfo) {
      setAdminLoading(true);
      axios
        .get(
          `${process.env.REACT_APP_SERVERLESS_API}/api/v1/language/getItemDetailsByOrganizationAndName/pointsAndRedemptions/organizationsId/${userInfo?.organizationId}`
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
          `${process.env.REACT_APP_SERVERLESS_API}/api/v1/language/getItemDetailsByOrganizationAndName/pointsAndRedemptions/organizationsId/${userInfo?.organizationId}`
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

    const newPointsAndRedemptionsName = form.pointsAndRedemptions?.value;
    const newSearchName = form.search?.value;
    const newShowPointsAndRedemptionsName = form.showPointsAndRedemptions?.value;
    const newGamifiedSettingName = form.gamifiedSetting?.value;
    const newEarningLogicName = form.earningLogic?.value;
    const newRedemptionLogicName = form.redemptionLogic?.value;
    const show = form.show?.value;
    const remove = form.remove?.value;


    const itemDetails = {
      pointsAndRedemptions: newPointsAndRedemptionsName,
      search: newSearchName,
      showPointsAndRedemptions: newShowPointsAndRedemptionsName,
      gamifiedSetting: newGamifiedSettingName,
      earningLogic: newEarningLogicName,
      redemptionLogic: newRedemptionLogicName,
      show: show,
      remove: remove,


    };
    console.log(itemDetails)
    const item = await axios.post(
      `${process.env.REACT_APP_SERVERLESS_API}/api/v1/language/addNavItemsDetails/pointsAndRedemptions/organizationId/${userInfo?.organizationId}`,
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
          <form onSubmit={handleSubmit} className='mt-2 border p-4 rounded-xl '>
            <div className='grid grid-cols-2 gap-4'>
              <div className='flex justify-between items-center w-[100%]'>
                <p className='text-lg font-medium'>Points And Redemptions</p>
                <input name='pointsAndRedemptions' defaultValue={itemDetails?.pointsAndRedemptions} type='text' className='border border-slate-300 rounded-lg p-2 w-[300px]' placeholder='Text here' />
              </div>

              <div className='flex justify-between items-center w-[100%] '>
                <p className='text-lg font-medium'>Search</p>
                <input name='search' type='text' defaultValue={itemDetails?.search} className='border border-slate-300 rounded-lg p-2 w-[300px]' placeholder='Text here' />
              </div>
              <div className='flex justify-between items-center w-[100%] '>
                <p className='text-lg font-medium'>Show Points And Redemptions</p>
                <input name='showPointsAndRedemptions' type='text' defaultValue={itemDetails?.showPointsAndRedemptions} className='border border-slate-300 rounded-lg p-2 w-[300px]' placeholder='Text here' />
              </div>
              <div className='flex justify-between items-center w-[100%] '>
                <p className='text-lg font-medium'>Gamified Setting</p>
                <input name='gamifiedSetting' type='text' defaultValue={itemDetails?.gamifiedSetting} className='border border-slate-300 rounded-lg p-2 w-[300px]' placeholder='Text here' />
              </div>
              <div className='flex justify-between items-center w-[100%] '>
                <p className='text-lg font-medium'>Earning Logic</p>
                <input name='earningLogic' type='text' defaultValue={itemDetails?.earningLogic} className='border border-slate-300 rounded-lg p-2 w-[300px]' placeholder='Text here' />
              </div>
              <div className='flex justify-between items-center w-[100%] '>
                <p className='text-lg font-medium'>Redemption Logic</p>
                <input name='redemptionLogic' type='text' defaultValue={itemDetails?.redemptionLogic} className='border border-slate-300 rounded-lg p-2 w-[300px]' placeholder='Text here' />
              </div>
              <div className='flex justify-between items-center w-[100%] '>
                <p className='text-lg font-medium'>Show</p>
                <input name='show' type='text' defaultValue={itemDetails?.show} className='border border-slate-300 rounded-lg p-2 w-[300px]' placeholder='Text here' />
              </div>
              <div className='flex justify-between items-center w-[100%] '>
                <p className='text-lg font-medium'>Remove</p>
                <input name='remove' type='text' defaultValue={itemDetails?.remove} className='border border-slate-300 rounded-lg p-2 w-[300px]' placeholder='Text here' />
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

export default AdminPointsRedemptionsDetails;