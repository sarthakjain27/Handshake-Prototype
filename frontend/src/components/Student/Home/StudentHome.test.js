import React from 'react';
import { mount, configure } from 'enzyme';

import Adapter from 'enzyme-adapter-react-16';
import StudentHome from './StudentHome';

configure({ adapter: new Adapter() });

it('should render correctly', () => {
  const component = mount(<StudentHome />);
  expect(component).toMatchSnapshot();
  component.unmount();
});
