// studentAdmissionForm.js
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { Button, Step, StepLabel, Stepper, Typography } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';
import { collection, getDocs, getFirestore, limit, orderBy, query } from 'firebase/firestore';
import React, { useEffect, useState } from "react";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { saveAdmissionInfo } from './saveAdmissionInfo';
import "./studentAdmissionForm.css";
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';

const StudentAdmissionForm = () => {
  const [admissionNumber, setAdmissionNumber] = useState('');
  const [activeStep, setActiveStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState({
    // Students Information
    firstName: '',
    lastName: '',
    profilePicture: "",
    dob: '',
    admissionDate: '',
    adharUid: '',
    address: '',
    city: '',
    state: '',
    gender: '',
    bloodGroup: '',
    religion: '',
    height: '',
    weight: '',
    StudentNumber: '',
    medicalHistory: '',
    userType: 'student',
    // Academic Information
    class: '',
    academicYear: '',
    housr: '',
    sprots: '',

    //{parenths Information}

    //Father
    fatherName: '',
    fatherPhone: '',
    fatherOccupation: '',
    fatherEmail: '',

    //Mother
    motherName: '',
    motherPhone: '',
    motherOccupation: '',
    motherEmail: '',

    //guardian
    guardianName: '',
    guardianPhone: '',
    guardianOccupation: '',
    guardianEmail: '',
    // Add other fields here
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevUserData) => ({
      ...prevUserData,
      [name]: value,
    }));
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Get Firebase authentication
    const auth = getAuth();
    const email = `${admissionNumber}@pulsezest.com`;

    // Create password
    const password = `${userData.firstName}@${new Date(userData.dob).getFullYear()}`;

    // Add admission number to userData
    const userDataWithAdmissionNumber = {
      ...userData,
      admissionNumber: admissionNumber
    };

    // Create the user with email and password
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      const uid = user.uid;

      // Now use the UID to save admission info
      const success = await saveAdmissionInfo(uid, {
        ...userDataWithAdmissionNumber,
        email,
        password
      });

      if (success) {
        // Clear the input fields after successful submission
        setUserData({
          // Students Information
          firstName: '',
          lastName: '',
          profilePicture:'',
          dob: '',
          admissionDate: '',
          adharUid: '',
          address: '',
          city: '',
          state: '',
          gender: '',
          bloodGroup: '',
          religion: '',
          height: '',
          weight: '',
          studentPhone: '',
          medicalHistory: '',

          // Academic Information
          class: '',
          academicYear: '',
          housr: '',
          sprots: '',

          //{parenths Information}

          //Father
          fatherName: '',
          fatherNumber: '',
          fatherOccupation: '',
          fatherEmail: '',

          //Mother
          motherName: '',
          motherNumber: '',
          motherOccupation: '',
          motherEmail: '',

          //guardian
          guardianName: '',
          guardianNumber: '',
          guardianOccupation: '',
          guardianEmail: '',
        });
        setLoading(false);
        toast.success('Data saved successfully!');
      } else {
        setLoading(false);
        toast.error('Error saving data. Please try again later.');
      }
    } catch (error) {
      setLoading(false);
      console.error('Error creating user:', error);
      toast.error('Error creating user. Please try again later.');
    }
  };

  useEffect(() => {
    // Fetch the latest admission number when the component mounts
    getLatestAdmissionNumber().then((latestNumber) => {
      // Increment the latest admission number by 1 to generate the new admission number
      const newAdmissionNumber = latestNumber ? latestNumber + 1 : 1;
      setAdmissionNumber(newAdmissionNumber);
      console.log(newAdmissionNumber);
    }).catch((error) => {
      console.error('Error fetching latest admission number:', error);
      toast.error('Error fetching latest admission number. Please try again later.');
    });
}, [setAdmissionNumber]); // Adding setAdmissionNumber as dependency


  const getLatestAdmissionNumber = async () => {
    const db = getFirestore();
    const admissionCollection = collection(db, 'students');
    try {
      const querySnapshot = await getDocs(
        query(admissionCollection, orderBy('admissionNumber', 'desc'), limit(1))
      );
      if (!querySnapshot.empty) {
        const latestAdmission = querySnapshot.docs[0].data();
        const admissionNumber = latestAdmission.admissionNumber;
        console.log('Latest admission number:', admissionNumber);
        return admissionNumber;
      } else {
        // If no admission records found, set admission number to 1
        console.log('No admission records found. Setting admission number to 1.');
        return 1;
      }
    } catch (error) {
      console.error('Error fetching latest admission number:', error);
      throw error; // Throw error if unable to fetch the latest admission number
    }
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };


  const handleNextOrSubmit = (e) => {
    if (activeStep === steps.length - 1) {
      handleSubmit(e); // Pass the event object to handleSubmit
    } else {
      handleNext(); // Otherwise, proceed to the next step
    }
  };

  const steps = ["Student Details", "Parent Details", "Facilities"];

  const renderStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <div>
            {/* Admission Number */}
            <Typography align="right">{"Admission Number: "+admissionNumber}</Typography>
            <div style={{ marginBottom: "20px" }}></div>
            <h2>Student Personal Details</h2>
            <div style={{ marginBottom: "20px" }}></div>

            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between" }}>
            

              {/* First Name */}
              <div style={{ width: "calc(25% - 10px)", marginBottom: "20px" }}>
                <TextField
                  id="firstName"
                  name="firstName"
                  label="First Name"
                  value={userData.firstName}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Last Name */}
              <div style={{ width: "calc(25% - 10px)", marginBottom: "20px" }}>
                <TextField
                  id="lastName"
                  name="lastName"
                  label="Last Name"
                  value={userData.lastName}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Adhar Number */}
              <div style={{ width: "calc(25% - 10px)", marginBottom: "20px" }}>
                <TextField
                  id="adharNumber"
                  name="adharUid"
                  label="Adhar Number"
                  type="number"
                  value={userData.adharUid}
                  onChange={handleChange}
                  required
                />
              </div>

             


              {/* Address */}
              <div style={{ width: "calc(25% - 10px)", marginBottom: "20px" }}>
                <TextField
                  id="address"
                  name="address"
                  label="Address"
                  value={userData.address}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* City */}
              <div style={{ width: "calc(25% - 10px)", marginBottom: "20px" }}>
                <TextField
                  id="city"
                  name="city"
                  label="City"
                  value={userData.city}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* State */}
              <div style={{ width: "calc(25% - 10px)", marginBottom: "20px" }}>
                <TextField
                  id="state"
                  name="state"
                  label="State"
                  value={userData.state}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Gender */}
              <div style={{ width: "calc(25% - 10px)", marginBottom: "20px" }}>
                <TextField
                  id="gender"
                  name="gender"
                  select
                  label="Gender"
                  value={userData.gender}
                  onChange={handleChange}
                  required
                  style={{ width: "100%" }}
                >
                  <MenuItem value="">Select Gender</MenuItem>
                  <MenuItem value="male">Male</MenuItem>
                  <MenuItem value="female">Female</MenuItem>
                  <MenuItem value="other">Other</MenuItem>
                </TextField>
              </div>

              {/* Blood Group */}
              <div style={{ width: "calc(25% - 10px)", marginBottom: "20px" }}>
                <TextField
                  id="bloodGroup"
                  name="bloodGroup"
                  select
                  label="Blood Group"
                  value={userData.bloodGroup}
                  onChange={handleChange}
                  style={{ width: "100%" }}
                >
                  <MenuItem value="">Select Blood Group</MenuItem>
                  <MenuItem value="A+">A+</MenuItem>
                  <MenuItem value="A-">A-</MenuItem>
                  <MenuItem value="B+">B+</MenuItem>
                  <MenuItem value="B-">B-</MenuItem>
                  <MenuItem value="AB+">AB+</MenuItem>
                  <MenuItem value="AB-">AB-</MenuItem>
                  <MenuItem value="O+">O+</MenuItem>
                  <MenuItem value="O-">O-</MenuItem>
                </TextField>
              </div>

              {/* Religion */}
              <div style={{ width: "calc(25% - 10px)", marginBottom: "20px" }}>
                <TextField
                  id="religion"
                  name="religion"
                  select
                  label="Religion"
                  value={userData.religion}
                  onChange={handleChange}
                  required
                  style={{ width: "100%" }}
                >
                  <MenuItem value="">Select Religion</MenuItem>
                  <MenuItem value="hindu">Hindu</MenuItem>
                  <MenuItem value="muslim">Muslim</MenuItem>
                  <MenuItem value="christian">Christian</MenuItem>
                </TextField>
              </div>

              {/* Height */}
              <div style={{ width: "calc(25% - 10px)", marginBottom: "20px" }}>
                <TextField
                  id="height"
                  name="height"
                  label="Height"
                  type="number"
                  value={userData.height}
                  onChange={handleChange}
                  style={{ width: "100%" }}
                />
              </div>

              {/* Weight */}
              <div style={{ width: "calc(25% - 10px)", marginBottom: "20px" }}>
                <TextField
                  id="weight"
                  name="weight"
                  label="Weight"
                  type="number"
                  value={userData.weight}
                  onChange={handleChange}
                  style={{ width: "100%" }}
                />
              </div>

              {/* Student Phone */}
              <div style={{ width: "calc(25% - 10px)", marginBottom: "20px" }}>
                <TextField
                  id="studentPhone"
                  name="studentPhone"
                  label="Student Number"
                  type="number"
                  value={userData.studentPhone}
                  onChange={handleChange}
                  style={{ width: "100%" }}
                />
              </div>

              {/* Medical History */}
              <div style={{ width: "calc(100% - 10px)", marginBottom: "20px" }}>
                <TextField
                  id="medicalHistory"
                  name="medicalHistory"
                  label="Medical History"
                  multiline
                  rows={4}
                  value={userData.medicalHistory}
                  onChange={handleChange}
                  style={{ width: "100%" }}
                />
              </div>
            </div>


 {/* Date of Birth */}
 <div style={{ width: "5%", marginBottom: "20px" }}>
                <TextField
                  id="dob"
                  name="dob"
                  label="Date of Birth"
                  type="date"
                  value={userData.dob}
                  onChange={handleChange}
                  required
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </div>

              {/* Admission Date */}
              <div style={{ width: "5%", marginBottom: "20px" }}>
                <TextField
                  id="admissionDate"
                  name="admissionDate"
                  label="Admission Date"
                  type="date"
                  value={userData.admissionDate}
                  onChange={handleChange}
                  required
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </div>



            <h2>Student Academic Details</h2>
            <div className="size"></div>

<div className="form-row">
  {/* Class */}
  <div style={{ width: "calc(50% - 10px)", marginBottom: "20px" }}>
    <TextField
      id="class"
      name="class"
      select
      label="Class"
      required
      value={userData.class}
      onChange={handleChange}
      fullWidth
    >
      <MenuItem value="">Select Class</MenuItem>
      <MenuItem value="I">I</MenuItem>
      <MenuItem value="II">II</MenuItem>
      <MenuItem value="III">III</MenuItem>
      <MenuItem value="IV">IV</MenuItem>
      <MenuItem value="V">V</MenuItem>
      <MenuItem value="VI">VI</MenuItem>
      <MenuItem value="VII">VII</MenuItem>
      <MenuItem value="VIII">VIII</MenuItem>
      <MenuItem value="IX">IX</MenuItem>
      <MenuItem value="X">X</MenuItem>
      <MenuItem value="XI">XI</MenuItem>
      <MenuItem value="XII">XII</MenuItem>
    </TextField>
  </div>
  
  {/* Section */}
  <div style={{ width: "calc(50% - 10px)", marginBottom: "20px" }}>
    <TextField
      id="section"
      name="section"
      select
      label="Section"
      required
      value={userData.section}
      onChange={handleChange}
      fullWidth
    >
      <MenuItem value="">Select Section</MenuItem>
      <MenuItem value="A">A</MenuItem>
      <MenuItem value="B">B</MenuItem>
      <MenuItem value="C">C</MenuItem>
      <MenuItem value="D">D</MenuItem>
      <MenuItem value="E">E</MenuItem>
      <MenuItem value="F">F</MenuItem>
      <MenuItem value="G">G</MenuItem>
      <MenuItem value="H">H</MenuItem>
      <MenuItem value="I">I</MenuItem>
    </TextField>
  </div>
</div>

<div className="form-row">
  {/* House */}
  <div style={{ width: "calc(50% - 10px)", marginBottom: "20px" }}>
    <TextField
      id="house"
      name="house"
      select
      label="House"
      required
      value={userData.house}
      onChange={handleChange}
      fullWidth
    >
      <MenuItem value="">Select House</MenuItem>
      <MenuItem value="Gryffindor">Green</MenuItem>
      <MenuItem value="Hufflepuff">Red</MenuItem>
      <MenuItem value="Ravenclaw">Blue</MenuItem>
      <MenuItem value="Slytherin">Yellow</MenuItem>
    </TextField>
  </div>

  {/* Sports Interest */}
  <div style={{ width: "calc(50% - 10px)", marginBottom: "20px" }}>
    <TextField
      id="game"
      name="game"
      label="Sports Interest"
      type="text"
      value={userData.game}
      onChange={handleChange}
      fullWidth
    />
  </div>
</div>

            <h2>File Uploads</h2>
            <div className="size" ></div>

            <div className="form-row">
              <div className="form-field">
                <Button component="label" variant="contained" startIcon={<CloudUploadIcon />}>
                  Upload Student Photo
                  <input type="file" id="studentPhoto" name="studentPhoto" accept="image/*" hidden />
                </Button>
              </div>
              
              {/* Add more file upload fields if needed */}
            </div>
          </div>
        );
      case 1:
        return (
          <div>
    <div className="size"></div>
    <h2>Parent Guardian Detail</h2>
    <div className="size"></div>
    {/* Parent details form fields */}

    {/* Father's Details */}
    <div className="form-row">

      <div style={{ width: "calc(25% - 10px)", marginBottom: "20px" }}>
        <TextField
          id="fatherName"
          name="fatherName"
          label="Father's Name"
          type="text"
          value={userData.fatherName}
          onChange={handleChange}
          required
          fullWidth
        />
      </div>

      <div style={{ width: "calc(25% - 10px)", marginBottom: "20px" }}>
        <TextField
          id="fatherPhone"
          name="fatherPhone"
          label="Father's Phone"
          type="number"
          value={userData.fatherPhone}
          onChange={handleChange}
          fullWidth
        />
      </div>

      <div style={{ width: "calc(25% - 10px)", marginBottom: "20px" }}>
        <TextField
          id="fatherOccupation"
          name="fatherOccupation"
          label="Father's Occupation"
          type="text"
          value={userData.fatherOccupation}
          onChange={handleChange}
          fullWidth
        />
      </div>

      <div style={{ width: "calc(25% - 10px)", marginBottom: "20px" }}>
        <TextField
          id="fatherEmail"
          name="fatherEmail"
          label="Father's Email"
          type="email"
          value={userData.fatherEmail}
          onChange={handleChange}
          fullWidth
        />
      </div>

      {/* End Father Details row  */}
    </div>

    {/* Mother's Details */}
    <div className="form-row">

      <div style={{ width: "calc(25% - 10px)", marginBottom: "20px" }}>
        <TextField
          id="motherName"
          name="motherName"
          label="Mother's Name"
          type="text"
          value={userData.motherName}
          onChange={handleChange}
          fullWidth
        />
      </div>

      <div style={{ width: "calc(25% - 10px)", marginBottom: "20px" }}>
        <TextField
          id="motherPhone"
          name="motherPhone"
          label="Mother's Phone"
          type="number"
          value={userData.motherPhone}
          onChange={handleChange}
          fullWidth
        />
      </div>

      <div style={{ width: "calc(25% - 10px)", marginBottom: "20px" }}>
        <TextField
          id="motherOccupation"
          name="motherOccupation"
          label="Mother's Occupation"
          type="text"
          value={userData.motherOccupation}
          onChange={handleChange}
          fullWidth
        />
      </div>

      <div style={{ width: "calc(25% - 10px)", marginBottom: "20px" }}>
        <TextField
          id="motherEmail"
          name="motherEmail"
          label="Mother's Email"
          type="email"
          value={userData.motherEmail}
          onChange={handleChange}
          fullWidth
        />
      </div>
    </div>

    {/* End Mothers Details row  */}

    {/* if Other's Guardians */}
    <h3>If other Guardians</h3>
    <br />
    <div className="form-row">

      <div style={{ width: "calc(25% - 10px)", marginBottom: "20px" }}>
        <TextField
          id="guardianName"
          name="guardianName"
          label="Guardian's Name"
          type="text"
          value={userData.guardianName}
          onChange={handleChange}
          fullWidth
        />
      </div>

      <div style={{ width: "calc(25% - 10px)", marginBottom: "20px" }}>
        <TextField
          id="guardianPhone"
          name="guardianPhone"
          label="Guardian's Phone"
          type="number"
          value={userData.guardianPhone}
          onChange={handleChange}
          fullWidth
        />
      </div>

      <div style={{ width: "calc(25% - 10px)", marginBottom: "20px" }}>
        <TextField
          id="guardianOccupation"
          name="guardianOccupation"
          label="Guardian's Occupation"
          type="text"
          value={userData.guardianOccupation}
          onChange={handleChange}
          fullWidth
        />
      </div>

      <div style={{ width: "calc(25% - 10px)", marginBottom: "20px" }}>
        <TextField
          id="guardianEmail"
          name="guardianEmail"
          label="Guardian's Email"
          type="email"
          value={userData.guardianEmail}
          onChange={handleChange}
          fullWidth
        />
      </div>

    </div>
    {/* End Guardians Details row  */}
  </div>
        );
      case 2:
        return (
          <div>
            <div className="size"></div>
            <h2>Choose Facilities</h2>
            <br></br>
            {/* Facilities selection form fields */}

            <div className="form-field" style={{ display: 'flex', alignItems: 'center' }}>
              <input type="checkbox" id="library" name="library" className="library" />
              <label htmlFor="library">Library</label>
            </div>
            <div className="form-field" style={{ display: 'flex', alignItems: 'center' }}>
              <input type="checkbox" id="computerLab" name="computerLab" className="computerLab" />
              <label htmlFor="computerLab">Computer Lab</label>
            </div>
            <div className="form-field" style={{ display: 'flex', alignItems: 'center' }}>
              <input type="checkbox" id="sportsFacility" name="sportsFacility" className="sportsFacility" />
              <label htmlFor="sportsFacility">Sports Facility</label>
            </div>
            <div className="form-field" style={{ display: 'flex', alignItems: 'center' }}>
              <input type="checkbox" id="artRoom" name="artRoom" className="artRoom" />
              <label htmlFor="artRoom">Art Room</label>
            </div>
            <div className="form-field" style={{ display: 'flex', alignItems: 'center' }}>
              <input type="checkbox" id="customColorCheckbox" name="customColorCheckbox" className="customColorCheckbox" />
              <label htmlFor="customColorCheckbox">Transport Details</label>
            </div>

          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="form-container" style={{ maxWidth: '900px', margin: 'auto' }}>
      {/* Stepper */}
      <Stepper activeStep={activeStep} alternativeLabel style={{ marginBottom: '20px' }}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      {/* Stepper Content */}
      <div className="stepper-content">
        {renderStepContent(activeStep)}
      </div>
      {/* Stepper Button Container */}
      <div className="stepper-button-container" style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Button disabled={activeStep === 0} onClick={handleBack}>
          <span style={{ marginRight: '8px', marginLeft: '10px' }}>&#9664;</span> Back
        </Button>
        <Button variant="contained" onClick={handleNextOrSubmit} disabled={loading}>
          {loading ? <CircularProgress size={24} /> : (activeStep === steps.length - 1 ? "Finish" : "Next")}
          <span style={{ marginLeft: '8px' }}>&#9654;</span>
        </Button>
      </div>
    </div>
  );
};

export default StudentAdmissionForm;
