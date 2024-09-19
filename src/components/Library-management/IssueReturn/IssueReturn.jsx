import Button from '@mui/material/Button';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { collection, doc, deleteDoc, getDocs, query,   where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { db } from '../../../utils/firebaseConfig';
import './IssueReturn.css';
import { toast } from 'react-toastify';


function IssueReturn() {
    // State variables to hold selected class, section
    const [selectedClass, setSelectedClass] = useState('');
    const [selectedSection, setSelectedSection] = useState('');
    const [students, setStudents] = useState([]);

    // State variables to hold classes, sections fetched from Firestore
    const [classes, setClasses] = useState([]);
    const [sections, setSections] = useState([]);

    // Fetch classes and sections from Firestore
    useEffect(() => {
      const fetchClasses = async () => {
        try {
          const classesSnapshot = await getDocs(collection(db, 'classes'));
          const classesData = Array.from(new Set(classesSnapshot.docs.map(doc => getClassSectionFromId(doc.id).class)));
          setClasses(classesData);
        } catch (error) {
          console.error('Error fetching classes:', error);
        }
      };
  
      const fetchSections = async () => {
        try {
          const sectionsSnapshot = await getDocs(collection(db, 'classes'));
          const sectionsData = Array.from(new Set(sectionsSnapshot.docs.map(doc => getClassSectionFromId(doc.id).section)));
          setSections(sectionsData);
        } catch (error) {
          console.error('Error fetching sections:', error);
        }
      };

        fetchClasses();
        fetchSections();
    }, []);
    const getClassSectionFromId = (id) => {
      const parts = id.split(' ');
      return {
        class: parts[0],
        section: parts[1]
      };
    };
    // Function to handle class selection
    const handleClassSelect = (event) => {
        setSelectedClass(event.target.value);
        setSelectedSection('');
        setStudents([]); // Clear students list when class is changed
    };

    // Function to handle section selection
    const handleSectionSelect = (event) => {
        setSelectedSection(event.target.value);
        getStudentsByClassAndSection(selectedClass, event.target.value);
    };

    // Function to fetch students based on class and section
    const getStudentsByClassAndSection = async (selectedClass, selectedSection) => {
      try {
          const studentsQuery = query(collection(db, 'students'), 
              where('class', '==', selectedClass + ' ' + selectedSection));
          const studentsSnapshot = await getDocs(studentsQuery);
          const studentsData = [];
          await Promise.all(studentsSnapshot.docs.map(async (doc) => {
              const libraryCollectionRef = collection(db, 'students', doc.id, 'library');
              const librarySnapshot = await getDocs(libraryCollectionRef);
              if (!librarySnapshot.empty) {
                  librarySnapshot.forEach(libraryDoc => {
                      studentsData.push({
                          id: doc.id,
                          ...doc.data(),
                          bookName: libraryDoc.data().bookName,
                          bookNumber: libraryDoc.data().bookNumber,
                          issueDate: libraryDoc.data().issueDate,
                          returnDate: libraryDoc.data().returnDate,
                          returned: libraryDoc.data().returned,
                          issueId: libraryDoc.data().issueId,
                          // Add more fields as needed
                      });
                  });
              }
          }));
          setStudents(studentsData);
      } catch (error) {
          console.error('Error fetching students:', error);
      }
  };

  // Function to handle adding the teacher
  const handleReturn = async (student, issueId) => {
    const confirmed = window.confirm('Are you sure you want to return?');
    if (confirmed) {
      try {
        console.log(issueId);
        if(student.issueId != null){
          console.log("Book issue Id exsists")
        }else{
          console.log("not exsist")
        }
        // Delete document inside the 'library' collection
        const libraryDocRef = doc(db, 'students', student.id, 'library', student.issueId);
        await deleteDoc(libraryDocRef);
  
       toast.success("Successfully Return")
       
       console.log('Book returned successfully');
       getStudentsByClassAndSection(selectedClass, selectedSection);
      } catch (error) {
        console.error('Error returning book:', error);
      }
    }
  };
  

  return (
    <div>
         <h1>Issue and Return</h1>
        <div className='form-row'>
            <div className="issue-return-container">
                <div className="selection-container">
                    <h3>Select Class</h3>
                    <select value={selectedClass} onChange={handleClassSelect}>
                        <option value="">Select Class</option>
                        {classes.map((className, index) => (
                            <option key={index} value={className}>
                                {className}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="selection-container">
                    <h3>Select Section</h3>
                    <select value={selectedSection} onChange={handleSectionSelect}>
                        <option value="">Select Section</option>
                        {sections.map((sectionName, index) => (
                            <option key={index} value={sectionName}>
                                {sectionName}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
        </div>
        <div className='form-row'>
            {students.length > 0 && (
                <div className="students-list">
                    <h2>Students who have issued books:</h2>
                    <table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Roll No.</TableCell>
                                <TableCell>Name</TableCell>
                                <TableCell>Book Name</TableCell>
                                <TableCell>Book Number</TableCell>
                                <TableCell>Issue Date</TableCell>
                                <TableCell>Return Date</TableCell>
                                <TableCell>Returned</TableCell>
                                <TableCell>Add</TableCell>
                            </TableRow>
                        </TableHead>
                        <tbody>
                            {students.map((student, index) => (
                                <TableRow key={index}>
                                    <TableCell>{student.rollNo}</TableCell>
                                    <TableCell>{student.firstName}</TableCell>
                                    <TableCell>{student.bookName}</TableCell>
                                    <TableCell>{student.bookNumber}</TableCell>
                                    <TableCell>{student.issueDate}</TableCell>
                                    <TableCell>{student.returnDate}</TableCell>
                                    <TableCell>{student.returned ? 'Returned' : 'Not Returned'}</TableCell>
                                    <TableCell>
                                        <Button variant="contained" color="primary" onClick={() => handleReturn(student, student.issueId)}>
                                            Return
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    </div>
  );
}

export default IssueReturn;
