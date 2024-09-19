import React from 'react'
import CreateClassForm from '../../../../../components/classes/createClasses/CreateClassForm'
import Navbar from '../../../components/bar/navbar/Navbar'
import CreateSingleClass from '../../../../../components/classes/createSingleClass/createClass'
import CreateSingleSection from '../../../../../components/classes/createSingleSection/createSection'
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import ShowAllClass from '../../../../../components/classes/show-class/showallclass'


 export default function createclass() {
   return (
     <div>
      <Navbar/>
      <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2} columns={16}>
        <Grid item xs={8}>
        <CreateSingleClass/>
        </Grid>
        <Grid item xs={8}>
        <CreateSingleSection/>
        </Grid>
      </Grid>
      </Box>

       <Box padding={{paddingTop: 10,}}></Box>
       <Divider />

       <Box sx={{ flexGrow: 1,}}>
       <Grid container spacing={2} columns={16}>
        <Grid item xs={5}>
        <CreateClassForm/>
        </Grid>
        <Grid item xs={11} paddingLeft={10}>
        <h2>Area to show the Table of Class</h2>
        <ShowAllClass></ShowAllClass>
        </Grid>
      </Grid>
       </Box>
      </div>
   )
 }
 