import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { AiTwotoneFileExclamation } from "react-icons/ai";
import { BiCog, BiSolidDiscount } from "react-icons/bi";
import { FaBars, FaHome, FaLock, FaMoneyBill, FaRoute, FaSearchDollar, FaShare, FaUser } from "react-icons/fa";
import { FcMoneyTransfer } from "react-icons/fc";
import { GiMoneyStack } from "react-icons/gi";
import { GoAlertFill } from "react-icons/go";
import { IoLogOutOutline } from "react-icons/io5";
import { MdEmojiTransportation, MdOutlineManageSearch, MdOutlineMergeType } from "react-icons/md";
import { RiBarChartGroupedLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { FaBus } from "react-icons/fa6";
import { MdBusAlert } from "react-icons/md";
import {auth} from "../../../../utils/firebaseConfig"
import SidebarMenu from "./accountantSidebarMenu";




const routes = [
  {
    path: "/",
    name: "Dashboard",
    icon: <FaHome />,
  },

  {
    path: "/fees-collection",
    name: "Fees Collection",
    icon: <FaMoneyBill />,
    subRoutes: [
   
      {
        path: "/Student-add",
        name: "Collect Fees",
        icon: <GiMoneyStack />,
      },
      {
        path: "/online-add",
        name: "Fees Payment",
        icon: <MdOutlineManageSearch />,
      },
      {
        path: "Duefees",
        name: "Fees Due",
        icon: <FaSearchDollar />,
      },
      {
        path: "Master",
        name: "Fees Master",
        icon: <FcMoneyTransfer />,
      },
      {
        path: "Group",
        name: "Fees Group",
        icon: <RiBarChartGroupedLine />,
      },
      {
        path: "Type",
        name: "Fees Type",
        icon: <MdOutlineMergeType />,
      },
      {
        path: "Discount",
        name: "Fees Discount",
        icon: <BiSolidDiscount />,
      },
      {
        path: "Carryforword",
        name: "Fees Carry Forword",
        icon: <FaShare />,
      },
      {
        path: "Reminder",
        name: "Fees Reminder",
        icon: <GoAlertFill />,
      }
    ],
  },


  {
    path: "/file-manager",
    name: "Expance",
    icon: <AiTwotoneFileExclamation />,
    subRoutes: [
      {
        path: "Expances",
        name: "Add Expance ",
        icon: <FaUser />,
      },
      {
        path: "/settings/2fa",
        name: "Search Expance",
        icon: <FaLock />,
      },
      {
        path: "ExpanceHead",
        name: "Head Expance",
        icon: <FaMoneyBill />,
      },
    ],
  },


  
  {
    path: "/transport",
    name: "Transport",
    icon: <MdEmojiTransportation />,
    subRoutes: [
      {
        path: "route",
        name: "Route ",
        icon: <FaRoute />,
      },
      {
        path: "VehicalName",
        name: "Vehicle",
        icon: <FaBus />,
      },
      {
        path: "Assign",
        name: "Assign vehicle",
        icon: <MdBusAlert />,
      },
    ],
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
