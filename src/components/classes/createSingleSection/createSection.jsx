import * as React from 'react';
import { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { db } from "../../../utils/firebaseConfig";
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { toast } from 'react-toastify';

export default function CreateSingleSection() {
  const [section, setSection] = useState("");

  const handleSave = async () => {
    try {
      const sectionRef = doc(db, 'sections', section);
      await setDoc(sectionRef, {
        sectionName: section,
        sectionCreateDate: serverTimestamp() 
      });

      console.log("Section Created Successfully");
      toast.success(section + " Section created Successfully");
    } catch (error) {
      console.error("Error adding Section", error);
      toast.error("Error adding Section: " + error.message);
    }
  }

  return (
    <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <h2>Create a Section</h2>
      <TextField
        label="Enter the Section Name"
        id="filled-size-small"
        variant="filled"
        size="small"
        placeholder='EX: B'
        value={section}
        onChange={(e) => setSection(e.target.value)}
      />
      <Button variant="contained" onClick={handleSave}>Save</Button>
    </Box>
  );
}
