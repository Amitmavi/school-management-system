import Home from "./pages/home/Home";
import AllTeacher from "./pages/teacher/allteacher/allteacher";
import AllStudent from "./pages/student/allstudent/allstudent";
import StudentAttendance from './pages/student/student-attendance/studentattendence'
import Teacherattendence  from "./pages/teacher/teacher-attendance/teacher-attendence";
import TeacherProfile from "./pages/teacher/TeacherProfile/teacherProfile";
import CreateClass from "./pages/class/createclass/createclass"
import Allclass from "./pages/class/allclass/allclass";
import Syllabus from "./pages/class/syllabus/syllabus";
import AllUser from "./pages/user/user";
import BookList from "./pages/library-manage/BookList/BookList";
import IssueReturn from './pages/library-manage/IssueReturn/IssueReturn';
import Addsubject from "./pages/subject/Subject";
import MarksPage from "./pages/class/marksmaster/MarksPage";
import DatesheetPage from "./pages/class/datesheet/DatesheetPage";

import AddStudent from "./pages/student/addstudent/addstudent";
import AddTeacher from "./pages/teacher/addteacher/addteacher";
import Adduser from "./pages/user/adduser/adduser";
import "./App.css";
import SideBar from "./components/bar/sidebar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import "../../style/dark.scss";
import { useContext } from "react";
import { DarkModeContext } from "../../context/darkModeContext";





function AdminDashboard() {
  const { darkMode } = useContext(DarkModeContext);

  return (
    <div className={darkMode ? "app dark" : "app"}>
     
     <Router>
      <SideBar>
        <Routes>
          <Route path="/admin" element={<Home />} />
          <Route path="/all-teacher" element={<AllTeacher />} />
          <Route path="/teacher-registration" element={<AddTeacher />} />
          <Route path="/teacher-attendace" element={<Teacherattendence />} />
          <Route path="/teacher/:teacherId" element={<TeacherProfile />} />
          

          <Route path="/student-admission" element={<AddStudent />} />
          <Route path="/all-students" element={<AllStudent />} />
          <Route path="/student-attendace" element={<StudentAttendance />} />
          

          <Route path="/class/create-class" element={<CreateClass />} />
          <Route path="/class/all-class" element={<Allclass />} />
          <Route path="/class/syllabus" element={<Syllabus />} />
          <Route path="/class/markspage" element={<MarksPage />} />
          <Route path="/class/datesheet" element={<DatesheetPage />} />
          <Route path="/user/add-user" element={< Adduser/>} />
          <Route path="/user/all-user" element={<AllUser />} />


          <Route path="/book-list" element={<BookList />} />
          <Route path="/issue-return" element={<IssueReturn />} />

          <Route path="/add-subject" element={<Addsubject />} />
          
          <Route path="/file-manager" element={<Home />} />
          <Route path="/order" element={<Home />} />
          <Route path="/saved" element={<Home />} />
          <Route path="/settings" element={<Home />} />

          <Route path="*" element={<> not found</>} />
        </Routes>
      </SideBar>
    </Router>
    </div>
  );
}

export default AdminDashboard;