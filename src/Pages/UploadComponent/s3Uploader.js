import AWS from 'aws-sdk';

AWS.config.update({
    accessKeyId: process.env.REACT_APP_accessKeyId,
    secretAccessKey: process.env.REACT_APP_secretAccessKey,
    region: process.env.REACT_APP_region
});

const s3 = new AWS.S3();

const uploadFileToS3 = async (file) => {
    const params = {
        Bucket: 'experiment-labs-my-bucket',
        Key: file.name,
        Body: file
    };

    try {
        const response = await s3.upload(params).promise();
        const fileUrl = response.Location; // This is the URL of the uploaded file
        return fileUrl;
    } catch (error) {
        console.error('Error uploading file:', error);
        throw error;
    }
};

export default uploadFileToS3;