import { AppBar, Drawer, List, ListItem, ListItemIcon, ListItemText, makeStyles, Toolbar, Typography } from "@material-ui/core";
import { green, grey } from "@material-ui/core/colors";
import { Edit, ListAlt, RestaurantMenuSharp, RestaurantSharp } from "@material-ui/icons";
import { format } from "date-fns";
import React from "react";
import { useLocation, useHistory } from "react-router-dom";
import { primary, opposite, oppositeLight, secondary } from "../constants/styles";
import styled from 'styled-components'
import { lightTheme } from "../styles/theme";
import Profile from "./Profile";
import ToggleSwitch from "./ToggleSwitch";
import { Switch } from "@mui/material";
import { Brightness6, Light, Lightbulb } from "@mui/icons-material";

const drawerWidth = 200;
const quickOrderIcon = require('../assets/icon.png');
const useStyles = makeStyles((theme) => {
    return {
        page: {
            background: lightTheme.primary,
            width: '100%',
            height: `calc(100% - 70px)`,
            padding: theme.spacing(3)
        },
        drawer: {
            width: drawerWidth,
            background: lightTheme.secondary
        },
        drawerPaper: {
            // alignItems: "center",
            // justifyContent: "center",
            width: drawerWidth,
            background: lightTheme.secondary
        },
        root: {
            display: 'flex'
        },
        active: {
            '&:hover': {
                background: "rgba(0,0,0,0.1)"
            },
            width: "100%",
            borderLeft: "4px solid",
            paddingLeft: "2rem",
            cursor: "pointer",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            marginBottom: "1rem",
            transition: "0.2s all ease-in-out",
        },
        deactive: {
            color: "rgba(0,0,0,0.3)"
        },
        profile: {
            // position: "absolute",
            textAlign: "center",
        },
        title: {
            padding: theme.spacing(2)
        },
        appbar: {
            width: `calc(100% - ${drawerWidth}px)`,
            background: "rgba(224,224,224,1)",
            // height: '70px',
            position: 'fixed'
        },
        toolbar: theme.mixins.toolbar,
        quote: {
            flexGrow: 1,
            fontSize: 20,
        },
        user: {
            fontSize: 20,
        },
        restaurantIcon: {
            height: "2rem",
            marginRight: "20px",
            borderRadius: "50px",
        },
        // mode: {
        //     height: '50px',
        //     marginTop: '100%',
        // },
    }
});




const Layout = ({ children }) => {
    const classes = useStyles();
    const history = useHistory();
    const location = useLocation();

    const menuItems = [
        {
            text: '廚房訂單',
            icon: <ListAlt />,
            path: '/'
        },
        {
            text: '櫃檯訂單',
            icon: <RestaurantSharp />,
            path: '/counter'
        },
        {
            text: '更新菜單',
            icon: <RestaurantMenuSharp />,
            path: '/modify-menu'
        },
    ];

    return (
        <div className={classes.root}>
            <AppBar
                className={classes.appbar}
                elevation={0}
            >
                <Toolbar>
                    <Typography className={classes.quote}>
                        顧客永遠是對的，就算是大爛客也一樣
                    </Typography>
                    <img className={classes.restaurantIcon} src={quickOrderIcon} alt="icon" />
                    <Typography className={classes.user}>
                        ＯＯ餐廳
                    </Typography>
                </Toolbar>
            </AppBar>
            <Drawer
                className={classes.drawer}
                variant="permanent"
                anchor="left"
                classes={{ paper: classes.drawerPaper }}
            >
                <Profile img={quickOrderIcon} name="Quick Order" className={classes.profile} />
                <List className={classes.menu}>
                    {menuItems.map(item => (
                        <ListItem
                            button
                            onClick={() => window.location.replace(item.path)}
                            key={item.text}
                            className={location.pathname === item.path ? classes.active : classes.deactive}
                        >
                            <ListItemIcon>
                                {item.icon}
                            </ListItemIcon>
                            <ListItemText primary={item.text} />
                        </ListItem>
                    ))}

                </List>
                {/* 
                <div className={classes.mode}>
                    <ListItemIcon><Brightness6 /></ListItemIcon>
                    <Switch defaultChecked />
                </div> */}
            </Drawer>
            <div className={classes.page}>
                <div className={classes.toolbar}>
                </div>
                {children}
            </div>
        </div>
    );
}

export default Layout;