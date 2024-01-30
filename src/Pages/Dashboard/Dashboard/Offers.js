import React from 'react';
import Layout from '../Layout';
import OffersTop from './OffersComponent/OffersTop';

const Offers = () => {
    return (
        <div>
            <Layout>
                <div className='p-8'>
                    <OffersTop/>
                </div>
            </Layout>
        </div>
    );
};

export default Offers;