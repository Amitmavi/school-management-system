import React from 'react';
import ImageSlider from '../../../components/androidSetting/Slider/imageSlider';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { grey } from '@mui/material/colors';


export default function updateImageSlider() {

    const teacherImages = [
        'https://soliloquywp.com/wp-content/uploads/2017/10/fullwidth-image-slider-in-wordpress.jpg',
        'https://soliloquywp.com/wp-content/uploads/2013/05/action-backlit-beach-1046896-1200x450_c.jpg',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVyhA13QenECt_brqT3Wqzvg1L6W59beGDrTXMf6nOTmgGXMLoP70sHJorlbV-_tnqP4Y&usqp=CAU',
      ];

  return (
    <div>
        <Box sx={{height: '500px', overflow: 'auto'}}>
        <h1>Update Image Slider</h1>
        <Typography variant='h6' align='right' style={{ color: grey[500] }}> ℹ️ Use Image of Same Size</Typography>
        <ImageSlider images={teacherImages} userType="teacher" />
        <ImageSlider images={teacherImages} userType="parent" />
        <ImageSlider images={teacherImages} userType="student" />
        </Box>

    
    </div>
  );
}
