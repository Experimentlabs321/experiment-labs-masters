import React from 'react';
import dummy from '../../../assets/Screenshot 2023-05-19 163559.png';

const Timeline = () => {
    return (
        <div className='px-10 lg:px-32'>
            <img style={{width:"100%", height:"auto", objectFit:'cover'}} src={dummy} alt="" />
        </div>
    );
};

export default Timeline;