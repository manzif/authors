/* eslint-disable react/jsx-curly-newline */
/* eslint-disable no-nested-ternary */
/* eslint-disable react/jsx-wrap-multilines */
import React, { Component } from 'react';
import {
  Grid,
  Card,
  CardContent,
  Button,
  AppBar,
  Tabs,
  Tab,
  Paper,
  CircularProgress
} from '@material-ui/core';
import ReactReadMoreReadLess from 'react-read-more-read-less';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import TabPanel from '../../components/UI/TabPanel';
import Alert from '../../components/UI/Alert';
import Article from '../../components/Article';
import Follower from '../../components/Follower';
import Followee from '../../components/Followee';
import BookmarkedArticle from '../../components/BookmarkedArticle';
import profileImg from '../../assets/img/man.png';
import noData from '../../assets/img/no_data.svg';
import * as actions from '../../store/actions';

class ViewProfile extends Component {
  state = {
    tabValue: 0,
    loadUnfollow: false
  };

  componentDidMount() {
    const {
      onFetchUserProfile,
      onFetchUserArticles,
      onFetchUserFollowers,
      onFetchUserFollowees,
      onFetchUserBookmarks
    } = this.props;
    onFetchUserProfile().then(async () => {
      await onFetchUserArticles();
      await onFetchUserFollowers();
      await onFetchUserFollowees();
      await onFetchUserBookmarks();
    });
  }

  handleTabChange = async (event, newValue) => {
    this.setState({ tabValue: newValue });
  };

  a11yProps = index => {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`
    };
  };

  onEditProfile = () => {
    this.props.history.push('/profile/me/edit');
  };

  followUser = async (followerId, follower) => {
    this.setState({ loadUnfollow: true });
    const { onFollowUser, followees } = this.props;
    await onFollowUser(followerId);
    if (this.props.profileMessage === 'User successfully followed') {
      const followee = {
        followeeId: followerId,
        followee: follower
      };
      if (!followees.includes(followee)) {
        followees.push(followee);
      }
      this.setState({ loadUnfollow: false });
    }
  };

  unfollowUser = async followeeId => {
    this.setState({ loadUnfollow: true });
    const { onUnfollowUser, followees } = this.props;
    await onUnfollowUser(followeeId);
    if (this.props.profileMessage === 'User successfully unfollowed') {
      const index = followees.findIndex(
        followee => followee.followeeId === followeeId
      );
      followees.splice(index, 1);
      this.setState({ loadUnfollow: false });
    }
  };

  render() {
    const {
      loadingProfile,
      loadingArticles,
      loadingFollowers,
      loadingFollowees,
      loadingBookmarks,
      user,
      articles,
      followers,
      followees,
      bookmarks,
      history,
      profileMessage
    } = this.props;

    const { loadUnfollow } = this.state;

    let profile = (
      <div className="loader">
        <CircularProgress color="primary" size={50} />
      </div>
    );

    if (!loadingProfile) {
      profile = (
        <Grid container spacing={4}>
          <Grid item xs={12} md={3} xl={3}>
            <div className="image-container">
              <img src={user.image ? user.image.url : profileImg} alt="" />
            </div>
            <div className="details">
              <p>
                <i className="fas fa-user"></i>
                <span>
                  {user.firstname} {user.lastname}
                </span>
              </p>
              <p>
                <i className="fas fa-envelope"></i>
                <span>{user.email}</span>
              </p>
              <div className="bio">
                <h2>Bio</h2>
                {user.bio ? (
                  <ReactReadMoreReadLess
                    readMoreClassName="read-more-content"
                    readLessClassName="read-more-content"
                    charLimit={100}
                    readMoreText="Show more"
                    readLessText="Show less"
                  >
                    {user.bio}
                  </ReactReadMoreReadLess>
                ) : (
                  <div className="no-bio">No bio added yet</div>
                )}
              </div>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={this.onEditProfile}
              >
                Edit Profile
              </Button>
            </div>
          </Grid>
          <Grid item xs={12} md={9} xl={9}>
            <AppBar position="static" color="default">
              <Tabs
                value={this.state.tabValue}
                textColor="primary"
                indicatorColor="primary"
                onChange={this.handleTabChange}
                scrollButtons="auto"
                variant="scrollable"
              >
                <Tab
                  label={
                    <div className="tabLabelContainer">
                      <span>Articles</span>
                      <span>{articles.length}</span>
                    </div>
                  }
                  {...this.a11yProps(0)}
                />
                <Tab
                  label={
                    <div className="tabLabelContainer">
                      <span>Followers</span>
                      <span>{followers.length}</span>
                    </div>
                  }
                  {...this.a11yProps(1)}
                />
                <Tab
                  label={
                    <div className="tabLabelContainer">
                      <span>Following</span>
                      <span>{followees.length}</span>
                    </div>
                  }
                  {...this.a11yProps(2)}
                />
                <Tab
                  label={
                    <div className="tabLabelContainer">
                      <span>Bookmarks</span>
                      <span>{bookmarks.length}</span>
                    </div>
                  }
                  {...this.a11yProps(2)}
                />
              </Tabs>
            </AppBar>
            <Paper>
              <TabPanel value={this.state.tabValue} index={0}>
                <Grid container spacing={4}>
                  {loadingArticles ? (
                    <Grid item xs={12}>
                      <div className="loader">
                        <CircularProgress color="primary" size={50} />
                      </div>
                    </Grid>
                  ) : articles.length > 0 ? (
                    articles.map(article => (
                      <Grid key={article.id} item xs={12} sm={6}>
                        <Article article={article} history={history} />
                      </Grid>
                    ))
                  ) : (
                    <div className="no-content">
                      <div>
                        <img src={noData} alt="" />
                      </div>
                      <p>
                        Sorry, currently you haven&apos;t posted any article!
                      </p>
                    </div>
                  )}
                </Grid>
              </TabPanel>
              <TabPanel value={this.state.tabValue} index={1}>
                {loadingFollowers ? (
                  <Grid item xs={12}>
                    <div className="loader">
                      <CircularProgress color="primary" size={50} />
                    </div>
                  </Grid>
                ) : followers.length > 0 ? (
                  followers.map(follower => (
                    <Grid key={follower.followerId} item xs={12}>
                      <Follower
                        follower={follower.follower}
                        followerId={follower.followerId}
                        followees={followees}
                        onFollowUser={() =>
                          this.followUser(
                            follower.followerId,
                            follower.follower
                          )
                        }
                        onUnfollowUser={() =>
                          this.unfollowUser(follower.followerId, follower)
                        }
                        profileMessage={profileMessage}
                      />
                    </Grid>
                  ))
                ) : (
                  <div className="no-content">
                    <div>
                      <img src={noData} alt="" />
                    </div>
                    <p>Sorry, currently you don&apos;t have any follower!</p>
                  </div>
                )}
              </TabPanel>
              <TabPanel value={this.state.tabValue} index={2}>
                {loadingFollowees ? (
                  <Grid item xs={12}>
                    <div className="loader">
                      <CircularProgress color="primary" size={50} />
                    </div>
                  </Grid>
                ) : followees.length > 0 ? (
                  followees.map(followee => (
                    <Grid key={followee.followeeId} item xs={12}>
                      <Followee
                        followee={followee.followee}
                        onUnfollowUser={() =>
                          this.unfollowUser(followee.followeeId)
                        }
                        loading={loadUnfollow}
                      />
                    </Grid>
                  ))
                ) : (
                  <div className="no-content">
                    <div>
                      <img src={noData} alt="" />
                    </div>
                    <p>
                      Sorry, currently you don&apos;t have anyone you follow!
                    </p>
                  </div>
                )}
              </TabPanel>
              <TabPanel value={this.state.tabValue} index={3}>
                <Grid container spacing={4}>
                  {loadingBookmarks ? (
                    <Grid item xs={12}>
                      <div className="loader">
                        <CircularProgress color="primary" size={50} />
                      </div>
                    </Grid>
                  ) : bookmarks.length > 0 ? (
                    bookmarks.map(bookmark => (
                      <Grid key={bookmark.id} item xs={12} sm={6}>
                        <BookmarkedArticle
                          article={bookmark.article}
                          history={history}
                        />
                      </Grid>
                    ))
                  ) : (
                    <div className="no-content">
                      <div>
                        <img src={noData} alt="" />
                      </div>
                      <p>
                        Sorry, currently you haven&apos;t bookmarked any
                        article!
                      </p>
                    </div>
                  )}
                </Grid>
              </TabPanel>
            </Paper>
          </Grid>
        </Grid>
      );
    }

    return (
      <div className="container">
        <Grid container justify="center">
          <Grid item xs={12} xl={10}>
            <Card>
              <CardContent className="profile-card">
                <Alert />
                {profile}
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </div>
    );
  }
}

ViewProfile.propTypes = {
  onFetchUserProfile: PropTypes.func,
  onFetchUserArticles: PropTypes.func,
  onFetchUserFollowers: PropTypes.func,
  onFetchUserFollowees: PropTypes.func,
  loadingProfile: PropTypes.bool,
  loadingArticles: PropTypes.bool,
  loadingFollowers: PropTypes.bool,
  loadingFollowees: PropTypes.bool,
  loadingBookmarks: PropTypes.bool,
  user: PropTypes.object,
  history: PropTypes.object,
  articles: PropTypes.array,
  followers: PropTypes.array,
  followees: PropTypes.array,
  bookmarks: PropTypes.array,
  onFollowUser: PropTypes.func,
  onUnfollowUser: PropTypes.func,
  profileMessage: PropTypes.string,
  loadingFollow: PropTypes.bool,
  onFetchUserBookmarks: PropTypes.func
};

const mapStateToProps = state => ({
  loadingProfile: state.profile.loadingProfile,
  loadingArticles: state.profile.loadingArticles,
  loadingFollowers: state.profile.loadingFollowers,
  loadingFollowees: state.profile.loadingFollowees,
  loadingBookmarks: state.profile.loadingBookmarks,
  user: state.profile.user,
  articles: state.profile.articles,
  followers: state.profile.followers,
  followees: state.profile.followees,
  bookmarks: state.profile.bookmarks,
  profileMessage: state.profile.message,
  loadingFollow: state.profile.loadingFollow
});

const mapDispatchToProps = dispatch => ({
  onFetchUserProfile: () => dispatch(actions.fetchUserProfile()),
  onFetchUserArticles: () => dispatch(actions.fetchUserArticles()),
  onFetchUserFollowers: () => dispatch(actions.fetchUserFollowers()),
  onFetchUserFollowees: () => dispatch(actions.fetchUserFollowees()),
  onFollowUser: userId => dispatch(actions.followUser(userId)),
  onUnfollowUser: userId => dispatch(actions.unfollowUser(userId)),
  onFetchUserBookmarks: () => dispatch(actions.fetchUserBookmarks())
});

export default connect(mapStateToProps, mapDispatchToProps)(ViewProfile);
