import React, { useContext, useEffect, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import YouTubeIcon from "@mui/icons-material/YouTube";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import TwitterIcon from "@mui/icons-material/Twitter";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import logo from "../../../assets/Logos/Group 2859890.png";
import { Link, useNavigate } from "react-router-dom";
import CryptoJS from "crypto-js";
import MailIcon from "@mui/icons-material/Mail";
import GoogleLogo from "../../../assets/icons/googleIcon.png";
import "./style.css";
import {
  Link as ScrollLink,
  animateScroll as scroll,
  scrollSpy,
  scroller,
} from "react-scroll"; // Import ScrollLink, scroll, scrollSpy, and scroller
import { AuthContext } from "../../../contexts/AuthProvider";
import { GoogleAuthProvider } from "firebase/auth";
import { Dialog, useMediaQuery, useTheme } from "@mui/material";

const ScienceInnovationNav = (props) => {
  const [state, setState] = React.useState(false);

  const scrollToSection = (sectionId) => {
    scroll.scrollTo(sectionId, {
      duration: 500, // Adjust the duration as needed
      smooth: "easeInOutQuart", // Adjust the easing function as needed
    });
  };

  const [activeSection, setActiveSection] = useState("");

  const handleSetActiveSection = (sectionId) => {
    setActiveSection(sectionId);
  };

  useEffect(() => {
    scrollSpy.update();
  }, []);

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState(!state);
  };

  const list = () => (
    <Box
      sx={{ width: "100%", height: "50vh" }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      {/* <List>
                {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
                    <ListItem key={text} disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                            </ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
            <Divider />
            <List>
                {['All mail', 'Trash', 'Spam'].map((text, index) => (
                    <ListItem key={text} disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                            </ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List> */}
      <h1 className="text-4xl mt-20 mx-auto w-80">Will be added later</h1>
    </Box>
  );
  const { signIn, providerLogin, createUser, updateUserProfile, user, logOut } =
    useContext(AuthContext);

  const [error, setError] = useState("");
  const [loginData, setLoginData] = useState({});
  const [loginDataMain, setLoginDataMain] = useState({});
  const [newLogin, setNewLogin] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logOut()
      .then((res) => {
        console.log(res);
        navigate("/");
      })
      .catch((error) => console.error(error));
  };
  const [open, setOpen] = React.useState(false);
  const [open1, setOpen1] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);
  // const [error, setError] = React.useState("");
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleClickOpen1 = () => {
    setOpen1(true);
  };

  const handleClose1 = () => {
    setOpen1(false);
  };
  const handleClickOpen2 = () => {
    setOpen2(true);
  };

  const handleClose2 = () => {
    setOpen2(false);
  };

  const drawerWidth = 240;
  const navItemSytle = `
    text-white hover:text-cyan hover:transition-colors hover:delay-300 hover:ease-in-out
`;
  const navItems = [
    <div
      style={{ fontSize: "16px", textTransform: "initial" }}
      className={navItemSytle}
    >
      Admissions
    </div>,
    <div
      style={{ fontSize: "16px", textTransform: "initial" }}
      className={navItemSytle}
    >
      Student Life
    </div>,
    <div
      style={{ fontSize: "16px", textTransform: "initial" }}
      className={navItemSytle}
    >
      Careers
    </div>,
    <div
      style={{ fontSize: "16px", textTransform: "initial" }}
      className={navItemSytle}
    >
      Research
    </div>,
    !user ? (
      <Button
        onClick={handleClickOpen}
        sx={{
          bgcolor: "#FF557A",
          borderRadius: "22.5px",
          ":hover": { bgcolor: "#94A4FF" },
          color: "white",
          width: "100%",
        }}
        variant="contained"
      >
        {/* <Link to={'/login'}>Login</Link> */}Login
      </Button>
    ) : (
      <Button
        onClick={handleLogout}
        sx={{
          bgcolor: "#FF557A",
          borderRadius: "22.5px",
          ":hover": { bgcolor: "#94A4FF" },
          color: "white",
          width: "100%",
        }}
        variant="contained"
      >
        <Link>Log Out</Link>
      </Button>
    ),
    <Button
      //   onClick={handleLogout}
      sx={{
        bgcolor: "#FF557A",
        borderRadius: "22.5px",
        ":hover": { bgcolor: "#94A4FF" },
        color: "white",
        width: "100%",
      }}
      variant="contained"
    >
      <Link>Apply Now</Link>
    </Button>,
  ];

  const navItems2 = [
    <Button
      onClick={toggleDrawer(true)}
      sx={{ color: "#fff", bgcolor: "#121212", textTransform: "initial" }}
      size="medium"
      variant="text"
    >
      Admissions
    </Button>,
    <Button
      onClick={toggleDrawer(true)}
      sx={{ color: "#fff", bgcolor: "#121212", textTransform: "initial" }}
      size="medium"
      variant="text"
    >
      Student Life
    </Button>,
    <Button
      onClick={toggleDrawer(true)}
      sx={{ color: "#fff", bgcolor: "#121212", textTransform: "initial" }}
      size="medium"
      variant="text"
    >
      Careers
    </Button>,
    <Button
      onClick={toggleDrawer(true)}
      sx={{ color: "#fff", bgcolor: "#121212", textTransform: "initial" }}
      size="medium"
      variant="text"
    >
      Research
    </Button>,
    !user ? (
      <Button
        onClick={handleClickOpen}
        sx={{
          bgcolor: "#FF557A",
          borderRadius: "22.5px",
          ":hover": { bgcolor: "#94A4FF" },
          color: "white",
          width: "100%",
        }}
        variant="contained"
      >
        {/* <Link to={'/login'}>Login</Link> */}Login
      </Button>
    ) : (
      <Button
        onClick={handleLogout}
        sx={{
          bgcolor: "#FF557A",
          borderRadius: "22.5px",
          ":hover": { bgcolor: "#94A4FF" },
          color: "white",
          width: "100%",
        }}
        variant="contained"
      >
        <Link>Log Out</Link>
      </Button>
    ),
    <Button
      onClick={toggleDrawer(true)}
      sx={{
        bgcolor: "#FF557A",
        ":hover": { bgcolor: "#FF557A" },
        color: "black",
      }}
      variant="contained"
      endIcon={<ExpandMoreIcon />}
    >
      All Courses
    </Button>,
  ];

  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const graphyLogin = async (email, displayName) => {
    console.log(email, displayName);
    try {
      const payload = {
        name: displayName,
        email: email,
        exp: Math.floor(Date.now() / 1000) + 60 * 60, // Set the token expiration time
      };

      // Convert the payload to a Base64Url encoded string
      const payloadBase64 = btoa(JSON.stringify(payload))
        .replace(/=/g, "")
        .replace(/\+/g, "-")
        .replace(/\//g, "_");

      // Construct the header
      const header = {
        alg: "HS256",
        typ: "JWT",
      };

      // Convert the header to a Base64Url encoded string
      const headerBase64 = btoa(JSON.stringify(header))
        .replace(/=/g, "")
        .replace(/\+/g, "-")
        .replace(/\//g, "_");

      // Your API token obtained from Graphy
      const apiToken = process.env.REACT_APP_key;

      // Construct the signature
      const signature = CryptoJS.HmacSHA256(
        `${headerBase64}.${payloadBase64}`,
        apiToken
      );

      // Convert the signature to a Base64Url encoded string
      const signatureBase64 = CryptoJS.enc.Base64.stringify(signature)
        .replace(/=/g, "")
        .replace(/\+/g, "-")
        .replace(/\//g, "_");

      // Construct the SSO URL with the JWT token
      const ssoUrl = `https://www.experimentlabs.in/t/u/activeCourses?ssoToken=${headerBase64}.${payloadBase64}.${signatureBase64}`;

      // Redirect the user to the SSO URL
      // window.location.href = ssoUrl;
      const a = document.createElement("a");
      a.href = ssoUrl;
      a.click();
    } catch (error) {
      console.error(error);
    }
  };

  //Login with google provider
  const handleGoogleSignIn = () => {
    const googleProvider = new GoogleAuthProvider();
    providerLogin(googleProvider)
      .then((result) => {
        const email = result?.user?.email;
        const displayName = result?.user?.displayName;
        navigate("/dashboard");
        if (email) {
          graphyLogin(email, displayName);
        }
        setError("");
      })
      .catch((error) => {
        console.error(error);
        setError(error.message);
      });
  };

  const handleOnBlur = (e) => {
    const field = e.target.name;
    const value = e.target.value;
    const newLoginData = { ...loginData };
    newLoginData[field] = value;
    setLoginData(newLoginData);
  };

  // const registerUser = (e) => {
  //   console.log(loginData);
  //   e.preventDefault();
  // };

  // Register user with Email Password
  const registerUser = (e) => {
    createUser(loginData.email, loginData.password)
      .then((userCredential) => {
        // sent name to firebase
        updateUserProfile({
          displayName: loginData.name,
        })
          .then(() => {
            graphyLogin(loginData.email, loginData.name);
            // navigate("/dashboard");
          })
          .catch((error) => {});
      })
      .catch((error) => {
        console.log(error.message);
      });
    e.preventDefault();
  };

  // Login user with Email Password
  const loginUser = (email, password, location, history) => {
    signIn(email, password)
      .then((userCredential) => {})
      .catch((error) => {});
  };

  const handleOnChange = (e) => {
    const field = e.target.name;
    const value = e.target.value;
    const newLoginData = { ...loginDataMain };
    newLoginData[field] = value;
    setLoginDataMain(newLoginData);
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      await signIn(loginDataMain.email, loginDataMain.password).then(() => {
        setNewLogin(true);
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (newLogin) {
      if (user) {
        graphyLogin(user.email, user.displayName);
      }
    }
  }, [user]);

  const drawer = (
    <Box
      onClick={handleDrawerToggle}
      sx={{ textAlign: "center", bgcolor: "#121212", height: "100%" }}
    >
      <Typography variant="h6" sx={{ my: 2 }}>
        <img className="h-10 ml-2" src={logo} alt="icon" />
      </Typography>
      <Divider />
      <div>
        {navItems2.map((item) => (
          <ListItem key={item} disablePadding>
            <ListItemButton sx={{ textAlign: "left", color: "white" }}>
              <span>{item}</span>
            </ListItemButton>
          </ListItem>
        ))}
      </div>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
        sx={{ width: "100%", borderRadius: "22px" }}
      >
        <div className="w-full lg:min-w-[400px]  h-full lg:min-h-[475px] bg-[#141414] text-white  mx-auto border-2 border-white p-8 flex justify-center items-center  ">
          <div className="text-center">
            <span
              onClick={handleClose}
              className=" cursor-pointer absolute top-3 right-5 text-[20px]"
            >
              x
            </span>
            <h1 className="text-[#FF557A] text-[27px]">Login</h1>
            <p className="text-[#FF557A] mb-[43px]">
              to continue using the Experiment Labs
            </p>
            <div className="">
              <button
                onClick={handleGoogleSignIn}
                aria-label="Login with Google"
                type="button"
                className="flex items-center justify-center w-full p-3 space-x-4 border rounded-[24px] hover:transition-all hover:delay-200 hover:ease-out hover:bg-slate-200 bg-white text-black mb-[25px]"
              >
                <img className="w-[20px] h-[20px]" src={GoogleLogo} alt="" />
                <p className="text-[20px]">Continue with Google</p>
              </button>
              <button
                onClick={() => {
                  handleClose();
                  handleClickOpen1();
                }}
                aria-label="Login with Google"
                type="button"
                className="flex items-center justify-center w-full p-3 space-x-4 border rounded-[24px] hover:transition-all hover:delay-200 hover:ease-out hover:bg-slate-200 bg-white text-black mb-[25px]"
              >
                <MailIcon className="" />
                <p className="text-[20px]">Continue with Email</p>
              </button>
            </div>
            <p>
              Don't have an account?{" "}
              <span
                onClick={() => {
                  handleClickOpen2();
                  handleClose();
                }}
                className="text-[#FF557A] cursor-pointer"
              >
                Register
              </span>
            </p>
          </div>
        </div>
        {/* <div className="">
          <div className="w-full lg:min-w-[400px] h-full lg:min-h-[70vh] p-8 rounded-[22px] bg-[#141414] text-white mx-auto shadow-xl border-2 border-white">
            <h1 className="text-2xl font-bold text-cyan mb-6">Login</h1>
            <form
              onSubmit={handleSubmit}
              noValidate=""
              action=""
              className="space-y-6 ng-untouched ng-pristine ng-valid"
            >
              <div className="space-y-3 text-sm">
                <label htmlFor="username" className="block">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="username"
                  placeholder="Email"
                  className="w-full rounded-xl border px-4 py-3 border-gray-300 bg-gray-50 text-gray-800 focus:border-red-600"
                  required
                />
              </div>
              <div className="space-y-3 text-sm">
                <label htmlFor="password" className="block">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Password"
                  className="border w-full px-4 py-3 rounded-xl border-gray-300 bg-gray-50 text-gray-800 focus:border-red-600"
                  required
                />
              </div>
              <input
                type="submit"
                value="Login"
                className="block w-full p-3 text-center rounded-xl text-gray-50 bg-cyan hover:bg-opacity-70 font-bold hover:transition-all hover:delay-200 hover:ease-out"
              />
              <p className="text-center text-error">
                <small>{error}</small>
              </p>
            </form>
            <div className="flex items-center">
              <div className="flex-1 h-px sm:w-16 bg-gray-300"></div>
              <p className="px-3 text-sm">Or</p>
              <div className="flex-1 h-px sm:w-16 bg-gray-300"></div>
            </div>
            <div className="flex justify-center mt-4 mb-4">
              <button
                onClick={handleGoogleSignIn}
                aria-label="Login with Google"
                type="button"
                className="flex items-center justify-center w-full p-3 space-x-4 border rounded-xl font-bold hover:bg-[#585858] hover:transition-all hover:delay-200 hover:ease-out"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 32 32"
                  className="w-5 h-5 fill-current text-blue-500"
                >
                  <path d="M16.318 13.714v5.484h9.078c-0.37 2.354-2.745 6.901-9.078 6.901-5.458 0-9.917-4.521-9.917-10.099s4.458-10.099 9.917-10.099c3.109 0 5.193 1.318 6.38 2.464l4.339-4.182c-2.786-2.599-6.396-4.182-10.719-4.182-8.844 0-16 7.151-16 16s7.156 16 16 16c9.234 0 15.365-6.49 15.365-15.635 0-1.052-0.115-1.854-0.255-2.651z"></path>
                </svg>
                <p>Login with Google</p>
              </button>
            </div>
            <p className="text-xs text-center sm:px-6">
              Don't have an account?
              <Link
                rel="noopener noreferrer"
                to="/register"
                className="underline text-error"
              >
                {" "}
                Register
              </Link>
            </p>
          </div>
        </div> */}
      </Dialog>
      <Dialog
        fullScreen={fullScreen}
        open={open1}
        onClose={handleClose1}
        aria-labelledby="responsive-dialog-title"
        sx={{ width: "100%", borderRadius: "22px" }}
      >
        <div className="w-full lg:min-w-[400px]  h-full lg:min-h-[475px] bg-[#141414] text-white  mx-auto border-2 border-white p-8 flex justify-center items-center  ">
          <div className="text-center">
            <span
              onClick={handleClose1}
              className=" cursor-pointer absolute top-3 right-5 text-[20px]"
            >
              x
            </span>
            <h1 className="text-[#FF557A] text-[27px]">Login</h1>
            <p className="text-[#FF557A] text-[16px] mb-[45px]">
              to continue using the Experiment Labs
            </p>
            <form onSubmit={handleLoginSubmit} className="flex flex-col">
              <label className="text-[18px] mb-[9px]" htmlFor="email">
                Enter Email
              </label>
              <input
                type="email"
                name="email"
                onChange={handleOnChange}
                className=" text-[black] text-[17px] text-center leading-[38px] rounded-[25px] mb-[19px]"
                placeholder="Enter your email"
              />
              <label className="text-[18px] mb-[9px]" htmlFor="password">
                Password
              </label>
              <input
                type="password"
                name="password"
                onChange={handleOnChange}
                className=" text-[black] text-[17px] text-center leading-[38px] rounded-[25px] mb-[19px]"
                placeholder="Enter password"
              />
              <button
                onClick={() => {
                  handleClose();
                  handleClickOpen1();
                }}
                className="text-[20px] bg-[#FF557A] w-fit self-center py-[8px] px-[40px] rounded-[25px] mb-[18px]"
              >
                Login
              </button>
            </form>
            <p>
              Don't have an account?{" "}
              <span
                onClick={() => {
                  handleClickOpen2();
                  handleClose1();
                }}
                className="text-[#FF557A] cursor-pointer"
              >
                Register
              </span>
            </p>
          </div>
        </div>
      </Dialog>
      <Dialog
        fullScreen={fullScreen}
        open={open2}
        onClose={handleClose2}
        aria-labelledby="responsive-dialog-title"
        sx={{ width: "100%", borderRadius: "22px" }}
      >
        <div className="w-full lg:min-w-[400px]  h-full lg:min-h-[475px] bg-[#141414] text-white  mx-auto border-2 border-white p-8 flex justify-center items-center  ">
          <div className="text-center">
            <span
              onClick={handleClose2}
              className=" cursor-pointer absolute top-3 right-5 text-[20px]"
            >
              x
            </span>
            <h1 className="text-[#FF557A] text-[27px] mb-[25px]">Register</h1>
            <form onSubmit={registerUser} className="flex flex-col">
              <label className="text-[18px] mb-[9px]" htmlFor="name">
                Enter Name
              </label>
              <input
                type="text"
                name="name"
                required
                onBlur={handleOnBlur}
                className=" text-[black] text-[17px] text-center leading-[38px] rounded-[25px] mb-[19px]"
                placeholder="Enter your email"
              />
              <label className="text-[18px] mb-[9px]" htmlFor="email">
                Enter Email
              </label>
              <input
                type="email"
                name="email"
                required
                onBlur={handleOnBlur}
                className=" text-[black] text-[17px] text-center leading-[38px] rounded-[25px] mb-[19px]"
                placeholder="Enter your email"
              />
              <label className="text-[18px] mb-[9px]" htmlFor="password">
                Password
              </label>
              <input
                type="password"
                name="password"
                required
                onBlur={handleOnBlur}
                className=" text-[black] text-[17px] text-center leading-[38px] rounded-[25px] mb-[19px]"
                placeholder="Enter Confirm Email"
              />
              <button
                type="submit"
                className="text-[20px] bg-[#FF557A] w-fit self-center py-[8px] px-[40px] rounded-[25px] mb-[18px]"
              >
                Register
              </button>
            </form>
            <p>
              Already have an account?{" "}
              <span
                onClick={() => {
                  handleClickOpen();
                  handleClose2();
                }}
                className="text-[#FF557A] cursor-pointer"
              >
                Login
              </span>
            </p>
          </div>
        </div>
      </Dialog>
      <CssBaseline />
      <AppBar component="nav">
        <Toolbar sx={{ bgcolor: "#141414", padding: "10px 20px 10px 10px" }}>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, color: "black" }}
          >
            <Link to={"/"}>
              <img className="h-8 lg:h-12" src={logo} alt="icon" />
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
            color="black"
            aria-label="open drawer"
            edge="end"
            onClick={handleDrawerToggle}
            sx={{ ml: "auto", display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Drawer anchor={"top"} open={state} onClose={toggleDrawer(false)}>
            {list("top")}
          </Drawer>
        </Toolbar>

        <div className=" bg-[#141414]">
          <div className="bg-[#37417E] mx-10 px-10 py-2 lg:px-32 rounded-b-3xl"></div>
        </div>

        {/*  <div className='bg-[#37417E] px-10 lg:py-2 lg:px-32 font mx-10 rounded-b-3xl'>
                    <div className='flex justify-start lg:justify-center gap-10 items-center overflow-x-scroll hidden-scroll'>
                          
                        <ScrollLink
                            to='overview'
                            smooth={true}
                            duration={500}
                            onClick={() => scrollToSection('overview')}
                            spy={true}
                            className="px-3 py-2 cursor-pointer"
                            activeClass="bg-custom-blue px-3 py-2 cursor-pointer bg-opacity-30 border-b-2 border-custom-blue"
                            onSetActive={handleSetActiveSection}
                        >Overview</ScrollLink>

                        <ScrollLink
                            to='masters'
                            smooth={true}
                            duration={500}
                            onClick={() => scrollToSection('masters')}
                            spy={true}
                            className="px-3 py-2 cursor-pointer"
                            activeClass="bg-custom-blue px-3 py-2 cursor-pointer bg-opacity-30 border-b-2 border-custom-blue"
                            onSetActive={handleSetActiveSection}
                        >Masters</ScrollLink>

                        <ScrollLink
                            to='curriculum'
                            smooth={true}
                            duration={500}
                            onClick={() => scrollToSection('curriculum')}
                            spy={true}
                            className="px-3 py-2 cursor-pointer"
                            activeClass="bg-custom-blue px-3 py-2 cursor-pointer bg-opacity-30 border-b-2 border-custom-blue"
                            onSetActive={handleSetActiveSection}
                        >Curriculum</ScrollLink>

                        <ScrollLink
                            to='campus'
                            smooth={true}
                            duration={500}
                            onClick={() => scrollToSection('campus')}
                            spy={true}
                            className="px-3 py-2 cursor-pointer"
                            activeClass="bg-custom-blue px-3 py-2 cursor-pointer bg-opacity-30 border-b-2 border-custom-blue"
                            onSetActive={handleSetActiveSection}
                        >Campus</ScrollLink>

                        <ScrollLink
                            to='faqs'
                            smooth={true}
                            duration={500}
                            onClick={() => scrollToSection('faqs')}
                            spy={true}
                            className="px-3 py-2 cursor-pointer"
                            activeClass="bg-custom-blue px-3 py-2 cursor-pointer bg-opacity-30 border-b-2 border-custom-blue"
                            onSetActive={handleSetActiveSection}
                        >FAQs</ScrollLink>

                        <ScrollLink
                            to='news'
                            smooth={true}
                            duration={500}
                            onClick={() => scrollToSection('news')}
                            spy={true}
                            className="px-3 py-2 cursor-pointer"
                            activeClass="bg-custom-blue px-3 py-2 cursor-pointer bg-opacity-30 border-b-2 border-custom-blue"
                            onSetActive={handleSetActiveSection}
                        >News</ScrollLink>

                    </div>
                </div> */}
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

ScienceInnovationNav.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: ScienceInnovationNav.func,
};

export default ScienceInnovationNav;
