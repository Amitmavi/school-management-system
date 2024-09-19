import React from 'react';
import { useParams } from "react-router-dom";
import Navbar from '../../../components/bar/navbar/Navbar';
import TeacherProfileComponent from "../../../../../components/teacher/teacher-profile/teacherProfileComponent"

export default function TeacherProfile() {
  const { teacherId } = useParams();
  return (
    <div >
            <Navbar/>
        <TeacherProfileComponent teacherUid={teacherId}/>

    
    </div>

);
}
