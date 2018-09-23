import React from 'react';
import {FadeInWrapper} from '../';
import { shallowToJson } from 'enzyme-to-json';

const mockVisible = true;

describe('FadeInWrapper', () => {
    it('should render correctly', () => {
        const output = shallow(<FadeInWrapper visible={mockVisible}/>);
        expect(shallowToJson(output)).toMatchSnapshot();
    });
});
