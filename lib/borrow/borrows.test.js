const request = require('supertest');
const { v4: uuidv4 } = require('uuid');

const User = require('../user/index').service;
const Book = require('../book/index').service;
const Borrow = require('./borrow.service');

let server;

describe('/api/borrows', () => {
    beforeEach(() => { server = require('../../index'); })
    afterEach(() => { server.close(); })

    describe('POST /', () => {
        const exec = async(borrow) => await request(server).post('/api/borrows').send(borrow)

        beforeEach(() => {
            Book.removeAllBooks()
            User.removeAllUsers()
        })
        afterEach(() => {
            Book.removeAllBooks()
            User.removeAllUsers()
            Borrow.removeAllBorrows()
        })

        it('should add book and decrease stock count if borrowing 1 book', async() => {
            const book = { id: uuidv4(), name: 'book1', stock: 1 }
            await Book.insertOneBook(book);

            const user = { id: uuidv4(), name: 'user1' };
            await User.insertOneUser(user);

            const borrow = { userId: user.id, bookId: book.id };

            const res = await exec(borrow);

            expect(res.status).toBe(201);
            expect(res.body).toHaveProperty('id');
            expect(res.body).toHaveProperty('bookId', book.id);
            expect(res.body).toHaveProperty('userId', user.id);

            const { stock } = Book.findBookById(book.id)
            expect(stock).toBe(0);
        });
    })
})