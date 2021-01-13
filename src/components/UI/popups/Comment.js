import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { CircularProgress } from '@material-ui/core';
import Input from '../Input';
import Button from '../Button';
import validate from '../../../utils/validation';

class Comment extends Component {
  state = {
    form: {
      comment: {
        elementType: 'TextField',
        elementConfig: {
          type: 'text',
          name: 'comment',
          label: 'Comment',
          variant: 'outlined',
          size: 'small',
          fullWidth: true,
          multiline: true,
          rows: 5
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        helperText: ''
      }
    },
    formIsValid: false
  };

  inputChangeHandler = (event, inputName) => {
    const updatedForm = {
      ...this.state.form,
      [inputName]: {
        ...this.state.form[inputName],
        value: event.target.value,
        valid: validate(
          event.target.value,
          this.state.form[inputName].validation
        ).isValid,
        touched: true,
        helperText: validate(
          event.target.value,
          this.state.form[inputName].validation
        ).message
      }
    };
    let formIsValid = true;
    for (const inputIdentifier in updatedForm) {
      formIsValid = updatedForm[inputIdentifier].valid && formIsValid;
    }
    this.setState({ form: updatedForm, formIsValid });
  };

  onFormSubmitHandler = async event => {
    event.preventDefault();
    const { formData, articleId, onHighlightText } = this.props;
    const data = formData;
    data.comment = this.state.form.comment.value;
    await onHighlightText(articleId, data);
    const comment = document.getElementById('comments-popup');
    comment.classList.add('hide');
  };

  render() {
    const formElementsArray = [];
    for (const key in this.state.form) {
      formElementsArray.push({
        id: key,
        config: this.state.form[key]
      });
    }

    const form = formElementsArray.map(formElement => (
      <Input
        key={formElement.id}
        elementType={formElement.config.elementType}
        elementConfig={formElement.config.elementConfig}
        value={formElement.config.value}
        onChange={event => this.inputChangeHandler(event, formElement.id)}
        valid={formElement.config.valid}
        touched={formElement.config.touched}
        helperText={formElement.config.helperText}
      />
    ));

    const { formIsValid } = this.state;
    const { loading } = this.props;

    return (
      <div id="comments-popup" className="comment-popup hide">
        <h3 className="title">Add Comment</h3>
        <form onSubmit={this.onFormSubmitHandler}>
          {form}
          <Button
            className="btn btn-primary"
            disabled={!formIsValid || loading}
          >
            {loading ? <CircularProgress color="primary" size={23} /> : 'Save'}
          </Button>
        </form>
      </div>
    );
  }
}

Comment.propTypes = {
  formData: PropTypes.object,
  articleId: PropTypes.number,
  loading: PropTypes.bool,
  onHighlightText: PropTypes.func
};

export default Comment;
