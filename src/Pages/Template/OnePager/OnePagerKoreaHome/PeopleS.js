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
                    <h1 className='text-[32px] font-bold text-[#000]'>무료 강의</h1>
                    <p style={{ borderBottom: "2px solid #4555BA" }}>
                    </p>
                </div>
            </div>
            <div className='mt-12 flex justify-between items-end gap-7 overflow-x-scroll scroll-smooth my-container'>
                {
                    peopleSpeaks?.map((review) => (
                        <div>
                            <iframe className='rounded-3xl' width="380" height="420" src={review?.videoLink} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
                        </div>
                    ))
                }



            </div>
        </div>
    );
};

export default PeopleS;