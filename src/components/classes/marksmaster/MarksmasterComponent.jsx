import React, { useEffect, useState } from 'react';
import { getFirestore, collection, doc, getDoc, getDocs, updateDoc, setDoc } from 'firebase/firestore';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SetMaxMinMarks = () => {
    const [examType, setExamType] = useState('');
    const [selectedClass, setSelectedClass] = useState('');
    const [maxMarks, setMaxMarks] = useState('');
    const [minMarks, setMinMarks] = useState('');
    const [classes, setClasses] = useState([]);

    useEffect(() => {
        const fetchClasses = async () => {
            const db = getFirestore();
            try {
                // Fetch classes
                const classesSnapshot = await getDocs(collection(db, 'classes'));
                const classesData = classesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setClasses(classesData);
            } catch (error) {
                console.error('Error fetching classes:', error);
            }
        };

        fetchClasses();
    }, []);

    // Function to show success toast message
    const showSuccessToast = () => {
        toast.success('Max and Min marks saved successfully!', {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    };

    // Function to show error toast message
    const showErrorToast = (errorMessage) => {
        toast.error(errorMessage, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    };

    // Function to handle saving max and min marks to Firebase
    const handleSave = async () => {
        if (examType && selectedClass && maxMarks && minMarks) {
            try {
                const db = getFirestore();
                const classRef = doc(db, 'classes', selectedClass);

                // Check if the selected class exists
                const classSnap = await getDoc(classRef);
                if (!classSnap.exists()) {
                    showErrorToast('Selected class does not exist!');
                    return;
                }

                // Reference the maxminMarks document within the selected class
                const maxminMarksRef = doc(classRef, 'maxminMarks', examType);

                // Create or update the maxminMarks document
                await setDoc(maxminMarksRef, {
                    max: maxMarks,
                    min: minMarks
                });

                showSuccessToast();
                // Clear input fields after saving
                setExamType('');
                setSelectedClass('');
                setMaxMarks('');
                setMinMarks('');
            } catch (error) {
                console.error('Error saving max and min marks:', error);
                showErrorToast('Error saving max and min marks');
            }
        } else {
            console.error('Please fill in all fields!');
            showErrorToast('Please fill in all fields!');
        }
    };

    return (
        <div>
            <h1>Set Max and Min Marks for Class</h1>

            <label htmlFor="examType">Select Exam Type:</label>
            <select id="examType" value={examType} onChange={(e) => setExamType(e.target.value)}>
                <option value="">Select Exam Type</option>
                <option value="Unit1">Unit 1</option>
                <option value="Unit2">Unit 2</option>
                <option value="Unit3">Unit 3</option>
                <option value="HalfYearly">HalfYearly</option>
                <option value="Finals">Finals</option>  
                {/* Add more options as needed */}
            </select>

            <label htmlFor="class">Choose Class:</label>
            <select id="class" value={selectedClass} onChange={(e) => setSelectedClass(e.target.value)}>
                <option value="">Select Class</option>
                {classes.map((cls) => (
                    <option key={cls.id} value={cls.id}>{cls.className}</option>
                ))}
            </select>

            <label htmlFor="maxMarks">Enter Max Marks:</label>
            <input type="number" id="maxMarks" value={maxMarks} onChange={(e) => setMaxMarks(e.target.value)} />

            <label htmlFor="minMarks">Enter Min Marks:</label>
            <input type="number" id="minMarks" value={minMarks} onChange={(e) => setMinMarks(e.target.value)} />

            <button onClick={handleSave}>Save</button>

            {/* Toast container */}
            <ToastContainer />
        </div>
    );
};

export default SetMaxMinMarks;
