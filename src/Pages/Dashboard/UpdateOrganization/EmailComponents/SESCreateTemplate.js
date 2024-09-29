import React, { useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import TextEditor from "../../../Shared/TextEditor/TextEditor";
import Loading from "../../../Shared/Loading/Loading";

const SESCreateTemplate = ({
  orgData,
  email,
  fetchSESIntegrationData,
  setShowForm,
}) => {
  const [formData, setFormData] = useState({
    name: "",
    subject: "",
    textPart: "",
  });
  const [htmlPart, setHtmlPart] = useState();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    Loading();
    try {
      // console.log(htmlPart, email);
      const newData = {
        ...formData,
        htmlPart,
        email,
        templateType: "default",
      };
      if (htmlPart.length <= 0 || email.length <= 0)
        return Swal.fire({
          title: "Something Went wrong!",
          icon: "error",
        });

      const updateOrg = await axios.post(
        `${process.env.REACT_APP_SERVERLESS_API}/api/v1/sendMail/organizationId/${orgData?._id}`,
        // `http://localhost:5000/api/v1/sendMail/organizationId/${orgData?._id}`,
        newData
      );

      // console.log(updateOrg);

      if (updateOrg?.data?.success) {
        Swal.fire({
          title: "Template Created successfully!",
          icon: "success",
        });
        fetchSESIntegrationData();
        setShowForm(false);
      }
      Loading().close();
    } catch (error) {
      console.error(error);
      alert("Failed to create the email template");
    }
  };

  return (
    <div className="w-full my-8">
      <div className="rounded-lg">
        <h2 className="text-xl font-bold text-gray-800 mb-6">
          Create Email Template
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="flex w-full gap-20">
            <div className="mb-4 w-full">
              <label className="block text-gray-700 w-full font-bold mb-2">
                Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Template Name"
              />
            </div>
            <div className="mb-4 w-full">
              <label className="block text-gray-700 w-full font-bold mb-2">
                Subject
              </label>
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Email Subject"
              />
            </div>
          </div>
          <div className="flex flex-col-reverse w-full gap-10 items-start mt-8">
            <div className="mb-4 w-full">
              <label className="block text-gray-700 w-full font-bold mb-2">
                HTML Content
              </label>
              <TextEditor setValue={setHtmlPart} />
            </div>
            <div className="mb-4 w-full">
              <label className="block text-gray-700 w-full font-bold mb-2">
                Text Content
              </label>
              <span className="text-sm">
                <span className="font-bold">N.B.</span> This text-only version
                is used for email clients that do not support HTML or for
                recipients who prefer text emails. It helps ensure your message
                is always readable.
              </span>
              <textarea
                name="textPart"
                value={formData.textPart}
                onChange={handleChange}
                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mt-2"
                placeholder="Plain Text Content"
                rows="6"
              ></textarea>
            </div>
          </div>
          <button
            type="submit"
            className="bg-blue hover:bg-opacity-70 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Create Template
          </button>
        </form>
      </div>
    </div>
  );
};

export default SESCreateTemplate;
