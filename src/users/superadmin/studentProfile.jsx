import React from 'react'
import Navbar from '../admin/components/bar/navbar/Navbar';
import { useParams } from "react-router-dom";
import StudentProfileComponent from '../../components/student/student-profile/studentProfile';

export default function StudentProfile() {

    const { studentId } = useParams();
    return (
        <div >
                <Navbar/>
            <StudentProfileComponent studentUid={studentId}/>
    
        
        </div>
    
    );
}
