import React from 'react'
import { Routes, Route } from 'react-router-dom';
import Dashboardpage from '../users/librarian/Pages/Home/dashboardpage';
import SideMenu from '../users/librarian/components/sidebar/sidebar';
import AppHeader from "../users/librarian/components/appheader/appheader" 
import BookListPage from '../users/librarian/Pages/bookList//booklistPage';
import IssueRetrun from '../users/librarian/Pages/IssueRetrun/IssueReturnPage';
import DueReminder from '../users/librarian/Pages/Allissuedbook/dueReminder';
import AddStudent from "../users/librarian/Pages/addstudent/addstudentpage";
import AddStaff from '../users/librarian/Pages/addStaf/addStaf';
import Addbook from '../users/librarian/Pages/addbook/addbook';
import "./librarian.css"

export default function librarianRouters() {
  return (
    <div className="Librarian">
      <AppHeader />
      <div className="SideMenuAndPageContent">
        <SideMenu></SideMenu>
        <Routes>
          <Route>
                 <Route path='/' element={ <Dashboardpage/>} />  
                 <Route path='/booklist' element={<BookListPage/>} /> 
                 <Route path='/issue-return' element={<IssueRetrun/>} /> 
                 <Route path='/due-reminder' element={<DueReminder/>} /> 
                 <Route path='/add-student' element={<AddStudent/>} /> 
                 <Route path='/add-staff' element={< AddStaff/>} />  
                 <Route path='/add-book' element={< Addbook/>} /> 
          </Route>  
        </Routes>
      </div>

    </div>
  );
}



 