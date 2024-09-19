import React from 'react';
import { Route, Routes } from 'react-router-dom';
import AppHeader from "../users/receptionist/component/appheader/appheader";
import Dashboard from '../users/receptionist/component/dashboard';
import SideBar from '../users/receptionist/component/sidebar/sidebar';
import AddEnquiry from '../users/receptionist/pages/addEnqiry';
import AddComplain from '../users/receptionist/pages/addcomplain';
import FrontSetup from '../users/receptionist/pages/frontsetup';
import Visitbook from '../users/receptionist/pages/visitbook';


export default function ReceptionsistRouters() {
  return (
    <div className="Librarian">
     
     <AppHeader />
      <div className="SideMenuAndPageContent">
    
      <SideBar>
  
        <Routes>
       
          <Route>
          <Route path='/dash' element={ <Dashboard/>} />  
                 <Route path='/addmission' element={ <AddEnquiry/>} />  
                 <Route path='/visiter' element={ <Visitbook/>} />  
                 <Route path='/complain' element={ <AddComplain/>} />  
                 <Route path='/frontsetup' element={ <FrontSetup/>} />  
          </Route>
         
        </Routes>
        </SideBar>
      </div>
     
    </div>
  );
}
