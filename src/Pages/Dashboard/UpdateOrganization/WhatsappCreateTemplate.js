import React, { useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import Loading from "../../Shared/Loading/Loading";
import TextEditor from "../../Shared/TextEditor/TextEditor";

const WhatsappCreateTemplate = ({
  orgData,
  email,
  setShowForm,
  accessToken
}) => {
  const [formData, setFormData] = useState({
    name: "",
    textPart: "",
  });
  const [htmlPart, setHtmlPart] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.textPart || !htmlPart || !email) {
      Swal.fire({
        title: "All fields are required!",
        icon: "warning",
      });
      return;
    }

    setIsLoading(true);
    try {
      const newData = {
        ...formData,
        htmlPart,
        accessToken,
        email,
        templateType: "default",
      };

      console.log('Submitting Data:', newData);

      const response = await axios.post(
        `http://localhost:5000/api/v1/sendMail/whatsapp/${orgData?._id}`,
        newData
      );

      console.log('Response:', response);

      if (response.data.success) {
        Swal.fire({
          title: "Template Created successfully!",
          icon: "success",
        });
        setShowForm(false);
      } else {
        Swal.fire({
          title: "Failed to create template",
          icon: "error",
        });
      }
    } catch (error) {
      console.error('Error:', error.response ? error.response.data : error.message);
      Swal.fire({
        title: "Failed to create the email template",
        icon: "error",
      });
    } finally {
      setIsLoading(false);
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
            disabled={isLoading}
          >
            {isLoading ? "Creating..." : "Create Template"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default WhatsappCreateTemplate;
