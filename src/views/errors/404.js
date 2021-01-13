import React from 'react';
import PropTypes from 'prop-types';
import notFound from '../../assets/img/404.svg';

const PageNotFound = props => {
  const onGoback = () => {
    props.history.goBack();
  };

  return (
    <div className="container">
      <div className="not-found">
        <div>
          <img src={notFound} alt="" />
        </div>
        <p>
          The page you are looking for, is not available!{' '}
          <span onClick={onGoback}>Go back</span>
        </p>
      </div>
    </div>
  );
};

PageNotFound.propTypes = {
  history: PropTypes.object
};

export default PageNotFound;
