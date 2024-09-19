import SearchIcon from '@mui/icons-material/Search';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import React, { useEffect, useState } from 'react';
import Modal from '../../addadmission/add';
import ClassSelector from '../../../../components/common/classSelector'

const EnquiryForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Form Submitted!', formData);
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const openModal = () => {
    setIsModalOpen(true);
  };
  
  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  return (
    <>
   <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-end' }}>
  <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
    <FormControl sx={{ m: 1, minWidth: 80, marginRight: '10px' }}>
      <h3>Class</h3>
      <ClassSelector/>
        
       
    </FormControl>
    <FormControl sx={{ m: 1, minWidth: 80, marginRight: '5px' }}>
      <h3>Source</h3>
      <InputLabel id="demo-simple-select-autowidth-label"  ></InputLabel>
      <Select
        labelId="demo-simple-select-autowidth-label"
        id="demo-simple-select-autowidth"
        onChange={handleChange}
        autoWidth
        label="Source"
        style={{ width: '200px', height: '55px' }}
      >
        <MenuItem value=""><em> </em></MenuItem>
        <MenuItem value={10}>Advertisement</MenuItem>
        <MenuItem value={10}>Online front site </MenuItem>
        <MenuItem value={21}>Google Ads</MenuItem>
        <MenuItem value={22}>Admission campaign</MenuItem>
        <MenuItem value={22}>Front Office</MenuItem>
      </Select>
    </FormControl>
    <FormControl sx={{ m: 1, minWidth: 80, marginRight: '50px' }}>
      <h3>Enquiry From Date</h3>
      <input
        type="date"
        id="due-date"
        name="dueDate"
        style={{ width: '110%', height: '38px', padding: '8px', marginRight: '30px', marginTop: '5px', marginBottom: '5px', border: '1px solid #ccc', borderRadius: '4px' }}
      />
    </FormControl>
    <FormControl sx={{ m: 1, minWidth: 80, marginRight: '10px' }}>
      <h3>Enquiry To Date</h3>
      <input
        type="date"
        id="due-date"
        name="dueDate"
        style={{ marginBottom: '5px', width: '190px', height: '38px', padding: '8px', marginRight: '30px', marginTop: '5px', border: '1px solid #ccc', borderRadius: '4px' }}
      />
    </FormControl>
    <FormControl sx={{ m: 1, minWidth: 80 }}>
      <h3>Status</h3>
      <InputLabel id="demo-simple-select-autowidth-label"></InputLabel>
      <Select
        labelId="demo-simple-select-autowidth-label"
        id="demo-simple-select-autowidth"
        onChange={handleChange}
        autoWidth
        label="Status"
        placeholder='status'
        style={{ width: '190px', height: '56px', marginBottom: '1px', marginRight:'40px' }}
      >
        <MenuItem value=""><em> </em></MenuItem>
        <MenuItem value={10}> Active</MenuItem>
        <MenuItem value={10}> Passive</MenuItem>
        <MenuItem value={21}>Dead</MenuItem>
        <MenuItem value={22}>won </MenuItem>
      </Select>
    </FormControl>
  </div>
  <Button
    variant="contained"
    startIcon={<SearchIcon />}
    style={{ height: '40px', marginBottom: '1.5rem', marginRight: '15px', width: '8rem', backgroundColor: 'rgb(93, 93, 87)', fontSize: '18px', border: 'none', color: '#fff', cursor: 'pointer', borderRadius: '4px', outline: 'none', transition: 'background-color 0.3s ease', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)' }}
  >
    Search
  </Button>
  <button><Modal/></button>
     
</form>
    <form style={{ width: "1100px" }}></form>
    <div style={{ marginTop: "20px" }}>
      <table style={{ width: "1200px", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            {/* Table headers */}
            <th style={{ backgroundColor: "#b1abab", color: "#1a0707", border: "1px solid #ddd", padding: "8px", textAlign: "left" }}>Name</th>
            <th style={{ backgroundColor: "#b1abab", color: "#1a0707", border: "1px solid #ddd", padding: "8px", textAlign: "left" }}>Phone</th>
            <th style={{ backgroundColor: "#b1abab", color: "#1a0707", border: "1px solid #ddd", padding: "8px", textAlign: "left" }}>Source</th>
            <th style={{ backgroundColor: "#b1abab", color: "#1a0707", border: "1px solid #ddd", padding: "8px", textAlign: "left" }}>Enquiry</th>
            <th style={{ backgroundColor: "#b1abab", color: "#1a0707", border: "1px solid #ddd", padding: "8px", textAlign: "left" }}>Last Follow Up Date</th>
            <th style={{ backgroundColor: "#b1abab", color: "#1a0707", border: "1px solid #ddd", padding: "8px", textAlign: "left" }}>Next Follow Up Date</th>
            <th style={{ backgroundColor: "#b1abab", color: "#1a0707", border: "1px solid #ddd", padding: "8px", textAlign: "left" }}>Status</th>
            <th style={{ backgroundColor: "#b1abab", color: "#1a0707", border: "1px solid #ddd", padding: "8px", textAlign: "left" }}>Action</th>
          </tr>
        </thead>
        <tbody>
          {/* Table body content */}
        </tbody>
      </table>
      <hr style={{ margin: "20px 0", border: "none", borderTop: "1px solid #ccc" }} />
      <div style={{ flex: '1', margin: '10px' }}></div>
    </div>
    </>
  );
}

export default EnquiryForm;
