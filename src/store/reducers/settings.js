import * as actionTypes from '../actions/types';
import { updateObject } from '../../utils/updateObject';

const initialState = {
  status: null,
  message: null,
  user: {},
  loading: false
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case actionTypes.NOTIFICATIONS_SUBSCRIPTION_START:
      return updateObject(state, {
        ...initialState,
        loading: true
      });

    case actionTypes.NOTIFICATIONS_SUBSCRIPTION_SUCCESS:
      return updateObject(state, {
        status: payload.status,
        message: payload.message,
        user: payload.user,
        loading: false
      });

    case actionTypes.NOTIFICATIONS_SUBSCRIPTION_FAIL:
      return updateObject(state, {
        status: payload.status,
        errors: payload.errors,
        loading: false
      });

    default:
      return state;
  }
}
