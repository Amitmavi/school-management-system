import React, { useState, useEffect } from 'react';
import { getFirestore, collection, getDocs, doc,query, where } from 'firebase/firestore';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Select, MenuItem, Button } from '@mui/material';
import "./timetable.css";

function NameSelection() {
  const [teachers, setTeachers] = useState([]); // State to store the fetched teachers
  const [selectedTeacher, setSelectedTeacher] = useState('');
  const [formExpanded, setFormExpanded] = useState(false); // State to manage form expansion
  const [timetableData, setTimetableData] = useState({}); // State to store the fetched timetable data

  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const timeSlots = ['8:00 AM', '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '12:30 PM', '1:30 PM', '2:30 PM'];

  // Function to fetch timetable data for the selected teacher
 // Function to fetch timetable data for the selected teacher
const fetchTimeTableData = async (teacherId) => {
    const db = getFirestore();
    const teacherRef = doc(db, 'teachers', teacherId); // Adjusted to get the reference to the teacher document
    const timetableRef = collection(teacherRef, 'timeTable');
  
    try {
      const timetableSnapshot = await getDocs(timetableRef);
      const timetableData = {};
      timetableSnapshot.forEach(doc => {
        const day = doc.id;
        const subjects = Object.values(doc.data());
        timetableData[day] = subjects;
      });
      setTimetableData(timetableData);
      setFormExpanded(true);
    } catch (error) {
      console.error('Error fetching timetable data:', error);
    }
  };
  

  // Handler for the "View" button click
  const handleViewButtonClick = () => {
    if (!selectedTeacher) return;
    // Reset timetable data before fetching
    setTimetableData({});
    fetchTimeTableData(selectedTeacher);
  };

  // Fetch teachers from Firestore when the component mounts
  useEffect(() => {
    const fetchTeachers = async () => {
      const db = getFirestore();
      try {
        // Fetch teachers
        const q = query(collection(db, 'teachers'), where('teacherType', '==', 'librarian')); // Update the where clause as needed
        const querySnapshot = await getDocs(q);
        const teachersList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setTeachers(teachersList);
      } catch (error) {
        console.error('Error fetching teachers:', error);
      }
    };

    fetchTeachers();
  }, []);

  return (
    <div>
      <h1>View Time Table</h1>
      <div className="additional-options">
        <div className="choose-item">
          <label htmlFor="choose-teacher">Choose Teacher:</label>
          <Select
            id="choose-teacher"
            value={selectedTeacher}
            onChange={(e) => setSelectedTeacher(e.target.value)}
          >
            <MenuItem value="">Select</MenuItem>
            {/* Rendering teachers */}
            {teachers.map((teacher) => (
              <MenuItem key={teacher.id} value={teacher.id}>
                {`${teacher.firstName} ${teacher.lastName}`}
              </MenuItem>
            ))}
          </Select>
        </div>
        <Button variant="contained" onClick={handleViewButtonClick}>View</Button>
      </div>
      {formExpanded && (
        <>
          <h2>All Days Time Table</h2>
          <div className="table-container">
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Day/Time</TableCell>
                    {timeSlots.map((time) => (
                      <TableCell key={time}>{time}</TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {daysOfWeek.map((day) => (
                    <TableRow key={day}>
                      <TableCell>{day}</TableCell>
                      {timetableData[day] ? (
                        timetableData[day][0].map((subject, index) => (
                          <TableCell key={index}>{subject}</TableCell>
                        ))
                      ) : (
                        <TableCell>-</TableCell>
                      )}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </>
      )}
    </div>
  );
}

export default NameSelection;
