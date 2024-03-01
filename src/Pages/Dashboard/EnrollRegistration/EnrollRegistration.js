import React, { useContext, useEffect, useState } from 'react';
import Layout from '../Layout';
import Badge from '@mui/material/Badge';
import MailIcon from '@mui/icons-material/Mail';
import SearchIcon from '@mui/icons-material/Search';
import NotificationsIcon from '@mui/icons-material/Notifications';
import CallIcon from "@mui/icons-material/Call";
import gameplay from '../../../assets/EnrollRegistration/gameplay.png'
import ApplePay from '../../../assets/EnrollRegistration/ApplePay.png'
import Visa from '../../../assets/EnrollRegistration/Visa.png'
import GooglePay from '../../../assets/EnrollRegistration/GooglePay.png'
import Paypal from '../../../assets/EnrollRegistration/Paypal.png'
import SamsungPay from '../../../assets/EnrollRegistration/SamsungPay.png'
import AmazonPay from '../../../assets/EnrollRegistration/AmazonPay.png'
import Maestro from '../../../assets/EnrollRegistration/Maestro.png'
import { Button } from 'react-scroll';
import axios from 'axios';
import { AuthContext } from '../../../contexts/AuthProvider';

const EnrollRegistration = () => {
    const [maxResearchablePoint, setMaxResearchablePoint] = useState(0);
    const [minResearchablePoint, setMinResearchablePoint] = useState(0);
    const [pointValue, setpointValue] = useState(0);
    const [maxRedeemablePoints, setmaxRedeemablePoints] = useState(0);
    const [minRedeemablePoints, setminRedeemablePoints] = useState(0);

    const [checkedOption, setCheckedOption] = useState('');
    const [loading, setLoading] = useState(false);
    const [itemDetails, setItemDetails] = useState();
    const { userInfo } = useContext(AuthContext)
    useEffect(() => {
        if (userInfo) {
            setLoading(true);
            axios
                .get(
                    `${process.env.REACT_APP_SERVER_API}/api/v1/language/getPointsAndRedemptionsSubDetailsByOrganizationAndName/gamifiedSetting/organizationsId/${userInfo?.organizationId}`
                )
                .then((response) => {

                    console.log(response)
                    setItemDetails(response?.data);

                })
                .finally(() => {
                    setLoading(false);
                });
        }
        setLoading(false);
    }, [userInfo]);
  //  console.log(itemDetails)

    const handleCheckboxChange = (option) => {
        setCheckedOption(option);
    };



    return (
        <div>
            <Layout>

                <div className='flex items-center justify-center gap-7 pt-20 lg:pt-10'>
                    <div className="UserManagement origin-top-left rotate-[-0.51deg] text-zinc-500 text-[30px] font-medium">
                        {
                            itemDetails?.pointsAndRedemptions ? itemDetails?.pointsAndRedemptions : "Points And Redemptions"
                        }
                    </div>
                    <div className="Input w-[425px] h-16 relative bg-slate-100 rounded-[40px] shadow-inner">
                        <input className="Search w-[329px] left-[32px] top-[12px] absolute text-zinc-500 text-[20px] font-light leading-10 bg-transparent focus:outline-0" placeholder='Search' />
                        <div className="Button w-10 h-10 left-[373px] top-[12px] absolute bg-zinc-500 rounded-[32px] shadow">
                            <SearchIcon className="Search1 w-6 h-6 left-[8px] top-[8px] absolute text-white" />
                        </div>
                    </div>
                    {/*    <Badge badgeContent={1} color='error'>
                        <NotificationsIcon color="action" />
                    </Badge> */}
                </div>
                <form className='lg:ms-20 mt-20'>
                    <div class="lg:grid grid-cols-3 gap-5">
                        <div class="">
                            <div className='flex  items-center'>
                                <p className='font-bold text-base me-[53px]'>
                                    {
                                        itemDetails?.pointName ? itemDetails?.pointName : "Point Name"
                                    }
                                </p>
                                <input className='border rounded-lg w-[50%] h-[40px] ps-2 text-[#535353] focus:outline-0' type="text" placeholder='Point Name' ></input>
                            </div>
                            <div className='mt-6 flex  items-center'>
                                <p className='font-bold text-base me-[36px]'>
                                    {
                                        itemDetails?.pointStartOn ? itemDetails?.pointStartOn : "Point Start On"
                                    }
                                </p>
                                <input className='border rounded-lg w-[50%] h-[40px] ps-2 text-[#535353] focus:outline-0 ' type="date" ></input>
                            </div>
                            <div className='mt-6 flex  items-center '>
                                <p className='font-bold text-base me-[30px]'>
                                    {
                                        itemDetails?.pointCurrency ? itemDetails?.pointCurrency : "Point Currency"
                                    }
                                </p>

                                <div className=" flex gap-2  border  rounded-lg h-[40px] w-[70px] px-2 text-[#535353] ">

                                    <select
                                        required
                                        className="w-full border-0 focus:outline-0"
                                        name="option"
                                        id="option"
                                    >
                                        <option className="" value="Student">IND</option>
                                        <option value="Parent"></option>
                                        <option value="Counselor"></option>
                                        <option value="Others"></option>
                                    </select>
                                </div>
                            </div>
                            <div className='flex justify-between w-full mt-6 items-center'>
                                <p className='font-bold text-base me-5'>
                                    {
                                        itemDetails?.maxResearchablePoint ? itemDetails?.maxResearchablePoint : "Max Researchable Point"
                                    }
                                </p>
                                <div className="text-[18px] w-[40%]  h-[40px] flex  ">
                                    <button style={{ boxShadow: " 0px 0px 16px -2px rgba(0, 0, 0, 0.50)" }} className=' border w-[50%] text-[#000000] rounded-s-full text-center' onClick={() => setMaxResearchablePoint(maxResearchablePoint - 1)}>-</button>
                                    <span className='w-[40%] flex justify-center items-center'> {maxResearchablePoint} </span>
                                    <button style={{ boxShadow: " 0px 0px 16px -2px rgba(0, 0, 0, 0.50)" }} className='border w-[50%] text-[#000000] rounded-e-full text-center' onClick={() => setMaxResearchablePoint(maxResearchablePoint + 1)}>+</button>
                                </div>
                            </div>
                            <div className='flex justify-between mt-6 items-center'>
                                <p className='font-bold text-base me-5'>
                                    {
                                        itemDetails?.minResearchablePoint ? itemDetails?.minResearchablePoint : "Min Researchable Point"
                                    }
                                </p>
                                <div className="text-[18px]  w-[40%]  h-[40px] flex ">
                                    <button style={{ boxShadow: " 0px 0px 16px -2px rgba(0, 0, 0, 0.50)" }} className=' border w-[50%] text-[#000000] rounded-s-full text-center' onClick={() => setMinResearchablePoint(minResearchablePoint - 1)}>-</button>
                                    <span className=' w-[40%]  flex justify-center items-center'> {minResearchablePoint} </span>
                                    <button style={{ boxShadow: " 0px 0px 16px -2px rgba(0, 0, 0, 0.50)" }} className=' border w-[50%] text-[#000000] rounded-e-full text-center' onClick={() => setMinResearchablePoint(minResearchablePoint + 1)}>+</button>
                                </div>
                            </div>
                        </div>

                        <div class="mt-16">
                            <div className='flex justify-between items-center'>
                                <p className='font-bold text-base me-[36px]'>
                                    {
                                        itemDetails?.pointsExpireOn ? itemDetails?.pointsExpireOn : "Points Expire On"
                                    }
                                </p>

                                <input className='border rounded-lg w-[50%]  h-[40px] ps-2 text-[#535353] focus:outline-0' type="date" ></input>
                            </div>
                            <div className='flex mt-6 justify-between items-center'>
                                <p className='font-bold text-base me-5'>
                                    {
                                        itemDetails?.pointValue ? itemDetails?.pointValue : "Point Value"
                                    }
                                </p>
                                <div className="text-[18px] w-[40%] h-[40px] flex ">
                                    <button style={{ boxShadow: " 0px 0px 16px -2px rgba(0, 0, 0, 0.50)" }} className=' border w-[50%] text-[#000000] rounded-s-full text-center' onClick={() => setpointValue(pointValue - 1)}>-</button>
                                    <span className='w-[40%] flex justify-center items-center'> {pointValue} </span>
                                    <button style={{ boxShadow: " 0px 0px 16px -2px rgba(0, 0, 0, 0.50)" }} className=' border w-[50%] text-[#000000] rounded-e-full text-center' onClick={() => setpointValue(pointValue + 1)}>+</button>
                                </div>
                            </div>
                            <div className='flex justify-between mt-6 items-center'>
                                <p className='font-bold text-base '>
                                    {
                                        itemDetails?.maxRedeemablePoints ? itemDetails?.maxRedeemablePoints : "Max Redeemable Points"
                                    }
                                </p>
                                <div className="text-[18px] w-[40%] h-[40px] flex ">
                                    <button style={{ boxShadow: " 0px 0px 16px -2px rgba(0, 0, 0, 0.50)" }} className=' border w-[50%] text-[#000000] rounded-s-full text-center' onClick={() => setmaxRedeemablePoints(maxRedeemablePoints - 1)}>-</button>
                                    <span className='w-[40%] flex justify-center items-center'> {maxRedeemablePoints} </span>
                                    <button style={{ boxShadow: " 0px 0px 16px -2px rgba(0, 0, 0, 0.50)" }} className=' border w-[50%] text-[#000000] rounded-e-full text-center' onClick={() => setmaxRedeemablePoints(maxRedeemablePoints + 1)}>+</button>
                                </div>
                            </div>
                            <div className='flex justify-between mt-6 items-center'>
                                <p className='font-bold text-base '>
                                    {
                                        itemDetails?.minPointsForRedemption ? itemDetails?.minPointsForRedemption : "Min Points for Redemption"
                                    }
                                    </p>
                                <div className="text-[18px] w-[40%]  h-[40px] flex ">
                                    <button style={{ boxShadow: " 0px 0px 16px -2px rgba(0, 0, 0, 0.50)" }} className=' border w-[50%] text-[#000000] rounded-s-full text-center' onClick={() => setminRedeemablePoints(minRedeemablePoints - 1)}>-</button>
                                    <span className='w-[40%] flex justify-center items-center'> {minRedeemablePoints} </span>
                                    <button style={{ boxShadow: " 0px 0px 16px -2px rgba(0, 0, 0, 0.50)" }} className=' border w-[50%] text-[#000000] rounded-e-full text-center' onClick={() => setminRedeemablePoints(minRedeemablePoints + 1)}>+</button>
                                </div>
                            </div>
                        </div>
                        <div class="row-span-3  flex flex-col lg:w-[70%] lg:mt-16 ">
                            <div className='flex justify-center'>
                                <img src={gameplay} alt=''></img>
                            </div>
                            <div className='flex gap-5 justify-center mt-5'>
                                <input className='bg-[#2EB0FB] px-4 py-2 rounded-lg text-[#FFFFFF] font-semibold text-base' style={{ boxShadow: "rgba(0, 0, 0, 0.75) 0px 3px 8px" }} type='submit' value={
                                        itemDetails?.submit ? itemDetails?.submit : "submit"
                                    }/>
                                <p className='text-[#808080] px-4 py-2 rounded-lg  font-semibold text-base ' style={{ border: "2px solid #808080", boxShadow: "rgba(0, 0, 0, 0.75) 0px 3px 8px" }} >
                                    {itemDetails?.discord ? itemDetails?.discord : "discord"}
                                    </p>
                            </div>

                            {/*  <div className='flex gap-4 w-full justify-center mt-5'>
                                <button className='bg-[#2EB0FB] px-4 py-2 rounded-lg text-[#FFFFFF] font-semibold text-base  ' style={{boxShadow: "rgba(0, 0, 0, 0.75) 0px 3px 8px"}}>Save Point</button>
                                <button className='text-[#808080] px-4 py-2 rounded-lg  font-semibold text-base ' style={{ border: "2px solid #808080",boxShadow: "rgba(0, 0, 0, 0.75) 0px 3px 8px" }} >Discard</button>
                            </div> */}
                        </div>

                        <div className="col-span-3 p-5 w-[80%]  border-2 rounded-2xl  text-center my-5">
                            <h3 className='font-bold mb-3'>
                            {
                                        itemDetails?.paymentGateways ? itemDetails?.paymentGateways : "Payment Gateways"
                                    }
                                </h3>
                            <div className='lg:flex justify-between'>
                                {/*  <div className='flex justify-between'>
                                    <input type="checkbox" id="" name="" value="" />
                                    
                                </div> */}
                                <div className='flex '>
                                    <input className='' type="checkbox" checked={checkedOption === 'ApplePay'} onChange={() => handleCheckboxChange('ApplePay')} id="" name="" value="" />
                                    <img src={ApplePay} alt='ApplePay'></img>
                                </div>
                                <div className='flex '>
                                    <input className='' type="checkbox" checked={checkedOption === 'Visa'} onChange={() => handleCheckboxChange('Visa')} id="" name="" value="" />
                                    <img src={Visa} alt='Visa'></img>
                                </div>
                                <div className='flex justify-between'>
                                    <input className='' type="checkbox" checked={checkedOption === 'GooglePay'} onChange={() => handleCheckboxChange('GooglePay')} id="" name="" value="" />
                                    <img src={GooglePay} alt='GooglePay'></img>
                                </div>
                                <div className='flex justify-between'>
                                    <input className='' type="checkbox" checked={checkedOption === 'Paypal'} onChange={() => handleCheckboxChange('Paypal')} id="" name="" value="" />
                                    <img src={Paypal} alt='Paypal'></img>
                                </div>
                                <div className='flex justify-between'>
                                    <input className='' type="checkbox" checked={checkedOption === 'SamsungPay'} onChange={() => handleCheckboxChange('SamsungPay')} id="" name="" value="" />
                                    <img src={SamsungPay} alt='SamsungPay'></img>
                                </div>
                                <div className='flex justify-between'>
                                    <input className='' type="checkbox" checked={checkedOption === 'AmazonPay'} onChange={() => handleCheckboxChange('AmazonPay')} id="" name="" value="" />
                                    <img src={AmazonPay} alt='AmazonPay'></img>
                                </div>
                                <div className='flex '>
                                    <input className='' type="checkbox" checked={checkedOption === 'Maestro'} onChange={() => handleCheckboxChange('Maestro')} id="" name="" value="" />
                                    <img src={Maestro} alt='Maestro'></img>
                                </div>
                            </div>
                            {/*  <img src={payment}></img> */}
                        </div>

                    </div>


                </form>


            </Layout>
        </div>
    );
};

export default EnrollRegistration;