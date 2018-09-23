import React from 'react';
import {Navbar} from '../';
import { shallowToJson } from 'enzyme-to-json';

const mockDivision= {
        loading: false,
        divisions: [
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
        ],
        user: {}
    },mockFetchDivision = jest.fn(),
    mockUser = {},
    mockConnected=true;

describe('Navbar', () => {
    it('should render correctly', () => {
        const output = shallow(<Navbar connected={mockConnected} divisions={mockDivision} fetchDivision={mockFetchDivision} user={mockUser}/>);
        expect(shallowToJson(output)).toMatchSnapshot();
    });
});
