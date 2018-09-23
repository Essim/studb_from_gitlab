import React from 'react';
import {SignUp} from '../';
import {shallowToJson} from 'enzyme-to-json';

const mockSignup = {
        user: {
            dateSignIn: '2017-12-01T18:54:27.493Z',
            dateSignUp: '1999-12-31T23:00:00.000Z',
            email: 'essimdofus@gmail.com',
            cuid: 'cuidusr1',
            userID: 'test',
            division: 'cuiddivision1',
            grades: [
                1,
                2,
                3
            ],
            pseudo: 'essim',
            role: 3
        },
        connected: true,
        modalSignIn: false,
        formSignInError: false,
        formSignInErrorMessage: '',
        isLoading: false
    }, mockToggleModalSignUp = jest.fn(),
    mockSubmitSignup = jest.fn();

describe('SignUp', () => {
    it('should render correctly', () => {
        const output = shallow(<SignUp signup={mockSignup} submitSignup={mockSubmitSignup} toggleModalSignUp={mockToggleModalSignUp}/>);
        expect(shallowToJson(output)).toMatchSnapshot();
    });
});
