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

export class Login extends Component {
  state = {
    form: {
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
        touched: false,
        helperText: ''
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
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        helperText: ''
      }
    },
    formIsValid: false,
    localLoading: false,
    googleLoading: false,
    facebookLoading: false
  };

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
    const { onLogin, onSetAlert } = this.props;
    if (!this.state.formIsValid) {
      onSetAlert('Please fill all the required fields.', 'error');
      return;
    }
    const formData = {
      email: this.state.form.email.value,
      password: this.state.form.password.value
    };
    this.setState({ localLoading: true });
    await onLogin(formData, 'local');
    this.setState({ localLoading: false });
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
    const { loading, isAuthenticated, history } = this.props;
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
        touched={formElement.config.touched}
        helperText={formElement.config.helperText}
      />
    ));

    if (
      !this.state.localLoading &&
      !this.state.facebookLoading &&
      !this.state.googleLoading &&
      isAuthenticated
    ) {
      return (
        <Redirect
          to={
            history.location.state ? history.location.state.from.pathname : '/'
          }
        />
      );
    }

    return (
      <div className="container">
        <Grid container justify="center">
          <Grid item xs={12} sm={8} md={4}>
            <Card>
              <CardContent className="auth-card">
                <div className="title">
                  <h2>Sign In</h2>
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
                      'Login'
                    )}
                  </Button>
                </form>

                <div className="links">
                  <span>
                    <Link to="/auth/forgot-password">Forgot Password</Link>
                  </span>
                  <span>
                    Don&apos;t have an account?{' '}
                    <Link to="/auth/signup">Register</Link>
                  </span>
                </div>

                <div className="social-buttons">
                  <Grid container spacing={2}>
                    <Grid item xs={12} xl={6}>
                      <FacebookLogin
                        appId={process.env.REACT_APP_FACEBOOK_APP_ID}
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
                                <i className="fab fa-facebook"></i> Login with
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
                        clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
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
                                <i className="fab fa-google-plus"></i> Login
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

Login.propTypes = {
  onSetAlert: PropTypes.func,
  onLogin: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  isAuthenticated: PropTypes.bool,
  history: PropTypes.object
};

const mapStateToProps = state => ({
  loading: state.auth.loading,
  isAuthenticated: state.auth.token !== null
});

const mapDispatchToProps = dispatch => ({
  onSetAlert: (message, alertType) =>
    dispatch(actions.setAlert(message, alertType)),
  onLogin: (FormData, type) => dispatch(actions.login(FormData, type))
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
