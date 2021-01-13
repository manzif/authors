/* eslint-disable camelcase */
import React, { Component } from 'react';
import {
  Grid,
  Card,
  CardContent,
  Button,
  CircularProgress
} from '@material-ui/core';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import GoogleLogin from 'react-google-login';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Input from '../../components/UI/Input';
import validate from '../../utils/validation';
import Alert from '../../components/UI/Alert';
import * as actions from '../../store/actions';
import Aux from '../../components/hoc/Aux';

export class Signup extends Component {
  state = {
    form: {
      firstname: {
        elementType: 'TextField',
        elementConfig: {
          type: 'text',
          name: 'firstname',
          label: 'Firstname',
          variant: 'outlined',
          size: 'small',
          fullWidth: true
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        helperText: '',
        touched: false
      },
      lastname: {
        elementType: 'TextField',
        elementConfig: {
          type: 'text',
          name: 'lastname',
          label: 'Lastname',
          variant: 'outlined',
          size: 'small',
          fullWidth: true
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        helperText: '',
        touched: false
      },
      email: {
        elementType: 'TextField',
        elementConfig: {
          type: 'email',
          name: 'email',
          label: 'E-mail Address',
          variant: 'outlined',
          size: 'small',
          fullWidth: true
        },
        value: '',
        validation: {
          required: true,
          isEmail: true
        },
        valid: false,
        helperText: '',
        touched: false
      },
      password: {
        elementType: 'TextField',
        elementConfig: {
          type: 'password',
          name: 'password',
          label: 'Password',
          variant: 'outlined',
          size: 'small',
          fullWidth: true,
          autoComplete: 'new-password'
        },
        value: '',
        valid: false,
        validation: {
          required: true,
          minLength: 8
        },
        helperText: '',
        touched: false
      },

      confirmPassword: {
        elementType: 'TextField',
        elementConfig: {
          type: 'password',
          name: 'confirmPassword',
          label: 'Confirm Password',
          variant: 'outlined',
          size: 'small',
          fullWidth: true
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        helperText: '',
        touched: false
      }
    },
    formIsValid: false,
    localLoading: false,
    googleLoading: false,
    facebookLoading: false
  };

  UNSAFE_componentWillReceiveProps(nextprops) {
    if (nextprops.status === 'success') {
      const updatedForm = {
        ...this.state.form
      };
      for (const inputIdentifier in updatedForm) {
        updatedForm[inputIdentifier].value = '';
        updatedForm[inputIdentifier].valid = false;
        updatedForm[inputIdentifier].touched = false;
      }

      this.setState({ form: updatedForm, formIsValid: false });
    }
  }

  inputChangeHandler = (event, inputName) => {
    const updatedForm = {
      ...this.state.form,
      [inputName]: {
        ...this.state.form[inputName],
        value: event.target.value,
        valid: validate(
          event.target.value,
          this.state.form[inputName].validation
        ).isValid,
        touched: true,
        helperText: validate(
          event.target.value,
          this.state.form[inputName].validation
        ).message
      }
    };
    let formIsValid = true;
    for (const inputIdentifier in updatedForm) {
      formIsValid = updatedForm[inputIdentifier].valid && formIsValid;
    }
    this.setState({ form: updatedForm, formIsValid });
  };

  formSubmitHandler = async () => {
    const { onSetAlert, onSignup } = this.props;
    if (!this.state.formIsValid) {
      onSetAlert('Please fill all the required fields.', 'error');
      return;
    }

    const formData = {
      firstname: this.state.form.firstname.value,
      lastname: this.state.form.lastname.value,
      email: this.state.form.email.value,
      password: this.state.form.password.value
    };

    if (
      this.state.form.password.value !== this.state.form.confirmPassword.value
    ) {
      onSetAlert('Passwords do not match.', 'error');
    } else {
      this.setState({ localLoading: true });
      await onSignup(formData);
      this.setState({ localLoading: false });
    }
  };

  responseFacebook = async response => {
    const { onLogin } = this.props;
    const formData = { access_token: response.accessToken };
    this.setState({ facebookLoading: true });
    await onLogin(formData, 'facebook');
    this.setState({ facebookLoading: false });
  };

  responseGoogle = async response => {
    const { onLogin } = this.props;
    const formData = { access_token: response.accessToken };
    this.setState({ googleLoading: true });
    await onLogin(formData, 'google');
    this.setState({ googleLoading: false });
  };

  render() {
    const { loading, isAuthenticated } = this.props;
    const formElementsArray = [];
    for (const key in this.state.form) {
      formElementsArray.push({
        id: key,
        config: this.state.form[key]
      });
    }

    const form = formElementsArray.map(formElement => (
      <Input
        key={formElement.id}
        elementType={formElement.config.elementType}
        elementConfig={formElement.config.elementConfig}
        value={formElement.config.value}
        onChange={event => this.inputChangeHandler(event, formElement.id)}
        valid={formElement.config.valid}
        helperText={formElement.config.helperText}
        touched={formElement.config.touched}
      />
    ));

    if (
      !this.state.localLoading &&
      !this.state.facebookLoading &&
      !this.state.googleLoading &&
      isAuthenticated
    ) {
      return <Redirect to="/" />;
    }

    return (
      <div className="container">
        <Grid container justify="center">
          <Grid item xs={12} sm={8} md={4}>
            <Card>
              <CardContent className="auth-card">
                <div className="title">
                  <h2>Sign Up</h2>
                </div>
                <Alert />
                <form>
                  {form}
                  <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    onClick={this.formSubmitHandler}
                    disabled={loading && this.state.localLoading}
                  >
                    {loading && this.state.localLoading ? (
                      <CircularProgress color="primary" size={23} />
                    ) : (
                      'Register'
                    )}
                  </Button>
                </form>

                <div className="links">
                  <span>
                    Already have an account? <Link to="/auth/login">Login</Link>
                  </span>
                </div>

                <div className="social-buttons">
                  <Grid container spacing={2}>
                    <Grid item xs={12} xl={6}>
                      <FacebookLogin
                        appId="249893146047297"
                        render={renderProps => (
                          <button
                            type="button"
                            onClick={renderProps.onClick}
                            disabled={loading && this.state.facebookLoading}
                            className="btn btn-facebook"
                          >
                            {loading && this.state.facebookLoading ? (
                              <CircularProgress color="primary" size={23} />
                            ) : (
                              <Aux>
                                <i className="fab fa-facebook"></i> Signup with
                                Facebook
                              </Aux>
                            )}
                          </button>
                        )}
                        fields="name,email,picture"
                        callback={this.responseFacebook}
                      />
                    </Grid>
                    <Grid item xs={12} xl={6}>
                      <GoogleLogin
                        clientId="771354043241-b7q7splkpr9up77gqm941emlvqikm7kd.apps.googleusercontent.com"
                        render={renderProps => (
                          <button
                            type="button"
                            onClick={renderProps.onClick}
                            disabled={loading && this.state.googleLoading}
                            className="btn btn-google"
                          >
                            {loading && this.state.googleLoading ? (
                              <CircularProgress color="primary" size={23} />
                            ) : (
                              <Aux>
                                <i className="fab fa-google-plus"></i> Signup
                                with Google
                              </Aux>
                            )}
                          </button>
                        )}
                        onSuccess={this.responseGoogle}
                        onFailure={this.responseGoogle}
                      />
                    </Grid>
                  </Grid>
                </div>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </div>
    );
  }
}

Signup.propTypes = {
  onSetAlert: PropTypes.func,
  onSignup: PropTypes.func.isRequired,
  onLogin: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
  loading: state.auth.loading,
  status: state.auth.status,
  isAuthenticated: state.auth.token !== null
});

const mapDispatchToProps = dispatch => ({
  onSetAlert: (message, alertType) =>
    dispatch(actions.setAlert(message, alertType)),
  onSignup: formData => dispatch(actions.signup(formData)),
  onLogin: (FormData, type) => dispatch(actions.login(FormData, type))
});

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
