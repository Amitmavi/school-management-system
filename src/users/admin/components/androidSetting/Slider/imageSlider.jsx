import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Slider from '@mui/material/Slider';
import Button from '@mui/material/Button';

const ImageSlider = ({ images, userType }) => {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleNext = () => {
    setValue((prevValue) => (prevValue === images.length - 1 ? 0 : prevValue + 1));
  };

  const handlePrev = () => {
    setValue((prevValue) => (prevValue === 0 ? images.length - 1 : prevValue - 1));
  };

  const handleAddImage = () => {
    const newImageUrl = prompt('Enter image URL:');
    if (newImageUrl) {
      const newImages = [...images, newImageUrl];
      setValue(newImages.length - 1);
    }
  };

  return (
    
    <Box sx={{ maxWidth: 600, margin: 'auto', textAlign: 'left', padding: '20px' }}>
      <Typography variant="h4" gutterBottom>
        {userType === 'teacher' ? 'Teacher' : userType === 'parent' ? 'Parent' : 'Student'} Image Slider
      </Typography>
      <img src={images[value]} alt='nothing' style={{ maxWidth: '100%', maxHeight: '400px', marginBottom: '20px' }} />
      <Box sx={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
        <Button variant="contained" onClick={handlePrev}>Previous</Button>
        <Button variant="contained" onClick={handleNext}>Next</Button>
        <Button variant="contained" onClick={handleAddImage}>Add Image</Button>
      </Box>
      <Slider
        value={value}
        onChange={handleChange}
        aria-labelledby="continuous-slider"
        max={images.length - 1}
      />
    </Box>
  );
};

ImageSlider.propTypes = {
  images: PropTypes.arrayOf(PropTypes.string).isRequired,
  userType: PropTypes.oneOf(['teacher', 'parent', 'student']).isRequired,
};

export default ImageSlider;
