//PointsAndRedemptionsPage

import React, { useState } from 'react';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import ClassesDetails from './ClassesDetails';
import GamifiedSettingDetails from './GamifiedSettingDetails';
import EarningLogicDetails from './EarningLogicDetails';
import RedemptionLogicDetails from './RedemptionLogicDetails';



const PointsAndRedemptionsPage = () => {

   
    const [adminGamifiedSettingOpen, setAdminGamifiedSettingOpen] = useState(false);
    const [adminEarningLogicOpen, setAdminEarningLogicOpen] = useState(false);
    const [adminRedemptionLogicOpen, setAdminRedemptionLogicOpen] = useState(false);


    return (
        <div className=''>


            {/*Gamified Setting*/}
            <div className='mt-2'>
                <div className={`w-[100%] flex items-center justify-between border p-2 rounded-xl ${adminGamifiedSettingOpen ? "bg-slate-100" : ""} `}>
                    <div className='flex items-center gap-7'>
                        <p className='text-xl font-medium'>                          
                        Gamified Setting                      
                        </p>
                      
                    </div>
                    {
                        (adminGamifiedSettingOpen) ? <KeyboardArrowUpIcon className='cursor-pointer' onClick={() => {
                            setAdminGamifiedSettingOpen(false);

                        }} /> : <KeyboardArrowDownIcon className='cursor-pointer' onClick={() => {
                            setAdminGamifiedSettingOpen(true);

                        }} />
                    }

                </div>
             
                {
                    (adminGamifiedSettingOpen) && (
                        <GamifiedSettingDetails />
                    )
                }

            </div>
            {/*Earning Logic*/}
            <div className='mt-2'>
                <div className={`w-[100%] flex items-center justify-between border p-2 rounded-xl ${adminEarningLogicOpen ? "bg-slate-100" : ""} `}>
                    <div className='flex items-center gap-7'>
                        <p className='text-xl font-medium'>                          
                        Earning Logic                      
                        </p>
                      
                    </div>
                    {
                        (adminEarningLogicOpen) ? <KeyboardArrowUpIcon className='cursor-pointer' onClick={() => {
                            setAdminEarningLogicOpen(false);

                        }} /> : <KeyboardArrowDownIcon className='cursor-pointer' onClick={() => {
                            setAdminEarningLogicOpen(true);

                        }} />
                    }

                </div>
             
                {
                    (adminEarningLogicOpen) && (
                        <EarningLogicDetails />
                    )
                }

            </div>
            {/*Redemption Logic*/}
            <div className='mt-2'>
                <div className={`w-[100%] flex items-center justify-between border p-2 rounded-xl ${adminRedemptionLogicOpen ? "bg-slate-100" : ""} `}>
                    <div className='flex items-center gap-7'>
                        <p className='text-xl font-medium'>                          
                        Redemption Logic                      
                        </p>
                      
                    </div>
                    {
                        (adminRedemptionLogicOpen) ? <KeyboardArrowUpIcon className='cursor-pointer' onClick={() => {
                            setAdminRedemptionLogicOpen(false);

                        }} /> : <KeyboardArrowDownIcon className='cursor-pointer' onClick={() => {
                            setAdminRedemptionLogicOpen(true);

                        }} />
                    }

                </div>
             
                {
                    (adminRedemptionLogicOpen) && (
                        <RedemptionLogicDetails />
                    )
                }

            </div>


        </div>
    );
};

export default PointsAndRedemptionsPage;