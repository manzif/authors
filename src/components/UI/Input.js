import React from 'react';
import { TextField } from '@material-ui/core';
import PropTypes from 'prop-types';

export const Input = props => {
  let inputElement = null;

  switch (props.elementType) {
    case 'TextField':
      inputElement = (
        <TextField
          {...props.elementConfig}
          value={props.value}
          onChange={props.onChange}
          error={!props.valid && props.touched}
          helperText={props.helperText}
          className="input-field"
        />
      );
      break;

    default:
      break;
  }

  return inputElement;
};

Input.propTypes = {
  elementType: PropTypes.string.isRequired,
  elementConfig: PropTypes.object.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  helperText: PropTypes.string,
  error: PropTypes.bool
};

export default Input;
