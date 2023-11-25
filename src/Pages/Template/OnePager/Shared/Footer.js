import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../../../assets/Frame 155 1.png';
import YouTubeIcon from '@mui/icons-material/YouTube';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/Twitter';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
//import './style.css';

const Footer = () => {
    const navItems = <>

        <Link target='_blank' className='flex items-center gap-2 mb-1 hover:text-purple'><FiberManualRecordIcon sx={{fontSize:'8px'}}/> Contact Us</Link>
        <Link to={'https://login.experimentlabs.in/termsofuse'} target='_blank' className='flex items-center gap-2 mb-1 hover:text-purple'><FiberManualRecordIcon sx={{fontSize:'8px'}}/>Terms & Conditions</Link>
        <Link to={'https://login.experimentlabs.in/refundpolicy'} target='_blank' className='flex items-center gap-2 mb-1 hover:text-purple'><FiberManualRecordIcon sx={{fontSize:'8px'}}/>Refund Policy</Link>
        <Link to={'https://login.experimentlabs.in/privacypolicy'} target='_blank' className='flex items-center gap-2 mb-1 hover:text-purple'><FiberManualRecordIcon sx={{fontSize:'8px'}}/>Cookie & Privacy Policy</Link>

    </>
    return (
        <div
         style={{borderTop: "1px solid #4555BA"}}
        className='bg-[#fff] mt-[90px]'>
            <footer className="" >
                <div className='px-10 lg:px-40'>
                    <div className="container flex flex-col lg:flex-row-reverse justify-between py-32 mx-auto">
                        <div>
                            <Link to={'/'} href="#" className="flex justify-start">
                                <div className="flex items-center gap-2">
                                    <img className='h-2/3' src={logo} alt="" />
                                    <span className='text-[#242424] text-xl font-bold'>Experiment Labs</span>
                                </div>
                            </Link>
                        </div>
                        <div className="grid grid-cols-1 lg:mt-0 mt-20">
                            <div>
                                <span>
                                    <div>
                                        <span className='font-bold text-2xl'>Further Information</span>
                                    </div>
                                </span>
                                <div className="flex mt-10">

                                    <ul className="flex flex-col mt-3 text-[#242424]">
                                        {navItems}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="py-6 text-sm text-center text-[#242424] mt-[-50px]">© 2023 Experiment Labs. All rights reserved.</div>
                </div>
            </footer>
        </div>
    );
};

export default Footer;