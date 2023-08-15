import React, { useState } from 'react';
import uploadFileToS3 from './s3Uploader';

const UploadComponent = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [url, setUrl] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    try {
      const fileUrl = await uploadFileToS3(selectedFile);
      setUrl(fileUrl);
      // Now you can save 'fileUrl' in your database
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
      <img style={{ width: '1000px' }} src={url} alt="" />
    </div>
  );
};

export default UploadComponent;
