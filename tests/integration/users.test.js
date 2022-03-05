const request = require('supertest');

const { User } = require('../../models/user')
const { createUser, findUserById } = require('../../services/user')

let server;

describe('/api/users', () => {
    beforeEach(() => { server = require('../../index'); })
    afterEach(() => { server.close(); })

    describe('GET /:id', () => {

        const exec = async(id) => request(server).get('/api/users/' + id)

        it('should return a user if valid id is passed', async() => {
            const user = new User({ name: 'user1' })
            await createUser(user)

            const res = await exec(user.id);

            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty('name', user.name);
        });

        it('should return 404 if invalid id is passed', async() => {
            const res = await exec('1');

            expect(res.status).toBe(404);
        });
    })
})