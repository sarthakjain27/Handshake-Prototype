import React from 'react';
import StudentHome from './StudentHome';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

it('should render correctly', () => {
  const component = mount( <StudentHome />);
  expect(component).toMatchSnapshot();
  component.unmount();
});