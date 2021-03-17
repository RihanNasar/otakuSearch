import React, { useState, useContext } from "react";
import { GlobalContext } from "../context/GlobalState";
import { GENRE_LIST } from "../things/genre_list";
import SearchBar from "./SearchBar";
import logo from "../assets/logo.png";
import VisibilityIcon from "@material-ui/icons/Visibility";
import Badge from "@material-ui/core/Badge";
import MailIcon from "@material-ui/icons/Mail";
import useNetworkOnLine from "../hooks/useNetworkOnLine";
import Home from "../Pages/Home";
import WatchList from "../Pages/WatchList";
import Genre from "../Pages/Genre";
import SearchPage from "../Pages/SearchPage";
import ErrorPage from "../Pages/ErrorPage";
import AnimePage from "../Pages/AnimePage";
import { Switch, Route, Link, useHistory } from "react-router-dom";
import {
  Button,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Hidden,
  Divider,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import MenuIcon from "@material-ui/icons/Menu";

const defaultProps = {
  color: "secondary",
  children: <VisibilityIcon />,
};
const drawerWidth = 300;
const useStyles = makeStyles((theme) => ({
  root: {
    [theme.breakpoints.up("sm")]: { paddingLeft: drawerWidth },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  title: {
    marginRight: "auto",
    color: "white",
  },
  drawer: {
    width: drawerWidth,
    backgroundColor: "black",
  },
  upperdrawer: {
    width: drawerWidth,
    backgroundColor: "black",
    display: "flex",
    flexDirection: "column",

    alignItems: "center",
    justifyContent: "space-between",
  },
  links: {
    textDecoration: "none",
    color: "white",
    padding: "10px",
  },

  content: {
    padding: theme.spacing(0, 3),
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  appBar: {
    [theme.breakpoints.up("sm")]: {
      width: `calc(100% - ${drawerWidth}px)`,
    },
    backgroundColor: "black",
  },
}));

const ResponsiveDrawer = () => {
  let history = useHistory();
  const status = useNetworkOnLine();
  console.log(status);
  const classes = useStyles();
  const { watchlist } = useContext(GlobalContext);
  const [open, setOpen] = useState(false);
  const drawerItems = (
    <>
      <Divider />
      <div className={classes.upperdrawer}>
        <Link className={classes.links} to="/">
          <img
            onClick={() => setOpen(false)}
            src={logo}
            style={{ width: 70, height: 70, borderRadius: 9999, marginTop: 20 }}
            alt="logo"
          />
        </Link>
        <Link className={classes.links} to="/watchlist">
          <Button
            style={{ margin: "5 0 5 0", padding: 12 }}
            size="large"
            variant="outlined"
            color="secondary"
            onClick={() => setOpen(false)}
          >
            <Badge badgeContent={watchlist.length} {...defaultProps} />
          </Button>
        </Link>
      </div>
      <Divider />
      <List disablePadding className={classes.drawer}>
        {GENRE_LIST.map((genre) => (
          <Link
            className={classes.links}
            to={{
              pathname: `/genre/${genre.Name}`,

              state: genre.id,
            }}
          >
            <ListItem key={genre.id} onClick={() => setOpen(false)} button>
              <ListItemText
                className={classes.links}
                primary={<Typography variant="h5">🎬 {genre.Name}</Typography>}
              />
            </ListItem>
          </Link>
        ))}
      </List>
    </>
  );

  return (
    <div className={classes.root}>
      {/* Drawer for small devices */}
      <Hidden smUp implementation="css">
        <Drawer open={open} onClose={() => setOpen(false)}>
          {drawerItems}
        </Drawer>
      </Hidden>
      {/* Drawer for large devices */}
      <Hidden xsDown implementation="css">
        <Drawer open={open} variant="permanent" onClose={() => setOpen(false)}>
          {drawerItems}
        </Drawer>
      </Hidden>

      <AppBar position="fixed" color="secondary" className={classes.appBar}>
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            onClick={() => setOpen(true)}
          >
            <MenuIcon />
          </IconButton>

          <SearchBar />
        </Toolbar>
      </AppBar>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/anime/:id" exact component={AnimePage} />

          <Route exact path="/genre/:id" component={Genre} />
          <Route path="/watchlist" component={WatchList} />
          <Route path="/search/:id" component={SearchPage} />
          <Route path="*" component={ErrorPage} />
          {status == false ? history.push("/error") : console.log("nothing")}
        </Switch>
      </main>
    </div>
  );
};

export default ResponsiveDrawer;
