import BadgeIcon from '@mui/icons-material/Badge';

import SendIcon from '@mui/icons-material/Send';
import SignalCellularAltIcon from '@mui/icons-material/SignalCellularAlt';
import { Avatar,  TextField } from "@mui/material";
import IconButton from '@mui/material/IconButton';
import { DataGrid } from "@mui/x-data-grid";
import { collection, getDocs, getFirestore, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom"; // Import Link

const StudentListPage = () => {
  const [Student, setStudent] = useState([]);
  const [filter, setFilter] = useState({
    class: "",
    subject: "",
    name: "",
    number: ""
  });

  useEffect(() => {
    const fetchStudent = async () => {
      const db = getFirestore();
      let StudentRef = collection(db, "students");
  
      if (filter.class) {
        StudentRef = query(StudentRef, where("class", "==", filter.class));
      }
      if (filter.subject) {
        StudentRef = query(StudentRef, where("subject", "==", filter.subject));
      }
  
      const querySnapshot = await getDocs(StudentRef);
      const studentList = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
  
      // Filter the student list by name if name filter is provided
      const filteredStudents = filter.name
        ? studentList.filter(student =>
            `${student.firstName} ${student.lastName}`
              .toLowerCase()
              .includes(filter.name.toLowerCase())
          )
        : studentList;
  
      setStudent(filteredStudents);
    };
  
    fetchStudent();
  }, [filter]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilter({
      ...filter,
      [name]: value
    });
  };

  const handleSearchByClass = (e) => {
    const { name, value } = e.target;
    setFilter({
      ...filter,
      [name]: value
    });
    
  };
  const handleSearchByName = (e) => {
    const { name, value } = e.target;
    setFilter({
      ...filter,
      [name]: value
    });
  };

  console.log(handleSearchByClass,handleSearchByName);

  const columns = [
    { 
      field: "fullName", 
      headerName: "Full Name", 
      flex: 1,
      valueGetter: (params) => {
        return `${params.row.firstName} ${params.row.lastName}`;
      }
    },
    { 
      field: "admissionNumber", 
      headerName: "Admission no.", 
      flex: 1 
    },
    { 
      field: "class", 
      headerName: "class", 
      flex: 1 
    },
    { 
      field: "profilePicture", 
      headerName: "Profile Picture", 
      flex: 1,
      renderCell: (params) => (
        <Avatar alt={`${params.row.firstName} ${params.row.lastName}`} src={params.row.profilePicture} />
      )
    },
    {
      field: "action",
      headerName: "Action",
      flex: 1,
      renderCell: (params) => (
        <div>
          <Link to={{ pathname: `${params.row.id}` }} style={{ textDecoration: "none" }}>
            <IconButton aria-label="view">
              <BadgeIcon />
            </IconButton>
          </Link>
          <IconButton aria-label="Analytics"  >
            <SignalCellularAltIcon />
          </IconButton>
          <IconButton aria-label="Send Message">
            <SendIcon />
          </IconButton>
          {/* Add more buttons as needed */}
        </div>
      )
    }
  ];
  return (
    <div className="teacher-list-container">
      <div className="filter-section">
        <div className="filter-container">
          <div className="search-fields">
            <TextField
             InputProps={{ style: { height: '40px' } }}
              label="Search By Class"
              type="text"
              name="class"
              value={filter.class}
              onChange={handleFilterChange}
              className="filter-input"
            />
            <TextField
             InputProps={{ style: { height: '40px' } }}
              label="Search By Name"
              type="text"
              name="name"
              value={filter.name}
              onChange={handleFilterChange}
              className="filter-input"
            />
          </div>
         
          
        </div>
      </div>
      <div style={{ height: 600, width: '100%', }}>
        <DataGrid  rows={Student} columns={columns} pageSize={9} />
      </div>
    </div>
  );
};

export default StudentListPage; 