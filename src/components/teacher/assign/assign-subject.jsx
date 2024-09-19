import React, { useState } from 'react';
import { getFirestore, doc,setDoc,getDoc } from 'firebase/firestore';
import { Button, Grid, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material';
import SubjectSelector from '../../common/subjectSelector';
import ClassSelector from '../../common/classSelector';
import SectoinSelector from '../../common/sectionSelector';


export default function AssignSubject({ teacherUid }) {
  const [selectedSubject, setSelectedSubject] = useState('');
  const [open, setOpen] = useState(false);
  
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedSection, setSelectedSection] = useState('');
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSelectSubject = (subject) => {
    setSelectedSubject(subject);
  };

  const handleSave = async () => {
    const db = getFirestore();
  
    try {
      // Fetch the subject name from Firestore based on the selected subject ID
      const subjectDocRef = doc(db, 'subjects', selectedSubject);
      const subjectDocSnapshot = await getDoc(subjectDocRef);
  
      if (subjectDocSnapshot.exists()) {
        const subjectData = subjectDocSnapshot.data();
        const subjectName = subjectData.subjectName;
  
        // Construct reference to the subjectTeacher document under the teacher's collection
        const subjectTeacherDocRef = doc(db, `teachers/${teacherUid}/subjectTeacher`, `${selectedClass} ${selectedSection} ${subjectName}`);
  
        // Set the class, section, and subject name directly under the document
        await setDoc(subjectTeacherDocRef, {
          selectedClass,
          selectedSection,
          subjectName,
        });
  
        console.log('Subject assigned successfully!');
        setOpen(false); // Close the dialog after saving
      } else {
        console.error('Selected subject does not exist.');
      }
    } catch (error) {
      console.error('Error assigning subject:', error);
    }
  };
  
  
  
  
  
  

  return (
    <React.Fragment>
      <Button variant="outlined" onClick={handleClickOpen}>
        Assign Subject
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Assign Subject
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <Grid container spacing={2}>
              <Grid item>
                <ClassSelector onSelect={setSelectedClass} />
              </Grid>
              <Grid item>
                <SectoinSelector onSelect={setSelectedSection} />
              </Grid>
              <Grid item>
                <SubjectSelector onSelect={setSelectedSubject} />
              </Grid>
            </Grid>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSave} autoFocus>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
