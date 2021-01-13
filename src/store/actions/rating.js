import axios from 'axios';
import * as actionTypes from './types';
import setAuthToken from '../../utils/setAuthToken';

export const fetchArticleRatingsStart = () => ({
  type: actionTypes.FETCH_ARTICLE_RATINGS_START
});

export const fetchArticleRatingsSuccess = (status, message, ratings) => ({
  type: actionTypes.FETCH_ARTICLE_RATINGS_SUCCESS,
  payload: {
    status,
    message,
    ratings
  }
});

export const fetchArticleRatingsFail = (status, errors) => ({
  type: actionTypes.FETCH_ARTICLE_RATINGS_FAIL,
  payload: {
    status,
    errors
  }
});

export const fetchArticleRatings = articleId => {
  return dispatch => {
    dispatch(fetchArticleRatingsStart());
    return axios
      .get(`/articles/${articleId}/ratings`)
      .then(response => {
        dispatch(
          fetchArticleRatingsSuccess(
            response.data.status,
            response.data.message,
            response.data.data.ratings
          )
        );
      })
      .catch(error => {
        if (error.response) {
          dispatch(
            fetchArticleRatingsFail(
              error.response.data.status,
              error.response.data.errors
            )
          );
        }
      });
  };
};

export const rateArticleStart = () => ({
  type: actionTypes.RATE_ARTICLE_START
});

export const rateArticleSuccess = (status, message, rating) => ({
  type: actionTypes.RATE_ARTICLE_SUCCESS,
  payload: {
    status,
    message,
    rating
  }
});

export const rateArticleFail = (status, errors) => ({
  type: actionTypes.RATE_ARTICLE_FAIL,
  payload: {
    status,
    errors
  }
});

export const rateArticle = (articleId, formData) => {
  return dispatch => {
    setAuthToken();
    dispatch(rateArticleStart());
    return axios
      .post(`/articles/${articleId}/ratings`, formData)
      .then(response => {
        dispatch(
          rateArticleSuccess(
            response.data.status,
            response.data.message,
            response.data.data.rating
          )
        );
      })
      .catch(error => {
        if (error.response) {
          dispatch(
            rateArticleFail(
              error.response.data.status,
              error.response.data.errors
            )
          );
        }
      });
  };
};
