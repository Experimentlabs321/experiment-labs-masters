import axios from "axios";

const uploadFileToS3 = async (file) => {
  const formData = new FormData();
  formData.append("file", file);

  try {
    const response = await axios.post(
      `${process.env.REACT_APP_SERVER_API}/api/v1/uploadFile/upload`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    const fileUrl = response.data.fileUrl;
    return fileUrl;
  } catch (error) {
    console.error("Error uploading file:", error);
    throw error;
  }
};

export default uploadFileToS3;
