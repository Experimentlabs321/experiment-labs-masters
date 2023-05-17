import React, { useEffect } from 'react';
import MyHelmet from '../../../Components/MyHelmet/MyHelpmet';
import Overview from '../Overview/Overview';
import Masters from '../Masters/Masters';
import Curriculum from '../Curriculum/Curriculum';
import FAQs from '../FAQs/FAQs';
import News from '../News/News';
import Campus from '../Campus/Campus';
import { Link as ScrollLink, animateScroll as scroll } from 'react-scroll';
import Footer from '../../Shared/Footer/Footer';
import ScienceInnovationNav from '../ScienceInnovationNav/ScienceInnovationNav';

const SciencePage = () => {

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const scrollToSection = (sectionId) => {
        scroll.scrollTo(sectionId, {
            duration: 500,  // Adjust the duration as needed
            smooth: 'easeInOutQuart',  // Adjust the easing function as needed
        });
    };

    return (
        <div className='bg-[#121212] text-white'>
            <MyHelmet>Science/Innovation</MyHelmet>

            <ScienceInnovationNav />

            <div id='overview'>
                <Overview />
            </div>

            <div id='masters' className='mt-96'>
                <Masters />
            </div>

            <div id='curriculum' className='mt-96'>
                <Curriculum />
            </div>

            <div id='campus' className='mt-96'>
                <Campus />
            </div>

            <div id='faqs' className='mt-96'>
                <FAQs />
            </div>

            <div id='news' className='mt-96'>
                <News />
            </div>

            <Footer />

        </div>
    );
};

export default SciencePage;