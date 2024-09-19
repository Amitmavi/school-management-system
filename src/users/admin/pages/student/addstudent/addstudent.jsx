import React from 'react';
import StudentAdmissionForm from '../../../../../components/student/student-admission/studentAdmissionFrom'
import Navbar from '../../../components/bar/navbar/Navbar';


const AddStudent = () => {
    return (
        <div className="list">
            <div className="listContainer">
                <Navbar />
               
                {/* Include StudentAdmissionForm component */}
                <StudentAdmissionForm />
            </div>
        </div>
    );
}

export default AddStudent;
