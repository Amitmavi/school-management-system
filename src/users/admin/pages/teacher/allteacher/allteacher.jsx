import React from 'react'
import Navbar from "../../../components/bar/navbar/Navbar"
import TeacherListPage from '../../../../../components/teacher/teachers-list/teacherList'

export default function AllTeacher() {
  return (
    <div className="list">
 
    <div className="listContainer">
      <Navbar/>

{/* AREA TO EDIT START */}

      <h1>All Teacher</h1>

{/* AREA TO EDIT END */}
        <TeacherListPage/>


    </div>
  </div>
  )
}
