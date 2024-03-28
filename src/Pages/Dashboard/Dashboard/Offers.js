import React, { useContext, useEffect, useState } from 'react';
import Layout from '../Layout';
import OffersTop from './OffersComponent/OffersTop';
import OffersTable from './OffersComponent/OffersTable';
import { AuthContext } from '../../../contexts/AuthProvider';
import axios from 'axios';

const Offers = () => {
    const [offerData, setOfferData] = useState([]);
    const { userInfo } = useContext(AuthContext);
    const [isLoading , setIsLoading] = useState(false);

    const getAllOffers = async () => {
        setIsLoading(true);
        const res = await axios.get(`${process.env.REACT_APP_SERVER_API}/api/v1/offers/organizationId/${userInfo?.organizationId}`);
        setOfferData(res.data.result.reverse());
        setIsLoading(false);
    }

    useEffect(() => {
        getAllOffers();
    }, [userInfo]);

    return (
        <div>
            <Layout>
                <div className='p-8'>
                    <OffersTop
                        setOfferData={setOfferData}
                        offerData={offerData}
                        getAllOffers={getAllOffers}
                    />
                    <OffersTable
                        setOfferData={setOfferData}
                        offerData={offerData}
                        getAllOffers={getAllOffers}
                        isLoading={isLoading}
                    />
                </div>
            </Layout>
        </div>
    );
};

export default Offers;