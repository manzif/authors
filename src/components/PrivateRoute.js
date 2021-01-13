/* eslint-disable camelcase */
/* eslint-disable react/jsx-curly-newline */
import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class PrivateRoute extends Component {
  state = {
    auth: false
  };

  UNSAFE_componentWillReceiveProps(nextprops) {
    if (!nextprops.loading) {
      this.setState({ auth: true });
    }
  }

  render() {
    const { isAuthenticated, component: Cmp, ...rest } = this.props;

    return (
      <Route
        {...rest}
        render={props =>
          !isAuthenticated && this.state.auth ? (
            <Redirect
              to={{ pathname: '/auth/login', state: { from: props.location } }}
            />
          ) : (
            <Cmp {...props} />
          )
        }
      />
    );
  }
}

PrivateRoute.propTypes = {
  component: PropTypes.func,
  isAuthenticated: PropTypes.bool,
  location: PropTypes.object
};

const mapSateToProps = state => ({
  isAuthenticated: state.auth.token !== null,
  loading: state.auth.loading
});

export default connect(mapSateToProps)(PrivateRoute);
