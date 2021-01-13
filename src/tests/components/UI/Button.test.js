import React from 'react';
import { shallow } from 'enzyme';
import Button from '../../../components/UI/Button';

describe('<Button /> component', () => {
  const props = {
    children: <i></i>,
  };
  const component = shallow(<Button {...props} />);

  it('should render without crashing', () => {
    expect(component).toMatchSnapshot();
  });
});
