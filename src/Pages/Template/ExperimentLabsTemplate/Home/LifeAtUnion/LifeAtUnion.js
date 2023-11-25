import InstagramIcon from '@mui/icons-material/Instagram';
import React, { useState } from 'react';
import './style.css';
//import collan from '../../../assets/collan.png';


const LifeAtUnion = ({ lifeAtUnionData }) => {
    const [reviews, setReviews] = useState([...lifeAtUnionData?.reviews]);
    return (
        <div className='mt-40 pb-20 px-10 lg:px-28'>
            <div className='flex items-start justify-between gap-10'>
                <div>
                    <h1 className='text-3xl font-semibold'>People Speak @  {lifeAtUnionData?.organizationName}</h1>
                </div>
            </div>
            <div className='mt-12 flex justify-between items-end gap-10 overflow-x-scroll scroll-smooth my-container'>
                {
                    reviews?.map((review) => (
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

                {/*   <div>
                    <iframe
                        width="290"
                        height="480"
                        className='rounded-3xl'
                        src={`https://www.youtube.com/embed/B4QHMqNAP2g`}
                        allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        title="Embedded youtube"
                    />
                </div>
                <div>
                    <iframe
                        width="290"
                        height="480"
                        className='rounded-3xl'
                        src={`https://www.youtube.com/embed/wa617J4UUpw`}
                        allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        title="Embedded youtube"
                    />
                </div> */}
                <img className='lg:block hidden' style={{ height: '170px' }} src={lifeAtUnionData?.image} alt="" />
            </div>
        </div>
    );
};

export default LifeAtUnion;