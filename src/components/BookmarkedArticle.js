/* eslint-disable react/jsx-wrap-multilines */
import React, { Component } from 'react';
import {
  Card,
  CardHeader,
  CardMedia,
  CardActionArea,
  CardContent,
  Typography,
  Avatar
} from '@material-ui/core';
import stringParser from 'react-to-string';
import htmlParser from 'html-react-parser';
import PropTypes from 'prop-types';
import moment from 'moment';
import articleDefaultImg from '../assets/img/article.svg';

class BookmarkedArticle extends Component {
  onView = () => {
    const { history, article } = this.props;
    history.push(`/articles/${article.slug}`);
  };

  render() {
    const { article } = this.props;
    const { author } = article;
    const body = stringParser(htmlParser(article.body));

    return (
      <Card className="bookmarked-article-card" onClick={this.onView}>
        <CardActionArea>
          <CardHeader
            avatar={
              <Avatar
                aria-label="recipe"
                src={author.image ? author.image.url : ''}
                className="avatar"
              />
            }
            title={`${author.firstname} ${author.lastname}`}
            subheader={moment(article.createdAt).fromNow()}
          />
          <CardMedia
            className="media"
            image={article.image ? article.image.url : articleDefaultImg}
            title="Paella dish"
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

BookmarkedArticle.propTypes = {
  article: PropTypes.object,
  history: PropTypes.object
};

export default BookmarkedArticle;
