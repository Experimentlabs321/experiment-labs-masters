import React, { useState } from 'react';
import img1 from '../../../assets/img1.jpg';
import img2 from '../../../assets/img2.jpg';
import img3 from '../../../assets/img3.jpg';
import img4 from '../../../assets/img4.jpg';

const Campus = () => {
    const [selected , setSelected] = useState(1);
    const [images , setImages] = useState([
        img1,
        img2,
        img3,
        img4,
    ]);
    return (
        <div className='px-10 lg:px-28 pt-40'>
            <h1 className='text-3xl font-bold bg-gradient-to-t from-custom-blue to-transparent to-50% inline'>Urban Campus</h1>
            <p className='text-lg mt-4 font-light'>Situated in CyberPark, Gurugram, flanked by over 600 MNCs</p>
            <div className='mt-6 lg:block hidden'>
                <div className='flex justify-evenly gap-10'>
                    <button onClick={()=>setSelected(1)} className={`${(selected===1) && 'border-b-4 border-r-4 border-custom-blue border-opacity-40'} w-full text-lg font-bold py-4 rounded-lg bg-[#424242]`}>Tower A</button>
                    <button onClick={()=>setSelected(2)} className={`${(selected===2) && 'border-b-4 border-r-4 border-custom-blue border-opacity-40'} w-full text-lg font-bold py-4 rounded-lg bg-[#424242]`}>Tower C</button>
                    <button onClick={()=>setSelected(3)} className={`${(selected===3) && 'border-b-4 border-r-4 border-custom-blue border-opacity-40'} w-full text-lg font-bold py-4 rounded-lg bg-[#424242]`}>Auditorium</button>
                    <button onClick={()=>setSelected(4)} className={`${(selected===4) && 'border-b-4 border-r-4 border-custom-blue border-opacity-40'} w-full text-lg font-bold py-4 rounded-lg bg-[#424242]`}>Food Court</button>
                </div>
            </div>
            <div className='mt-10'>
                <img style={{width:'100%', height:'600px', objectFit:'cover', borderRadius:'8px', borderRight:'4px solid rgba(57,127,235,0.4)', borderBottom:'4px solid rgba(57,127,235,0.4)'}} src={images[selected-1]} alt="" />
            </div>
        </div>
    );
};

export default Campus;