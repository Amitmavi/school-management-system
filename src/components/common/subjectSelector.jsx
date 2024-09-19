import React, { useState, useEffect } from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { db } from "../../utils/firebaseConfig";
import { collection, getDocs } from 'firebase/firestore';

export default function SubjectSelector({ onSelect }) {
  const [subjects, setSubjects] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState('');

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'subjects'));
        const fetchedSubjects = [];
        querySnapshot.forEach((doc) => {
          // Assuming each document has a field named 'subjectName'
          const subjectData = doc.data();
          fetchedSubjects.push({
            id: doc.id,
            name: subjectData.subjectName // Use 'subjectName' field from Firestore document
          });
        });
        setSubjects(fetchedSubjects);
      } catch (error) {
        console.error('Error fetching subjects:', error);
      }
    };
    fetchSubjects();
  }, []);

  const handleChange = (event) => {
    const selectedSubjectId = event.target.value;
    setSelectedSubject(selectedSubjectId);
    if (typeof onSelect === 'function') {
      onSelect(selectedSubjectId); // Pass the selected subject ID to the parent component only if onSelect is a function
    }
  };

  return (
    <div>
      <FormControl sx={{ m: 1, minWidth: 100 }}>
        <InputLabel id="subject-selector-label">Subject</InputLabel>
        <Select
          labelId="subject-selector-label"
          id="subject-selector"
          value={selectedSubject}
          onChange={handleChange}
          autoWidth
          label="Subject"
        >
          {subjects.map((subject) => (
            <MenuItem key={subject.id} value={subject.id}>
              {subject.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
