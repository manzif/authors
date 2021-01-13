import * as actionTypes from './types';

export const setAlert = (message, alertType) => dispatch => {
  dispatch({
    type: actionTypes.SET_ALERT,
    payload: { message, alertType }
  });

  setTimeout(() => dispatch({ type: actionTypes.REMOVE_ALERT }), 10000);
};

export const removeAlert = () => dispatch => {
  dispatch({ type: actionTypes.REMOVE_ALERT });
};
