/* eslint-disable react/jsx-wrap-multilines */
import React, { Component } from 'react';
import {
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography
} from '@material-ui/core';
import stringParser from 'react-to-string';
import htmlParser from 'html-react-parser';
import PropTypes from 'prop-types';
import defaultArticleImg from '../assets/img/article.svg';

class Article extends Component {
  onView = () => {
    const { history, article } = this.props;
    history.push(`/articles/${article.slug}`);
  };

  render() {
    const { article } = this.props;
    const body = stringParser(htmlParser(article.body));
    return (
      <Card className="article-card" onClick={this.onView}>
        <CardActionArea>
          <CardMedia
            className="media"
            image={article.image ? article.image.url : defaultArticleImg}
            title="Contemplative Reptile"
          />
          <CardContent>
            <Typography
              gutterBottom
              variant="h5"
              component="h3"
              className="title"
            >
              {article.title}
            </Typography>
            <Typography
              variant="body2"
              color="textSecondary"
              component="p"
              className="body"
            >
              {body.length > 200 ? `${body.substring(0, 210)}...` : body}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    );
  }
}

Article.propTypes = {
  article: PropTypes.object,
  history: PropTypes.object
};

export default Article;
