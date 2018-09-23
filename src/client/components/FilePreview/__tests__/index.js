import React from 'react';
import {FilePreview} from '../';
import {shallowToJson} from 'enzyme-to-json';

const mockDoc_cuid = "mockCuid",
    mockFile = {
        name: 'Nouveau document',
        path: 'http://localhost:8888/files/cjams2twk0000w3ffq8frjxu7',
        type: 'application/octet-stream'
    };

describe('FilePreview', () => {
    it('should render correctly', () => {
        const output = shallow(<FilePreview doc_cuid={mockDoc_cuid} selected_file={mockFile}/>);
        expect(shallowToJson(output)).toMatchSnapshot();
    });
});
