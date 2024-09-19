import {
  AppstoreOutlined,
  ShopOutlined,
  ShoppingCartOutlined,
  UserAddOutlined, 
  BookOutlined,
  UsergroupAddOutlined,
  LogoutOutlined,
  DatabaseOutlined ,
} from "@ant-design/icons";
import { Menu } from "antd";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {auth } from '../../../../utils/firebaseConfig'
import { toast } from 'react-toastify';

function SideMenu() {
  const location = useLocation();
  const [selectedKeys, setSelectedKeys] = useState("/");

  useEffect(() => {
    const pathName = location.pathname;
    setSelectedKeys(pathName);
  }, [location.pathname]);

  const navigate = useNavigate();

  const handleLogout = () => {
    auth.signOut() // Sign out the user using Firebase
      .then(() => {
        // Clear user authentication state
        localStorage.removeItem("userType"); 
        // Remove userType from localStorage
        navigate("/");
        toast.success("Logout successfully");
        // Navigate to the login page
      })
      .catch((error) => {
        console.error("Error signing out:", error);
      });
  };

  return (
    <div className="SideMenu">
      <Menu
        className="SideMenuVertical"
        mode="vertical"
        onClick={(item) => {
          if (item.key === 'customers') {
            handleLogout();
          } else {
            navigate(item.key);
          }
        }}
        selectedKeys={[selectedKeys]}
        items={[
          {
            label: "Dashboard",
            icon: <AppstoreOutlined />,
            key: "/librarian",
          },
          {
            label: "BookList",
            key: "booklist",
            icon: <ShopOutlined />,
          },
          {
            label: "Issue Return",
            key: "issue-return",
            icon: <ShoppingCartOutlined />,
        
          },
          {
            label: "Add Book",
            key: "add-book",
            icon: <BookOutlined />,
          },
          {
            label: "Add student",
            key: "add-student",
            icon: <UsergroupAddOutlined />,
          },
          {
            label: "All issued book",
            key: "due-reminder",
            icon: <DatabaseOutlined />,
          },
          {
            label: "Add Staff",
            key: "add-staff",
            icon: <UserAddOutlined />,
          },
          {
            label: "Log Out",
            key: "customers",
            icon: <LogoutOutlined />,
          },
        ]}
      ></Menu>
    </div>
  );
}

export default SideMenu;
