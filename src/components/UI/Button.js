/* eslint-disable react/button-has-type */
import React from 'react';
import PropTypes from 'prop-types';

const Button = (props) => (
  <button
    disabled={props.disabled}
    className={props.className}
    onClick={props.onClick}
  >
    {props.children}
  </button>
);

Button.propTypes = {
  disabled: PropTypes.bool,
  className: PropTypes.string,
  onClick: PropTypes.func,
  children: PropTypes.node.isRequired,
};

export default Button;
