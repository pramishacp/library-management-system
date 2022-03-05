const request = require('supertest');
const Book = require('../../services/book');

let server;

describe('/api/books', () => {
    beforeEach(() => { server = require('../../index'); })
    afterEach(() => { server.close(); })

    describe('GET /', () => {

        const exec = async() => request(server).get('/api/books')

        beforeEach(() => { Book.removeAllBooks() })
        afterEach(() => { Book.removeAllBooks() })

        it('should return all books', async() => {
            const books = [
                { name: 'book1', stock: 1 },
                { name: 'book2', stock: 1 }
            ]
            await Book.insertManyBooks(books);

            const res = await exec();

            expect(res.status).toBe(200);
            expect(res.body.length).toBe(2);
            expect(res.body.some(b => b.name === 'book1')).toBeTruthy();
            expect(res.body.some(b => b.name === 'book2')).toBeTruthy();
        });
    })
})