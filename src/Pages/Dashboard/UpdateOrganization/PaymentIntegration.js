import React, { useContext, useEffect, useState } from 'react';
import axios from "axios";
import Swal from "sweetalert2";
import { AuthContext } from '../../../contexts/AuthProvider';

const PaymentIntegration = ({ paymentInstance, setPaymentInstance, orgData }) => {
    const {userInfo} = useContext(AuthContext)
    console.log(paymentInstance);
    const [key_id, setKey_id] = useState(paymentInstance?.key_id);
    const [key_secret, setKey_secret] = useState(paymentInstance?.key_secret);
    const [loading, setLoading] = useState(false);
    const [itemDetails, setItemDetails] = useState();
    useEffect(() => {
      if (userInfo) {
        setLoading(true);
        axios
          .get(
            `${process.env.REACT_APP_SERVERLESS_API}/api/v1/language/getUpdateOrganizationSubDetailsByOrganizationAndName/paymentIntegration/organizationsId/${userInfo?.organizationId}`
          )
          .then((response) => {
  
            console.log(response)
            setItemDetails(response?.data);
  
          })
          .finally(() => {
            setLoading(false);
          });
      }
      setLoading(false);
    }, [userInfo]);
    console.log(itemDetails)

    const handleSubmit = async (event) => {
        event.preventDefault();
        // const form = event.target;

        const orgInfo = {
            paymentInstance: {
                key_id,
                key_secret
            }
        };

        // console.log("Data ==========>",orgInfo);

        const updateOrg = await axios.put(
            `${process.env.REACT_APP_SERVERLESS_API}/api/v1/organizations/${orgData?._id}`,
            orgInfo
        );

        if (updateOrg?.data?.acknowledged) {
            setPaymentInstance(orgInfo?.paymentInstance);
            Swal.fire({
                title: itemDetails?.updatedSuccessfully ? itemDetails?.updatedSuccessfully : "Updated successfully!",
                icon: "success",
              });
        }
    };

    return (
        <div className="px-4 mt-4">
            <form onSubmit={handleSubmit} className='mt-5'>
                <div className='flex flex-col lg:flex-row gap-10'>
                    <div>
                        <label
                            htmlFor="textInput"
                            className="block text-lg font-semibold text-gray-700"
                        >
                            {itemDetails?.keyId ? itemDetails?.keyId : "Key Id"}
                            
                        </label>
                        <input
                            type="text"
                            defaultValue={key_id}
                            onChange={(e) => setKey_id(e.target.value)}
                            className="mt-1 p-2 w-[300px] border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                        />
                    </div>
                    <div className="">
                        <label
                            htmlFor="textInput"
                            className="block text-lg font-semibold text-gray-700"
                        >
                            {itemDetails?.keySecret ? itemDetails?.keySecret : "Key Secret"}
                            
                        </label>
                        <input
                            type="text"
                            defaultValue={key_secret}
                            onChange={(e) => setKey_secret(e.target.value)}
                            className="mt-1 p-2 w-[300px] border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                        />
                    </div>
                </div>
                <input
                    className="bg-green my-8 hover:bg-opacity-60 text-white py-3 px-4 font-bold rounded-lg cursor-pointer"
                    value={itemDetails?.save ? itemDetails?.save : "Save"}
                    type="submit"
                />
            </form>
        </div>
    );
};

export default PaymentIntegration;