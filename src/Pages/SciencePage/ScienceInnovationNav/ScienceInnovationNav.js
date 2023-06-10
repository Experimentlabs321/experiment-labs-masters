import React, { useEffect, useState } from 'react';
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
import logo from '../../../assets/Logos/Group 2859890.png';
import { Link } from 'react-router-dom';
import './style.css';
import { Link as ScrollLink, animateScroll as scroll, scrollSpy, scroller } from 'react-scroll';  // Import ScrollLink, scroll, scrollSpy, and scroller




const ScienceInnovationNav = (props) => {
    const [state, setState] = React.useState(false);

    const scrollToSection = (sectionId) => {
        scroll.scrollTo(sectionId, {
            duration: 500,  // Adjust the duration as needed
            smooth: 'easeInOutQuart',  // Adjust the easing function as needed
        });
    };

    const [activeSection, setActiveSection] = useState('');

    const handleSetActiveSection = (sectionId) => {
        setActiveSection(sectionId);
    };

    useEffect(() => {
        scrollSpy.update();
    }, []);


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
    text-white hover:text-cyan hover:transition-colors hover:delay-300 hover:ease-in-out
`
    const navItems = [
        <div style={{ fontSize: '16px', textTransform: 'initial' }} className={navItemSytle}>Admissions</div>,
        <div style={{ fontSize: '16px', textTransform: 'initial' }} className={navItemSytle}>Student Life</div>,
        <div style={{ fontSize: '16px', textTransform: 'initial' }} className={navItemSytle}>Careers</div>,
        <div style={{ fontSize: '16px', textTransform: 'initial' }} className={navItemSytle}>Research</div>,
        <Button onClick={toggleDrawer(true)} sx={{ bgcolor: '#97E7AA', ":hover": { bgcolor: '#3EE8B5' }, color: 'black' }} variant="contained" endIcon={<ExpandMoreIcon />}>
            All Courses
        </Button>
    ];

    const navItems2 = [
        <Button onClick={toggleDrawer(true)} sx={{ color: '#fff', bgcolor: '#121212', textTransform: 'initial' }} size='medium' variant="text">
            Admissions
        </Button>,
        <Button onClick={toggleDrawer(true)} sx={{ color: '#fff', bgcolor: '#121212', textTransform: 'initial' }} size='medium' variant="text">
            Student Life
        </Button>,
        <Button onClick={toggleDrawer(true)} sx={{ color: '#fff', bgcolor: '#121212', textTransform: 'initial' }} size='medium' variant="text">
            Careers
        </Button>,
        <Button onClick={toggleDrawer(true)} sx={{ color: '#fff', bgcolor: '#121212', textTransform: 'initial' }} size='medium' variant="text">
            Research
        </Button>,
        <Button onClick={toggleDrawer(true)} sx={{ bgcolor: '#97E7AA', ":hover": { bgcolor: '#3EE8B5' }, color: 'black' }} variant="contained" endIcon={<ExpandMoreIcon />}>
            All Courses
        </Button>
    ];

    const { window } = props;
    const [mobileOpen, setMobileOpen] = React.useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen((prevState) => !prevState);
    };

    const drawer = (
        <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center', bgcolor: '#121212', height: '100%' }}>
            <Typography variant="h6" sx={{ my: 2 }}>
                <img className='h-10 ml-2' src={logo} alt="icon" />
            </Typography>
            <Divider />
            <div>
                {navItems2.map((item) => (
                    <ListItem key={item} disablePadding>
                        <ListItemButton sx={{ textAlign: 'left', color: 'white' }}>
                            <span>{item}</span>
                        </ListItemButton>
                    </ListItem>
                ))}
            </div>
        </Box>
    );

    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar component="nav">
                <Toolbar sx={{ bgcolor: '#424242', padding: '10px 20px 10px 10px' }}>

                    <Typography
                        variant="h6"
                        component="div"
                        sx={{ flexGrow: 1, color: 'black' }}
                    >
                        <Link to={'/'}><img className='h-8 lg:h-12' src={logo} alt="icon" /></Link>
                    </Typography>
                    <Box sx={{ display: { xs: 'none', sm: 'block' }, color: 'black' }}>
                        {navItems.map((item) => (
                            <Button key={item} sx={{ color: '#121212' }}>
                                {item}
                            </Button>
                        ))}
                    </Box>
                    <IconButton
                        color="black"
                        aria-label="open drawer"
                        edge="end"
                        onClick={handleDrawerToggle}
                        sx={{ ml: 'auto', display: { sm: 'none' } }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Drawer
                        anchor={'top'}
                        open={state}
                        onClose={toggleDrawer(false)}
                    >
                        {list('top')}
                    </Drawer>
                </Toolbar>
                <div className='bg-[#7a7979] px-10 lg:px-32 font w-full'>
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

                        {/* <ScrollLink
                            to='news'
                            smooth={true}
                            duration={500}
                            onClick={() => scrollToSection('news')}
                            spy={true}
                            className="px-3 py-2 cursor-pointer"
                            activeClass="bg-custom-blue px-3 py-2 cursor-pointer bg-opacity-30 border-b-2 border-custom-blue"
                            onSetActive={handleSetActiveSection}
                        >News</ScrollLink> */}

                    </div>
                </div>
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