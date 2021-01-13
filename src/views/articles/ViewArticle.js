/* eslint-disable no-nested-ternary */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react/jsx-indent */
import React, { Component } from 'react';
import { Grid, Avatar, Paper, CircularProgress } from '@material-ui/core';
import { Rating } from '@material-ui/lab';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import moment from 'moment';
import htmlParser from 'html-react-parser';
import { Redirect } from 'react-router-dom';
import Prism from 'prismjs';
import * as actions from '../../store/actions';
import Alert from '../../components/UI/Alert';
import Aux from '../../components/hoc/Aux';
import Comments from '../../components/Comments';
import Modal from '../../components/UI/Modal';
import Button from '../../components/UI/Button';
import ActionsPopup from '../../components/UI/popups/Actions';
import CommentPopup from '../../components/UI/popups/Comment';
import { markHighlightedText } from '../../utils/markHighlightedText';

class ViewArticle extends Component {
  state = {
    hasLiked: false,
    hasDisliked: false,
    likes: 0,
    dislikes: 0,
    hasBookmarked: false,
    isGuest: false,
    rating: 0,
    loading: false,
    openDeleteModel: false,
    follow: false,
    indexStart: '',
    indexEnd: '',
    text: ''
  };

  componentDidMount() {
    const {
      onFetchArticle,
      match,
      onFetchArticleRatings,
      onFetchUserFollowees,
      onFetchHighlights
    } = this.props;
    onFetchArticle(match.params.articleSlug).then(() => {
      const { votes, hasBookmarked, id, authorId } = this.props.article;
      onFetchArticleRatings(id).then(async () => {
        const { ratings, user, isAuthenticated } = this.props;
        for (const rating of ratings) {
          if (rating.userId === user.id) {
            this.setState({ rating: rating.rating });
          }
        }
        if (isAuthenticated) {
          await onFetchUserFollowees();
          const { followees } = this.props;
          for (const followee of followees) {
            if (followee.followeeId === authorId) {
              this.setState({ follow: true });
            }
          }
          await onFetchHighlights(id);
        }
      });
      this.setState({
        hasLiked: votes.hasLiked,
        hasDisliked: votes.hasDisliked,
        likes: votes.likes,
        dislikes: votes.dislikes,
        hasBookmarked
      });
    });
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.message === 'Article successfully deleted') {
      this.props.history.push('/');
    }
  }

  likeArticle = () => {
    const { article, onLikeArticle, isAuthenticated } = this.props;
    if (isAuthenticated) {
      onLikeArticle(article.id).then(() => {
        const { voteMessage } = this.props;
        if (voteMessage === 'Article successfully liked') {
          let { dislikes } = this.state;
          const { hasDisliked, likes } = this.state;
          dislikes = hasDisliked ? dislikes - 1 : dislikes;
          this.setState({
            likes: likes + 1,
            hasLiked: true,
            dislikes,
            hasDisliked: false
          });
        }
      });
    } else {
      this.setState({ isGuest: true });
    }
  };

  dislikeArticle = () => {
    const { article, onDislikeArticle, isAuthenticated } = this.props;
    if (isAuthenticated) {
      onDislikeArticle(article.id).then(() => {
        const { voteMessage } = this.props;
        if (voteMessage === 'Article successfully disliked') {
          let { likes } = this.state;
          const { hasLiked, dislikes } = this.state;
          likes = hasLiked ? likes - 1 : likes;
          this.setState({
            likes,
            hasLiked: false,
            dislikes: dislikes + 1,
            hasDisliked: true
          });
        }
      });
    } else {
      this.setState({ isGuest: true });
    }
  };

  bookmarkArticle = () => {
    const { article, onBookmarkArticle, isAuthenticated } = this.props;
    if (isAuthenticated) {
      onBookmarkArticle(article.id).then(() => {
        const { bookmarkMessage } = this.props;
        if (bookmarkMessage === 'Article successfully bookmarked') {
          this.setState({ hasBookmarked: true });
        }
      });
    } else {
      this.setState({ isGuest: true });
    }
  };

  unbookmarkArticle = () => {
    const { article, onUnbookmarkArticle, isAuthenticated } = this.props;
    if (isAuthenticated) {
      onUnbookmarkArticle(article.id).then(() => {
        const { bookmarkMessage } = this.props;
        if (bookmarkMessage === 'Article successfully unbookmarked') {
          this.setState({ hasBookmarked: false });
        }
      });
    } else {
      this.setState({ isGuest: true });
    }
  };

  onRatingChange = (event, value) => {
    const { article, onRateArticle, isAuthenticated } = this.props;
    if (isAuthenticated) {
      this.setState({ loading: true });
      const formData = { rating: value };
      onRateArticle(article.id, formData).then(() => {
        const { ratingMessage } = this.props;
        if (
          ratingMessage === 'Rating successfully updated' ||
          ratingMessage === 'Rating successfully created'
        ) {
          this.setState({ rating: value, loading: false });
        }
      });
    } else {
      this.setState({ isGuest: true });
    }
  };

  onOpenDeleteModal = () => {
    this.setState({ openDeleteModel: true });
  };

  onCloseDeleteModal = () => {
    this.setState({ openDeleteModel: false });
  };

  onDelete = () => {
    this.setState({ openDeleteModel: false });
    const { onDeleteArticle, article } = this.props;
    onDeleteArticle(article.id);
  };

  onEdit = () => {
    const { history, article } = this.props;
    history.push(`/articles/${article.slug}/edit`);
  };

  followUser = async () => {
    const { onFollowUser, article } = this.props;
    await onFollowUser(article.authorId);
    if (this.props.profileMessage === 'User successfully followed') {
      this.setState({ follow: true });
    }
  };

  unfollowUser = async () => {
    const { onUnfollowUser, article } = this.props;
    await onUnfollowUser(article.authorId);
    if (this.props.profileMessage === 'User successfully unfollowed') {
      this.setState({ follow: false });
    }
  };

  onSelectText = () => {
    const selection = window.getSelection();
    const text = selection.toString();
    const popup = document.getElementById('actions-popup');
    if (text.length > 0) {
      const range = selection.getRangeAt(0);
      const rect = range.getBoundingClientRect();
      const topScroll =
        window.pageYOffset || document.documentElement.scrollTop;
      popup.classList.remove('hide');
      popup.style.top = `${rect.top + topScroll - 55}px`;
      popup.style.left = `${rect.left}px`;
      const indexStart = selection.anchorOffset;
      const indexEnd =
        indexStart === 0
          ? indexStart + text.length - 1
          : indexStart + text.length;
      this.setState({ indexStart, indexEnd, text });
    } else {
      popup.classList.add('hide');
    }
  };

  onHighlight = () => {
    const { isAuthenticated } = this.props;
    if (isAuthenticated) {
      const popup = document.getElementById('actions-popup');
      const comment = document.getElementById('comments-popup');
      const body = document.getElementById('body');
      popup.classList.add('hide');
      const selection = window.getSelection();
      const range = selection.getRangeAt(0);
      const rect = range.getBoundingClientRect();
      const topScroll =
        window.pageYOffset || document.documentElement.scrollTop;
      const newNode = document.createElement('span');
      newNode.classList.add('highlighted');
      range.surroundContents(newNode);
      comment.classList.remove('hide');
      comment.style.top = `${rect.top + topScroll + 40}px`;
      comment.style.left = `${rect.left}px`;

      body.onmouseup = () => {
        comment.classList.add('hide');
        newNode.style.background = '';
      };
    } else {
      this.setState({ isGuest: true });
    }
  };

  render() {
    Prism.highlightAll();
    const {
      loading,
      article,
      location,
      isAuthenticated,
      user,
      highlights,
      loadingFollow,
      onHighlightText,
      loadingHighlights
    } = this.props;
    const author = article.author || {};
    const {
      likes,
      dislikes,
      hasLiked,
      hasDisliked,
      hasBookmarked,
      isGuest,
      rating,
      openDeleteModel,
      follow,
      indexStart,
      indexEnd,
      text
    } = this.state;

    const formData = {
      indexStart,
      indexEnd,
      text
    };

    if (isGuest) {
      return (
        <Redirect to={{ pathname: '/auth/login', state: { from: location } }} />
      );
    }

    return (
      <div className="container">
        {isAuthenticated && user.id === article.authorId ? (
          <div className="article-actions">
            <span onClick={this.onEdit}>
              <i className="fas fa-edit"></i>
            </span>
            <span onClick={this.onOpenDeleteModal}>
              <i className="fas fa-trash-alt"></i>
            </span>
          </div>
        ) : null}
        <Grid container justify="center">
          <Grid item xs={12} sm={8} xl={6}>
            <Paper className="article-container">
              <Alert />
              {loading ? (
                <div className="loader">
                  <CircularProgress color="primary" size={50} />
                </div>
              ) : (
                <Aux>
                  <h1>{article.title}</h1>
                  <div className="avatar-container">
                    <Avatar
                      src={author.image ? author.image.url : null}
                      className="avatar"
                    />
                    <div className="username">
                      <span>
                        {author.firstname} {author.lastname}
                      </span>
                      <span>
                        {moment(article.createdAt).fromNow()} -{' '}
                        {article.readingTime} read
                      </span>
                    </div>
                    {isAuthenticated && user.id !== article.authorId ? (
                      <button
                        type="button"
                        className={`btn-follow ${follow ? 'following' : ''}`}
                        disabled={loadingFollow}
                        onClick={follow ? this.unfollowUser : this.followUser}
                      >
                        {loadingFollow ? (
                          <CircularProgress color="primary" size={20} />
                        ) : follow ? (
                          'Unfollow'
                        ) : (
                          'Follow'
                        )}
                      </button>
                    ) : null}
                  </div>
                  {article.image ? (
                    <div className="image-container">
                      <img src={article.image.url} alt="" />
                    </div>
                  ) : null}
                  {article.tags ? (
                    <div className="tags">
                      {article.tags.map((tag, index) => (
                        <div key={index} className="tag">
                          <span>#</span>
                          <span>{tag}</span>
                        </div>
                      ))}
                    </div>
                  ) : null}
                  <div
                    id="body"
                    className="article-body"
                    onMouseUp={this.onSelectText}
                  >
                    {article.body
                      ? htmlParser(
                          markHighlightedText(article.body, highlights)
                        )
                      : null}
                  </div>
                  <div className="actions">
                    <div className="ratings">
                      <Rating
                        name="article-rating"
                        value={rating}
                        size="medium"
                        onChange={this.onRatingChange}
                        className="rating"
                      />{' '}
                      {this.state.loading ? 'Please wait...' : ''}
                    </div>
                    <div className="votes">
                      <span className={hasLiked ? 'voted' : null}>
                        <i
                          className="fas fa-heart"
                          onClick={this.likeArticle}
                        ></i>{' '}
                        {likes}
                      </span>
                      <span className={hasDisliked ? 'voted' : null}>
                        <i
                          className="fas fa-heart-broken"
                          onClick={this.dislikeArticle}
                        ></i>{' '}
                        {dislikes}
                      </span>
                      <span className={hasBookmarked ? 'voted' : null}>
                        <i
                          className="fas fa-bookmark"
                          onClick={
                            hasBookmarked
                              ? this.unbookmarkArticle
                              : this.bookmarkArticle
                          }
                        ></i>
                      </span>
                    </div>
                    <div className="report">
                      <span>
                        <i className="fas fa-ellipsis-h"></i>
                      </span>
                    </div>
                  </div>
                  <Comments articleId={article.id} location={location} />
                  <CommentPopup
                    articleId={article.id}
                    formData={formData}
                    onHighlightText={onHighlightText}
                    loading={loadingHighlights}
                  />
                  <ActionsPopup onHighlight={this.onHighlight} />
                </Aux>
              )}
            </Paper>
            <Modal open={openDeleteModel} onClose={this.onCloseDeleteModal}>
              <div className="title">
                <h3>Delete Article</h3>
              </div>
              <div className="body">
                Are you sure you want to delete this article?
              </div>
              <div className="actions">
                <Button
                  className="btn btn-light-gray"
                  onClick={this.onCloseDeleteModal}
                >
                  Cancel
                </Button>
                <Button className="btn btn-danger" onClick={this.onDelete}>
                  Delete
                </Button>
              </div>
            </Modal>
          </Grid>
        </Grid>
      </div>
    );
  }
}

ViewArticle.propTypes = {
  onFetchArticle: PropTypes.func,
  onLikeArticle: PropTypes.func,
  onDislikeArticle: PropTypes.func,
  onBookmarkArticle: PropTypes.func,
  onUnbookmarkArticle: PropTypes.func,
  loading: PropTypes.bool,
  article: PropTypes.object,
  match: PropTypes.object,
  voteMessage: PropTypes.string,
  bookmarkMessage: PropTypes.string,
  isAuthenticated: PropTypes.bool,
  location: PropTypes.object,
  onFetchArticleRatings: PropTypes.func,
  user: PropTypes.object,
  ratings: PropTypes.array,
  onRateArticle: PropTypes.func,
  ratingMessage: PropTypes.string,
  onDeleteArticle: PropTypes.func,
  message: PropTypes.string,
  history: PropTypes.object,
  onFetchUserFollowees: PropTypes.func,
  followees: PropTypes.array,
  onFollowUser: PropTypes.func,
  onUnfollowUser: PropTypes.func,
  profileMessage: PropTypes.string,
  loadingFollow: PropTypes.bool,
  onFetchHighlights: PropTypes.func,
  onHighlightText: PropTypes.func,
  loadingHighlights: PropTypes.bool,
  highlights: PropTypes.array
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.token !== null,
  user: state.auth.user,
  loading: state.article.loading,
  article: state.article.articles[0] || {},
  voteMessage: state.vote.message,
  bookmarkMessage: state.bookmark.message,
  ratingMessage: state.rating.message,
  message: state.article.message,
  ratings: state.rating.ratings,
  followees: state.profile.followees,
  profileMessage: state.profile.message,
  loadingFollow: state.profile.loadingFollow,
  loadingHighlights: state.highlight.loading,
  highlights: state.highlight.highlights
});

const mapDispatchToProps = dispatch => ({
  onFetchArticle: articleSlug => dispatch(actions.fetchArticle(articleSlug)),
  onLikeArticle: articleId => dispatch(actions.likeArticle(articleId)),
  onDislikeArticle: articleId => dispatch(actions.dislikeArticle(articleId)),
  onBookmarkArticle: articleId => dispatch(actions.bookmarkArticle(articleId)),
  onUnbookmarkArticle: articleId =>
    dispatch(actions.unbookmarkArticle(articleId)),
  onFetchArticleRatings: articleId =>
    dispatch(actions.fetchArticleRatings(articleId)),
  onRateArticle: (articleId, formData) =>
    dispatch(actions.rateArticle(articleId, formData)),
  onDeleteArticle: articleId => dispatch(actions.deleteArticle(articleId)),
  onFetchUserFollowees: () => dispatch(actions.fetchUserFollowees()),
  onFollowUser: userId => dispatch(actions.followUser(userId)),
  onUnfollowUser: userId => dispatch(actions.unfollowUser(userId)),
  onFetchHighlights: articleId => dispatch(actions.fetchHighlights(articleId)),
  onHighlightText: (articleId, formData) =>
    dispatch(actions.highlightText(articleId, formData))
});

export default connect(mapStateToProps, mapDispatchToProps)(ViewArticle);
