import React from 'react';
import MyHelmet from '../../../Components/MyHelmet/MyHelpmet';
import Hero from '../Hero/Hero';

const Home = () => {
    return (
        <div>
            <MyHelmet>Home</MyHelmet>
            <div className='mt-[3rem]'>
                <Hero />
            </div>
        </div>
    );
};

export default Home;