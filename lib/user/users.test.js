const request = require('supertest');
const { v4: uuidv4 } = require('uuid');

const { User } = require('./user.model');
const { insertOneUser } = require('./user.service');

let server;

describe('/api/users', () => {
    beforeEach(() => { server = require('../../index'); })
    afterEach(() => { server.close(); })

    describe('GET /:id', () => {

        const exec = async(id) => request(server).get('/api/users/' + id)

        it('should return a user if valid id is passed', async() => {
            const user = new User({ name: 'user1' })
            await insertOneUser(user)

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