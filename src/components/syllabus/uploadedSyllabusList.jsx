import { collection, deleteDoc, doc, getDocs, getFirestore } from 'firebase/firestore';
import { deleteObject, getStorage, ref } from 'firebase/storage';
import React, { useEffect, useState } from 'react';

import 'firebase/compat/firestore';
import 'firebase/compat/storage';

import './syllabus.css';

function UploadedSyllabusList() {
  const [uploadHistory, setUploadHistory] = useState([]);

  useEffect(() => {
    const fetchUploadHistory = async () => {
      try {
        const db = getFirestore();
        const syllabusCollection = collection(db, 'syllabus');
        const snapshot = await getDocs(syllabusCollection);

        const history = [];
        snapshot.forEach((doc) => {
          history.push({ id: doc.id, ...doc.data() });
        });
        setUploadHistory(history);
      } catch (error) {
        console.error('Error fetching upload history:', error);
      }
    };

    fetchUploadHistory();
  }, []);

  const handleRemove = async (id, fileName) => {
    try {
      // Delete document from Firestore
      const db = getFirestore();
      const syllabusDocRef = doc(db, 'syllabus', id);
      await deleteDoc(syllabusDocRef);
  
      // Delete folder from Storage
      const storage = getStorage();
      const folderRef = ref(storage, `classes/syllabus/${id}/${fileName}`);
      await deleteObject(folderRef);
  
      // Update state after successful deletion
      setUploadHistory(uploadHistory.filter((file) => file.id !== id));
    } catch (error) {
      console.error('Error removing syllabus:', error);
    }
  };
  

  const handleView = (fileUrl) => {
    window.open(fileUrl, '_blank');
  };

  return (
    <div className="syllabus-uploader">
      <div className="side-panel">
        <div className="upload-history-panel">
          <h2>Uploaded Syllabus</h2>
          <table>
            <thead>
              <tr>
                <th>Class</th>
                <th>View</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {uploadHistory.map((file, index) => (
                <tr key={index}>
                  <td>{file.id}</td>
                  <td>
                    <button className="button" onClick={() => handleView(file.syllabusUrl)}>View PDF</button>
                  </td>
                  <td>
                    <button className="button" onClick={() => handleRemove(file.id, file.name)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default UploadedSyllabusList;
