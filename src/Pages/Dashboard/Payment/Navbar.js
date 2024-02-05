import React, { useContext, useEffect, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../../assets/Frame 155 1.png";
import MenuIcon from "@mui/icons-material/Menu";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import axios from "axios";
import { AuthContext } from "../../../contexts/AuthProvider";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";

const Navbar = (props) => {
  const { user, userInfo, logOut } = useContext(AuthContext);
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [state, setState] = useState(false);
  const navigate = useNavigate();
  const drawerWidth = 240;
  const { window } = props;
  const { organizationData } = props;
  console.log(organizationData)

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };


  const handleLogout = () => {
    logOut()
      .then((res) => {
        console.log(res);
        // navigate("/");
      })
      .catch((error) => console.error(error));
  };


  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState(!state);
  };


  const handleDashboard = () => {
    const Role = localStorage.getItem("role");
    if (Role === "admin") {
      navigate("/userManagement");
    } else if (Role === "execution mentor") {
      navigate("/executionMentorDashboard");
    } else if (Role === "unpaid student") {
      navigate("/unpaidStudentDashboard");
    } else if (Role === "expert mentor") {
      navigate("/expertMentorDashboard");
    } else {
      navigate("/dashboard");
    }
  };


  const navItems2 = [
    <>
      {userInfo && (
        <Button
          onClick={() => handleLogout()}
          sx={{
            bgcolor: "#FF557A",
            borderRadius: "22.5px",
            ":hover": { bgcolor: "#94A4FF" },
            color: "white",
            width: "100%",
          }}
          className="my-2 block border-b border-gray-100 py-1 font-semibold text-gray-500 hover:text-black md:mx-2"
        >
          Logout
        </Button>
      )}
    </>,
  ];



  const drawer = (
    <Box
      onClick={handleDrawerToggle}
      sx={{
        textAlign: "center",
        bgcolor: "#141414",
        height: "100%",
        color: "white",
      }}
    >
      <div className="my-8 ml-2 flex gap-2 items-center">
        <img className="h-6 ml-2" src={logo} alt="icon" />
        <h1 className="text-logo-white font-semibold">Experiment Labs</h1>
      </div>
      <Divider />
      <List>
        {navItems2.map((item) => (
          <ListItem key={item} disablePadding>
            <ListItemButton sx={{ textAlign: "center", color: "white" }}>
              <ListItemText primary={item} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );


  const list = () => (
    <Box
      sx={{ width: "100%", height: "50vh" }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <h1 className="text-4xl mt-20 mx-auto w-80">Will be added later</h1>
    </Box>
  );


  const container =
    window !== undefined ? () => window().document.body : undefined;
  const [orgData, setOrgData] = useState({});

  const orgLogo = localStorage.getItem("organizationLogo")
  const paymentNavbarLogo = localStorage.getItem("paymentNavbarLogo")

  const navItems = [
    !user ? (
      <Button
        // onClick={handleClickOpen}
        sx={{
          bgcolor: "#FF557A",
          borderRadius: "22.5px",
          ":hover": { bgcolor: "#94A4FF" },
          color: "white",
          width: "100%",
        }}
        variant="contained"
      >
        Login
      </Button>
    ) : (
      <div className="">
        <div className="group relative cursor-pointer">
          <div className="flex items-center justify-between space-x-5 px-4">
            <Button
              // onClick={() => graphyLogin(user?.email, user?.displayName)}
              sx={{
                bgcolor: orgData?.paymentNavbarAccessDashboardButtonColor ? orgData?.paymentNavbarAccessDashboardButtonColor : "#94A4FF",
                borderRadius: "22.5px",
                ":hover": { bgcolor: "#94A4FF" },
                color: orgData?.paymentNavbarAccessDashboardButtonTextColor ? orgData?.paymentNavbarAccessDashboardButtonTextColor : "white",
                width: "100%",
              }}
              className="menu-hover"
            >
              <button
                onClick={handleDashboard}
                className=""
              >
                {" "}
                Access Dashboard
              </button>
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  className="h-6 w-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                  />
                </svg>
              </span>
            </Button>
          </div>
          <div className="invisible absolute z-50 flex w-full flex-col  py-1 px-4 text-gray-800 shadow-xl group-hover:visible">
            <Button
              onClick={() => handleLogout()}
              sx={{
                bgcolor: organizationData?.paymentNavbarLogoutButtonColor ? organizationData?.paymentNavbarLogoutButtonColor : "#FF557A",
                borderRadius: "22.5px",
                ":hover": { bgcolor: "#94A4FF" },
                color: organizationData?.paymentNavbarLogoutButtonTextColor ? organizationData?.paymentNavbarLogoutButtonTextColor : "white",
                width: "100%",
              }}
              className="my-2 block border-b border-gray-100 py-1 font-semibold text-gray-500 hover:text-black md:mx-2"
            >
              Logout
            </Button>
          </div>
        </div>
      </div>
    ),
  ];


  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_SERVER_API}/api/v1/organizations/${userInfo?.organizationId}`
      )
      .then((response) => {
        setOrgData(response?.data);
      })
      .catch((error) => console.error(error));
  }, [userInfo]);

  // console.log(orgData)
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        component="nav"
        sx={{
          bgcolor: (organizationData?.paymentNavbarColor)? organizationData?.paymentNavbarColor :"#3E4DAC",
          padding: "10px 20px 10px 10px",
          zIndex: "1"
        }}
      >
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, color: "black" }}
          >
            <Link className="flex gap-3 items-center" to={"/"}>
              {organizationData?.paymentNavbarLogo ? (
                <img
                  className="h-6 lg:h-8"
                  src={organizationData?.paymentNavbarLogo}
                  alt="icon"
                />
              ) : (
                <>
                  <img
                    className="h-6 lg:h-8"
                    src={orgLogo}
                    alt="icon"
                  />
                </>
              )}
            </Link>
          </Typography>
          <Box sx={{ display: { xs: "none", sm: "block" }, color: "black" }}>
            {navItems.map((item) => (
              <Button key={item} sx={{ color: "#121212" }}>
                {item}
              </Button>
            ))}
          </Box>
          <IconButton
            color="white"
            aria-label="open drawer"
            edge="end"
            onClick={handleDrawerToggle}
            sx={{ ml: "auto", display: { sm: "none" } }}
          >
            <MenuIcon sx={{ color: "white" }} />
          </IconButton>
          <Drawer anchor={"top"} open={state} onClose={toggleDrawer(false)}>
            {list("top")}
          </Drawer>
        </Toolbar>
      </AppBar>
      <Box component="nav">
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
    </Box>
  );
};

export default Navbar;
