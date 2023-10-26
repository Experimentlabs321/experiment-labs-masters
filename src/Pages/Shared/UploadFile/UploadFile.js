import React, { useState } from "react";

const UploadFile = () => {
  const [imageLoading, setImageLoading] = useState(false);
  const [image, setImage] = useState("");

  const dragOver = (e) => {
    e.preventDefault();
  };

  const dragEnter = (e) => {
    e.preventDefault();
  };

  const dragLeave = (e) => {
    e.preventDefault();
  };

  const imageFileDrop = async (e) => {
    e.preventDefault();
    const files = e.dataTransfer.files;

    const data = new FormData();
    data.append("file", files[0]);
    data.append("upload_preset", "ml_default");
    setImageLoading(true);

    const res = await fetch(
      "https://api.cloudinary.com/v1_1/dvszolotz/image/upload",
      {
        method: "POST",
        body: data,
      }
    );
    const file = await res.json();

    const field = "thumbnail";
    const value = file.secure_url;
    // //   const newBlogData = { ...blogData };
    //   newBlogData[field] = value;
    //   setBlogData(newBlogData);

    setImage(file.secure_url);
    // setImage(files[0])
    // props.imgLink(file.secure_url);
    setImageLoading(false);
  };

  const uploadImage = async (e) => {
    const files = e.target.files;
    const data = new FormData();
    data.append("file", files[0]);
    data.append("upload_preset", "ml_default");
    setImageLoading(true);

    const res = await fetch(
      "https://api.cloudinary.com/v1_1/dvszolotz/image/upload",
      {
        method: "POST",
        body: data,
      }
    );
    const file = await res.json();
    const field = e.target.name;
    const value = file.secure_url;
    //   const newBlogData = { ...blogData };
    //   newBlogData[field] = value;
    //   setBlogData(newBlogData);
    setImage(file.secure_url);
    setImageLoading(false);
  };

  return (
    <div>
      <div className="col-span-12 md:col-span-6">
        <div className="rounded-lg border-2 border-dotted border-gray-400 p-3 text-center">
          <label>
            <div
              // className="mt-12 text-center"
              onDragOver={dragOver}
              onDragEnter={dragEnter}
              onDragLeave={dragLeave}
              onDrop={imageFileDrop}
            >
              <div className="">
                {imageLoading && (
                  <div>
                    <img
                      className="mx-auto animate-ping"
                      style={{ height: "70px", width: "70px" }}
                      src="https://i.ibb.co/gJLdW8G/cloud-upload-regular-240.png"
                      alt=""
                    />
                    <p className="text-xl text-gray-400">Loading ...</p>
                  </div>
                )}
                {!imageLoading && (
                  <div>
                    <img
                      className="mx-auto animate-pulse"
                      style={{ height: "70px", width: "70px" }}
                      src="https://i.ibb.co/gJLdW8G/cloud-upload-regular-240.png"
                      alt=""
                    />
                    <p className="text-xl text-gray-400">
                      Drag & Drop your thumbnail image
                    </p>
                  </div>
                )}
                <p className="py-4">
                  <span className="rounded-lg bg-gray-400 px-3 py-3 font-semibold  text-Docy-Dark dark:text-white">
                    Upload Thumbnail
                  </span>
                </p>
              </div>
            </div>
            <input
              className="hidden"
              type="file"
              name="thumbnail"
              placeholder="upload"
              onChange={uploadImage}
            />
          </label>
        </div>
      </div>
    </div>
  );
};

export default UploadFile;
