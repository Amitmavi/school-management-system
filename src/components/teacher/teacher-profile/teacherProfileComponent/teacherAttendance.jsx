import React, { useState, useEffect } from 'react';
import { Typography, Select, MenuItem, Table, TableHead, TableBody, TableRow, TableCell, Grid } from '@mui/material';
import { getFirestore, collection, getDocs } from 'firebase/firestore';

const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
];

const AttendanceCalendar = ({ teacherUid }) => {
    const [attendanceData, setAttendanceData] = useState([]);
    const [selectedMonth, setSelectedMonth] = useState(null);
    const [selectedYear, setSelectedYear] = useState(null);
    const db = getFirestore();

    useEffect(() => {
        const fetchAttendanceData = async () => {
            if (!teacherUid || selectedMonth === null || selectedYear === null) return;

            try {
                const attendanceRef = collection(db, 'teachers', teacherUid, 'attendance');
                const querySnapshot = await getDocs(attendanceRef);

                const attendance = [];

                querySnapshot.forEach((doc) => {
                    const date = new Date(doc.id);
                    if (date.getMonth() === selectedMonth && date.getFullYear() === selectedYear) {
                        attendance.push({ date: doc.id, attendance: doc.data().attendance });
                    }
                });

                setAttendanceData(attendance);
            } catch (error) {
                console.error('Error fetching attendance data:', error);
            }
        };

        fetchAttendanceData();
    }, [teacherUid, selectedMonth, selectedYear, db]);

    const handleMonthChange = (event) => {
        setSelectedMonth(event.target.value);
    };

    const handleYearChange = (event) => {
        setSelectedYear(event.target.value);
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'Present':
                return 'green';
            case 'Absent':
                return 'red';
            case 'Leave':
                return 'yellow';
            default:
                return 'inherit';
        }
    };

    // Calculate the total counts based on the filtered attendance data
    const presentCount = attendanceData.reduce((total, data) => {
        const present = Object.values(data.attendance).filter(value => value === 'Present').length;
        return total + present;
    }, 0);
    const absentCount = attendanceData.reduce((total, data) => {
        const absent = Object.values(data.attendance).filter(value => value === 'Absent').length;
        return total + absent;
    }, 0);
    const leaveCount = attendanceData.reduce((total, data) => {
        const leave = Object.values(data.attendance).filter(value => value === 'Leave').length;
        return total + leave;
    }, 0);

    return (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px', marginLeft: '-10px' }}>
                <div style={{ marginRight: '10px' }}>
                    <Typography>Select Month:</Typography>
                    <Select value={selectedMonth} onChange={handleMonthChange}>
                        <MenuItem value={null}>All Months</MenuItem>
                        {monthNames.map((month, index) => (
                            <MenuItem key={index} value={index}>{month}</MenuItem>
                        ))}
                    </Select>
                </div>
                <div>
                    <Typography>Select Year:</Typography>
                    <Select value={selectedYear} onChange={handleYearChange}>
                        <MenuItem value={null}>All Years</MenuItem>
                        {Array.from({ length: 10 }, (_, index) => (
                            <MenuItem key={index} value={new Date().getFullYear() - index}>{new Date().getFullYear() - index}</MenuItem>
                        ))}
                    </Select>
                </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginLeft: '-10px' }}>
                {selectedMonth !== null && selectedYear !== null && (
                    <div style={{ flex: 1, maxWidth: '50%' }}>
                        <Typography>Attendance Data:</Typography>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Date</TableCell>
                                    <TableCell>Attendance</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {attendanceData.map((data) => (
                                    <TableRow key={data.date}>
                                        <TableCell>{data.date}</TableCell>
                                        <TableCell>
                                            <ul>
                                                {Object.entries(data.attendance).map(([uid, status]) => (
                                                    <li key={uid} style={{ color: getStatusColor(status) }}>{status}</li>
                                                ))}
                                            </ul>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                )}
               
            </div>
        </div>
    );
};

export default AttendanceCalendar;
