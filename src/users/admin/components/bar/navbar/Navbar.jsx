import React, { useContext, useState } from "react";
import { auth } from "../../../../../utils/firebaseConfig";
import "./navbar.scss";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import FullscreenExitOutlinedIcon from "@mui/icons-material/FullscreenExitOutlined";
import FullscreenOutlinedIcon from "@mui/icons-material/FullscreenOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import ListOutlinedIcon from "@mui/icons-material/ListOutlined";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Avatar from "@mui/material/Avatar";
import PersonIcon from "@mui/icons-material/Person";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import { DarkModeContext } from "../../../../../context/darkModeContext";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const { darkMode, dispatch } = useContext(DarkModeContext);
  const [isDarkMode, setIsDarkMode] = useState(darkMode);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate(); // Use navigate hook

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    dispatch({ type: "TOGGLE" });
  };

  const toggleFullscreen = () => {
    if (!isFullscreen) {
      document.documentElement.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
    setIsFullscreen(!isFullscreen);
  };

  const toggleDrawer = (open) => () => {
    setIsDrawerOpen(open);
  };

  const handleAvatarClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleAvatarMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    auth.signOut() // Sign out the user using Firebase
      .then(() => {
        // Clear user authentication state
        localStorage.removeItem("userType"); 
        // Remove userType from localStorage
        navigate("/"); // Navigate to the login page
      })
      .catch((error) => {
        console.error("Error signing out:", error);
      });
  };

  return (
    <div className={`navbar ${isDarkMode ? "dark-mode" : ""}`}>
      <div className="wrapper">
        <div className="search">
          <input type="text" placeholder="Search..." />
          <SearchOutlinedIcon />
        </div>
        <div className="items">
          <div className="item">
            <LanguageOutlinedIcon className="icon" />
            English
          </div>
          <div className="item" onClick={toggleDarkMode}>
            {isDarkMode ? (
              <LightModeOutlinedIcon className="icon" />
            ) : (
              <DarkModeOutlinedIcon className="icon" />
            )}
          </div>
          <div className="item" onClick={toggleFullscreen}>
            {isFullscreen ? (
              <FullscreenExitOutlinedIcon className="icon" />
            ) : (
              <FullscreenOutlinedIcon className="icon" />
            )}
          </div>
          <div className="item" onClick={toggleDrawer(true)}>
            <NotificationsNoneOutlinedIcon className="icon" />
            <div className="counter">1</div>
          </div>
          <div className="item">
            <ChatBubbleOutlineOutlinedIcon className="icon" />
            <div className="counter">2</div>
          </div>
          <div className="item">
            <ListOutlinedIcon className="icon" />
          </div>
          <div className="item" onClick={handleAvatarClick}>
            <Avatar
              src="https://pulsezest.com/wp-content/uploads/2023/09/pulsezet.svg"
              alt=""
              className="avatar"
            />
          </div>
        </div>
      </div>
      <Drawer anchor="right" open={isDrawerOpen} onClose={toggleDrawer(false)}>
        <div className={`drawer ${isDarkMode ? "dark-mode" : ""}`}>
          <div className="drawer-header">
            <h3>Notifications</h3>
            <Button onClick={toggleDrawer(false)}>Close</Button>
          </div>
          <div className="drawer-content">
            <p>You have a new notification!</p>
            <Button variant="contained" color="primary">
              View
            </Button>
          </div>
        </div>
      </Drawer>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleAvatarMenuClose}
      >
        <MenuItem onClick={handleAvatarMenuClose}>
          <PersonIcon />
          Profile
        </MenuItem>
        <MenuItem onClick={handleAvatarMenuClose}>
          <AccountCircleIcon />
          My Account
        </MenuItem>
        <MenuItem onClick={handleAvatarMenuClose}>
          <PersonAddIcon />
          Add another account
        </MenuItem>
        <MenuItem onClick={handleAvatarMenuClose}>
          <SettingsIcon />
          Settings
        </MenuItem>
        <MenuItem onClick={handleLogout}>
          <LogoutIcon />
          Logout
        </MenuItem>
      </Menu>
    </div>
  );
};

export default Navbar;
