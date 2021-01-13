/* eslint-disable camelcase */
import React, { Component } from 'react';
import {
  Grid,
  Card,
  CardContent,
  Button,
  CircularProgress
} from '@material-ui/core';
import { LockOpen } from '@material-ui/icons';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import welcomeImg from '../../assets/img/welcome.svg';
import * as actions from '../../store/actions';

class UserActivation extends Component {
  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.status === 'success') {
      this.props.history.push('/auth/login');
    }
  }

  activateUserHandler = () => {
    const { token } = this.props.match.params;
    const { onActivateUser } = this.props;
    onActivateUser(token);
  };

  render() {
    const { loading, isAuthenticated } = this.props;

    if (isAuthenticated) {
      return <Redirect to="/" />;
    }
    return (
      <div className="container">
        <Grid container justify="center">
          <Grid item xs={12} sm={8} md={12} lg={6}>
            <Card>
              <CardContent className="auth-card">
                <div className="title">
                  <h1>Welcome!</h1>
                </div>
                <div className="image-container">
                  <img src={welcomeImg} alt="" />
                </div>
                <p>
                  Thank you for signing up to the Authors&apos; Heaven. Please
                  click the link below to activate your account. Note that this
                  link is valid for 24 hours.
                </p>
                <div className="btn-container">
                  <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    startIcon={<LockOpen />}
                    onClick={this.activateUserHandler}
                    disabled={loading}
                  >
                    {loading ? (
                      <CircularProgress color="primary" size={24} />
                    ) : (
                      'Activate your account here'
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </div>
    );
  }
}

UserActivation.propTypes = {
  onActivateUser: PropTypes.func.isRequired,
  match: PropTypes.object,
  status: PropTypes.string,
  history: PropTypes.object,
  loading: PropTypes.bool,
  isAuthenticated: PropTypes.bool
};

const mapSateToProps = state => ({
  loading: state.auth.loading,
  status: state.auth.status,
  isAuthenticated: state.auth.token !== null
});

const mapDispatchToProps = dispatch => ({
  onActivateUser: token => dispatch(actions.activate(token))
});

export default connect(mapSateToProps, mapDispatchToProps)(UserActivation);
