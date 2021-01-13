import React from 'react';
import { shallow } from 'enzyme';
import Navbar from '../../../../components/hoc/layout/Navbar';

describe('<Navbar /> component', () => {
  const component = shallow(<Navbar />);

  it('should render without crashing', () => {
    expect(component).toMatchSnapshot();
  });

  it('should call onShowMenu method when the humberger button is clicked', () => {
    const onShowMenu = jest.spyOn(component.instance(), 'onShowMenu');
    component.instance().forceUpdate();

    const button = component.find('.menu-toggle').at(0);
    button.simulate('click');
    expect(button.length).toBe(1);
    expect(onShowMenu).toHaveBeenCalled();
  });
});
