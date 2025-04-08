
import "./App.css";
import { Routes, Route } from "react-router-dom";
import HomePage from "./assets/Pages/HomePage";
import LoginSignupLayout from "./assets/Layout/LoginSignupLayout";
import StudentLogin from "./assets/Pages/Student/StudentLogin";
import MentorLogin from "./assets/Pages/Mentor/MentorLogin";
import TeacherLogin from "./assets/Pages/Teacher/TeacherLogin";
import AdminLogin from "./assets/Pages/Admin/AdminLogin";
import OrgLogin from "./assets/Pages/Organisation/OrgLogin";
import StudentRegistration from "./assets/Pages/Student/StudentRegistration";
import MentorRegistration from "./assets/Pages/Mentor/MentorRegistration";
import OrgRegistration from "./assets/Pages/Organisation/OrgRegistration";
import TeacherRegistration from "./assets/Pages/Teacher/TeacherRegistration";
import StudentLayout from "./assets/Layout/StudentLayout";
import MentorLayout from "./assets/Layout/MentorLayout";
import OrganisationLayout from "./assets/Layout/OrganisationLayout";
import TeacherLayout from "./assets/Layout/TeacherLayout";
import AdminLayout from "./assets/Layout/AdminLayout";
import StudentHome from "./assets/Pages/Student/StudentHome";
import MentorHome from "./assets/Pages/Mentor/MentorHome";
import TeacherHome from "./assets/Pages/Teacher/TeacherHome";
import OrganisationHome from "./assets/Pages/Organisation/OrganisationHome";
import AdminHome from "./assets/Pages/Admin/AdminHome";
import StudentAssessments from "./assets/Pages/Student/StudentAssessments";
import StudentProfile from "./assets/Pages/Student/StudentProfile";
import TeacherAssessments from "./assets/Pages/Teacher/TeacherAssessments";
import TeacherProfile from "./assets/Pages/Teacher/TeacherProfile"
import MentorProfile from "./assets/Pages/Mentor/MentorProfile"
import Loader from "./assets/Components/Loader";
import Unauthorized from "./assets/Components/Unauthorized";
import ProtectedRoute from "./assets/Components/ProtectedRoute";
const App = () => {
  return (
    <Routes>
      <Route path="/loader" element={<Loader />}/>
      <Route path="/" element={<HomePage />} />
      <Route path="/unauthorized" element={<Unauthorized />} />
      <Route element={<LoginSignupLayout />}>
        <Route path="studentLogin" element={<StudentLogin />} />
        <Route path="mentorLogin" element={<MentorLogin />} />
        <Route path="teacherLogin" element={<TeacherLogin />} />
        <Route path="organisationLogin" element={<OrgLogin />} />
        <Route path="adminLogin" element={<AdminLogin />} />
        <Route path="studentRegistration" element={<StudentRegistration />} />
        <Route path="mentorRegistration" element={<MentorRegistration />} />
        <Route path="teacherRegistration" element={<TeacherRegistration />} />
        <Route path="organisationRegistration" element={<OrgRegistration />} />
      </Route>
      
      <Route element={<ProtectedRoute allowedRole="student" />}>
      <Route path="student" element={<StudentLayout />}>
        <Route index element={<StudentHome />} />
        <Route path="assessments" element={<StudentAssessments />} />
        <Route path="profile" element={<StudentProfile />} />
      </Route>
      </Route>

      <Route element={<ProtectedRoute allowedRole="mentor" />}>
      <Route path="mentor" element={<MentorLayout />}>
        <Route index element={<MentorHome />} />
        <Route path="profile" element={<MentorProfile />} />
      </Route>
      </Route>

      <Route element={<ProtectedRoute allowedRole="teacher" />}>
      <Route path="teacher" element={<TeacherLayout />}>
        <Route index element={<TeacherHome />} />
        <Route path="assessments" element={<TeacherAssessments />} />
        <Route path = "profile" element={<TeacherProfile />} />
      </Route>
      </Route>

      <Route element={<ProtectedRoute allowedRole="organisation" />}>
      <Route path="organisation" element={<OrganisationLayout />}>
        <Route index element={<OrganisationHome />} />
      </Route>
      </Route>
      
      <Route element={<ProtectedRoute allowedRole="globalAdmin" />}>
      <Route path="admin" element={<AdminLayout />}>
        <Route index element={<AdminHome />} />
      </Route>
      </Route>
    </Routes>
  );
};

export default App;
