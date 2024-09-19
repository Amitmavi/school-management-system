import SearchIcon from '@mui/icons-material/Search';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { addDoc, collection, getDocs, query, where, setDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { db } from "../../../utils/firebaseConfig";
import './addstudent.css';

function ClassSectionForm() {
  const [classes, setClasses] = useState([]);
  const [sections, setSections] = useState([]);
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedSection, setSelectedSection] = useState('');
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null); 
  const [isModalOpen, setIsModalOpen] = useState(false); 
  const [bookNameOptions, setBookNameOptions] = useState([]);
  const [selectedBookName, setSelectedBookName] = useState('');
  const [bookNumber, setBookNumber] = useState('');
  const [selectedStudentUID, setSelectedStudentUID] = useState('');

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

    const fetchBooks = async () => {
      try {
        const booksSnapshot = await getDocs(collection(db, 'librarybook'));
        const booksData = booksSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setBookNameOptions(booksData);
      } catch (error) {
        console.error('Error fetching books:', error);
      }
    };

    fetchClasses();
    fetchSections();
    fetchBooks();
  }, []);

  const getClassSectionFromId = (id) => {
    const parts = id.split(' ');
    return {
      class: parts[0],
      section: parts[1]
    };
  };

  const handleClassChange = (e) => {
    setSelectedClass(e.target.value);
  };

  const handleSectionChange = (e) => {
    setSelectedSection(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const studentsQuery = query(collection(db, 'students'),
        where('class', '==', selectedClass + " " + selectedSection),
      );
      const studentsSnapshot = await getDocs(studentsQuery);
      const studentsData = studentsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

      setStudents(studentsData);
      console.log(selectedStudent)
    } catch (error) {
      console.error('Error fetching students:', error);
    }
  };

  const handleAdd = (student) => {
    setSelectedStudent(student);
    setSelectedStudentUID(student.uid); 
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleConfirmAdd = async () => {
    try {
      if (!selectedStudentUID) {
        console.error('Error: No selected student UID');
        return;
      }
  
      const issueDate = new Date();
      const returnDate = new Date(issueDate);
      returnDate.setDate(returnDate.getDate() + 7); 
      const issueData = {
        bookName: selectedBookName,
        bookNumber: bookNumber,
        issueDate: issueDate.toLocaleDateString(), 
        returnDate: returnDate.toLocaleDateString(), 
        userType: "student",
        returned: false,
      };
  
      // Add the issue data to the library collection under the selected student's document
      const docRef = await addDoc(collection(db, 'students', selectedStudentUID, 'library'), issueData);
  
      // Get the ID of the newly added document
      const issueId = docRef.id;
  
      // Update the document with the issueId
      await setDoc(docRef, { ...issueData, issueId });
  
      console.log('Issue details saved successfully with ID: ', issueId);
  
      // Additionally, store the issue data in the 'library' collection along with issueId
       await addDoc(collection(db, 'library'), {
        studentUID: selectedStudentUID,
        issueId: issueId, // Store the issueId here
        ...issueData
      });
      console.log('Issue details saved to the library collection');
  
      setIsModalOpen(false); 
      toast.success("Issued successfully");
    } catch (error) {
      console.error('Error saving issue details:', error);
    }
  };
  
  
  

  const handleBookSelection = (e) => {
    const selectedBookId = e.target.value;
    setSelectedBookName(selectedBookId);

    const selectedBook = bookNameOptions.find(book => book.id === selectedBookId);
    if (selectedBook) {
      setBookNumber(selectedBook.bookNumber); 
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="class-section-form">
        <div className="form-row">
          <div className="form-field">
            <label htmlFor="classField">Class:</label>
            <select id="classField" value={selectedClass} onChange={handleClassChange} required style={{ width: '200px', height: '40px', padding: '5px', border: '1px solid #ccc', borderRadius: '4px' }}>
              <option value="">Select Class</option>
              {classes.map((cls, index) => (
                <option key={index} value={cls}>{cls}</option>
              ))}
            </select>
          </div>
          <div className="form-field">
            <label htmlFor="sectionField">Section:</label>
            <select id="sectionField" value={selectedSection} onChange={handleSectionChange} required style={{ width: '200px', height: '40px', padding: '5px', border: '1px solid #ccc', borderRadius: '4px' }}>
              <option value="">Select Section</option>
              {sections.map((sec, index) => (
                <option key={index} value={sec}>{sec}</option>
              ))}
            </select>

          </div>

          <div className="form-field">
            <Button  type='submit' variant="contained" startIcon={<SearchIcon />} style={{ marginTop: '27px', height: '40px' }}>
              Search
            </Button>
          </div>

        </div>
      </form>
      <div>
        {students.length > 0 ? (
          <table>
            <TableHead>
              <TableRow>
              <TableCell>Profile Picture</TableCell>
                <TableCell>Roll.No</TableCell>
                <TableCell>Full Name</TableCell>
                <TableCell>Dob</TableCell>
                <TableCell>Academic Year</TableCell>
                <TableCell>Add</TableCell>
              </TableRow>
            </TableHead>
            <tbody>
              {students.map((student, index) => (
                <TableRow key={index}>
               <TableCell><img src={student.profilePictureUrl} alt="Profile" style={{ width: '50px', height: '50px',borderRadius:'50px' }} /></TableCell>
                  <TableCell>{student.rollNo}</TableCell>
                  <TableCell>{student.firstName +" "+student.lastName}</TableCell>
                  <TableCell>{student.dob}</TableCell>
                  <TableCell>{student.academicYear}</TableCell>
                  <TableCell>
                    <Button variant="contained" color="primary" onClick={() => handleAdd(student)}>
                      ISSUE
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </tbody>
          </table>
        ) : (
          <p>Select the Class and Section</p>
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

export default ClassSectionForm;
