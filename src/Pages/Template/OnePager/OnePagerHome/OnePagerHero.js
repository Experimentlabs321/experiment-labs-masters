import React from 'react';
import heroImage from '../../../../assets/OnePager/HeroSection/heroImage.png';
import mentorSupport from '../../../../assets/OnePager/HeroSection/mentorSupport.svg';
import realTimeProject from '../../../../assets/OnePager/HeroSection/realTimeProject.svg';
import learn from '../../../../assets/OnePager/HeroSection/learn.svg';


const OnePagerHero = () => {
    return (
        <div>
            <div
                style={{
                    background: "linear-gradient(90deg, #3B4898 22.62%, #495AC7 96.38%)"
                }}
                className='py-[30px] lg:px-[50px] px-5 '>
                <div className='flex justify-center lg:gap-[180px]'>
                    <div className='text-[#fff] flex flex-col justify-center'>
                        <h1 className='lg:text-4xl text-2xl font-bold'>Courses you need to pursue for a successful career.</h1>
                        <p className='lg:text-xl text-[15px] font-normal text-[#DDD]'>With our professional mentors and real-time projects, you can build a successful career.</p>
                    </div>
                    <div>
                        <img className='w-full' src={heroImage} alt='heroImage' />
                    </div>

                </div>

            </div>
            <div className='bg-[#fff] flex justify-center'>
                <div
                    style={{
                        borderRadius: "11px",
                        border: "1px solid #E5E9FF",

                        background: "#FFF",

                        boxShadow: "0px 4px 4px 0px #E4E8FF"
                    }}
                    className='lg:w-[925px] lg:h-[98px] w-[408px] h-[46px] px-5 lg:px-[85px] lg:py-[15px] flex mt-[-25px]'
                >

                    <div className='flex gap-[10px] items-center'>
                        <p>
                            <img src={mentorSupport} alt='icon' />
                        </p>
                        <p className='text-[#3E3E3E] lg:text-xl text-[9px] font-bold'>
                        1-to-1 mentor support
                        </p>

                    </div>
                    <div className='flex gap-[10px] items-center'>
                        <p>
                            <img src={realTimeProject} alt='icon' />
                        </p>
                        <p className='text-[#3E3E3E] lg:text-xl text-[9px] font-bold'>
                        We provide real-time projects
                        </p>

                    </div>
                    <div className='flex gap-[10px] items-center'>
                        <p>
                            <img src={learn} alt='icon' />
                        </p>
                        <p className='text-[#3E3E3E] lg:text-xl text-[9px] font-bold'>
                        Learn whenever and wherever
                        </p>

                    </div>




                </div>

            </div>


        </div>

    );
};

export default OnePagerHero;