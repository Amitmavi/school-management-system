// ProtectedRoute.js
import React from 'react';
import { Route, Navigate } from 'react-router-dom';

export default function ProtectedRoute({ element, userType, allowedType, ...rest }) {
  // Check if the user is authorized to access the route
  const isAuthorized = userType === allowedType;

  return (
    <Route
      {...rest}
      element={isAuthorized ? element : <Navigate to="/" />} // Redirect to login if not authorized
    />
  );
}
