import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../../assets/Logos/Group 2859890.png';
import YouTubeIcon from '@mui/icons-material/YouTube';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/Twitter';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const Footer = () => {
    const navItems = <>

        <Link>Contact Us</Link>
        <Link>Terms & Conditions</Link>
        <Link>Code of Conduct</Link>
        <Link>Cookie & Privacy Policy
        </Link>

    </>
    return (
        <div className='mt-40'>
            <footer className="px-10 md:px-40 text-white bg-black">
                <div className="container flex flex-col justify-between py-10 mx-auto">
                    <div>
                        <Link to={'/'} href="#" className="flex justify-start">
                            <div className="flex">
                                <img className='w-[200px]' src={logo} alt="" />
                            </div>
                        </Link>
                    </div>
                    <div className="grid grid-cols-1 mt-20">
                        <div>
                            <span>
                                <div>
                                    <span className='font-bold text-lg'>Further Information</span>
                                </div>

                                <div className='divider m-0 w-[200px]'></div>
                            </span>
                            <div className="flex">

                                <ul className="flex flex-col mt-3">
                                    {navItems}
                                </ul>
                            </div>
                        </div>
                        <div className="space-y-3 mt-10">
                            <div className="flex justify-start space-x-3">
                                
                                <Link rel="noopener noreferrer" href="#" title="Youtube" className="flex items-center p-1">
                                    <InstagramIcon className='w-6 h-6 hover:text-custom-blue' />
                                </Link>
                                <Link rel="noopener noreferrer" href="#" title="Youtube" className="flex items-center p-1">
                                    <YouTubeIcon className='w-6 h-6 hover:text-custom-blue' />
                                </Link>
                                <Link rel="noopener noreferrer" href="#" title="Youtube" className="flex items-center p-1">
                                    <LinkedInIcon className='w-6 h-6 hover:text-custom-blue' />
                                </Link>
                                <Link rel="noopener noreferrer" href="#" title="Youtube" className="flex items-center p-1">
                                    <TwitterIcon className='w-6 h-6 hover:text-custom-blue' />
                                </Link>
                            </div>
                            <div className='divider'></div>
                        </div>
                    </div>
                </div>
                <div className="py-6 text-sm text-end text-white mt-[-50px]">© 2023 Experiment Labs. All rights reserved.</div>
            </footer>
        </div>
    );
};

export default Footer;