import React from 'react'
import TimeTable from '../../../../components/timtable/time-table/time-table'
import Navbar from '../../../../components/navbar/Navbar';
import Sidebar from '../../../../components/bar/sidebar/Sidebar';

export default function Timetbale() {
    return (
        <div className="list">
            <Sidebar/>
            <div className="listContainer">
                <Navbar/>
                
                <TimeTable/>
                 
            </div>
        </div>
    );
}
