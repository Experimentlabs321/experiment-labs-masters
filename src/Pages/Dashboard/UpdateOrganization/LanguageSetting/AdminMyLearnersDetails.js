//AdminMyLearnersDetails

import React, { useState } from 'react';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import DialogLayoutForFromControl from '../../Shared/DialogLayoutForFromControl';

import AdminOrganizationThemeDetails from './AdminOrganizationThemeDetails';
import MyLearnersDetails from './MyLearnersDetails';
import AddLearnersDetails from './AddLearnersDetails';



const AdminMyLearnersDetails = () => {
    //My Learners

    const [adminMyLearnersDetailsOpen, setAdminMyLearnersDetailsOpen] = useState(false);
    //Add Learners

    const [adminAddLearnersDetailsOpen, setAdminAddLearnersDetailsOpen] = useState(false);



    return (
        <div className=''>

            {/* My Learners */}
            <div className='mt-2'>
                <div className={`w-[100%] flex items-center justify-between border p-2 rounded-xl ${adminMyLearnersDetailsOpen ? "bg-slate-100" : ""} `}>
                    <div className='flex items-center gap-7'>
                        <p className='text-xl font-medium'>
                            
                               My Learners
                            
                        </p>
                     
                    </div>
                    {
                        (adminMyLearnersDetailsOpen) ? <KeyboardArrowUpIcon className='cursor-pointer' onClick={() => {
                            setAdminMyLearnersDetailsOpen(false);

                        }} /> : <KeyboardArrowDownIcon className='cursor-pointer' onClick={() => {
                            setAdminMyLearnersDetailsOpen(true);

                        }} />
                    }



                </div>
              

                {
                    (adminMyLearnersDetailsOpen) && (
                        <MyLearnersDetails />
                    )
                }


            </div>
            {/* Add Learners */}
            <div className='mt-2'>
                <div className={`w-[100%] flex items-center justify-between border p-2 rounded-xl ${adminAddLearnersDetailsOpen ? "bg-slate-100" : ""} `}>
                    <div className='flex items-center gap-7'>
                        <p className='text-xl font-medium'>                         
                                Add Learners                          
                        </p>
                      
                    </div>
                    {
                        (adminAddLearnersDetailsOpen) ? <KeyboardArrowUpIcon className='cursor-pointer' onClick={() => {
                            setAdminAddLearnersDetailsOpen(false);

                        }} /> : <KeyboardArrowDownIcon className='cursor-pointer' onClick={() => {
                            setAdminAddLearnersDetailsOpen(true);

                        }} />
                    }



                </div>


                {
                    (adminAddLearnersDetailsOpen) && (
                        <AddLearnersDetails />
                    )
                }


            </div>
         


        </div>
    );
};

export default AdminMyLearnersDetails;