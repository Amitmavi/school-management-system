import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { collection, doc, getDoc } from 'firebase/firestore';
import React, { useState } from 'react';
import { FaEnvelope, FaEye, FaEyeSlash, FaLock } from 'react-icons/fa'; // Import icons
import { toast } from 'react-toastify';
import './Login.css';
import { app, db } from './utils/firebaseConfig';

const auth = getAuth(app);

export default function Login({ setUserType }) {
  const [selectedType, setSelectedType] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  

  const handleLogin = (event) => {
    event.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;

        const userId = user.uid;
        const userRef = doc(collection(db, 'users'), userId);
        getDoc(userRef)
          .then((doc) => {
            if (doc.exists()) {
              const userType = doc.data().userType;
              if (userType === selectedType) {
                localStorage.setItem('userType', userType);
                setUserType(userType); // Update userType in the parent component
                toast.success(`${userType} login Successfully`);
              } else {
                toast.error("Please select your correct role");
                auth.signOut();
              }
            } else {
              console.log('User document does not exist');
            }
          })
          .catch((error) => {
            console.error('Error getting user document:', error);
          });
      })
      .catch((error) => {
        const errorMessage = error.message;
        alert(`Login failed: ${errorMessage}`);
        auth.signOut();
      });
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h1>Log In to <span style={{ color: 'rgb(69, 31, 181)' }}>PulseZest School</span></h1>
        <div className="social-icons">
        </div>
        <div className="divider">
          <span>Enter your Credentials to Log in</span>
        </div>
        <div className="form-group" style={{ height: '40px' }}>
          <div className="input-icon">
            <FaEnvelope className="icon" />
            <input
            style={{
              height: '20px', // Adjust height as needed
              width: '470px', // Adjust width as needed
              fontSize: '15px'
            }}
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
            />
          </div>
        </div>
        <div className="form-group" style={{ height: '40px' }}>
          <div className="input-icon"s >
            <FaLock className="icon" />
            <input
            style={{
              height: '20px', // Adjust height as needed
              width: showPassword ? '470px' : '470px', // Adjust width as needed
              fontSize: '15px',
              marginTop: '10px'
            }}
              type={showPassword ? "text" : "password"} // Show password if showPassword is true
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
            />
           
            {showPassword ? (
              <FaEyeSlash className="eye-icon" onClick={() => setShowPassword(false)} />
            ) : (
              <FaEye className="eye-icon" onClick={() => setShowPassword(true)} />
            )}
          </div>
        </div>
        <div className="radio-group" >
          <label>
            <input
              style={{
                height: '30px', // Adjust height as needed
                width: '13px', // Adjust width as needed
                marginTop: '1px'
              }}
              type="radio"
              name="loginType"
              value="super-admin"
              onChange={() => setSelectedType('super-admin')}
              checked={selectedType === 'super-admin'}
            />
            Superadmin
          </label>
          <label>
            <input
              style={{
                height: '30px', // Adjust height as needed
                width: '13px', // Adjust width as needed
                marginTop: '1px'
              }}
              type="radio"
              name="loginType"
              value="admin"
              onChange={() => setSelectedType('admin')}
              checked={selectedType === 'admin'}
            />
            Admin
          </label>
          <label>
            <input
              style={{
                height: '30px', // Adjust height as needed
                width: '13px', // Adjust width as needed
                marginTop: '1px'
              }}
              type="radio"
              name="loginType"
              value="librarian"
              onChange={() => setSelectedType('librarian')}
              checked={selectedType === 'librarian'}
            />
            Librarian
          </label>
          <label>
            <input
              style={{
                height: '30px', // Adjust height as needed
                width: '13px', // Adjust width as needed
                marginTop: '1px'
              }}
              type="radio"
              name="loginType"
              value="receptionist"
              onChange={() => setSelectedType('receptionist')}
              checked={selectedType === 'receptionist'}
            />
            Receptionist
          </label>
          <label>
            <input
              style={{
                height: '30px', // Adjust height as needed
                width: '13px', // Adjust width as needed
                marginTop: '1px'
              }}
              type="radio"
              name="loginType"
              value="accountant"
              onChange={() => setSelectedType('accountant')}
              checked={selectedType === 'accountant'}
            />
            Accountant
          </label>
          <button className="btn-sign-in" onClick={handleLogin}
            style={{
              height: '50px', // Adjust height as needed
              width: '150px', // Adjust width as needed
              fontSize: '15px',
              marginTop: '10px'
            }}>Submit</button>
        </div>
      </div>
    </div>
  );
}
