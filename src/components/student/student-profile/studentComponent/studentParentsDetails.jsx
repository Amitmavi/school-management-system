import { Typography, Button } from "@mui/material";
import { useState, useEffect } from 'react';
import { getFirestore, doc, getDoc, collection, getDocs, query, updateDoc } from "firebase/firestore";

export default function StudentParentsDetails({ studentUid }) {
    const [studentData, setStudentData] = useState(null);
    const [isEditMode, setIsEditMode] = useState(false);
    const db = getFirestore();

    useEffect(() => {
        const fetchStudentData = async () => {
            try {
                const studentRef = doc(db, "students", studentUid);
                const studentDoc = await getDoc(studentRef);
                const student = { id: studentDoc.id, ...studentDoc.data() };
                setStudentData(student);
            } catch (error) {
                console.error("Error fetching student data:", error);
            }
        };

        if (studentUid) {
            fetchStudentData();
        }
    }, [studentUid, db]);

    const handleSave = async () => {
        try {
            const studentRef = doc(db, "students", studentUid);
            await updateDoc(studentRef, studentData);
            setIsEditMode(false);
        } catch (error) {
            console.error("Error saving student data:", error);
        }
    };
 
    // Style for the button icons
 const iconStyle = {
  marginRight: "5px",
  fontSize: "18px", // Adjust the font size here
};
   
  return (
    <div style={{ position: "relative" }}>
    <div style={{ position: "absolute", top: "0", right: "0" }}>
        {/* Render Edit and Save buttons */}
        {isEditMode ? (
            <Button variant="contained" onClick={handleSave} style={iconStyle}>Save</Button>
        ) : (
            <Button variant="contained" onClick={() => setIsEditMode(true)} style={iconStyle}>Edit</Button>
        )}
    </div>
   
    <Typography variant="h5">Parents Details</Typography>
    <br />
    <Typography variant="h6">Father's Details</Typography>
    <table>
      <tbody>
        <tr>
          <td>Name:</td>
          <td>
            {isEditMode ? (
              <input
                type="text"
                value={studentData && studentData.fatherName}
                onChange={(e) => setStudentData({ ...studentData, fatherName: e.target.value })}
              />
            ) : (
              studentData && studentData.fatherName
            )}
          </td>
        </tr>
        <tr>
          <td>Phone:</td>
          <td>
            {isEditMode ? (
              <input
                type="text"
                value={studentData && studentData.fatherPhone}
                onChange={(e) => setStudentData({ ...studentData, fatherPhone: e.target.value })}
              />
            ) : (
              studentData && studentData.fatherPhone
            )}
          </td>
        </tr>
        <tr>
          <td>Occupation:</td>
          <td>
            {isEditMode ? (
              <input
                type="text"
                value={studentData && studentData.fatherOccupation}
                onChange={(e) => setStudentData({ ...studentData, fatherOccupation: e.target.value })}
              />
            ) : (
              studentData && studentData.fatherOccupation
            )}
          </td>
        </tr>
        <tr>
          <td>Email:</td>
          <td>
            {isEditMode ? (
              <input
                type="text"
                value={studentData && studentData.fatherEmail}
                onChange={(e) => setStudentData({ ...studentData, fatherEmail: e.target.value })}
              />
            ) : (
              studentData && studentData.fatherEmail
            )}
          </td>
        </tr>
      </tbody>
    </table>
    <br />
    <Typography variant="h6">Mother's Details</Typography>
    <table>
      <tbody>
        <tr>
          <td>Name:</td>
          <td>
            {isEditMode ? (
              <input
                type="text"
                value={studentData && studentData.motherName}
                onChange={(e) => setStudentData({ ...studentData, motherName: e.target.value })}
              />
            ) : (
              studentData && studentData.motherName
            )}
          </td>
        </tr>
        <tr>
          <td>Phone:</td>
          <td>
            {isEditMode ? (
              <input
                type="text"
                value={studentData && studentData.motherPhone}
                onChange={(e) => setStudentData({ ...studentData, motherPhone: e.target.value })}
              />
            ) : (
              studentData && studentData.motherPhone
            )}
          </td>
        </tr>
        <tr>
          <td>Occupation:</td>
          <td>
            {isEditMode ? (
              <input
                type="text"
                value={studentData && studentData.motherOccupation}
                onChange={(e) => setStudentData({ ...studentData, motherOccupation: e.target.value })}
              />
            ) : (
              studentData && studentData.motherOccupation
            )}
          </td>
        </tr>
        <tr>
          <td>Email:</td>
          <td>
            {isEditMode ? (
              <input
                type="text"
                value={studentData && studentData.motherEmail}
                onChange={(e) => setStudentData({ ...studentData, motherEmail: e.target.value })}
              />
            ) : (
              studentData && studentData.motherEmail
            )}
          </td>
        </tr>
      </tbody>
    </table>
    <br />
    <Typography variant="h6">Guardian's Details</Typography>
    <table>
      <tbody>
        <tr>
          <td>Name:</td>
          <td>
            {isEditMode ? (
              <input
                type="text"
                value={studentData && studentData.guardianName}
                onChange={(e) => setStudentData({ ...studentData, guardianName: e.target.value })}
              />
            ) : (
              studentData && studentData.guardianName
            )}
          </td>
        </tr>
        <tr>
          <td>Phone:</td>
          <td>
            {isEditMode ? (
              <input
                type="text"
                value={studentData && studentData.guardianPhone}
                onChange={(e) => setStudentData({ ...studentData, guardianPhone: e.target.value })}
              />
            ) : (
              studentData && studentData.guardianPhone
            )}
          </td>
        </tr>
        <tr>
          <td>Occupation:</td>
          <td>
            {isEditMode ? (
              <input
                type="text"
                value={studentData && studentData.guardianOccupation}
                onChange={(e) => setStudentData({ ...studentData, guardianOccupation: e.target.value })}
              />
            ) : (
              studentData && studentData.guardianOccupation
            )}
          </td>
        </tr>
        <tr>
          <td>Email:</td>
          <td>
            {isEditMode ? (
              <input
                type="text"
                value={studentData && studentData.guardianEmail}
                onChange={(e) => setStudentData({ ...studentData, guardianEmail: e.target.value })}
              />
            ) : (
              studentData && studentData.guardianEmail
            )}
          </td>
        </tr>
      </tbody>
    </table>
   



</div>
  )
}
