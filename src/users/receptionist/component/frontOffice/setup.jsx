import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';
import * as React from 'react';
import Purpose from '../../addadmission/purpose';
import Reference from '../../addadmission/reference';
import Source from '../../addadmission/source';
import ComplainType from '../../addadmission/type';

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
        <Box sx={{ p: 4 }}>
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

export default function VerticalTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box
      sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex', height: 600}}
    >
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        sx={{ borderRight: 1, borderColor: 'divider' }}
      >
        <Tab label="Purpose" {...a11yProps(0)} />
        <Tab label="Complaint Type" {...a11yProps(1)} />
        <Tab label="Source" {...a11yProps(2)} />
        <Tab label="Reference" {...a11yProps(3)} />
      </Tabs>
      <TabPanel value={value} index={0}>
      <Purpose></Purpose>
      </TabPanel>
      <TabPanel value={value} index={1}>
      <ComplainType></ComplainType>
      </TabPanel>
      <TabPanel value={value} index={2}>
      <Source></Source>
      </TabPanel>
      <TabPanel value={value} index={3}>
        <Reference></Reference>
      </TabPanel>
    </Box>
  );
}
