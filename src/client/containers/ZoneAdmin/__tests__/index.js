import React from 'react';
import {ZoneAdmin} from '../';
import {shallowToJson} from 'enzyme-to-json';

const mockSignin = {
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
    }, mockAdmin = {
        users: [],
        userMessage: '',
        userError: false,
        commentMessage: '',
        commentError: false,
        courseError: false,
        courseMessage: '',
        documentMessage: '',
        documentError: false,
        divisionError: false,
        divisionMessage: '',
        divisions: [],
        documents: [],
        isFetchingUsers: false,
        isFetchingDivisions: false,
        isFetchingDocuments: false,
        isBanningUser: false,
        isUnBanningUser: false,
        isModifyingUserRole: false,
        isDeletingComment: false,
        isDeletingDocument: false,
        isDeletingCourse: false,
        isAddingCourse: false,
        isAddingDivision: false,
        isDeletingDivision: false,
        refreshUsers: false,
        refreshComments: false,
        refreshDocuments: false,
        refreshDivisions: false,
        refreshCourses: false,
        isModalUserOpen: false,
        isModalSectionOpen: false,
        isModalDivisionOpen: false,
        selectedUser: {}
    }, mockHistory = {
        listen: jest.fn(),
        location : {
            pathname : "mockpathname/mocksubdir",
        },
    },
    mockFetchDocuments = jest.fn(),
    mockFetchUsers = jest.fn(),
    mockFetchDivisions = jest.fn(),
    mockToggleRefresh = jest.fn(),
    mockToggleRefreshCourses = jest.fn(),
    mockToggleRefreshDivisions = jest.fn(),
    mockToggleRefreshDocuments = jest.fn(),
    mockToggleRefreshComments = jest.fn();

describe('ZoneAdmin', () => {
    it('should render correctly', () => {
        const output = shallow(<ZoneAdmin signin={mockSignin} history={mockHistory} fetchDocuments={mockFetchDocuments}
                                          admin={mockAdmin} fetchDivisions={mockFetchDivisions}
                                          fetchUsers={mockFetchUsers} toggleRefresh={mockToggleRefresh}
                                          toggleRefreshComments={mockToggleRefreshComments}
                                          toggleRefreshCourses={mockToggleRefreshCourses}
                                          toggleRefreshDivisions={mockToggleRefreshDivisions}
                                          toggleRefreshDocuments={mockToggleRefreshDocuments}/>);
        expect(shallowToJson(output)).toMatchSnapshot();
    });
});
