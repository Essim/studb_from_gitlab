import React from 'react';
import {Header} from '../';
import { shallowToJson } from 'enzyme-to-json';

const mockSignin = {user: {},
    connected: false,
};

const mockDivisions= {
        divisions: [],
};

const mockLogout = jest.fn();

describe('Header', () => {
    it('should render correctly', () => {
        const output = shallow(<Header signin={mockSignin} divisions={mockDivisions} logout={mockLogout}/>);
        expect(shallowToJson(output)).toMatchSnapshot();
    });
});
