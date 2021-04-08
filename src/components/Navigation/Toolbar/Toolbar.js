import React from 'react';
import classes from './Toolbar.module.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import Drawertoggle from '../Sidedrawer/Drawertoggle/DrawerToggle';


const toolbar = (props) => {
    return (
        <header className={classes.Toolbar}>
            <Drawertoggle openSideDrawer={props.openSideDrawer}/>
            <div className={classes.Logo}>
                <Logo />{/*  <Logo height='80%' /> */}
            </div>
            <nav className={classes.DesktopOnly}>
                <NavigationItems/>
            </nav>
        </header>
    );
}

export default toolbar;