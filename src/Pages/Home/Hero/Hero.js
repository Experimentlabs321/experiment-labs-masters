import { Button } from '@mui/material';
import React from 'react';
import ArrowCircleRightOutlinedIcon from '@mui/icons-material/ArrowCircleRightOutlined';

const Hero = () => {
    return (
        <div>
            <section class="bg-green bg-opacity-30">
                <div class="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
                    <div class="mr-auto place-self-center lg:col-span-7">
                        <h1 class="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl text-black font-serif">Learn Business by <span className='italic'>Running</span> Business</h1>
                        
                        <Button sx={{bgcolor:'#0cc5db',padding:'15px 20px', fontWeight:"600", fontSize:'16px', ":hover":{bgcolor:"rgb(62 232 181)"}}} variant="contained" endIcon={<ArrowCircleRightOutlinedIcon />}>
                            Explore Courses
                        </Button>

                    </div>
                    <div class="mt-6 lg:mt-0 lg:col-span-5 lg:flex">
                        <img src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/hero/phone-mockup.png" alt="mockup" />
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Hero;