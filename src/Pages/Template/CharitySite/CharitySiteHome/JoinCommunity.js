import React from 'react';




const JoinCommunity = ({ joinCommunityData }) => {

    return (
        <div
            className='h-[500px] mt-10 w-[100%] flex items-end'
            style={{
                backgroundImage: `url(${joinCommunityData?.bgImage})`,
                backgroundSize: 'cover',
            }}
        >
            <button
                className='px-[25px] ms-[43px] mb-[110px] py-[10px] text-xl font-semibold text-[#fff]'
                style={{
                    borderRadius: "8px",
                    background: "#0E286C",
                    boxShadow: "0px 4px 10px 0px rgba(169, 169, 169, 0.25)"
                }}
            > Join</button>

        </div>

    );
};

export default JoinCommunity;