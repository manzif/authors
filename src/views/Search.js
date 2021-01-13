import React, { Component } from 'react';
import { Grid, CircularProgress } from '@material-ui/core';
import QueryString from 'query-string';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Article from '../components/HomeArticle';
import * as actions from '../store/actions';
import noData from '../assets/img/no_data.svg';

class Search extends Component {
  componentDidMount() {
    const { location, onSearch } = this.props;
    const search = QueryString.parse(location.search);
    onSearch(search.query);
  }

  componentDidUpdate(prevProps) {
    const { location, onSearch } = this.props;
    const prevSearch = QueryString.parse(prevProps.location.search);
    const currentSearch = QueryString.parse(location.search);
    if (prevSearch.query !== currentSearch.query) {
      onSearch(currentSearch.query);
    }
  }

  onReadMore = articleSlug => {
    this.props.history.push(`/articles/${articleSlug}`);
  };

  render() {
    const { loading, articles } = this.props;
    return (
      <div className="container home search">
        {loading ? (
          <div className="loader">
            <CircularProgress color="primary" size={50} />
          </div>
        ) : (
          <Grid container justify="center">
            <Grid item xs={12} sm={8} xl={6}>
              <h3 className="results-title">
                Search Results <span>({articles.length})</span>
              </h3>
              {articles.length > 0 ? (
                articles.map(article => (
                  <Article
                    key={article.id}
                    article={article}
                    onReadMore={this.onReadMore}
                  />
                ))
              ) : (
                <div className="no-content">
                  <div>
                    <img src={noData} alt="" />
                  </div>
                  <p>Sorry, no article found!</p>
                </div>
              )}
            </Grid>
          </Grid>
        )}
      </div>
    );
  }
}

Search.propTypes = {
  location: PropTypes.object,
  loading: PropTypes.bool,
  articles: PropTypes.array,
  onSearch: PropTypes.func,
  history: PropTypes.object
};

const mapStateToProps = state => ({
  loading: state.search.loading,
  articles: state.search.articles
});

const mapDispatchToProps = dispatch => ({
  onSearch: query => dispatch(actions.search(query))
});

export default connect(mapStateToProps, mapDispatchToProps)(Search);
