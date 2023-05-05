import { Button } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import ArrowCircleRightOutlinedIcon from '@mui/icons-material/ArrowCircleRightOutlined';
import LanguageIcon from '@mui/icons-material/Language';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import Stories from 'react-insta-stories';
import ArrowCircleLeftRoundedIcon from '@mui/icons-material/ArrowCircleLeftRounded';
import ArrowCircleRightRoundedIcon from '@mui/icons-material/ArrowCircleRightRounded';

const Hero = () => {
    const visibleIndex = useRef(0);

    const [stories, setStories] = useState([
        {
            url: 'https://dsqqu7oxq6o1v.cloudfront.net/motion-array-1388812-A012_06252056_C069-high.mp4',
            type: 'video'
        },
        {
            url: 'https://dsqqu7oxq6o1v.cloudfront.net/motion-array-1075852-dV3Kxdk8Sn-high.mp4',
            type: 'video'
        },
        {
            url: 'https://dsqqu7oxq6o1v.cloudfront.net/motion-array-1290096-NRkICuxxxg-high.mp4',
            type: 'video'
        },
        {
            url: 'https://dsqqu7oxq6o1v.cloudfront.net/motion-array-1347899-LeKv7SHCYU-high.mp4',
            type: 'video'
        },
    ]);

    const [currentVideo, setCurrentVideo] = useState(stories[0]?.url);

    const [selectedIndex, setSelectedIndex] = useState(0);

    const mySourceRef = useRef(null);
    const myVideoRef = useRef(null);

    const onStoryStart = (index) => {
        visibleIndex.current = index;
        const mySource = mySourceRef.current;
        const myVideo = myVideoRef.current;

        if (mySource && myVideo) {
            mySource.src = stories[index]?.url;
            myVideo.load();
        }

    };

    const onNext = () => {
        const i = (visibleIndex.current + 1) % 4;
        visibleIndex.current = i;
        setSelectedIndex(i);
        setCurrentVideo(stories[i]?.url);
    };

    const onPrevious = () => {
        let i = (visibleIndex.current - 1);
        if (i === -1) {
            i += 4;
        }
        visibleIndex.current = i;
        setSelectedIndex(i);
        setCurrentVideo(stories[i]?.url);
    };



    useEffect(() => {

        const mySource = mySourceRef.current;
        const myVideo = myVideoRef.current;

        if (mySource && myVideo) {
            mySource.src = currentVideo;
            myVideo.load();
        }
    }, [currentVideo]);


    console.log(stories[selectedIndex].url, selectedIndex);

    return (
        <div>
            <section className="bg-green bg-opacity-30 lg:h-[600px]">
                <div style={{ height: "100%" }} className="grid mx-auto lg:gap-8 xl:gap-0 lg:grid-cols-12">
                    <div className="mr-auto place-self-center lg:col-span-6 py-8 lg:py-16 px-4 lg:pl-16">
                        <h1 className="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-5xl text-black font-serif">Plan your career by <span className='italic bg-gradient-to-t from-green to-50% to-transparent'>practically</span> experiencing it.</h1>

                        <div className='my-8 text-gray-600 flex flex-col gap-3 justify-start'>
                            <span><LanguageIcon className='mr-2' /> Curriculum that takes learning<span className='font-bold initial'> {` beyond the classroom`}</span></span>
                            <span><BusinessCenterIcon className='mr-2' /> Classes led by <span className='font-bold initial'>100+ MDs, CEOs & Founders</span></span>
                            <span><CurrencyRupeeIcon className='mr-2' />Placements driven courses with <span className='font-bold initial'>profile building,stream selection and career planning</span></span>
                        </div>

                        <Button sx={{ bgcolor: '#0cc5db', padding: '15px 20px', fontWeight: "600", fontSize: '16px', ":hover": { bgcolor: "rgb(62 232 181)" } }} variant="contained" endIcon={<ArrowCircleRightOutlinedIcon className='h-6 w-6' />}>
                            Explore Courses
                        </Button>

                    </div>

                    <div className='lg:col-span-6 lg:h-full relative h-[600px]'>
                        <div style={{ position: 'absolute', top: '0', left: '0', width: "100%", height: "100%", backgroundColor: 'rgba(0,0,10,0.6)' }}></div>
                        <video ref={myVideoRef} style={{ width: "100%", height: "100%", objectFit: "cover" }} autoPlay loop muted>
                            <source ref={mySourceRef} src={currentVideo} type="video/mp4" />
                        </video>
                        <div className='flex justify-center items-center gap-5' style={{
                            position: "absolute",
                            top: "50%",
                            left: "50%",
                            transform: "translate(-50%, -50%)"
                        }}>
                            <button className='hidden sm:block' type="button" onClick={onPrevious}>
                                <ArrowCircleLeftRoundedIcon sx={{fontSize:'30px', color: 'rgb(156 163 175)', ":hover":{color:"rgb(62 232 181)"}}} />
                            </button>
                            <div>
                                <Stories
                                    loop={true}
                                    height={500}
                                    width={300}
                                    keyboardNavigation={true}
                                    storyContainerStyles={{ borderRadius: '15px', border: '1px solid gray' }}
                                    onStoryStart={onStoryStart}
                                    stories={stories}
                                    currentIndex={selectedIndex}
                                />
                            </div>
                            <button className='hidden sm:block' type="button" onClick={onNext}>
                                <ArrowCircleRightRoundedIcon sx={{fontSize:'30px', color: 'rgb(156 163 175)', ":hover":{color:"rgb(62 232 181)"}}} />
                            </button>
                        </div>
                    </div>

                </div>
            </section>

        </div>
    );
};

export default Hero;