import React, { useEffect, useState } from "react";
import { getFirestore, doc, getDoc, getDocs, updateDoc, collection, addDoc, deleteDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytesResumable, getDownloadURL, deleteObject } from "firebase/storage";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import QRCode from "react-qr-code";
import PositionBadge from "./PositionBadge";
import { FaSave, FaEdit } from 'react-icons/fa';
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import DeleteIcon from "@mui/icons-material/Delete";
import AssignClass from "../assign/assign-class";
import AssignSubject from '../assign/assign-subject';
import AttendanceCalendar from './teacherProfileComponent/teacherAttendance';

export default function TeacherProfileComponent({ teacherUid }) {
  const [userData, setUserData] = useState(null);
  const [value, setValue] = useState(0);
  const [editMode, setEditMode] = useState(false);
  const [documentType, setDocumentType] = useState('');
  const [file, setFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [documents, setDocuments] = useState([]);
  const [subjectTeacherSubjects, setSubjectTeacherSubjects] = useState([]);
  const [classTeacherSubjects, setClassTeacherSubjects] = useState([]);


  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const db = getFirestore();

        // Fetch subject teacher data
        const subjectTeacherRef = collection(db, "teachers", teacherUid, "subjectTeacher");
        const subjectQuerySnapshot = await getDocs(subjectTeacherRef);
        const subjectSubjects = subjectQuerySnapshot.docs.map(doc => doc.id);
        setSubjectTeacherSubjects(subjectSubjects);

        // Fetch class teacher data
        const classTeacherRef = collection(db, "teachers", teacherUid, "classTeacher");
        const classQuerySnapshot = await getDocs(classTeacherRef);
        const classSubjects = classQuerySnapshot.docs.map(doc => ({
          className: doc.id,
          subject: doc.data().subject
        }));
        setClassTeacherSubjects(classSubjects);
      } catch (error) {
        console.error("Error fetching subjects:", error);
      }
    };

    fetchSubjects();
  }, [teacherUid]);
  
  

  useEffect(() => {
    const fetchUserData = async () => {
      const db = getFirestore();
      const userRef = doc(db, "teachers", teacherUid);


      try {
        const docSnap = await getDoc(userRef);
        if (docSnap.exists()) {
          setUserData(docSnap.data());
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error fetching document:", error);
      }
    };

    fetchUserData();
  }, [teacherUid]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleSave = async () => {
    const db = getFirestore();
    const userRef = doc(db, "teachers", teacherUid);
    try {
      await updateDoc(userRef, userData);
      console.log("Document successfully updated!");
      setEditMode(false);
    } catch (error) {
      console.error("Error updating document: ", error);
    }
  };

  const toggleEditMode = () => {
    setEditMode(!editMode);
  };


  //logic for doc uploder
  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
  };

  // Function to extract file type from file name
  function getFileType(fileName) {
    // Extract the file extension
    const fileExtension = fileName.split('.').pop().toLowerCase();

    // Map file extensions to file types
    const fileTypeMap = {
      'pdf': 'PDF',
      'jpg': 'Image',
      'jpeg': 'Image',
      'png': 'Image',
      // Add more file types as needed
    };

    // Check if the file extension is mapped to a file type
    const fileType = fileTypeMap[fileExtension];

    // If a file type is found, return it; otherwise, return 'Unknown'
    return fileType ? fileType : 'Unknown';
  }

  // Function to handle file upload
  const handleUpload = async () => {
    if (!file) {
      console.error("No file selected.");
      return;
    }

    const storage = getStorage();
    const storageRef = ref(storage, `documents/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on('state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploadProgress(progress);
      },
      (error) => {
        console.error('Error uploading file:', error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          const db = getFirestore();
          const documentsRef = collection(db, `teachers/${teacherUid}/documents`);

          // Extract file type using getFileType function
          const fileType = getFileType(file.name);

          // Add document to Firestore with extracted file type
          addDoc(documentsRef, {
            documentType: documentType,
            fileName: file.name,
            fileType: fileType,
            fileURL: downloadURL,
            status: 'Uploaded',
            // Add more fields as needed
          }).then(() => {
            console.log(uploadProgress)
            console.log('Document saved to Firestore');
          }).catch((error) => {
            console.error('Error saving document to Firestore:', error);
          });
        });
      }
    );
  };

  // Function to delete a document
  const handleDelete = async (documentId, fileName) => {
    try {
      // Delete document from Firestore
      const db = getFirestore();
      const documentRef = doc(db, `teachers/${teacherUid}/documents`, documentId);
      await deleteDoc(documentRef);

      // Delete file from Firebase Storage
      const storage = getStorage();
      const storageRef = ref(storage, `documents/${fileName}`);
      await deleteObject(storageRef);

      // Update documents state after deletion
      setDocuments(documents.filter(doc => doc.id !== documentId));
    } catch (error) {
      console.error("Error deleting document:", error);
    }
  };

  useEffect(() => {
    const fetchUserData = async () => {
      const db = getFirestore();
      const userRef = doc(db, "teachers", teacherUid);

      try {
        const docSnap = await getDoc(userRef);
        if (docSnap.exists()) {
          setUserData(docSnap.data());
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error fetching document:", error);
      }

      // Fetch documents
      const documentsRef = collection(db, "teachers", teacherUid, "documents");
      const querySnapshot = await getDocs(documentsRef);
      const documentsData = [];
      querySnapshot.forEach((doc) => {
        documentsData.push({ id: doc.id, ...doc.data() });
      });
      setDocuments(documentsData);
    };

    fetchUserData();
  }, [teacherUid]);


  // Function to render document preview based on file type
  const renderPreview = (fileType, fileURL) => {
    // Render a clickable link for all file types
    return (
      <a href={fileURL} target="_blank" rel="noopener noreferrer">
        Preview
      </a>
    );
  };

  return (
    <Box>
      <Grid container spacing={2}>
  <Grid item xs={12} md={4}>
    <Box>
      {userData && (
        <div style={{
          backgroundColor: "#fff",
          borderRadius: "10px",
          boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
          padding: "5px",
          fontFamily: "Arial, sans-serif",
          width: "80%",
          maxWidth: "600px", // Adjust maximum width as needed
          margin: "15px auto", // Center the box horizontally
          border: "2px solid #000", // Thick border
          height: "510px"
        }}>
          <div style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "20px"
          }}>
            <div style={{ backgroundColor: "#fff", borderRadius: "10px", boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)", padding: "20px" }}>
              <Typography variant="h6" style={{ marginBottom: "10px", marginLeft: "20px" }}>Admission No.:</Typography>
              <img
                className="profile-image"
                src={userData.profilePicture}
                alt="Profile"
                style={{ width: "40%", marginLeft: "90px", height: "50", borderRadius: "70%" }}
              />
              <h2 style={{ marginLeft: "20%" }}>{userData.firstName} {userData.lastName}</h2><br></br>
              <div style={{ padding: "20px", borderTop: "1px solid #ccc" }}>
                <Typography variant="body1">
                  {userData.address} <br />
                  {userData.number}
                  <div>
                    {/* Inline CSS for the link */}
                    <a
                      href="https://pulsezest.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        color: '#007bff', // Blue color for link
                        textDecoration: 'underline', // Underline style for link
                        cursor: 'pointer' // Cursor style for link
                      }}
                    >
                      www.pulsezest.com
                    </a>
                  </div>
                  <QRCode value={teacherUid} size={100} style={{ width: "30%", height: "100", marginTop: "10px", marginLeft: "90px" }} />
                </Typography>
                {/* Add more details if needed */}
              </div>
            </div>
          </div>
        </div>
      )}
    </Box>
  </Grid>
  <Grid item xs={12} md={8}>
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
      <Tab label="Personal Details" />
      <Tab label="Education Detail" />
      <Tab label="Administrative Position" />
      <Tab label="Teaching Subjects" />
      <Tab label="Experience" />
      
      <Tab label="Student Remarks" />
      <Tab label="Documents" />
      <Tab label="Attendance" />
    </Tabs>
          
          
          <TabPanel value={value} index={0}>
            {/* Personal details content */}
            <Typography variant="h5">🌟 Personal Details 🌟</Typography>
            {editMode ? (
              <button
                onClick={handleSave}
                style={{
                  width: "100px",
                  padding: "10px",
                  backgroundColor: "blue",
                  color: "white",
                  borderRadius: "5px",
                  border: "none",
                  cursor: "pointer",
                  float: "right" // Move the button to the right side
                }}
              >
                Save
                <FaSave style={{ marginLeft: "5px" }} />
              </button>
            ) : (
              <button
                onClick={toggleEditMode}
                style={{
                  width: "100px",
                  padding: "10px",
                  backgroundColor: "blue",
                  color: "white",
                  borderRadius: "5px",
                  border: "none",
                  cursor: "pointer",
                  float: "right" // Move the button to the right side
                }}
              >
                Edit
                <FaEdit style={{ marginLeft: "5px" }} />
              </button>
            )}
            <br />
            <table>
              <tbody>
                <tr>
                  <td>👩‍🏫 Teacher Name:</td>
                  <td>
                    {editMode ? (
                      <input
                        type="text"
                        value={userData ? `${userData.firstName} ${userData.lastName}` : ""}
                        onChange={(e) => setUserData({ ...userData, firstName: e.target.value })}
                      />
                    ) : (
                      <div>{userData ? `${userData.firstName} ${userData.lastName}` : ""}</div>
                    )}
                  </td>
                </tr>
                {/* Uncomment for additional details */}
                <tr>
                  <td>🧑‍🤝‍🧑 Gender:</td>
                  <td>
                    {editMode ? (
                      <input
                        type="text"
                        value={userData ? userData.gender : ""}
                        onChange={(e) => setUserData({ ...userData, gender: e.target.value })}
                      />
                    ) : (
                      <div>{userData ? userData.gender : ""}</div>
                    )}
                  </td>
                </tr>
                <tr>
                  <td>🎂 Age:</td>
                  <td>
                    {editMode ? (
                      <input
                        type="text"
                        value={userData ? userData.age : ""}
                        onChange={(e) => setUserData({ ...userData, age: e.target.value })}
                      />
                    ) : (
                      <div>{userData ? userData.age : ""}</div>
                    )}
                  </td>
                </tr>
                <tr>
                  <td>📞 Contact No:</td>
                  <td>
                    {editMode ? (
                      <input
                        type="text"
                        value={userData ? userData.number : ""}
                        onChange={(e) => setUserData({ ...userData, number: e.target.value })}
                      />
                    ) : (
                      <div>{userData ? userData.number : ""}</div>
                    )}
                  </td>
                </tr>
                <tr>
                  <td>🌆 City:</td>
                  <td>
                    {editMode ? (
                      <input
                        type="text"
                        value={userData ? userData.city : ""}
                        onChange={(e) => setUserData({ ...userData, city: e.target.value })}
                      />
                    ) : (
                      <div>{userData ? userData.city : ""}</div>
                    )}
                  </td>
                </tr>
                <tr>
                  <td>🏠 Address:</td>
                  <td>
                    {editMode ? (
                      <input
                        type="text"
                        value={userData ? userData.address : ""}
                        onChange={(e) => setUserData({ ...userData, address: e.target.value })}
                      />
                    ) : (
                      <div>{userData ? userData.address : ""}</div>
                    )}
                  </td>
                </tr>
              </tbody>
            </table>
          </TabPanel>
          <TabPanel value={value} index={1}>
            {/* Education detail content */}
            <Typography variant="h5">Education Detail</Typography>
            <table>
              <tbody>
                <tr>
                  <td>📚 Education:</td>
                  <td>
                    {editMode ? (
                      <input
                        type="text"
                        value={userData ? userData.education : ""}
                        onChange={(e) => setUserData({ ...userData, education: e.target.value })}
                      />
                    ) : (
                      <div>{userData ? userData.education : ""}</div>
                    )}
                  </td>
                </tr>

              </tbody>
            </table>
          </TabPanel>
          <TabPanel value={value} index={2}>
            {/* Administrative position content */}
            <Typography variant="h5">Administrative Position</Typography>
            <tr>
              <td>🎖️ Position:</td>
              <td>{userData && <PositionBadge position={userData.position} />}</td>
            </tr>
          </TabPanel>
         
         
          <TabPanel value={value} index={3}>
  <Typography variant="h5">Teaching Subjects</Typography>
  <div style={{ display: "flex", flexDirection: "column" }}>
  <div style={{ marginBottom: "20px" }}>
            <h2>Subject Teacher</h2>
            <div className="button-fields">
              <AssignClass classTeacherName={userData ? `${userData.firstName} ${userData.lastName}` : ""} teacherUid={teacherUid} />
              <AssignSubject teacherUid={teacherUid} /> {/* Add the AssignSubject component here */}
            </div>
      <table>
        <thead>
          <tr>
            <th>Sr. No</th>
            <th>Subject</th>
          </tr>
        </thead>
        <tbody>
          {subjectTeacherSubjects.map((subject, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{subject}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

    <div>
      <h2>Class Teacher</h2>
      <table>
        <thead>
          <tr>
            <th>Class Name</th>
            <th>Subject</th>
          </tr>
        </thead>
        <tbody>
          {classTeacherSubjects.map((classSubject, index) => (
            <tr key={index}>
              <td>{classSubject.className}</td>
              <td>{classSubject.subject}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
</TabPanel>

          <TabPanel value={value} index={4}>
            {/* Experience content */}
            <Typography variant="h5">Experience</Typography>
            <tr>
              <td>👨‍🏫 Experience:</td>
              <td>
                {editMode ? (
                  <input
                    type="text"
                    value={userData ? userData.experience : ""}
                    onChange={(e) => setUserData({ ...userData, experience: e.target.value })}
                  />
                ) : (
                  <div>{userData ? userData.experience : ""}</div>
                )}
              </td>
            </tr>
          </TabPanel>
          <TabPanel value={value} index={5}>
            {/* Student remarks content */}
            <Typography variant="h5">Student Remarks</Typography>
          </TabPanel>

          <TabPanel value={value} index={6}>
            {/* Teacher document content */}
            <Typography variant="h5"><u>Documents</u></Typography>
            <div>
              {/* Form for uploading documents */}
              <input
                type="text"
                value={documentType} // Set the value of the input field to documentType
                onChange={(e) => setDocumentType(e.target.value)}
                placeholder="Document Type"
              />
              <input type="file" onChange={handleFileChange} />
              <Button onClick={handleUpload} variant="contained" style={{ marginRight: "10px" }}>
        <CloudUploadIcon style={{ marginRight: "5px" }} /> Upload
      </Button>


              {/* Table to display uploaded documents */}
              <table>
                <thead>
                  <tr>
                    <th>Sr. No</th>
                    <th>Document Type</th>
                    <th>File Name</th>
                    <th>File Type</th>

                    <th>Preview</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {documents.map((document, index) => (
                    <tr key={document.id}>
                      <td>{index + 1}</td>
                      <td>{document.documentType}</td>
                      <td>{document.fileName}</td>
                      <td>{document.fileType}</td>

                      <td>{renderPreview(document.fileType, document.fileURL)}</td>

                      <td>
                      <Button onClick={() => handleDelete(document.id, document.fileName)} variant="contained">
        <DeleteIcon style={{ marginRight: "5px" }} /> Delete
      </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </TabPanel>
          
          <TabPanel value={value} index={7}>
            {/* Experience content */}
            <Typography variant="h5">Attendance</Typography>
            <AttendanceCalendar teacherUid={teacherUid} />
            </TabPanel>
        </Grid>
      </Grid>
    </Box>
  );
}

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      className="teacher-profile-tabpanel"
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
