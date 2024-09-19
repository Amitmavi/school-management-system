import React, { useState } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import CircularProgress from '@mui/material/CircularProgress';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { getFirestore, collection, updateDoc, doc, getDocs} from 'firebase/firestore';

const ShowAllClass = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [rows, setRows] = useState([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedClass, setSelectedClass] = useState(null);
  const [editedClass, setEditedClass] = useState({});

  const handleEditClick = (classData) => {
    setSelectedClass(classData);
    setEditedClass({ ...classData });
    setIsEditModalOpen(true);
  };

  const handleModalClose = () => {
    setIsEditModalOpen(false);
  };

  const handleSave = async () => {
    try {
      const db = getFirestore();
      const classRef = doc(db, 'classes', selectedClass.id);
      await updateDoc(classRef, editedClass);
      console.log('Class details updated successfully.');
    } catch (error) {
      console.error('Error updating class details:', error);
    }
    setIsEditModalOpen(false);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEditedClass({ ...editedClass, [name]: value });
  };

  React.useEffect(() => {
    const fetchClasses = async () => {
      try {
        const db = getFirestore();
        const classesCollection = collection(db, 'classes');
        const snapshot = await getDocs(classesCollection);
        const classData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setRows(classData);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching classes:', error);
      }
    };

    fetchClasses();
  }, []);

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell> <b>Class</b></TableCell>
              <TableCell align="right"><b>Class Teacher Name</b></TableCell>
              <TableCell align="right"><b>Total Present Students</b></TableCell>
              <TableCell align="right"><b>Total Students</b></TableCell>
              <TableCell align="right"><b>Action</b></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  <CircularProgress />
                </TableCell>
              </TableRow>
            ) : (
              rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <b>{row.className} - {row.classSection}</b>
                    </TableCell>
                    <TableCell align="right">
                      <b>{row.classTeacherName}</b>
                    </TableCell>
                    <TableCell align="right">{row.totalPresentStudents}</TableCell>
                    <TableCell align="right">{row.totalStudents}</TableCell>
                    <TableCell align="right">
                      <IconButton aria-label="edit" onClick={() => handleEditClick(row)}>
                        <EditIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))
            )}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>
      <Modal open={isEditModalOpen} onClose={handleModalClose}>
        <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, bgcolor: 'background.paper', boxShadow: 24, p: 4 }}>
          <h2>Edit Class Details</h2>
          <TextField name="className" label="Class Name" value={editedClass.className || ''} onChange={handleInputChange} fullWidth />
          <TextField name="classSection" label="Class Section" value={editedClass.classSection || ''} onChange={handleInputChange} fullWidth />
          <TextField name="classTeacherName" label="Class Teacher Name" value={editedClass.classTeacherName || ''} onChange={handleInputChange} fullWidth />
          <TextField name="totalPresentStudents" label="Total Present Students" type="number" value={editedClass.totalPresentStudents || ''} onChange={handleInputChange} fullWidth />
          <TextField name="totalStudents" label="Total Students" type="number" value={editedClass.totalStudents || ''} onChange={handleInputChange} fullWidth />
          <Button variant="contained" onClick={handleSave}>Save</Button>
        </Box>
      </Modal>
    </>
  );
};

export default ShowAllClass;
