import React, { useEffect, useRef, useState } from 'react';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import Swal from "sweetalert2";
import axios from "axios";
import TextEditor from '../../../Shared/TextEditor/TextEditor';
import JoditEditor from "jodit-react";
import "./style.css";
// import EmailEditor from 'react-email-editor';
// import { Editor, EditorState } from 'draft-js';
// import 'draft-js/dist/Draft.css';



const EmailTemplateRow = ({ title, description, active, templateId, template, fetchEmailActionTemplates }) => {
  const [isActive, setIsActive] = useState(active);
  const [selectedHtmlPart, setSelectedHtmlPart] = useState(template?.htmlPart);
  const [selectedSubject, setSelectSubject] = useState(template?.subject || "");
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [action, setAction] = useState((template?.htmlPart !== undefined || template?.subject !== undefined) ? "update" : "create")
  const editor = useRef(null);

  console.log("selected Html", template?.htmlPart);

  const handleActive = async (templateId) => {
    const response = await axios.put(
      `${process.env.REACT_APP_SERVER_API}/api/v1/sendMail/templateId/${templateId}`,
      // `http://localhost:5000/api/v1/sendMail/templateId/${templateId}`,
      {
        active: !isActive + "",
        action: "none"
      }
    );
    setIsActive(!isActive);
  }

  const handleUpdate = async () => {
    const response = await axios.put(
      `${process.env.REACT_APP_SERVER_API}/api/v1/sendMail/templateId/${templateId}`,
      {
        htmlPart: selectedHtmlPart,
        email: template?.email,
        subject: selectedSubject,
        templateName: template?.templateName,
        organizationId: template?.organizationId,
        action
      }
    );
    if (response?.data?.success) {
      Swal.fire({
        title: response?.data?.message,
        icon: "success",
      });
      fetchEmailActionTemplates();
      setShowUpdateForm(false);
    }
    console.log(template?.templateName, selectedHtmlPart, selectedSubject, action);
  }

  // const emailEditorRef = useRef(null);

  // const exportHtml = () => {
  //   emailEditorRef.current.editor.exportHtml((data) => {
  //     const { design, html } = data;
  //     console.log('exportHtml', html);
  //   });
  // };

  // const onLoad = () => {
  //   // editor instance is created
  //   // you can load your template here;
  //   // const templateJson = {};
  //   emailEditorRef.current.editor.loadDesign(selectedHtmlPart);
  // }

  // const onReady = () => {
  //   // editor is ready
  //   console.log('onReady');
  // };

  // const [editorState, setEditorState] = React.useState(
  //   () => EditorState.createEmpty(),
  // );



  return (
    <div>
      <div className="flex justify-between items-center py-2">
        <div>
          <div className="text-sm font-medium text-gray-900">{title}</div>
          <div className="text-sm text-gray-500">{description}</div>
        </div>
        <div className="flex items-center space-x-4">
          <label htmlFor={title} className="flex items-center cursor-pointer">
            <div className="relative">
              <input id={title} type="checkbox" className="sr-only" checked={isActive}
                onChange={
                  (e) => {
                    handleActive(templateId)
                    setIsActive(e.target.checked)
                  }
                } />
              <div className={`block ${isActive ? "bg-green" : "bg-gray-600"} w-14 h-8 rounded-full`}></div>
              <div className={`dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition ${isActive ? 'translate-x-6' : ''}`}></div>
            </div>
          </label>
          <button
            className="p-1 border-2 border-gray-600 rounded-full hover:bg-gray-300"
            onClick={() => setShowUpdateForm(!showUpdateForm)}
          >
            <EditRoundedIcon />
          </button>
        </div>
      </div>
      {showUpdateForm && <div className='my-6'>
        <label className="block text-gray-700 w-full font-bold mb-2">Subject</label>
        <input type="text" name="subject" value={selectedSubject} onChange={(e) => setSelectSubject(e.target.value)} className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="Email Subject" />
        <div className="my-4 w-full">
          <label className="block text-gray-700 w-full font-bold mb-2">HTML Content</label>
          <JoditEditor
            value={template?.htmlPart}
            ref={editor}
            onChange={(content) => {
              setSelectedHtmlPart(content);
            }}
          />
          {/* <EmailEditor
            ref={emailEditorRef}
            onLoad={onLoad}
            onReady={onReady}
          /> */}
          {/* <Editor editorState={setSelectedHtmlPart} onChange={setEditorState} /> */}
          {/* <EditorProvider slotBefore={<MenuBar />} extensions={extensions} content={selectedHtmlPart}></EditorProvider> */}
          
        </div>
        <button onClick={handleUpdate} type="submit" className="bg-blue hover:bg-opacity-70 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
          Update
        </button>
        <div className="my-2">
          <h1 className="text-xl font-semibold"> Available variables for use in email</h1>
          <p className="text-base from-neutral-700">{`For example if you want to use learner email, write like this: {{ learn email }}`}</p>
          <div className="flex gap-3">
            {
              template?.availableVariables?.map((variable, index) => <p className="text-base font-medium"> {variable}</p>)
            }
            {/* <p className="text-base font-medium"> site_name</p>
            <p className="text-base font-medium"> site_email</p>
            <p className="text-base font-medium"> learner_name</p>
            <p className="text-base font-medium"> learner_email</p>
            <p className="text-base font-medium"> course_name</p>
            <p className="text-base font-medium"> task_name</p>
            <p className="text-base font-medium"> start_time</p>
            <p className="text-base font-medium"> end_time</p>
            <p className="text-base font-medium"> meeting_link</p>
            <p className="text-base font-medium"> user_name</p> */}
          </div>
        </div>
      </div>}

    </div>
  );
};

const CustomizeTemplates = ({ email, orgData }) => {
  const [templates, setTemplates] = useState([]);

  const fetchEmailActionTemplates = async () => {
    const response = await axios.get(`${process.env.REACT_APP_SERVER_API}/api/v1/sendMail/organizationId/${orgData?._id}?email=${email}`);
    console.log("Template Data", response);
    setTemplates(response?.data);
  }

  useEffect(() => {
    fetchEmailActionTemplates();
  }, [email])

  return (
    <div className="my-6">
      <div className="">
        <div className="py-4">
          <h2 className="text-xl font-semibold text-gray-800">Customize templates</h2>
          <div className="mt-6 flex flex-col gap-6">
            {
              templates && templates.map((template, index) =>
                <EmailTemplateRow
                  templateId={template?._id}
                  title={template?.title}
                  description={template?.description}
                  active={template?.active === "true"}
                  template={template}
                  fetchEmailActionTemplates={fetchEmailActionTemplates}
                />
              )
            }

            {/* More rows can be added here */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomizeTemplates;
