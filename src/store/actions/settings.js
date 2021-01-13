import axios from 'axios';
import * as actionTypes from './types';
import * as actions from '.';
import setAuthToken from '../../utils/setAuthToken';

export const subscribeStart = () => ({
  type: actionTypes.NOTIFICATIONS_SUBSCRIPTION_START
});

export const subscribeSuccess = (status, message, user) => ({
  type: actionTypes.NOTIFICATIONS_SUBSCRIPTION_SUCCESS,
  payload: {
    status,
    message,
    user
  }
});

export const subscribeFail = (status, errors) => ({
  type: actionTypes.NOTIFICATIONS_SUBSCRIPTION_FAIL,
  payload: {
    status,
    errors
  }
});

export const subscribe = formData => {
  return dispatch => {
    setAuthToken();
    dispatch(subscribeStart());
    return axios
      .post('notifications/subscribe', formData)
      .then(response => {
        dispatch(
          subscribeSuccess(
            response.data.status,
            response.data.message,
            response.data.data.user
          )
        );
        const user = JSON.parse(localStorage.getItem('user'));
        user.allowNotifications = response.data.data.user.allowNotifications;
        localStorage.setItem('user', JSON.stringify(user));
        dispatch(actions.authCheckState());
        dispatch(actions.setAlert(response.data.message, 'success'));
      })
      .catch(error => {
        if (error.response) {
          dispatch(
            subscribeFail(
              error.response.data.status,
              error.response.data.errors
            )
          );
        }
      });
  };
};
