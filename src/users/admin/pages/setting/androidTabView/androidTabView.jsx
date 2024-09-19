import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import UpdateTheme from './updateTheme';
import UpdateImageSlider from './updateImageSlider';
import UpdateParentsPage from './updateParentsPage';

export default function AndroidTabView() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box
      sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex', height: 'auto' }}
    >
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        sx={{ borderRight: 1, borderColor: 'divider' }}
      >
        <Tab label="Theme" {...a11yProps(0)} />
        <Tab label="Image Slider" {...a11yProps(1)} />
        <Tab label="Parents" {...a11yProps(2)} />
        <Tab label="Teachers" {...a11yProps(3)} />
        <Tab label="Students" {...a11yProps(4)} />
        <Tab label="Icons" {...a11yProps(5)} />
        <Tab label="Login Screen" {...a11yProps(6)} />
        <Tab label="Website" {...a11yProps(7)} />
        <Tab label="Logo" {...a11yProps(8)} />
      </Tabs>
      <TabPanel value={value} index={0}>
        Customize your Android Application theme
        <UpdateTheme/>
      </TabPanel>
      <TabPanel value={value} index={1}>
       <UpdateImageSlider/>
      </TabPanel>
      <TabPanel value={value} index={2}>
      <UpdateParentsPage/>
      </TabPanel>
      <TabPanel value={value} index={3}>
       Customize the Teacher Dashboard
      </TabPanel>
      <TabPanel value={value} index={4}>
       Change the Student Dashboard
      </TabPanel>
      <TabPanel value={value} index={5}>
        Update the Icons.
      </TabPanel>
      <TabPanel value={value} index={6}>
        Update the Login Screen
      </TabPanel>
      <TabPanel value={value} index={7}>
        Update your Official Website.
      </TabPanel>
      <TabPanel value={value} index={8}>
        Sorry you can't change the Andorid Application Logo.
        You have to contact the PulseZest Team to Update the Logo.
      </TabPanel>
    </Box>
  );
}


function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`vertical-tabpanel-${index}`}
        aria-labelledby={`vertical-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 5 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }
  
  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };
  
  function a11yProps(index) {
    return {
      id: `vertical-tab-${index}`,
      'aria-controls': `vertical-tabpanel-${index}`,
    };
  }