import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import Button from '../../UI/Button';

class Header extends Component {
  state = {
    search: ''
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  onSearch = () => {
    const { history } = this.props;
    if (this.state.search) {
      history.push(`/search?query=${this.state.search}`);
    }
  };

  render() {
    return (
      <header className="header">
        <div className="social-media">
          <div className="icon instagram-icon">
            <a
              href="https://www.instagram.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fab fa-instagram"></i>
            </a>
          </div>
          <div className="icon twitter-icon">
            <a
              href="https://www.twitter.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fab fa-twitter"></i>
            </a>
          </div>
          <div className="icon">
            <a
              href="https://www.facebook.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fab fa-facebook"></i>
            </a>
          </div>
        </div>
        <div className="search">
          <div>
            <input
              className="input-field"
              type="text"
              placeholder="Search..."
              name="search"
              onChange={this.onChange}
              value={this.state.search}
            />
          </div>
          <div>
            <Button className="btn btn-secondary" onClick={this.onSearch}>
              <i className="fa fa-search"></i>
              Search
            </Button>
          </div>
        </div>
      </header>
    );
  }
}

Header.propTypes = {
  history: PropTypes.object
};

export default withRouter(Header);
