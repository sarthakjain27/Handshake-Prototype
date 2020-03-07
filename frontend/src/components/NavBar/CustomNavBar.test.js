import React from 'react';
import CustomNavBar from './CustomNavBar';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

it('should render correctly', () => {
  const component = mount( <CustomNavBar />);
  expect(component).toMatchSnapshot();
  component.unmount();
});