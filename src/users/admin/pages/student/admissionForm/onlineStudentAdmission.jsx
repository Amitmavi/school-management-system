import React from 'react'
import Navbar from '../../../components/bar/navbar/Navbar';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import StudentAdmissionLink from '../../../../../components/student/studentAdmissionForm/studentAdmissionLink';
export default function OnlineStudentAdmission() {
  return (
    <>
    <Navbar/>
     
    <Box sx={{ flexGrow: 1, pt: 3, pl: 3, pr: 3 }}>
      <Grid container spacing={2}>
        <Grid   xs={9}>
          {/* Empty Grid */}
        </Grid>
        <Grid   xs={3}>
        <StudentAdmissionLink/>
        </Grid>

       
        
      </Grid>


      
    </Box></>
    
  )
}
