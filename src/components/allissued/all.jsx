import React, { useState, useEffect } from 'react';
import { db } from '../../utils/firebaseConfig'; 
import { getDocs, collection, query } from 'firebase/firestore';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

function UserShow() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUsersWithBooks = async () => {
            try {
                // Fetch both students and teachers
                const studentsQuery = query(collection(db, 'students'));
                const teachersQuery = query(collection(db, 'teachers'));

                // Fetch students
                const studentsSnapshot = await getDocs(studentsQuery);
                const studentsData = await Promise.all(studentsSnapshot.docs.map(async (doc) => {
                    const userData = doc.data();
                    const libraryCollectionRef = collection(db, 'students', doc.id, 'library');
                    const librarySnapshot = await getDocs(libraryCollectionRef);
                    return librarySnapshot.docs.map(libraryDoc => ({
                        id: doc.id,
                        userType: 'Student',
                        ...userData,
                        bookName: libraryDoc.data().bookName,
                        bookNumber: libraryDoc.data().bookNumber,
                        issueDate: libraryDoc.data().issueDate,
                        returnDate: libraryDoc.data().returnDate,
                        returned: libraryDoc.data().returned,
                    }));
                }));

                // Fetch teachers
                const teachersSnapshot = await getDocs(teachersQuery);
                const teachersData = await Promise.all(teachersSnapshot.docs.map(async (doc) => {
                    const userData = doc.data();
                    const libraryCollectionRef = collection(db, 'teachers', doc.id, 'library');
                    const librarySnapshot = await getDocs(libraryCollectionRef);
                    return librarySnapshot.docs.map(libraryDoc => ({
                        id: doc.id,
                        userType: 'Teacher',
                        ...userData,
                        bookName: libraryDoc.data().bookName,
                        bookNumber: libraryDoc.data().bookNumber,
                        issueDate: libraryDoc.data().issueDate,
                        returnDate: libraryDoc.data().returnDate,
                        returned: libraryDoc.data().returned,
                    }));
                }));

                // Flatten the arrays using reduce
                const flatten = arr => arr.reduce((acc, val) => acc.concat(val), []);
                const usersData = flatten([...studentsData, ...teachersData]);

                setUsers(usersData);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };
        fetchUsersWithBooks();
    }, []);

    return (
        <div>
            <div className='form-row'>
                {users.length > 0 && (
                    <div className="users-list">
                        <h2>Users who have issued books:</h2>
                        <table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>User ID</TableCell>
                                    <TableCell>User Type</TableCell>
                                    <TableCell>Name</TableCell>
                                    <TableCell>Book Name</TableCell>
                                    <TableCell>Book Number</TableCell>
                                    <TableCell>Issue Date</TableCell>
                                    <TableCell>Return Date</TableCell>
                                    <TableCell>Returned</TableCell>
                                </TableRow>
                            </TableHead>
                            <tbody>
                                {users.map((user, index) => (
                                    <TableRow key={index}>
                                        <TableCell>{user.id}</TableCell>
                                        <TableCell>{user.userType}</TableCell>
                                        <TableCell>{user.firstName}</TableCell>
                                        <TableCell>{user.bookName}</TableCell>
                                        <TableCell>{user.bookNumber}</TableCell>
                                        <TableCell>{user.issueDate}</TableCell>
                                        <TableCell>{user.returnDate}</TableCell>
                                        <TableCell>{user.returned ? 'Returned' : 'Not Returned'}</TableCell>
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

export default UserShow;
