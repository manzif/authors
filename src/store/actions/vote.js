import axios from 'axios';
import * as actionTypes from './types';
import setAuthToken from '../../utils/setAuthToken';

export const likeArticleStart = () => ({
  type: actionTypes.LIKE_ARTICLE_START
});

export const likeArticleSuccess = (status, message, vote) => ({
  type: actionTypes.LIKE_ARTICLE_SUCCESS,
  payload: {
    status,
    message,
    vote
  }
});

export const likeArticleFail = (status, errors) => ({
  type: actionTypes.LIKE_ARTICLE_FAIL,
  payload: {
    status,
    errors
  }
});

export const likeArticle = articleId => {
  return dispatch => {
    setAuthToken();
    dispatch(likeArticleStart());
    return axios
      .post(`/articles/${articleId}/like`)
      .then(response => {
        dispatch(
          likeArticleSuccess(
            response.data.status,
            response.data.message,
            response.data.data.vote
          )
        );
      })
      .catch(error => {
        if (error.response) {
          dispatch(
            likeArticleFail(
              error.response.data.status,
              error.response.data.errors
            )
          );
        }
      });
  };
};

export const dislikeArticleStart = () => ({
  type: actionTypes.DISLIKE_ARTICLE_START
});

export const dislikeArticleSuccess = (status, message, vote) => ({
  type: actionTypes.DISLIKE_ARTICLE_SUCCESS,
  payload: {
    status,
    message,
    vote
  }
});

export const dislikeArticleFail = (status, errors) => ({
  type: actionTypes.DISLIKE_ARTICLE_FAIL,
  payload: {
    status,
    errors
  }
});

export const dislikeArticle = articleId => {
  return dispatch => {
    setAuthToken();
    dispatch(dislikeArticleStart());
    return axios
      .post(`/articles/${articleId}/dislike`)
      .then(response => {
        dispatch(
          dislikeArticleSuccess(
            response.data.status,
            response.data.message,
            response.data.data.vote
          )
        );
      })
      .catch(error => {
        if (error.response) {
          dispatch(
            dislikeArticleFail(
              error.response.data.status,
              error.response.data.errors
            )
          );
        }
      });
  };
};

export const likeCommentStart = () => ({
  type: actionTypes.LIKE_COMMENT_START
});

export const likeCommentSuccess = (status, message, vote) => ({
  type: actionTypes.LIKE_COMMENT_SUCCESS,
  payload: {
    status,
    message,
    vote
  }
});

export const likeCommentFail = (status, errors) => ({
  type: actionTypes.LIKE_COMMENT_FAIL,
  payload: {
    status,
    errors
  }
});

export const likeComment = commentId => {
  return dispatch => {
    setAuthToken();
    dispatch(likeCommentStart());
    return axios
      .post(`/comments/${commentId}/like`)
      .then(response => {
        dispatch(
          likeCommentSuccess(
            response.data.status,
            response.data.message,
            response.data.data.vote
          )
        );
      })
      .catch(error => {
        if (error.response) {
          dispatch(
            likeCommentFail(
              error.response.data.status,
              error.response.data.errors
            )
          );
        }
      });
  };
};

export const dislikeCommentStart = () => ({
  type: actionTypes.DISLIKE_COMMENT_START
});

export const dislikeCommentSuccess = (status, message, vote) => ({
  type: actionTypes.DISLIKE_COMMENT_SUCCESS,
  payload: {
    status,
    message,
    vote
  }
});

export const dislikeCommentFail = (status, errors) => ({
  type: actionTypes.DISLIKE_COMMENT_FAIL,
  payload: {
    status,
    errors
  }
});

export const dislikeComment = commentId => {
  return dispatch => {
    setAuthToken();
    dispatch(dislikeCommentStart());
    return axios
      .post(`/comments/${commentId}/dislike`)
      .then(response => {
        dispatch(
          dislikeCommentSuccess(
            response.data.status,
            response.data.message,
            response.data.data.vote
          )
        );
      })
      .catch(error => {
        if (error.response) {
          dispatch(
            dislikeCommentFail(
              error.response.data.status,
              error.response.data.errors
            )
          );
        }
      });
  };
};
