import React, { useEffect, useState } from 'react';
import { Typography, Grid } from '@mui/material';
import { PieChart } from 'react-minimal-pie-chart';
import { getFirestore, doc, getDoc, collection, getDocs, query } from "firebase/firestore";

const AttendanceCalendar = ({ studentUid }) => {
    const [selectedMonth, setSelectedMonth] = useState(null);
    const [selectedYear, setSelectedYear] = useState(null);
    const [attendanceData, setAttendanceData] = useState(null);
    const [studentData, setStudentData] = useState(null);
    const [documents, setDocuments] = useState(null); // Adding documents state
    
    const db = getFirestore();

    useEffect(() => {
        const fetchStudentData = async () => {
            const db = getFirestore();

            // Fetch student data
            const studentRef = doc(db, "students", studentUid);
            const studentDoc = await getDoc(studentRef);
            const student = { id: studentDoc.id, ...studentDoc.data() };
            setStudentData(student);
           

            // Fetch student documents
            const documentsQuery = query(collection(db, "students", studentUid, "documents"));
            const documentsSnapshot = await getDocs(documentsQuery);
            const documentsData = [];
            documentsSnapshot.forEach((doc) => {
                documentsData.push({ id: doc.id, ...doc.data() });
            });
            setDocuments(documentsData);
        };


        const fetchAttendanceData = async () => {
            const student = (await getDoc(doc(db, "students", studentUid))).data();

            try {
                const attendanceRef = collection(db, "classes", student.class, "attendance");
                const querySnapshot = await getDocs(attendanceRef);
                const attendance = [];

                querySnapshot.forEach((doc) => {
                    attendance.push({ date: doc.id, status: doc.data().attendance[studentUid] || "No data available" });
                });

                setAttendanceData(attendance);
            } catch (error) {
                console.error("Error fetching attendance data:", error);
            }
        };

        if (studentUid) {
            fetchStudentData();
            fetchAttendanceData();
        }
    }, [studentUid, db]);


    // Function to filter attendance data by selected month and year
    const filterDataByMonthAndYear = () => {
        if (!attendanceData || attendanceData.length === 0 || !selectedMonth || !selectedYear) {
            return attendanceData;
        }

        return attendanceData.filter((attendance) => {
            const date = new Date(attendance.date);
            const monthMatch = date.getMonth() === selectedMonth;
            const yearMatch = date.getFullYear() === selectedYear;
            return monthMatch && yearMatch;
        });
    };

    // Update selected month
    const handleMonthChange = (event) => {
        setSelectedMonth(parseInt(event.target.value));
    };

    // Update selected year
    const handleYearChange = (event) => {
        setSelectedYear(parseInt(event.target.value));
    };

    if (!attendanceData || attendanceData.length === 0) {
        return <Typography>No data available.</Typography>;
    }

    const months = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: 10 }, (_, index) => currentYear - index);

    // Count the number of present, absent, and leave days
    const filteredData = filterDataByMonthAndYear();
    const presentCount = filteredData.filter((attendance) => attendance.status === "present").length;
    const absentCount = filteredData.filter((attendance) => attendance.status === "absent").length;
    const leaveCount = filteredData.filter((attendance) => attendance.status === "leave").length;

    // Compute the total count of all statuses
    const totalCount = presentCount + absentCount + leaveCount;

    // Calculate the percentage of each status
    const presentPercentage = (presentCount / totalCount) * 100;
    const absentPercentage = (absentCount / totalCount) * 100;
    const leavePercentage = (leaveCount / totalCount) * 100;

    console.log(studentData, documents);

    return (
        <div className="attendance-calendar">
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <div className="month-year-selectors" style={{ display: "flex", justifyContent: "center", marginBottom: "20px" }}>
                        <div className="month-selector">
                            <Typography>Select Month:</Typography>
                            <select
                                onChange={handleMonthChange}
                                style={{ width: "150px", marginRight: "10px" }}
                            >
                                <option value={null}>All Months</option>
                                {months.map((month, index) => (
                                    <option key={index} value={index}>
                                        {month}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="year-selector">
                            <Typography>Select Year:</Typography>
                            <select
                                onChange={handleYearChange}
                                style={{ width: "150px", marginRight: "500px" }}
                            >
                                <option value={null}>All Years</option>
                                {years.map((year) => (
                                    <option key={year} value={year}>
                                        {year}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                </Grid>
                <Grid item xs={12} md={6}>
                    {/* Table */}
                    <table>
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* Map attendanceData and render status for each date */}
                            {filterDataByMonthAndYear().map((attendance) => {
                                // Check if attendance object and status property exist
                                if (attendance && attendance.status) {
                                    // Get the status for the studentUid
                                    const studentStatus = attendance.status;
                                    // Check if studentStatus exists before rendering
                                    return (
                                        <tr key={attendance.date}>
                                            <td>{attendance.date}</td>
                                            <td
                                                style={{
                                                    backgroundColor:
                                                        studentStatus === "absent"
                                                            ? "#f08080"
                                                            : studentStatus === "leave"
                                                                ? "#ffff00"
                                                                : "#c3e6cb",
                                                }}
                                                className={`attendance-status ${studentStatus === "absent"
                                                    ? "absent"
                                                    : studentStatus === "leave"
                                                        ? "leave"
                                                        : "present"
                                                    }`}
                                            >
                                                {studentStatus}
                                            </td>
                                        </tr>
                                    );
                                } else {
                                    return null; // Skip rendering if attendance or status is undefined
                                }
                            })}
                        </tbody>
                    </table>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            {/* Pie chart */}
                            <div style={{ display: "flex", justifyContent: "center" }}>
                                <div style={{ width: '300px', height: '300px' }}>
                                    <PieChart
                                        data={[
                                            { title: 'Present', value: presentPercentage, color: '#c3e6cb' },
                                            { title: 'Absent', value: absentPercentage, color: '#f08080' },
                                            { title: 'Leave', value: leavePercentage, color: '#ffff00' },
                                        ]}
                                        lineWidth={20}
                                        label={({ dataEntry }) => `${Math.round(dataEntry.percentage)}%`}
                                        labelPosition={70}
                                        labelStyle={{ fontSize: '8px', fontFamily: 'sans-serif' }}
                                    />
                                </div>
                            </div>
                        </Grid>
                        <Grid item xs={12}>
                            <div className="count-cards" style={{ display: "flex", justifyContent: "center" }}>
                                <div className="count-card" style={{ backgroundColor: "#c3e6cb", padding: "10px", borderRadius: "5px", margin: "0 10px" }}>
                                    <Typography style={{ fontWeight: "bold" }}>Present: {presentCount}</Typography>
                                </div>
                                <div className="count-card" style={{ backgroundColor: "#f08080", padding: "10px", borderRadius: "5px", margin: "0 10px" }}>
                                    <Typography style={{ fontWeight: "bold" }}>Absent: {absentCount}</Typography>
                                </div>
                                <div className="count-card" style={{ backgroundColor: "#ffff00", padding: "10px", borderRadius: "5px", margin: "0 10px" }}>
                                    <Typography style={{ fontWeight: "bold" }}>Leave: {leaveCount}</Typography>
                                </div>
                            </div>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </div>
    );
};

export default AttendanceCalendar;
