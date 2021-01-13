/* eslint-disable no-param-reassign */
import React, { Component } from 'react';
import {
  Grid,
  Card,
  CardContent,
  Button,
  CircularProgress
} from '@material-ui/core';
import ReactFileReader from 'react-file-reader';
import { Editor } from '@tinymce/tinymce-react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Alert from '../../components/UI/Alert';
import Input from '../../components/UI/Input';
import Tags from '../../components/Tags';
import validate from '../../utils/validation';
import { tinymce_variables } from '../../utils/constants';
import * as actions from '../../store/actions';

class NewArticle extends Component {
  state = {
    form: {
      title: {
        elementType: 'TextField',
        elementConfig: {
          type: 'text',
          name: 'title',
          label: 'Title',
          variant: 'outlined',
          size: 'small',
          fullWidth: true
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
    body: '',
    fileImg: '',
    image: '',
    tags: []
  };

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.message === 'Article successfully created') {
      this.props.history.push(`/articles/${nextProps.article.slug}`);
    }
  }

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
    this.setState({ form: updatedForm });
  };

  handleEditorChange = content => {
    this.setState({ body: content });
  };

  handleFiles = files => {
    const data = files ? files.fileList[0] : '';
    this.setState({ image: files || '', fileImg: data });
  };

  addTag = event => {
    const tags = [...this.state.tags];
    const tag = event.target.value;
    if (event.key === 'Enter' && tag !== '' && !tags.includes(tag)) {
      this.setState({ tags: [...tags, tag] });
      event.target.value = '';
    }
  };

  removeTag = indexToRemove => {
    this.setState({
      tags: this.state.tags.filter((_, index) => index !== indexToRemove)
    });
  };

  formSubmitHandler = async () => {
    const { onCreateArticle, onSetAlert } = this.props;
    const { form, body, fileImg, tags } = this.state;
    if (form.title.value === '' || body === '') {
      onSetAlert('Please fill all the required fields.', 'error');
      return;
    }
    const formData = {
      title: form.title.value,
      body,
      image: fileImg,
      tags: tags.toString()
    };
    onCreateArticle(formData);
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

    const { loading } = this.props;

    return (
      <div className="container">
        <Grid container justify="center">
          <Grid item xs={12} sm={8} xl={6}>
            <Card className="new-article-card">
              <CardContent>
                <h2>Create New Article</h2>
                <Alert />
                <form>
                  <ReactFileReader handleFiles={this.handleFiles} base64>
                    <button type="button" className="btn btn-secondary">
                      <i className="fas fa-camera"></i>Add Image
                    </button>
                  </ReactFileReader>
                  {this.state.fileImg ? (
                    <div className="image-container">
                      <img src={this.state.image.base64} alt="" />
                    </div>
                  ) : null}
                  {form}
                  <Editor
                    apiKey={process.env.REACT_APP_TINYMCE_API_KEY}
                    init={{
                      height: 500,
                      menubar: true,
                      plugins: tinymce_variables.plugins,
                      toolbar: tinymce_variables.toolbar,
                      codesample_languages:
                        tinymce_variables.codesample_languages
                    }}
                    onEditorChange={this.handleEditorChange}
                    value={this.state.body}
                  />
                  <Tags
                    tags={this.state.tags}
                    addTag={this.addTag}
                    removeTag={this.removeTag}
                  />
                  <Button
                    variant="contained"
                    color="primary"
                    className="form-btn"
                    fullWidth
                    onClick={this.formSubmitHandler}
                    disabled={loading}
                  >
                    {loading ? (
                      <CircularProgress color="primary" size={23} />
                    ) : (
                      'Create Article'
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </div>
    );
  }
}

NewArticle.propTypes = {
  onCreateArticle: PropTypes.func,
  onSetAlert: PropTypes.func,
  loading: PropTypes.bool,
  history: PropTypes.object,
  message: PropTypes.string,
  article: PropTypes.object
};

const mapStateToProps = state => ({
  loading: state.article.loading,
  message: state.article.message,
  article: state.article.articles[0]
});

const mapDispatchToProps = dispatch => ({
  onSetAlert: (message, alertType) =>
    dispatch(actions.setAlert(message, alertType)),
  onCreateArticle: articleData => dispatch(actions.createArticle(articleData))
});

export default connect(mapStateToProps, mapDispatchToProps)(NewArticle);
