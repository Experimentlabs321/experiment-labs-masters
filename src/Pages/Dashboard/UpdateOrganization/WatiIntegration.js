import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../contexts/AuthProvider";
import axios from "axios";
import Swal from "sweetalert2";
import WhatsappCreateTemplate from "./WhatsappCreateTemplate";
import Loading from "../../Shared/Loading/Loading";

const WatiIntegration = ({ watiInstance, setWatiInstance, orgData }) => {
  const { userInfo } = useContext(AuthContext);
  console.log(orgData);
  const [accessToken, setAccessToken] = useState(watiInstance?.accessToken);
  
  const [loading, setLoading] = useState(false);
  const [itemDetails, setItemDetails] = useState();
  const [showForm, setShowForm] = useState(false);

  const [token, setToken] = useState("");
  const [selectedTemplate, setSelectedTemplate] = useState({});

  const [email, setEmail] = useState();
  const [templates, setTemplates] = useState();
  useEffect(() => {
    if (userInfo) {
      setLoading(true);
      axios
        .get(
          `${process.env.REACT_APP_SERVERLESS_API}/api/v1/language/getUpdateOrganizationSubDetailsByOrganizationAndName/paymentIntegration/organizationsId/${userInfo?.organizationId}`
        )
        .then((response) => {
          console.log(response);
          setItemDetails(response?.data);
        })
        .finally(() => {
          setLoading(false);
        });
    }
    setLoading(false);
  }, [userInfo]);
  console.log(orgData?._id);

  useEffect(() => {
    axios
      .get(
        `http://localhost:5000/api/v1/organizations/whatsapp/e/${orgData?._id}`
        // `http://localhost:5000/api/v1/organizations/whatsapp/e/64cbbd756f0ef101bc957231`
      )
      .then((response) => {
        console.log(response.data);

        /*   setToken(response.data?.accessKeyId);
        setTemplateName(response.data?.templateName);
        setEmail(response.data?.email); */
        setTemplates(response.data?.whatsappTemplates);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [orgData?._id]);

  const handleTemplateSubmit = async (event) => {
    event.preventDefault();
    Loading();
    // const form = event.target;

    const orgWhatsappInfo = {
      whatsappIntegration: {
      
        accessToken:selectedTemplate?.accessToken,
        email:selectedTemplate?.email,
        htmlPart:selectedTemplate?.htmlPart,

        templateType:selectedTemplate?.templateType,
        textPart:selectedTemplate?.textPart,

        templateName: selectedTemplate?.templateName,
        
      },
    };
    console.log(orgWhatsappInfo)
    const updateOrg = await axios.put(
      //`${process.env.REACT_APP_SERVERLESS_API}/api/v1/organizations/whatsapp/e/${orgData?._id}`,
      `http://localhost:5000/api/v1/organizations/whatsapp/e/663e1bcdf7168d402bddb048`,
      orgWhatsappInfo
    );

    if (updateOrg?.data?.acknowledged) {
      Swal.fire({
        title: "Updated successfully!",
        icon: "success",
      });
    }
    Loading().close();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // const form = event.target;

    const orgInfo = {
      watiInstance: {
        accessToken,
      },
    };

    // console.log("Data ==========>",orgInfo);

    const updateOrg = await axios.put(
      `${process.env.REACT_APP_SERVERLESS_API}/api/v1/organizations/${orgData?._id}`,
      orgInfo
    );

    if (updateOrg?.data?.acknowledged) {
      setWatiInstance(orgInfo?.watiInstance);
      Swal.fire({
        title: itemDetails?.updatedSuccessfully
          ? itemDetails?.updatedSuccessfully
          : "Updated successfully!",
        icon: "success",
      });
    }
  };

  const [phoneNumber, setPhoneNumber] = useState("");
  const [message, setMessage] = useState("");

  const sendMessage = async () => {
    // const phoneNumber = "+8801643433981"; // Replace with the desired phone number
    // const messageText = "hello"; // Replace with the desired message text

    try {
      const response = await axios.post(
        `https://app-server.wati.io/api/v1/sendSessionMessage/${encodeURIComponent(
          phoneNumber
        )}?messageText=${encodeURIComponent(message)}`,
        {},
        {
          headers: {
            Authorization: watiInstance?.accessToken,
            Accept: "*/*",
          },
        }
      );

      console.log("Message sent successfully:", response.data);
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  // const sendMessage = async () => {
  //   try {
  //     const response = await axios.post(
  //       `https://api.wati.io/v1/sendSessionMessage/${phoneNumber}?messageText=${message}`,
  //       {
  //         phone: phoneNumber,
  //         message: message,
  //       },
  //       {
  //         headers: {
  //           Authorization: watiInstance?.accessToken,
  //           "Content-Type": "application/json",
  //         },
  //       }
  //     );

  //     console.log("Message sent successfully:", response.data);
  //   } catch (error) {
  //     console.error("Error sending message:", error);
  //   }
  // };
  return (
    <div className="px-4 mt-4">
      <form onSubmit={handleSubmit} className="mt-5">
        <div className="flex gap-10">
          <div>
            <label
              htmlFor="textInput"
              className="block text-lg font-semibold text-gray-700"
            >
              {itemDetails?.accessToken
                ? itemDetails?.accessToken
                : "Access Token"}
            </label>
            <input
              type="text"
              defaultValue={watiInstance?.accessToken}
              onChange={(e) => setAccessToken(e.target.value)}
              className="mt-1 p-2 w-[300px] border rounded-md focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>
          {/* <div className="">
            <label
              htmlFor="textInput"
              className="block text-lg font-semibold text-gray-700"
            >
              {itemDetails?.keySecret ? itemDetails?.keySecret : "Key Secret"}
            </label>
            <input
              type="text"
              defaultValue={key_secret}
              onChange={(e) => setKey_secret(e.target.value)}
              className="mt-1 p-2 w-[300px] border rounded-md focus:outline-none focus:ring focus:border-blue-300"
            />
          </div> */}
        </div>
        <input
          className="bg-green my-8 hover:bg-opacity-60 text-white py-3 px-4 font-bold rounded-lg cursor-pointer"
          value={itemDetails?.save ? itemDetails?.save : "Save"}
          type="submit"
        />
      </form>

      <div>
        <div className="flex justify-between items-center mb-5">
          <div>
            <label
              className="block text-gray-700 w-full font-bold mb-2"
              htmlFor="select"
            >
              Select Default Template
            </label>
            <select
              className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
              id="templateName"
              value={selectedTemplate?._id || ""}
              onChange={(e) => {
                const selectedTemplate = templates.find(
                  (t) => t._id === e.target.value
                );
                setSelectedTemplate(selectedTemplate);
              }}
            >
              <option value="">Select a WhatsApp template</option>
              {templates?.map((template, index) => (
                <option key={index} value={template._id}>
                  {template.templateName}
                </option>
              ))}
            </select>

            <div className="flex items-center justify-start mt-4">
              <button
                onClick={handleTemplateSubmit}
                className="px-4 py-2 bg-green hover:bg-green focus:outline-none focus:bg-green text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition duration-300"
              >
                Submit
              </button>
            </div>
          </div>
          <button
            className="bg-blue text-white p-2 rounded-md mb-5 font-semibold"
            onClick={() => setShowForm(true)}
          >
            Create email template
          </button>
        </div>

        {showForm && (
          <WhatsappCreateTemplate
            email={userInfo?.email}
            setShowForm={setShowForm}
            accessToken={watiInstance?.accessToken}
            orgData={orgData}
          />
        )}
      </div>

      <div className="flex gap-5">
        <input
        className=" border p-2 rounded-md"
          type="text"
          placeholder="Phone Number"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
        <input
        className=" border p-2 rounded-md"
          type="text"
          placeholder="Message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button className="bg-blue text-white p-2 font-semibold rounded-md" onClick={sendMessage}>Send Message</button>
      </div>
    </div>
  );
};

export default WatiIntegration;
