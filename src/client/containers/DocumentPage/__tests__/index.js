import React from 'react';
import {Document} from '../';
import {shallowToJson} from 'enzyme-to-json';

const mockInitDocumentPage = jest.fn(),
    mockChangeDoc = jest.fn(),
    mockMatch = {
        params: {
            cuidDoc: "mockCUIDDoc",
        },
    },
    mockDocumentPage = {
        versionCuid: '',
        version: {
            isrep: false,
            cuid: "mockCuid"
        },
        user: {},
        document: {
            _id: '5a18025735a4ce74080309ca',
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
                    _id: '5a18025735a4ce74080309cd'
                },
                {
                    name: 'Anglais',
                    division: false,
                    course: true,
                    logicalDelete: false,
                    numid: 2,
                    cuid: 'cuidTag2',
                    _id: '5a18025735a4ce74080309cc'
                },
                {
                    name: 'Funny',
                    division: false,
                    course: false,
                    logicalDelete: false,
                    numid: 3,
                    cuid: 'cuidTag3',
                    _id: '5a18025735a4ce74080309cb'
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
                    _id: '5a18025735a4ce74080309d0',
                    opinions: [
                        {
                            cuid_author: 'cuidusr2',
                            name_author: 'christopher',
                            date: '2001-12-31T23:00:00.000Z',
                            state: true,
                            report: false,
                            logicalDelete: false,
                            cuid: 'opi3',
                            _id: '5a18025735a4ce74080309d1'
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
                            _id: '5a18025735a4ce74080309d2',
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
                    _id: '5a18025735a4ce74080309ce',
                    opinions: [
                        {
                            cuid_author: 'cuidusr2',
                            name_author: 'christopher',
                            date: '2001-12-31T23:00:00.000Z',
                            state: true,
                            report: false,
                            logicalDelete: false,
                            cuid: 'opi3',
                            _id: '5a18025735a4ce74080309cf'
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
        opinions: [
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
        comments: [
            {
                cuid_author: 'cuidusr2',
                name_author: 'christopher',
                text: 'Superbe test',
                date: '2017-11-06T14:01:15.000Z',
                mainComment: true,
                logicalDelete: false,
                cuid: 'cuidCom1',
                _id: '5a18025735a4ce74080309d0',
                opinions: [
                    {
                        cuid_author: 'cuidusr2',
                        name_author: 'christopher',
                        date: '2001-12-31T23:00:00.000Z',
                        state: true,
                        report: false,
                        logicalDelete: false,
                        cuid: 'opi3',
                        _id: '5a18025735a4ce74080309d1'
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
                        _id: '5a18025735a4ce74080309d2',
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
                _id: '5a18025735a4ce74080309ce',
                opinions: [
                    {
                        cuid_author: 'cuidusr2',
                        name_author: 'christopher',
                        date: '2001-12-31T23:00:00.000Z',
                        state: true,
                        report: false,
                        logicalDelete: false,
                        cuid: 'opi3',
                        _id: '5a18025735a4ce74080309cf'
                    }
                ],
                comments: []
            }
        ],
        tags: [
            {
                name: 'BIN',
                division: true,
                course: false,
                logicalDelete: false,
                numid: 1,
                cuid: 'cuidTag1',
                _id: '5a18025735a4ce74080309cd'
            },
            {
                name: 'Anglais',
                division: false,
                course: true,
                logicalDelete: false,
                numid: 2,
                cuid: 'cuidTag2',
                _id: '5a18025735a4ce74080309cc'
            },
            {
                name: 'Funny',
                division: false,
                course: false,
                logicalDelete: false,
                numid: 3,
                cuid: 'cuidTag3',
                _id: '5a18025735a4ce74080309cb'
            }
        ],
        preview: {},
        isDownloading: false,
        previewFetched: false,
        documentFetched: true,
        toggleMessage: ''
    }, mockLocation = {
        state: {
            document: mockDocumentPage.document
        }
    },
    mockDocumentChangeVersion = jest.fn(),
    mockFeed = {
        documents: [
            {
                _id: '5a2b9c3b0593c509f186eea7',
                files: {
                    name: 'Nouveau document',
                    path: 'http://localhost:8888/files/cjams2twk0000w3ffq8frjxu7',
                    type: 'application/octet-stream'
                },
                logicalDelete: false,
                description: 'aze',
                date: '2017-11-30T17:52:38.375Z',
                name_author: 'christopher',
                cuid_author: 'cuidusr2',
                isRep: false,
                mainVersion: 'cjams2twk0000w3ffq8frjxu7',
                parent_version: '',
                multiplePath: false,
                name: 'Nouveau document1',
                cuid_course: 'anglais-1',
                cuid_division: 'division-bim',
                path: 'http://localhost:8888/files/cjams2twk0000w3ffq8frjxu7',
                cuid: 'cjams2twk0000w3ffq8frjxu7',
                __v: 0,
                tags: [
                    {
                        _id: 15,
                        name: '1BIM',
                        division: true,
                        course: false,
                        logicalDelete: false,
                        cuid: 'cjaz2iov5000cypdbie0wnml5',
                        __v: 0
                    },
                    {
                        _id: 6,
                        name: 'Anglais',
                        division: false,
                        course: true,
                        logicalDelete: false,
                        cuid: 'cjaz2intp0002ypdbxpquw0pw',
                        __v: 0
                    },
                    {
                        _id: 3,
                        name: 'Funny',
                        division: false,
                        course: false,
                        logicalDelete: false,
                        cuid: 'cjaz2il7w0000ypdb1uiqn4a5',
                        __v: 0
                    }
                ],
                comments: [
                    {
                        logicalDelete: false,
                        cuid: 'cjamsmtzn0001urffxxuwedxe',
                        date: '2017-11-30T18:08:11.603Z',
                        mainComment: true,
                        text: 'commentaire',
                        name_author: 'christopher',
                        cuid_author: 'cuidusr2',
                        _id: '5a2b9c3b0593c509f186eeaa',
                        opinions: [],
                        comments: []
                    }
                ],
                opinions: [
                    {
                        cuid_author: 'cuidusr2',
                        name_author: 'christopher',
                        state: true,
                        report: false,
                        cuid: 'cjams2z9s0001w3ffdxh2n1gy',
                        logicalDelete: false,
                        date: '2017-11-30T17:52:45.329Z',
                        _id: '5a2b9c3b0593c509f186eea9'
                    },
                    {
                        cuid_author: 'cuidusr2',
                        name_author: 'christopher',
                        state: false,
                        report: true,
                        cuid: 'cjams59lf00001rff2q1dslhw',
                        logicalDelete: false,
                        date: '2017-11-30T17:54:32.019Z',
                        _id: '5a2b9c3b0593c509f186eea8'
                    }
                ],
                revisionNumber: 0
            }
        ],
        tags: [],
        loading: false,
        search: [
            {
                label: 'essim',
                value: 'essim',
                nav: true
            }
        ],
        error: false
    };

describe('Document', () => {
    it('should render correctly', () => {
        const output = shallow(<Document initDocumentPage={mockInitDocumentPage} documentPage={mockDocumentPage}
                                         location={mockLocation} changeDoc={mockChangeDoc} match={mockMatch}
                                         documentChangeVersion={mockDocumentChangeVersion} feed={mockFeed}/>);
        expect(shallowToJson(output)).toMatchSnapshot();
    });
});
