import React, { useRef } from 'react';
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

const Home = () => {

    const featureRef = useRef(null);

    const handleButtonClick = () => {
        const featurePosition = featureRef.current.getBoundingClientRect().top;
        const headerHeight = 80;
        window.scrollTo({ top: featurePosition - headerHeight, behavior: 'smooth' });
    };

    return (
        <div>
            <MyHelmet>Home</MyHelmet>
            <div className='mt-[3rem]'>
                <Hero onButtonClick={handleButtonClick} />
            </div>
            <div ref={featureRef}>
                <Feature />
            </div>
            <TakeTest/>
            <AllCourses/>
            <AiTutor/>
            <MeetTheMaster/>
            <CEOChallenge/>
            <LifeAtUnion/>
            <ExperienceUnion/>
        </div>
    );
};

export default Home;