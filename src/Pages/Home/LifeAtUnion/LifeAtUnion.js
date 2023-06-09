import InstagramIcon from '@mui/icons-material/Instagram';
import React from 'react';
import './style.css';

const LifeAtUnion = () => {
    return (
        <div className='mt-40 pb-20 px-10 lg:px-28'>
            <div className='flex items-start justify-between gap-10'>
                <div>
                    <h1 className='text-2xl xl:text-4xl font-extrabold font bg-gradient-to-t from-custom-blue to-transparent to-50%'>Life at the Union</h1>
                    <p className='text-xl font-thin mt-2'>Step outside the classroom</p>
                </div>
                <button className='hidden sm:flex items-center gap-3 bg-gradient-to-r from-pink-700 via-orange-600 to-yellow text-white px-4 py-3 rounded-lg hover:shadow-xl hover:shadow-orange-200'>Follow on Instagram <InstagramIcon /></button>
            </div>
            <div className='mt-12 flex gap-10 overflow-x-auto scroll-smooth my-container'>
                <div>
                    <iframe
                        width="290"
                        height="480"
                        className='rounded-2xl border-2 border-gray-400'
                        src={`https://dsqqu7oxq6o1v.cloudfront.net/motion-array-1177701-mBCKbnRAFv-high.mp4`}
                        allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        title="Embedded youtube"
                    />
                </div>
                <div>
                    <iframe
                        width="290"
                        height="480"
                        className='rounded-2xl border-2 border-gray-400'
                        src={`https://dsqqu7oxq6o1v.cloudfront.net/motion-array-1177701-mBCKbnRAFv-high.mp4`}
                        allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        title="Embedded youtube"
                    />
                </div>
                <div>
                    <iframe
                        width="290"
                        height="480"
                        className='rounded-2xl border-2 border-gray-400'
                        src={`https://dsqqu7oxq6o1v.cloudfront.net/motion-array-1177701-mBCKbnRAFv-high.mp4`}
                        allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        title="Embedded youtube"
                    />
                </div>
                <div>
                    <iframe
                        width="290"
                        height="480"
                        className='rounded-2xl border-2 border-gray-400'
                        src={`https://dsqqu7oxq6o1v.cloudfront.net/motion-array-1177701-mBCKbnRAFv-high.mp4`}
                        allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        title="Embedded youtube"
                    />
                </div>
            </div>
            <button className='flex sm:hidden w-full justify-center mt-8 items-center gap-3 bg-gradient-to-r from-pink-700 via-orange-600 to-yellow text-white px-4 py-3 rounded-lg hover:shadow-xl hover:shadow-orange-200'>Follow on Instagram <InstagramIcon /></button>
        </div>
    );
};

export default LifeAtUnion;