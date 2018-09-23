import React from 'react';
import {PostComment} from '../';
import { shallowToJson } from 'enzyme-to-json';

const mockUser={
        pseudo:'mockPseudo',
        cuid:'mockCuid',
    },mockDocument="mockDocument",
    mockConnected=true,
    mockCommentDocument = jest.fn(),
    mockCommenting={
        loading:false,
    };

describe('PostComment', () => {
    it('should render correctly', () => {
        const output = shallow(<PostComment user={mockUser} connected={mockConnected} document={mockDocument} commentDocument={mockCommentDocument} commenting={mockCommenting}/>);
        expect(shallowToJson(output)).toMatchSnapshot();
    });
});
