import * as React from 'react';
import { useState } from 'react';
import { useState } from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
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
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';

import Tooltip from '@mui/material/Tooltip';
import TodayIcon from '@mui/icons-material/Today';
import RuleIcon from '@mui/icons-material/Rule';
import LogoutIcon from '@mui/icons-material/Logout';
import ToggleOffIcon from '@mui/icons-material/ToggleOff';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';


import Calendar from './Calendar'
import Mail from '@mui/icons-material/Mail';

import Mail from '@mui/icons-material/Mail';

const drawerWidth = 250;
const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);


export default function Sidebar() {
  const theme = useTheme();
  // const [open, setOpen] = React.useState(false);

  //nested sidebar
  const [open, setOpen] = useState(false);

  // added by Al
  const [secondaryDrawerOpen, setSecondaryDrawerOpen] = useState(false); 

  const toggleDrawer = (isOpen) => {
    setOpen(isOpen);
  }

  // added by Al
  const toggleSecondaryDrawer = (isOpen) => () => {
    setSecondaryDrawerOpen(isOpen);
    if (!isOpen) {
      setShowSearchBar(false); // hide the search bar when the drawer closes
    }
  };
  

  // added by Al
  const [searchTerm, setSearchTerm] = useState('')

  const [showSearchBar, setShowSearchBar] = useState(false); // added by Al, this is for add/remove

  //useState - to render stuff onto the screen via variables
  // const [schedule, setSchedule] = useState(null);
  // function renderSchedule() {
  //   //return a drawer component that can toggle?
  //   return (
  //     <IconButton>
  //       <MailIcon />
  //     </IconButton>
  //   )
  // }

  // const [open, setOpen] = React.useState(false);

  //nested sidebar
  const [open, setOpen] = useState(false);
  const toggleDrawer = (isOpen) => {
    setOpen(isOpen);
  }

  //useState - to render stuff onto the screen via variables
  // const [schedule, setSchedule] = useState(null);
  // function renderSchedule() {
  //   //return a drawer component that can toggle?
  //   return (
  //     <IconButton>
  //       <MailIcon />
  //     </IconButton>
  //   )
  // }

  const handleSwipeableClose = () => {
    alert('closed')
  }

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  function renderFunctions(index) {
    //if (index === 0) {setSchedule(renderSchedule())}
    //if (index === 0) { setOpen(true); }
    if (index === 0) {setSecondaryDrawerOpen(true);}
    if (index === 1) {setShowSearchBar(true);}
    //else if  (index === 1) { alert('Add/Del Coruses');}
  }

  function renderFunctions(index) {
    // if (index === 0) {setSchedule(renderSchedule())}
    if (index === 0) { setOpen(true); }
    else if  (index === 1) { alert('Add/Del Coruses');}
  }

  return (
    <Box id='calendar' sx={{ display: 'flex' }}>
      <CssBaseline />

      <AppBar position="fixed" open={open}>
        <Toolbar>
          {/* <IconButton
          {/* <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: 'none' }),
            }}
          >
            <MenuIcon />
          </IconButton> */}
          </IconButton> */}
          <Typography variant="h6" noWrap component="div">
            Web Scraperz: UCR Class Scheduler
          </Typography>
        </Toolbar>
      </AppBar>

      <Drawer variant="permanent" 
        // open={open}
      >
      <Drawer variant="permanent" 
        // open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />

        <List>
          {['My Courses', 'Add/Delete Courses'].map((text, index) => (
            <ListItem key={text} disablePadding sx={{ display: 'block' }}>
              <Tooltip title={text} placement='right' arrow
                slotProps={{
                  popper: {
                    modifiers: [
                      {
                        name: 'offset',
                        options: {
                          offset: [0, -7],
                        },
                      },
                    ],
                  },
                }}
              >
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? 'initial' : 'center',
                    px: 2.5,
                  }}
                  onClick={ () => {renderFunctions(index) 
                    setSecondaryDrawerOpen(true);} } // this will also open the sidebar for add/remove
                  onClick={ () => renderFunctions(index) }
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : 'auto',
                      justifyContent: 'center',
                    }}
                  >
                    {index % 2 === 0 ? <TodayIcon /> : <RuleIcon />}
                  </ListItemIcon>
                  <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
                </ListItemButton>
              </Tooltip>
            </ListItem>
          ))}
        </List>

        {/* second sidebar */}
        <SwipeableDrawer 
          anchor="left"
          open={secondaryDrawerOpen}
          onClose={toggleSecondaryDrawer(false)}
          onOpen={toggleSecondaryDrawer(true)}
          sx={{
            '& .MuiDrawer-paper': {
              width: 250,
              marginLeft: "65px",
              marginTop: "65px",
              transition: (theme) => theme.transitions.create('transform', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
              }),
              transform: secondaryDrawerOpen
                ? `translateX(${open ? drawerWidth + 50 : 50}px)` // position adjustment based on the drawer state
                : 'translateX(0)',
            },
          }}
          ModalProps={{ keepMounted: true }} // this helps with keeping the focus within the drawer but keeps the rest of the page interactive
          BackdropProps={{ invisible: true }} // makes the backdrop invisible
        >
          <Box role="presentation">
            {/* Search Bar */}
            {/*<Searchbar setSearchTerm={setSearchTerm} />*/} {/* <--- uncomment that for search bar for all buttons */}
            {showSearchBar && (
              <input 
                type="search" 
                placeholder="Search for Classes" 
                onChange={(e) => setSearchTerm(e.target.value)} 
                style={{ width: '100%', padding: '10px', margin: '10px 0', boxSizing: 'border-box' }}
              />
            )}
            <Typography variant="h6" noWrap component="div">
            </Typography>
            {/* put stuff here */}
          </Box>
        </SwipeableDrawer>





        <Divider />
        <List>
          {['Logout', 'Light/Dark Mode'].map((text, index) => (
            <ListItem key={text} disablePadding sx={{ display: 'block' }}>
              <Tooltip title={text} placement='right' arrow
                slotProps={{
                  popper: {
                    modifiers: [
                      {
                        name: 'offset',
                        options: {
                          offset: [0, -7],
                        },
                      },
                    ],
                  },
                }}
              >
                  <ListItemButton
                    sx={{
                      minHeight: 48,
                      justifyContent: open ? 'initial' : 'center',
                      px: 2.5,
                    }}
                  >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : 'auto',
                      justifyContent: 'center',
                    }}
                  >
                    {index % 2 === 0 ? <LogoutIcon /> : <ToggleOffIcon />}
                  </ListItemIcon>
                  <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
                </ListItemButton>
              </Tooltip>
            </ListItem>
          ))}
        </List>
      </Drawer>

      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        <Box sx={{ overflow: 'auto',
      
        flexGrow: 1,
        p: 3,
        transition: (theme) => theme.transitions.create('margin', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.enteringScreen,
        }),
        
        // Adjust marginLeft to account for secondary panel
        marginLeft: secondaryDrawerOpen ? drawerWidth + 250 : 5,
      }}>
          <List>
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
        </Box>
          {/* {schedule} */}
        <Box sx={{ overflow: 'auto' }}>
          <List>
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
        </Box>
          {/* {schedule} */}
          <Calendar />
        {/* <Typography paragraph>
          <h1>wassup</h1>
        </Typography> */}
      </Box>
    </Box>
  );
}

/*
  > work on toggling icon
  > work on drawer appearing
*/

/*
  > work on toggling icon
  > work on drawer appearing
*/