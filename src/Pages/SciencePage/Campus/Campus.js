import React, { useState } from 'react';
import img1 from '../../../assets/Campus/img1.png';
import img2 from '../../../assets/Campus/img2.png';
import img3 from '../../../assets/Campus/img3.png';
import vector from '../../../assets/Campus/Vector (1).png';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

const Campus = () => {
    const [selected, setSelected] = useState(1);
    const [images, setImages] = useState([
        img1,
        img2,
        img3,
    ]);
    return (
        <div className='px-10 lg:px-28 pt-40'>
            <h1 className='text-4xl font-bold'>Urban Campuses</h1>
            <p className='text-lg mt-4 font-light lg:ml-14'>Situated in Central Delhi, 0.8Kms from Connaught Place </p>
            <div className='mt-6 lg:block hidden px-14'>
                <div className='flex justify-start items-start gap-6'>
                    <img src={vector} alt="" />
                    <button onClick={() => setSelected(1)} className={`${(selected === 1) && 'bg-purple font-bold'} border-2 border-purple rounded-3xl py-1 px-12`}>Common Area</button>
                    <button onClick={() => setSelected(2)} className={`${(selected === 2) && 'bg-purple font-bold'} border-2 border-purple rounded-3xl py-1 px-12`}>Experiment Studio</button>
                    <button onClick={() => setSelected(3)} className={`${(selected === 3) && 'bg-purple font-bold'} border-2 border-purple rounded-3xl py-1 px-12`}>Conference  office</button>
                </div>
            </div>
            <div className='mt-10 flex gap-5'>
                <button onClick={()=>setSelected(selected!==1 ? selected - 1 : 3)} className='hidden lg:block' type="button">
                    <ArrowBackIosNewIcon sx={{ fontSize: '28px', color: '#141414', borderRadius: '50%', ":hover": { color: "#397FEB" }, background: '#94A4FF', height: '40px', width: '40px', padding: '5px' }} />
                </button>
                <img style={{ width: '100%', maxHeight: '600px', objectFit: 'cover', borderRadius: '24px' }} src={images[selected - 1]} alt="" />
                <button onClick={()=>setSelected(selected!==3 ? selected+1 : 1)} className='hidden lg:block' type="button">
                    <ArrowForwardIosIcon sx={{ fontSize: '28px', color: '#141414', borderRadius: '50%', ":hover": { color: "#397FEB" }, background: '#94A4FF', height: '40px', width: '40px', padding: '5px' }} />
                </button>
            </div>
        </div>
    );
};

export default Campus;