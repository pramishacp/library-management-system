const request = require('supertest');
const { v4: uuidv4 } = require('uuid');

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

        it('should return 0 books', async() => {
            const res = await exec();

            expect(res.status).toBe(200);
            expect(res.body.length).toBe(0);
        });
    })

    describe('GET /:id', () => {

        const exec = async(id) => request(server).get('/api/books/' + id)

        beforeEach(() => { Book.removeAllBooks() })
        afterEach(() => { Book.removeAllBooks() })

        it('should return a book if valid id is passed', async() => {
            const book = { id: uuidv4(), name: 'book1', stock: 1 }
            await Book.insertOneBook(book);

            const res = await exec(book.id);

            expect(res.status).toBe(200);
            expect(res.body.id).toBe(book.id);
            expect(res.body.name).toBe(book.name);
            expect(res.body.stock).toBe(book.stock);
        });

        it('should return 404 if invalid id is passed', async() => {
            const res = await exec('1');

            expect(res.status).toBe(404);
        });
    })
})