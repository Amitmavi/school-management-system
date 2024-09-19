import React, { useState } from 'react';
import { Box, Grid, Typography, Divider, Tooltip } from '@mui/material';
 
import ParentsSwitch from '../../../components/androidSetting/parentsSetting/parentsSetting';

export default function UpdateParentsPage() {
    const [payOnlineFees, setPayOnlineFees] = useState(true);
    const [dailyHomework, setDailyHomework] = useState(true);
    const [studentProgress, setStudentProgress] = useState(true);
    const [attendance, setAttendance] = useState(true);
    const [teacherChat, setTeacherChat] = useState(true);

    const handlePayOnlineFeesChange = () => {
        setPayOnlineFees((prev) => !prev);
    };

    const handleDailyHomeworkChange = () => {
        setDailyHomework((prev) => !prev);
    };

    const handleStudentProgressChange = () => {
        setStudentProgress((prev) => !prev);
    };

    const handleAttendanceChange = () => {
        setAttendance((prev) => !prev);
    };

    const handleTeacherChatChange = () => {
        setTeacherChat((prev) => !prev);
    };

    return (
        <Box sx={{ height: '500px', width: '550px', overflow: 'auto' }}>
            <h1>Update Parents Features</h1>
            <Divider />
            <br />
            <Grid container spacing={3}>
                <Grid item xs={9}>
                    <Typography variant='h5'>Pay Online Fees Option 💵</Typography>
                </Grid>
                <Grid item xs={1}>
                    <Tooltip title="You can Enable and Disable the Payment Option from the Parents Application">
                    <Typography variant='h6'>ℹ️</Typography>
                    </Tooltip>
                </Grid>
                <Grid item xs={2}>
                    <ParentsSwitch checked={payOnlineFees} handleChange={handlePayOnlineFeesChange} />
                </Grid>

                <Grid item xs={9}>
                    <Typography variant='h5'>Student's Daily Homework 📒</Typography>
                </Grid>
                <Grid item xs={1}>
                    <Tooltip title="You can Enable and Disable the Payment Option from the Parents Application">
                    <Typography variant='h6'>ℹ️</Typography>
                    </Tooltip>
                </Grid>
                <Grid item xs={2}>
                    <ParentsSwitch checked={dailyHomework} handleChange={handleDailyHomeworkChange} />
                </Grid>



                <Grid item xs={9}>
                    <Typography variant='h5'>Student's Progress 📊</Typography>
                </Grid>
                <Grid item xs={1}>
                    <Tooltip title="You can Enable and Disable the Payment Option from the Parents Application">
                    <Typography variant='h6'>ℹ️</Typography>
                    </Tooltip>
                </Grid>
                <Grid item xs={2}>
                    <ParentsSwitch checked={studentProgress} handleChange={handleStudentProgressChange} />
                </Grid>



                <Grid item xs={9}>
                    <Typography variant='h5'>Parents can see the Attendance 📅</Typography>
                </Grid>
                <Grid item xs={1}>
                    <Tooltip title="You can Enable and Disable the Payment Option from the Parents Application">
                    <Typography variant='h6'>ℹ️</Typography>
                    </Tooltip>
                </Grid>
                <Grid item xs={2}>
                    <ParentsSwitch checked={attendance} handleChange={handleAttendanceChange} />
                </Grid>



                <Grid item xs={9}>
                    <Typography variant='h5'>Parents can chat 💬 with Teacher</Typography>
                </Grid>
                <Grid item xs={1}>
                    <Tooltip title="You can Enable and Disable the Payment Option from the Parents Application">
                    <Typography variant='h6'>ℹ️</Typography>
                    </Tooltip>
                </Grid>
                <Grid item xs={2}>
                    <ParentsSwitch checked={teacherChat} handleChange={handleTeacherChatChange} />
                </Grid>
            </Grid>
        </Box>
    );
}
