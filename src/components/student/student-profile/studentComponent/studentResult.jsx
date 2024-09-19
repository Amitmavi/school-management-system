import React, { useEffect, useState } from 'react';
import { Table, TableHead, TableBody, TableRow, TableCell, Typography } from '@mui/material';
import { getFirestore, doc, getDoc, collection, getDocs } from 'firebase/firestore';

const StudentResult = ({ studentUid }) => {
  const [results, setResults] = useState([]);


  useEffect(() => {
    const fetchResults = async () => {
      try {
        const db = getFirestore();
        const studentRef = doc(db, 'students', studentUid);
        const studentDoc = await getDoc(studentRef);
        const studentData = studentDoc.data();
        const studentClass = studentData?.class;

        if (!studentClass) {
          console.error('Student class not found.');
          return;
        }

        const subjectsRef = collection(db, 'classes', studentClass, 'subjects');
        const subjectsSnapshot = await getDocs(subjectsRef);

        const resultsData = [];
        for (const subjectDoc of subjectsSnapshot.docs) {
          const subjectData = subjectDoc.data();
          const subjectName = subjectDoc.id;
          const marksRef = collection(subjectDoc.ref, 'marks');
          const marksSnapshot = await getDocs(marksRef);
          const marksData = {};
          console.log('subjectData:', subjectData);
          marksSnapshot.forEach(marksDoc => {
            const marksType = marksDoc.id;
            const marks = marksDoc.data();
            marksData[marksType] = marks[studentUid] || 'Marks not available';
          });

          resultsData.push({ subject: subjectName, marks: marksData });
        }

        setResults(resultsData);
      } catch (error) {
        console.error('Error fetching results:', error);
      }
    };

    if (studentUid) {
      fetchResults();
    }
  }, [studentUid]);

  return (
    <div>
       <Typography variant="h5">Results Table</Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell align="center"><strong>Subject</strong></TableCell>
            <TableCell align="center"><strong>Marks</strong></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {results.map(({ subject, marks }) => (
            <TableRow key={subject}>
              <TableCell align="center">{subject}</TableCell>
              <TableCell align="center">
                <ul style={{ listStyleType: 'none', padding: 0, margin: 0 }}>
                  {Object.entries(marks).map(([marksType, studentMarks]) => (
                    <li key={marksType}>
                      <strong>{marksType}:</strong> {studentMarks}
                    </li>
                  ))}
                </ul>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default StudentResult;
