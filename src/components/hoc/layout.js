import React, { Component } from 'react';
import Drawer from '../navigation/drawer';
import MenuToggle from '../navigation/menu-toggle';
import { connect } from 'react-redux';
import { ToastContainer } from "react-toastify";

import classes from './layout.module.scss';

class Layout extends Component {
  state = {
    menu: false,
  }

  toggleMenuHandler = () => {
    this.setState({
      menu: !this.state.menu
    });
  }

  menuCloseHandler = () => {
    this.setState({
      menu: false
    });
  }

  render() {
    return (
      <div className={classes.layout}>
        <Drawer
          isOpen={this.state.menu}
          onClose={this.menuCloseHandler}
          isAuthenticated={this.props.isAuthenticated}
        />
        <MenuToggle
          isOpen={this.state.menu}
          onToggle={this.toggleMenuHandler}
        />
        <ToastContainer autoClose={2000} />
        <main className={classes.layout__main}>
          { this.props.children }
        </main>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: !!state.auth.token
  }
};

export default connect(mapStateToProps)(Layout);