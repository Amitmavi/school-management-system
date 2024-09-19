import React from 'react'
import CreateClassForm from '../../components/class/CreateClassForm';
 import Navbar from '../../components/navbar/Navbar';
 import Sidebar from '../../components/sidebar/Sidebar';
export default function watch() {
    return ( 
        <div className="list"> 
            <Sidebar/>
            <div className="listContainer">
                <Navbar/>

              
                 <CreateClassForm/>

            </div>
        </div>
    );
}
