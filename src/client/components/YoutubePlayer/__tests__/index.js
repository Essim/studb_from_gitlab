import React from 'react';
import {YoutubePlayer} from '../';
import { shallowToJson } from 'enzyme-to-json';

const mockVideoId='mockVideoId';

describe('YoutubePlayer', () => {
    it('should render correctly', () => {
        const output = shallow(<YoutubePlayer videoId={mockVideoId}/>);
        expect(shallowToJson(output)).toMatchSnapshot();
    });
});
