import React, { useState } from 'react';
import { getFirestore, collection, doc, setDoc } from 'firebase/firestore';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import Exporter from './Exporter'; // Import the Exporter component

export default function AllStudent() {
    const [file, setFile] = useState(null);

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        setFile(selectedFile);
    };

    const handleUpload = async () => {
        if (!file) return;

        const reader = new FileReader();
        reader.readAsText(file);

        reader.onload = async (e) => {
            const csv = e.target.result;
            const rows = csv.split('\n').slice(1); // assuming first row contains headers
            const firestore = getFirestore(); // Get Firestore instance
            const studentRef = collection(firestore, 'students'); // Get collection reference
            const auth = getAuth(); // Get Auth instance

            for (let i = 0; i < rows.length; i++) {
                const row = rows[i].trim(); // Trim any leading or trailing whitespace
                const data = row.split(',');
                const studentData = {
                    firstName: data[0],
                    secondName: data[1],
                    fullName: data[2],
                    rollNo: data[3],
                    class: data[4], // Use 'class' as a property name
                    gender: data[5],
                    admissionNumber: data[6],
                    adharUid: data[7],
                    house: data[8],
                    dateOfAdmission: data[9],
                    dob: data[10],
                };

                // Check if any required field is missing or empty
                if (Object.values(studentData).some(value => !value)) {
                    console.error('One or more required fields are missing in the CSV');
                    continue; // Skip this row
                }

                // Create a unique identifier for the student (using admission number)
                const email = `${studentData.admissionNumber}@pulsezest.com`;

                try {
                    // Create user with email and password
                    const userCredential = await createUserWithEmailAndPassword(auth, email, studentData.admissionNumber);

                    // Get user UID
                    const uid = userCredential.user.uid;

                    // Create a reference to the student document using the UID
                    const studentDocRef = doc(studentRef, uid);

                    const student = { ...studentData, uid }; // Include UID in the student data

                    // Set the document data with merge option to update existing document or create a new one
                    await setDoc(studentDocRef, student);
                } catch (error) {
                    console.error('Error creating user:', error);
                    continue; // Skip this row
                }
            }

            alert('Students uploaded successfully!');
        };
    };

    return (
        <div>
            <h2>Upload Student Details</h2>
            <input type="file" accept=".csv" onChange={handleFileChange} />
            <button onClick={handleUpload}>Upload</button>
            
            {/* Render the Exporter component */}
            <Exporter />
        </div>
    );
}