import React from 'react'
import { Typography,  } from "@mui/material";
import { FaSave, FaEdit } from 'react-icons/fa';
import { useState, useEffect } from 'react'
import { getFirestore, doc, getDoc, collection, getDocs, updateDoc, query, } from "firebase/firestore";


export default function Studentpersonal({studentUid}) {
  const [studentData, setStudentData] = useState(null);
  const [document, setDocuments] = useState('');
  const [isEditMode, setIsEditMode] = useState(false);  
  const [isPersonalDetailsExpanded, setIsPersonalDetailsExpanded] = useState(false);
  const db = getFirestore();

  console.log('document:', document);

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

  const togglePersonalDetailsExpand = () => {
    setIsPersonalDetailsExpanded(!isPersonalDetailsExpanded);
  };

  const toggleEditMode = () => {
    setIsEditMode(!isEditMode);
  };

  const handleSave = async () => {
    const studentRef = doc(db, "students", studentUid);
    try {
      await updateDoc(studentRef, studentData); // Update the document with the new data
      console.log("Document successfully updated!");
      setIsEditMode(false); // Exit edit mode after saving
    } catch (error) {
      console.error("Error updating document: ", error);
    }
  };

  const iconStyle = {
    marginRight: "5px",
    fontSize: "18px", // Adjust the font size here
  };


  return (
    <div> 

    {isEditMode ? (
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
                <FaSave style={iconStyle} />
                Save
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
                <FaEdit style={iconStyle} />
                Edit
              </button>
            )}
            <br />
            <Typography variant="h6">👦 Personal Details</Typography>
            <table>
              <tbody>
                <tr>
                  <td>First Name:</td>
                  <td>
                    {isEditMode ? (
                      <input
                        type="text"
                        value={studentData && studentData.firstName}
                        onChange={(e) => setStudentData({ ...studentData, firstName: e.target.value })}
                      />
                    ) : (
                      studentData && studentData.firstName
                    )}
                  </td>
                </tr>
                <tr>
                  <td>Last Name:</td>
                  <td>
                    {isEditMode ? (
                      <input
                        type="text"
                        value={studentData && studentData.lastName}
                        onChange={(e) => setStudentData({ ...studentData, lastName: e.target.value })}
                      />
                    ) : (
                      studentData && studentData.lastName
                    )}
                  </td>
                </tr>
                <tr>
                  <td>Date of Birth:</td>
                  <td>
                    {isEditMode ? (
                      <input
                        type="date"
                        value={studentData && studentData.dob}
                        onChange={(e) => setStudentData({ ...studentData, dob: e.target.value })}
                      />
                    ) : (
                      studentData && studentData.dob
                    )}
                  </td>
                </tr>
                <tr>
                  <td>Admission Date:</td>
                  <td>
                    {isEditMode ? (
                      <input
                        type="date"
                        value={studentData && studentData.admissionDate}
                        onChange={(e) => setStudentData({ ...studentData, admissionDate: e.target.value })}
                      />
                    ) : (
                      studentData && studentData.admissionDate
                    )}
                  </td>
                </tr>
                {/* Conditionally render personal details if expanded */}
                {isPersonalDetailsExpanded && (
                  <>
                    <tr>
                      <td>Adhar UID:</td>
                      <td>
                        {isEditMode ? (
                          <input
                            type="text"
                            value={studentData && studentData.adharUid}
                            onChange={(e) => setStudentData({ ...studentData, adharUid: e.target.value })}
                          />
                        ) : (
                          studentData && studentData.adharUid
                        )}
                      </td>
                    </tr>
                    <tr>
                      <td>Address:</td>
                      <td>
                        {isEditMode ? (
                          <input
                            type="text"
                            value={studentData && studentData.address}
                            onChange={(e) => setStudentData({ ...studentData, address: e.target.value })}
                          />
                        ) : (
                          studentData && studentData.address
                        )}
                      </td>
                    </tr>
                    <tr>
                      <td>City:</td>
                      <td>
                        {isEditMode ? (
                          <input
                            type="text"
                            value={studentData && studentData.city}
                            onChange={(e) => setStudentData({ ...studentData, city: e.target.value })}
                          />
                        ) : (
                          studentData && studentData.city
                        )}
                      </td>
                    </tr>
                    <tr>
                      <td>State:</td>
                      <td>
                        {isEditMode ? (
                          <input
                            type="text"
                            value={studentData && studentData.state}
                            onChange={(e) => setStudentData({ ...studentData, state: e.target.value })}
                          />
                        ) : (
                          studentData && studentData.state
                        )}
                      </td>
                    </tr>
                    <tr>
                      <td>Gender:</td>
                      <td>
                        {isEditMode ? (
                          <select
                            value={studentData && studentData.gender}
                            onChange={(e) => setStudentData({ ...studentData, gender: e.target.value })}
                          >
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                          </select>
                        ) : (
                          studentData && studentData.gender
                        )}
                      </td>
                    </tr>
                    <tr>
                      <td>Blood Group:</td>
                      <td>
                        {isEditMode ? (
                          <input
                            type="text"
                            value={studentData && studentData.bloodGroup}
                            onChange={(e) => setStudentData({ ...studentData, bloodGroup: e.target.value })}
                          />
                        ) : (
                          studentData && studentData.bloodGroup
                        )}
                      </td>
                    </tr>
                    <tr>
                      <td>Religion:</td>
                      <td>
                        {isEditMode ? (
                          <input
                            type="text"
                            value={studentData && studentData.religion}
                            onChange={(e) => setStudentData({ ...studentData, religion: e.target.value })}
                          />
                        ) : (
                          studentData && studentData.religion
                        )}
                      </td>
                    </tr>
                    <tr>
                      <td>Height:</td>
                      <td>
                        {isEditMode ? (
                          <input
                            type="text"
                            value={studentData && studentData.height}
                            onChange={(e) => setStudentData({ ...studentData, height: e.target.value })}
                          />
                        ) : (
                          studentData && studentData.height
                        )}
                      </td>
                    </tr>
                    <tr>
                      <td>Weight:</td>
                      <td>
                        {isEditMode ? (
                          <input
                            type="text"
                            value={studentData && studentData.weight}
                            onChange={(e) => setStudentData({ ...studentData, weight: e.target.value })}
                          />
                        ) : (
                          studentData && studentData.weight
                        )}
                      </td>
                    </tr>
                    <tr>
                      <td>Student Number:</td>
                      <td>
                        {isEditMode ? (
                          <input
                            type="text"
                            value={studentData && studentData.studentNumber}
                            onChange={(e) => setStudentData({ ...studentData, studentNumber: e.target.value })}
                          />
                        ) : (
                          studentData && studentData.studentNumber
                        )}
                      </td>
                    </tr>
                    <tr>
                      <td>Medical History:</td>
                      <td>
                        {isEditMode ? (
                          <textarea
                            value={studentData && studentData.medicalHistory}
                            onChange={(e) => setStudentData({ ...studentData, medicalHistory: e.target.value })}
                          />
                        ) : (
                          studentData && studentData.medicalHistory
                        )}
                      </td>
                    </tr>
                  </>
                )}
              </tbody>
            </table>

            <br />
            <button
              onClick={togglePersonalDetailsExpand}
              style={{
                width: "300px",
                backgroundColor: "blue",
                color: "white",
                padding: "10px 20px",
                borderRadius: "5px",
                border: "none",
                cursor: "pointer",
              }}
            >
              {isPersonalDetailsExpanded ? "Collapse" : "Expand"} Personal Details
            </button>
            <br />

            <Typography variant="h6">🎓 Academic Details</Typography>
            <table>
              <tbody>
                <tr>
                  <td>Class:</td>
                  <td>{studentData && studentData.class}</td>
                </tr>
                <tr>
                  <td>Academic Year:</td>
                  <td>{studentData && studentData.academicYear}</td>
                </tr>
                <tr>
                  <td>House:</td>
                  <td>
                    {isEditMode ? (
                      <input
                        type="text"
                        value={studentData && studentData.house}
                        onChange={(e) => setStudentData({ ...studentData, house: e.target.value })}
                      />
                    ) : (
                      studentData && studentData.house
                    )}
                  </td>
                </tr>
                <tr>
                  <td>Sports:</td>
                  <td>
                    {isEditMode ? (
                      <input
                        type="text"
                        value={studentData && studentData.sports}
                        onChange={(e) => setStudentData({ ...studentData, sports: e.target.value })}
                      />
                    ) : (
                      studentData && studentData.sports
                    )}
                  </td>
                </tr>
              </tbody>
            </table>
    </div>
  )
}
