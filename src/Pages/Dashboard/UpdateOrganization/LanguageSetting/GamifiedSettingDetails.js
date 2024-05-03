//GamifiedSettingDetails


import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { AuthContext } from '../../../../contexts/AuthProvider';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';


const GamifiedSettingDetails = () => {
    const { userInfo } = useContext(AuthContext)
    const [adminLoading, setAdminLoading] = useState(false);
    const [itemDetails, setItemDetails] = useState();
     useEffect(() => {
        if (userInfo) {
            setAdminLoading(true);
            axios
                .get(
                    `${process.env.REACT_APP_SERVERLESS_API}/api/v1/language/getPointsAndRedemptionsSubDetailsByOrganizationAndName/gamifiedSetting/organizationsId/${userInfo?.organizationId}`
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
                    `${process.env.REACT_APP_SERVERLESS_API}/api/v1/language/getPointsAndRedemptionsSubDetailsByOrganizationAndName/gamifiedSetting/organizationsId/${userInfo?.organizationId}`
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
        const newPointNameName = form.pointName?.value;
        const newPointStartOnName = form.pointStartOn?.value;
        const newPointsExpireOnName = form.pointsExpireOn?.value;
        const newPointCurrencyName = form.pointCurrency?.value;
        const newPointValueName = form.pointValue?.value;
        const newMaxResearchablePointName = form.maxResearchablePoint?.value;
        const newMaxRedeemablePointsName = form.maxRedeemablePoints?.value;
        const newMinResearchablePointName = form.minResearchablePoint?.value;
        const newMinPointsForRedemptionName = form.minPointsForRedemption?.value;
        const newSubmitName = form.submit?.value;
        const newDiscordName = form.discord?.value;
        const newPaymentGatewaysName = form.paymentGateways?.value;


        const itemDetail = {
            pointsAndRedemptions: newPointsAndRedemptionsName,
            search: newSearchName,
            pointName: newPointNameName,
            pointStartOn: newPointStartOnName,
            pointsExpireOn: newPointsExpireOnName,
            pointCurrency: newPointCurrencyName,
            pointValue: newPointValueName,
            maxResearchablePoint: newMaxResearchablePointName,
            maxRedeemablePoints: newMaxRedeemablePointsName,
            minResearchablePoint: newMinResearchablePointName,
            minPointsForRedemption: newMinPointsForRedemptionName,
            submit: newSubmitName,
            discord: newDiscordName,
            paymentGateways: newPaymentGatewaysName,


        };
        console.log(itemDetail)
        const item = await axios.post(
            `${process.env.REACT_APP_SERVERLESS_API}/api/v1/language/addPointsAndRedemptionsSubDetails/gamifiedSetting/organizationId/${userInfo?.organizationId}`,
            itemDetail
        );
        console.log(item)
        if (item?.data === "Points And RedemptionsSubDetails updated successfully") {
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
                                <p className='text-lg font-medium'>Points And Redemptions</p>
                                <input name='pointsAndRedemptions' defaultValue={itemDetails?.pointsAndRedemptions} type='text' className='border border-slate-300 rounded-lg p-2 w-[300px]' placeholder='Text here' />
                            </div>
                            <div className='flex justify-between items-center w-[100%]'>
                                <p className='text-lg font-medium'>Search</p>
                                <input name='search' defaultValue={itemDetails?.search} type='text' className='border border-slate-300 rounded-lg p-2 w-[300px]' placeholder='Text here' />
                            </div>
                            <div className='flex justify-between items-center w-[100%]'>
                                <p className='text-lg font-medium'>Point Name</p>
                                <input name='pointName' defaultValue={itemDetails?.pointName} type='text' className='border border-slate-300 rounded-lg p-2 w-[300px]' placeholder='Text here' />
                            </div>
                            <div className='flex justify-between items-center w-[100%]'>
                                <p className='text-lg font-medium'>Point Start On</p>
                                <input name='pointStartOn' defaultValue={itemDetails?.pointStartOn} type='text' className='border border-slate-300 rounded-lg p-2 w-[300px]' placeholder='Text here' />
                            </div>
                            <div className='flex justify-between items-center w-[100%]'>
                                <p className='text-lg font-medium'>Points Expire On</p>
                                <input name='pointsExpireOn' defaultValue={itemDetails?.pointsExpireOn} type='text' className='border border-slate-300 rounded-lg p-2 w-[300px]' placeholder='Text here' />
                            </div>               
                            <div className='flex justify-between items-center w-[100%]'>
                                <p className='text-lg font-medium'>Point Currency</p>
                                <input name='pointCurrency' defaultValue={itemDetails?.pointCurrency} type='text' className='border border-slate-300 rounded-lg p-2 w-[300px]' placeholder='Text here' />
                            </div>
                            <div className='flex justify-between items-center w-[100%]'>
                                <p className='text-lg font-medium'>Point Value</p>
                                <input name='pointValue' defaultValue={itemDetails?.pointValue} type='text' className='border border-slate-300 rounded-lg p-2 w-[300px]' placeholder='Text here' />
                            </div>
                            <div className='flex justify-between items-center w-[100%]'>
                                <p className='text-lg font-medium'>Max Researchable Point</p>
                                <input name='maxResearchablePoint' defaultValue={itemDetails?.maxResearchablePoint} type='text' className='border border-slate-300 rounded-lg p-2 w-[300px]' placeholder='Text here' />
                            </div>
                            <div className='flex justify-between items-center w-[100%]'>
                                <p className='text-lg font-medium'>Max Redeemable Points</p>
                                <input name='maxRedeemablePoints' defaultValue={itemDetails?.maxRedeemablePoints} type='text' className='border border-slate-300 rounded-lg p-2 w-[300px]' placeholder='Text here' />
                            </div>
                            <div className='flex justify-between items-center w-[100%]'>
                                <p className='text-lg font-medium'>Min Researchable Point</p>
                                <input name='minResearchablePoint' defaultValue={itemDetails?.minResearchablePoint} type='text' className='border border-slate-300 rounded-lg p-2 w-[300px]' placeholder='Text here' />
                            </div>
                            <div className='flex justify-between items-center w-[100%]'>
                                <p className='text-lg font-medium'>Min Points for Redemption</p>
                                <input name='minPointsForRedemption' defaultValue={itemDetails?.minPointsForRedemption} type='text' className='border border-slate-300 rounded-lg p-2 w-[300px]' placeholder='Text here' />
                            </div>
                            <div className='flex justify-between items-center w-[100%]'>
                                <p className='text-lg font-medium'>Submit</p>
                                <input name='submit' defaultValue={itemDetails?.submit} type='text' className='border border-slate-300 rounded-lg p-2 w-[300px]' placeholder='Text here' />
                            </div>
                            <div className='flex justify-between items-center w-[100%]'>
                                <p className='text-lg font-medium'>Discord</p>
                                <input name='discord' defaultValue={itemDetails?.discord} type='text' className='border border-slate-300 rounded-lg p-2 w-[300px]' placeholder='Text here' />
                            </div>
                            <div className='flex justify-between items-center w-[100%]'>
                                <p className='text-lg font-medium'>Payment Gateways</p>
                                <input name='paymentGateways' defaultValue={itemDetails?.paymentGateways} type='text' className='border border-slate-300 rounded-lg p-2 w-[300px]' placeholder='Text here' />
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

export default GamifiedSettingDetails;