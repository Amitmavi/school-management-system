import React, { useState, useEffect } from 'react';
import { db } from '../../utils/firebaseConfig'; 
import { getDocs, collection, query, } from 'firebase/firestore';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

function Teachershow() {
    const [teachers, setTeachers] = useState([]);

    useEffect(() => {
        const fetchTeachersWithBooks = async () => {
            try {
                const teachersQuery = query(collection(db, 'teachers'));
                const teachersSnapshot = await getDocs(teachersQuery);
                const teachersData = [];
                await Promise.all(teachersSnapshot.docs.map(async (doc) => {
                    const libraryCollectionRef = collection(db, 'teachers', doc.id, 'library');
                    const librarySnapshot = await getDocs(libraryCollectionRef);
                    if (!librarySnapshot.empty) {
                        librarySnapshot.forEach(libraryDoc => {
                            teachersData.push({
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
                setTeachers(teachersData);
            } catch (error) {
                console.error('Error fetching teachers:', error);
            }
        };
        fetchTeachersWithBooks();
    }, []);

    return (
        <div>
            <div className='form-row'>
                {teachers.length > 0 && (
                    <div className="teachers-list">
                        <h2>Teachers who have issued books:</h2>
                        <table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Teacher ID</TableCell>
                                    <TableCell>Name</TableCell>
                                    <TableCell>Book Name</TableCell>
                                    <TableCell>Book Number</TableCell>
                                    <TableCell>Issue Date</TableCell>
                                    <TableCell>Return Date</TableCell>
                                    <TableCell>Returned</TableCell>
                                </TableRow>
                            </TableHead>
                            <tbody>
                                {teachers.map((teacher, index) => (
                                    <TableRow key={index}>
                                        <TableCell>{teacher.id}</TableCell>
                                        <TableCell>{teacher.firstName}</TableCell>
                                        <TableCell>{teacher.bookName}</TableCell>
                                        <TableCell>{teacher.bookNumber}</TableCell>
                                        <TableCell>{teacher.issueDate}</TableCell>
                                        <TableCell>{teacher.returnDate}</TableCell>
                                        <TableCell>{teacher.returned ? 'Returned' : 'Not Returned'}</TableCell>
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

export default Teachershow;
