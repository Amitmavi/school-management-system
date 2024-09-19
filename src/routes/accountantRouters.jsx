import React from 'react';
import { Route, Routes } from 'react-router-dom';
import SideBar from '../users/accountant/component/accountant-sidebar/accountantSideBar';
import AccountentDashboard from '../users/accountant/pages/Home/accountentdashboard';
import FeesMaster from '../users/accountant/pages/feesMaster/feesmaster';
import Carryforword from '../users/accountant/pages/feescarryforword/feescarryforword';
import Discount from '../users/accountant/pages/feesdiscount/feesdiscount';
import Group from '../users/accountant/pages/feesgroup/feesgroup';
import Reminder from '../users/accountant/pages/feesreminder/feesreminder';
import Type from '../users/accountant/pages/feestype/feestype';
import RoutePage from '../users/accountant/pages/route/routePage';
import Assign from '../users/accountant/pages/Assign/assign';
import VehicalName from '../users/accountant/pages/VehicalName/vehicalName';
import Expances from '../users/accountant/pages/Expance/expance';
import ExpanceHead from '../users/accountant/component/expancehead/expancehead';
import Duefees from '../users/accountant/pages/searchduefees/searchduefees';

export default function AccountatRouters() {
  return (
    <div className="Librarian">
   
     
    
      <SideBar>
  
        <Routes>
       
          <Route>
                 <Route path='/' element={ <AccountentDashboard/>} />  
                 <Route path='/Duefees' element={ <Duefees/>} /> 
                 <Route path='/Master' element={ <FeesMaster/>} />
                 <Route path='/Group' element={ <Group/>} />   
                 <Route path='/Type' element={ <Type/>} />
                 <Route path='/Reminder' element={ <Reminder/>} />       
                 <Route path='/Discount' element={ <Discount/>} /> 
                 <Route path='/Carryforword' element={ <Carryforword/>} />   
                 <Route path='/route' element={<RoutePage/>} />
                 <Route path='/Assign' element={<Assign/>} />
                 <Route path='/VehicalName' element={<VehicalName/>} />
                 <Route path='/Expances' element={<Expances/>} />
                 <Route path='/ExpanceHead' element={<ExpanceHead/>} />
                 
                 
                   
           
                 
                   
          </Route>
         
        </Routes>
        </SideBar>
      </div>
     
    
  );
}
