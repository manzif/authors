/* eslint-disable react/jsx-curly-newline */
/* eslint-disable no-plusplus */
/* eslint-disable react/no-array-index-key */
/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Avatar, Badge } from '@material-ui/core';
import classNames from 'classnames';
import logo from '../../../assets/img/logo.png';
import Aux from '../Aux';

class Navbar extends Component {
  state = {
    showMenu: false,
    showNotifications: false,
    showProfile: false
  };

  componentDidMount() {
    global.document.addEventListener('click', this.onShowNotifications, false);
    global.document.addEventListener('click', this.onShowProfile, false);
  }

  componentWillUnmount() {
    global.document.removeEventListener(
      'click',
      this.onShowNotifications,
      false
    );
    global.document.removeEventListener('click', this.onShowProfile, false);
  }

  onShowMenu = () => {
    this.setState({ showMenu: !this.state.showMenu });
  };

  onShowNotifications = event => {
    if (
      event.target.id !== 'notifications-bell' &&
      this.state.showNotifications
    ) {
      this.setState({ showNotifications: false });
    }
  };

  onShowProfile = event => {
    if (event.target.id !== 'username' && this.state.showProfile) {
      this.setState({ showProfile: false });
    }
  };

  render() {
    const {
      isAuthenticated,
      user,
      notifications,
      onReadNotification
    } = this.props;
    const dropDownNotifications = [];
    for (let i = 0; i < notifications.length; i++) {
      if (i > 4) {
        break;
      }
      dropDownNotifications.push(notifications[i]);
    }
    return (
      <header className="navbar">
        <Link to="/" className="logo">
          <div>
            <img src={logo} alt="" />
          </div>
        </Link>
        <div
          className={`menu-toggle ${this.state.showMenu ? 'active' : ''}`}
          onClick={this.onShowMenu}
        ></div>
        <nav className={`${this.state.showMenu ? 'active' : ''}`}>
          <ul>
            <li>
              <NavLink exact activeClassName="active" to="/">
                Home
              </NavLink>
            </li>
            {!isAuthenticated ? (
              <Aux>
                <li>
                  <NavLink activeClassName="active" to="/auth/login">
                    Login
                  </NavLink>
                </li>
                <li>
                  <NavLink activeClassName="active" to="/auth/signup">
                    Signup
                  </NavLink>
                </li>
              </Aux>
            ) : (
              <Aux>
                <li
                  className={classNames({
                    notifications: true,
                    active: this.state.showNotifications
                  })}
                >
                  <i
                    id="notifications-bell"
                    className={classNames({ far: true, 'fa-bell': true })}
                    onClick={_event => {
                      this.setState({
                        showNotifications: !this.state.showNotifications
                      });
                    }}
                  ></i>
                  <span className="notifications-badge">
                    {notifications.length}
                  </span>
                  <div className="notifications-sub-menu">
                    <ul>
                      {notifications.length > 0 ? (
                        <Aux>
                          {dropDownNotifications.map((notification, index) => (
                            <li
                              key={index}
                              onClick={() =>
                                onReadNotification(notification.id)
                              }
                            >
                              <div className="icon">
                                <i className="fas fa-flag-checkered"></i>
                              </div>
                              <div className="message">{notification.body}</div>
                            </li>
                          ))}
                          {notifications.length > 5 ? (
                            <li className="show-all">
                              <p>Show All Notifications</p>
                            </li>
                          ) : null}
                        </Aux>
                      ) : (
                        <li className="no-notification">
                          <div>
                            <p>No new Notification</p>
                          </div>
                        </li>
                      )}
                    </ul>
                  </div>
                </li>
                <li
                  className={classNames({
                    'avatar-container': true,
                    active: this.state.showProfile
                  })}
                >
                  <div className="profile">
                    <Avatar
                      src={user.image ? user.image.url : ''}
                      className="avatar"
                    />
                    <span
                      id="username"
                      className={classNames({ username: true })}
                      onClick={_event => {
                        this.setState({ showProfile: !this.state.showProfile });
                      }}
                    >
                      {user.firstname}
                      <i className="fas fa-chevron-down"></i>
                    </span>
                  </div>
                  <div className="profile-sub-menu">
                    <ul>
                      <li>
                        <Link to="/articles/new">
                          {' '}
                          <i className="fa fa-folder-plus"></i> New Article
                        </Link>
                      </li>
                      <li>
                        <Link to="/profile/me">
                          {' '}
                          <i className="fa fa-user"></i> Profile
                        </Link>
                      </li>
                      <li>
                        <Link to="/profile/settings">
                          {' '}
                          <i className="fa fa-cog"></i> Settings
                        </Link>
                      </li>
                      <li>
                        <Link to="/auth/logout">
                          <i className="fa fa-sign-out-alt"></i> Logout
                        </Link>
                      </li>
                    </ul>
                  </div>
                </li>
              </Aux>
            )}
          </ul>
        </nav>
        <div className="clearfix"></div>
      </header>
    );
  }
}

Navbar.propTypes = {
  isAuthenticated: PropTypes.bool,
  user: PropTypes.object,
  notifications: PropTypes.array,
  onReadNotification: PropTypes.func
};

export default Navbar;
