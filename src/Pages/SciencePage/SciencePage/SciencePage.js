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
import AllCourses from '../../Home/AllCourses/AllCourses';
import DualManagement from '../DualMangement/DualManagement';
import HearFromStudents from '../HearFromStudents/HearFromStudents';
import GetInTouch from '../GetInTouch/GetInTouch';
import CEOChallenge from '../../Home/CEOChallenge/CEOChallenge';

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

            <div id='masters' className='mt-32'>
                <Masters />
            </div>

            <div id='curriculum' className='mt-32'>
                <Curriculum />
                <div className='mt-32'>
                    <DualManagement />
                </div>
                <div className='mt-28'>
                    <CEOChallenge/>
                </div>
                <div className='mt-28'>
                    <AllCourses />
                </div>
                <div className='mt-32'>
                    <HearFromStudents/>
                </div>
                <div className='mt-32'>
                    <GetInTouch/>
                </div>
            </div>



            <div id='campus' className='mt-32'>
                <Campus />
            </div>

            <div id='faqs' className='mt-32 mb-32'>
                <FAQs />
            </div>
{/* 
            <div id='news' className='mt-96'>
                <News />
            </div> */}

            <Footer />

        </div>
    );
};

export default SciencePage;