import React, { useState, useEffect } from 'react';
import { Table, TableHead, TableBody, TableRow, TableCell, Typography } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import DeleteIcon from '@mui/icons-material/Delete';
import { getFirestore, doc, getDoc, collection, addDoc, updateDoc, deleteDoc, query, getDocs } from 'firebase/firestore';
import {getStorage, ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';

const StudentDocuments = ({ studentUid }) => {
  const [documents, setDocuments] = useState([]);
  const [documentType, setDocumentType] = useState('');
  const [file, setFile] = useState(null);
  const db = getFirestore();

  const storage = getStorage();

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const documentsQuery = query(collection(db, 'students', studentUid, 'documents'));
        const documentsSnapshot = await getDocs(documentsQuery);
        const documentsData = [];
        documentsSnapshot.forEach(doc => {
          documentsData.push({ id: doc.id, ...doc.data() });
        });
        setDocuments(documentsData);
      } catch (error) {
        console.error('Error fetching documents:', error);
      }
    };
    if (studentUid) {
      fetchDocuments();
    }
  }, [db, studentUid]);

  const handleSaveDocument = async () => {
    if (documentType !== '' && file !== null) {
      try {
        const studentRef = doc(db, "students", studentUid);
        const newDocument = {
          type: documentType,
          status: 'Uploaded',
        };

        const docRef = await addDoc(collection(studentRef, 'documents'), newDocument);
        const storageRef = ref(storage, `documents/${studentUid}/${docRef.id}/${file.name}`);
        await uploadBytes(storageRef, file);
        const downloadURL = await getDownloadURL(storageRef);

        // Determine file type
        let fileType;
        if (file.type.includes('image')) {
          fileType = 'image';
        } else if (file.type.includes('pdf')) {
          fileType = 'pdf';
        } else {
          fileType = 'other';
        }

        // Update newDocument object to include downloadURL and fileType
        newDocument.fileURL = downloadURL;
        newDocument.fileType = fileType;

        // Add newDocument to Firestore
        await updateDoc(docRef, newDocument);

        // Fetch updated documents from Firestore after saving
        const updatedDocumentsQuery = query(collection(db, "students", studentUid, "documents"));
        const updatedDocumentsSnapshot = await getDocs(updatedDocumentsQuery);
        const updatedDocumentsData = [];
        updatedDocumentsSnapshot.forEach((doc) => {
          updatedDocumentsData.push({ id: doc.id, ...doc.data() });
        });
        setDocuments(updatedDocumentsData);

        setDocumentType('');
        setFile(null);
      } catch (error) {
        console.error("Error saving document:", error);
      }
    } else {
      alert('Please select a document type and upload a file.');
    }
  };

  const handleFileUpload = (e) => {
    setFile(e.target.files[0]);
    setDocumentType(""); // Reset documentType when file is uploaded
  };

  const handleDeleteDocument = async (id) => {
    try {
      // Delete document from Firestore
      const docRef = doc(db, "students", studentUid, "documents", id);
      await deleteDoc(docRef);

      // Delete document from storage if it exists
      const documentData = (await getDoc(docRef)).data();
      if (documentData) {
        const filePath = `documents/${studentUid}/${id}/${documentData.type}`;
        const fileRef = ref(storage, filePath);
        const fileSnapshot = await getDownloadURL(fileRef);

        if (fileSnapshot) {
          await deleteObject(fileRef);
        }
      }

      // Remove document from state
      setDocuments(prevDocuments => prevDocuments.filter(doc => doc.id !== id));
    } catch (error) {
      console.error("Error deleting document:", error);
    }
  };
  return (
    <div>
    <Typography variant="h5">Documents</Typography>
            <div>
              <label htmlFor="document-type">Select Document Type:</label>
              <select
                id="document-type"
                value={documentType}
                onChange={(e) => setDocumentType(e.target.value)}
              >
                <option value="">Select Document Type</option>
                <option value="Aadhar Card">Aadhar Card</option>
                <option value="Pan Card">Pan Card</option>
                {/* Add more document types as needed */}
              </select>
              <input
                type="file"
                accept=".pdf,.doc,.docx,image/*"
                onChange={handleFileUpload}
              />
              <button
                onClick={handleSaveDocument}
                style={{
                  padding: '4px 8px',
                  borderRadius: '8px',
                  backgroundColor: 'skyblue',
                  color: 'black',
                  float: 'right',
                  display: 'flex', // Use flexbox
                  alignItems: 'center', // Align items vertically
                }}
              >
                <SaveIcon style={{ marginRight: '5px' }} />
                Save
              </button>

            </div>
            <br></br>
            {/* Display saved documents */}
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Sr. No.</TableCell>
                  <TableCell>Document Type</TableCell>
                  <TableCell>File Type</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>File Preview</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {documents.map((document, index) => (
                  <TableRow key={index}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{document.type}</TableCell>
                    <TableCell>Image</TableCell>
                    <TableCell>{document.status}</TableCell>
                    <TableCell>
                      {document.fileURL ? (
                        <a href={document.fileURL} target="_blank" rel="noopener noreferrer">View</a>
                      ) : (
                        "No file uploaded"
                      )}
                    </TableCell>
                    <TableCell>
                      {document.fileURL ? (
                        <div>


                          <button onClick={() => handleDeleteDocument(document.id)} style={{ display: 'inline-flex', marginLeft: '10px' }}>
                            <DeleteIcon style={{ marginRight: '5px' }} />
                            Delete
                          </button>
                        </div>
                      ) : (
                        <input
                          type="file"
                          accept=".pdf,.doc,.docx,image/*"
                          onChange={(e) => handleFileUpload(e, index)}
                        />
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
    </div>
  );
};
export default StudentDocuments;