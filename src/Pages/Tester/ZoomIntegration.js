import React, { useState } from 'react';
import axios from 'axios';

const ZoomIntegration = () => {

    const handleCreateMeeting = async () => {
        fetch('http://localhost:5000/create-meeting')
            .then(res => console.log(res))
            .then(error => console.error(error))
    };

    return (
        <div>
            <h1>Zoom Integration</h1>
            <button onClick={handleCreateMeeting}>Create Meeting</button>
        </div>
    );
};

export default ZoomIntegration;
