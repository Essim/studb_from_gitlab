import React from 'react';
import {ContentWrapper} from '../';
import { shallowToJson } from 'enzyme-to-json';

const mockChild = <div key={'mockKey'}>mock</div>;
const mockChildren= [mockChild];

describe('ContentWrapper', () => {
    it('should render correctly', () => {
        const output = shallow(<ContentWrapper children={mockChildren}/>);
        expect(shallowToJson(output)).toMatchSnapshot();
    });
});
