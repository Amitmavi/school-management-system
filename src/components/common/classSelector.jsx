import React, { useState, useEffect } from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { db } from "../../utils/firebaseConfig";
import { collection, getDocs } from 'firebase/firestore';

export default function ClassSelector({ onSelect }) {
  const [classes, setClasses] = useState([]);
  const [selectedClass, setSelectedClass] = useState('');

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'class'));
        const fetchedClasses = [];
        querySnapshot.forEach((doc) => {
          fetchedClasses.push({ id: doc.id, name: doc.data().className });
        });
        setClasses(fetchedClasses);
      } catch (error) {
        console.error('Error fetching classes:', error);
      }
    };
    fetchClasses();
  }, []);

  const handleChange = (event) => {
    const selectedClassId = event.target.value;
    setSelectedClass(selectedClassId);
    if (typeof onSelect === 'function') {
      onSelect(selectedClassId); // Pass the selected class ID to the parent component only if onSelect is a function
    }
  };

  return (
    <div>
      <FormControl sx={{ m: 1, minWidth: 400 }}>
        <InputLabel id="class-selector-label">Class</InputLabel>
        <Select
          labelId="class-selector-label"
          id="class-selector"
          value={selectedClass}
          onChange={handleChange}
          autoWidth
          label="Clas"
        >
          {classes.map((classItem) => (
            <MenuItem key={classItem.id} value={classItem.id}>
              {classItem.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}