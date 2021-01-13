/* eslint-disable array-callback-return */
import axios from 'axios';
import * as actionTypes from './types';
import * as actions from '.';
import setAuthToken from '../../utils/setAuthToken';

export const commentArticleStart = () => ({
  type: actionTypes.COMMENT_ARTICLE_START
});

export const commentArticleSuccess = (status, message, comment) => ({
  type: actionTypes.COMMENT_ARTICLE_SUCCESS,
  payload: {
    status,
    message,
    comment
  }
});

export const commentArticleFail = (status, errors) => ({
  type: actionTypes.COMMENT_ARTICLE_FAIL,
  payload: {
    status,
    errors
  }
});

export const commentArticle = (articleId, formData) => {
  return dispatch => {
    setAuthToken();
    dispatch(commentArticleStart());
    return axios
      .post(`/articles/${articleId}/comments`, formData)
      .then(response => {
        dispatch(
          commentArticleSuccess(
            response.data.status,
            response.data.message,
            response.data.data.comment
          )
        );
      })
      .catch(error => {
        if (error.response) {
          dispatch(
            commentArticleFail(
              error.response.data.status,
              error.response.data.errors
            )
          );
          error.response.data.errors.map(err => {
            dispatch(actions.setAlert(err.msg, 'error'));
          });
        }
      });
  };
};

export const fetchArticleCommentsStart = () => ({
  type: actionTypes.FETCH_ARTICLE_COMMENTS_START
});

export const fetchArticleCommentsSuccess = (status, message, comments) => ({
  type: actionTypes.FETCH_ARTICLE_COMMENTS_SUCCESS,
  payload: {
    status,
    message,
    comments
  }
});

export const fetchArticleCommentsFail = (status, errors) => ({
  type: actionTypes.FETCH_ARTICLE_COMMENTS_FAIL,
  payload: {
    status,
    errors
  }
});

export const fetchArticleComments = articleId => {
  return dispatch => {
    setAuthToken();
    dispatch(fetchArticleCommentsStart());
    return axios
      .get(`/articles/${articleId}/comments`)
      .then(response => {
        dispatch(
          fetchArticleCommentsSuccess(
            response.data.status,
            response.data.message,
            response.data.data.comments
          )
        );
      })
      .catch(error => {
        if (error.response) {
          dispatch(
            fetchArticleCommentsFail(
              error.response.data.status,
              error.response.data.errors
            )
          );
        }
      });
  };
};
