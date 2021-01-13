import React from 'react';
import { shallow } from 'enzyme';
import Input from '../../../components/UI/Input';

const props = {
  elementType: '',
  elementConfig: {},
  value: '',
  onChange: jest.fn(),
  valid: true,
  touched: true,
  helperText: ''
};

describe('<Input /> Component', () => {
  it('should render without crashing', () => {
    const component = shallow(<Input {...props} />);
    expect(component).toMatchSnapshot();
  });

  it('should use TextField element Type', () => {
    props.elementType = 'TextField';
    const component = shallow(<Input {...props} />);
    expect(component).toMatchSnapshot();
  });

  //   it('should use textarea element Type', () => {
  //     props.elementType = 'textarea';
  //     const component = shallow(<Input {...props} />);
  //     expect(component).toMatchSnapshot();
  //   });

  //   it('should use select element Type', () => {
  //     props.elementType = 'select';
  //     props.elementConfig = {
  //       options: [{ value: '' }]
  //     };
  //     const component = shallow(<Input {...props} />);
  //     expect(component).toMatchSnapshot();
  //   });
});
