import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Android from './android/android';
import AndroidTabView from './androidTabView/androidTabView';

export default function AndroidSetting() {
  return (
    <Box sx={{ flexGrow: 1 }}>
        <h1 style={{textAlign: 'center'}}>Customize your School Application</h1>
        <br />
    <Grid container spacing={2}>
      <Grid item xs={8}>

        <AndroidTabView/>     
       
      </Grid>
      <Grid item xs={4}> 
        <Android/>
      </Grid>
    
    </Grid>
  </Box>
  )
}


 
