import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { BiCog, BiSolidUserDetail } from "react-icons/bi";
import { BsFillStoplightsFill } from "react-icons/bs";
import { FaBars, FaPlus, FaClock,FaUsers ,FaPercentage ,FaArrowAltCircleUp ,FaClipboardList,FaBook, FaBookReader, FaCalendarAlt, FaChalkboardTeacher, FaHome, FaLayerGroup, FaList, FaLock, FaMoneyBill, FaMoneyBillAlt,  FaPersonBooth, FaRoute,  FaTable, FaUser, } from "react-icons/fa";
import { FaBusSimple,  FaMoneyBillTrendUp, FaMoneyCheckDollar, FaSchoolCircleExclamation } from "react-icons/fa6";
import { FcLeave } from "react-icons/fc";
import { FaWpforms } from "react-icons/fa";
import { GiMoneyStack, GiTakeMyMoney } from "react-icons/gi";
import { HiOutlineUserAdd } from "react-icons/hi";
import { HiMiniBuildingLibrary, HiMiniUserGroup } from "react-icons/hi2";
import { IoCalendarClear, IoPersonAddSharp } from "react-icons/io5";
import { MdAssignmentReturn, MdCoPresent, MdDateRange, MdEmojiTransportation, MdOutlineSchedule } from "react-icons/md";
import { PiCertificateFill } from "react-icons/pi";
import { RiMotorbikeFill } from "react-icons/ri";
import { NavLink } from "react-router-dom";
import SidebarMenu from "./SidebarMenu";
import TodayIcon from '@mui/icons-material/Today';

const routes = [
  {
    path: "/",
    name: "Dashboard",
    icon: <FaHome />,
  },

  {
    path: "/Students",
    name: "Student",
    icon: <FaUser />,
    subRoutes: [
      {
        path: "all-students",
        name: "Student Details ",
        icon: < BiSolidUserDetail/>,
      },
      {
        path: "student-admission",
        name: "Student Addmission",
        icon: <IoPersonAddSharp />,
      },
      {
        path: "student/online-admission-form",
        name: "Student Addmission Form",
        icon: <FaWpforms />,
      },
      {
        path: "student/student-import-export",
        name: "student import export",
        icon: < IoPersonAddSharp/>,
      },
      {
        path: "student/student-attendance-import-export",
        name: "student attendance import export",
        icon: < IoCalendarClear/>,
      },
     
      {
        path: "class/fees-student",
        name: "Fees student",
        icon: <FaMoneyBillTrendUp/>,
      },
      

     
      
    ],
  },
  {
    path: "",
    name: "Teacher",
    icon: <FaChalkboardTeacher />,
    subRoutes: [
      {
        path: "all-teachers",
        name: "Teacher Details ",
        icon: <BiSolidUserDetail />,
      },
      {
        path: "teacher-registration",
        name: "Teacher Registration",
        icon: <IoPersonAddSharp />,
      },
      {
        path: "teacher/teacher-import-export",
        name: "Teacher import export",
        icon: < IoPersonAddSharp/>,
      },
      {
        path: "teacher-attendace",
        name: "Teacher Attendance",
        icon: <MdCoPresent />,
      },
      {
        path: "teacher-timetable",
        name: "Teacher Timetable",
        icon: <FaCalendarAlt />,
      },
      {
        path: "teacher-timetable-upload",
        name: "Add Time Table",
        icon: <FaCalendarAlt />,
      },


      {
        path: "online-add",
        name: "online Addmission",
        icon: <FaUser />,
      },
    
    ],
  },


  {
    path: "Student-information",
    name: "Classes",
    icon: <FaBook />,
    subRoutes: [
      {
        path: "class/all-class",
        name: "All Class",
        icon: <FaUsers  />,
      },
      {
        path: "class/create-class",
        name: "Add Class",
        icon: <FaPlus  />,
      },
      {
        path: "add-subject",
        name: "Add Subject",
        icon: <FaClipboardList />,
       },
       {
        path: "class-promotion",
        name: "Class Promotion",
        icon: <FaArrowAltCircleUp  />,
       },
      {
        path: "class/syllabus",
        name: "syllabus",
        icon: <FaBookReader />,
      },
      {
        path: "class/markspage",
        name: "Marks-Master",
        icon: <FaPercentage  />,
    },
    {
      path: "class/datesheet",
      name: "Date Sheet",
      icon: <FaCalendarAlt />,
  },
    ],
  },


  {
    path: "Time Table", 
    name: "Time table",
    icon: <FaTable />,
    subRoutes: [
      {
        path: "timetable",
        name: "add timetable",
        icon: <FaCalendarAlt />,
      },
      {
        path: "alldaytimetableviewer",
        name: "Show timetable",
        icon: <FaClock />,
      },
      {
        path: "timetableviewer",
        name: "Tiem table Viewer",
        icon: <TodayIcon  />,
      },
      
    ],
  },

  {
    path: "Student-information", 
    name: "Fees Collection",
    icon: <FaMoneyBill />,
    subRoutes: [
      {
        path: "/CollectFees",
        name: "Collect Fees",
        icon: <GiMoneyStack />,
      },
      {
        path: "Student-add",
        name: "Offline Bank Payment",
        icon: <FaLock />,
      },
      {
        path: "online-add",
        name: "Search Fees Payment",
        icon: <FaMoneyCheckDollar />,
      },
      {
        path: "Duefees",
        name: "Search Due Fees",
        icon: <FaMoneyBillTrendUp />,
      },
      {
        path: "Reminder",
        name: "Fees Reminder",
        icon: <GiMoneyStack />,
      },
     
    ],
  },
 
  
 



  {
    path: "Student-information",
    name: "Attendence",
    icon: <FaPersonBooth />,
    subRoutes: [
      {
        path: "Student-detail",
        name: "Student Attendence",
        icon: <FaCalendarAlt />,
      },
      {
        path: "Student-detail",
        name: "Approve Leave",
        icon: <FcLeave />,
      },
      {
        path: "Student-detail",
        name: "Attendence By Date",
        icon: <MdDateRange />,
      },
    ],
  },
  {
    path: "Student-information",
    name: "Examinations",
    icon: <FaBookReader />,
    subRoutes: [
      {
        path: "Student-detail",
        name: "Exam Group",
        icon: <FaLayerGroup />,
      },
      {
        path: "Student-detail",
        name: "Exam Schedule",
        icon: <MdOutlineSchedule />,
      },
      {
        path: "Student-detail",
        name: "Exam Result",
        icon: <PiCertificateFill />,
      },
    ],
  },

  {
    path: "Student-detail",
    name: "Library",
    icon: <HiMiniBuildingLibrary />,
    subRoutes: [
      {
        path: "book-list",
        name: "Book List",
        icon: <FaList  />,
      },
      {
        path: "issue-return",
        name: "Issue-Return",
        icon: <MdAssignmentReturn />,
        
      },

      {
        path: "add-book",
        name: "add-book",
        icon: <MdAssignmentReturn />,
        
      },

      {
        path: "add-student",
        name: "Add Student",
        icon: <IoPersonAddSharp />,
      },
      {
        path: "add-staff",
        name: "Add Staff Member",
        icon: <BiSolidUserDetail />,
      },

      {
        path: "all-issued",
        name: "All Issued book",
        icon: <FaBook />,
      },
    ],
  },
  

  {
    path: "Student-information",
    name: "Transport",
    icon: < MdEmojiTransportation/>,
    subRoutes: [
      {
        path: "Student-detail",
        name: "Fees Master",
        icon: <GiTakeMyMoney />,
        
      },
      {
        path: "Student-detail",
        name: "Pickup-Point",
        icon: <BsFillStoplightsFill />,
      },
      {
        path: "Student-detail",
        name: "Routes",
        icon: <FaRoute />,
      },
      {
        path: "Student-detail",
        name: "Vehicles",
        icon: <RiMotorbikeFill />,
      },
      {
        path: "Student-detail",
        name: "Assign Vehicles",
        icon: <FaBusSimple />,
      },
      {
        path: "Student-detail",
        name: "Route Pickup Point",
        icon: <FaRoute />,
      
      },
      {
        path: "Student-detail",
        name: "Student Transport Fees",
        icon: <FaMoneyBill />,
      },
    ],
  },

 
 
 

  {
    path: "user",
    name: "User",
    icon: <FaUser />,
    subRoutes: [
      {
        path: "user/add-user",
        name: "Add User",
        icon: <HiOutlineUserAdd />,
      },
      {
        path: "user/all-user",
        name: "All user",
        icon: <HiMiniUserGroup />,
      },
    ],
  },
  

  

  {
    path: "settings",
    name: "Settings",
    icon: <BiCog />,
    exact: true,
    subRoutes: [
      {
        path: "android",
        name: "Android ",
        icon: <FaUser />,
      },
      {
        path: "settings/2fa",
        name: "2FA",
        icon: <FaLock />,
      },
      {
        path: "settings/billing",
        name: "Billing",
        icon: <FaMoneyBill />,
      },
    ],
  },
  
];

const SideBar = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  
  

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
            width: isOpen ? "200px" : "45px",

            transition: {
              duration: 0.5,
              type: "spring",
              damping: 10,
            },
          }}
          className={`admin-sidebar `}
        >
          <div className="top_section">
          <h5>PulseZest School </h5>
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
          </section>
        </motion.div>

        <main>{children}</main>
      </div>
    </>
  );
};

export default SideBar;
