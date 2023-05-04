import { createBrowserRouter } from "react-router-dom";
import Main from "../../layout/Main/Main";
import ErrorPage from "../../Pages/Shared/ErroPage/ErrorPage";
import Home from "../../Pages/Home/Home/Home";

const router = createBrowserRouter([
    {
        path:'/',
        element:<Main/>,
        errorElement:<ErrorPage/>,
        children: [
            {
                path:'/',
                element:<Home/>
            }
        ]
    }
]);

export default router;