import React from 'react';




const HeroSection = ({heroData}) => {
    
    return (
        <div>
            <div

                className='py-[30px] lg:px-[35px] px-5 '>
                <div className='flex justify-between '>
                    <div className='text-[#000] flex flex-col gap-5 justify-center w-[700px]'>
                        <h1 className='lg:text-[56px] text-2xl font-bold w-[500px]'>Start your charity </h1>
                        <p className='lg:text-[56px] text-2xl font-bold w-[500px]'>today</p>
                        <p className='lg:text-2xl text-[15px] font-bold  text-[#000]'>Connect with experienced mentors and get guidance on your created charities.</p>
                        <div className='flex gap-[10px] mt-5'>
                            <button
                            className='px-[25px] py-[10px] text-xl font-semibold text-[#fff]'
                                style={{
                                    borderRadius: "8px",
                                    background: "#0E286C",
                                    boxShadow: "0px 4px 10px 0px rgba(169, 169, 169, 0.25)"
                                }}
                            > Join</button>
                            <button
                            className='px-[25px] py-[10px] text-xl font-semibold text-[#0E286C]'
                                style={{
                                    borderRadius: "8px",
                                    boxShadow: "0px 4px 10px 0px rgba(169, 169, 169, 0.25)",
                                }}
                            > Learn More</button>

                        </div>

                    </div>
                    <div
                        className=''
                    >

                        <p style={{
                            borderRadius: "260px",
                            border: "2px solid #FFF",
                            background: "#FFC062",
                            boxShadow: "0px 4px 30px 0px rgba(149, 149, 149, 0.25)",
                            width: "260px",
                            height: "242px",
                            flexShrink: "0",
                        }}></p>
                        <img className='w-[450px] ms-[95px] mt-[-160px]' src={heroData?.heroImage} alt='heroImage' />
                    </div>

                </div>

            </div>



        </div>

    );
};

export default HeroSection;