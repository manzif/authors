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

class ForgotPassword extends Component {
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
      }
    },
    formIsValid: false
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
    const { onSetAlert, onRequestResetLink } = this.props;
    if (!this.state.formIsValid) {
      onSetAlert('Please enter a valid email.', 'error');
      return;
    }
    const formData = {
      email: this.state.form.email.value
    };
    onRequestResetLink(formData);
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
                  <h2>Reset Password</h2>
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
                      'Send Password Reset Link'
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

ForgotPassword.propTypes = {
  onSetAlert: PropTypes.func,
  onRequestResetLink: PropTypes.func,
  isAuthenticated: PropTypes.bool,
  loading: PropTypes.bool
};

const mapStateToProps = state => ({
  loading: state.auth.loading,
  isAuthenticated: state.auth.token !== null,
  status: state.auth.status
});

const mapDispatchToProps = dispatch => ({
  onSetAlert: (message, alertType) =>
    dispatch(actions.setAlert(message, alertType)),
  onRequestResetLink: formData => dispatch(actions.requestResetLink(formData))
});

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassword);
