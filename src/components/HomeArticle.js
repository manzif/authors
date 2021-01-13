/* eslint-disable react/jsx-wrap-multilines */
import React from 'react';
import PropTypes from 'prop-types';
import { Avatar } from '@material-ui/core';
import stringParser from 'react-to-string';
import htmlParser from 'html-react-parser';
import moment from 'moment';
import articleDefaultImg from '../assets/img/article.svg';
import Button from './UI/Button';

const HomeArticle = ({ article, onReadMore }) => {
  const { author } = article;
  const body = stringParser(htmlParser(article.body));

  return (
    <div className="article-card">
      <div className="article-img">
        <img
          src={article.image ? article.image.url : articleDefaultImg}
          alt=""
        />
      </div>
      <div className="article-info">
        <div className="info-header">
          <Avatar
            src={author.image ? author.image.url : null}
            className="avatar"
          />
          <div className="username">
            <span>{`${author.firstname} ${author.lastname}`}</span>
            <span>{moment(article.createdAt).fromNow()}</span>
          </div>
        </div>
        <h3 className="article-title">{article.title}</h3>
        <p className="article-body">
          {body.length > 200 ? `${body.substring(0, 210)}...` : body}
        </p>
        <Button
          className="btn btn-secondary"
          onClick={() => onReadMore(article.slug)}
        >
          Read More
        </Button>
      </div>
    </div>
  );
};

HomeArticle.propTypes = {
  article: PropTypes.object,
  onReadMore: PropTypes.func
};

export default HomeArticle;
