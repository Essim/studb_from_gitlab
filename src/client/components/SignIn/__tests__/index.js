import React from 'react';
import {SignIn} from '../';
import {shallowToJson} from 'enzyme-to-json';

const mockFacebookOauth = jest.fn(),
    mockGoogleOauth = jest.fn(),
    mockToggleModalSignIn = jest.fn(),
    mockInit = jest.fn(),
    mockSignIn = jest.fn(),
    mockSigninObj = {
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
    };

describe('SignIn', () => {
    it('should render correctly', () => {
        const output = shallow(<SignIn signin={mockSigninObj} facebookOauth={mockFacebookOauth} googleOauth={mockGoogleOauth} init={mockInit} signIn={mockSignIn} toggleModalSignIn={mockToggleModalSignIn}/>);
        expect(shallowToJson(output)).toMatchSnapshot();
    });
});
