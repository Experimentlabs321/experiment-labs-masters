import { RouterProvider } from "react-router-dom";
import router from "./Router/Router/Router";
import { Toaster } from "react-hot-toast";
import ReactGA from "react-ga4";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "./contexts/AuthProvider";
import AWS from "aws-sdk";
import Loading from "./Pages/Shared/Loading/Loading";
import DynamicFavicon from "./DynamicFavicon";
import { useSession } from "@supabase/auth-helpers-react";
import axios from "axios";

AWS.config.update({
  accessKeyId: process.env.REACT_APP_accessKeyId,
  secretAccessKey: process.env.REACT_APP_secretAccessKey,
  region: process.env.REACT_APP_region,
  maxRetries: 3,
  httpOptions: { timeout: 30000, connectTimeout: 5000 },
});

ReactGA.initialize("G-RL7TBN4FCW");

function App() {
  const { userInfo, logOut } = useContext(AuthContext); // Use logOut from AuthContext
  const [data, setData] = useState(null);
  const [calendarEvents, setCalendarEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [devToolsOpen, setDevToolsOpen] = useState(false);
  const [overlayActive, setOverlayActive] = useState(false);

  const session = useSession();
  const orgLogo = localStorage.getItem("organizationLogo");
  const pWASplashscreenLogo = localStorage.getItem("pWASplashscreenLogo");
  const pWALogo = localStorage.getItem("pWALogo");

  useEffect(() => {
    if (userInfo?.role === "user") {
      // Disable right-click
      const disableRightClick = (event) => event.preventDefault();
      document.addEventListener("contextmenu", disableRightClick);

      // Disable F12 and Ctrl+Shift+I
      const disableInspectTools = (event) => {
        if (event.key === "F12" || (event.ctrlKey && event.shiftKey && event.key === "I")) {
          event.preventDefault();
        }
      };
      document.addEventListener("keydown", disableInspectTools);

      // Function to detect if Developer Tools are open
      const detectDevTools = () => {
        const threshold = 160;

        // Simple detection based on window size difference
        const sizeCheck = window.outerHeight - window.innerHeight > threshold || window.outerWidth - window.innerWidth > threshold;

        // Time-based detection using debugger
        let start = new Date();
        debugger; // Will cause a delay if dev tools are open
        let end = new Date();

        if (sizeCheck || end - start > 100) {
          setDevToolsOpen(true);
          setOverlayActive(true); // Activate overlay when DevTools are open

          logOut().then(() => {
            const interval = setInterval(() => {
              // Keep checking until dev tools are closed
              if (
                window.outerHeight - window.innerHeight <= threshold &&
                window.outerWidth - window.innerWidth <= threshold &&
                (new Date() - start) < 100
              ) {
                setDevToolsOpen(false);
                setOverlayActive(false); // Remove overlay when DevTools are closed
                clearInterval(interval);
              }
            }, 1000);
          });
        }
      };

      window.addEventListener("resize", detectDevTools);

      // Cleanup function to remove event listeners
      return () => {
        document.removeEventListener("contextmenu", disableRightClick);
        document.removeEventListener("keydown", disableInspectTools);
        window.removeEventListener("resize", detectDevTools);
      };
    }
  }, [userInfo, logOut]);

  // Fetch organization data and set dynamic manifest
  useEffect(() => {
    if (localStorage.getItem("role") === "admin") {
      fetchAndDisplayGoogleCalendarEvents();
    }

    if (!userInfo) return;

    fetch(
      `${process.env.REACT_APP_SERVERLESS_API}/api/v1/organizations/${userInfo?.organizationId}`
    )
      .then((response) => response.json())
      .then((data) => {
        setData(data);
        setIsLoading(false);

        // Remove previous manifest if it exists
        const existingManifest = document.getElementById("manifest");
        if (existingManifest) {
          existingManifest.remove();
        }

        // Generate the dynamic manifest
        const manifest = {
          short_name: data?.organizationName,
          name: data?.organizationName,
          icons: [
            {
              src: "https://i.ibb.co/qCjt6fH/icon192.png",
              type: "image/png",
              sizes: "192x192",
              purpose: "maskable",
            },
            {
              src: "https://i.ibb.co/5K6F5M6/icon512.png",
              type: "image/png",
              sizes: "512x512",
            },
            {
              src: "https://i.ibb.co/nQL81Tw/icon64.png",
              type: "image/png",
              sizes: "64x64",
              purpose: "any",
            },
          ],
          start_url: "http://localhost:3000/",
          display: "standalone",
          theme_color: "#000000",
          background_color: "#000000",
          prefer_related_applications: true,
        };

        const dynamicJsonDataLink = document.createElement("link");
        dynamicJsonDataLink.id = "manifest";
        dynamicJsonDataLink.rel = "manifest";
        dynamicJsonDataLink.href = URL.createObjectURL(
          new Blob([JSON.stringify(manifest)], { type: "application/json" })
        );
        document.head.appendChild(dynamicJsonDataLink);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching organization data:", error);
        setIsLoading(false);
      });
  }, [userInfo, orgLogo]);

  async function fetchGoogleCalendarEvents() {
    const currentDate = new Date().toISOString();
    const url = new URL(
      "https://www.googleapis.com/calendar/v3/calendars/primary/events"
    );

    // Append parameters to the URL using URLSearchParams
    url.searchParams.append("timeMin", currentDate);
    url.searchParams.append("singleEvents", true);
    url.searchParams.append("orderBy", "startTime");

    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + session.provider_token,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch Google Calendar events");
    }

    const data = await response.json();
    return data.items || [];
  }

  async function fetchAndDisplayGoogleCalendarEvents() {
    try {
      const events = await fetchGoogleCalendarEvents();
      const adminEmail = events[0]?.creator?.email;
      const newEvent = await axios.post(
        `${process.env.REACT_APP_SERVERLESS_API}/api/v1/tasks/updateEvent/${adminEmail}`,
        events
      );
      if (newEvent?.data?.success) {
        console.log("Events updated");
      }
      setCalendarEvents(events);
    } catch (error) {
      console.error(error.message);
    }
  }

  if (isLoading) {
    return <div></div>;
  }

  return (
    <div className="max-w-[1920px] mx-auto">
      <DynamicFavicon />
      <RouterProvider router={router}></RouterProvider>
      <Toaster />
      {overlayActive && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.8)",
            color: "#fff",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 9999,
          }}
        >
          <h1>Developer tools are open. Please close them to continue.</h1>
        </div>
      )}
    </div>
  );
}

export default App;