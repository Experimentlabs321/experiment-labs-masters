import InstagramIcon from '@mui/icons-material/Instagram';
import React, { useState } from 'react';
//import './style.css';
//import collan from '../../../assets/collan.png';


const PeopleS = ({ peopleSpeakData }) => {
    const [peopleSpeaks, setPeopleSpeakData] = useState([...peopleSpeakData?.reviews]);
    return (
        <div className='pt-40 pb-20 px-10 lg:px-28 bg-[#fff]'>
            <div className='flex items-start justify-between gap-10'>
                <div>
                    <h1 className='text-[32px] font-bold text-[#000]'>People Speak @  {peopleSpeakData?.organizationName}</h1>
                    <p style={{borderBottom: "2px solid #4555BA"}}> 
                    </p>
                </div>
            </div>
            <div className='mt-12 flex justify-between items-end gap-10 overflow-x-scroll scroll-smooth my-container'>
                {
                    peopleSpeaks?.map((review) => (
                        <div>
                            <iframe
                                width="290"
                                height="480"
                                className='rounded-3xl'
                                src={review?.videoLink}
                                allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                                title="Embedded youtube"
                            />
                        </div>
                    ))
                }

              
                <img className='lg:block hidden' style={{ height: '170px' }} src={peopleSpeaks?.image} alt="" />
            </div>
        </div>
    );
};

export default PeopleS;