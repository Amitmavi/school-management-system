import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './login';
import LibrarianRoutes from "./routes/librarianRouters";
import AdminRoutes from './routes/adminRouters';
import AccountatRouters from './routes/accountantRouters';
import EventManager from './users/eventManager/pages/index';
import ReceptionsistRouters from './routes/receptionistRouters';
import OnlineStudentAdmissionForm from './components/student/studentAdmissionForm/onlineStudentAdmissionForm';
import { auth } from './utils/firebaseConfig'; // Import the Firebase auth instance

export default function App() {
  const [userType, setUserType] = useState(null); // State to store user type
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State to track if user is logged in

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        // User is logged in
        setIsLoggedIn(true);
        // Retrieve userType from localStorage
        const storedUserType = localStorage.getItem('userType');
        if (storedUserType) {
          setUserType(storedUserType);
        }
      } else {
        // User is not logged in
        setIsLoggedIn(false);
        setUserType(""); // Clear userType if not logged in
      }
    });

    return () => {
      unsubscribe();
    };
  }, []); // Run once on component mount

  return (
    <Router>
      <Routes>
        {/* Route for admin */}
        <Route path="/admin/*" element={isLoggedIn ? <AdminRoutes /> : <Navigate to="/" />} />

        {/* Route for librarian */}
        <Route path="/librarian/*" element={isLoggedIn ? <LibrarianRoutes /> : <Navigate to="/" />} />

        <Route path="/accountant/*" element={isLoggedIn ? <AccountatRouters /> : <Navigate to="/" />} />

        <Route path="/event-manager" element={<EventManager/>}  />

        <Route path="/receptionist/*" element={isLoggedIn ? <ReceptionsistRouters /> : <Navigate to="/" />} />

        {/* Route for student admission form */}
        <Route path="/online-admission" element={<OnlineStudentAdmissionForm />} />

        {/* Default route, redirects to login if not logged in */}
        <Route path="/*" element={isLoggedIn ? <Navigate to={`/${userType}`} /> : <Login setUserType={setUserType} />} />
      </Routes>
    </Router>
  );
}
