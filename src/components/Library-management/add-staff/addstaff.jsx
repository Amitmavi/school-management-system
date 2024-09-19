import SearchIcon from '@mui/icons-material/Search';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { addDoc, collection, doc, getDocs, query, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { db } from '../../../utils/firebaseConfig';

function StaffSectionForm() {
  const [teachers, setTeachers] = useState([]);
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBookName, setSelectedBookName] = useState('');
  const [bookNumber, setBookNumber] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [bookNameOptions, setBookNameOptions] = useState([]);

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        let teachersQuery = collection(db, 'teachers');
        
        if (searchQuery !== '') {
          teachersQuery = query(teachersQuery, where('firstName', '>=', searchQuery), where('firstName', '<=', searchQuery + '\uf8ff'));
        }

        const teachersSnapshot = await getDocs(teachersQuery);
        const teachersData = teachersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setTeachers(teachersData);
      } catch (error) {
        console.error('Error fetching teachers:', error);
      }
    };

    const fetchBooks = async () => {
      try {
        const booksSnapshot = await getDocs(collection(db, 'librarybook'));
        const booksData = booksSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setBookNameOptions(booksData);
      } catch (error) {
        console.error('Error fetching books:', error);
      }
    };

    fetchTeachers();
    fetchBooks();
  }, [searchQuery]);

  const handleTeacherSelect = (teacher) => {
    setSelectedTeacher(teacher);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleBookSelection = (e) => {
    const selectedBookId = e.target.value;
    setSelectedBookName(selectedBookId);
    // Find the selected book
    const selectedBook = bookNameOptions.find(book => book.id === selectedBookId);
    if (selectedBook) {
      setBookNumber(selectedBook.bookNumber);
    } else {
      setBookNumber(''); // Reset book number if book not found
    }
  };

  const handleConfirmAdd = async () => {
    try {
      // Ensure selectedTeacher is defined
      if (!selectedTeacher) {
        console.error('Error: No selected teacher');
        return;
      }

      // Construct the data object to be saved in Firestore
      const issueDate = new Date();
      const returnDate = new Date(issueDate);
      returnDate.setDate(returnDate.getDate() + 7); // Add 7 days to issue date for return date
      const issueData = {
        bookName: selectedBookName,
        bookNumber: bookNumber,
        issueDate: issueDate.toLocaleDateString(), // Generate the issue date dynamically
        returnDate: returnDate.toLocaleDateString(), // Generate the return date dynamically
        userType:"teacher",
        returned: false // Set the initial book status as not returned
      };

      // Add the issue data to the library collection under the selected teacher's document
      const teacherRef = doc(db, 'teachers', selectedTeacher.id); // Reference to the selected teacher's document
      await addDoc(collection(teacherRef, 'library'), issueData); // Add issue data to the 'library' collection under the selected teacher
      toast.success("Issued successfully");
      console.log('Issue details saved successfully.');
      
      // Additionally, store the issue data in the 'library' collection
      const libraryRef = collection(db, 'library'); // Reference to the 'library' collection
      await addDoc(libraryRef, {
        teacherId: selectedTeacher.id,
        ...issueData
      }); // Add issue data to the 'library' collection
      console.log('Issue details saved to the library collection.');

    } catch (error) {
      console.error('Error saving issue details:', error);
    }

    handleCloseModal();
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div>
      <div style={{ marginBottom: '10px' }}>
        <input
          type="text"
          placeholder="Search teachers..."
          value={searchQuery}
          onChange={handleSearch}
          style={{ padding: '5px', fontSize: '16px', width: '200px' }}
        />
        <SearchIcon style={{ marginLeft: '10px', cursor: 'pointer' }} />
      </div>
      <div>
        {teachers.length > 0 ? (
          <table>
            <TableHead>
              <TableRow>
                <TableCell>Profile Picture</TableCell>
                <TableCell>Teacher's Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <tbody>
              {teachers.map((teacher, index) => (
                <TableRow key={index}>
                  <TableCell><img src={teacher.profilePicture} alt="Profile" style={{ width: '50px', height: '50px', borderRadius: '50px' }} /></TableCell>
                  <TableCell>{teacher.firstName + " " + teacher.lastName}</TableCell>
                  <TableCell>{teacher.email}</TableCell>
                  <TableCell>
                    <Button variant="contained" color="primary" onClick={() => handleTeacherSelect(teacher)}>
                      ISSUE
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No teachers available</p>
        )}
      </div>
      <Modal open={isModalOpen} onClose={handleCloseModal}>
      <div style={{ border: '1px solid #ccc', backgroundColor: 'whitesmoke', borderRadius: '5px', padding: '20px', maxWidth: '400px', margin: '0 auto', marginTop: '200px' }}>
  <label htmlFor="bookName">Book Name</label>
  <select id="bookName" name="bookName" value={selectedBookName} onChange={handleBookSelection}>
    <option value="">Select Book</option>
    {/* Populate book options */}
    {bookNameOptions.map((book, index) => (
      <option key={index} value={book.id}>{book.title}</option>
    ))}  
  </select>
  <label htmlFor="bookNo">Book No.</label>
  <input type="text" id="bookNo" name="bookNo" value={bookNumber} readOnly />
  <p>Issue Date: {new Date().toLocaleDateString()}</p><br></br>
  <p>Return Date: {new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString()}</p> <br></br>
  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1px' }}>
 <Button variant="contained" color="primary" onClick={handleConfirmAdd}>
    Issue
  </Button>
  <Button style={{ marginRight: '220px' }} variant="contained" onClick={handleCloseModal}>
    Close
  </Button>
</div>
</div>
</Modal>
    </div>
  );
}

export default StaffSectionForm;
