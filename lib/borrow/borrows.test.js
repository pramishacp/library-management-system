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
        let book;
        let user;
        let borrow;

        const exec = async() => await request(server).post('/api/borrows').send(borrow)

        beforeEach(async() => {
            await Book.removeAllBooks();
            await User.removeAllUsers();

            book = { id: uuidv4(), name: 'book1', stock: 1 }
            await Book.insertOneBook(book);

            user = { id: uuidv4(), name: 'user1' };
            await User.insertOneUser(user);

            borrow = { userId: user.id, bookId: book.id };
        })

        afterEach(() => {
            Book.removeAllBooks()
            User.removeAllUsers()
            Borrow.removeAllBorrows()
        })

        it('should add book and decrease stock count if borrowing 1 book', async() => {
            const res = await exec();

            expect(res.status).toBe(201);
            expect(res.body).toHaveProperty('id');
            expect(res.body).toHaveProperty('bookId', book.id);
            expect(res.body).toHaveProperty('userId', user.id);

            const { length } = Borrow.findBorrows();
            expect(length).toBe(1);

            const { stock } = Book.findBookById(book.id)
            expect(stock).toBe(0);
        });

        it('should return 400 if userId is not string', async() => {
            borrow.userId = 1;

            const res = await exec();

            expect(res.status).toBe(400);
        });

        it('should return 400 if userId is not GUID', async() => {
            borrow.userId = '1';

            const res = await exec();

            expect(res.status).toBe(400);
        });

        it('should return 400 if userId is missing', async() => {
            delete borrow.userId

            const res = await exec();

            expect(res.status).toBe(400);
        });

        it('should return 400 if bookId is not string', async() => {
            borrow.bookId = 1;

            const res = await exec();

            expect(res.status).toBe(400);
        });

        it('should return 400 if bookId is not GUID', async() => {
            borrow.bookId = '1';

            const res = await exec();

            expect(res.status).toBe(400);
        });

        it('should return 400 if bookId is missing', async() => {
            delete borrow.bookId

            const res = await exec();

            expect(res.status).toBe(400);
        });
    })
})