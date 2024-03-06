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

const uploadFileToS3 = (file, onProgress) => {
  console.log("Uploading file to S3...");
  const params = {
    Bucket: "experiment-labs-my-bucket",
    Key: file.name,
    Body: file,
  };

  return new Promise((resolve, reject) => {
    const managedUpload = s3.upload(params);

    managedUpload.on("httpUploadProgress", (progress) => {
      const percentage = Math.round((progress.loaded / progress.total) * 100);
      console.log("Progress Percentage:", percentage);
      onProgress && onProgress(percentage); // Ensure onProgress is a function
    });

    managedUpload.promise()
      .then((response) => {
        const fileUrl = response.Location;
        resolve(fileUrl);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export default uploadFileToS3;
