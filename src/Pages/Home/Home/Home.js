import React, { useRef } from 'react';
import MyHelmet from '../../../Components/MyHelmet/MyHelpmet';
import Hero from '../Hero/Hero';
import Feature from '../Feature/Feature';
import TakeTest from '../TakeTest/TakeTest';
import AllCourses from '../AllCourses/AllCourses';

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
        </div>
    );
};

export default Home;