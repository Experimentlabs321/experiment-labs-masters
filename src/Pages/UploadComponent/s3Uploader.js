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

AWS.config.update({
  accessKeyId: process.env.REACT_APP_accessKeyId,
  secretAccessKey: process.env.REACT_APP_secretAccessKey,
  region: process.env.REACT_APP_region,
  maxRetries: 3,
  httpOptions: { timeout: 30000, connectTimeout: 5000 },
});

const s3 = new AWS.S3();

const uploadFileToS3 = (file, onProgress) => {
  console.log("Uploading file to S3...");
  const params = {
    Bucket: "experiment-labs-my-bucket",
    Key: file.name,
    Body: file,
    CacheControl: "no-cache, no-store, must-revalidate",
  };

  return new Promise((resolve, reject) => {
    // Create a managed upload instance
    const managedUpload = s3.upload(params);
    console.log(managedUpload);
    // Attach the httpUploadProgress event listener to the managed upload
    managedUpload.on("httpUploadProgress", (progress) => {
      console.log("Progress event:", progress);
      const percentage = Math.round((progress.loaded / progress.total) * 100);
      console.log("Progress Percentage:", percentage);
      onProgress(percentage); // Call the onProgress callback with the percentage
    });

    // Use the .promise() method of the managed upload to handle completion
    managedUpload
      .promise()
      .then((response) => {
        console.log("Upload successful:", response.Location);
        resolve(response.Location); // Resolve the promise with the file URL
      })
      .catch((error) => {
        console.error("Upload failed:", error);
        reject(error); // Reject the promise if there's an error
      });
  });
};

export default uploadFileToS3;
