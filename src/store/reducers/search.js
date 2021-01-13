import * as actionTypes from '../actions/types';
import { updateObject } from '../../utils/updateObject';

const initialState = {
  status: null,
  message: null,
  articles: [],
  errors: null,
  loading: false
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case actionTypes.SEARCH_START:
      return updateObject(state, {
        ...initialState,
        loading: true
      });

    case actionTypes.SEARCH_SUCCESS:
      return updateObject(state, {
        status: payload.status,
        message: payload.message,
        articles: payload.articles,
        loading: false
      });

    case actionTypes.SEARCH_FAIL:
      return updateObject(state, {
        status: payload.status,
        errors: payload.errors,
        loading: false
      });

    default:
      return state;
  }
}
