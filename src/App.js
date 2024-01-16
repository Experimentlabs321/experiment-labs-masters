

import { RouterProvider } from "react-router-dom";
import router from "./Router/Router/Router";
import { Toaster } from "react-hot-toast";
import ReactGA from "react-ga4";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "./contexts/AuthProvider";
import axios from "axios";
import Loading from "./Pages/Shared/Loading/Loading";

ReactGA.initialize("G-RL7TBN4FCW");

function App() {
  const { userInfo } = useContext(AuthContext);
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!userInfo) {
      return;
    }

    setIsLoading(true);
    Loading();
    
    fetch(`${process.env.REACT_APP_SERVER_API}/api/v1/organizations/${userInfo?.organizationId}`)
      .then((response) => response.json())
      .then((data) => {
        setData(data);

        // Remove previous manifest if it exists
        const existingManifest = document.getElementById('manifest');
        if (existingManifest) {
          existingManifest.remove();
        }

        // Generate the dynamic manifest
        const manifest = {
          "short_name": data?.organizationName,
          "name": data?.organizationName,
          "icons": [
            /*   {
                "src": "experimentLabsIcon196.png",
                "sizes": "196x196",
                "type": "image/png"
                "purpose": "maskable"
              }, */

            {
              "src": "https://i.ibb.co/qCjt6fH/icon192.png",
              "type": "image/png",
              "sizes": "192x192",
              "purpose": "maskable"
            },

            {
              "src": "https://i.ibb.co/5K6F5M6/icon512.png",
              "type": "image/png",
              "sizes": "512x512"
            },

             {
               "src": 'https://i.ibb.co/nQL81Tw/icon64.png',
               "type": "image/png",
               "sizes": "64x64",
               "purpose":"any"
             },    
           
          ],
          "start_url": "http://localhost:3000/", 
          "display": "standalone",
          "theme_color": "#000000",
          "background_color": "#000000",
          "prefer_related_applications": true
        }

        //
        

        //

        const dynamicJsonDataLink = document.createElement('link');
        dynamicJsonDataLink.id = 'manifest';
        dynamicJsonDataLink.rel = 'manifest';
        dynamicJsonDataLink.href = URL.createObjectURL(
          new Blob([JSON.stringify(manifest)], { type: 'application/json' })
        );
        document.head.appendChild(dynamicJsonDataLink);

        setIsLoading(false);
        Loading().close();
      })
      .catch((error) => {
        console.error("Error fetching organization data:", error);
        setIsLoading(false);
        Loading().close();
      });
  }, [userInfo]);

  if (isLoading) {
    return <div></div>;
  }
  return (
    <div className="max-w-[1920px] mx-auto">
      <RouterProvider router={router}></RouterProvider>
      <Toaster />
    </div>
  );
}

export default App;


