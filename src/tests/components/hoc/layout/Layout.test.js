import React from 'react';
import { shallow } from 'enzyme';
import Layout from '../../../../components/hoc/layout/Layout';

describe('<Layout /> component', () => {
  const props = {
    children: <div></div>,
  };
  const component = shallow(<Layout {...props} />);

  it('should render without crashing', () => {
    expect(component).toMatchSnapshot();
  });
});
