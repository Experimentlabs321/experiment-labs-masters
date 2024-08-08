import React, { useContext, useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthProvider";
import axios from "axios";
import LoadingComponent from "../Loading/LoadingComponent";
function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function PreDashboard() {
  const [toggleButton, setToggleButton] = useState(true);
  const { signIn } = useContext(AuthContext);
  const query = useQuery();
  const token = query.get("token");
  const requestedBy = query.get("org");
  const navigate = useNavigate();

  useEffect(() => {
    const handleAuthentication = async () => {
      try {
        if (token && requestedBy) {
          const authData = await axios.post(
            `http://localhost:5000/api/v1/auth`,
            // `${process.env.REACT_APP_SERVERLESS_API}/api/v1/auth`,
            { token, requestedBy }
          );
          // console.log({ authData });
          if (authData.data.success) {
            signIn(
              authData.data.credentials.email,
              authData.data.credentials.password
            ).then(() => {
              saveUser(authData.data.credentials.email);
            });
          }
        }
      } catch (error) {
        console.log({ error });
        navigate('/')
        throw new Error(error);
      }
    };

    handleAuthentication();
  }, [token]);

  const saveUser = async (email) => {
    try {
      fetch(
        `${process.env.REACT_APP_SERVERLESS_API}/api/v1/users?email=${email}`
      )
        .then((res) => res.json())
        .then((data) => {
          // console.log({data});
          localStorage.setItem("role", data?.role);
          if (data?.role === "admin") navigate("/adminDashboardHome");
          else navigate("/dashboard");
        });
    } catch (error) {}
  };

  const sidebarRef = useRef();
  useEffect(() => {
    function handleClickOutside(event) {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        if (window.innerWidth <= 768) {
          // If the click is outside the sidebar and we're on a mobile device, hide the sidebar
          setToggleButton(true); // Assuming setToggleButton(true) hides the sidebar
        }
      }
    }

    // Add event listener
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      // Clean up the event listener
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [sidebarRef]);
  const handleClick = () => {
    setToggleButton(!toggleButton);
  };
  return (
    <div>
      <div className=" font-sansita">
        <nav
          className={`bg-[#01090d] border-b animate-pulse border-gray-200 fixed z-30 w-full lg:hidden ${
            toggleButton ? "" : "hidden"
          }`}
        >
          <div className=" relative px-3 py-3 lg:px-5 lg:pl-3">
            <div
              className={`flex items-center justify-between ${
                toggleButton ? "" : "hidden"
              }`}
            >
              <button
                id="toggleSidebarMobile"
                ariaExpanded="true"
                ariaControls="sidebar"
                className="lg:hidden mr-2 text-gray-600 hover:text-gray-900 cursor-pointer p-2 hover:bg-gray-100 focus:bg-gray-100 focus:ring-2 focus:ring-gray-100 rounded"
                onClick={handleClick}
              >
                <svg
                  id="toggleSidebarMobileHamburger"
                  className={`w-6 h-6 ${toggleButton ? "" : "hidden"}`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </button>
              {/*   <Badge badgeContent={4} color="primary">
                  <NotificationsIcon sx={{ color: "white" }} />
                </Badge> */}
              {/* <div className="absolute top-0 w-56 h-56 bg-white">
                  something
                </div> */}
              <div>
                <img
                  // className="h-6 lg:h-8"
                  className="max-w-[100px] max-h-[70px]"
                  alt="icon"
                />
                {/* <img className="h-6 lg:h-8" src={logo} alt="icon" /> */}
              </div>
            </div>
          </div>
        </nav>

        <div className="flex overflow-hidden">
          <aside
            ref={sidebarRef}
            id="sidebar"
            className={`fixed ${
              toggleButton ? "hidden" : ""
            } z-20 h-full top-0 bg-[#141414] animate-pulse shadow-lg left-0 flex lg:flex flex-shrink-0 flex-col w-[324px] transition duration-500 ease-in-out delay-150`}
            aria-label="Sidebar"
          ></aside>
          <div
            className="bg-gray-900 opacity-50 hidden fixed inset-0 z-10"
            id="sidebarBackdrop"
          ></div>
          <div
            id="main-content"
            className="h-full w-full relative lg:ml-[324px]"
          >
            <main className="min-h-[100vh]">
              <div className="container mx-auto px-4">
                <LoadingComponent />
              </div>
            </main>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PreDashboard;
