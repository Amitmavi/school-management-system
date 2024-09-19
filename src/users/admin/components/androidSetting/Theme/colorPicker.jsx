import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';    
import Divider from '@mui/material/Divider';
import { SketchPicker } from 'react-color';

const ColorPicker = () => {
  // Separate state variables for each user type
  const [studentColor, setStudentColor] = useState('#ffffff');
  const [teacherColor, setTeacherColor] = useState('#ffffff');
  const [parentColor, setParentColor] = useState('#ffffff');

  // Update color state based on user type
  const handleChange = (newColor, userType) => {
    switch (userType) {
      case 'student':
        setStudentColor(newColor.hex);
        break;
      case 'teacher':
        setTeacherColor(newColor.hex);
        break;
      case 'parent':
        setParentColor(newColor.hex);
        break;
      default:
        break;
    }
  };

  return (
    <Box sx={{ flexGrow: 1, height: '500px', overflow: 'auto' }}>
      {/* For Students */}
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Box sx={{ padding: 2, border: '1px solid #ccc', borderRadius: 4 }}>
            <h2>Student</h2>
            <p>Update a Theme Color for a Student</p>
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box sx={{ padding: 2, border: '1px solid #ccc', borderRadius: 4 }}>
            <SketchPicker
              color={studentColor}
              onChange={(color) => handleChange(color, 'student')}
            />
            <p>Selected Color: {studentColor}</p>
          </Box>
        </Grid>
      </Grid>
      <Divider />

      {/* For Teachers */}
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Box sx={{ padding: 2, border: '1px solid #ccc', borderRadius: 4 }}>
            <h2>Teacher</h2>
            <p>Update a Theme Color for a Teacher</p>
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box sx={{ padding: 2, border: '1px solid #ccc', borderRadius: 4 }}>
            <SketchPicker
              color={teacherColor}
              onChange={(color) => handleChange(color, 'teacher')}
            />
            <p>Selected Color: {teacherColor}</p>
          </Box>
        </Grid>
      </Grid>
      <Divider />

      {/* For Parents */}
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Box sx={{ padding: 2, border: '1px solid #ccc', borderRadius: 4 }}>
            <h2>Parents</h2>
            <p>Update a Theme Color for a Parent</p>
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box sx={{ padding: 2, border: '1px solid #ccc', borderRadius: 4 }}>
            <SketchPicker
              color={parentColor}
              onChange={(color) => handleChange(color, 'parent')}
            />
            <p>Selected Color: {parentColor}</p>
          </Box>
        </Grid>
      </Grid>
      <Divider />
    </Box>
  );
};

export default ColorPicker;
