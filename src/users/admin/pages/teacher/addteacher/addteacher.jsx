import React from 'react'
import Navbar from '../../../components/bar/navbar/Navbar'
import TeacherRegistration from '../../../../../components/teacher/teacher-registration/teacherRegistration'
export default function AddTeacher() {
  return (
    <div className="add-teacher">
   
      <Navbar/>

{/* AREA TO EDIT START */}

    <h1>Add Teacher</h1>

{/* AREA TO EDIT END */}
    <TeacherRegistration/>

    </div>

  )
}
