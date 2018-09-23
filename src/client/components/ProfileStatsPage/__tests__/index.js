import React from 'react';
import {ProfileStatsPage} from '../';
import { shallowToJson } from 'enzyme-to-json';

const mockProfile = {
    isFetchingUser: false,
        isFetchingDocuments: false,
        user: {},
    documents: []
};

describe('ProfileStatsPage', () => {
    it('should render correctly', () => {
        const output = shallow(<ProfileStatsPage profile={mockProfile}/>);
        expect(shallowToJson(output)).toMatchSnapshot();
    });
});
