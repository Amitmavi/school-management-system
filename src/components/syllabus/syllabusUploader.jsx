import 'firebase/compat/firestore';
import 'firebase/compat/storage';
import { doc, getFirestore, setDoc } from 'firebase/firestore';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { auth } from '../../utils/firebaseConfig';
import './syllabus.css';


function SyllabusUploader() {
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileTypeCorrect, setFileTypeCorrect] = useState(true); 
  const [uploadProgress, setUploadProgress] = useState(0); 
  const [syllabusUrl, setSyllabusUrl] = useState(null);

  const classes = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII'];

  const handleClassChange = (e) => {
    setSelectedClass(e.target.value);
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleUpload = () => {
    
    if (auth.currentUser) {
      if (selectedClass && selectedFile) {
        if (selectedFile.type === 'application/pdf') {
          const storage = getStorage();
          const storageRef = ref(storage, `classes/syllabus/${selectedClass}/${selectedFile.name}`);
          const uploadTask = uploadBytesResumable(storageRef, selectedFile);

          uploadTask.on('state_changed',
            (snapshot) => {
              const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              setUploadProgress(progress);
            },
            (error) => {
              console.error('Error uploading file:', error);
            },
            async () => {
              // Upload complete
              const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
              setSyllabusUrl(downloadURL);
              toast.success("Upload successful:" + selectedFile.name);
              console.log(`Upload successful: ${selectedFile.name}`);
              setSelectedFile(null);
              setSelectedClass('');
              setUploadProgress(0);

              // Store URL in Firestore
              const db = getFirestore();
              const syllabusRef = doc(db, 'syllabus', selectedClass);
              await setDoc(syllabusRef, { syllabusUrl: downloadURL });
            }
          );
        } else {
          setFileTypeCorrect(false);
        }
      } else {
        console.error('Please select a class and a file.');
      }
    } else {
      console.error('User is not authenticated.'); // Handle authentication error
    }
  };

  return (
    <div className="main-content">
      <h1>Upload the Syllabus</h1>
      <br></br>
      <div className="form-group">
        <label htmlFor="classSelect">Select Class</label>
        <select id="classSelect" className="form-control" onChange={handleClassChange} value={selectedClass}>
          <option value="">Select Class</option>
          {classes.map((className, index) => (
            <option key={index} value={className}>{className}</option>
          ))}
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="fileInput">Choose Syllabus File</label>
        <br></br>
        <input type="file" id="fileInput" className="form-control-file" onChange={handleFileChange} />
      </div>
      <button className="button" style={{ width: '100px', height: '50px', marginTop: '1px' }} onClick={handleUpload}>Upload</button>

      {uploadProgress > 0 && uploadProgress < 100 && (
        <div className="progress-spinner">
          <p>Uploading{uploadProgress.toFixed(2)}%</p>
          <div className="spinner"></div>
        </div>
      )}

      {!fileTypeCorrect && (
        <p style={{ color: 'red' }}>Please attach a PDF file.</p>
      )}

      {selectedFile && (
        <div className="uploaded-file">
          <p>Uploaded File {selectedFile.name}</p>
        </div>
      )}

      {syllabusUrl && (
        <div className="syllabus-url">
          <p>Syllabus URL <a href={syllabusUrl} target="_blank" rel="noopener noreferrer">{syllabusUrl}</a></p>
        </div>
      )}
    </div>
  );
}

export default SyllabusUploader;
