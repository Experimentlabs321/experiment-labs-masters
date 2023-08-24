import React, { useState } from 'react';
import axios from 'axios';

const ZoomIntegration = () => {
    const [meetingLink, setMeetingLink] = useState('');

    const clientId = 'e_FuOBgNQwC1bQu3AJT5yg';
    const clientSecret = 'Wgk4MOvEykfhWjTVYdSOR1Jt3IP3wQ17';
    const redirectUri = window.location.href;
    const scope = 'meeting:write:admin';

    const authorizationUrl = `https://zoom.us/oauth/authorize?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}`;

    const handleCreateMeeting = async () => {
        // Redirect user to the Zoom authorization URL
        window.location.href = authorizationUrl;
    };

    const createMeeting = async (authorizationCode) => {
        const tokenUrl = 'https://zoom.us/oauth/token';

        const tokenData = new URLSearchParams();
        tokenData.append('grant_type', 'authorization_code');
        tokenData.append('code', authorizationCode);
        tokenData.append('redirect_uri', redirectUri);

        const authHeader = `Basic ${btoa(`${clientId}:${clientSecret}`)}`;

        try {
            const tokenResponse = await axios.post(tokenUrl, tokenData, {
                headers: {
                    'Authorization': authHeader,
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            });

            const accessToken = tokenResponse.data.access_token;

            const createMeetingUrl = 'https://api.zoom.us/v2/users/me/meetings';
            const meetingData = {
                topic: 'My Zoom Meeting',
                type: 2, // Instant meeting
            };

            const headers = {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`,
            };

            try {
                const response = await axios.post(createMeetingUrl, meetingData, { headers });
                setMeetingLink(response.data.join_url); // Store the meeting link
            } catch (error) {
                console.error('Error creating meeting:', error.response.data);
            }
        } catch (error) {
            console.error('Error exchanging authorization code for access token:', error);
        }
    };

    // Check if the URL contains an authorization code
    const urlParams = new URLSearchParams(window.location.search);
    const authorizationCode = urlParams.get('code');
    if (authorizationCode) {
        // Call createMeeting if authorization code is present
        createMeeting(authorizationCode);
    }

    return (
        <div>
            {meetingLink ? (
                <div>
                    <p>Meeting created! Here's the link:</p>
                    <a href={meetingLink} target="_blank" rel="noopener noreferrer">{meetingLink}</a>
                </div>
            ) : (
                <button onClick={handleCreateMeeting}>Create Meeting</button>
            )}
        </div>
    );
};

export default ZoomIntegration;
