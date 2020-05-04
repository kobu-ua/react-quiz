import React, {Component} from 'react';
import { NavLink } from 'react-router-dom';
import Backdrop from '../../ui/backdrop';
import classes from './drawer.module.scss';

class Drawer extends Component {
  clickHandler = () => {
    this.props.onClose();
  }

  renderLinks(links) {
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

    const links = [
      {to: '/', label: 'Tests', exact: true},
    ];

    if (this.props.isAuthenticated) {
      links.push({to: '/quiz-creator', label: 'Create New Test', exact: false})
      links.push({to: '/logout', label: 'Logout', exact: false})
    } else {
      links.push({to: '/auth', label: 'Sign In', exact: false})
    }

    return (
      <>
        <nav className={cls.join(' ')}>
          <ul>
            { this.renderLinks(links) }
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
