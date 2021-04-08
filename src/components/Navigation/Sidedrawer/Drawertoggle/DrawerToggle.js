import React from 'react';

import classes from './Drawertoggle.module.css';

const drawertoggle = (props) => {
    return (
        <div onClick={props.openSideDrawer}
            className={classes.DrawerToggle}>
            <div></div>
            <div></div>
            <div></div>
        </div>
    );
}

export default drawertoggle;
