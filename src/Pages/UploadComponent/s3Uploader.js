// import axios from "axios";

// const uploadFileToS3 = async (file) => {
//   const formData = new FormData();
//   formData.append("file", file);

//   try {
//     const response = await axios.post(
//       `${process.env.REACT_APP_SERVER_API}/api/v1/uploadFile/upload`,
//       formData,
//       {
//         headers: {
//           "Content-Type": "multipart/form-data",
//         },
//       }
//     );
//     const fileUrl = response.data.fileUrl;
//     return fileUrl;
//   } catch (error) {
//     console.error("Error uploading file:", error);
//     throw error;
//   }
// };

// export default uploadFileToS3;

import AWS from "aws-sdk";

AWS.config.update({
  accessKeyId: process.env.REACT_APP_accessKeyId,
  secretAccessKey: process.env.REACT_APP_secretAccessKey,
  region: process.env.REACT_APP_region,
});

const s3 = new AWS.S3();

const uploadFileToS3 = async (file) => {
  const params = {
    Bucket: "experiment-labs-my-bucket",
    Key: file.name,
    Body: file,
  };

  try {
    const response = await s3.upload(params).promise();
    const fileUrl = response.Location; // This is the URL of the uploaded file
    return fileUrl;
  } catch (error) {
    console.error("Error uploading file:", error);
    throw error;
  }
};

export default uploadFileToS3;
