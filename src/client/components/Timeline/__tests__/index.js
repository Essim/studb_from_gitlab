import React from 'react';
import Timeline from '../';
import {shallowToJson} from 'enzyme-to-json';

const mockUser = {
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
}, mockDocument = {
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
    mockChangeVersion = jest.fn(),
    mockVersions=[];

describe('Timeline', () => {
    it('should render correctly', () => {
        const output = shallow(<Timeline document={mockDocument} user={mockUser} changeVersion={mockChangeVersion} versions={mockVersions}/>);
        expect(shallowToJson(output)).toMatchSnapshot();
    });
});
