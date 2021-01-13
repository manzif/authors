import * as actionTypes from '../actions/types';
import { updateObject } from '../../utils/updateObject';

const initialState = {
  status: null,
  message: null,
  user: {},
  articles: [],
  followers: [],
  followees: [],
  bookmarks: [],
  errors: null,
  loadingProfile: false,
  loadingArticles: false,
  loadingFollowers: false,
  loadingFollowees: false,
  loadingFollow: false,
  loadingBookmarks: false
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case actionTypes.FETCH_USER_PROFILE_START:
    case actionTypes.UPDATE_USER_PROFILE_START:
      return updateObject(state, {
        ...initialState,
        loadingProfile: true
      });

    case actionTypes.FETCH_USER_ARTICLES_START:
      return updateObject(state, {
        status: null,
        message: null,
        articles: [],
        loadingArticles: true
      });

    case actionTypes.FETCH_USER_FOLLOWERS_START:
      return updateObject(state, {
        status: null,
        message: null,
        followers: [],
        loadingFollowers: true
      });

    case actionTypes.FETCH_USER_FOLLOWEES_START:
      return updateObject(state, {
        status: null,
        message: null,
        followees: [],
        loadingFollowees: true
      });

    case actionTypes.FETCH_USER_BOOKMARKS_START:
      return updateObject(state, {
        status: null,
        message: null,
        bookmarks: [],
        loadingBookmarks: true
      });

    case actionTypes.FOLLOW_USER_START:
    case actionTypes.UNFOLLOW_USER_START:
      return updateObject(state, {
        status: null,
        message: null,
        loadingFollow: true
      });

    case actionTypes.FETCH_USER_PROFILE_SUCCESS:
    case actionTypes.UPDATE_USER_PROFILE_SUCCESS:
      return updateObject(state, {
        status: payload.status,
        message: payload.message,
        user: payload.user,
        loadingProfile: false
      });

    case actionTypes.FETCH_USER_ARTICLES_SUCCESS:
      return updateObject(state, {
        status: payload.status,
        message: payload.message,
        articles: payload.articles,
        loadingArticles: false
      });

    case actionTypes.FETCH_USER_FOLLOWERS_SUCCESS:
      return updateObject(state, {
        status: payload.status,
        message: payload.message,
        followers: payload.followers,
        loadingFollowers: false
      });

    case actionTypes.FETCH_USER_FOLLOWEES_SUCCESS:
      return updateObject(state, {
        status: payload.status,
        message: payload.message,
        followees: payload.followees,
        loadingFollowees: false
      });

    case actionTypes.FETCH_USER_BOOKMARKS_SUCCESS:
      return updateObject(state, {
        status: payload.status,
        message: payload.message,
        bookmarks: payload.bookmarks,
        loadingBookmarks: false
      });

    case actionTypes.FOLLOW_USER_SUCCESS:
    case actionTypes.UNFOLLOW_USER_SUCCESS:
      return updateObject(state, {
        status: payload.status,
        message: payload.message,
        loadingFollow: false
      });

    case actionTypes.FETCH_USER_PROFILE_FAIL:
    case actionTypes.UPDATE_USER_PROFILE_FAIL:
      return updateObject(state, {
        status: payload.status,
        errors: payload.errors,
        loadingProfile: false
      });

    case actionTypes.FETCH_USER_ARTICLES_FAIL:
      return updateObject(state, {
        status: payload.status,
        errors: payload.errors,
        loadingArticles: false
      });

    case actionTypes.FETCH_USER_FOLLOWERS_FAIL:
      return updateObject(state, {
        status: payload.status,
        errors: payload.errors,
        loadingFollowers: false
      });

    case actionTypes.FETCH_USER_FOLLOWEES_FAIL:
      return updateObject(state, {
        status: payload.status,
        errors: payload.errors,
        loadingFollowees: false
      });
    case actionTypes.FETCH_USER_BOOKMARKS_FAIL:
      return updateObject(state, {
        status: payload.status,
        errors: payload.errors,
        loadingBookmarks: false
      });

    case actionTypes.FOLLOW_USER_FAIL:
    case actionTypes.UNFOLLOW_USER_FAIL:
      return updateObject(state, {
        status: payload.status,
        errors: payload.errors,
        loadingFollow: false
      });

    default:
      return state;
  }
}
