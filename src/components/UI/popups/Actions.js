import React from 'react';
import PropTypes from 'prop-types';

const Actions = ({ onHighlight }) => {
  return (
    <div id="actions-popup" className="actions-popup hide">
      <button type="button" onClick={onHighlight}>
        <i className="fas fa-highlighter"></i>
      </button>
      <button type="button">
        <i className="fab fa-twitter"></i>
      </button>
      <button type="button">
        <i className="fab fa-facebook"></i>
      </button>
    </div>
  );
};

Actions.propTypes = {
  onHighlight: PropTypes.func
};

export default Actions;
