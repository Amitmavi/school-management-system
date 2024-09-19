import React from 'react';
import { Routes, Route } from 'react-router-dom';
import "../users/admin/App.css";
import SideBar from "../users/admin/components/bar/sidebar/Sidebar";
import Home from "../users/admin/pages/home/Home";

//Teacher
import AllStudent from "../users/admin/pages/student/allstudent/allstudent";
import AllTeacher from "../users/admin/pages/teacher/allteacher/allteacher";
import AddTeacher from '../users/admin/pages/teacher/addteacher/addteacher';
import TeacherAttendance from '../users/admin/pages/teacher/teacher-attendance/teacher-attendence';
import TeacherProfile from '../users/admin/pages/teacher/TeacherProfile/teacherProfile';
import TeacherUploaderPage from '../users/admin/pages/teacher/teacherUploaderPage/teacherUploaderPage';
import TeacherAttendence from '../users/admin/pages/teacher/teacher-attendance/teacher-attendence';


// Students
import AddStudent from '../users/admin/pages/student/addstudent/addstudent';
import StudentProfile from '../users/superadmin/studentProfile';
import StudentAttendance from '../users/admin/pages/student/student-attendance/studentattendence';
import AddStudentsPage from '../users/admin/pages/student/classAllstudent/addStudentPage';
import OnlineStudentAdmission from '../users/admin/pages/student/admissionForm/onlineStudentAdmission';
import StudentFeesPage from '../users/admin/pages/student/classAllStudentFees/studentFeesPage';
import StudentAttendanceImportExportPage from '../users/admin/pages/student/studentAttendance-Import-Export/studentAttendanceImportExportpage';

//Librarian
import BookList from '../users/admin/pages/library-manage/BookList/BookList';
import IssueReturn from '../users/admin/pages/library-manage/IssueReturn/IssueReturn';
import AddBook from '../users/librarian/Pages/addbook/addbook';
import AddStudentComponent from '../components/Library-management/studentadd/addstudentcomponent'
 import AllIssued from '../users/librarian/Pages/Allissuedbook/dueReminder';
import AddStaff from '../users/librarian/Pages/addStaf/addStaf'
import AllUser from '../users/admin/pages/user/user';
import AddUser from '../users/admin/pages/user/adduser/adduser';
import CreateClass from '../users/admin/pages/class/createclass/createclass';

//Time Table
import TeacherTimeTableUpload from "../components/teachertimetable/timetable";
import TeacherTimeTableView from "../components/teachertimetable/timetableviewer";
import UploadTimeTablePage from "../components/timetable/UploadTimeTable"
import TimeTableViewerPage from "../components/timetable/TimeTableViewer"
import TimeTableViewerpage2 from "../components/timetable/TimeTableViewer2"

//Class
import SyllabusPage from '../users/admin/pages/class/syllabus/syllabus';
import AllClass from '../users/admin/pages/class/allclass/allclass';
import Subject from "../users/admin/pages/subject/Subject"//
import MarksPage from '../users/admin/pages/class/marksmaster/MarksPage';
import DatesheetPage from "../users/admin/pages/class/datesheet/DatesheetPage";
import  ClassPromoterPage from '../users/admin/pages/class/classPromter/classPromoterPage';
// Set nahi kia kya rouer? got it admindb.jsx mai kar diya tha
//Fees collection
import Duefees from '../users/accountant/pages/searchduefees/searchduefees';
import Collectfees from '../users/accountant/component/collectfees/collectfees';
import Reminder from '../users/accountant/pages/feesreminder/feesreminder';
import CollectFees from '../users/accountant/component/collectfees/collectfees';

//Android Setting
import AndroidSetting from '../users/admin/pages/setting/androidSetting';
//kro route set abhi

function AdminRoutes() {

    
function NotFound() {
  return <div>Page not found</div>;
  } 

  return (
    <SideBar>
      <Routes>
        <Route path='/' element={<Home />} />
      


        {/* Tecahers Route */}
        <Route path='/all-teachers' element={<AllTeacher />} />
        <Route path="/all-teachers/:teacherId" element={<TeacherProfile />} />
        <Route path="/teacher-registration" element={<AddTeacher />} />
        <Route path="/teacher-attendance" element={<TeacherAttendance />} />
        <Route path="/teacher/teacher-import-export" element={<TeacherUploaderPage />} />
        <Route path="/teacher-attendace" element={<TeacherAttendence />} />

        {/* Students Route */}
        <Route path='/all-students' element={<AllStudent />} />
        <Route path='/all-students/:studentId' element={< StudentProfile />} />
        <Route path="/student-admission" element={<AddStudent />} />
        <Route path="/student/online-admission-form" element={<OnlineStudentAdmission />} />
        <Route path="/student-attendance" element={<StudentAttendance />} />
        <Route path="/student/student-import-export" element={<AddStudentsPage />} />
        <Route path="/class/fees-student" element={<StudentFeesPage />} />
        <Route path="/student/student-attendance-import-export" element={<StudentAttendanceImportExportPage />} />
       



        {/* Class Route */}
        <Route path="class/create-class" element={<CreateClass />} />
        <Route path="/class/all-class" element={<AllClass />} />
        <Route path="/class/syllabus" element={<SyllabusPage />} />
        <Route path="/add-subject" element={<Subject/>}/>
        <Route path='/class/markspage' element={<MarksPage/>}></Route>
        <Route path="/class/datesheet" element={<DatesheetPage />} />
        <Route path="/class-promotion" element={< ClassPromoterPage />} />


        {/* User Route */}
        <Route path="/user/add-user" element={<AddUser />} />
        <Route path="/user/all-user" element={<AllUser />} />



        {/* Librarian */}
        <Route path="/book-list" element={<BookList />} />
        <Route path="/issue-return" element={<IssueReturn />} />
        <Route path="/add-book" element={<AddBook />} />
        <Route path="add-student" element={<  AddStudentComponent/>} />
        <Route path="add-staff" element={<AddStaff />} />
        <Route path="all-issued" element={<AllIssued />} />

        {/* Teacher Time Table */}
        <Route path='/teacher-timetable' element={<TeacherTimeTableView/>} />
        <Route path ='/teacher-timetable-upload' element={<TeacherTimeTableUpload/>} />
        <Route path="/timetable" element={<UploadTimeTablePage />} />
        <Route path="/alldaytimetableviewer" element={<TimeTableViewerPage/>} />
        <Route path="/timetableviewer" element={<TimeTableViewerpage2/>} />

        {/*Fees Collection */}

         <Route path='/Duefees' element={ <Duefees/>} />
         <Route path='/CollectFees' element={ <CollectFees/>} />
          <Route path='/Reminder' element={ <Reminder/>} />

        {/* Setting page */}
        <Route path="/android" element={<AndroidSetting/>} />

        {/* Add more routes as needed */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </SideBar>
  );
}


export default AdminRoutes;
