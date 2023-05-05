import { RouterProvider } from "react-router-dom";
import router from "./Router/Router/Router";


function App() {
  return (
    <div className="max-w-[1920px] mx-auto App">
      <RouterProvider router={router} ></RouterProvider>
    </div>
  );
}

export default App;
