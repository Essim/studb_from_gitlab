import React from 'react';
import Comments from '../';
import { shallowToJson } from 'enzyme-to-json';


describe('Comments ', () => {
    it('should render correctly', () => {
        const output = shallow(<Comments />);
        expect(shallowToJson(output)).toMatchSnapshot();
    });
});
