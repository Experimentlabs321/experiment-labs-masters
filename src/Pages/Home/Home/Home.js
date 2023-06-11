import React, { useEffect, useRef } from 'react';
import MyHelmet from '../../../Components/MyHelmet/MyHelpmet';
import Hero from '../Hero/Hero';
import Feature from '../Feature/Feature';
import TakeTest from '../TakeTest/TakeTest';
import AllCourses from '../AllCourses/AllCourses';
import AiTutor from '../AIiTutor/AiTutor';
import MeetTheMaster from '../MeetTheMasters/MeetTheMaster';
import CEOChallenge from '../CEOChallenge/CEOChallenge';
import LifeAtUnion from '../LifeAtUnion/LifeAtUnion';
import ExperienceUnion from '../ExperienceUnion/ExperienceUnion';
import Campus from '../../SciencePage/Campus/Campus';

const Home = () => {

    const featureRef = useRef(null);

    const handleButtonClick = () => {
        const featurePosition = featureRef.current.getBoundingClientRect().top;
        const headerHeight = 80;
        window.scrollTo({ top: featurePosition - headerHeight, behavior: 'smooth' });
    };

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);


    return (
        <div style={{width:'100%'}} className='bg-dark text-white'>
            <MyHelmet>Home</MyHelmet>
            <div className='mt-[3rem]'>
                <Hero onButtonClick={handleButtonClick} />
            </div>
            <div ref={featureRef}>
                <Feature />
            </div>
            <TakeTest/>
            <AllCourses/>
            {/* <AiTutor/> */}
            <MeetTheMaster/>
            <CEOChallenge/>
            <LifeAtUnion/>
            <Campus/>
            <ExperienceUnion/>
        </div>
    );
};

export default Home;