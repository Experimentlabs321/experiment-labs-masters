import React from 'react';

const ExpertAdvice = ({ expertAdviceData }) => {
    return (
        <div className="bg-[#F1F5FF] my-10 pb-10 pt-5">

            <div className="w-11/12 mx-auto font-roboto ">
                <div className=" text-[#0E286C] flex flex-col items-center">
                    <p className="text-base font-semibold">Insights</p>
                    <h1 className="text-[48px] font-bold mt-4">{expertAdviceData?.heading}</h1>
                    <p className="mt-6 text-lg font-normal">{expertAdviceData.subHeading}</p>
                </div>

                <div className="pt-[44px] flex gap-[27px] ">
                    {
                        expertAdviceData?.expertAdviceTypes?.map((item, index) => (
                            <div key={index} className=" h-full w-full border ">
                                <img className="w-full" src={item?.img} alt="image" />
                                <div className=" text-[#0E286C] p-[21px]">
                                    <p className="text-xs font-normal mt-2">{item?.role}<span className="mx-2">.</span>{item?.duration}</p>
                                    <h1 className="font-bold text-[20px] mt-2 ">{item?.title}</h1>
                                    <p className="text-[14px] font-normal text-[#000] my-2">{item?.desc}</p>
                                    <button
                                    className="px-[25px] py-[10px] mt-2 text-[20px] font-bold mb-3 hover:bg-[#0E286C] hover:text-[#fff]"
                                        style={{
                                            borderRadius: "8px",
                                            border: "1px solid #0E286C",
                                            boxShadow: "0px 4px 10px 0px rgba(169, 169, 169, 0.25)",
                                        }}
                                    >JOIN</button>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>

        </div>


    );
};

export default ExpertAdvice;