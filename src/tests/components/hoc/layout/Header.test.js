import React from 'react';
import { shallow } from 'enzyme';
import Header from '../../../../components/hoc/layout/Header';

describe('<Header /> component', () => {
  const component = shallow(<Header />);

  it('should render without crashing', () => {
    expect(component).toMatchSnapshot();
  });
});
