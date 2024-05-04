import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../contexts/AuthProvider";
import axios from "axios";
import Swal from "sweetalert2";

const WatiIntegration = ({ watiInstance, setWatiInstance, orgData }) => {
  const { userInfo } = useContext(AuthContext);
  console.log(watiInstance);
  const [accessToken, setAccessToken] = useState(watiInstance?.accessToken);
  const [key_secret, setKey_secret] = useState(watiInstance?.key_secret);
  const [loading, setLoading] = useState(false);
  const [itemDetails, setItemDetails] = useState();
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
  console.log(itemDetails);

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
        <input
          type="text"
          placeholder="Phone Number"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
        <input
          type="text"
          placeholder="Message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button onClick={sendMessage}>Send Message</button>
      </div>
    </div>
  );
};

export default WatiIntegration;
