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
import PointsAndRedemptions from "../../Pages/Dashboard/PointsAndRedemptions/PointsAndRedemptions";
import EarningLogics from "../../Pages/Dashboard/PointsAndRedemptions/EarningLogics";
import RedemptionLogics from "../../Pages/Dashboard/PointsAndRedemptions/RedemptionLogics";
import SkillsManagement from "../../Pages/Dashboard/SkillsManagement/SkillsManagement";
import SkillsCreations from "../../Pages/Dashboard/SkillsManagement/SkillsCreations";
import SkillsImprovementEngine from "../../Pages/Dashboard/SkillsManagement/SkillsImprovementEngine";

import CreateCourse from "../../Pages/Dashboard/ContentManagement/CreateCourse";
import CourseAccess from "../../Pages/Dashboard/CourseAccess/CourseAccess";
import CourseInformation from "../../Pages/Dashboard/CourseInformation/CourseInformation";
import Week from "../../Pages/Dashboard/Week/Layout/Week";
import ManageLiveClasses from "../../Pages/Dashboard/ContentManagement/ManageLiveClasses";
import Assignment from "../../Pages/Dashboard/ContentManagement/Assignment";

import ManageReading from "../../Pages/Dashboard/ContentManagement/ManageReading";
import ManageFile from "../../Pages/Dashboard/ContentManagement/ManageFile";
import ManageVideo from "../../Pages/Dashboard/ContentManagement/ManageVideo";
import ManageAudio from "../../Pages/Dashboard/ContentManagement/ManageAudio";
import ManageQuiz from "../../Pages/Dashboard/ContentManagement/ManageQuiz";
import QuizGeneralInformation from "../../Pages/Dashboard/ContentManagement/QuizGeneralInformation";
import QuizResult from "../../Pages/Dashboard/ContentManagement/QuizResult";
import QuizEvaluationParameter from "../../Pages/Dashboard/ContentManagement/QuizEvaluationParameter";
import ManageQuestionBank from "../../Pages/Dashboard/ContentManagement/ManageQuestionBank";
import ManageQuestion from "../../Pages/Dashboard/ContentManagement/ManageQuestion";
import AddingEditingCalQues from "../../Pages/Dashboard/ContentManagement/AddingEditingCalQues";
import AddingEditingMultiChoQues from "../../Pages/Dashboard/ContentManagement/AddingEditingMultiChoQues";
import AddingEditingEssayQues from "../../Pages/Dashboard/ContentManagement/AddingEditingEssayQues";
import AddingEditingMatchingQues from "../../Pages/Dashboard/ContentManagement/AddingEditingMatchingQues";
import AddingEditingSelectMissingQues from "../../Pages/Dashboard/ContentManagement/AddingEditingSelectMissingQues";
import AddingEditingTrueFalseQues from "../../Pages/Dashboard/ContentManagement/AddingEditingTrueFalseQues";
import OnGoingClasses from "../../Pages/Dashboard/ExecutionMentorLiveClasses/OnGoingClasses";
import UpComingClasses from "../../Pages/Dashboard/ExecutionMentorLiveClasses/UpComingClasses";
import ExecutionMentorSchedule from "../../Pages/Dashboard/ExecutionMentorSchedule/ExecutionMentorSchedule";
import ExecutionMentorDashboard from "../../Pages/Dashboard/ExecutionMentorDashboard/ExecutionMentorDashboard";
import PerformanceFeedback from "../../Pages/Dashboard/ExecutionMentorDashboard/PerformanceFeedback";
import Students from "../../Pages/Dashboard/ExecutionMentorDashboard/Students";
import StudentsWhoNeedMoreGuidance from "../../Pages/Dashboard/ExecutionMentorDashboard/StudentsWhoNeedMoreGuidance";
import StudentFeedback from "../../Pages/Dashboard/ExecutionMentorDashboard/StudentFeedback";
import DepartmentEvaluation from "../../Pages/Dashboard/ExecutionMentorDashboard/DepartmentEvaluation";
import MentorAssignments from "../../Pages/Dashboard/ExecutionMentorAssignments/MentorAssignments";
import AssignmentEvaluation1 from "../../Pages/Dashboard/ExecutionMentorAssignments/AssignmentEvaluation1";
import AssignmentEvaluation2 from "../../Pages/Dashboard/ExecutionMentorAssignments/AssignmentEvaluation2";
import Skill from "../../Pages/Dashboard/SkillsManagement/Skill";
import UnpaidStudentDashboard from "../../Pages/Dashboard/UnpaidStudentDashboard/UnpaidStudentDashboard";
import StudentControlDashboard from "../../Pages/Dashboard/StudentControl/StudentControlDashboard";
import UnpaidDashboard from "../../Pages/Dashboard/StudentControl/UnpaidDashboard";
import ExpertMentorDashboard from "../../Pages/Dashboard/ExpertMentorDashboard/ExpertMentorDashboard";
import ExpertMentorStudentProgress from "../../Pages/Dashboard/ExpertMentorDashboard/ExpertMentorStudentProgress";
import ExpertMentorStudentFeedback from "../../Pages/Dashboard/ExpertMentorDashboard/ExpertMentorStudentFeedback";
import ExpertMentorResourceCentre from "../../Pages/Dashboard/ExpertMentorDashboard/ExpertMentorResourceCentre/ExpertMentorResourceCenter";
import StudentProgressOverallBatchPerformance from "../../Pages/Dashboard/ExpertMentorDashboard/ExpertMentorStudentProgress/StudentProgressOverallBatchPerformance";
import ExpertMentorShowcasePage from "../../Pages/Dashboard/ExpertMentorDashboard/ShowcasePage/ExpertMentorShowcasePage";

import EditTasks from "../../Pages/Dashboard/ContentManagement/EditTasks/EditTasks";
import ZoomIntegration from "../../Pages/Tester/ZoomIntegration";

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
    path: "/questLevels/:id",
    element: <CourseInformation />,
  },
  {
    path: "/week/:id",
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
    path: "/pointsAndRedemptions",
    element: <PointsAndRedemptions />,
  },
  {
    path: "/earningLogics",
    element: <EarningLogics />,
  },
  {
    path: "/redemptionLogics",
    element: <RedemptionLogics />,
  },
  {
    path: "/gamifiedSettings",
    element: <EnrollRegistration />,
  },
  {
    path: "/skillsManagement",
    element: <SkillsManagement />,
  },
  {
    path: "/skillsCreations",
    element: <SkillsCreations />,
  },
  {
    path: "/skillsImprovementEngine",
    element: <SkillsImprovementEngine />,
  },
  {
    path: "/createCourse",
    element: <CreateCourse />,
  },
  {
    path: "/manageLiveClasses/:id",
    element: <ManageLiveClasses />,
  },
  {
    path: "/assignment/:id",
    element: <Assignment />,
  },
  {
    path: "/editTask/:id",
    element: <EditTasks />,
  },
  {
    path: "/manageReading/:id",
    element: <ManageReading />,
  },
  {
    path: "/manageFile/:id",
    element: <ManageFile />,
  },
  {
    path: "/manageVideo/:id",
    element: <ManageVideo />,
  },
  {
    path: "/manageAudio/:id",
    element: <ManageAudio />,
  },
  /* {
    path: "/manageQuiz",
    element:<ManageQuiz/>,
  }, */
  {
    path: "/quizGeneralInfo",
    element: <QuizGeneralInformation />,
  },
  {
    path: "/quizResult",
    element: <QuizResult />,
  },
  {
    path: "/quizEvaluationParameter",
    element: <QuizEvaluationParameter />,
  },
  {
    path: "/manageQuestionBank",
    element: <ManageQuestionBank />,
  },
  {
    path: "/manageQuestion",
    element: <ManageQuestion />,
  },
  {
    path: "/addingEditingCalQues",
    element: <AddingEditingCalQues />,
  },
  {
    path: "/addingEditingMultiChoQues",
    element: <AddingEditingMultiChoQues />,
  },
  {
    path: "/addingEditingEssayQues",
    element: <AddingEditingEssayQues />,
  },
  {
    path: "/addingEditingMatchingQues",
    element: <AddingEditingMatchingQues />,
  },
  {
    path: "/addingEditingSelectMissingQues",
    element: <AddingEditingSelectMissingQues />,
  },
  {
    path: "/addingEditingTrueFalseQues",
    element: <AddingEditingTrueFalseQues />,
  },
  {
    path: "/mentorAssignments",
    element: <MentorAssignments />,
  },
  {
    path: "/assignmentEvaluation1",
    element: <AssignmentEvaluation1 />,
  },
  {
    path: "/assignmentEvaluation2",
    element: <AssignmentEvaluation2 />,
  },
  {
    path: "/skill",
    element: <Skill />,
  },
  {
    path: "/liveClasses",
    element: <OnGoingClasses />,
  },
  {
    path: "/upcomingClasses",
    element: <UpComingClasses />,
  },
  {
    path: "/schedule",
    element: <ExecutionMentorSchedule />,
  },
  {
    path: "/executionMentorDashboard",
    element: <ExecutionMentorDashboard />,
  },
  {
    path: "/performanceFeedback",
    element: <PerformanceFeedback />,
  },
  {
    path: "/students",
    element: <Students />,
  },
  {
    path: "/studentsWhoNeedMoreGuidance",
    element: <StudentsWhoNeedMoreGuidance />,
  },
  {
    path: "/studentFeedback",
    element: <StudentFeedback />,
  },
  {
    path: "/departmentEvaluation",
    element: <DepartmentEvaluation />,
  },
  {
    path: "/unpaidStudentDashboard",
    element: <UnpaidStudentDashboard />,
  },
  {
    path: "/studentControl",
    element: <StudentControlDashboard />,
  },
  {
    path: "/unpaidDashboard",
    element: <UnpaidDashboard />,
  },
  {
    path: "/expertMentorDashboard",
    element: <ExpertMentorDashboard />,
  },
  {
    path: "/expertMentorStudentProgress",
    element:<ExpertMentorStudentProgress/>,
  },
  {
    path: "/expertMentorStudentFeedback",
    element:<ExpertMentorStudentFeedback/>,
  },
  {
    path: "/expertMentorResourceCentre",
    element:<ExpertMentorResourceCentre/>,
  },
  {
    path: "/studentProgressOverallBatchPerformance",
    element:<StudentProgressOverallBatchPerformance/>,
  },
 
  {
    path: "/showcasePage",
    element:<ExpertMentorShowcasePage/>,
  },
  {
    path:'/test',
    element:<ZoomIntegration/>
  }
 
 
]);

export default router;
