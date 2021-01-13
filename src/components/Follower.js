/* eslint-disable no-nested-ternary */
import React, { Component } from 'react';
import { Avatar, CircularProgress } from '@material-ui/core';
import PropTypes from 'prop-types';
import ReactReadMoreReadLess from 'react-read-more-read-less';

class Follower extends Component {
  state = {
    follow: false,
    loading: false
  };

  componentDidMount() {
    const { followees, followerId } = this.props;
    for (const followee of followees) {
      if (followee.followeeId === followerId) {
        this.setState({ follow: true });
      }
    }
  }

  followUser = async () => {
    this.setState({ loading: true });
    const { onFollowUser } = this.props;
    await onFollowUser();
    this.setState({ loading: false, follow: true });
  };

  unfollowUser = async () => {
    this.setState({ loading: true });
    const { onUnfollowUser } = this.props;
    await onUnfollowUser();
    this.setState({ loading: false, follow: false });
  };

  render() {
    const { follower } = this.props;
    const { follow, loading } = this.state;

    return (
      <div className="follower">
        <Avatar
          src={follower.image ? follower.image.url : ''}
          className="avatar"
        />
        <div className="follower-details">
          <p className="name">
            {follower.firstname} {follower.lastname}
          </p>
          <div className="follower-bio">
            {follower.bio ? (
              <ReactReadMoreReadLess
                readMoreClassName="read-more-content"
                readLessClassName="read-more-content"
                charLimit={150}
                readMoreText="Show more"
                readLessText="Show less"
              >
                {follower.bio}
              </ReactReadMoreReadLess>
            ) : (
              ''
            )}
          </div>
        </div>
        <div className="action">
          <button
            type="button"
            className={`btn-follow ${follow ? 'following' : ''}`}
            disabled={loading}
            onClick={follow ? this.unfollowUser : this.followUser}
          >
            {loading ? (
              <CircularProgress color="primary" size={20} />
            ) : follow ? (
              'Unfollow'
            ) : (
              'Follow'
            )}
          </button>
        </div>
      </div>
    );
  }
}

Follower.propTypes = {
  follower: PropTypes.object,
  followerId: PropTypes.number,
  followees: PropTypes.array,
  onFollowUser: PropTypes.func,
  onUnfollowUser: PropTypes.func
};

export default Follower;
