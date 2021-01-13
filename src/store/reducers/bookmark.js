import * as actionTypes from '../actions/types';
import { updateObject } from '../../utils/updateObject';

const initialState = {
  status: null,
  message: null,
  loading: false
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case actionTypes.BOOKMARK_ARTICLE_START:
    case actionTypes.UNBOOKMARK_ARTICLE_START:
      return updateObject(state, {
        ...initialState,
        loading: true
      });

    case actionTypes.BOOKMARK_ARTICLE_SUCCESS:
    case actionTypes.UNBOOKMARK_ARTICLE_SUCCESS:
      return updateObject(state, {
        status: payload.status,
        message: payload.message,
        loading: false
      });

    case actionTypes.BOOKMARK_ARTICLE_FAIL:
    case actionTypes.UNBOOKMARK_ARTICLE_FAIL:
      return updateObject(state, {
        status: payload.status,
        errors: payload.errors,
        loading: false
      });

    default:
      return state;
  }
}
