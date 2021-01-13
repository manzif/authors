/* eslint-disable react/no-array-index-key */
import React, { Component } from 'react';
import { Grid, CircularProgress } from '@material-ui/core';
import { Pagination } from '@material-ui/lab';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Article from '../components/HomeArticle';
import Alert from '../components/UI/Alert';
import * as actions from '../store/actions';

class Home extends Component {
  state = {
    page: 1
  };

  componentDidMount() {
    this.props.onFetchArticles(1);
  }

  onReadMore = articleSlug => {
    this.props.history.push(`/articles/${articleSlug}`);
  };

  handlePageChange = (event, value) => {
    this.props.onFetchArticles(value).then(() => {
      this.setState({ page: value });
    });
  };

  render() {
    const { loading, articles, metaData } = this.props;

    return (
      <div className="container home">
        <Alert />
        {loading ? (
          <div className="loader">
            <CircularProgress color="primary" size={50} />
          </div>
        ) : (
          <Grid container justify="center">
            <Grid item xs={12} sm={8} xl={6}>
              {articles.map((article, index) => (
                <Article
                  key={index}
                  article={article}
                  onReadMore={this.onReadMore}
                />
              ))}
              {metaData.totalPages > 1 ? (
                <div className="pages">
                  <Pagination
                    page={this.state.page}
                    count={metaData.totalPages}
                    color="primary"
                    onChange={this.handlePageChange}
                  />
                </div>
              ) : null}
            </Grid>
          </Grid>
        )}
      </div>
    );
  }
}

Home.propTypes = {
  onFetchArticles: PropTypes.func,
  loading: PropTypes.bool,
  articles: PropTypes.array,
  history: PropTypes.object,
  metaData: PropTypes.object
};

const mapStateToProps = state => ({
  loading: state.article.loading,
  articles: state.article.articles,
  metaData: state.article.metaData
});

const mapDispatchToProps = dispatch => ({
  onFetchArticles: pageNumber => dispatch(actions.fetchArticles(pageNumber))
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
