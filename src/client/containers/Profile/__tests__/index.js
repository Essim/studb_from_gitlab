import React from 'react';
import {Profile} from '../';
import { shallowToJson } from 'enzyme-to-json';

const mockSignin= {
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
    },mockProfile= {
        isFetchingUser: false,
        isFetchingDocuments: false,
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
        documents: [
            {
                _id: '5a1931e4b0d7a8231dd4a4bb',
                cuid: 'cuidDoc1',
                cuid_course: 'anglais-1',
                cuid_division: 'division-bin',
                cuid_author: 'cuidusr2',
                name_author: 'christopher',
                isRep: true,
                parentRep: null,
                logicalDelete: false,
                name: 'synthese_alphabet',
                description: 'The amazing alphabet',
                date: '2000-12-31T23:00:00.000Z',
                path: 'http://localhost:8888/files/version_doc1',
                zip_path: 'http://localhost:8888/files/version_doc1/version_doc1.zip',
                __v: 0,
                tagsNumber: [
                    1,
                    2,
                    3
                ],
                tags: [
                    {
                        name: 'BIN',
                        division: true,
                        course: false,
                        logicalDelete: false,
                        numid: 1,
                        cuid: 'cuidTag1',
                        _id: '5a1931e4b0d7a8231dd4a4be'
                    },
                    {
                        name: 'Anglais',
                        division: false,
                        course: true,
                        logicalDelete: false,
                        numid: 2,
                        cuid: 'cuidTag2',
                        _id: '5a1931e4b0d7a8231dd4a4bd'
                    },
                    {
                        name: 'Funny',
                        division: false,
                        course: false,
                        logicalDelete: false,
                        numid: 3,
                        cuid: 'cuidTag3',
                        _id: '5a1931e4b0d7a8231dd4a4bc'
                    }
                ],
                comments: [
                    {
                        cuid_author: 'cuidusr2',
                        name_author: 'christopher',
                        text: 'Superbe test',
                        date: '2017-11-06T14:01:15.000Z',
                        mainComment: true,
                        logicalDelete: false,
                        cuid: 'cuidCom1',
                        _id: '5a1931e4b0d7a8231dd4a4c1',
                        opinions: [
                            {
                                cuid_author: 'cuidusr2',
                                name_author: 'christopher',
                                date: '2001-12-31T23:00:00.000Z',
                                state: true,
                                report: false,
                                logicalDelete: false,
                                cuid: 'opi3',
                                _id: '5a1931e4b0d7a8231dd4a4c2'
                            }
                        ],
                        comments: [
                            {
                                cuid_author: 'cuidusr1',
                                name_author: 'essim',
                                text: 'One step test',
                                date: '2004-12-31T23:00:00.000Z',
                                mainComment: false,
                                logicalDelete: false,
                                cuid: 'cuidCom2',
                                _id: '5a1931e4b0d7a8231dd4a4c3',
                                opinions: [],
                                comments: []
                            }
                        ]
                    },
                    {
                        cuid_author: 'cuidusr1',
                        name_author: 'essim',
                        text: 'Je suis une banane',
                        date: '2017-11-06T14:01:15.000Z',
                        mainComment: true,
                        logicalDelete: false,
                        cuid: 'cuidCom2',
                        _id: '5a1931e4b0d7a8231dd4a4bf',
                        opinions: [
                            {
                                cuid_author: 'cuidusr2',
                                name_author: 'christopher',
                                date: '2001-12-31T23:00:00.000Z',
                                state: true,
                                report: false,
                                logicalDelete: false,
                                cuid: 'opi3',
                                _id: '5a1931e4b0d7a8231dd4a4c0'
                            }
                        ],
                        comments: []
                    }
                ],
                opinions: [
                    {
                        cuid_author: 'cuidusr1',
                        name_author: 'essim',
                        date: '2001-12-31T23:00:00.000Z',
                        state: true,
                        report: false,
                        logicalDelete: false,
                        cuid: 'opi1',
                        _id: '5a1931e4b0d7a8231dd4a4c5'
                    },
                    {
                        cuid_author: 'cuidusr2',
                        name_author: 'christopher',
                        date: '2001-12-31T23:00:00.000Z',
                        state: true,
                        report: false,
                        logicalDelete: false,
                        cuid: 'opi2',
                        _id: '5a1931e4b0d7a8231dd4a4c4'
                    }
                ],
                files: {
                    dir1: {
                        _contents: [
                            {
                                name: 'file3.docx',
                                isDir: false,
                                path: 'files/version_doc1/dir1/file3.docx',
                                url: 'http://localhost:8888/files/version_doc1/dir1/file3.docx',
                                Ext: '.docx'
                            }
                        ]
                    },
                    _contents: [
                        {
                            name: 'file1.pdf',
                            isDir: false,
                            path: 'files/version_doc1/file1.pdf',
                            url: 'http://localhost:8888/files/version_doc1/file1.pdf',
                            Ext: '.pdf'
                        },
                        {
                            name: 'file2.doc',
                            isDir: false,
                            path: 'files/version_doc1/file2.doc',
                            url: 'http://localhost:8888/files/version_doc1/file2.doc',
                            Ext: '.doc'
                        }
                    ]
                }
            },
            {
                _id: '5a1931e4b0d7a8231dd4a4c6',
                cuid: 'cuidDoc2',
                cuid_course: 'anglais-2',
                cuid_division: 'division-bin',
                cuid_author: 'cuidusr2',
                name_author: 'christopher',
                isRep: false,
                parentRep: null,
                logicalDelete: false,
                name: 'synthese_alphabet 2',
                description: 'The amazing alphabet numéro 2',
                date: '2000-12-31T23:00:00.000Z',
                path: 'http://localhost:8888/files/version_doc2/file1.pdf',
                __v: 0,
                tagsNumber: [
                    1,
                    2
                ],
                tags: [
                    {
                        name: 'BIN',
                        division: true,
                        course: false,
                        logicalDelete: false,
                        numid: 1,
                        cuid: 'cuidTag1',
                        _id: '5a1931e4b0d7a8231dd4a4c8'
                    },
                    {
                        name: 'Anglais',
                        division: false,
                        course: true,
                        logicalDelete: false,
                        numid: 2,
                        cuid: 'cuidTag2',
                        _id: '5a1931e4b0d7a8231dd4a4c7'
                    }
                ],
                comments: [
                    {
                        cuid_author: 'cuidusr2',
                        name_author: 'christopher',
                        text: 'Mauvais test',
                        date: '2017-11-06T14:01:15.000Z',
                        mainComment: true,
                        logicalDelete: false,
                        cuid: 'cuidCom1',
                        _id: '5a1931e4b0d7a8231dd4a4cb',
                        opinions: [
                            {
                                cuid_author: 'cuidusr2',
                                name_author: 'christopher',
                                date: '2001-12-31T23:00:00.000Z',
                                state: true,
                                report: false,
                                logicalDelete: false,
                                cuid: 'opi8',
                                _id: '5a1931e4b0d7a8231dd4a4cc'
                            }
                        ],
                        comments: [
                            {
                                cuid_author: 'cuidusr1',
                                name_author: 'essim',
                                text: 'Second step test',
                                date: '2004-12-31T23:00:00.000Z',
                                mainComment: false,
                                logicalDelete: false,
                                cuid: 'cuidCom4',
                                _id: '5a1931e4b0d7a8231dd4a4cd',
                                opinions: [],
                                comments: []
                            }
                        ]
                    },
                    {
                        cuid_author: 'cuidusr1',
                        name_author: 'essim',
                        text: 'Je suis une pomme',
                        date: '2017-11-06T14:01:15.000Z',
                        mainComment: true,
                        logicalDelete: false,
                        cuid: 'cuidCom5',
                        _id: '5a1931e4b0d7a8231dd4a4c9',
                        opinions: [
                            {
                                cuid_author: 'cuidusr2',
                                name_author: 'christopher',
                                date: '2001-12-31T23:00:00.000Z',
                                state: true,
                                report: false,
                                logicalDelete: false,
                                cuid: 'opi9',
                                _id: '5a1931e4b0d7a8231dd4a4ca'
                            }
                        ],
                        comments: []
                    }
                ],
                opinions: [
                    {
                        cuid_author: 'cuidusr1',
                        name_author: 'essim',
                        date: '2001-12-31T23:00:00.000Z',
                        state: true,
                        report: false,
                        logicalDelete: false,
                        cuid: 'opi6',
                        _id: '5a1931e4b0d7a8231dd4a4cf'
                    },
                    {
                        cuid_author: 'cuidusr2',
                        name_author: 'christopher',
                        date: '2001-12-31T23:00:00.000Z',
                        state: true,
                        report: false,
                        logicalDelete: false,
                        cuid: 'opi5',
                        _id: '5a1931e4b0d7a8231dd4a4ce'
                    }
                ]
            }
        ]
    },mockFetchUser = jest.fn(),
    mockFetchConnectedUser = jest.fn(),
    mockFetchDocuments = jest.fn(),
    mockHistory={
        listen:jest.fn(),
    },
    mockLocation = {
        pathname:'mockPath',
    },
    mockSearchFeed = jest.fn();

describe('Profile', () => {
    it('should render correctly', () => {
        const output = shallow(<Profile fetchConnectedUser={mockFetchConnectedUser} fetchDocuments={mockFetchDocuments} fetchUser={mockFetchUser} history={mockHistory} profile={mockProfile} signin={mockSignin} location={mockLocation} searchFeed={mockSearchFeed}/>);
        expect(shallowToJson(output)).toMatchSnapshot();
    });
});
