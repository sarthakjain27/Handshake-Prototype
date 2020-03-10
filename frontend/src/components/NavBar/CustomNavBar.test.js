import React from 'react';
import { mount, configure } from 'enzyme';

import Adapter from 'enzyme-adapter-react-16';
import CustomNavBar from './CustomNavBar';

configure({ adapter: new Adapter() });

it('should render correctly', () => {
  const component = mount(<CustomNavBar />);
  expect(component).toMatchSnapshot();
  component.unmount();
});
