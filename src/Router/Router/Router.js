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
import Dashboard from "../../Pages/Dashboard/Dashboard/Dashboard";
import LeaderBoard from "../../Pages/Dashboard/LeaderBoard/LeaderBoard";
import Earning from "../../Pages/Dashboard/Earning/Earning";
import Redemption from "../../Pages/Dashboard/Redemption/Redemption";
import SkillAnalysis from "../../Pages/Dashboard/SkillAnalysis/SkillAnalysis";
import CareerAnalysis from "../../Pages/Dashboard/CareerAnalysis/CareerAnalysis";
import UserMangement from "../../Pages/Dashboard/UserManagement/UserMangement";
import EnrollRegistration from "../../Pages/Dashboard/EnrollRegistration/EnrollRegistration";
import CourseAccess from "../../Pages/Dashboard/CourseAccess/CourseAccess";
import CourseInformation from "../../Pages/Dashboard/CourseInformation/CourseInformation";
import Week from "../../Pages/Dashboard/Week/Layout/Week";

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
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
  {
    path: "/leaderBoard",
    element: <LeaderBoard />,
  },
  {
    path: "/earning",
    element: <Earning />,
  },
  {
    path: "/redemption",
    element: <Redemption />,
  },
  {
    path: "/skillAnalysis",
    element: <SkillAnalysis />,
  },
  {
    path: "/courseAccess",
    element: <CourseAccess />,
  },
  {
    path: "/questLevels",
    element: <CourseInformation />,
  },
  {
    path: "/week",
    element: <Week />,
  },
  {
    path: "/careerAnalysis",
    element: <CareerAnalysis />,
  },
  {
    path: "/userManagement",
    element: <UserMangement />,
  },
  {
    path: "/gamifiedSettings",
    element: <EnrollRegistration />,
  },
]);

export default router;
