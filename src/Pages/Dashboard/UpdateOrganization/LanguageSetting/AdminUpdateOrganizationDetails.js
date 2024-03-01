//AdminUpdateOrganizationDetails


import React, { useState } from 'react';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import DialogLayoutForFromControl from '../../Shared/DialogLayoutForFromControl';
import AdminLiveClassFeedbackDetails from './AdminLiveClassFeedbackDetails';
import AdminFeedbackSettingsDetails from './AdminFeedbackSettingsDetails';
import AdminOrganizationThemeDetails from './AdminOrganizationThemeDetails';
import AdminDashboardThemeDetails from './AdminDashboardThemeDetails';
import AdminPaymentIntegrationDetails from './AdminPaymentIntegrationDetails';
import AdminLimitDeviceDetails from './AdminLimitDeviceDetails';
import AdminLanguageSettingDetails from './AdminLanguageSettingDetails';


const AdminUpdateOrganizationDetails = () => {
    //Organization Theme
    const [organizationThemeNameInput, setOrganizationThemeNameInput] = useState('');
    const [editOrganizationThemeNameOpen, setEditOrganizationThemeNameOpen] = useState(false);
    const [adminOrganizationThemeDetailsOpen, setAdminOrganizationThemeDetailsOpen] = useState(false);
    //Dashboard Theme
    const [dashboardThemeNameInput, setDashboardThemeNameInput] = useState('');
    const [editDashboardThemeNameOpen, setEditDashboardThemeNameOpen] = useState(false);
    const [adminDashboardThemeDetailsOpen, setAdminDashboardThemeDetailsOpen] = useState(false);
    //Payment Integration
    const [paymentIntegrationNameInput, setPaymentIntegrationNameInput] = useState('');
    const [editPaymentIntegrationNameOpen, setEditPaymentIntegrationNameOpen] = useState(false);
    const [adminPaymentIntegrationDetailsOpen, setAdminPaymentIntegrationDetailsOpen] = useState(false);
    //Limit Device
    const [limitDeviceNameInput, setLimitDeviceNameInput] = useState('');
    const [editLimitDeviceNameOpen, setEditLimitDeviceNameOpen] = useState(false);
    const [adminLimitDeviceDetailsOpen, setAdminLimitDeviceDetailsOpen] = useState(false);
    //Language Setting
    const [languageSettingNameInput, setLanguageSettingNameInput] = useState('');
    const [editLanguageSettingNameOpen, setEditLanguageSettingNameOpen] = useState(false);
    const [adminLanguageSettingDetailsOpen, setAdminLanguageSettingDetailsOpen] = useState(false);




    return (
        <div className=''>

            {/* Organization Theme */}
            <div className='mt-2'>
                <div className={`w-[100%] flex items-center justify-between border p-2 rounded-xl ${adminOrganizationThemeDetailsOpen ? "bg-slate-100" : ""} `}>
                    <div className='flex items-center gap-7'>
                        <p className='text-xl font-medium'>
                            
                               Organization Theme
                            
                        </p>
                     
                    </div>
                    {
                        (adminOrganizationThemeDetailsOpen) ? <KeyboardArrowUpIcon className='cursor-pointer' onClick={() => {
                            setAdminOrganizationThemeDetailsOpen(false);

                        }} /> : <KeyboardArrowDownIcon className='cursor-pointer' onClick={() => {
                            setAdminOrganizationThemeDetailsOpen(true);

                        }} />
                    }



                </div>

                {
                    (adminOrganizationThemeDetailsOpen) && (
                        <AdminOrganizationThemeDetails />
                    )
                }


            </div>
            {/*  Dashboard Theme */}
            <div className='mt-2'>
                <div className={`w-[100%] flex items-center justify-between border p-2 rounded-xl ${adminDashboardThemeDetailsOpen ? "bg-slate-100" : ""} `}>
                    <div className='flex items-center gap-7'>
                        <p className='text-xl font-medium'>                         
                                Dashboard Theme
                            
                        </p>
                      
                    </div>
                    {
                        (adminDashboardThemeDetailsOpen) ? <KeyboardArrowUpIcon className='cursor-pointer' onClick={() => {
                            setAdminDashboardThemeDetailsOpen(false);

                        }} /> : <KeyboardArrowDownIcon className='cursor-pointer' onClick={() => {
                            setAdminDashboardThemeDetailsOpen(true);

                        }} />
                    }



                </div>


                {
                    (adminDashboardThemeDetailsOpen) && (
                        <AdminDashboardThemeDetails />
                    )
                }


            </div>
            {/*Payment Integration*/}
            <div className='mt-2'>
                <div className={`w-[100%] flex items-center justify-between border p-2 rounded-xl ${adminPaymentIntegrationDetailsOpen ? "bg-slate-100" : ""} `}>
                    <div className='flex items-center gap-7'>
                        <p className='text-xl font-medium'>
                            
                                 Payment Integration
                           
                        </p>
                      
                    </div>
                    {
                        (adminPaymentIntegrationDetailsOpen) ? <KeyboardArrowUpIcon className='cursor-pointer' onClick={() => {
                            setAdminPaymentIntegrationDetailsOpen(false);

                        }} /> : <KeyboardArrowDownIcon className='cursor-pointer' onClick={() => {
                            setAdminPaymentIntegrationDetailsOpen(true);

                        }} />
                    }



                </div>

                {
                    (adminPaymentIntegrationDetailsOpen) && (
                        <AdminPaymentIntegrationDetails />
                    )
                }


            </div>
            {/*Limit Device*/}
            <div className='mt-2'>
                <div className={`w-[100%] flex items-center justify-between border p-2 rounded-xl ${adminLimitDeviceDetailsOpen ? "bg-slate-100" : ""} `}>
                    <div className='flex items-center gap-7'>
                        <p className='text-xl font-medium'>
                            
                                Limit Device
                        </p>
                
                    </div>
                    {
                        (adminLimitDeviceDetailsOpen) ? <KeyboardArrowUpIcon className='cursor-pointer' onClick={() => {
                            setAdminLimitDeviceDetailsOpen(false);

                        }} /> : <KeyboardArrowDownIcon className='cursor-pointer' onClick={() => {
                            setAdminLimitDeviceDetailsOpen(true);

                        }} />
                    }



                </div>

                {
                    (adminLimitDeviceDetailsOpen) && (
                        <AdminLimitDeviceDetails />
                    )
                }


            </div>
            {/*Language Setting*/}
          {/*   <div className='mt-2'>
                <div className={`w-[100%] flex items-center justify-between border p-2 rounded-xl ${adminLanguageSettingDetailsOpen ? "bg-slate-100" : ""} `}>
                    <div className='flex items-center gap-7'>
                        <p className='text-xl font-medium'>
                            
                               Language Setting
                            
                        </p>
                 
                    </div>
                    {
                        (adminLanguageSettingDetailsOpen) ? <KeyboardArrowUpIcon className='cursor-pointer' onClick={() => {
                            setAdminLanguageSettingDetailsOpen(false);

                        }} /> : <KeyboardArrowDownIcon className='cursor-pointer' onClick={() => {
                            setAdminLanguageSettingDetailsOpen(true);

                        }} />
                    }

                </div>

                {
                    (adminLanguageSettingDetailsOpen) && (
                        <AdminLanguageSettingDetails />
                    )
                }


            </div> */}

        </div>
    );
};

export default AdminUpdateOrganizationDetails;