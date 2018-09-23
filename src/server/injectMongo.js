import User, {ADMIN_ROLE } from './models/userSchema';

// Users mocks
const u1 = new User ({
    name: 'essim',
    token: 'random_token',
    email: 'essimdofus@gmail.com',
    followed_courses: ['cuid_course1','cuid_course2','cuid_course3'],
    password: '$2a$10$Iv22dClC19JC.a3L9CxSMe9XUYAE.FqWymEY81rrwXq7/LMKCQmiO',
    date_creation: '1/1/2000',
    date_connection: '1/1/2000',
    group: [1,2,3],
    role: ADMIN_ROLE,
    cuid_division: 'cuid_div1',
    logicalDelete: false,
    cuid: 'cuid_usr1'
});

u1.save();
