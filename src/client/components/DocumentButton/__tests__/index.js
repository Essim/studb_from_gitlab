import React from 'react';
import {DocumentButton} from '../';
import { shallowToJson } from 'enzyme-to-json';

const mockButton = "like",
    mockDocument_cuid="mockCUID",
    mockOpinions=["mockOpinion1","mockOpinion2","mockOpinion3"];

describe('DocumentButton', () => {
    it('should render correctly', () => {
        const output = shallow(<DocumentButton button={mockButton} document_cuid={mockDocument_cuid} opinions={mockOpinions}/>);
        expect(shallowToJson(output)).toMatchSnapshot();
    });
});
