import axios from 'axios';
import * as actionTypes from './types';
import setAuthToken from '../../utils/setAuthToken';

export const fetchNotificationssStart = () => ({
  type: actionTypes.FETCH_NOTIFICATIONS_START
});

export const fetchNotificationsSuccess = (status, message, notifications) => ({
  type: actionTypes.FETCH_NOTIFICATIONS_SUCCESS,
  payload: {
    status,
    message,
    notifications
  }
});

export const fetchNotificationsFail = (status, errors) => ({
  type: actionTypes.FETCH_NOTIFICATIONS_FAIL,
  payload: {
    status,
    errors
  }
});

export const fetchNotifications = () => {
  return dispatch => {
    setAuthToken();
    dispatch(fetchNotificationssStart());
    return axios
      .get('/notifications')
      .then(response => {
        dispatch(
          fetchNotificationsSuccess(
            response.data.status,
            response.data.message,
            response.data.data.notifications
          )
        );
      })
      .catch(error => {
        if (error.response) {
          dispatch(
            fetchNotificationsFail(
              error.response.data.status,
              error.response.data.errors
            )
          );
        }
      });
  };
};

export const readNotificationsStart = () => ({
  type: actionTypes.READ_NOTIFICATION_START
});

export const readNotificationSuccess = (status, message) => ({
  type: actionTypes.READ_NOTIFICATION_SUCCESS,
  payload: {
    status,
    message
  }
});

export const readNotificationFail = (status, errors) => ({
  type: actionTypes.READ_NOTIFICATION_FAIL,
  payload: {
    status,
    errors
  }
});

export const readNotification = notificationId => {
  return dispatch => {
    setAuthToken();
    dispatch(fetchNotificationssStart());
    return axios
      .get(`/notifications/${notificationId}`)
      .then(response => {
        dispatch(
          readNotificationSuccess(response.data.status, response.data.message)
        );
      })
      .catch(error => {
        if (error.response) {
          dispatch(
            readNotificationFail(
              error.response.data.status,
              error.response.data.errors
            )
          );
        }
      });
  };
};
