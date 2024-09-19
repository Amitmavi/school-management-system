import SearchIcon from '@mui/icons-material/Search';
import Button from '@mui/material/Button';
import React from 'react';
import './payment.css';

export default function searchfeespayment() {
  return (
    <div>
      <div className="comtainers">
        <h3 className="crit-headingg">Fees Payment</h3>
        <form>

          <div className="sectionnss" >
            <h5>Section</h5>
            <select id="Section" name="Section" style={{ width: '400px' }}>
              <option value="">Select</option>
              <option value="group1">Group 1</option>
              <option value="group2">Group 2</option>
              <option value="group3">Group 3</option>
            </select>
          </div>
          <div className="sectionnss" >
          <Button variant="contained" startIcon={<SearchIcon />} style={{ marginRight: '300px' }}>Search</Button>
          </div>
        </form>
      </div>
    </div>
 
  )
}
