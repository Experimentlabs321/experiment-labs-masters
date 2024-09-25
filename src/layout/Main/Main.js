import React, { useEffect, useState } from "react";
import Footer from "../../Pages/Shared/Footer/Footer";
import { Outlet } from "react-router-dom";
import NavBar from "../../Pages/Shared/AppBar/NavBar";
import MyHelmet from "../../Components/MyHelmet/MyHelpmet";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

const Main = () => {
  const [orgDetails, setOrgDetails] = useState({});
  const [loading, setLoading] = useState(true);

  const rootUrl = window.location.href;
  useEffect(() => {
    // Show loading indicator
    const timer = setTimeout(() => {
      setLoading(false); // Close loading indicator after 5 seconds
    }, 4000);

    return () => clearTimeout(timer); // Cleanup function
  }, []);

  useEffect(() => {
    //  Loading();
    try {
      if (rootUrl) {
        axios
          .post(
            `${process.env.REACT_APP_SERVERLESS_API}/api/v1/organizations/findOrg`,
            {
              orgDefaultUrl: rootUrl,
            }
          )
          .then((response) => {
            // console.log(response);
            setOrgDetails(response?.data?.organization);
          });
      }
    } catch (error) {
      // Loading().close();
      console.log(error);
    }
  }, [rootUrl]);
  return (
    <div style={{ width: "100%" }}>
      <MyHelmet>
        Experiment Labs | Career Counselling | Sell Online courses
      </MyHelmet>
      {loading ? (
        <div className="flex items-center justify-center h-[500px]">
          <Box sx={{ display: "flex" }}>
            <CircularProgress />
          </Box>
        </div>
      ) : (
        <NavBar />
      )}
      <Outlet />
      {loading ? <></> : <Footer />}
    </div>
  );
};

export default Main;
