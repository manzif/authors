import * as actionTypes from '../actions/types';
import { updateObject } from '../../utils/updateObject';

const initialState = {
  status: null,
  message: null,
  comments: [],
  loading: false,
  errors: null
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case actionTypes.COMMENT_ARTICLE_START:
    case actionTypes.FETCH_ARTICLE_COMMENTS_START:
      return updateObject(state, {
        ...initialState,
        loading: true
      });

    case actionTypes.COMMENT_ARTICLE_SUCCESS:
      return updateObject(state, {
        status: payload.status,
        message: payload.message,
        comments: state.comments.concat(payload.comment),
        loading: false
      });

    case actionTypes.FETCH_ARTICLE_COMMENTS_SUCCESS:
      return updateObject(state, {
        status: payload.status,
        message: payload.message,
        comments: payload.comments,
        loading: false
      });

    case actionTypes.COMMENT_ARTICLE_FAIL:
    case actionTypes.FETCH_ARTICLE_COMMENTS_FAIL:
      return updateObject(state, {
        status: payload.status,
        errors: payload.errors,
        loading: false
      });

    default:
      return state;
  }
}
