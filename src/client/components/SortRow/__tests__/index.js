import React from 'react';
import {SortRow} from '../';
import { shallowToJson } from 'enzyme-to-json';

describe('SortRow', () => {
    it('should render correctly', () => {
        const output = shallow(<SortRow/>);
        expect(shallowToJson(output)).toMatchSnapshot();
    });
});
