import { Button } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import ArrowCircleRightOutlinedIcon from '@mui/icons-material/ArrowCircleRightOutlined';
import LanguageIcon from '@mui/icons-material/Language';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import Stories from 'react-insta-stories';
import ArrowCircleLeftRoundedIcon from '@mui/icons-material/ArrowCircleLeftRounded';
import ArrowCircleRightRoundedIcon from '@mui/icons-material/ArrowCircleRightRounded';
import './style.css';
import img from '../../../assets/heroImg.png'
import BgImg from '../../../assets/HeroBg.png';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';


const Hero = ({ onButtonClick }) => {
    // const visibleIndex = useRef(0);

    // const [stories, setStories] = useState([
    //     {
    //         url: 'https://dsqqu7oxq6o1v.cloudfront.net/motion-array-1388812-A012_06252056_C069-high.mp4',
    //         type: 'video'
    //     },
    //     {
    //         url: 'https://dsqqu7oxq6o1v.cloudfront.net/motion-array-1075852-dV3Kxdk8Sn-high.mp4',
    //         type: 'video'
    //     },
    //     {
    //         url: 'https://dsqqu7oxq6o1v.cloudfront.net/motion-array-1290096-NRkICuxxxg-high.mp4',
    //         type: 'video'
    //     },
    //     {
    //         url: 'https://dsqqu7oxq6o1v.cloudfront.net/motion-array-1347899-LeKv7SHCYU-high.mp4',
    //         type: 'video'
    //     },
    // ]);

    // const [currentVideo, setCurrentVideo] = useState(stories[0]?.url);

    // const [selectedIndex, setSelectedIndex] = useState(0);

    // const mySourceRef = useRef(null);
    // const myVideoRef = useRef(null);

    // const onStoryStart = (index) => {
    //     visibleIndex.current = index;
    //     const mySource = mySourceRef.current;
    //     const myVideo = myVideoRef.current;

    //     if (mySource && myVideo) {
    //         mySource.src = stories[index]?.url;
    //         myVideo.load();
    //     }

    // };

    // const onNext = () => {
    //     const i = (visibleIndex.current + 1) % 4;
    //     visibleIndex.current = i;
    //     setSelectedIndex(i);
    //     setCurrentVideo(stories[i]?.url);
    // };

    // const onPrevious = () => {
    //     let i = (visibleIndex.current - 1);
    //     if (i === -1) {
    //         i += 4;
    //     }
    //     visibleIndex.current = i;
    //     setSelectedIndex(i);
    //     setCurrentVideo(stories[i]?.url);
    // };



    // useEffect(() => {

    //     const mySource = mySourceRef.current;
    //     const myVideo = myVideoRef.current;

    //     if (mySource && myVideo) {
    //         mySource.src = currentVideo;
    //         myVideo.load();
    //     }
    // }, [currentVideo]);


    // console.log(stories[selectedIndex].url, selectedIndex);

    return (
        <div>
            <section className="lg:h-[585px] text-white">
                <div style={{ height: "100%", backgroundImage: "linear-gradient(to top left, #000000 -10%, rgba(0, 0, 0, 0.6096) 35.55%, rgba(0, 0, 0, 0) 100%)", backgroundColor: '#6278FF' }} className="flex lg:justify-end items-center">
                    <div className="relative">
                        <div className='pt-28 pb-20 px-10 lg:pr-10 lg:-mr-56 lg:pl-10'>
                            <h1 className="text-5xl font-bold">Discover Your Path to Success <br />
                                with Real-World Experience</h1>
                            <p className='mt-8 mb-12 text-3xl'>Build leadership like a muscle</p>

                            {/* <div className='my-8 text-white flex flex-col gap-3 justify-start'>
                            <span><LanguageIcon className='mr-2' /> Curriculum that takes learning<span className='font-bold initial'> {` beyond the classroom`}</span></span>
                            <span><BusinessCenterIcon className='mr-2' /> Classes led by <span className='font-bold initial'>100+ MDs, CEOs & Founders</span></span>
                            <span><CurrencyRupeeIcon className='mr-2' />Placements driven courses with <span className='font-bold initial'>profile building,stream selection and career planning</span></span>
                        </div> */}

                            <Button onClick={onButtonClick} sx={{ bgcolor: '#FF557A', ":hover": { bgcolor: '#94A4FF' }, padding: '10px 30px 10px 50px', color: 'white', fontWeight: "500", fontSize: '22px', textTransform:'initial', borderRadius:'45px' }} variant="contained" endIcon={<ArrowForwardIosIcon className='h-6 w-6' />}>
                                Learn More
                            </Button>
                        </div>


                    </div>



                    {/* <div className='hidden lg:block md:col-span-6 lg:h-full relative h-[600px]'>
                        <div style={{ position: 'absolute', top: '0', left: '0', width: "100%", height: "100%", backgroundColor: 'rgba(128,128,128,0.8)' }}></div>
                        <video ref={myVideoRef} style={{ width: "100%", height: "100%", objectFit: "cover", WebkitFilter: "blur(5px) saturate(1)" }} muted>
                            <source ref={mySourceRef} src={currentVideo} type="video/mp4" />
                        </video>
                        <div className='flex justify-center items-center gap-5' style={{
                            position: "absolute",
                            top: "50%",
                            left: "50%",
                            transform: "translate(-50%, -50%)"
                        }}>
                            <button className='hidden sm:block' type="button" onClick={onPrevious}>
                                <ArrowCircleLeftRoundedIcon className='opacity-80' sx={{ fontSize: '30px', color: 'rgb(156 163 175)', ":hover": { color: "rgb(62 232 181)" } }} />
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
                                <ArrowCircleRightRoundedIcon className='opacity-80' sx={{ fontSize: '30px', color: 'rgb(156 163 175)', ":hover": { color: "rgb(62 232 181)" } }} />
                            </button>
                        </div>
                    </div> */}
                    <img className='z-50 max-w-[60vw] h-[100%] object-cover hidden lg:block' src={img} alt="" />
                    <img className='absolute top-0 h-[600px] right-36 opacity-20 hidden lg:block' src={BgImg} alt="" />
                </div>
            </section>

        </div>
    );
};

export default Hero;