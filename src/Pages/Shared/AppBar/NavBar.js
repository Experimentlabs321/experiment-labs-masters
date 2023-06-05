import React, { useContext, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import YouTubeIcon from '@mui/icons-material/YouTube';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/Twitter';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import logo from '../../../assets/Frame 155 1.png';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../contexts/AuthProvider';
import { Dialog, useMediaQuery, useTheme } from '@mui/material';
import qs from 'qs';
import axios from 'axios';
import { GoogleAuthProvider } from 'firebase/auth';
import CryptoJS from 'crypto-js';



const NavBar = (props) => {
    const [state, setState] = React.useState(false);

    const toggleDrawer = (open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setState(!state);
    };

    const list = () => (
        <Box
            sx={{ width: '100%', height: "50vh" }}
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
            <h1 className='text-4xl mt-20 mx-auto w-80'>Will be added later</h1>
        </Box>
    );

    const drawerWidth = 240;
    const navItemSytle = `
    bg-gray-400 p-[3px] rounded-full hover:bg-cyan hover:transition-colors hover:delay-300 hover:ease-in-out
`;
    const { user, logOut } = useContext(AuthContext);

    const handleLogout = () => {
        logOut()
            .then(res => {
                console.log(res);
                navigate('/');
            })
            .catch(error => console.error(error))
    }



    const { window } = props;
    const [mobileOpen, setMobileOpen] = React.useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen((prevState) => !prevState);
    };

    // const [open, setOpen] = React.useState(false);
    // // const [error, setError] = React.useState("");
    // const theme = useTheme();
    // const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

    // const handleClickOpen = () => {
    //     setOpen(true);
    // };

    // const handleClose = () => {
    //     setOpen(false);
    // };


    // const handleSubmit = event => {
    //     event.preventDefault();
    //     const form = event.target;
    //     const name = form.name.value;
    //     const email = form.email.value;
    //     const phone = form.phone.value;
    //     const selectClass = form.selectClass.value;

    //     console.log(name, email, phone, selectClass);

    //     if (!name || !email || !phone || !selectClass) {
    //         setError("Please fill in all the fields");
    //     }

    //     else {

    //         const a = document.createElement('a');
    //         a.href = 'https://drive.google.com/uc?export=download&id=1-g7Bsun3RvKAezjWFZOL9QOvlnfcELRk';
    //         a.download = 'Brochure.pdf'; // Set the desired file name
    //         a.click();
    //         handleClose();
    //     }
    // }


    const { signIn, providerLogin } = useContext(AuthContext);

    const [error, setError] = useState('');

    const navigate = useNavigate();




    // login with email and password
    // const handleSubmit = event => {
    //     // event.preventDefault();
    //     // const form = event.target;
    //     // const email = form.email.value;
    //     // const password = form.password.value;

    //     // console.log(email, password);

    //     // signIn(email, password)
    //     //     .then(result => {
    //     //         const user = result.user;
    //     //         console.log(user);
    //     //         form.reset();
    //     //         setError('');

    //     //         const currentUser = {
    //     //             email: user?.email
    //     //         }

    //     //         //get token
    //     //         fetch(`https://dentist-fantastic-server.vercel.app/jwt`, {
    //     //             method: 'POST',
    //     //             headers: {
    //     //                 'content-type': 'application/json'
    //     //             },
    //     //             body: JSON.stringify(currentUser)
    //     //         })
    //     //             .then(res => res.json())
    //     //             .then(data => {
    //     //                 console.log(data);
    //     //                 localStorage.setItem('token', data.token);
    //     //                 // navigate to old page
    //     //                 navigate(from, { replace: true });
    //     //             })
    //     //             .catch(err => console.error(err));


    //     //     })
    //     //     .catch(error => {
    //     //         console.error(error);
    //     //         setError(error.message)
    //     //     })
    // }



    // const graphyLogin = async (email, displayName) => {
    //     // event.preventDefault();

    //     // const postData = {
    //     //     mid: 'namanjain4098',
    //     //     key: '2eb5be47-6526-4578-821b-400a74e63d9b',
    //     //     email: 'john@xyz.com',
    //     //     name: 'john'
    //     // }

    //     // fetch('https://api.ongraphy.com/public/v1/learners', {
    //     //     method: 'POST',
    //     //     headers: {
    //     //         'content-type': '<string>'
    //     //     },
    //     //     body: JSON.stringify(postData)
    //     // })
    //     //     .then(res => res.json())
    //     //     .then(data => {
    //     //         console.log(data);
    //     //     })
    //     //     .catch(error => console.error(error))



    //     const data = qs.stringify({
    //         mid: process.env.REACT_APP_mid,
    //         key: process.env.REACT_APP_key,
    //         email: email,
    //         name: displayName
    //     });

    //     const config = {
    //         method: 'post',
    //         url: 'https://api.ongraphy.com/public/v1/learners',
    //         headers: {
    //             'Content-Type': 'application/x-www-form-urlencoded'
    //         },
    //         data: data
    //     };

    //     axios(config)
    //         .then(response => {
    //             console.log(JSON.stringify(response.data?.status));
    //             // Construct the payload for the JWT token
    //             const payload = {
    //                 name: displayName,
    //                 email: email,
    //                 exp: 1616239022,
    //             };

    //             // Convert the payload to a Base64Url encoded string
    //             const payloadBase64 = btoa(JSON.stringify(payload))
    //                 .replace(/=/g, '')
    //                 .replace(/\+/g, '-')
    //                 .replace(/\//g, '_');

    //             // console.log(payloadBase64);

    //             // Construct the header
    //             const header = {
    //                 alg: "HS256",
    //                 typ: "JWT"
    //             };

    //             // Convert the header to a Base64Url encoded string
    //             const headerBase64 = btoa(JSON.stringify(header))
    //                 .replace(/=/g, '')
    //                 .replace(/\+/g, '-')
    //                 .replace(/\//g, '_');


    //             //console.log(headerBase64);



    //             // Your API token obtained from Graphy
    //             const apiToken = process.env.REACT_APP_key;

    //             // Construct the signature
    //             const signature = CryptoJS.HmacSHA256(headerBase64 + "." + payloadBase64, apiToken);

    //             // Convert the signature to a Base64Url encoded string
    //             const signatureBase64 = CryptoJS.enc.Base64.stringify(signature)
    //                 .replace(/=/g, '')
    //                 .replace(/\+/g, '-')
    //                 .replace(/\//g, '_');

    //             console.log(signatureBase64);

    //             // // Construct the JWT token
    //             // const jwtToken = `${headerBase64}.${payloadBase64}.${signatureBase64}`;

    //             // Construct the SSO URL with the JWT token
    //             const ssoUrl = `login/&returnurl=https://experiment-labs-masters.web.app/mycourses?ssoToken=${signatureBase64}`;

    //             // // Redirect the user to the SSO URL
    //             // //window.location.href = ssoUrl;
    //             navigate(ssoUrl);
    //             // console.log("SSO URL --->",ssoUrl);

    //         })
    //         .catch(error => {
    //             console.log(error);
    //         });



    // }



    //Login with google provider
    // const handleGoogleSignIn = () => {
    //     const googleProvider = new GoogleAuthProvider();
    //     providerLogin(googleProvider)
    //         .then(result => {
    //             const email = result?.user?.email;
    //             const displayName = result?.user?.displayName;
    //             console.log(email, displayName);
    //             if (email) {
    //                 graphyLogin(email, displayName);
    //             }
    //             setError('');

    //         })
    //         .catch(error => {
    //             console.error(error);
    //             setError(error.message)
    //         });
    // }



    const navItems = [
        <InstagramIcon style={{ fontSize: '36px' }} className={navItemSytle} />,
        <YouTubeIcon style={{ fontSize: '36px' }} className={navItemSytle} />,
        <LinkedInIcon style={{ fontSize: '36px' }} className={navItemSytle} />,
        <TwitterIcon style={{ fontSize: '36px' }} className={navItemSytle} />,
        (!user ? <Button sx={{ bgcolor: '#94A4FF', borderRadius:'22.5px' , ":hover": { bgcolor: '#FF557A' }, color: 'white', width:'100%' }} variant="contained">
            <Link to={'/login'}>Login</Link>
        </Button> :
            <Button onClick={handleLogout} sx={{ bgcolor: '#94A4FF', borderRadius:'22.5px' , ":hover": { bgcolor: '#FF557A' }, color: 'white', width:'100%' }} variant="contained">
                <Link>Log Out</Link>
            </Button>
        ),
        <Button onClick={toggleDrawer(true)} sx={{ bgcolor: '#FF557A', ":hover": { bgcolor: '#94A4FF', }, color: 'white',  width:'100%',borderRadius:'22.5px' }} variant="contained" endIcon={<ExpandMoreIcon />}>
            All Courses
        </Button>,
    ];

    const navItems2 = [
        <Button sx={{ color: '#fff', bgcolor: '#121212' }} size='medium' variant="text" startIcon={<InstagramIcon />}>
            Instagram
        </Button>,
        <Button sx={{ color: '#fff', bgcolor: '#121212' }} size='medium' variant="text" startIcon={<YouTubeIcon />}>
            YouTube
        </Button>,
        <Button sx={{ color: '#fff', bgcolor: '#121212' }} size='medium' variant="text" startIcon={<LinkedInIcon />}>
            LinkedIn
        </Button>,
        <Button sx={{ color: '#fff', bgcolor: '#121212' }} size='medium' variant="text" startIcon={<TwitterIcon />}>
            Twitter
        </Button>,
        <Button sx={{ bgcolor: '#94A4FF', borderRadius:'22.5px' , ":hover": { bgcolor: '#FF557A' }, color: 'white', width:'100%' }} variant="outline">
            <Link to={'/login'}>Login</Link>
        </Button>,
        <Button onClick={toggleDrawer(true)} sx={{ bgcolor: '#FF557A', ":hover": { bgcolor: '#94A4FF', }, color: 'white',  width:'100%',borderRadius:'22.5px' }} variant="contained" endIcon={<ExpandMoreIcon />}>
            All Courses
        </Button>
    ];



    const drawer = (
        <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center', bgcolor: '#141414', height: '100%', color:'white' }}>
            <div className='my-8 ml-2 flex gap-2 items-center'>
                <img className='h-6 ml-2' src={logo} alt="icon" />
                <h1 className='text-logo-white font-semibold'>Experiment Labs</h1>
            </div>
            <Divider />
            <List>
                {navItems2.map((item) => (
                    <ListItem key={item} disablePadding>
                        <ListItemButton sx={{ textAlign: 'center', color: 'white' }}>
                            <ListItemText primary={item} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Box>
    );

    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar component="nav" sx={{ bgcolor: '#141414', padding: '10px 20px 10px 10px' }}>
                <Toolbar>

                    <Typography
                        variant="h6"
                        component="div"
                        sx={{ flexGrow: 1, color: 'black' }}
                    >
                        <Link className='flex gap-3 items-center' to={'/'}>
                            <img className='h-6 md:h-8' src={logo} alt="icon" />
                            <h1 className='text-logo-white font-semibold'>Experiment Labs</h1>
                        </Link>

                    </Typography>
                    <Box sx={{ display: { xs: 'none', sm: 'block' }, color: 'black' }}>
                        {navItems.map((item) => (
                            <Button key={item} sx={{ color: '#121212' }}>
                                {item}
                            </Button>
                        ))}
                    </Box>
                    <IconButton
                        color="white"
                        aria-label="open drawer"
                        edge="end"
                        onClick={handleDrawerToggle}
                        sx={{ ml: 'auto', display: { sm: 'none' } }}
                    >
                        <MenuIcon sx={{color:'white'}} />
                    </IconButton>
                    <Drawer
                        anchor={'top'}
                        open={state}
                        onClose={toggleDrawer(false)}
                    >
                        {list('top')}
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
                        display: { xs: 'block', sm: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                >
                    {drawer}
                </Drawer>
            </Box>
            {/* <Dialog
                fullScreen={fullScreen}
                open={open}
                onClose={handleClose}
                aria-labelledby="responsive-dialog-title"
                sx={{ width: '100%', borderRadius: '10px' }}
            >

                <div className="w-full lg:min-w-[400px] h-full lg:min-h-[70vh] p-8 bg-[#424242] text-white mx-auto shadow-xl border-2 border-cyan">
                    <h1 className="text-2xl font-bold text-cyan mb-6">Login</h1>
                    <form onSubmit={handleSubmit} noValidate="" action="" className="space-y-6 ng-untouched ng-pristine ng-valid">
                        <div className="space-y-3 text-sm">
                            <label htmlFor="username" className="block">Email</label>
                            <input type="email" name="email" id="username" placeholder="Email" className="w-full rounded-xl border px-4 py-3 border-gray-300 bg-gray-50 text-gray-800 focus:border-red-600" required />
                        </div>
                        <div className="space-y-3 text-sm">
                            <label htmlFor="password" className="block">Password</label>
                            <input type="password" name="password" id="password" placeholder="Password" className="border w-full px-4 py-3 rounded-xl border-gray-300 bg-gray-50 text-gray-800 focus:border-red-600" required />

                        </div>
                        <input type='submit' value='Login' className="block w-full p-3 text-center rounded-xl text-gray-50 bg-cyan hover:bg-opacity-70 font-bold hover:transition-all hover:delay-200 hover:ease-out" />
                        <p className='text-center text-error'><small>{error}</small></p>
                    </form>
                    <div className="flex items-center">
                        <div className="flex-1 h-px sm:w-16 bg-gray-300"></div>
                        <p className="px-3 text-sm">Or</p>
                        <div className="flex-1 h-px sm:w-16 bg-gray-300"></div>
                    </div>
                    <div className="flex justify-center mt-4 mb-4">
                        <button onClick={handleGoogleSignIn} aria-label="Login with Google" type="button" className="flex items-center justify-center w-full p-3 space-x-4 border rounded-xl font-bold hover:bg-[#585858] hover:transition-all hover:delay-200 hover:ease-out">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" className="w-5 h-5 fill-current text-blue-500">
                                <path d="M16.318 13.714v5.484h9.078c-0.37 2.354-2.745 6.901-9.078 6.901-5.458 0-9.917-4.521-9.917-10.099s4.458-10.099 9.917-10.099c3.109 0 5.193 1.318 6.38 2.464l4.339-4.182c-2.786-2.599-6.396-4.182-10.719-4.182-8.844 0-16 7.151-16 16s7.156 16 16 16c9.234 0 15.365-6.49 15.365-15.635 0-1.052-0.115-1.854-0.255-2.651z"></path>
                            </svg>
                            <p>Login with Google</p>
                        </button>
                    </div>
                    <p className="text-xs text-center sm:px-6">Don't have an account?
                        <Link rel="noopener noreferrer" to='/register' className="underline text-error"> Register</Link>
                    </p>
                </div>


            </Dialog> */}

        </Box>

    );
};

NavBar.propTypes = {
    /**
     * Injected by the documentation to work in an iframe.
     * You won't need it on your project.
     */
    window: NavBar.func,
};


export default NavBar;