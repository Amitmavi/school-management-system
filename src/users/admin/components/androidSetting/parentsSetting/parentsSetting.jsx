import React from 'react';
import Switch from '@mui/material/Switch';

export default function ParentsSwitch({ checked, handleChange }) {
 

  return (
    <div>
      <Switch   checked={checked} onChange={handleChange} />
    </div>
  );
}
