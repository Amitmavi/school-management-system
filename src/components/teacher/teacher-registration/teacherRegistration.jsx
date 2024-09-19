import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, getFirestore, setDoc } from "firebase/firestore";
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";
import React, { useState } from "react";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { auth } from "../../../utils/firebaseConfig";
import "./teacherRegistration.css";

const TeacherAdd = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    number: "",
    dob: "",
    password: "",
    profilePicture: "",
    address: "",
    city: "",
    degreeType: "",
    education: "",
    experience: "",
    gender: "",
    pincode: "",
    position: "",
    state: "",
    subjects: "",
    registrationDate: "",
  });
  const [profilePictureFile, setProfilePictureFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0];
    setProfilePictureFile(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
  
    // Basic form validation
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.dob) {
      setError("Please fill out all required fields.");
      setIsSubmitting(false);
      return;
    }
  
    try {
      // Generate password
      const password = `${formData.firstName.toLowerCase()}@${new Date().getFullYear()}`;
  
      // Create user with generated password
      const { email } = formData;
      await createUserWithEmailAndPassword(auth, email, password);
  
      const user = auth.currentUser;
      const uid = user.uid;
  
      let profilePictureUrl = "";
      if (profilePictureFile) {
        const storage = getStorage();
        const storageRef = ref(storage, `profilePictures/${uid}`);
        const uploadTask = uploadBytesResumable(storageRef, profilePictureFile);
  
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log("Upload is " + progress + "% done");
          },
          (error) => {
            console.error("Upload failed:", error);
            setError(error.message);
            toast.error(error.message);
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              console.log("File available at", downloadURL);
              profilePictureUrl = downloadURL;
              const db = getFirestore();
              const teacherRef = doc(db, "teachers", uid);
              const registrationDate = new Date().toISOString();
              setDoc(teacherRef, {
                ...formData,
                userType: "teacher",
                password: password,
                profilePicture: profilePictureUrl,
                registrationDate: registrationDate,
              })
                .then(() => {
                  setFormData({
                    firstName: "",
                    lastName: "",
                    email: "",
                    number: "",
                    dob: "",
                    registrationDate: "",
                    profilePicture: "",
                    address: "",
                    city: "",
                    degreeType: "",
                    education: "",
                    experience: "",
                    gender: "",
                    pincode: "",
                    position: "",
                    state: "",
                    subjects: "",
                  });
                  setProfilePictureFile(null);
                  setIsSubmitted(true);
                  setIsSubmitting(false);
                  setError(null);
                  console.log("Data stored successfully!");
                  toast.success("Teacher registered successfully");
                })
                .catch((error) => {
                  console.error("Error storing data:", error.message);
                  setIsSubmitting(false);
                  setError(error.message);
                  toast.error(error.message);
                });
            });
          }
        );
      } else {
        // Handle case where profile picture is not provided
        setError("Please upload a profile picture.");
        setIsSubmitting(false);
      }
    } catch (error) {
      console.error("Error storing data:", error.message);
      toast.error(error.message);
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
       <div className="form-row" style={{ display: 'flex', flexWrap: 'wrap', marginBottom: '5px' }}>
      <div className="form-field" style={{ flex: 1, marginRight: '20px' }}>
        <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px' }}>First Name</label>
        <input
          type="text"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          style={{ width: '100%', padding: '10px', marginBottom: '5px', border: '1px solid #ccc', borderRadius: '4px', boxSizing: 'border-box', fontSize: '16px' }}
        />
      </div>
      <div className="form-field" style={{ flex: 1 }}>
        <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px' }}>Last Name</label>
        <input
          type="text"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          style={{ width: '100%', padding: '10px', marginBottom: '10px', border: '1px solid #ccc', borderRadius: '4px', boxSizing: 'border-box', fontSize: '16px' }}
        />
      </div>
    </div>
    <div className="form-row"  style={{ display: 'flex', flexWrap: 'wrap', marginBottom: '5px' }}>
      <div className="form-field" style={{ flex: 1, marginRight: '20px' }}>
        <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px' }}>Mobile No</label>
        <input
          type="number"
          name="number"
          value={formData.number}
          onChange={handleChange}
          style={{ width: '100%', padding: '10px', marginBottom: '10px', border: '1px solid #ccc', borderRadius: '4px', boxSizing: 'border-box', fontSize: '16px' }}
        />
      </div>
      <div className="form-field" style={{ flex: 1 }}>
        <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px' }}>Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          style={{ width: '90%', padding: '10px', marginBottom: '10px', border: '1px solid #ccc', borderRadius: '4px', boxSizing: 'border-box', fontSize: '16px' }}
        />
      </div>
    </div>
    <div className="form-row"  style={{ display: 'flex', flexWrap: 'wrap', marginBottom: '5px' }}>
  <div className="form-field" style={{ flex: 1, marginRight: '20px' }}>
    <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px' }}>Date of Birth</label>
    <input
      type="date"
      name="dob"
      value={formData.dob}
      onChange={handleChange}
      style={{ width: '100%', padding: '10px', marginBottom: '10px', border: '1px solid #ccc', borderRadius: '4px', boxSizing: 'border-box', fontSize: '16px' }}
    />
  </div>
  <div className="form-field" style={{ flex: 1 }}>
    <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px' }}>Gender</label>
    <select
      name="gender"
      value={formData.gender}
      onChange={handleChange}
      style={{ width: '100%', padding: '10px', marginBottom: '10px', border: '1px solid #ccc', borderRadius: '4px', boxSizing: 'border-box', fontSize: '16px' }}
    >
      <option value="">Select gender</option>
      <option value="male">Male</option>
      <option value="female">Female</option>
      <option value="transgender">Transgender</option>
    </select>
  </div>
</div>
<div className="form-row"  style={{ display: 'flex', flexWrap: 'wrap', marginBottom: '5px' }}>
  <div className="form-field" style={{ flex: 1, marginRight: '20px' }}>
    <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px' }}>Address</label>
    <input
      type="text"
      name="address"
      value={formData.address}
      onChange={handleChange}
      style={{ width: '100%', padding: '10px', marginBottom: '10px', border: '1px solid #ccc', borderRadius: '4px', boxSizing: 'border-box', fontSize: '16px' }}
    />
  </div>
  <div className="form-field" style={{ flex: 1 }}>
    <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px' }}>City</label>
    <input
      type="text"
      name="city"
      value={formData.city}
      onChange={handleChange}
      style={{ width: '100%', padding: '10px', marginBottom: '10px', border: '1px solid #ccc', borderRadius: '4px', boxSizing: 'border-box', fontSize: '16px' }}
    />
  </div>
</div>
<div className="form-row"  style={{ display: 'flex', flexWrap: 'wrap', marginBottom: '5px' }}>
<div className="form-field" style={{ flex: 1, marginRight: '20px' }}>
    <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px' }}>Pincode</label>
    <input
      type="text"
      name="pincode"
      value={formData.pincode}
      onChange={handleChange}
      style={{ width: '100%', padding: '10px', marginBottom: '10px', border: '1px solid #ccc', borderRadius: '4px', boxSizing: 'border-box', fontSize: '16px' }}
    />
  </div>
  <div className="form-field" style={{ flex: 1 }}>
    <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px' }}>Education</label>
    <input
      type="text"
      name="education"
      value={formData.education}
      onChange={handleChange}
      style={{ width: '100%', padding: '10px', marginBottom: '10px', border: '1px solid  #ccc', borderRadius: '4px', boxSizing: 'border-box', fontSize: '16px'}}
      />
    </div>
</div>
<div className="form-row"  style={{ display: 'flex', flexWrap: 'wrap', marginBottom: '5px' }}>
  <div className="form-field" style={{ flex: 1, marginRight: '20px' }}>
    <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px' }}>Degree Type</label>
    <input
      type="text"
      name="degreeType"
      value={formData.degreeType}
      onChange={handleChange}
      style={{ width: '100%', padding: '10px', marginBottom: '10px', border: '1px solid #ccc', borderRadius: '4px', boxSizing: 'border-box', fontSize: '16px' }}
    />
  </div>
  <div className="form-field" style={{ flex: 1 }}>
      <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px' }}>Position</label>
      <input
        type="text"
        name="position"
        value={formData.position}
        onChange={handleChange}
        style={{ width: '100%', padding: '10px', marginBottom: '10px', border: '1px solid #ccc', borderRadius: '4px', boxSizing: 'border-box', fontSize: '16px' }}
      />
    </div>
  </div>
  <div className="form-row"  style={{ display: 'flex', flexWrap: 'wrap', marginBottom: '5px' }}>
    <div className="form-field" style={{ flex: 1, marginRight: '20px' }}>
      <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px' }}>Experience</label>
      <input
        type="text"
        name="experience"
        value={formData.experience}
        onChange={handleChange}
        style={{ width: '100%', padding: '10px', marginBottom: '10px', border: '1px solid #ccc', borderRadius: '4px', boxSizing: 'border-box', fontSize: '16px' }}
      />
    </div>
    <div className="form-field" style={{ flex: 1 }}>
      <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px' }}>Subjects</label>
      <input
        type="text"
        name="subject"
        value={formData.position}
        onChange={handleChange}
        style={{ width: '100%', padding: '10px', marginBottom: '10px', border: '1px solid #ccc', borderRadius: '4px', boxSizing: 'border-box', fontSize: '16px' }}
      />
    </div>
  </div>
  <div className="form-row"  style={{ display: 'flex', flexWrap: 'wrap', marginBottom: '5px' }}>
    <div className="form-field" style={{ flex: 1, marginRight: '20px' }}>
      <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px' }}>State</label>
      <input
        type="text"
        name="state"
        value={formData.state}
        onChange={handleChange}
        style={{ width: '100%', padding: '10px', marginBottom: '10px', border: '1px solid #ccc', borderRadius: '4px', boxSizing: 'border-box', fontSize: '16px' }}
      />
    </div>
    <div className="form-field" style={{ flex: 1 }}>
      <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px' }}>Profile Picture</label>
      <input
        type="file"
        accept="image/*"
        onChange={handleProfilePictureChange}
        style={{ width: '100%', padding: '10px', marginBottom: '10px', border: '1px solid #ccc', borderRadius: '4px', boxSizing: 'border-box', fontSize: '16px' }}
      />
    </div>
  </div>
  <div className="form-row"  style={{ display: 'flex', flexWrap: 'wrap', marginBottom: '5px' }}>
    <div className="form-field" style={{ flex: 1, marginRight: '20px' }}>
      <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px' }}>Teacher Type</label>
      <select
        name="teacherType"
        value={formData.teacherType}
        onChange={handleChange}
        style={{ width: '100%', padding: '10px', marginBottom: '10px', border: '1px solid #ccc', borderRadius: '4px', boxSizing: 'border-box', fontSize: '16px', background: '#fff', color: '#333' }}
      >
        <option value="">Select teacher type</option>
        <option value="librarian">Librarian</option>
        <option value="teacher">Teacher</option>
      </select>
    </div>
      </div>
        <button 
  type="submit"
  disabled={isSubmitting}
  style={{
    backgroundColor: '#007bff', // Change the color as needed
    color: '#fff',  
    padding: '10px 20px',       // Adjust padding as needed
    border: 'none',             // Optionally, remove the border
    borderRadius: '5px',        // Optionally, add border radius
    cursor: 'pointer',          // Optionally, change cursor on hover
    width: '5rem',
    height: '40px',
    fontSize: '14px',
    marginLeft: '465px'
    // Add more styles as needed
  }}
>
  {isSubmitting ? "Submitting..." : "Submit"}
</button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {isSubmitted && <p>Data submitted successfully!</p>}
    </div>
  );
};

export default TeacherAdd;

