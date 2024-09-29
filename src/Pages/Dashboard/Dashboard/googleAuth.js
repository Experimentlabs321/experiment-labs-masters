import { useEffect } from "react";
// import { useAuth } from "./AuthContext"; // Assuming you have an AuthContext for Firebase authentication.

const useGoogleApiAuth = () => {
  useEffect(() => {
    const initClient = async () => {
      await new Promise((resolve, reject) => {
        window.gapi.load("client", () => {
          // console.log("loaded client");

          window.gapi.client
            .init({
              apiKey: "AIzaSyAbucJgm11j4203pv_Rj7W4En13IprwidQ",
              clientId:
                "431307232577-aqa7kc8dsamc8hofr0dacl7nljkcq3n7.apps.googleusercontent.com",
              discoveryDocs: [
                "https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest",
              ],
              scope: "https://www.googleapis.com/auth/calendar",
            })
            .then(() => {
              // console.log("initialized client");
              resolve();
            })
            .catch((error) => {
              console.error("Error initializing client:", error);
              reject(error);
            });
        });
      });

      // After initializing the client, you can manage the authentication as needed.

      // For example, you can use the useAuth hook (from your AuthContext) to handle Firebase authentication.
    };

    initClient();
  }, []);

  return null; // This hook doesn't render anything.
};

export default useGoogleApiAuth;
