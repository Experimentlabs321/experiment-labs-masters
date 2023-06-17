import { createBrowserRouter } from "react-router-dom";
import Main from "../../layout/Main/Main";
import ErrorPage from "../../Pages/Shared/ErroPage/ErrorPage";
import Home from "../../Pages/Home/Home/Home";
import SciencePage from "../../Pages/SciencePage/SciencePage/SciencePage";
import ExperienceUnionPage from "../../Pages/ExperienceUnion/ExperienceUnionPage/ExperienceUnionPage";
import Register from "../../Pages/Login/Register/Register";
import Login from "../../Pages/Login/Login/Login";
import CommercePage from "../../Pages/CommercePage/CommercePage/CommercePage";
import HumanitiesPage from "../../Pages/HumanitiesPage/HumanitiesPage/HumanitiesPage";
import ExperienceUnionCommercePage from "../../Pages/ExperienceUnionCommerce/ExperienceUnionPage/ExperienceUnionCommercePage";
import ExperienceUnionHumanitiesPage from "../../Pages/ExperienceUnionHumanities/ExperienceUnionPage/ExperienceUnionHumanitiesPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
    ],
  },
  {
    path: "/science-innovation/",
    element: <SciencePage />,
  },
  {
    path: "/commerce-entrepreneurship/",
    element: <CommercePage />,
  },
  {
    path: "/humanities-arts/",
    element: <HumanitiesPage />,
  },
  {
    path: "/productLab-landingPage",
    element: <ExperienceUnionPage />,
  },
  {
    path: "/businessLab-landingPage",
    element: <ExperienceUnionCommercePage />,
  },
  {
    path: "/creativityLab-landingPage",
    element: <ExperienceUnionHumanitiesPage />,
  },
]);

export default router;
