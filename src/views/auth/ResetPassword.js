/* eslint-disable camelcase */
import React, { Component } from 'react';
import {
  Grid,
  Card,
  CardContent,
  Button,
  CircularProgress
} from '@material-ui/core';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import Alert from '../../components/UI/Alert';
import Input from '../../components/UI/Input';
import validate from '../../utils/validation';
import * as actions from '../../store/actions';

class ResetPassword extends Component {
  state = {
    form: {
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
    formIsValid: false
  };

  UNSAFE_componentWillReceiveProps(nextprops) {
    if (nextprops.status === 'success') {
      this.props.history.push('/auth/login');
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
    const { onSetAlert, onResetPassword, match } = this.props;
    if (!this.state.formIsValid) {
      onSetAlert('Please fill all the required fields.', 'error');
      return;
    }
    if (
      this.state.form.password.value !== this.state.form.confirmPassword.value
    ) {
      onSetAlert('Passwords do not match.', 'error');
    } else {
      const formData = {
        password: this.state.form.password.value,
        token: match.params.token
      };
      onResetPassword(formData);
    }
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
        touched={formElement.config.touched}
        helperText={formElement.config.helperText}
      />
    ));

    if (isAuthenticated) {
      return <Redirect to="/" />;
    }

    return (
      <div className="container">
        <Grid container justify="center">
          <Grid item xs={12} sm={8} md={4}>
            <Card>
              <CardContent className="auth-card">
                <div className="title">
                  <h2>New Password</h2>
                </div>
                <Alert />
                <form>
                  {form}
                  <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    onClick={this.formSubmitHandler}
                    disabled={loading}
                  >
                    {loading ? (
                      <CircularProgress color="primary" size={23} />
                    ) : (
                      'Change Password'
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </div>
    );
  }
}

ResetPassword.propTypes = {
  onSetAlert: PropTypes.func,
  onResetPassword: PropTypes.func,
  isAuthenticated: PropTypes.bool,
  loading: PropTypes.bool,
  match: PropTypes.object,
  history: PropTypes.object
};

const mapStateToProps = state => ({
  loading: state.auth.loading,
  isAuthenticated: state.auth.token !== null,
  status: state.auth.status
});

const mapDispatchToProps = dispatch => ({
  onSetAlert: (message, alertType) =>
    dispatch(actions.setAlert(message, alertType)),
  onResetPassword: (token, formData) =>
    dispatch(actions.resetPassword(token, formData))
});

export default connect(mapStateToProps, mapDispatchToProps)(ResetPassword);
