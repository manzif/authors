import * as actionTypes from '../actions/types';
import { updateObject } from '../../utils/updateObject';

const initialState = {
  status: null,
  message: null,
  highlights: [],
  loading: false
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case actionTypes.FETCH_HIGHLIGHTS_START:
    case actionTypes.HIGHLIGHT_TEXT_START:
      return updateObject(state, {
        ...initialState,
        loading: true
      });

    case actionTypes.FETCH_HIGHLIGHTS_SUCCESS:
      return updateObject(state, {
        status: payload.status,
        message: payload.message,
        highlights: payload.highlights,
        loading: false
      });

    case actionTypes.HIGHLIGHT_TEXT_SUCCESS:
      return updateObject(state, {
        status: payload.status,
        message: payload.message,
        highlights: state.highlights.concat(payload.highlight),
        loading: false
      });

    case actionTypes.FETCH_HIGHLIGHTS_FAIL:
    case actionTypes.HIGHLIGHT_TEXT_FAIL:
      return updateObject(state, {
        status: payload.status,
        errors: payload.errors,
        loading: false
      });

    default:
      return state;
  }
}
