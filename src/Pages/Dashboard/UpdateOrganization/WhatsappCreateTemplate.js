import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import Loading from "../../Shared/Loading/Loading";
import TextEditor from "../../Shared/TextEditor/TextEditor";

const contentsOfTemplates = [
  {
    templateName: "Welcome Notification",
    contents: [
      "{{student_name}}",
      "{{student_email}}",
      "{{student_password}}",
      "{{root_link}}",
    ],
    sampleTemplateBody:
      "<p>Welcome to Experiment Labs! </p><p>We are excited to have you onboard <strong>{{student_name}}</strong>. To Login follow the following steps so that you won't miss out on new updates. </p><ol><li>  Navigate to this link <strong>{{root_link}}</strong> </li><li> Use the following credentials to login </li><li> Email: <strong>{{student_email}}</strong> </li><li> Password: <strong>{{student_password}}</strong> </li><li> Once you login, under course access click on the lab and you will find a live class option </li><li> Click on join. </li></ol><p>Ready to start your new journey? Let's embark on an exciting learning adventure together! </p><p>                                                                  Happy learning😊</p>",
  },
  { templateName: "Slot Booking", contents: [], sampleTemplateBody: "" },
  {
    templateName: "Slot Confirmation",
    contents: ["{{student_name}}", "{{date_time}}"],
    sampleTemplateBody:
      "<p>Awesome, <strong>{{student_name}}</strong>! Your session is booked for <strong>{{date_time}}</strong>. Looking forward to seeing you.</p>",
  },
  {
    templateName: "1:1 reminder (morning message)",
    contents: [],
    sampleTemplateBody: "",
  },
  {
    templateName: "1:1 reminder (10 min before message)",
    contents: ["{{student_name}}"],
    sampleTemplateBody:
      "<p>Hi <strong>{{student_name}}</strong>, gear up as your 1:1 session starts in 10 minutes. see you there!</p>",
  },
  {
    templateName: "Session Not Joined",
    contents: ["{{student_name}}"],
    sampleTemplateBody:
      "<p>Hi <strong>{{student_name}}</strong>, we missed you in class today. Don't worry, there's always next time! Let us know if you need any help.</p>",
  },
  {
    templateName: "Class Reminder",
    contents: ["{{student_name}}", "{{class_topic}}", "{{class_at}}"],
    sampleTemplateBody:
      "<p>Hello <strong>{{student_name}}</strong>, </p><p>Your class on <strong>{{class_topic}}</strong> is coming up at <strong>{{class_at}}</strong>. Add it to today’s to-do list so you don’t miss out!</p>",
  },
  {
    templateName: "Class Recording",
    contents: ["{{student_name}}", "{{class_level}}", "{{class_link}}"],
    sampleTemplateBody:
      "<p>Missed the class, <strong>{{student_name}}</strong>? No worries, Catch up on <strong>{{class_level}}</strong> with the class recording. Available now! Click on the link below. <br><strong>{{class_link}}</strong></p>",
  },
];

const WhatsappCreateTemplate = ({
  orgData,
  email,
  setShowForm,
  accessToken,
  apiEndpoint,
  setWatiInstance,
}) => {
  const [formData, setFormData] = useState({
    name: "",
    textPart: "",
  });
  const [htmlPart, setHtmlPart] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [orgWatiTemplates, setOrgWatiTemplates] = useState([]);
  const [selectedTemplateFor, setSelectedTemplateFor] = useState("");
  const [selectedRequiredTemplateForOrg, setSelectedRequiredTemplateForOrg] =
    useState([]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    // const form = event.target;

    const orgInfo = {
      watiInstance: {
        accessToken,
        apiEndpoint,
        templatesData: selectedRequiredTemplateForOrg,
      },
    };

    // console.log("Data ==========>",orgInfo);

    const updateOrg = await axios.put(
      `${process.env.REACT_APP_SERVERLESS_API}/api/v1/organizations/${orgData?._id}`,
      orgInfo
    );

    if (updateOrg?.data?.acknowledged) {
      setWatiInstance(orgInfo?.watiInstance);
      orgData.watiInstance = orgInfo?.watiInstance;
      Swal.fire({
        title: "Updated successfully!",
        icon: "success",
      });
    }
  };

  useEffect(() => {
    setSelectedRequiredTemplateForOrg(orgData?.watiInstance?.templatesData);
    const watiHeaders = {
      "Content-Type": "application/json-patch+json",
      Authorization: `${orgData?.watiInstance?.accessToken}`,
      accept: "/",
    };
    axios
      .get(`${orgData?.watiInstance?.apiEndpoint}/api/v1/getMessageTemplates`, {
        headers: watiHeaders,
      })
      .then((response) => {
        setOrgWatiTemplates(response?.data?.messageTemplates);
      })
      .finally(() => {
        // setLoading(false);
      });
  }, [orgData]);

  const handleOptionChangeRequiredTemplate = (event, optionValue) => {
    const isChecked = event.target.checked;

    if (isChecked) {
      setSelectedRequiredTemplateForOrg([
        ...selectedRequiredTemplateForOrg,
        { templateName: optionValue?.templateName, watiTemplateName: "" },
      ]);
    } else {
      setSelectedRequiredTemplateForOrg(
        selectedRequiredTemplateForOrg.filter(
          (option) => option?.templateName !== optionValue?.templateName
        )
      );
    }
  };

  console.log(selectedRequiredTemplateForOrg);

  return (
    <div className="w-full my-8">
      <div className="rounded-lg">
        <h2 className="text-xl font-bold text-gray-800 mb-6">Add Template</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-5">
            <div className="flex items-center gap-4">
              <p className="h-2 w-2 bg-black rounded-full"></p>
              <p className="font-bold text-lg me-[36px]">
                Select Required Templates
              </p>
              {/* <img src={required} alt="" /> */}
            </div>
            <ul className="flex gap-4 flex-wrap ">
              {contentsOfTemplates?.map((option, index) => {
                return (
                  <>
                    <li
                      key={index}
                      className="cursor-pointer flex items-center pt-2 pr-2 text-[#6A6A6A] text-[14px] font-[400] "
                    >
                      <input
                        type="checkbox"
                        id={option?.templateName}
                        name={option?.templateName}
                        value={option?.templateName}
                        checked={selectedRequiredTemplateForOrg?.find(
                          (item) => item?.templateName === option?.templateName
                        )}
                        onChange={(e) =>
                          handleOptionChangeRequiredTemplate(e, option)
                        }
                        className=" mb-1"
                      />
                      <div className="flex mb-1 items-center">
                        <label className="ms-2" htmlFor={option?.templateName}>
                          {option?.templateName}
                        </label>
                      </div>
                    </li>
                  </>
                );
              })}
            </ul>
          </div>
          {selectedRequiredTemplateForOrg?.map((item, index) => (
            <div key={index + item?.templateName}>
              <div className="my-4 w-full">
                <label className=" text-gray-700 w-full flex items-center gap-3 font-bold mb-2">
                  <p className="h-7 w-7 text-center text-white flex items-center justify-center bg-black rounded-full">
                    {index + 1}
                  </p>
                  <p className="font-bold text-lg me-[36px]">
                    Your wati template name for {item?.templateName}
                  </p>
                  {/* Your wati template name for {item?.templateName} */}
                </label>
                <select
                  // defaultValue={
                  //   item.watiTemplateName ? item?.watiTemplateName : ""
                  // }
                  value={item?.watiTemplateName}
                  onChange={(e) => {
                    // item.watiTemplateName = e.target.value;
                    setSelectedRequiredTemplateForOrg(
                      selectedRequiredTemplateForOrg?.map((tep, i) => {
                        if (i === index) {
                          tep.watiTemplateName = e.target.value;
                        }
                        return tep;
                      })
                    );
                  }}
                  className=" border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                >
                  <option className="hidden">Select template name</option>
                  {orgWatiTemplates?.map((messageTemp) => (
                    <option
                      key={messageTemp?.id}
                      value={messageTemp?.elementName}
                    >
                      {messageTemp?.elementName}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <h1 className=" text-lg font-bold">
                  Contents that you have to add in your wati template as it is:
                </h1>
                <p>
                  {contentsOfTemplates
                    ?.find((i) => i?.templateName === item?.templateName)
                    ?.contents?.map((content) => (
                      <span className="mr-3">{content}</span>
                    ))}
                </p>
                <h1 className=" mt-4 mb-2 text-lg font-bold">
                  Sample Template Body
                </h1>
                <div
                  className=" textEditorView"
                  dangerouslySetInnerHTML={{
                    __html: contentsOfTemplates?.find(
                      (i) => i?.templateName === item?.templateName
                    )?.sampleTemplateBody,
                  }}
                />
              </div>
            </div>
          ))}
          <input
            className="bg-green my-8 hover:bg-opacity-60 text-white py-3 px-4 font-bold rounded-lg cursor-pointer"
            value={"Save"}
            type="submit"
          />
        </form>
      </div>
    </div>
  );
};

export default WhatsappCreateTemplate;
