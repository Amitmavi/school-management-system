import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import { useLocation } from 'react-router-dom';

const OnlineStudentAdmissionForm = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const admissionNumber = searchParams.get('admissionNumber');
  const [formData, setFormData] = useState({
    // Student Details
    studentNumber: '',
    class: '',
    academicYear: '',
    admissionDate: '',
    // Personal Details
    firstName: '',
    lastName: '',
    previousSchoolName:'',
    dob: '',
    gender: '',
    bloodGroup: '',
    religion: '',
    height: '',
    weight: '',
    medicalHistory: '',
    // Parent's Details
    fatherName: '',
    fatherPhone: '',
    fatherOccupation: '',
    fatherEmail: '',
    motherName: '',
    motherPhone: '',
    motherOccupation: '',
    motherEmail: '',
    guardianName: '',
    guardianPhone: '',
    guardianOccupation: '',
    guardianEmail: '',
  });

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission here
    console.log(formData);
  };

  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom>
        PulseZest School
      </Typography>
      <Typography variant="h5" gutterBottom>
        Student Admission Form
      </Typography>
      <br />
      <Typography align='right'> AdmissionNumber: {admissionNumber}</Typography>
      <br />
      <form onSubmit={handleSubmit}>
        {/* Student Details */}
        <Typography variant="h6" gutterBottom>
          Student Details
        </Typography>
         
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Student First Name"
              name="FirstName"
              required
              value={formData.firstName}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Student Last Name"
              name="LastName"
              required
              value={formData.lastName}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
          <TextField
               id="class"
              name="class"
              select
              label="Class"
              required
              value={formData.class}
              onChange={handleChange}
              fullWidth
              >
                <MenuItem value="">Select Class</MenuItem>
                <MenuItem value="I">I</MenuItem>
                <MenuItem value="II">II</MenuItem>
                <MenuItem value="III">III</MenuItem>
                <MenuItem value="IV">IV</MenuItem>
                <MenuItem value="V">V</MenuItem>
                <MenuItem value="VI">VI</MenuItem>
                <MenuItem value="VII">VII</MenuItem>
                <MenuItem value="VIII">VIII</MenuItem>
                <MenuItem value="IX">IX</MenuItem>
                <MenuItem value="X">X</MenuItem>
                <MenuItem value="XI">XI</MenuItem>
                <MenuItem value="XII">XII</MenuItem>
              </TextField>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Prvious School Name"
              name="previousSchoolName"
              value={formData.previousSchoolName}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
          <TextField
                  id="gender"
                  name="gender"
                  select
                  label="Student Gender"
                  value={formData.gender}
                  onChange={handleChange}
                  required
                  style={{ width: "100%" }}
                >
                  <MenuItem value="">Select Gender</MenuItem>
                  <MenuItem value="male">Male</MenuItem>
                  <MenuItem value="female">Female</MenuItem>
                  <MenuItem value="other">Other</MenuItem>
                </TextField>
          </Grid>
          {/* Add more student details fields as needed */}
        </Grid>


        <br />
        {/* Personal Details */}
        <Typography variant="h6" gutterBottom>
          Parent's Details
        </Typography>
        <Grid container spacing={2}>
          {/* Father's Details */}
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Father's Name"
              name="fatherName"
              value={formData.fatherName}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Father's Phone"
              name="fatherPhone"
              value={formData.fatherPhone}
              onChange={handleChange}
            />
          </Grid>
          {/* Add more fields for Father's Details */}
          {/* Mother's Details */}
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Mother's Name"
              name="motherName"
              value={formData.motherName}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Mother's Phone"
              name="motherPhone"
              value={formData.motherPhone}
              onChange={handleChange}
            />
          </Grid>
          {/* Add more fields for Mother's Details */}
          {/* Guardian's Details */}
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Guardian's Name"
              name="guardianName"
              value={formData.guardianName}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Guardian's Phone"
              name="guardianPhone"
              value={formData.guardianPhone}
              onChange={handleChange}
            />
          </Grid>
          {/* Add more fields for Guardian's Details */}
        </Grid>
        {/* Submit Button */}
        <Grid item xs={12}>
          <Button type="submit" variant="contained" color="primary">Submit</Button>
        </Grid>
      </form>
    </Box>
  );
};

export default OnlineStudentAdmissionForm;
