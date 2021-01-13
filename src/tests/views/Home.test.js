import React from 'react';
import { shallow } from 'enzyme';
import Home from '../../views/Home';

describe('<Home /> component', () => {
  const component = shallow(<Home />);

  it('should render without crashing', () => {
    expect(component).toMatchSnapshot();
  });
});
