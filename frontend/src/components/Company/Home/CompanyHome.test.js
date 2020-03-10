import React from 'react';
import { mount, configure } from 'enzyme';

import Adapter from 'enzyme-adapter-react-16';
import CompanyHome from './CompanyHome';

configure({ adapter: new Adapter() });

it('should render correctly', () => {
  const component = mount(<CompanyHome />);
  expect(component).toMatchSnapshot();
  component.unmount();
});
