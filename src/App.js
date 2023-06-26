import { RouterProvider } from "react-router-dom";
import router from "./Router/Router/Router";
import { Toaster } from "react-hot-toast";
import ReactGA from "react-ga4";

ReactGA.initialize("G-RL7TBN4FCW");

function App() {
  return (
    <div className="max-w-[1920px] mx-auto">
      <RouterProvider router={router} ></RouterProvider>
      <Toaster />
    </div>
  );
}

export default App;
