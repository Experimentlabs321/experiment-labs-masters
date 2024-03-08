// import axios from "axios";

// const uploadFileToS3 = async (file) => {
//   const formData = new FormData();
//   formData.append("file", file);

//   try {
//     const response = await axios.post(
//       // `${process.env.REACT_APP_SERVER_API}/api/v1/uploadFile/upload`,
//       `http://localhost:5000/api/v1/uploadFile/upload`,
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
import CustomCircularProgressWithLabel from "../Dashboard/Shared/CustomCircularProgressWithLabel";

AWS.config.update({
  accessKeyId: process.env.REACT_APP_accessKeyId,
  secretAccessKey: process.env.REACT_APP_secretAccessKey,
  region: process.env.REACT_APP_region,
});
const s3 = new AWS.S3();

const handleProgress = ({ loaded, total }) => <CustomCircularProgressWithLabel value={Math.round((loaded / total) * 100)} label="Loading..." />;

const uploadFileToS3 = async (file) => {
  const params = {
    Bucket: "experiment-labs-my-bucket",
    Key: file.name,
    Body: file,
  };

  try {
    const response = s3.upload(params);

    await response.on('httpUploadProgress', handleProgress)
      .send(error => { if (error) console.error(error) });
    const fileUrl = response.promise().Location; // This is the URL of the uploaded file
    return fileUrl;
  } catch (error) {
    console.error("Error uploading file:", error);
    throw error;
  }
};


export default uploadFileToS3;
