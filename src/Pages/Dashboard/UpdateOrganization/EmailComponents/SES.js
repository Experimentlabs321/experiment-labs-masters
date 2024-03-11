import React, { useEffect, useState } from 'react';
import Swal from "sweetalert2";
import axios from "axios";
import SESCreateTemplate from './SESCreateTemplate';

const SES = ({ orgData }) => {
    const [accessKeyId, setAccessKeyId] = useState("");
    const [secretAccessKey, setSecretAccessKey] = useState("");
    const [region, setRegion] = useState("");
    const [templateName, setTemplateName] = useState("");
    const [showForm , setShowForm] = useState(false);
    const [sesEmail , setSesEmail] = useState();
    const [emailTemplates , setEmailTemplates] = useState();

    // console.log(orgData);
    useEffect(() => {
        if (orgData?._id!==undefined) {
            axios.get(
                `${process.env.REACT_APP_SERVER_API}/api/v1/organizations/e/${orgData?._id}`
                // `http://localhost:5000/api/v1/organizations/e/${orgData?._id}`
            )
                .then((response) => {
                    setAccessKeyId(response.data?.accessKeyId);
                    setSecretAccessKey(response.data?.secretAccessKey);
                    setRegion(response.data?.region);
                    setTemplateName(response.data?.templateName);
                    setSesEmail(response.data?.sesEmail);
                    setEmailTemplates(response.data?.emailTemplates);
                    console.log(emailTemplates);
                })
                .catch((error) => console.error(error));
        }

    }, [orgData]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        // const form = event.target;

        const orgInfo = {
            emailIntegration: {
                sendFrom: "ses",
                accessKeyId,
                secretAccessKey,
                region,
                templateName,
                sesEmail
            }
        };
        // console.log("Data ==========>",orgData?._id);

        const updateOrg = await axios.put(
            `${process.env.REACT_APP_SERVER_API}/api/v1/organizations/e/${orgData?._id}`,
            // `http://localhost:5000/api/v1/organizations/e/${orgData?._id}`,
            orgInfo
        );

        if (updateOrg?.data?.acknowledged) {
            Swal.fire({
                title: "Updated successfully!",
                icon: "success",
            });
        }
    };

    return (
        <div className="flex items-center justify-center w-full my-4">
            <div className="w-full">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-semibold text-gray-800">AWS SES Integration</h2>
                    <button onClick={()=>setShowForm(!showForm)} className="py-2 px-4 bg-blue hover:bg-blue-700 focus:outline-none focus:bg-blue-700 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition duration-300">
                        Create Template
                    </button>
                </div>
                {showForm && <SESCreateTemplate orgData={orgData}/>}
                <form>
                    <div className="grid grid-cols-4 gap-6 mb-4">
                        <div>
                            <label className="block text-gray-700 w-full font-bold mb-2" htmlFor={`accessKeyId`}>
                                SES Email
                            </label>
                            <input
                                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id={`accessKeyId`}
                                type="text"
                                value={sesEmail}
                                onChange={(e) => setSesEmail(e.target.value)}
                                placeholder={`IAM USER AccessKeyId`}
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 w-full font-bold mb-2" htmlFor={`accessKeyId`}>
                                AccessKeyId
                            </label>
                            <input
                                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id={`accessKeyId`}
                                type="text"
                                value={accessKeyId}
                                onChange={(e) => setAccessKeyId(e.target.value)}
                                placeholder={`IAM USER AccessKeyId`}
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 w-full font-bold mb-2" htmlFor={`secretAccessKey`}>
                                SecretAccessKey
                            </label>
                            <input
                                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id={`secretAccessKey`}
                                type="text"
                                value={secretAccessKey}
                                onChange={(e) => setSecretAccessKey(e.target.value)}
                                placeholder={`IAM USER SecretAccessKey`}
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 w-full font-bold mb-2" htmlFor={`secretAccessKey`}>
                                Region
                            </label>
                            <input
                                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id={`region`}
                                type="text"
                                placeholder={`ap-south-1`}
                                value={region}
                                onChange={(e) => setRegion(e.target.value)}
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 w-full font-bold mb-2" htmlFor="select">
                                Select Template
                            </label>
                            <select
                                className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                                id="templateName"
                                value={templateName}
                                onChange={(e) => setTemplateName(e.target.value)}
                            >
                                <option>Select an Email Template</option>
                                {
                                    emailTemplates?.map((template , index)=> 
                                    <option key={index} value={template?.templateName}>{template?.templateName}</option>
                                    )
                               
                                }
                            </select>
                        </div>
                    </div>
                    <div className="flex items-center justify-start mt-4">
                        <button onClick={handleSubmit} className="px-4 py-2 bg-green hover:bg-green focus:outline-none focus:bg-green text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition duration-300">
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SES;