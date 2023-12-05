import React from 'react';




const GetEarlyAccess = ({ getEarlyAccessData }) => {

    return (
        <div
            className='h-[500px] flex items-center '
            style={{
                backgroundImage: `url(${getEarlyAccessData?.bgImage})`,
                backgroundSize: 'cover',
            }}
        >
            <div className="ms-[64px] text-[#fff]">
                <h1 className="text-[48px] font-bold">{getEarlyAccessData?.title}</h1>
                <p className="text-[18px] font-normal my-5">{getEarlyAccessData?.subTitle}</p>

                <div >
                    <div className="flex  gap-3"  >
                        <div
                            className="h-[42px] flex  items-center w-[235px] p-3"
                            style={{
                                border: "0.889px solid #000",
                                background: "var(--White, #FFF)",
                            }}>
                            <input type="email" className="text-base font-normal text-[#000] focus:none " placeholder="placeholder" />

                        </div>
                        <div
                            className="h-[42px] bg-[#0E286C] text-[#fff]  flex justify-center items-center w-[105px] py-3 px-5"
                            style={{
                                border: "0.889px solid #000",

                            }}>
                            <button
                                className="text-base font-normal bg-[#0E286C]">Confirm

                            </button>
                        </div>

                    </div>

                    <p className="text-xs font-normal mt-[12px]">Sign Up to Unlock Exclusive Benefits</p>



                </div>

            </div>



        </div>

    );
};

export default GetEarlyAccess;