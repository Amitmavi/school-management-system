import React, { useState } from 'react';
import { styled, useTheme } from '@mui/material/styles';
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import SwapHorizontalCircleIcon from '@mui/icons-material/SwapHorizontalCircle';
import AppBar from "./appBar"
import DrawerHeader from "./drawerHeader"
import ChartsOverviewDemo from "./chartOverviewDemo"
import { Grid } from '@mui/material';
import { PieChart } from '@mui/x-charts/PieChart';
import './newdash.css'; // Import the CSS file

const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  }),
);

export default function PersistentDrawerLeft() {
  const theme = useTheme();
  const [open, setOpen] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const data = [  
    { name: 'Category 1', value: 20 },
    { name: 'Category 2', value: 30 },
    { name: 'Category 3', value: 40 },
    { name: 'Category 4', value: 10 },
  ];

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{marginLeft: -90, ...(open && { display: 'none' }) }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Librarian
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {['Book List', 'Issue Return', 'Add Student', 'Add staff'].map((text, index) => (
            <ListItem key={text} disablePadding>
             <ListItemButton component={Link} to={`/${text.toLowerCase().replace(' ', '-')}`}>
                <ListItemIcon>
                  {index % 3 === 0 ? <AutoStoriesIcon /> : <SwapHorizontalCircleIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
      </Drawer>
      <Main className="Main" open={open}>
        <DrawerHeader className="DrawerHeader" />
        <Grid container spacing={2}>
          {[1, 2, 3, 4].map((cardIndex) => (
            <Grid item xs={12} sm={6} md={3} key={cardIndex}>
              <div className="Card" style={{ backgroundColor: cardIndex === 1 ? 'lightpink' : cardIndex === 2 ? 'lightblue' : cardIndex === 3 ? 'lightgreen' : 'lightyellow'}}>
                <h3>{cardIndex === 1 ? 'Expenses' : cardIndex === 2 ? 'Accounts' : cardIndex === 3 ? 'Profit' : 'Loss'}</h3>
                {/* Your card components */}
              </div>
            </Grid>
          ))}
        </Grid>
        <Grid container spacing={2} style={{ marginTop: '20px' }}>
          <Grid item xs={12} sm={6} md={3}>
            <div className="AdditionalCard" style={{ backgroundColor: "lightgray", height: '300px' }}>
            <PieChart
              series={[
                {
                  data,
                  highlightScope: { faded: 'global', highlighted: 'item' },
                  faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
                },
              ]}
              height={200}
            />
              {/* Your additional card components */}
            </div>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <div className="AdditionalCard">
              <h3> </h3>
              <ChartsOverviewDemo />
            </div>
          </Grid>
        </Grid>
      </Main>
    </Box>
  );
}
