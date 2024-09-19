import React, { useState, useEffect } from 'react';
import { db } from '../../utils/firebaseConfig'; 
import { getDocs, collection, query, } from 'firebase/firestore';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
 
 

function  Studentshow() {
    const [students, setStudents] = useState([]);

    useEffect(() => {
        const fetchStudentsWithBooks = async () => {
            try {
                const studentsQuery = query(collection(db, 'students'));
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
        fetchStudentsWithBooks();
    }, []);

    return (
        <div>
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
                                </TableRow>
                            </TableHead>
                            <tbody>
                                {students.map((student, index) => (
                                    <TableRow key={index}>
                                        <TableCell>{student.class}</TableCell>
                                        <TableCell>{student.firstName}</TableCell>
                                        <TableCell>{student.bookName}</TableCell>
                                        <TableCell>{student.bookNumber}</TableCell>
                                        <TableCell>{student.issueDate}</TableCell>
                                        <TableCell>{student.returnDate}</TableCell>
                                        <TableCell>{student.returned ? 'Returned' : 'Not Returned'}</TableCell>
                                        
                                    </TableRow>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Studentshow;

 
