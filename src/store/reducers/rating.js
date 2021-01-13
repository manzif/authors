import * as actionTypes from '../actions/types';
import { updateObject } from '../../utils/updateObject';

const initialState = {
  status: null,
  message: null,
  errors: null,
  ratings: [],
  loading: false
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case actionTypes.FETCH_ARTICLE_RATINGS_START:
    case actionTypes.RATE_ARTICLE_START:
      return updateObject(state, {
        ...initialState,
        loading: true
      });

    case actionTypes.FETCH_ARTICLE_RATINGS_SUCCESS:
      return updateObject(state, {
        status: payload.status,
        message: payload.message,
        ratings: payload.ratings,
        loading: false
      });

    case actionTypes.RATE_ARTICLE_SUCCESS:
      return updateObject(state, {
        status: payload.status,
        message: payload.message,
        ratings: state.ratings.concat(payload.rating),
        loading: false
      });

    case actionTypes.FETCH_ARTICLE_RATINGS_FAIL:
    case actionTypes.RATE_ARTICLE_FAIL:
      return updateObject(state, {
        status: payload.status,
        errors: payload.errors,
        loading: false
      });

    default:
      return state;
  }
}
