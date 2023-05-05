import React, { useRef } from 'react';
import MyHelmet from '../../../Components/MyHelmet/MyHelpmet';
import Hero from '../Hero/Hero';
import Feature from '../Feature/Feature';

const Home = () => {

    const featureRef = useRef(null);

    const handleButtonClick = () => {
        featureRef.current.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <div>
            <MyHelmet>Home</MyHelmet>
            <div className='mt-[3rem]'>
                <Hero onButtonClick={handleButtonClick} />
            </div>
            <div ref={featureRef}>
                <Feature/>
            </div>
        </div>
    );
};

export default Home;