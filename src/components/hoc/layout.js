import React, { Component } from 'react';
import Drawer from '../navigation/drawer';
import MenuToggle from '../navigation/menu-toggle';
import classes from './layout.module.scss';

export default class Layout extends Component {
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
        />
        <MenuToggle
          isOpen={this.state.menu}
          onToggle={this.toggleMenuHandler}
        />
        <main className={classes.layout__main}>
          { this.props.children }
        </main>
      </div>
    )
  }
}