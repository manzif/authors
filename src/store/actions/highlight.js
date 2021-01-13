import axios from 'axios';
import * as actionTypes from './types';
import setAuthToken from '../../utils/setAuthToken';

export const fetchHighlightsStart = () => ({
  type: actionTypes.FETCH_HIGHLIGHTS_START
});

export const fetchHighlightsSuccess = (status, message, highlights) => ({
  type: actionTypes.FETCH_HIGHLIGHTS_SUCCESS,
  payload: {
    status,
    message,
    highlights
  }
});

export const fetchHighlightsFail = (status, errors) => ({
  type: actionTypes.FETCH_HIGHLIGHTS_FAIL,
  payload: {
    status,
    errors
  }
});

export const fetchHighlights = articleId => {
  return dispatch => {
    setAuthToken();
    dispatch(fetchHighlightsStart());
    return axios
      .get(`/articles/${articleId}/highlights`)
      .then(response => {
        dispatch(
          fetchHighlightsSuccess(
            response.data.status,
            response.data.message,
            response.data.data.highlights
          )
        );
      })
      .catch(error => {
        if (error.response) {
          dispatch(
            fetchHighlightsFail(
              error.response.data.status,
              error.response.data.errors
            )
          );
        }
      });
  };
};

export const highlightTextStart = () => ({
  type: actionTypes.HIGHLIGHT_TEXT_START
});

export const highlightTextSuccess = (status, message, highlight) => ({
  type: actionTypes.HIGHLIGHT_TEXT_SUCCESS,
  payload: {
    status,
    message,
    highlight
  }
});

export const highlightTextFail = (status, errors) => ({
  type: actionTypes.HIGHLIGHT_TEXT_FAIL,
  payload: {
    status,
    errors
  }
});

export const highlightText = (articleId, formData) => {
  return dispatch => {
    setAuthToken();
    dispatch(highlightTextStart());
    return axios
      .post(`/articles/${articleId}/highlights`, formData)
      .then(response => {
        dispatch(
          highlightTextSuccess(
            response.data.status,
            response.data.message,
            response.data.data.highlight
          )
        );
        dispatch(fetchHighlights(articleId));
      })
      .catch(error => {
        if (error.response) {
          dispatch(
            highlightTextFail(
              error.response.data.status,
              error.response.data.errors
            )
          );
        }
      });
  };
};
