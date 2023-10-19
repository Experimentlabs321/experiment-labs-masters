// import React, { useState } from 'react';
// import axios from 'axios';

// const ZoomIntegration = () => {

//     const handleCreateMeeting = async () => {
//         fetch('${process.env.REACT_APP_BACKEND_API}/create-meeting')
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
        const clientIdValue = process.env.REACT_APP_zoom_clientId;
        const redirectURI = process.env.REACT_APP_zoom_redirectUri; // Make sure it matches the URI registered in your Zoom app
        console.log("Clicked", clientIdValue);
        window.location.href = `https://zoom.us/oauth/authorize?response_type=code&client_id=${clientIdValue}&redirect_uri=${redirectURI}`;


    };

    const exchangeCodeForToken = async (code) => {
        try {
            const response = await axios.post(`${process.env.REACT_APP_BACKEND_API}/createMeeting`, {
                authCode: code
            });

            setIsConnected(true);
            console.log('Meeting created:', response.data.meeting);
            localStorage.setItem("refresh_token", response.data.tokenResponse.refresh_token);
        } catch (error) {
            console.error('Error creating meeting:', error);
        }
    };



    return (
        <div className='p-20'>
            {!isConnected ? (
                <form onSubmit={connectZoom}>
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

