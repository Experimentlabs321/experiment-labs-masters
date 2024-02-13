import React, { useContext, useState } from "react";
import TextEditor from "../../Shared/TextEditor/TextEditor";
import { AuthContext } from "../../../contexts/AuthProvider";
import axios from "axios";
import toast from "react-hot-toast";
import uploadFileToS3 from "../../UploadComponent/s3Uploader";
import Loading from "../../Shared/Loading/Loading";

const AdminAnnouncementForm = ({ setShowAnnouncementForm }) => {
  const { user, userInfo } = useContext(AuthContext);
  const [announcement, setAnnouncement] = useState({
    title: "",
    description: "",
    dateTime: new Date(),
    urgency: "",
    organizationId: userInfo?.organizationId,
    readBy: [],
    triggeredBy: user?.email,
  });
  const [description, setDescription] = useState("");
  const [selectedFile, setSelectedFile] = useState();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAnnouncement((prevAnnouncement) => ({
      ...prevAnnouncement,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    Loading();
    let imageUrl = "";
    if (selectedFile) imageUrl = await uploadFileToS3(selectedFile);

    const newAnnouncement = await axios.post(
      `https://test-server-tg7l.onrender.com/api/v1/announcements/addAnnouncement`,
      {
        title: announcement?.title,
        description: description,
        dateTime: new Date(),
        urgency: announcement?.urgency,
        organizationId: userInfo?.organizationId,
        readBy: [],
        triggeredBy: user?.email,
        imageUrl,
      }
    );
    console.log(newAnnouncement);
    if (newAnnouncement?.data?.acknowledged) {
      toast.success("Announcement Published Successfully");
    }
    setShowAnnouncementForm(false);
    Loading().close();
  };

  return (
    <div className="admin-announcement-form bg-gray-100 py-8 px-4 rounded-lg shadow-md my-4">
      <h2 className="text-xl font-bold mb-4">Publish Announcement</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="title"
            className="block text-gray-700 font-semibold mb-1"
          >
            Title:
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={announcement.title}
            onChange={handleChange}
            className="w-full rounded border border-gray-300 px-3 py-2 focus:outline-none focus:border-blue-500"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="description"
            className="block text-gray-700 font-semibold mb-1"
          >
            Description:
          </label>
          {/* Text editor */}
          <div>
            <div className="bg-white text-black">
              <TextEditor setValue={setDescription} />
            </div>
          </div>
          {/* <p>{instructions}</p>
              <div dangerouslySetInnerHTML={{ __html: instructions }} /> */}
          {/* <textarea
            id="description"
            name="description"
            value={announcement.description}
            onChange={handleChange}
            className="w-full rounded border border-gray-300 px-3 py-2 focus:outline-none focus:border-blue-500"
          ></textarea> */}
        </div>

        <div className="mb-4">
          <label
            htmlFor="urgency"
            className="block text-gray-700 font-semibold mb-1"
          >
            Urgency:
          </label>
          <select
            id="urgency"
            name="urgency"
            value={announcement.urgency}
            onChange={handleChange}
            className="w-full rounded border border-gray-300 px-3 py-2 focus:outline-none focus:border-blue-500"
          >
            <option value="">Select urgency</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
        </div>

        <div className="mb-4">
          <label
            htmlFor="imageUrl"
            className="block text-gray-700 font-semibold mb-1"
          >
            Announcement Image:
          </label>
          <input
            type="file"
            id="imageUrl"
            name="imageUrl"
            accept=".jpg, .jpeg, .png, .ppt, .png"
            onChange={(e) => {
              const file = e.target.files[0];
              setSelectedFile(file);
            }}
            className="w-full rounded border border-gray-300 px-3 py-2 focus:outline-none focus:border-blue-500"
          />
        </div>

        <button
          type="submit"
          className="bg-sky-500 text-white px-4 py-2 rounded hover:bg-sky-600 transition duration-300"
        >
          Publish
        </button>
      </form>
    </div>
  );
};

export default AdminAnnouncementForm;
