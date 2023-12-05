import React from 'react';

import { useState } from 'react';

const TopExperienced = ({ topExperiencedData }) => {
    const DescriptionComponent = ({ desc }) => {
        const [showMore, setShowMore] = useState(false);

        // Extract the first 100 words
        const shortDescription = desc.split(' ').slice(0, 15).join(' ');

        return (
            <div className=''>
                <p className="text-[14px] font-normal my-2">
                    {showMore ? desc : shortDescription}
                    <span className='ms-2 font-semibold'>

                        {desc.length > 15 && (
                            <button onClick={() => setShowMore(!showMore)}>
                                {showMore ? 'Show Less' : '.Show More'}
                            </button>
                        )}
                    </span>

                </p>
            </div>
        );
    };

    return (
        <div className="my-10 pb-10 pt-5">
            <div className="mx-[50px] font-roboto">
                <div className="text-[#0E286C]">
                    <h1 className="text-[32px] font-bold mt-10">{topExperiencedData?.heading}</h1>
                </div>

                <div className="pt-[44px] flex gap-[27px]">
                    {topExperiencedData?.expertAdviceTypes?.map((item, index) => (
                        <div key={index} className="h-full w-full border">
                            <img className="w-full" src={item?.img} alt="image" />
                            <div className="text-[#0E286C] p-[21px]">
                                <p className="text-xs font-normal mt-2">
                                    {item?.type}
                                    <span className="mx-2">{item?.creator}</span>
                                    {item?.member}
                                </p>
                                <h1 className="font-bold text-[20px] mt-2 ">{item?.title}</h1>

                                {/* Use DescriptionComponent here */}
                                <DescriptionComponent desc={item?.desc} />

                                <button
                                    className="px-[25px] py-[10px] mt-2 text-[20px] font-bold mb-3"
                                    style={{
                                        borderRadius: "8px",
                                        border: "1px solid #0E286C",
                                        boxShadow: "0px 4px 10px 0px rgba(169, 169, 169, 0.25)",
                                    }}
                                >
                                    Connect
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default TopExperienced;
