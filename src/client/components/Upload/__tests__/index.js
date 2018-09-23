import React from 'react';
import {Upload} from '../';
import {shallowToJson} from 'enzyme-to-json';

const mockUpload = {
        modalOpened: false,
        hasUpload: false,
        upload: {},
        files: [],
        process: {},
        uploading: false,
        tags: [
            {
                _id: '5a21a55982f4c213b577018e',
                name: 'Funny',
                division: false,
                course: false,
                logicalDelete: false,
                numid: 3,
                cuid: 'cuidTag3',
                __v: 0
            },
            {
                _id: '5a21a55982f4c213b577018c',
                name: 'BIN',
                division: true,
                course: false,
                logicalDelete: false,
                numid: 1,
                cuid: 'cuidTag1',
                __v: 0
            },
            {
                _id: '5a21a55982f4c213b577018d',
                name: 'Anglais',
                division: false,
                course: true,
                logicalDelete: false,
                numid: 2,
                cuid: 'cuidTag2',
                __v: 0
            }
        ]
    },
    mockToggleModal = jest.fn(),
    mockConnected = true;

describe('Upload', () => {
    it('should render correctly', () => {
        const output = shallow(<Upload connected={mockConnected} toggleModal={mockToggleModal} upload={mockUpload}/>);
        expect(shallowToJson(output)).toMatchSnapshot();
    });
});
