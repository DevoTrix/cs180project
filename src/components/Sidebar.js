import * as React from 'react';
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
  const [open, setOpen] = React.useState(false);

  //Sets position(aka anchor) of the drawer
  // const [state, setState] = React.useState({
  //   left: false,
  // });

  //useState - to render stuff onto the screen via variables
  const [schedule, setSchedule] = useState(null);


  function renderSchedule() {
    return (
      <IconButton>
        <MailIcon />
      </IconButton>
    )
  }

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
    if (index === 0) {setSchedule(renderSchedule())}
    else if  (index === 1) { alert('Add/Del Coruses');}
  }

  return (
    <Box id='calendar' sx={{ display: 'flex' }}>
      <CssBaseline />

      <AppBar position="fixed" open={open}>
        <Toolbar>
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
          <Typography variant="h6" noWrap component="div">
            Web Scraperz: UCR Class Scheduler
          </Typography>
        </Toolbar>
      </AppBar>

      <Drawer variant="permanent" open={open}>
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
          {schedule}
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