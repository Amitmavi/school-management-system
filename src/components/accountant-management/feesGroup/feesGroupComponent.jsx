import React from 'react';
import { TextField } from '@mui/material';
import './feesGroupComponent.css';

export default function FeesGroupComponent() {
  return (
    <div className="container">
      <h2>FEES GROUP</h2>
      <div className="input-container">
        <label htmlFor="typeSelection">Type Selection:</label>
        <TextField id="typeSelection" label="Type Selection" variant="outlined" />
      </div>

      <div className="input-container">
        <label htmlFor="description">MC:</label>
        <TextField id="description" label="Description" variant="outlined" />
      </div>
    </div>
  );
}
