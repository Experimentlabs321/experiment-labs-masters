import React, { useState } from 'react';
import DialogLayout from '../../Shared/DialogLayout';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';


const LanguageSetting = () => {
    const [editDashboardNameOpen, setEditDashboardNameOpen] = useState(false);

    return (
        <div className="w-[96%] mx-auto my-10">

            <div className='w-[100%] flex items-center justify-between border p-2 rounded-xl'>
                <div className='flex items-center gap-7'>
                    <p className='text-xl font-medium'>Dashboard</p>
                    <button
                        onClick={() => {
                            setEditDashboardNameOpen(true);
                            /*    setChapterData({
                                 ...chapter,
                                 index: index,
                               }); */
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
                    (editDashboardNameOpen) ? <KeyboardArrowDownIcon/>: <KeyboardArrowUpIcon/>
                }
                

                {/* <input name='dashboard' type='text' className='border border-slate-300 rounded-lg p-2 w-[300px]' placeholder='Text here'/> */}
            </div>
            <DialogLayout
                open={editDashboardNameOpen}
                setOpen={setEditDashboardNameOpen}
                width={440}
                borderRadius="15px"
                title={
                    <p className=" h-[90px] text-[22px] font-[700] flex items-center text-[#3E4DAC] px-[32px] py-5 border-b-2">
                        Edit Dashboard Name
                    </p>
                }
            >
                <form
                    //   onSubmit={handleEditChapterName}
                    className="px-[32px] py-[24px] "
                >
                    <h1 className=" text-[18px] font-[700] mb-[20px] ">
                        Dashboard Name
                    </h1>
                    <input
                        type="text"
                        name="dashboardName"
                        // defaultValue={chapterData?.chapterName}
                        placeholder="Eg. Onboarding"
                        className="bg-[#F6F7FF] border-[1px] border-[#CECECE] w-full rounded-[6px] py-[15px] px-[18px] "
                    />
                    <div className="w-full flex items-center justify-center mt-[40px]">
                        <input
                            type="submit"
                            value="Update"
                            className="py-[15px] px-[48px] cursor-pointer text-[20px] font-[700] rounded-[8px] bg-[#3E4DAC] text-white "
                        />
                    </div>
                </form>
            </DialogLayout>
            <div>
                
            </div>


        </div>
    );
};

export default LanguageSetting;