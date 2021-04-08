import React, {Component} from "react";
import Aux from "../../hoc/Auxiliary"
import classes from "./Layout.module.css"
import Toolbar from '../Navigation/Toolbar/Toolbar';
import Sidedrawer from '../Navigation/Sidedrawer/Sidedrawer';

class Layout extends Component {
    state = {
        showSideDrawer: false,
    }
    sideDrawerClosedHandler = (props) => {
        this.setState({showSideDrawer:false})
    }

    openSideDrawerHandler = () => {
        this.setState((prevState) => {
            return { showSideDrawer: !prevState.showSideDrawer }
        })
    }
    render() {    
        return (
            <Aux>
                <Toolbar openSideDrawer={this.openSideDrawerHandler} />
                <Sidedrawer open={this.state.showSideDrawer } closed={this.sideDrawerClosedHandler }/>
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Aux>

        );
    }
    
} 

export default Layout;