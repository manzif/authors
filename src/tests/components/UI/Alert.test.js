import React from 'react';
import { shallow } from 'enzyme';
import { Alert } from '@material-ui/lab';
import ConnectedAlert, { CustomAlert } from '../../../components/UI/Alert';
import { mockStore } from '../../store';

const props = {
  alert: {
    alertType: 'Success',
    message: 'Good'
  },
  onRemoveAlert: jest.fn()
};

describe('<Alert /> Component', () => {
  let component = shallow(<CustomAlert {...props} />);
  let wrapper;
  let store;

  beforeEach(() => {
    const initialState = {
      alert: {
        alertType: 'Danger',
        message: 'Bad'
      }
    };
    store = mockStore(initialState);
    wrapper = shallow(<ConnectedAlert store={store} />).dive();
  });

  it('should render without crashing', () => {
    expect(component).toMatchSnapshot();
  });

  it('should render alert with success alert Type', () => {
    props.alert.alertType = 'success';
    component = shallow(<CustomAlert {...props} />);
    expect(component).toMatchSnapshot();
  });

  it('should render alert with error alert Type', () => {
    props.alert.alertType = 'error';
    component = shallow(<CustomAlert {...props} />);
    expect(component).toMatchSnapshot();
  });

  it('should call onClose method when the button is clicked', () => {
    const onClose = jest.spyOn(component.instance(), 'onClose');
    component.instance().forceUpdate();

    const closer = component.find(Alert);
    closer.simulate('close');
    expect(closer.length).toBe(1);
    expect(onClose).toHaveBeenCalled();
  });

  it('should map state to props', () => {
    expect(wrapper.props().alert.alertType).toBe('Danger');
  });

  it('should map dispatch to props', () => {
    wrapper.simulate('removeAlert');

    const actions = store.getActions();
    expect(actions.length).toEqual(1);
  });
});
