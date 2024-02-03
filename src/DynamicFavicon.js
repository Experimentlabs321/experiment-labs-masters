// DynamicFavicon.js

import axios from "axios";
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useParams } from "react-router-dom";

const DynamicFavicon = () => {
  const [organizationInfo, setOrganizationInfo] = useState({});
  const orgId = localStorage.getItem("orgId");
  const role = localStorage.getItem("role");
  const { id } = useParams();
  const orgFavicon = localStorage.getItem("organizationFavicon")
  const orgName = localStorage.getItem("organizationName")
  
 /*  useEffect(() => {
    if ((id || orgId) && role === "Student")
      axios
        .get(
          `${import.meta.env.VITE_APP_SERVER_API}/api/v1/organizations/${
            orgId ? orgId : id
          }`
        )
        .then((org) => {
          setOrganizationInfo(org?.data);
          const link =
            document.querySelector("link[rel*='icon']") ||
            document.createElement("link");
          link.type = "image/png";
          link.rel = "icon";
          link.href = org?.data?.orgLogo
            ? `${org?.data?.orgLogo}`
            : "/experimentLabsIcon.png"; // Update with the path to your new favicon
          document.head.appendChild(link);
        })
        .catch((error) => console.error(error));
  }, [orgId, id]); */
  useEffect(() => {
    const link =
      document.querySelector("link[rel*='icon']") ||
      document.createElement("link");
    link.type = "image/png";
    link.rel = "icon";
    link.href = orgFavicon
      ? `${orgFavicon}`
      : "/favicon.ico"; // Update with the path to your new favicon
    document.head.appendChild(link);
  }, [orgFavicon]);

  return (
    <div>
      {orgName && (
        <Helmet>
          <meta charSet="utf-8" />
          <title>{orgName}</title>
        </Helmet>
      )}
      {/* Your component content here */}
    </div>
  );
};

export default DynamicFavicon;
