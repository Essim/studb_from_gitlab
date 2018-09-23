import React from 'react';
import Footer from '../';

test('render footer', ()=>{
    const wrapper = shallow(<Footer/>);
    expect(wrapper).toMatchSnapshot();
});