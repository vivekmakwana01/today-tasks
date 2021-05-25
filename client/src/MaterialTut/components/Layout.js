import {
  AppBar,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
  Toolbar,
  Tooltip,
  Typography,
} from "@material-ui/core";
import { AddCircleOutlined, SubjectOutlined } from "@material-ui/icons";
import React, { useState } from "react";
import { useHistory, useLocation } from "react-router";
import MenuIcon from "@material-ui/icons/Menu";
import Login from "./Login";
import { useAuth } from "../hooks/useAuth";
import SignIn from "./SignIn";
import SignUp from "./Signup";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => {
  return {
    page: {
      backgroundColor: theme.palette.background.default,
      width: "100%",
      padding: theme.spacing(3),
    },
    drawer: {
      width: drawerWidth,
    },
    drawerPaper: {
      width: drawerWidth,
    },
    root: {
      display: "flex",
    },
    active: {
      background: "#f4f4f4",
    },
    title: {
      padding: theme.spacing(2),
    },
    toolbar: theme.mixins.toolbar,
    date: {
      flexGrow: 1,
    },
    logoutSvg: {
      width: 24,
    },
    name: {
      marginRight: 8,
    },
  };
});

export default function Layout({ children }) {
  const classes = useStyles();
  const history = useHistory();
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const { logout, user } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
      history.push("/signin");
    } catch (error) {
      console.log(error);
    }
  };

  const menuItems = [
    {
      text: "My Notes",
      icon: <SubjectOutlined color="secondary" />,
      path: "/",
    },
    {
      text: "Create Note",
      icon: <AddCircleOutlined color="secondary" />,
      path: "/create",
    },
  ];

  if (location.pathname === "/login") {
    return <Login />;
  }

  if (location.pathname === "/signin") {
    return <SignIn />;
  }

  if (location.pathname === "/signup") {
    return <SignUp />;
  }

  return (
    <div className={classes.root}>
      {/* appbar */}
      <AppBar className={classes.appbar} color="default" elevation={0}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={() => setOpen(true)}
            edge="start"
          >
            <MenuIcon />
          </IconButton>
          <Typography className={classes.date}>
            Today is {new Date().toLocaleString("en-us", { weekday: "long" })}
          </Typography>
          <Typography className={classes.name}>{user?.displayName}</Typography>
          <Tooltip title="Logout">
            <IconButton onClick={handleLogout}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={classes.logoutSvg}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                />
              </svg>
            </IconButton>
          </Tooltip>
        </Toolbar>
      </AppBar>

      {/* side drawer */}
      <Drawer
        className={classes.drawer}
        open={open}
        anchor="left"
        classes={{ paper: classes.drawerPaper }}
        onClose={() => setOpen(false)}
      >
        <div>
          <Typography variant="h5" className={classes.title}>
            Notes
          </Typography>
        </div>

        {/* list / links */}
        <List>
          {menuItems.map((item) => (
            <ListItem
              button
              key={item.text}
              onClick={() => {
                setOpen(false);
                history.push(item.path);
              }}
              className={
                location.pathname === item.path ? classes.active : null
              }
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
        </List>
      </Drawer>

      <div className={classes.page}>
        <div className={classes.toolbar}></div>
        {children}
      </div>
    </div>
  );
}
