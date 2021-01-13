import axios from 'axios';
import * as actionTypes from './types';
import setAuthToken from '../../utils/setAuthToken';

export const bookmarkArticleStart = () => ({
  type: actionTypes.BOOKMARK_ARTICLE_START
});

export const bookmarkArticleSuccess = (status, message) => ({
  type: actionTypes.BOOKMARK_ARTICLE_SUCCESS,
  payload: {
    status,
    message
  }
});

export const bookmarkArticleFail = (status, errors) => ({
  type: actionTypes.BOOKMARK_ARTICLE_FAIL,
  payload: {
    status,
    errors
  }
});

export const bookmarkArticle = articleId => {
  return dispatch => {
    setAuthToken();
    dispatch(bookmarkArticleStart());
    return axios
      .post(`/articles/${articleId}/bookmark`)
      .then(response => {
        dispatch(
          bookmarkArticleSuccess(response.data.status, response.data.message)
        );
      })
      .catch(error => {
        if (error.response) {
          dispatch(
            bookmarkArticleFail(
              error.response.data.status,
              error.response.data.errors
            )
          );
        }
      });
  };
};

export const unbookmarkArticleStart = () => ({
  type: actionTypes.UNBOOKMARK_ARTICLE_START
});

export const unbookmarkArticleSuccess = (status, message) => ({
  type: actionTypes.UNBOOKMARK_ARTICLE_SUCCESS,
  payload: {
    status,
    message
  }
});

export const unbookmarkArticleFail = (status, errors) => ({
  type: actionTypes.UNBOOKMARK_ARTICLE_FAIL,
  payload: {
    status,
    errors
  }
});

export const unbookmarkArticle = articleId => {
  return dispatch => {
    setAuthToken();
    dispatch(unbookmarkArticleStart());
    return axios
      .post(`/articles/${articleId}/unbookmark`)
      .then(response => {
        dispatch(
          unbookmarkArticleSuccess(response.data.status, response.data.message)
        );
      })
      .catch(error => {
        if (error.response) {
          dispatch(
            unbookmarkArticleFail(
              error.response.data.status,
              error.response.data.errors
            )
          );
        }
      });
  };
};
