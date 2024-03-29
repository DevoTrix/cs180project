import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import SearchBar from "./SearchBar";
import ListClasses from "./ListClasses";

import Tooltip from "@mui/material/Tooltip";
import TodayIcon from "@mui/icons-material/Today";
import RuleIcon from "@mui/icons-material/Rule";
import LogoutIcon from "@mui/icons-material/Logout";
import ToggleOffIcon from "@mui/icons-material/ToggleOff";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";

import Calendar from "./Calendar";

const drawerWidth = 250;
const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export default function Sidebar() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [showSearchBar, setShowSearchBar] = React.useState(false);
  const [secondaryDrawerOpen, setSecondaryDrawerOpen] = React.useState(false);
  const [searchTerm, setSearchTerm] = React.useState("");
  const toggleSecondaryDrawer = (isOpen) => () => {
    setSecondaryDrawerOpen(isOpen);
    //console.log(isOpen)

    if (!isOpen) {
      //[Bug Soln] : delays MyClasses list from showing immediately after clicking off searchbar page
      setTimeout(() => {
        setShowSearchBar(false); // hide the search bar when the drawer closes
      }, 500)
    }
  };

  //Sets position(aka anchor) of the drawer
  // const [state, setState] = React.useState({
  //   left: false,
  // });
  const handleSwipeableOpen = () => {
    //alert('opened')
  };
  const handleSwipeableClose = () => {
    alert("closed");
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  //this might be the stuff
  function renderFunctions(index) {
    //if (index === 0) {setSchedule(renderSchedule())}
    //if (index === 0) { setOpen(true); }
    if (index === 0) {
      setSecondaryDrawerOpen(true);
      setShowSearchBar(false);
      //console.log('inside render: set to true')
    }
    if (index === 1) {
      setShowSearchBar(true);
      setSecondaryDrawerOpen(false);
      //console.log("index is 1: ", index)
    }
    //else if  (index === 1) { alert('Add/Del Coruses');}
  }
  return (
    <Box id="calendar" sx={{ display: "flex" }}>
      <CssBaseline />

      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 0,
              ...(open && { display: "none" }),
            }}
          >
            {/* <MenuIcon /> */}
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Web Scraperz: UCR Class Scheduler
          </Typography>
        </Toolbar>
      </AppBar>

      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />

        <List>
          {["My Courses", "Add/Delete Courses"].map((text, index) => (
            <ListItem key={text} disablePadding sx={{ display: "block" }}>
              <Tooltip
                title={text}
                placement="right"
                arrow
                slotProps={{
                  popper: {
                    modifiers: [
                      {
                        name: "offset",
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
                    justifyContent: open ? "initial" : "center",
                    px: 2.5,
                  }}
                  //onClick={handleSwipeableOpen}
                  onClick={() => {
                    renderFunctions(index);
                    setSecondaryDrawerOpen(true);
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : "auto",
                      justifyContent: "center",
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
            "& .MuiDrawer-paper": {
              width: 250,
              marginLeft: "65px",
              marginTop: "65px",
              transition: (theme) =>
                theme.transitions.create("transform", {
                  easing: theme.transitions.easing.sharp,
                  duration: theme.transitions.duration.enteringScreen,
                }),
              transform: secondaryDrawerOpen
                ? `translateX(${open ? drawerWidth + 50 : 50}px)` // position adjustment based on the drawer state
                : "translateX(0)",
            },
          }}
          ModalProps={{ keepMounted: true }} // this helps with keeping the focus within the drawer but keeps the rest of the page interactive
          BackdropProps={{ invisible: true }} // makes the backdrop invisible
        >
          <Box role="presentation">
            {/* Search Bar */}
            {/*<Searchbar setSearchTerm={setSearchTerm} />*/}{" "}
            {/* <--- uncomment that for search bar for all buttons */}
            {showSearchBar && (
              // <input
              //   type="search"
              //   placeholder="Search for Classes"
              //   onChange={(e) => setSearchTerm(e.target.value)}
              //   style={{ width: '100%', padding: '10px', margin: '10px 0', boxSizing: 'border-box' }}
              // />
              <SearchBar />
            )}
            {/* secondaryDrawerOpen var here : My Classes List*/}
            {!showSearchBar && <ListClasses />}
            <Typography variant="h6" noWrap component="div"></Typography>
            {/* put stuff here */}
          </Box>
        </SwipeableDrawer>

        <Divider />
        <List>
          {["Logout"].map((text, index) => (
            <ListItem key={text} disablePadding sx={{ display: "block" }}>
              <Tooltip
                title={text}
                placement="right"
                arrow
                slotProps={{
                  popper: {
                    modifiers: [
                      {
                        name: "offset",
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
                    justifyContent: open ? "initial" : "center",
                    px: 2.5,
                  }}
                  href='/'
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : "auto",
                      justifyContent: "center",
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
        <Divider />
      </Drawer>

      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        <Calendar />
        {/* <Typography paragraph>
          <h1>wassup</h1>
        </Typography> */}
      </Box>
    </Box>
  );
}
