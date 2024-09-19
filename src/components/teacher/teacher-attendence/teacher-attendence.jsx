import React, { useState } from 'react';
import { getFirestore, doc, setDoc, updateDoc, serverTimestamp,getDoc } from 'firebase/firestore';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function TeacherAttendanceForm() {
  const [file, setFile] = useState(null);

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        setFile(selectedFile);
    };

    const handleUpload = async () => {
      if (!file) {
          toast.error('No file selected.');
          return;
      }
  
      const reader = new FileReader();
      reader.readAsText(file);
  
      reader.onload = async (e) => {
          const csv = e.target.result;
          const rows = csv.split('\n').slice(1); // Remove header row
          const firestore = getFirestore(); // Get Firestore instance
  
          for (let i = 0; i < rows.length; i++) {
              const row = rows[i];
              const [ date, teacherUid, status] = row.split(',').map(value => value.trim());
  
              // Check if any required field is missing or empty
              if (!date || !teacherUid  || !status) {
                  toast.error('One or more required fields are missing in the CSV');
                  continue; // Skip this row
              }
  
              try {
                  // Convert the date format to yyyy-MM-dd
                  const [day, month, year] = date.split('-');
                  const formattedDate = `${year}-${month}-${day}`;
  
                  // Create a reference to the attendance document
                  const attendanceDocRef = doc(firestore, 'teachers', teacherUid, 'attendance', formattedDate);
  
                  // Check if the document already exists
                  const attendanceDocSnap = await getDoc(attendanceDocRef);
                  const attendanceData = attendanceDocSnap.exists() ? attendanceDocSnap.data().attendance || {} : {};
  
                  // Update or add the attendance for the student
                  attendanceData[teacherUid] = status;
  
                  // Set the updated attendance data in Firestore
                  await setDoc(attendanceDocRef, { attendance: attendanceData });
                  toast.success('Attendance data saved successfully!');
              } catch (error) {
                  console.error('Error saving attendance data:', error);
                  toast.error('Error saving attendance data. Please try again later.');
                  continue; // Skip this row
              }
          }
  
          toast.success('Attendance data uploaded successfully!');
      };
  
      reader.onerror = (err) => {
          console.error('File reading error:', err);
          toast.error('Error reading file. Please try again later.');
      };
  };

  return (
    <div>
            <h2>Upload Teacher Attendance</h2>
            <input type="file" accept=".csv" onChange={handleFileChange} />
            <button onClick={handleUpload}>Upload</button>
            <ToastContainer />
          
        </div>
  );
}

export default TeacherAttendanceForm;
