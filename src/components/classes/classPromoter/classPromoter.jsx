import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import { getFirestore, collection, query, where, getDocs, updateDoc, doc } from 'firebase/firestore';

const PromoteStudents = () => {
    const [classes, setClasses] = useState([]);
    const [selectedClass, setSelectedClass] = useState('');
    const [selectedPromotionClass, setSelectedPromotionClass] = useState('');
    const [students, setStudents] = useState([]);
    const [selectedStudents, setSelectedStudents] = useState([]);
    const db = getFirestore();

    useEffect(() => {
      const fetchClasses = async () => {
        const classesRef = collection(db, 'classes');
        const snapshot = await getDocs(classesRef);
        const classNames = snapshot.docs.map(doc => doc.id);
        setClasses(classNames);
      };
      fetchClasses();
    }, [db]);
  
    const fetchStudents = async (className) => {
      const studentsRef = collection(db, 'students');
      const q = query(studentsRef, where('class', '==', className));
      const querySnapshot = await getDocs(q);
      const studentsData = querySnapshot.docs.map(doc => {
        const { firstName, lastName } = doc.data();
        return { id: doc.id, name: `${firstName} ${lastName}` };
      });
      setStudents(studentsData);
    };
  
    const handleViewStudents = async () => {
      if (selectedClass) {
        await fetchStudents(selectedClass);
      }
    };

    const handlePromoteStudents = async () => {
      if (!selectedPromotionClass) {
        toast.warning('Please select a class for promotion.');
        return;
      }

      if (selectedStudents.length === 0) {
        toast.warning('Please select at least one student for promotion.');
        return;
      }

      const confirmPromotion = window.confirm('Are you sure you want to promote the selected students?');
      if (!confirmPromotion) return;

      await Promise.all(selectedStudents.map(async (studentId) => {
        const studentRef = doc(db, 'students', studentId);
        await updateDoc(studentRef, { class: selectedPromotionClass });
      }));

      setSelectedStudents([]);
      await fetchStudents(selectedClass);
      toast.success('Students promoted successfully.');
    };
  
    return (
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <FormControl fullWidth>
            <InputLabel>Select Class</InputLabel>
            <Select
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
            >
              {classes.map((className) => (
                <MenuItem key={className} value={className}>{className}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={6}>
          <FormControl fullWidth>
            <InputLabel>Select Promotion Class</InputLabel>
            <Select
              value={selectedPromotionClass}
              onChange={(e) => setSelectedPromotionClass(e.target.value)}
            >
              {classes.map((className) => (
                <MenuItem key={className} value={className}>{className}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <Button
            variant="contained"
            color="primary"
            disabled={!selectedClass}
            onClick={handleViewStudents}
          >
            View Students
          </Button>
        </Grid>
        <Grid item xs={12}>
          <List>
            {students.map((student) => (
              <ListItem key={student.id}>
                <Checkbox
                  checked={selectedStudents.includes(student.id)}
                  onChange={(e) => {
                    const { checked } = e.target;
                    setSelectedStudents(prevSelectedStudents => {
                      if (checked) {
                        return [...prevSelectedStudents, student.id];
                      } else {
                        return prevSelectedStudents.filter(id => id !== student.id);
                      }
                    });
                  }}
                />
                <ListItemText primary={student.name} />
              </ListItem>
            ))}
          </List>
        </Grid>
        <Grid item xs={12}>
          <Button
            variant="contained"
            color="primary"
            disabled={selectedStudents.length === 0}
            onClick={handlePromoteStudents}
          >
            Promote Selected Students
          </Button>
        </Grid>
        <ToastContainer />
      </Grid>
    );
  };
  
  export default PromoteStudents;
