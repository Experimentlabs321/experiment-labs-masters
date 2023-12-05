import React from 'react';

const StudentsCharitiesHero = ({studentsCharitiesHeroData}) => {
    return (

        <div className="mx-[50px] font-roboto mt-20 flex gap-[135px] ">
            <div className="w-full text-[#0E286C]">
                <p className=" text-base font-semibold">{studentsCharitiesHeroData?.smallTitle}</p>
                <h1 className="text-[48px] font-bold">{studentsCharitiesHeroData?.title}</h1>

            </div>
            <div className="w-[70%]">
                <p className="text-xl font-normal">{studentsCharitiesHeroData?.description}</p>
            </div>
      
        </div>
    );
};

export default StudentsCharitiesHero;