import React from 'react';
import { shallow } from 'enzyme';
import Footer from '../../../../components/hoc/layout/Footer';

describe('<Footer /> component', () => {
  const component = shallow(<Footer />);

  it('should render without crashing', () => {
    expect(component).toMatchSnapshot();
  });
});
