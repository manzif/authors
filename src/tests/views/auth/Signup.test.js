import React from 'react';
import { shallow } from 'enzyme';
import { Grid, Button } from '@material-ui/core';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import GoogleLogin from 'react-google-login';
import ConnectedSignup, { Signup } from '../../../views/auth/Signup';
import { mockStore } from '../../store';

let props = {
  onSignup: jest.fn(),
  onSetAlert: jest.fn()
};

describe('<Signup /> component', () => {
  const component = shallow(<Signup {...props} />);
  let wrapper;
  let store;

  beforeAll(() => {
    const initialState = {
      auth: {
        loading: false
      }
    };
    store = mockStore(initialState);
    wrapper = shallow(<ConnectedSignup store={store} />).dive();
  });

  it('should render without crashing', () => {
    expect(component).toMatchSnapshot();
  });

  it('should call responseFacebook method when the facebook button is clicked', () => {
    const responseFacebook = jest.spyOn(
      component.instance(),
      'responseFacebook'
    );
    component.instance().forceUpdate();

    const button = component
      .find(Grid)
      .at(3)
      .shallow()
      .find(FacebookLogin)
      .renderProp('render')({ onClick: jest.fn() });
    component
      .find(Grid)
      .at(3)
      .shallow()
      .find(FacebookLogin)
      .renderProp('callback')();

    expect(button).toHaveLength(1);
    expect(responseFacebook).toHaveBeenCalled();
  });

  it('should call responseGoogle method when the google button is clicked', () => {
    const responseGoogle = jest.spyOn(component.instance(), 'responseGoogle');
    component.instance().forceUpdate();

    const button = component
      .find(Grid)
      .at(4)
      .shallow()
      .find(GoogleLogin)
      .renderProp('render')({ onClick: jest.fn() });
    component
      .find(Grid)
      .at(4)
      .shallow()
      .find(GoogleLogin)
      .renderProp('onSuccess')();

    expect(button).toHaveLength(1);
    expect(responseGoogle).toHaveBeenCalled();
  });

  it('should call inputChangeHandler method when the input value is changed', () => {
    const inputChangeHandler = jest.spyOn(
      component.instance(),
      'inputChangeHandler'
    );
    component.instance().forceUpdate();

    const event = {
      target: { value: 'email' }
    };

    const input = component.find('Input').at(0);
    input.simulate('change', event);
    expect(input.length).toBe(1);
    expect(inputChangeHandler).toHaveBeenCalled();
  });

  it('should check if form is valid', () => {
    component.setState({ formIsValid: false });
    const formSubmitHandler = jest.spyOn(
      component.instance(),
      'formSubmitHandler'
    );
    component.instance().forceUpdate();

    const fakeEvent = { preventDefault: () => {} };
    const form = component.find(Button);
    form.simulate('click', fakeEvent);
    expect(form.length).toBe(1);
    expect(formSubmitHandler).toHaveBeenCalled();
  });

  it('should call formSubmitHandler method when the form  is submitted', () => {
    component.setState({
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
          value: 'firstname',
          validation: {
            required: true
          },
          valid: true,
          helperText: '',
          touched: true
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
          value: 'lastname',
          validation: {
            required: true
          },
          valid: true,
          helperText: '',
          touched: true
        },
        email: {
          elementType: 'TextField',
          elementConfig: {
            type: 'email',
            name: 'email',
            label: 'E-mail Address',
            variant: 'outlined',
            size: 'small',
            fullWidth: true
          },
          value: 'email@app.com',
          validation: {
            required: true,
            isEmail: true
          },
          valid: true,
          helperText: '',
          touched: true
        },
        password: {
          elementType: 'TextField',
          elementConfig: {
            type: 'password',
            name: 'password',
            label: 'Password',
            variant: 'outlined',
            size: 'small',
            fullWidth: true,
            autoComplete: 'new-password'
          },
          value: 'password',
          validation: {
            required: true,
            minLength: 8
          },
          valid: true,
          helperText: '',
          touched: true
        },

        confirmPassword: {
          elementType: 'TextField',
          elementConfig: {
            type: 'password',
            name: 'confirmPassword',
            label: 'Confirm Password',
            variant: 'outlined',
            size: 'small',
            fullWidth: true
          },
          value: 'password',
          validation: {
            required: true
          },
          valid: true,
          helperText: '',
          touched: true
        }
      },
      formIsValid: true
    });
    const formSubmitHandler = jest.spyOn(
      component.instance(),
      'formSubmitHandler'
    );
    component.instance().forceUpdate();

    const event = { preventDefault: () => {} };

    const form = component.find(Button);
    form.simulate('click', event);
    expect(form.length).toBe(1);
    expect(formSubmitHandler).toHaveBeenCalled();
  });

  it('should check if passwords match', () => {
    component.setState({
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
          value: 'firstname',
          validation: {
            required: true
          },
          valid: true,
          helperText: '',
          touched: true
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
          value: 'lastname',
          validation: {
            required: true
          },
          valid: true,
          helperText: '',
          touched: true
        },
        email: {
          elementType: 'TextField',
          elementConfig: {
            type: 'email',
            name: 'email',
            label: 'E-mail Address',
            variant: 'outlined',
            size: 'small',
            fullWidth: true
          },
          value: 'email@app.com',
          validation: {
            required: true,
            isEmail: true
          },
          valid: true,
          helperText: '',
          touched: true
        },
        password: {
          elementType: 'TextField',
          elementConfig: {
            type: 'password',
            name: 'password',
            label: 'Password',
            variant: 'outlined',
            size: 'small',
            fullWidth: true,
            autoComplete: 'new-password'
          },
          value: 'password',
          validation: {
            required: true,
            minLength: 8
          },
          valid: true,
          helperText: '',
          touched: true
        },

        confirmPassword: {
          elementType: 'TextField',
          elementConfig: {
            type: 'password',
            name: 'confirmPassword',
            label: 'Confirm Password',
            variant: 'outlined',
            size: 'small',
            fullWidth: true
          },
          value: 'confirmpassword',
          validation: {
            required: true
          },
          valid: true,
          helperText: '',
          touched: true
        }
      }
    });
    const formSubmitHandler = jest.spyOn(
      component.instance(),
      'formSubmitHandler'
    );
    component.instance().forceUpdate();

    const fakeEvent = { preventDefault: () => {} };
    const form = component.find(Button);
    form.simulate('click', fakeEvent);
    expect(form.length).toBe(1);
    expect(formSubmitHandler).toHaveBeenCalled();
  });

  it('should map dispatch to props', () => {
    wrapper.simulate('setAlert');
    wrapper.simulate('signup');

    const actions = store.getActions();
    expect(actions.length).toEqual(2);
  });

  it('should call componentWillReceiveProps with different status prop', () => {
    component.setState({
      form: {
        password: {
          elementType: 'TextField',
          elementConfig: {},
          value: 'pass',
          valid: true,
          touched: true
        }
      }
    });
    component.setProps({ status: 'success' });
    props = component.instance().props;
    expect(props.status).toBe('success');
  });
});
