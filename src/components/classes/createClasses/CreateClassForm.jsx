import { doc, getFirestore, setDoc } from 'firebase/firestore';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import ClassSelector from "../../common/classSelector";
import SectionSelector from '../../common/sectionSelector';
import 'react-toastify/dist/ReactToastify.css';

function CreateClassForm() {
  const [classSection, setClassSection] = useState('');
  const [className, setClassName] = useState('');

  const db = getFirestore();

  const handleClassSelect = (selectedClass) => {
    setClassName(selectedClass);
  };

  const handleSectionSelect = (selectedSection) => {
    setClassSection(selectedSection);
  };

  const handleCreate = async () => {
    try {
      const classId = `${className} ${classSection}`;
      const classData = {
        className: className,
        classSection: classSection,
        totalStudent: 0,
        totalPresentStudents: 0,
        classTeacherName: ""
      };
  
      await setDoc(doc(db, 'classes', classId), classData);
  
      console.log('Class successfully created');
      toast.success('Class successfully created!');
    } catch (error) {
      console.error('Error creating class:', error);
      toast.error('Error creating class. Please try again.');
    }
  };

  return (
    <div className="app1">
      <h2>Create Class with Section</h2>



      <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={1} columns={10}>
        <Grid item xs={5}>
        <label htmlFor="className">Select Class</label>
        <ClassSelector
          onSelect={handleClassSelect}
        />
        </Grid>
        <Grid item xs={5}>
        <label htmlFor="sectionSelection">Select Section</label>
        <SectionSelector onSelect={handleSectionSelect} />
        </Grid>
      </Grid>
      </Box>

       
      <div className="showclass">
        <h4 style={{ fontSize: '24px' }}>Selected Class {className} {classSection}</h4>
      </div>
      <br />
      <button className="button" onClick={handleCreate}>Create</button>
    </div>
  );
}

export default CreateClassForm;
