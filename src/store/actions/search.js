import axios from 'axios';
import * as actionTypes from './types';

export const searchStart = () => ({
  type: actionTypes.SEARCH_START
});

export const searchSuccess = (status, message, articles) => ({
  type: actionTypes.SEARCH_SUCCESS,
  payload: {
    status,
    message,
    articles
  }
});

export const searchFail = (status, errors) => ({
  type: actionTypes.SEARCH_FAIL,
  payload: {
    status,
    errors
  }
});

export const search = query => {
  return dispatch => {
    dispatch(searchStart());
    return axios
      .post(`/search?query=${query}`)
      .then(response => {
        dispatch(
          searchSuccess(
            response.data.status,
            response.data.message,
            response.data.data.articles
          )
        );
      })
      .catch(error => {
        if (error.response) {
          dispatch(
            searchFail(error.response.data.status, error.response.data.errors)
          );
        }
      });
  };
};
