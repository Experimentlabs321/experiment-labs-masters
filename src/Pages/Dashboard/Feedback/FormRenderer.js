import React, { useState } from "react";

const DynamicFormRender = ({ formFields }) => {
  const [formData, setFormData] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    // Here you can send formData to your backend or do further processing
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-8">Generated Form</h1>
      <form
        onSubmit={handleSubmit}
        className="bg-gray-100 p-8 rounded-lg shadow-md"
      >
        {formFields?.map((field, index) => (
          <div key={index} className="mb-4">
            <label className="block text-sm font-bold mb-2">
              {field.label}
            </label>
            {field.type === "text" && (
              <input
                type="text"
                name={field.label}
                value={formData[field.label] || ""}
                onChange={handleChange}
                className="border border-gray-300 rounded px-3 py-2 w-full focus:outline-none focus:border-blue-500"
              />
            )}
            {field.type === "textarea" && (
              <textarea
                name={field.label}
                value={formData[field.label] || ""}
                onChange={handleChange}
                className="border border-gray-300 rounded px-3 py-2 w-full focus:outline-none focus:border-blue-500"
              />
            )}
            {field.type === "checkbox" &&
              field.options.map((option, optIndex) => (
                <label key={optIndex} className="block mb-2">
                  <input
                    type="checkbox"
                    name={option}
                    checked={formData[option] || false}
                    onChange={handleChange}
                    className="mr-2"
                  />
                  {option}
                </label>
              ))}
            {field.type === "radio" &&
              field.options.map((option, optIndex) => (
                <label key={optIndex} className="block mb-2">
                  <input
                    type="radio"
                    name={field.label}
                    value={option}
                    checked={formData[field.label] === option}
                    onChange={handleChange}
                    className="mr-2"
                  />
                  {option}
                </label>
              ))}
          </div>
        ))}
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded focus:outline-none"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default DynamicFormRender;
