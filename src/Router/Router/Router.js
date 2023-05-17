import { createBrowserRouter } from "react-router-dom";
import Main from "../../layout/Main/Main";
import ErrorPage from "../../Pages/Shared/ErroPage/ErrorPage";
import Home from "../../Pages/Home/Home/Home";
import ScienceInnovation from "../../layout/ScienceInnovation/ScienceInnovation";
import SciencePage from "../../Pages/SciencePage/SciencePage/SciencePage";

const router = createBrowserRouter([
    {
        path: '/',
        element: <Main />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: '/',
                element: <Home />
            }
        ]
    },
    {
        path: '/science-innovation/',
        element: <ScienceInnovation/>,
        errorElement: <ErrorPage />,
        children: [
            {
                path: '/science-innovation/',
                element: <SciencePage/>
            }
        ]
    }
]);

export default router;