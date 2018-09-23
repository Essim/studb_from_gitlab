import 'raf/polyfill';// Resolve warning due to react 16
import Enzyme, { shallow, render, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import toJson from 'enzyme-to-json';

Enzyme.configure({ adapter : new Adapter() });

// Ensure all Enzyme function avaible in all test files without importing
global.shallow = shallow;
global.render = render;
global.mount = mount;
global.toJson = toJson;

console.error = message => {
    throw new Error(message);
};


