import React from 'react';
import {DocumentCounter} from '../';
import { shallowToJson } from 'enzyme-to-json';

const mockCounter = "like",
    mockItems = ["mockItem1","mockItem2","mockItem3"];

describe('DocumentCounter', () => {
    it('should render correctly', () => {
        const output = shallow(<DocumentCounter counter={mockCounter} items={mockItems}/>);
        expect(shallowToJson(output)).toMatchSnapshot();
    });
});
