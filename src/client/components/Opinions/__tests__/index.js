import React from 'react';
import {Opinions} from '../';
import { shallowToJson } from 'enzyme-to-json';

const mockDocument_cuid = "mockCudi",
    mockOpinions= [
        {
            cuid_author: 'cuidusr1',
            name_author: 'essim',
            date: '2001-12-31T23:00:00.000Z',
            state: true,
            report: false,
            logicalDelete: false,
            cuid: 'opi1',
            _id: '5a18025735a4ce74080309d4'
        },
        {
            cuid_author: 'cuidusr2',
            name_author: 'christopher',
            date: '2001-12-31T23:00:00.000Z',
            state: true,
            report: false,
            logicalDelete: false,
            cuid: 'opi2',
            _id: '5a18025735a4ce74080309d3'
        }
    ],
    mockComments= [
        {
            cuid_author: 'cuidusr1',
            name_author: 'essim',
            text: 'One step test',
            date: '2004-12-31T23:00:00.000Z',
            mainComment: false,
            logicalDelete: false,
            cuid: 'cuidCom2',
            _id: '5a18025735a4ce74080309d2',
            opinions: [],
            comments: []
        }
    ]

;

describe('Opinions', () => {
    it('should render correctly', () => {
        const output = shallow(<Opinions document_cuid={mockDocument_cuid} opinions={mockOpinions} comments={mockComments}/>);
        expect(shallowToJson(output)).toMatchSnapshot();
    });
});
