/* eslint-disable camelcase */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Aux from '../Aux';
import Header from './Header';
import Navbar from './Navbar';
import Footer from './Footer';
import * as actions from '../../../store/actions';

class Layout extends Component {
  state = {
    notifications: []
  };

  async componentDidMount() {
    const { onTryAutoSignup, onFetchNotifications } = this.props;
    await onTryAutoSignup();
    if (this.props.isAuthenticated) {
      onFetchNotifications().then(() => {
        this.setState({ notifications: this.props.notifications });
      });
    }
  }

  componentDidUpdate(prevProps) {
    if (
      this.props.location !== prevProps.location &&
      this.props.location.pathname !== '/auth/logout' &&
      this.props.isAuthenticated
    ) {
      this.props.onFetchNotifications().then(() => {
        this.setState({ notifications: this.props.notifications });
      });
    }
  }

  readNotification = notificationId => {
    const { onReadNotification, onFetchNotifications } = this.props;
    onReadNotification(notificationId).then(() => {
      onFetchNotifications().then(() => {
        this.setState({ notifications: this.props.notifications });
      });
    });
  };

  render() {
    const { isAuthenticated, user } = this.props;
    const { notifications } = this.state;

    return (
      <Aux>
        <Header />
        <Navbar
          isAuthenticated={isAuthenticated}
          user={user}
          notifications={notifications}
          onReadNotification={this.readNotification}
        />
        <main className="main-content">{this.props.children}</main>
        <Footer />
      </Aux>
    );
  }
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  onTryAutoSignup: PropTypes.func,
  isAuthenticated: PropTypes.bool,
  user: PropTypes.object,
  onFetchNotifications: PropTypes.func,
  notifications: PropTypes.array,
  location: PropTypes.object,
  onReadNotification: PropTypes.func
};

const mapStateToProps = state => ({
  user: state.auth.user,
  isAuthenticated: state.auth.token !== null,
  notifications: state.notification.notifications
});

const mapDispatchToProps = dispatch => ({
  onTryAutoSignup: () => dispatch(actions.authCheckState()),
  onFetchNotifications: () => dispatch(actions.fetchNotifications()),
  onReadNotification: notificationId =>
    dispatch(actions.readNotification(notificationId))
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Layout));
