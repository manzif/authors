import React, { Component } from 'react';
import {
  Grid,
  Card,
  CardContent,
  Button,
  CircularProgress
} from '@material-ui/core';
import ReactFileReader from 'react-file-reader';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Input from '../../components/UI/Input';
import validate from '../../utils/validation';
import Alert from '../../components/UI/Alert';
import * as actions from '../../store/actions';
import profileImg from '../../assets/img/man.png';
import ImageCrop from '../../components/UI/ImageCrop';

class EditProfile extends Component {
  state = {
    form: {
      firstname: {
        elementType: 'TextField',
        elementConfig: {
          type: 'text',
          name: 'firstname',
          label: 'Firstname',
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
      },
      lastname: {
        elementType: 'TextField',
        elementConfig: {
          type: 'text',
          name: 'lastname',
          label: 'Lastname',
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
      },
      bio: {
        elementType: 'TextField',
        elementConfig: {
          type: 'text',
          name: 'bio',
          label: 'Bio',
          variant: 'outlined',
          size: 'small',
          fullWidth: true,
          multiline: true,
          rows: 5
        },
        value: '',
        validation: {},
        valid: true,
        touched: false,
        helperText: ''
      }
    },
    formIsValid: false,
    loading: false,
    fileImg: {},
    image: '',
    croppedImage: '',
    croppedFile: '',
    scaleValue: 1,
    imageEditor: null,
    openEditor: false
  };

  componentDidMount() {
    this.setState({ loading: true });
    const { onFetchUserProfile } = this.props;
    onFetchUserProfile().then(() => {
      const updatedForm = { ...this.state.form };
      const { user } = this.props;
      updatedForm.firstname.value = user.firstname;
      updatedForm.firstname.valid = true;
      updatedForm.lastname.value = user.lastname;
      updatedForm.lastname.valid = true;
      updatedForm.bio.value = user.bio ? user.bio : '';
      this.setState({
        form: updatedForm,
        image: user.image ? user.image : '',
        formIsValid: true,
        loading: false
      });
    });
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.message === 'User profile successfully updated') {
      this.props.history.push('/profile/me');
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
    let formIsValid = true;
    for (const inputIdentifier in updatedForm) {
      formIsValid = updatedForm[inputIdentifier].valid && formIsValid;
    }
    this.setState({ form: updatedForm, formIsValid });
  };

  handleFiles = files => {
    const data = files ? files.fileList[0] : '';
    this.setState({ fileImg: data, openEditor: true });
  };

  handleClose = () => {
    this.setState({ openEditor: false });
  };

  setEditorRef = imageEditor => this.setState({ imageEditor });

  onCrop = () => {
    const { imageEditor } = this.state;
    if (imageEditor !== null) {
      const url = imageEditor.getImageScaledToCanvas().toDataURL();
      this.setState({ croppedImage: url, openEditor: false });
      fetch(url)
        .then(res => res.blob())
        .then(blob => this.setState({ croppedFile: blob }));
    }
  };

  onScaleChange = (event, newValue) => {
    this.setState({ scaleValue: newValue });
  };

  formSubmitHandler = async () => {
    const { onUpdateUserProfile, onSetAlert } = this.props;
    if (!this.state.formIsValid) {
      onSetAlert('Please fill all the required fields.', 'error');
      return;
    }
    const formData = {
      firstname: this.state.form.firstname.value,
      lastname: this.state.form.lastname.value,
      bio: this.state.form.bio.value,
      image: this.state.croppedFile
    };
    onUpdateUserProfile(formData);
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

    const { image, fileImg, scaleValue, openEditor, croppedImage } = this.state;
    const img = image === '' ? profileImg : image.url;
    const { loading } = this.props;

    return (
      <div className="container">
        <Grid container justify="center">
          <Grid item xs={12} sm={8} xl={6}>
            <Card className="edit-profile-card">
              <CardContent>
                <h2>Edit Profile</h2>
                <Alert />
                {this.state.loading ? (
                  <div className="loader">
                    <CircularProgress color="primary" size={50} />
                  </div>
                ) : (
                  <form>
                    <Grid container spacing={5}>
                      <Grid item xs={12} md={9}>
                        {form}
                      </Grid>
                      <Grid item xs={12} md={3}>
                        <div className="image-container">
                          <img
                            src={!croppedImage ? img : croppedImage}
                            alt=""
                          />
                          <ReactFileReader
                            handleFiles={this.handleFiles}
                            base64
                          >
                            <button type="button">
                              <i className="fas fa-edit"></i>Edit
                            </button>
                          </ReactFileReader>
                        </div>
                        <ImageCrop
                          open={openEditor}
                          handleClose={this.handleClose}
                          imageSrc={fileImg}
                          setEditorRef={this.setEditorRef}
                          onCrop={this.onCrop}
                          scaleValue={scaleValue}
                          onScaleChange={this.onScaleChange}
                        />
                      </Grid>
                    </Grid>
                    <Button
                      variant="contained"
                      color="primary"
                      className="form-btn"
                      onClick={this.formSubmitHandler}
                      disabled={loading}
                    >
                      {loading ? (
                        <CircularProgress color="primary" size={23} />
                      ) : (
                        'Save Changes'
                      )}
                    </Button>
                  </form>
                )}
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </div>
    );
  }
}

EditProfile.propTypes = {
  onFetchUserProfile: PropTypes.func,
  onUpdateUserProfile: PropTypes.func,
  onSetAlert: PropTypes.func,
  loading: PropTypes.bool,
  user: PropTypes.object,
  history: PropTypes.object,
  message: PropTypes.string
};

const mapStateToProps = state => ({
  loading: state.profile.loading,
  user: state.profile.user,
  message: state.profile.message
});

const mapDispatchToProps = dispatch => ({
  onFetchUserProfile: () => dispatch(actions.fetchUserProfile()),
  onUpdateUserProfile: formData =>
    dispatch(actions.updateUserProfile(formData)),
  onSetAlert: (message, alertType) =>
    dispatch(actions.setAlert(message, alertType))
});

export default connect(mapStateToProps, mapDispatchToProps)(EditProfile);
