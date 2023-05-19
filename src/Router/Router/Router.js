import { createBrowserRouter } from "react-router-dom";
import Main from "../../layout/Main/Main";
import ErrorPage from "../../Pages/Shared/ErroPage/ErrorPage";
import Home from "../../Pages/Home/Home/Home";
import SciencePage from "../../Pages/SciencePage/SciencePage/SciencePage";
import ExperienceUnionPage from "../../Pages/ExperienceUnion/ExperienceUnionPage/ExperienceUnionPage";

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
        element: <SciencePage />,

    },
    {
        path: '/experience-union',
        element: <ExperienceUnionPage/>,

    },

]);

export default router;