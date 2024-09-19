import React, { useEffect, useState } from 'react';
import { collection, deleteDoc, doc, getDocs, getFirestore } from 'firebase/firestore';
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./Addsubject.css"

const ShowSubject = () => {
  const [showSubjects, setShowSubjects] = useState([]);

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const firestore = getFirestore();
        const subjectCollection = collection(firestore, 'subjects'); // Corrected collection name to 'subjects'
        const snapshot = await getDocs(subjectCollection);
        const subjectsData = snapshot.docs.map(doc => ({
          id: doc.id,
          subjectName: doc.data().subjectName,
          subjectCode: doc.data().subjectCode,
          subjectType: doc.data().subjectType
        }));
        setShowSubjects(subjectsData);
      } catch (error) {
        console.error('Error fetching subjects:', error);
        toast.error('Error fetching subjects. Please try again later.'); // Added toast for error handling
      }
    };

    fetchSubjects();
  }, []);

  const handleDeleteSubject = async (id) => {
    try {
      const firestore = getFirestore();
      const subjectRef = doc(firestore, 'subjects', id); // Corrected collection name to 'subjects'
      await deleteDoc(subjectRef);
      setShowSubjects(prevSubjects => prevSubjects.filter(subject => subject.id !== id));
      toast.success('Subject deleted successfully!');
    } catch (error) {
      console.error('Error deleting subject:', error);
      toast.error('Error deleting subject. Please try again later.');
    }
  };

  return (
    <div className="container">
      <div className="table">
        <h2>Subject Table</h2>
        <table className="subject-table">
          <thead>
            <tr>
              <th>Subject Type</th>
              <th>Subject Name</th>
              <th>Subject Code</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {showSubjects.map(subject => (
              <tr key={subject.id}>
                <td>{subject.subjectType}</td>
                <td>{subject.subjectName}</td>
                <td>{subject.subjectCode}</td>
                <td>
                  <IconButton onClick={() => handleDeleteSubject(subject.id)} aria-label="delete">
                    <DeleteIcon />
                  </IconButton>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ShowSubject;
