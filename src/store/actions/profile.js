/* eslint-disable array-callback-return */
import axios from 'axios';
import * as actionTypes from './types';
import * as actions from '.';
import setAuthToken from '../../utils/setAuthToken';

export const fetchUserProfileStart = () => ({
  type: actionTypes.FETCH_USER_PROFILE_START
});

export const fetchUserProfileSuccess = (status, message, user) => ({
  type: actionTypes.FETCH_USER_PROFILE_SUCCESS,
  payload: {
    status,
    message,
    user
  }
});

export const fetchUserProfileFail = (status, errors) => ({
  type: actionTypes.FETCH_USER_PROFILE_FAIL,
  payload: {
    status,
    errors
  }
});

export const fetchUserProfile = () => {
  return dispatch => {
    setAuthToken();
    dispatch(fetchUserProfileStart());
    return axios
      .get('/users/me')
      .then(response => {
        dispatch(
          fetchUserProfileSuccess(
            response.data.status,
            response.data.message,
            response.data.data.user
          )
        );
      })
      .catch(error => {
        if (error.response) {
          dispatch(
            fetchUserProfileFail(
              error.response.data.status,
              error.response.data.errors
            )
          );
        }
      });
  };
};

export const updateUserProfileStart = () => ({
  type: actionTypes.UPDATE_USER_PROFILE_START
});

export const updateUserProfileSuccess = (status, message, user) => ({
  type: actionTypes.UPDATE_USER_PROFILE_SUCCESS,
  payload: {
    status,
    message,
    user
  }
});

export const updateUserProfileFail = (status, errors) => ({
  type: actionTypes.UPDATE_USER_PROFILE_FAIL,
  payload: {
    status,
    errors
  }
});

export const updateUserProfile = profileData => {
  return dispatch => {
    setAuthToken();
    dispatch(updateUserProfileStart());

    const formData = new FormData();
    formData.append('firstname', profileData.firstname);
    formData.append('lastname', profileData.lastname);
    formData.append('bio', profileData.bio);
    formData.append('image', profileData.image);

    return axios
      .put('/users/me', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })
      .then(response => {
        dispatch(
          updateUserProfileSuccess(
            response.data.status,
            response.data.message,
            response.data.data.user
          )
        );
        dispatch(actions.setAlert(response.data.message, 'success'));
        localStorage.setItem('user', JSON.stringify(response.data.data.user));
        dispatch(actions.authCheckState());
      })
      .catch(error => {
        if (error.response) {
          dispatch(
            updateUserProfileFail(
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

export const fetchUserArticlesStart = () => ({
  type: actionTypes.FETCH_USER_ARTICLES_START
});

export const fetchUserArticlesSuccess = (status, message, articles) => ({
  type: actionTypes.FETCH_USER_ARTICLES_SUCCESS,
  payload: {
    status,
    message,
    articles
  }
});

export const fetchUserArticlesFail = (status, errors) => ({
  type: actionTypes.FETCH_USER_ARTICLES_FAIL,
  payload: {
    status,
    errors
  }
});

export const fetchUserArticles = () => {
  return dispatch => {
    setAuthToken();
    dispatch(fetchUserArticlesStart());
    return axios
      .get('/users/articles')
      .then(response => {
        dispatch(
          fetchUserArticlesSuccess(
            response.data.status,
            response.data.message,
            response.data.data.articles
          )
        );
      })
      .catch(error => {
        if (error.response) {
          dispatch(
            fetchUserArticlesFail(
              error.response.data.status,
              error.response.data.errors
            )
          );
        }
      });
  };
};

export const fetchUserFollowersStart = () => ({
  type: actionTypes.FETCH_USER_FOLLOWERS_START
});

export const fetchUserFollowersSuccess = (status, message, followers) => ({
  type: actionTypes.FETCH_USER_FOLLOWERS_SUCCESS,
  payload: {
    status,
    message,
    followers
  }
});

export const fetchUserFollowersFail = (status, errors) => ({
  type: actionTypes.FETCH_USER_FOLLOWERS_FAIL,
  payload: {
    status,
    errors
  }
});

export const fetchUserFollowers = () => {
  return dispatch => {
    setAuthToken();
    dispatch(fetchUserFollowersStart());
    return axios
      .get('/users/followers')
      .then(response => {
        dispatch(
          fetchUserFollowersSuccess(
            response.data.status,
            response.data.message,
            response.data.data.followers
          )
        );
      })
      .catch(error => {
        if (error.response) {
          dispatch(
            fetchUserArticlesFail(
              error.response.data.status,
              error.response.data.errors
            )
          );
        }
      });
  };
};

export const fetchUserFolloweesStart = () => ({
  type: actionTypes.FETCH_USER_FOLLOWEES_START
});

export const fetchUserFolloweesSuccess = (status, message, followees) => ({
  type: actionTypes.FETCH_USER_FOLLOWEES_SUCCESS,
  payload: {
    status,
    message,
    followees
  }
});

export const fetchUserFolloweesFail = (status, errors) => ({
  type: actionTypes.FETCH_USER_FOLLOWEES_FAIL,
  payload: {
    status,
    errors
  }
});

export const fetchUserFollowees = () => {
  return dispatch => {
    setAuthToken();
    dispatch(fetchUserFolloweesStart());
    return axios
      .get('/users/followees')
      .then(response => {
        dispatch(
          fetchUserFolloweesSuccess(
            response.data.status,
            response.data.message,
            response.data.data.followees
          )
        );
      })
      .catch(error => {
        if (error.response) {
          dispatch(
            fetchUserFolloweesFail(
              error.response.data.status,
              error.response.data.errors
            )
          );
        }
      });
  };
};

export const followUserStart = () => ({
  type: actionTypes.FOLLOW_USER_START
});

export const followUserSuccess = (status, message) => ({
  type: actionTypes.FOLLOW_USER_SUCCESS,
  payload: {
    status,
    message
  }
});

export const followUserFail = (status, errors) => ({
  type: actionTypes.FOLLOW_USER_FAIL,
  payload: {
    status,
    errors
  }
});

export const followUser = userId => {
  return dispatch => {
    setAuthToken();
    dispatch(followUserStart());
    return axios
      .post(`/users/${userId}/follow`)
      .then(response => {
        dispatch(
          followUserSuccess(response.data.status, response.data.message)
        );
      })
      .catch(error => {
        if (error.response) {
          dispatch(
            followUserFail(
              error.response.data.status,
              error.response.data.errors
            )
          );
        }
      });
  };
};

export const unfollowUserStart = () => ({
  type: actionTypes.UNFOLLOW_USER_START
});

export const unfollowUserSuccess = (status, message) => ({
  type: actionTypes.UNFOLLOW_USER_SUCCESS,
  payload: {
    status,
    message
  }
});

export const unfollowUserFail = (status, errors) => ({
  type: actionTypes.UNFOLLOW_USER_FAIL,
  payload: {
    status,
    errors
  }
});

export const unfollowUser = userId => {
  return dispatch => {
    setAuthToken();
    dispatch(unfollowUserStart());
    return axios
      .post(`/users/${userId}/unfollow`)
      .then(response => {
        dispatch(
          unfollowUserSuccess(response.data.status, response.data.message)
        );
      })
      .catch(error => {
        if (error.response) {
          dispatch(
            unfollowUserFail(
              error.response.data.status,
              error.response.data.errors
            )
          );
        }
      });
  };
};

export const fetchUserBookmarksStart = () => ({
  type: actionTypes.FETCH_USER_BOOKMARKS_START
});

export const fetchUserBookmarksSuccess = (status, message, bookmarks) => ({
  type: actionTypes.FETCH_USER_BOOKMARKS_SUCCESS,
  payload: {
    status,
    message,
    bookmarks
  }
});

export const fetchUserBookmarksFail = (status, errors) => ({
  type: actionTypes.FETCH_USER_BOOKMARKS_FAIL,
  payload: {
    status,
    errors
  }
});

export const fetchUserBookmarks = () => {
  return dispatch => {
    setAuthToken();
    dispatch(fetchUserBookmarksStart());
    return axios
      .get('/users/bookmarks')
      .then(response => {
        dispatch(
          fetchUserBookmarksSuccess(
            response.data.status,
            response.data.message,
            response.data.data.bookmarks
          )
        );
      })
      .catch(error => {
        if (error.response) {
          dispatch(
            fetchUserBookmarksFail(
              error.response.data.status,
              error.response.data.errors
            )
          );
        }
      });
  };
};
