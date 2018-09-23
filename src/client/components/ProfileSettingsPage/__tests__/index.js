import React from 'react';
import {ProfileSettingsPage} from '../';
import {shallowToJson} from 'enzyme-to-json';

const mockSignin = {
        user: {
            dateSignIn: '2017-11-25T09:04:06.561Z',
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
            role: 2
        },
        connected: true,
        modalSignIn: false,
        formSignInError: false,
        formSignInErrorMessage: '',
        isLoading: false
    }, mockProfileSettings = {
        isChangingSection: false,
        isChangingGrades: false,
        isChangingPassword: false,
        myDivision: {},
        isLoadingMyDivision: false,
        isLoadingDivisions: false,
        isUpdatingMyDivision: false,
        isUpdatingMyGrades: false,
        errorGrades: false,
        errorMessageGrades: '',
        errorPassword: false,
        messagePassword: '',
        divisions: [],
        userGrades: [],
        grades: []
    }, mockMyDivision = jest.fn(),
    mockDivisions = jest.fn();

describe('ProfileSettingsPage', () => {
    it('should render correctly', () => {
        const output = shallow(<ProfileSettingsPage signin={mockSignin} divisions={mockDivisions} myDivision={mockMyDivision} profileSettings={mockProfileSettings}/>);
        expect(shallowToJson(output)).toMatchSnapshot();
    });
});
