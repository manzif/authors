/* eslint-disable react/jsx-wrap-multilines */
import React, { Component } from 'react';
import {
  Grid,
  Card,
  CardContent,
  AppBar,
  Tabs,
  Tab,
  Switch,
  FormControl,
  FormControlLabel,
  Button,
  FormGroup,
  CircularProgress
} from '@material-ui/core';
import { Notifications, Lock } from '@material-ui/icons';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TabPanel from '../../components/UI/TabPanel';
import Alert from '../../components/UI/Alert';
import * as actions from '../../store/actions';

class Settings extends Component {
  state = {
    tabValue: 0,
    inApp: false,
    email: false
  };

  componentDidMount() {
    const { user } = this.props;
    this.setState({
      inApp: user.allowNotifications.inApp,
      email: user.allowNotifications.email
    });
  }

  handleTabChange = async (event, newValue) => {
    this.setState({ tabValue: newValue });
  };

  a11yProps = index => {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`
    };
  };

  handleChange = event => {
    this.setState({ ...this.state, [event.target.name]: event.target.checked });
  };

  formSubmitHandler = () => {
    const { inApp, email } = this.state;
    const { subscribe } = this.props;
    const formData = {
      inApp,
      email
    };
    subscribe(formData);
  };

  render() {
    const { tabValue, inApp, email } = this.state;
    const { loading } = this.props;

    return (
      <div className="container">
        <Grid container justify="center">
          <Grid item xs={12} sm={8} xl={6}>
            <Card>
              <CardContent className="settings-card">
                <AppBar position="static" color="default">
                  <Tabs
                    value={tabValue}
                    textColor="primary"
                    indicatorColor="primary"
                    onChange={this.handleTabChange}
                    scrollButtons="auto"
                    variant="scrollable"
                    className="tabs"
                  >
                    <Tab
                      label="Notifications"
                      icon={<Notifications />}
                      {...this.a11yProps(0)}
                    />
                    <Tab
                      label="Password"
                      icon={<Lock />}
                      {...this.a11yProps(1)}
                    />
                  </Tabs>
                </AppBar>
                <TabPanel value={tabValue} index={0}>
                  <Alert />
                  <div className="notifications">
                    <h3>Change Notifications Settings</h3>
                    <FormControl component="fieldset">
                      <FormGroup>
                        <FormControlLabel
                          control={
                            <Switch
                              checked={inApp}
                              onChange={this.handleChange}
                              name="inApp"
                              color="secondary"
                            />
                          }
                          label="In App Notifications"
                        />
                        <FormControlLabel
                          control={
                            <Switch
                              checked={email}
                              onChange={this.handleChange}
                              name="email"
                              color="secondary"
                            />
                          }
                          label="Email Notifications"
                        />
                      </FormGroup>

                      <Button
                        variant="contained"
                        color="primary"
                        className="form-btn"
                        onClick={this.formSubmitHandler}
                        disabled={loading}
                      >
                        {loading ? (
                          <CircularProgress color="primary" size={23} />
                        ) : (
                          'Save Changes'
                        )}
                      </Button>
                    </FormControl>
                  </div>
                </TabPanel>
                <TabPanel value={tabValue} index={1}>
                  <div className="no-content">
                    <p>Functionality not available yet</p>
                  </div>
                </TabPanel>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </div>
    );
  }
}

Settings.propTypes = {
  user: PropTypes.object,
  loading: PropTypes.bool,
  subscribe: PropTypes.func
};

const mapStateToProps = state => ({
  user: state.auth.user,
  loading: state.settings.loading
});

const mapDispatchToProps = dispacth => ({
  subscribe: formData => dispacth(actions.subscribe(formData))
});

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
