import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import CorporateFareIcon from '@mui/icons-material/CorporateFare';
import PhoneInTalkIcon from '@mui/icons-material/PhoneInTalk';
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { BiCog, } from "react-icons/bi";
import { FaBars, FaHome, } from "react-icons/fa";
import { IoLogOutOutline } from "react-icons/io5";
import { NavLink, useNavigate } from "react-router-dom";
import { auth } from "../../../../utils/firebaseConfig";
import SidebarMenu from "./sidebarMenu";


const routes = [
  {
    path: "dash",
    name: "Dashboard",
    icon: <FaHome />,
  },

  

  {
    
    name: "Front Office",
    icon: <CorporateFareIcon />,
    subRoutes: [
   
      {
        path: "addmission",
        name: "Addmission Enquiry",
        icon: <PhoneInTalkIcon />,
      },

      {
        path: "visiter",
        name: " Visitors Book",
        icon: <AutoStoriesIcon />,
      },
      {
        path: "Complain",
        name: "Complain",
        icon: <AutoStoriesIcon />,
      },
      {
        path: "frontsetup",
        name: "Setup",
        icon: <AutoStoriesIcon />,
      }
    ]
  },
   
  {
    path: "/settings",
    name: "Settings",
    icon: <BiCog />,
   
  },
 
];

const SideBar = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const navigate = useNavigate(); 

  const showAnimation = {
    hidden: {
      width: 0,
      opacity: 0,
      transition: {
        duration: 0.5,
      },
    },
    show: {
      opacity: 1,
      width: "auto",
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <>
      <div className="main-container">
        <motion.div
          animate={{
            width: isOpen ? "220px" : "45px",
            transition: {
              duration: 0.5,
              type: "spring",
              damping: 10,
            },
          }}
          className={`accountant-sidebar`}
        >
          <div className="top_section">
            <AnimatePresence>
              {isOpen && (
                <motion.h2
                  variants={showAnimation}
                  initial="hidden"
                  animate="show"
                  exit="hidden"
                  className=""
                >
                  PulseZest School
                </motion.h2>
              )}
            </AnimatePresence>
            <div className="bars">
              <FaBars onClick={toggle} />
            </div>
          </div>
          <section className="routes">
            {routes.map((route, index) => {
              if (route.subRoutes) {
                return (
                  <SidebarMenu
                    setIsOpen={setIsOpen}
                    route={route}
                    showAnimation={showAnimation}
                    isOpen={isOpen}
                    key={index}
                  />
                );
              }
              return (
                <NavLink
                  to={route.path}
                  key={index}
                  className="link"
                  activeClassName="active"
                >
                  <div className="icon">{route.icon}</div>
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        variants={showAnimation}
                        initial="hidden"
                        animate="show"
                        exit="hidden"
                        className="link_text"
                      >
                        {route.name}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </NavLink>
              );
            })}
            {/* Logout Button */}
            <NavLink
              to="/logout"
              className="link"
              activeClassName="active"
              onClick={() => {
                // Perform logout actions here
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

              }}
            >
              <div className="icon">{ <IoLogOutOutline/>}</div>
              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    variants={showAnimation}
                    initial="hidden"
                    animate="show"
                    exit="hidden"
                    className="link_text"
                  >
                    Logout
                  </motion.div>
                )}
              </AnimatePresence>
            </NavLink>
          </section>
        </motion.div>
        <main>{children}</main>
      </div>
    </>
  );
};

export default SideBar;
