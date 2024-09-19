import * as React from 'react';
import { useEffect } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import ClassSelector from '../../common/classSelector';
import { useState } from 'react';
import Grid from '@mui/material/Grid';
import SectionSelector from '../../common/sectionSelector'; // Corrected SectoinSelector to SectionSelector
import SubjectSelector from '../../common/subjectSelector';
import InfoPoper from '../../common/infoPoper';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { getFirestore, doc, setDoc, getDoc, collection } from "firebase/firestore";

export default function AssignClass(props) {
  const [classes, setClasses] = useState([]);
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedSection, setSelectedSection] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');
  const [open, setOpen] = React.useState(false);
  const [subjectName, setSubjectName] = useState('');

  const db = getFirestore(); // Initialize Firestore
  const { teacherUid } = props;

  useEffect(() => {
    // Function to fetch subject name based on ID
    const fetchSubjectName = async () => {
      if (selectedSubject) {
        const subjectDocRef = doc(db, 'subjects', selectedSubject); // Assuming 'subjects' is your subjects collection
        const subjectDocSnap = await getDoc(subjectDocRef);
        if (subjectDocSnap.exists()) {
          setSubjectName(subjectDocSnap.data().subjectName);
        }
      }
    };

    fetchSubjectName();
  }, [selectedSubject]);

  const handleSelectSubject = (subject) => {
    setSelectedSubject(subject);
  };

  const handleSelectClass = (classId) => {
    setClasses(classId);
  };

  const handleSelectedSection = (section) => {
    setSelectedClass(section);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = async () => {
    if (!teacherUid) {
      console.error("Teacher UID is undefined.");
      return;
    }
    try {
      const teacherDocRef = doc(db, 'teachers', teacherUid);
      const teacherSnap = await getDoc(teacherDocRef);
      if (teacherSnap.exists()) {
        const classTeacherCollectionRef = doc(db, `teachers/${teacherUid}/classTeacher/${selectedClass} ${selectedSection}`);
        const subjectDocRef = doc(db, 'subjects', selectedSubject);
        const subjectDocSnap = await getDoc(subjectDocRef);
        if (subjectDocSnap.exists()) {
          const subjectName = subjectDocSnap.data().subjectName;
          await setDoc(classTeacherCollectionRef, {
            subject: subjectName
          });
          console.log('Document successfully written!');
        } else {
          console.error('Subject document does not exist.');
        }
      } else {
        console.error('Teacher document does not exist.');
      }
    } catch (error) {
      console.error('Error writing document: ', error);
    }
    handleClose(); // Close the dialog after saving
  };
  return (
    <React.Fragment>
      <Button variant="outlined" onClick={handleClickOpen}>
        <PersonAddIcon />
        Assign Class
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {props.classTeacherName}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <InfoPoper title="Check Assign Class" discription="For checking the Class Teacher you can go to the teacher profile." />
            <Grid container spacing={2}>
              <Grid item>
                <ClassSelector onSelect={setSelectedClass} />
              </Grid>
              <Grid item>
                <SectionSelector onSelect={setSelectedSection} />
              </Grid>
              <Grid item>
                <SubjectSelector onSelect={handleSelectSubject} />
              </Grid>
            </Grid>
            <p>Selected Subject: {subjectName}</p>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
          <Button onClick={handleSave} autoFocus>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
