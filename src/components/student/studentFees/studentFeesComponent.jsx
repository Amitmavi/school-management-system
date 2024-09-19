import React, { useState } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../../../utils/firebaseConfig';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import ClassSelector from '../../common/classSelector';
import SectionSelector from '../../common/sectionSelector';
import StudentFeesPopper from './StudentFeesPopper'; // Import the popper component


function StudentFeesComponent() {
    
    const [students, setStudents] = useState([]);
    const [selectedClass, setSelectedClass] = useState('');
    const [selectedSection, setSelectedSection] = useState('');
    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedStudentId, setSelectedStudentId] = useState('');

    const fetchStudents = async (className, section) => {
        const studentsRef = collection(db, 'students');
        const q = query(studentsRef, where('class', '==', `${className} ${section}`));
        const querySnapshot = await getDocs(q);
        const studentsData = querySnapshot.docs.map(doc => {
            const { firstName, lastName, dob, academicYear, rollNo, email } = doc.data();
            return {
                id: doc.id,
                name: `${firstName} ${lastName}`,
                class: className,
                section: section,
                dob,
                academicYear,
                rollNo,
                email
            };
        });
        setStudents(studentsData);
    };

    const handleViewStudents = async () => {
        if (selectedClass) {
            await fetchStudents(selectedClass, selectedSection);
        }
    };

    const handleViewFees = (studentId, event) => {
        setAnchorEl(event.currentTarget); // Set the anchor element for the popover
        setSelectedStudentId(studentId);
    };

    const handleClose = () => {
        setAnchorEl(null); // Close the popover
    };

    return (
        <div>
            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <ClassSelector onSelect={setSelectedClass} />
                </Grid>
                <Grid item xs={6}>
                    <SectionSelector onSelect={setSelectedSection} />
                </Grid>
                <Grid item xs={12}>
                    <Button
                        variant="contained"
                        color="primary"
                        disabled={!selectedClass}
                        onClick={handleViewStudents}
                    >
                        View Students
                    </Button>
                </Grid>
                <Grid item xs={12}>
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Name</TableCell>
                                    <TableCell>Date of Birth</TableCell>
                                    <TableCell>Class</TableCell>
                                    <TableCell>Academic Year</TableCell>
                                    <TableCell>Roll No</TableCell>
                                    <TableCell>Email</TableCell>
                                    <TableCell>Action</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {students && students.map((student) => (
                                    <TableRow key={student.id}>
                                        <TableCell>{student.name}</TableCell>
                                        <TableCell>{student.dob}</TableCell>
                                        <TableCell>{student.class}</TableCell>
                                        <TableCell>{student.academicYear}</TableCell>
                                        <TableCell>{student.rollNo}</TableCell>
                                        <TableCell>{student.email}</TableCell>
                                        <TableCell>
                                            <Button 
                                                variant="outlined" 
                                                color="primary" 
                                                onClick={(event) => handleViewFees(student.id, event)}
                                            >
                                                View Fees
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
            </Grid>
            {/* Render the popper component */}
            <StudentFeesPopper 
                studentId={selectedStudentId} 
                anchorEl={anchorEl} 
                handleClose={handleClose} 
            />
        </div>
    );
}

export default StudentFeesComponent;
