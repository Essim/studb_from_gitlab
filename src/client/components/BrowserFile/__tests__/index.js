import React from 'react';
import {BrowserFiles} from '../';
import { shallowToJson } from 'enzyme-to-json';

const mockFiles= {
        _contents:[]
    },
    mockName = "name",
    mockOnClick = jest.fn(),
    mockDoc_cuid="mockCUID",
mockSelectFilePreviewed=jest.fn();
describe('BrowserFiles', () => {
    it('should render correctly', () => {
        const output = shallow(<BrowserFiles files={mockFiles} name={mockName} onclick={mockOnClick} doc_cuid={mockDoc_cuid} selectFilePreviewed={mockSelectFilePreviewed}/>);
        expect(shallowToJson(output)).toMatchSnapshot();
    });
});
