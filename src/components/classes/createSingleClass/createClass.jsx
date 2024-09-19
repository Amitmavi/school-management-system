import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { db } from "../../../utils/firebaseConfig";
import { toast } from 'react-toastify';
import {  doc, setDoc } from 'firebase/firestore';

export default function CreateSingleClass() {
  const [className, setClassName] = useState(""); // State to store the class name

  const handleSave = async () => {
    try {

      const classRef = doc(db, "class", className);
      await setDoc(classRef, { className: className });
      
      console.log("Class added successfully!");
      toast.success("Class added Successfully!");
    } catch (error) {
      console.error("Error adding class: ", error);
      toast.error("Failed to add class");
    }
  };

  return (
    <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <h2>Create a Class</h2>

      <TextField
        label="Enter the Class Name"
        id="filled-size-small"
        variant="filled"
        size="small"
        placeholder='EX: VII'
        value={className}
        onChange={(e) => setClassName(e.target.value)}  
      />
      <Button variant="contained" onClick={handleSave}>Save</Button>
    </Box>
  );
}
