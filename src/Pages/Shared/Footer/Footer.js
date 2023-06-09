import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../../assets/Frame 155 1.png';
import YouTubeIcon from '@mui/icons-material/YouTube';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/Twitter';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import './style.css';

const Footer = () => {
    const navItems = <>

        <Link className='flex items-center gap-2 mb-1'><FiberManualRecordIcon sx={{fontSize:'8px'}}/> Contact Us</Link>
        <Link className='flex items-center gap-2 mb-1'><FiberManualRecordIcon sx={{fontSize:'8px'}}/>Terms & Conditions</Link>
        <Link className='flex items-center gap-2 mb-1'><FiberManualRecordIcon sx={{fontSize:'8px'}}/>Code of Conduct</Link>
        <Link className='flex items-center gap-2 mb-1'><FiberManualRecordIcon sx={{fontSize:'8px'}}/>Cookie & Privacy Policy</Link>

    </>
    return (
        <div className='bg-dark'>
            <footer className="text-white" style={{background:'linear-gradient(357.6deg, #000000 7.81%, rgba(0, 0, 0, 0.609575) 171.95%), #6278FF'}}>
                <div className='px-10 md:px-40'>
                    <div className="container flex flex-col lg:flex-row-reverse justify-between py-32 mx-auto">
                        <div>
                            <Link to={'/'} href="#" className="flex justify-start">
                                <div className="flex items-center gap-2">
                                    <img className='h-2/3' src={logo} alt="" />
                                    <span className='text-logo-white text-xl font-bold'>Experiment Labs</span>
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

                                    <ul className="flex flex-col mt-3">
                                        {navItems}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="py-6 text-sm text-center text-white mt-[-50px]">© 2023 Experiment Labs. All rights reserved.</div>
                </div>
            </footer>
        </div>
    );
};

export default Footer;