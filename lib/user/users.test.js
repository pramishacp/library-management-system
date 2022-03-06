const request = require('supertest');
const { v4: uuidv4 } = require('uuid');

const User = require('./user.service');

let server;

describe('/api/users', () => {
    beforeEach(() => { server = require('../../index'); })
    afterEach(() => { server.close(); })

    describe('GET /', () => {

        const exec = async() => request(server).get('/api/users')

        beforeEach(() => { User.removeAllUsers() })
        afterEach(() => { User.removeAllUsers() })

        it('should return all users', async() => {
            const users = [
                { id: uuidv4(), name: 'user1' },
                { id: uuidv4(), name: 'user2' }
            ]
            await User.insertManyUsers(users);

            const res = await exec();

            expect(res.status).toBe(200);
            expect(res.body.length).toBe(2);
            expect(res.body.some(b => b.name === 'user1')).toBeTruthy();
            expect(res.body.some(b => b.name === 'user2')).toBeTruthy();
        });

        it('should return 0 users', async() => {
            const res = await exec();

            expect(res.status).toBe(200);
            expect(res.body.length).toBe(0);
        });
    })

    describe('GET /:id', () => {

        const exec = async(id) => request(server).get('/api/users/' + id)

        it('should return a user if valid id is passed', async() => {
            const user = { id: uuidv4(), name: 'user1' }
            await User.insertOneUser(user)

            const res = await exec(user.id);

            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty('name', user.name);
        });

        it('should return 404 if invalid id is passed', async() => {
            const res = await exec('1');

            expect(res.status).toBe(404);
        });

        it('should return 404 if no user with the given id exists', async() => {
            const id = uuidv4();
            const res = await exec(id);

            expect(res.status).toBe(404);
        });
    })
})