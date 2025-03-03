import { useState } from "react";
import { styled, useTheme } from "@mui/material/styles";
import MuiDrawer from "@mui/material/Drawer";
import {
  Box,
  Toolbar,
  List,
  CssBaseline,
  Typography,
  Divider,
} from "@mui/material";
import MuiAppBar from "@mui/material/AppBar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AssignmentIcon from "@mui/icons-material/Assignment";
import SettingsIcon from "@mui/icons-material/Settings";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import Board from "../Board/Board"
import { useApi } from "../../Context/ApiContext";
import { Navigate, useNavigate } from "react-router-dom";
import "./Dashboard.css"

const drawerWidth = 200;

const openedMixin = (theme) => ({
  width: drawerWidth,
  backgroundColor: "black",
  color: "white",
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
  color: "white",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
    backgroundColor: "black",
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  color: "white",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  backgroundColor: "black",
  color: "white",
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

const Dashboard = () => {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate()

  const {logoutUser} = useApi()

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleLogout = () =>{
    logoutUser();  
  navigate("/login");
  }

  return (
    <>
      <Box sx={{ display: "flex" }} className="dashboard-container">
        <CssBaseline />
        <AppBar position="fixed" open={open} sx={{ backgroundColor: "#1e1e1e" }}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={{
                marginRight: 5,
                ...(open && { display: "none" }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap component="div" className="app-title" sx={{ color: "#FFCE56" }}>
              📜 Kanban Board
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer
          variant="permanent"
          open={open}
          sx={{
            "& .MuiDrawer-paper": {
              backgroundColor: "#1e1e1e",
              color: "white",
            },
          }}
        >
          <DrawerHeader className="drawer-header">
            <Typography variant="h6" noWrap component="div" sx={{ color: "#FFCE56" }}>
              📜 Kanban Board
            </Typography>
            <IconButton onClick={handleDrawerClose} sx={{ color: "white" }}>
              {theme.direction === "rtl" ? <ChevronRightIcon /> : <ChevronLeftIcon />}
            </IconButton>
          </DrawerHeader>
          <Divider sx={{ backgroundColor: "rgba(255,255,255,0.1)" }} />
          <List>
            {["Dashboard", "Tasks", "Settings", "Logout"].map((text, index) => (
              <ListItem key={text} disablePadding sx={{ display: "block" }} className="drawer-list-item">
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? "initial" : "center",
                    px: 2.5,
                    borderRadius: "8px",
                    mx: 1,
                    "&:hover": {
                      backgroundColor: "rgba(255,255,255,0.1)",
                    },
                  }}
                  onClick={index === 3 ? handleLogout : undefined}
                >
                  <ListItemIcon
                    sx={{ minWidth: 0, mr: open ? 3 : "auto", justifyContent: "center", color: "white" }}
                    className="drawer-icon"
                  >
                    {index === 0 && <DashboardIcon />}
                    {index === 1 && <AssignmentIcon />}
                    {index === 2 && <SettingsIcon />}
                    {index === 3 && <ExitToAppIcon />}
                  </ListItemIcon>
                  <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          ml: open ? `${drawerWidth}px` : `calc(${theme.spacing(8)} + 1px)`,
          transition: theme.transitions.create("margin", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
          }),
          pt: 10,
        }}
      >
        <Board />
      </Box>
    </>
  );
};

export default Dashboard;

