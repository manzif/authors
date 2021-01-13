import * as actionTypes from '../actions/types';
import { updateObject } from '../../utils/updateObject';

const initialState = {
  status: null,
  message: null,
  notifications: [],
  loading: false,
  errors: null
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case actionTypes.FETCH_NOTIFICATIONS_START:
      return updateObject(state, {
        ...initialState,
        loading: true
      });

    case actionTypes.READ_NOTIFICATION_START:
      return updateObject(state, {
        status: null,
        message: null,
        loading: true
      });

    case actionTypes.FETCH_NOTIFICATIONS_SUCCESS:
      return updateObject(state, {
        status: payload.status,
        message: payload.message,
        notifications: payload.notifications,
        loading: false
      });

    case actionTypes.READ_NOTIFICATION_SUCCESS:
      return updateObject(state, {
        status: payload.status,
        message: payload.message,
        loading: false
      });

    case actionTypes.FETCH_NOTIFICATIONS_FAIL:
    case actionTypes.READ_NOTIFICATION_FAIL:
      return updateObject(state, {
        status: payload.status,
        errors: payload.errors,
        loading: false
      });

    default:
      return state;
  }
}
