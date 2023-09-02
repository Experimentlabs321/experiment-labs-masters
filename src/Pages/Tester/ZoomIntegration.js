// import React, { useState } from 'react';
// import axios from 'axios';

// const ZoomIntegration = () => {

//     const handleCreateMeeting = async () => {
//         fetch('http://localhost:5000/create-meeting')
//             .then(res => console.log(res))
//             .then(error => console.error(error))
//     };

//     return (
//         <div>
//             <h1>Zoom Integration</h1>
//             <button onClick={handleCreateMeeting}>Create Meeting</button>
//         </div>
//     );
// };

// export default ZoomIntegration;

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useLocation } from 'react-router-dom';

const ZoomIntegration = () => {
    const location = useLocation();
    const [isConnected, setIsConnected] = useState(false);

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const code = queryParams.get('code');

        if (code) {
            exchangeCodeForToken(code);
        }

    }, [location.search]);

    const connectZoom = async (event) => {
        event.preventDefault();
        const form = event.target;
        const clientIdValue = form.clientId.value;
        const clientSecretValue = form.clientSecret.value;
        console.log(clientIdValue);
        console.log(clientSecretValue);
        localStorage.setItem('clientId', JSON.stringify(clientIdValue));
        localStorage.setItem('clientSecret', JSON.stringify(clientSecretValue));
        if (clientIdValue && clientSecretValue) {
            // const clientID = 'e_FuOBgNQwC1bQu3AJT5yg';
            const redirectURI = 'http://localhost:3000/test'; // Make sure it matches the URI registered in your Zoom app

            window.location.href = `https://zoom.us/oauth/authorize?response_type=code&client_id=${clientIdValue}&redirect_uri=${redirectURI}`;
        }

    };

    const exchangeCodeForToken = async (code) => {
        const clientId = JSON.parse(localStorage.getItem('clientId'));
        const clientSecret = JSON.parse(localStorage.getItem('clientSecret'));
        console.log('From Local Storage: ', clientId);
        console.log('From Local Storage: ', clientSecret);
        try {
            const response = await axios.post('http://localhost:5000/createMeeting', {
                authCode: code,
                clientId,
                clientSecret
            });

            setIsConnected(true);
            console.log('Meeting created:', response.data);
        } catch (error) {
            console.error('Error creating meeting:', error);
        }
    };

    return (
        <div className='p-20'>
            {!isConnected ? (
                <form onSubmit={connectZoom}>
                    <input
                        type='text'
                        className='border-2 rounded-md p-2 mr-2'
                        placeholder='Client ID'
                        name='clientId'
                    />
                    <input
                        type='text'
                        className='border-2 rounded-md p-2 mr-2'
                        placeholder='Client Secret'
                        name='clientSecret'
                    />
                    <input
                        className='p-2 mt-24 bg-slate-500 text-white m-10 rounded-md'
                        type='submit'
                        value={'Connect to Zoom'}
                    />
                </form>
            ) : (
                <p>You are connected to Zoom and a meeting has been created.</p>
            )}
        </div>
    );
};

export default ZoomIntegration;

