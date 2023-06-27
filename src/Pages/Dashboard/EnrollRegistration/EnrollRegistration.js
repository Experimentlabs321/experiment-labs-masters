import React, { useState } from 'react';
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

const EnrollRegistration = () => {
    const [count, setCount] = useState(0);
    return (
        <div>
            <Layout>

                <div className='flex items-center justify-center gap-7 mt-20 lg:mt-10'>
                    <div className="UserManagement origin-top-left rotate-[-0.51deg] text-zinc-500 text-[30px] font-medium">Points And Redemptions</div>
                    <div className="Input w-[425px] h-16 relative bg-slate-100 rounded-[40px] shadow-inner">
                        <input className="Search w-[329px] left-[32px] top-[12px] absolute text-zinc-500 text-[20px] font-light leading-10 bg-transparent" placeholder='Search' />
                        <div className="Button w-10 h-10 left-[373px] top-[12px] absolute bg-zinc-500 rounded-[32px] shadow">
                            <SearchIcon className="Search1 w-6 h-6 left-[8px] top-[8px] absolute text-white" />
                        </div>
                    </div>
                    <Badge badgeContent={1} color='error'>
                        <NotificationsIcon color="action" />
                    </Badge>
                </div>
                <div className='lg:ms-10 mt-20'>
                    <div class="lg:grid grid-cols-3 gap-4">
                        <div class="">
                            <div className='flex justify-between mx-14 mb-8 items-center'>
                                <p className='font-bold'>Point Name</p>
                                <input className='border rounded-xl w-[250px] h-[40px] ' type="text" placeholder='Point Name' ></input>
                            </div>
                            <div className='flex justify-between mx-14 items-center'>
                                <p className='font-bold'>Point Start On</p>
                                <input className='border rounded-xl w-[250px] h-[40px] ' type="date" ></input>
                            </div>
                            <div className='flex justify-between mx-14 my-8 items-center '>
                                <p className='font-bold'>Point Currency</p>

                                <div className=" flex gap-2  border  rounded-md h-[40px] w-[70px]">

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
                            <div className='flex justify-between mx-14 my-8 items-center'>
                                <p className='font-bold'>Max Researchable Point</p>
                                <div className=" w-[170px] h-[40px] flex border rounded-full">
                                    <div className='w-full text-[#fff] bg-[#737373] rounded-s-full text-center' onClick={() => setCount(count - 1)}>-</div>
                                    <div className='w-full text-center'> {count} </div>
                                    <div className='w-full text-[#fff] bg-[#737373] rounded-e-full text-center' onClick={() => setCount(count + 1)}>+</div>
                                </div>
                            </div>
                            <div className='flex justify-between mx-14 my-8 items-center'>
                                <p className='font-bold'>Min Researchable Point</p>
                                <div className=" w-[170px] h-[40px] flex border rounded-full">
                                    <div className='w-full text-[#fff] bg-[#737373] rounded-s-full text-center' onClick={() => setCount(count - 1)}>-</div>
                                    <div className='w-full text-center'> {count} </div>
                                    <div className='w-full text-[#fff] bg-[#737373] rounded-e-full text-center' onClick={() => setCount(count + 1)}>+</div>
                                </div>
                            </div>
                        </div>
                        <div class="mt-7">
                            <div className='flex justify-between mx-14 my-8 items-center'>
                                <p className='font-bold'>Points Expire On</p>

                                <input className='border rounded-xl w-[180px] ' type="date" ></input>
                            </div>
                            <div className='flex justify-between mx-14 my-8 items-center'>
                                <p className='font-bold'>Point Value</p>
                                <div className=" w-[170px] h-[40px] flex border rounded-full">
                                    <div className='w-full text-[#fff] bg-[#737373] rounded-s-full text-center' onClick={() => setCount(count - 1)}>-</div>
                                    <div className='w-full text-center'> {count} </div>
                                    <div className='w-full text-[#fff] bg-[#737373] rounded-e-full text-center' onClick={() => setCount(count + 1)}>+</div>
                                </div>
                            </div>
                            <div className='flex justify-between mx-14 my-8 items-center'>
                                <p className='font-bold'>Max Redeemable Points</p>
                                <div className=" w-[170px] h-[40px] flex border rounded-full">
                                    <div className='w-full text-[#fff] bg-[#737373] rounded-s-full text-center' onClick={() => setCount(count - 1)}>-</div>
                                    <div className='w-full text-center'> {count} </div>
                                    <div className='w-full text-[#fff] bg-[#737373] rounded-e-full text-center' onClick={() => setCount(count + 1)}>+</div>
                                </div>
                            </div>
                            <div className='flex justify-between mx-14 my-8 items-center'>
                                <p className='font-bold'>Min Points for Redemption</p>
                                <div className=" w-[170px] h-[40px] flex border rounded-full">
                                    <div className='w-full text-[#fff] bg-[#737373] rounded-s-full text-center' onClick={() => setCount(count - 1)}>-</div>
                                    <div className='w-full text-center'> {count} </div>
                                    <div className='w-full text-[#fff] bg-[#737373] rounded-e-full text-center' onClick={() => setCount(count + 1)}>+</div>
                                </div>
                            </div>
                        </div>
                        <div class="row-span-3 text-center lg:w-1/2 lg:mt-32 ">
                            <div className='flex justify-center'>
                                <img src={gameplay}></img>
                            </div>

                            <div className='flex gap-4 justify-center mt-5'>
                                <button className='bg-[#13EC00] p-2 rounded-2xl text-[#FFFFFF]' >Save Point</button>
                                <button className='border-2 p-2 rounded-2xl text-[#808080]'>Discard</button>
                            </div>
                        </div>
                        <div className="col-span-2 p-5 mx-14 border-2 rounded-2xl  text-center my-5">
                            <h3 className='font-bold mb-3'>Payment Gateways</h3>
                            <div className='lg:flex justify-between'>
                                <div className='flex'>
                                    <input type="checkbox" id="" name="" value="" />
                                    <img src={ApplePay}></img>
                                </div>
                                <div className='flex'>
                                    <input type="checkbox" id="" name="" value="" />
                                    <img src={Visa}></img>
                                </div>
                                <div className='flex'>
                                    <input type="checkbox" id="" name="" value="" />
                                    <img src={GooglePay}></img>
                                </div>
                                <div className='flex'>
                                    <input type="checkbox" id="" name="" value="" />
                                    <img src={Paypal}></img>
                                </div>
                                <div className='flex'>
                                    <input type="checkbox" id="" name="" value="" />
                                    <img src={SamsungPay}></img>
                                </div>
                                <div className='flex'>
                                    <input type="checkbox" id="" name="" value="" />
                                    <img src={AmazonPay}></img>
                                </div>
                                <div className='flex'>
                                    <input type="checkbox" id="" name="" value="" />
                                    <img src={Maestro}></img>
                                </div>
                            </div>
                            {/*  <img src={payment}></img> */}
                        </div>

                    </div>


                </div>


            </Layout>
        </div>
    );
};

export default EnrollRegistration;