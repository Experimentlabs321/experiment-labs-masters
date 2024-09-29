// import React, { useState } from "react";

// const DynamicForm = () => {
//   const [formData, setFormData] = useState([]);
//   const [formFields, setFormFields] = useState([]);
//   const [currentField, setCurrentField] = useState({
//     type: "",
//     label: "",
//     options: [],
//   });
//   const [editMode, setEditMode] = useState(false);
//   const [editIndex, setEditIndex] = useState(null);

//   const handleChange = (e) => {
//     setCurrentField({
//       ...currentField,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleOptionChange = (e, index) => {
//     const newOptions = [...currentField.options];
//     newOptions[index] = e.target.value;
//     setCurrentField({
//       ...currentField,
//       options: newOptions,
//     });
//   };

//   const addField = () => {
//     if (editMode) {
//       const updatedFields = [...formFields];
//       updatedFields[editIndex] = currentField;
//       setFormFields(updatedFields);
//       setCurrentField({
//         type: "",
//         label: "",
//         options: [],
//       });
//       setEditMode(false);
//     } else {
//       setFormFields([...formFields, currentField]);
//       setCurrentField({
//         type: "",
//         label: "",
//         options: [],
//       });
//     }
//   };

//   const removeField = (index) => {
//     const updatedFields = [...formFields];
//     updatedFields.splice(index, 1);
//     setFormFields(updatedFields);
//   };

//   const removeOption = (index) => {
//     const updatedOptions = [...currentField.options];
//     updatedOptions.splice(index, 1);
//     setCurrentField({
//       ...currentField,
//       options: updatedOptions,
//     });
//   };

//   const editField = (index) => {
//     setCurrentField(formFields[index]);
//     setEditMode(true);
//     setEditIndex(index);
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     setFormData(formFields);
//     console.log(formData);
//     // Here you can send formData to your backend or do further processing
//   };

//   return (
//     <div className="max-w-4xl mx-auto">
//       <h1 className="text-2xl font-bold mb-4">Form</h1>
//       <form onSubmit={handleSubmit}>
//         <div className="mb-4">
//           <label className="block text-sm font-bold mb-2">Field Type</label>
//           <select
//             name="type"
//             value={currentField.type}
//             onChange={handleChange}
//             className="w-full border border-gray-300 rounded px-3 py-2"
//           >
//             <option value="">Select Type</option>
//             <option value="text">Text</option>
//             <option value="textarea">Textarea</option>
//             <option value="checkbox">Checkbox</option>
//             <option value="radio">Radio</option>
//           </select>
//         </div>
//         <div className="mb-4">
//           <label className="block text-sm font-bold mb-2">Label</label>
//           <input
//             type="text"
//             name="label"
//             value={currentField.label}
//             onChange={handleChange}
//             className="w-full border border-gray-300 rounded px-3 py-2"
//           />
//         </div>
//         {currentField.type === "checkbox" || currentField.type === "radio" ? (
//           <div className="mb-4">
//             <label className="block text-sm font-bold mb-2">Options</label>
//             {currentField.options.map((option, index) => (
//               <div key={index} className="flex items-center mb-2">
//                 <input
//                   type="text"
//                   value={option}
//                   onChange={(e) => handleOptionChange(e, index)}
//                   className="flex-1 border border-gray-300 rounded px-3 py-2 mr-2"
//                 />
//                 <button
//                   type="button"
//                   onClick={() => removeOption(index)}
//                   className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded"
//                 >
//                   -
//                 </button>
//               </div>
//             ))}
//             <button
//               type="button"
//               onClick={() =>
//                 setCurrentField({
//                   ...currentField,
//                   options: [...currentField.options, ""],
//                 })
//               }
//               className="bg-sky-500 hover:bg-sky-600 text-white px-4 py-2 rounded"
//             >
//               Add Option
//             </button>
//           </div>
//         ) : null}
//         <button
//           type="button"
//           onClick={addField}
//           className="bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded mr-2"
//         >
//           {editMode ? "Update Field" : "Add Field"}
//         </button>
//         <button
//           type="submit"
//           className="bg-sky-500 hover:bg-sky-600 text-white px-4 py-2 rounded"
//         >
//           Submit
//         </button>
//       </form>
//       <div className="mt-8">
//         <h2 className="text-xl font-bold mb-4">Preview</h2>
//         {formFields.map((field, index) => (
//           <div key={index} className="mb-4">
//             <label className="block text-sm font-bold mb-2">
//               {field.label}
//             </label>
//             {field.type === "text" ? (
//               <input
//                 type="text"
//                 className="border border-gray-300 rounded px-3 py-2 w-full"
//               />
//             ) : field.type === "textarea" ? (
//               <textarea className="border border-gray-300 rounded px-3 py-2 w-full"></textarea>
//             ) : field.type === "checkbox" ? (
//               field.options.map((option, index) => (
//                 <label key={index} className="block mb-2">
//                   <input type="checkbox" className="mr-2" />
//                   {option}
//                 </label>
//               ))
//             ) : field.type === "radio" ? (
//               field.options.map((option, index) => (
//                 <label key={index} className="block mb-2">
//                   <input
//                     type="radio"
//                     name={`radio-${index}`}
//                     className="mr-2"
//                   />
//                   {option}
//                 </label>
//               ))
//             ) : null}
//             <button
//               type="button"
//               onClick={() => editField(index)}
//               className="bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded mr-2"
//             >
//               Edit
//             </button>
//             <button
//               type="button"
//               onClick={() => removeField(index)}
//               className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
//             >
//               Remove
//             </button>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default DynamicForm;

import React, { useState } from "react";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import DynamicFormRender from "./FormRenderer";

const DynamicForm = ({ formFields, setFormFields }) => {
  const [formData, setFormData] = useState([]);
  // const [formFields, setFormFields] = useState([]);
  const [currentField, setCurrentField] = useState({
    type: "",
    label: "",
    options: [],
  });
  const [editMode, setEditMode] = useState(false);
  const [editIndex, setEditIndex] = useState(null);

  const handleChange = (e) => {
    setCurrentField({
      ...currentField,
      [e.target.name]: e.target.value,
    });
  };

  const handleOptionChange = (e, index) => {
    const newOptions = [...currentField.options];
    newOptions[index] = e.target.value;
    setCurrentField({
      ...currentField,
      options: newOptions,
    });
  };

  const addField = () => {
    if (editMode) {
      const updatedFields = [...formFields];
      updatedFields[editIndex] = currentField;
      setFormFields(updatedFields);
      setCurrentField({
        type: "",
        label: "",
        options: [],
      });
      setEditMode(false);
    } else {
      setFormFields([...formFields, currentField]);
      setCurrentField({
        type: "",
        label: "",
        options: [],
      });
    }
  };

  const removeField = (index) => {
    const updatedFields = [...formFields];
    updatedFields.splice(index, 1);
    setFormFields(updatedFields);
  };

  const removeOption = (index) => {
    const updatedOptions = [...currentField.options];
    updatedOptions.splice(index, 1);
    setCurrentField({
      ...currentField,
      options: updatedOptions,
    });
  };

  const editField = (index) => {
    setCurrentField(formFields[index]);
    setEditMode(true);
    setEditIndex(index);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormData(formFields);
    // console.log(formData);
    // Here you can send formData to your backend or do further processing
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* <DynamicFormRender formFields={formFields} /> */}
      <h1 className="text-3xl font-bold mt-5 mb-8">Feedback Form</h1>
      <div className="mt-8">
        {/* <h2 className="text-2xl font-bold text-center mb-4">Preview</h2> */}
        {formFields.map((field, index) => (
          <div
            key={index}
            className="bg-gray-100 p-4 rounded-lg shadow-md mb-4"
          >
            <label className="block text-sm font-bold mb-2">
              {field.label}
            </label>
            {field.type === "text" ? (
              <input
                type="text"
                className="border border-gray-300 rounded px-3 py-2 w-full focus:outline-none focus:border-sky-500 mb-2"
              />
            ) : field.type === "textarea" ? (
              <textarea className="border border-gray-300 rounded px-3 py-2 w-full focus:outline-none focus:border-sky-500"></textarea>
            ) : field.type === "checkbox" ? (
              field.options.map((option, index) => (
                <label key={index} className="block mb-2">
                  <input type="checkbox" className="mr-2" />
                  {option}
                </label>
              ))
            ) : field.type === "radio" ? (
              field.options.map((option, index) => (
                <label key={index} className="block mb-2">
                  <input
                    type="radio"
                    name={`radio-${index}`}
                    className="mr-2"
                  />
                  {option}
                </label>
              ))
            ) : null}
            <button
              type="button"
              onClick={() => editField(index)}
              className="bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-md font-semibold mr-2 focus:outline-none"
            >
              <EditIcon />
            </button>
            <button
              type="button"
              onClick={() => removeField(index)}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md font-semibold focus:outline-none"
            >
              <DeleteForeverIcon />
            </button>
          </div>
        ))}
      </div>
      <form
        onSubmit={handleSubmit}
        className="bg-gray-100 p-8 rounded-lg shadow-md"
      >
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">Field Type</label>
          <select
            name="type"
            value={currentField.type}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-sky-500"
          >
            <option value="">Select Type</option>
            <option value="text">Text</option>
            <option value="textarea">Textarea</option>
            <option value="checkbox">Checkbox</option>
            <option value="radio">Radio</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">Label</label>
          <input
            type="text"
            name="label"
            value={currentField.label}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-sky-500"
          />
        </div>
        {currentField.type === "checkbox" || currentField.type === "radio" ? (
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2">Options</label>
            {currentField.options.map((option, index) => (
              <div key={index} className="flex items-center mb-2">
                <input
                  type="text"
                  value={option}
                  onChange={(e) => handleOptionChange(e, index)}
                  className="flex-1 border border-gray-300 rounded px-3 py-2 mr-2 focus:outline-none focus:border-sky-500"
                />
                <button
                  type="button"
                  onClick={() => removeOption(index)}
                  className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded focus:outline-none"
                >
                  <HighlightOffIcon />
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() =>
                setCurrentField({
                  ...currentField,
                  options: [...currentField.options, ""],
                })
              }
              className="bg-sky-500 hover:bg-sky-600 text-white px-4 py-2 rounded-md font-semibold focus:outline-none"
            >
              <AddCircleOutlineIcon />
            </button>
          </div>
        ) : null}
        <button
          type="button"
          onClick={addField}
          className="bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-md font-semibold mr-2 focus:outline-none"
        >
          {editMode ? "Update Field" : "Add Field"}
        </button>
        <button
          type="submit"
          className="bg-sky-500 hover:bg-sky-600 text-white px-4 py-2 rounded-md font-semibold focus:outline-none"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default DynamicForm;
