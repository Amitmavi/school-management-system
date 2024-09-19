import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import React, { useState } from 'react';

const BookTable = ({ books }) => {
    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell style={{ fontWeight: 'bold' }}>Book Title</TableCell>
                        <TableCell style={{ fontWeight: 'bold' }}>Description</TableCell>
                        <TableCell style={{ fontWeight: 'bold' }}>Book Number</TableCell>
                        <TableCell style={{ fontWeight: 'bold' }}>ISBN Number</TableCell>
                        <TableCell style={{ fontWeight: 'bold' }}>Publisher</TableCell>
                        <TableCell style={{ fontWeight: 'bold' }}>Author</TableCell>
                        <TableCell style={{ fontWeight: 'bold' }}>Subject</TableCell>
                        <TableCell style={{ fontWeight: 'bold' }}>Rack Number</TableCell>
                        <TableCell style={{ fontWeight: 'bold' }}>Quantity</TableCell>
                        <TableCell style={{ fontWeight: 'bold' }}>Available</TableCell>
                        <TableCell style={{ fontWeight: 'bold' }}>Price</TableCell>
                        <TableCell style={{ fontWeight: 'bold' }}>Post Date</TableCell>
                        <TableCell style={{ fontWeight: 'bold' }}>Action</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {books.map((book) => (
                        <TableRow key={book.id}>
                            <TableCell>{book.title}</TableCell>
                            <TableCell>{book.description}</TableCell>
                            <TableCell>{book.number}</TableCell>
                            <TableCell>{book.isbn}</TableCell>
                            <TableCell>{book.publisher}</TableCell>
                            <TableCell>{book.author}</TableCell>
                            <TableCell>{book.subject}</TableCell>
                            <TableCell>{book.rackNumber}</TableCell>
                            <TableCell>{book.quantity}</TableCell>
                            <TableCell>{book.available}</TableCell>
                            <TableCell>{book.price}</TableCell>
                            <TableCell>{book.postDate}</TableCell>
                            <TableCell>
                                {/* Add action button or functionality here */}
                                <button style={{ backgroundColor: '#4caf50', color: '#fff', border: 'none', padding: '8px 16px', borderRadius: '4px', cursor: 'pointer', transition: 'background-color 0.3s ease' }}>Assign</button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

const BookList = () => {
    const [books] = useState([
        { id: 1, title: 'Book A', description: 'Description A', number: '001', isbn: 'ISBN001', publisher: 'Publisher A', author: 'Author A', subject: 'Subject A', rackNumber: 'A1', quantity: 10, available: 7, price: 20, postDate: '2024-03-20' },
        { id: 2, title: 'Book B', description: 'Description B', number: '002', isbn: 'ISBN002', publisher: 'Publisher B', author: 'Author B', subject: 'Subject B', rackNumber: 'B1', quantity: 15, available: 10, price: 25, postDate: '2024-03-21' },
        // Add more books as needed
    ]);

    const [classes] = useState([
        { id: 1, name: 'Class 1', books: ['Book A', 'Book B', 'Book C'] },
        { id: 2, name: 'Class 2', books: ['Book D', 'Book E', 'Book F'] },
        { id: 3, name: 'Class 3', books: ['Book G', 'Book H', 'Book I'] },
        { id: 4, name: 'Class 4', books: ['Book J', 'Book K', 'Book L'] },
        { id: 5, name: 'Class 5', books: ['Book M', 'Book N', 'Book O'] },
        { id: 6, name: 'Class 6', books: ['Book P', 'Book Q', 'Book R'] },
        { id: 7, name: 'Class 7', books: ['Book S', 'Book T', 'Book U'] },
        { id: 8, name: 'Class 8', books: ['Book V', 'Book W', 'Book X'] },
        { id: 9, name: 'Class 9', books: ['Book Y', 'Book Z', 'Book AA'] },
        { id: 10, name: 'Class 10', books: ['Book AB', 'Book AC', 'Book AD'] },
        { id: 11, name: 'Class 11', books: ['Book AE', 'Book AF', 'Book AG'] },
        { id: 12, name: 'Class 12', books: ['Book AH', 'Book AI', 'Book AJ'] }
    ]);
    const [selectedClass, setSelectedClass] = useState(null);
    const [newBook, setNewBook] = useState('');

    const handleClassClick = (classId) => {
        setSelectedClass(classId);
    };

    const handleClosePopup = () => {
        setSelectedClass(null);
    };

    const handleAddBook = () => {
        if (newBook.trim() !== '') {
            const updatedClasses = [...classes];
            updatedClasses[selectedClass - 1].books.push(newBook);
            setNewBook('');
        }
    };

    const handlePrintBooks = () => {
        const booksToPrint = classes[selectedClass - 1].books.join('\n');
        const printWindow = window.open('', '_blank');
        printWindow.document.write('<pre>' + booksToPrint + '</pre>');
        printWindow.document.close();
        printWindow.print();
    };

    return (
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', padding: '20px', position: 'relative' }}>
            <h1 style={{ marginBottom: '20px' }}>Library Book List</h1>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', position: 'relative', zIndex: '1' }}>
                {classes.map(cls => (
                    <div key={cls.id} style={{ position: 'relative' }}>
                        <div style={{ width: '100px', height: '80px', backgroundColor: '#f0f0f0', borderRadius: '50%', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center', transition: 'background-color 0.3s ease, transform 0.2s ease', marginBottom: '20px', transform: 'translateY(-5px)' }} onClick={() => handleClassClick(cls.id)}>
                            <h2>Class {cls.id}</h2>
                        </div>
                        {selectedClass === cls.id && (
                            <div style={{ position: 'fixed', top: '0', left: '0', width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: '1', pointerEvents: 'auto', transition: 'opacity 0.3s ease', zIndex: '10' }}>
                                <div style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', zIndex: '1', width: '80%', maxWidth: '600px', opacity: '1', transform: 'scale(1)', transition: 'opacity 0.3s ease, transform 0.3s ease' }}>
                                    <h2>Books for Class {cls.id}</h2>
                                    <BookTable books={books} />
                                    <input
                                        type="text"
                                        value={newBook}
                                        onChange={(e) => setNewBook(e.target.value)}
                                        placeholder="Enter new book"
                                        style={{ marginBottom: '10px', padding: '8px', width: '100%', border: '1px solid #ccc', borderRadius: '4px' }}
                                    />
                                    <button style={{ marginTop: '10px', marginRight: '10px', backgroundColor: '#4caf50', color: '#fff', border: 'none', padding: '8px 16px', borderRadius: '4px', cursor: 'pointer', transition: 'background-color 0.3s ease' }} onClick={handleAddBook}>Add Book</button>
                                    <button style={{ marginTop: '10px', marginRight: '10px', backgroundColor: '#4caf50', color: '#fff', border: 'none', padding: '8px 16px', borderRadius: '4px', cursor: 'pointer', transition: 'background-color 0.3s ease' }} onClick={handleClosePopup}>Close</button>
                                    <button style={{ marginTop: '10px', marginRight: '10px', backgroundColor: '#4caf50', color: '#fff', border: 'none', padding: '8px 16px', borderRadius: '4px', cursor: 'pointer', transition: 'background-color 0.3s ease' }} onClick={handlePrintBooks}>Print Books</button>
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default BookList;
