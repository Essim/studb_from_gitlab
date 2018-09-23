import React from 'react';
import {PostPreview} from '../';
import { shallowToJson } from 'enzyme-to-json';

const mockDocument={
    _id: '5a17f595977b356a3d6d392a',
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
            _id: '5a17f595977b356a3d6d392d',
        },
        {
            name: 'Anglais',
            division: false,
            course: true,
            logicalDelete: false,
            numid: 2,
            cuid: 'cuidTag2',
            _id: '5a17f595977b356a3d6d392c',
        },
        {
            name: 'Funny',
            division: false,
            course: false,
            logicalDelete: false,
            numid: 3,
            cuid: 'cuidTag3',
            _id: '5a17f595977b356a3d6d392b',
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
            _id: '5a17f595977b356a3d6d3930',
            opinions: [
                {
                    cuid_author: 'cuidusr2',
                    name_author: 'christopher',
                    date: '2001-12-31T23:00:00.000Z',
                    state: true,
                    report: false,
                    logicalDelete: false,
                    cuid: 'opi3',
                    _id: '5a17f595977b356a3d6d3931'
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
                    _id: '5a17f595977b356a3d6d3932',
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
            _id: '5a17f595977b356a3d6d392e',
            opinions: [
                {
                    cuid_author: 'cuidusr2',
                    name_author: 'christopher',
                    date: '2001-12-31T23:00:00.000Z',
                    state: true,
                    report: false,
                    logicalDelete: false,
                    cuid: 'opi3',
                    _id: '5a17f595977b356a3d6d392f'
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
            _id: '5a17f595977b356a3d6d3934'
        },
        {
            cuid_author: 'cuidusr2',
            name_author: 'christopher',
            date: '2001-12-31T23:00:00.000Z',
            state: true,
            report: false,
            logicalDelete: false,
            cuid: 'opi2',
            _id: '5a17f595977b356a3d6d3933'
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
},mockDivisions= [
    {
        _id: '5a17f595977b356a3d6d3918',
        acronym: 'BIN',
        cuid: 'cuiddivision1',
        logicalDelete: false,
        __v: 0,
        courses: [
            {
                name: 'Anglais',
                grade: 1,
                logicalDelete: false,
                cuid: 'anglais-1',
                _id: '5a17f595977b356a3d6d3920'
            },
            {
                name: 'Web',
                grade: 1,
                logicalDelete: false,
                cuid: 'web-1',
                _id: '5a17f595977b356a3d6d391f'
            },
            {
                name: 'Assembleur',
                grade: 1,
                logicalDelete: false,
                cuid: 'assembly-1',
                _id: '5a17f595977b356a3d6d391e'
            },
            {
                name: 'Anglais',
                grade: 2,
                logicalDelete: false,
                cuid: 'anglais-2',
                _id: '5a17f595977b356a3d6d391d'
            },
            {
                name: 'Web',
                grade: 2,
                logicalDelete: false,
                cuid: 'web-2',
                _id: '5a17f595977b356a3d6d391c'
            },
            {
                name: 'Language C',
                grade: 2,
                logicalDelete: false,
                cuid: 'c-lang-1',
                _id: '5a17f595977b356a3d6d391b'
            },
            {
                name: 'Anglais',
                grade: 3,
                logicalDelete: false,
                cuid: 'anglais-3',
                _id: '5a17f595977b356a3d6d391a'
            },
            {
                name: 'Web',
                grade: 3,
                logicalDelete: false,
                cuid: 'web-3',
                _id: '5a17f595977b356a3d6d3919'
            }
        ],
        grades: [
            null,
            {
                name: '1BIN',
                grade: 1,
                courses: [
                    {
                        name: 'Anglais',
                        grade: 1,
                        logicalDelete: false,
                        cuid: 'anglais-1',
                        _id: '5a17f595977b356a3d6d3920'
                    },
                    {
                        name: 'Web',
                        grade: 1,
                        logicalDelete: false,
                        cuid: 'web-1',
                        _id: '5a17f595977b356a3d6d391f'
                    },
                    {
                        name: 'Assembleur',
                        grade: 1,
                        logicalDelete: false,
                        cuid: 'assembly-1',
                        _id: '5a17f595977b356a3d6d391e'
                    }
                ]
            },
            {
                name: '2BIN',
                grade: 2,
                courses: [
                    {
                        name: 'Anglais',
                        grade: 2,
                        logicalDelete: false,
                        cuid: 'anglais-2',
                        _id: '5a17f595977b356a3d6d391d'
                    },
                    {
                        name: 'Web',
                        grade: 2,
                        logicalDelete: false,
                        cuid: 'web-2',
                        _id: '5a17f595977b356a3d6d391c'
                    },
                    {
                        name: 'Language C',
                        grade: 2,
                        logicalDelete: false,
                        cuid: 'c-lang-1',
                        _id: '5a17f595977b356a3d6d391b'
                    }
                ]
            },
            {
                name: '3BIN',
                grade: 3,
                courses: [
                    {
                        name: 'Anglais',
                        grade: 3,
                        logicalDelete: false,
                        cuid: 'anglais-3',
                        _id: '5a17f595977b356a3d6d391a'
                    },
                    {
                        name: 'Web',
                        grade: 3,
                        logicalDelete: false,
                        cuid: 'web-3',
                        _id: '5a17f595977b356a3d6d3919'
                    }
                ]
            }
        ]
    },
    {
        _id: '5a17f595977b356a3d6d3921',
        acronym: 'BIM',
        cuid: 'division-bim',
        logicalDelete: false,
        __v: 0,
        courses: [
            {
                name: 'Anglais',
                grade: 1,
                logicalDelete: false,
                cuid: 'anglais-1',
                _id: '5a17f595977b356a3d6d3929'
            },
            {
                name: 'Web',
                grade: 1,
                logicalDelete: false,
                cuid: 'web-1',
                _id: '5a17f595977b356a3d6d3928'
            },
            {
                name: 'Assembleur',
                grade: 1,
                logicalDelete: false,
                cuid: 'assembly-1',
                _id: '5a17f595977b356a3d6d3927'
            },
            {
                name: 'Anglais',
                grade: 2,
                logicalDelete: false,
                cuid: 'anglais-2',
                _id: '5a17f595977b356a3d6d3926'
            },
            {
                name: 'Web',
                grade: 2,
                logicalDelete: false,
                cuid: 'web-2',
                _id: '5a17f595977b356a3d6d3925'
            },
            {
                name: 'Language C',
                grade: 2,
                logicalDelete: false,
                cuid: 'c-lang-1',
                _id: '5a17f595977b356a3d6d3924'
            },
            {
                name: 'Anglais',
                grade: 3,
                logicalDelete: false,
                cuid: 'anglais-3',
                _id: '5a17f595977b356a3d6d3923'
            },
            {
                name: 'Web',
                grade: 3,
                logicalDelete: false,
                cuid: 'web-3',
                _id: '5a17f595977b356a3d6d3922'
            }
        ],
        grades: [
            null,
            {
                name: '1BIM',
                grade: 1,
                courses: [
                    {
                        name: 'Anglais',
                        grade: 1,
                        logicalDelete: false,
                        cuid: 'anglais-1',
                        _id: '5a17f595977b356a3d6d3929'
                    },
                    {
                        name: 'Web',
                        grade: 1,
                        logicalDelete: false,
                        cuid: 'web-1',
                        _id: '5a17f595977b356a3d6d3928'
                    },
                    {
                        name: 'Assembleur',
                        grade: 1,
                        logicalDelete: false,
                        cuid: 'assembly-1',
                        _id: '5a17f595977b356a3d6d3927'
                    }
                ]
            },
            {
                name: '2BIM',
                grade: 2,
                courses: [
                    {
                        name: 'Anglais',
                        grade: 2,
                        logicalDelete: false,
                        cuid: 'anglais-2',
                        _id: '5a17f595977b356a3d6d3926'
                    },
                    {
                        name: 'Web',
                        grade: 2,
                        logicalDelete: false,
                        cuid: 'web-2',
                        _id: '5a17f595977b356a3d6d3925'
                    },
                    {
                        name: 'Language C',
                        grade: 2,
                        logicalDelete: false,
                        cuid: 'c-lang-1',
                        _id: '5a17f595977b356a3d6d3924'
                    }
                ]
            },
            {
                name: '3BIM',
                grade: 3,
                courses: [
                    {
                        name: 'Anglais',
                        grade: 3,
                        logicalDelete: false,
                        cuid: 'anglais-3',
                        _id: '5a17f595977b356a3d6d3923'
                    },
                    {
                        name: 'Web',
                        grade: 3,
                        logicalDelete: false,
                        cuid: 'web-3',
                        _id: '5a17f595977b356a3d6d3922'
                    }
                ]
            }
        ]
    }
];

describe('PostPreview', () => {
    it('should render correctly', () => {
        const output = shallow(<PostPreview document={mockDocument} divisions={mockDivisions}/>);
        expect(shallowToJson(output)).toMatchSnapshot();
    });
});
