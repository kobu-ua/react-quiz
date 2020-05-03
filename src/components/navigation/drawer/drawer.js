import React, {Component} from 'react';
import { NavLink } from 'react-router-dom';
import Backdrop from '../../ui/backdrop';
import classes from './drawer.module.scss';

const links = [
  {to: '/', label: 'Tests', exact: true},
  {to: '/auth', label: 'Sign In', exact: false},
  {to: '/quiz-creator', label: 'Create New Test', exact: false},
];

class Drawer extends Component {
  clickHandler = () => {
    this.props.onClose();
  }

  renderLinks() {
    return links.map(({to, exact, label}, index) => {
      return (
        <li key={index}>
          <NavLink
            to={to}
            exact={exact}
            activeClassName={classes.activeLink}
            onClick={this.clickHandler}
          >
            {label}
          </NavLink>
        </li>
      )
    });
  }

  render() {
    const cls = [classes.drawer];
    const { isOpen, onClose } = this.props;
    if (!isOpen) {
      cls.push(classes.closed);
    }
    return (
      <>
        <nav className={cls.join(' ')}>
          <ul>
            { this.renderLinks() }
          </ul>
        </nav>
        {
          isOpen && <Backdrop onClick={onClose} />
        }
      </>
    )
  };
};

export default Drawer;
