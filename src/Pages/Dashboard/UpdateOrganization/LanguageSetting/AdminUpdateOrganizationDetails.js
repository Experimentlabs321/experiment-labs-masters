//AdminUpdateOrganizationDetails


import React, { useState } from 'react';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import DialogLayoutForFromControl from '../../Shared/DialogLayoutForFromControl';
import AdminLiveClassFeedbackDetails from './AdminLiveClassFeedbackDetails';
import AdminFeedbackSettingsDetails from './AdminFeedbackSettingsDetails';
import AdminOrganizationThemeDetails from './AdminOrganizationThemeDetails';


const AdminUpdateOrganizationDetails = () => {
    //Organization Theme
    const [organizationThemeNameInput, setOrganizationThemeNameInput] = useState('');
    const [editOrganizationThemeNameOpen, setEditOrganizationThemeNameOpen] = useState(false);
    const [adminOrganizationThemeDetailsOpen, setAdminOrganizationThemeDetailsOpen] = useState(false);
  

    return (
        <div className=''>

            {/* Organization Theme */}
            <div className='mt-2'>
                <div className={`w-[100%] flex items-center justify-between border p-2 rounded-xl ${adminOrganizationThemeDetailsOpen ? "bg-slate-100" : ""} `}>
                    <div className='flex items-center gap-7'>
                        <p className='text-xl font-medium'>
                            {
                                organizationThemeNameInput ? organizationThemeNameInput : "Organization Theme"
                            }

                        </p>
                        <button
                            onClick={() => {
                                setEditOrganizationThemeNameOpen(true);
                             
                            }}
                            className="ml-[24px]"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="18"
                                height="20"
                                viewBox="0 0 18 20"
                                fill="none"
                            >
                                <path
                                    d="M13.648 0.961914L17.3711 4.88525L14.5329 7.87744L10.8098 3.95411L13.648 0.961914ZM0.0117188 19.2551H3.73478L12.7781 9.72533L9.05502 5.802L0.0117188 15.3318V19.2551Z"
                                    fill="#282828"
                                />
                            </svg>
                        </button>
                    </div>
                    {
                        (adminOrganizationThemeDetailsOpen) ? <KeyboardArrowUpIcon className='cursor-pointer' onClick={() => {
                            setAdminOrganizationThemeDetailsOpen(false);

                        }} /> : <KeyboardArrowDownIcon className='cursor-pointer' onClick={() => {
                            setAdminOrganizationThemeDetailsOpen(true);

                        }} />
                    }



                </div>
                <DialogLayoutForFromControl
                    open={editOrganizationThemeNameOpen}
                    setOpen={setEditOrganizationThemeNameOpen}
                    width={400}
                    borderRadius="15px"
                    title={
                        <p className=" h-[90px] text-[19px] font-[700] flex items-center text-[#3E4DAC] px-[32px] py-5 border-b-2">
                            Edit Organization Theme Name
                        </p>
                    }
                >

                    <div>
                        <input
                            className="mt-6 border rounded-md w-[358px] h-[50px] ps-2 text-[#535353] focus:outline-0 bg-[#F6F7FF] "
                            name="OrganizationTheme"
                            type="text"
                            placeholder="Organization Theme"
                            value={organizationThemeNameInput}
                            onChange={(e) => setOrganizationThemeNameInput(e.target.value)}
                        />
                        <div className="flex justify-center mt-5">

                            <button
                                className="px-[20px] py-3 bg-[#3E4DAC] hover:bg-opacity-70 text-[#fff] cursor-pointer text-xl font-bold rounded-lg"
                                onClick={() => setEditOrganizationThemeNameOpen(false)}

                            >Add</button>


                        </div>

                    </div>
                </DialogLayoutForFromControl>

                {
                    (adminOrganizationThemeDetailsOpen) && (
                        <AdminOrganizationThemeDetails />
                    )
                }


            </div>

      




        </div>
    );
};

export default AdminUpdateOrganizationDetails;