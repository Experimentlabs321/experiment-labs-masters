import React from 'react';

const Articles = ({ articlesData }) => {
    return (

        <div className="w-11/12 mx-auto font-roboto">
            <div className=" text-[#0E286C] flex flex-col items-center">
                <p className="text-base font-semibold">Articles</p>
                <h1 className="text-[48px] font-bold mt-4">{articlesData?.heading}</h1>
                <p className="mt-6 text-lg font-normal">{articlesData.subHeading}</p>
            </div>

            <div className="pt-[44px] flex gap-[27px] ">
                {
                    articlesData?.articleTypes?.map((item, index) => (
                        <div key={index} className=" h-full w-full border ">
                            <img className="w-full" src={item?.img} alt="image" />
                            <div className=" text-[#0E286C] p-[21px]">
                                <p className="text-xs font-semibold">All</p>
                                <h1 className="font-bold text-[20px] mt-2 ">{item?.title}</h1>
                                <p className="text-[14px] font-normal text-[#000] my-2">{item?.desc}</p>
                                <div className="flex gap-[14px] items-center mt-5">
                                    <img src={item?.profileImage} alt="" />
                                    <div>
                                        <h1 className="text-xs font-semibold">{item?.personName}</h1>
                                        <p className="text-xs font-normal mt-2">{item?.date}<span className="mx-2">.</span>{item?.duration}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    );
};

export default Articles;