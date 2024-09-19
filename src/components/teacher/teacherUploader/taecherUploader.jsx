import React, { useState } from 'react';
import { getFirestore, collection, doc, setDoc } from 'firebase/firestore';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import Exporter2 from './exporter2'; // Import the Exporter component

export default function AllTeachers() {
    const [file, setFile] = useState(null);

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        setFile(selectedFile);
    };

    const handleUpload = async () => {
        if (!file) {
            console.error('No file selected.');
            return;
        }
    
        const reader = new FileReader();
        reader.readAsText(file);

        const firestore = getFirestore(); // Get Firestore instance
        const teacherRef = collection(firestore, 'teachers'); // Get collection reference
        const auth = getAuth(); // Get Auth instance
    
        reader.onload = async (e) => {
            const csv = e.target.result;
            const rows = csv.split('\n').slice(1); // Remove header row
    
            for (let i = 0; i < rows.length; i++) {
                const row = rows[i];
                const [firstName, lastName, fullName, dob, degreeType] = row.split(',').map(value => value.trim()); // Split row by comma and trim whitespace
    
                // Check if any required field is missing or empty
                if (!firstName || !lastName || !fullName || !dob || !degreeType) {
                    console.error('One or more required fields are missing in the CSV');
                    continue; // Skip this row
                }
    
                try {
                    // Create a unique identifier for the teacher (using first name and last name)
                    const email = `${firstName.toLowerCase()}${lastName.toLowerCase()}@pulsezest.com`;
    
                    // Create user with email and password in Firebase Authentication
                    const userCredential = await createUserWithEmailAndPassword(auth, email, 'pulsezest');
    
                    // Get user UID
                    const uid = userCredential.user.uid;

                    // Create a reference to the teacher document using the UID
                    const teacherDocRef = doc(teacherRef, uid);
    
                    const teacher = {
                        firstName,
                        lastName,
                        fullName,
                        dob,
                        degreeType,
                        email,
                        uid // Save UID in the document
                        // Add additional fields as needed
                    };
    
                    // Set the document data in Firestore
                    await setDoc(teacherDocRef, teacher);
                    console.log('Teacher data saved:', teacher);
                } catch (error) {
                    console.error('Error saving teacher data:', error);
                    continue; // Skip this row
                }
            }
    
            alert('Teachers uploaded successfully!');
        };
    
        reader.onerror = (err) => {
            console.error('File reading error:', err);
        };
    };

    return (
        <div>
            <h2>Upload Teacher Details</h2>
            <input type="file" accept=".csv" onChange={handleFileChange} />
            <button onClick={handleUpload}>Upload</button>
            
            {/* Render the Exporter component */}
            <Exporter2 />
        </div>
    );
}
