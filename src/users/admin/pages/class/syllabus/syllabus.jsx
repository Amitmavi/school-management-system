// SyllabusPage.jsx (Page)
import React from 'react';
import UploadedSyllabusList from '../../../../../components/syllabus/uploadedSyllabusList'; 
import SyllabusUploader from '../../../../../components/syllabus/syllabusUploader';
import Navbar from '../../../components/bar/navbar/Navbar';

const SyllabusPage = () => {
    return (
        <div>
           
            <Navbar />
            <SyllabusUploader/>
            <UploadedSyllabusList /> 
            {/* Rendering the Syllabus component */}
        </div>
    );
}

export default SyllabusPage;
