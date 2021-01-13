import * as actionTypes from '../actions/types';
import { updateObject } from '../../utils/updateObject';

const initialState = {
  status: null,
  message: null,
  token: null,
  user: {},
  errors: null,
  loading: false
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case actionTypes.SIGNUP_START:
    case actionTypes.ACTIVATE_START:
    case actionTypes.LOGIN_START:
    case actionTypes.REQUEST_RESET_LINK_START:
    case actionTypes.RESET_PASSWORD_START:
      return updateObject(state, {
        status: null,
        message: null,
        errors: null,
        user: {},
        loading: true
      });

    case actionTypes.SIGNUP_SUCCESS:
    case actionTypes.ACTIVATE_SUCCESS:
    case actionTypes.REQUEST_RESET_LINK_SUCCESS:
    case actionTypes.RESET_PASSWORD_SUCCESS:
      return updateObject(state, {
        status: payload.status,
        message: payload.message,
        loading: false
      });

    case actionTypes.LOGIN_SUCCESS:
      return updateObject(state, {
        status: payload.status,
        message: payload.message,
        token: payload.token,
        user: payload.user,
        loading: false
      });

    case actionTypes.SIGNUP_FAIL:
    case actionTypes.ACTIVATE_FAIL:
    case actionTypes.LOGIN_FAIL:
    case actionTypes.REQUEST_RESET_LINK_FAIL:
    case actionTypes.RESET_PASSWORD_FAIL:
      return updateObject(state, {
        status: payload.status,
        errors: payload.errors,
        loading: false
      });

    case actionTypes.LOGOUT:
      return updateObject(state, {
        ...initialState
      });

    default:
      return state;
  }
}
