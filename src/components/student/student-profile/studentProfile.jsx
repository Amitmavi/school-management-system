import React, { useEffect, useState } from "react";
import { getFirestore, doc, getDoc, collection, getDocs, query } from "firebase/firestore";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import QRCode from "react-qr-code";
import { Typography } from "@mui/material";

// Import individual components
import AttendanceCalendar from './studentComponent/studentAttendance';
import StudentProgress from "./studentComponent/studentProgress";
import Studentpersonal from "./studentComponent/studentPersonal";
import StudentParentsDetails from "./studentComponent/studentParentsDetails";
import StudentResult from './studentComponent/studentResult';
import StudentDocuments from './studentComponent/studentDocuments';

export default function StudentProfileComponent({ studentUid }) {
  const [studentData, setStudentData] = useState(null);
  const [value, setValue] = useState(0);
  const [documentType, setDocumentType] = useState(""); // State for selected document type
  const [documents, setDocuments] = useState([]); // State for storing documents
  const [selectedView, setSelectedView] = useState('table');
  const [subjectData, setSubjectData] = useState([]);
  const [classId, setClassId] = useState(null);
  const db = getFirestore();

  // Log the values of state variables
  console.log('documentType:', documentType);
  console.log('documents:', documents);
  console.log('selectedView:', selectedView);
  console.log('subjectData:', subjectData);
  console.log('classId:', classId);



  //fetch class ID
  useEffect(() => {
    const fetchClassId = async () => {
      try {
        const db = getFirestore();
        // Fetch the class ID based on studentUid
        const studentRef = doc(db, 'students', studentUid);
        const studentDoc = await getDoc(studentRef);
        if (studentDoc.exists()) {
          const studentData = studentDoc.data();
          const studentClass = studentData.class;
          setClassId(studentClass);
        } else {
          console.log('Student document does not exist');
        }
      } catch (error) {
        console.error('Error fetching class ID:', error);
      }
    };

    if (studentUid) {
      fetchClassId();
    }
  }, [studentUid]);




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

    if (studentUid) {
      fetchStudentData();
    }
  }, [studentUid, db]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

 return (
    <Box>
      <Grid container spacing={2}>

        {/* Student Id CArd */}

        <Grid item xs={6} md={3}>
          <br />
          {studentData && (
            <div>
              <img
                className="profile-image"
                src={studentData.profilePicture}
                alt="Profile"
                style={{ width: "300px", height: "300px" }}
              />
              <QRCode value={studentUid} size={100} style={{ width: "100px", height: "100px" }} />
            </div>
          )}
        </Grid>
        <Grid item xs={6} md={9}>
          {/* intialize Tabs */}
          <Tabs
            value={value}
            onChange={handleChange}
            scrollButtons
            aria-label="basic tabs example"
            sx={{
              [`& .MuiTabs-scroller`]: {
                overflow: "hidden",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                "& .MuiTabs-scrollButtons": {
                  opacity: 0.5,
                  "&:hover": {
                    opacity: 1,
                  },
                },
              },
            }}
          >
            <Tab label="Student Details" />
            <Tab label="Parents Details" />
            <Tab label="Student Progress" />
            <Tab label="Attendance" />
            <Tab label="Results" />
            <Tab label="Documents" />
          </Tabs>

          {/* Render appropriate component based on selected tab */}
          <TabPanel value={value} index={0}>
            <Studentpersonal studentUid={studentUid} />
          </TabPanel>

          <TabPanel value={value} index={1}>
            <StudentParentsDetails studentUid={studentUid} />
          </TabPanel>

          <TabPanel value={value} index={2}>
            <StudentProgress studentUid={studentUid} />
          </TabPanel>

          <TabPanel value={value} index={3}>
            <AttendanceCalendar studentUid={studentUid} />
          </TabPanel>

          <TabPanel value={value} index={4}>
            <StudentResult studentUid={studentUid} />
          </TabPanel>

          <TabPanel value={value} index={5}>
            <StudentDocuments studentUid={studentUid} />
          </TabPanel>

        </Grid>
      </Grid>
    </Box>
  );
}

// Functional component for rendering tab content
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      className="student-profile-tabpanel"
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}