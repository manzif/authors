import React, { Component } from 'react';
import { Avatar, CircularProgress } from '@material-ui/core';
import PropTypes from 'prop-types';
import ReactReadMoreReadLess from 'react-read-more-read-less';

class Follower extends Component {
  state = {
    loading: false
  };

  unfollowUser = async () => {
    this.setState({ loading: true });
    const { onUnfollowUser } = this.props;
    await onUnfollowUser();
  };

  render() {
    const { followee } = this.props;

    return (
      <div className="follower">
        <Avatar
          src={followee.image ? followee.image.url : ''}
          className="avatar"
        />
        <div className="follower-details">
          <p className="name">
            {followee.firstname} {followee.lastname}
          </p>
          <div className="follower-bio">
            {followee.bio ? (
              <ReactReadMoreReadLess
                readMoreClassName="read-more-content"
                readLessClassName="read-more-content"
                charLimit={150}
                readMoreText="Show more"
                readLessText="Show less"
              >
                {followee.bio}
              </ReactReadMoreReadLess>
            ) : (
              ''
            )}
          </div>
        </div>
        <div className="action">
          <button
            type="button"
            className="btn-follow following"
            disabled={this.state.loading}
            onClick={this.unfollowUser}
          >
            {this.state.loading ? (
              <CircularProgress color="primary" size={20} />
            ) : (
              'Unfollow'
            )}
          </button>
        </div>
      </div>
    );
  }
}

Follower.propTypes = {
  followee: PropTypes.object,
  onUnfollowUser: PropTypes.func
};

export default Follower;
