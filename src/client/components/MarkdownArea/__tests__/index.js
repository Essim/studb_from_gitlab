import React from 'react';
import MarkdownArea from '../';
import { shallowToJson } from 'enzyme-to-json';

const mockContent = "mockStirng";

describe('MarkdownArea', () => {
    it('should render correctly', () => {
        const output = shallow(<MarkdownArea content={mockContent}/>);
        expect(shallowToJson(output)).toMatchSnapshot();
    });
});
