const request = require('supertest');
const { v4: uuidv4 } = require('uuid');

const User = require('../user/index').service;
const Book = require('../book/index').service;
const Borrow = require('./borrow.service');

let server;

describe('/api/borrows', () => {
    beforeEach(() => { server = require('../../index'); })
    afterEach(() => { server.close(); })

    describe('GET /:userId', () => {
        let book;
        let user;
        let borrow;

        const exec = async() => {
            return await request(server).get('/api/borrows/' + user.id)
        }

        beforeEach(async() => {
            await Book.removeAllBooks();
            await User.removeAllUsers();

            book = { id: uuidv4(), name: 'book1', stock: 1 }
            await Book.insertOneBook(book);

            user = { id: uuidv4(), name: 'user1' };
            await User.insertOneUser(user);

            borrow = { id: uuidv4(), userId: user.id, bookId: book.id };
            await Borrow.insertOneBorrow(borrow);
            await Book.decreaseBookStock(book.id);
        })

        afterEach(() => {
            Book.removeAllBooks()
            User.removeAllUsers()
            Borrow.removeAllBorrows()
        })

        it('should return 200 if it is valid', async() => {
            const res = await exec();

            expect(res.status).toBe(200);
            expect(res.body.length).toBe(1);
            expect(res.body.every(b => b.hasOwnProperty('id'))).toBeTruthy();
            expect(res.body.every(b => b.bookId === book.id)).toBeTruthy();
            expect(res.body.every(b => b.userId === user.id)).toBeTruthy();
            expect(res.body.every(b => b.bookName === book.name)).toBeTruthy();
        });

        it('should return 404 if userId is not string', async() => {
            user.id = 1;
            
            const res = await exec();

            expect(res.status).toBe(404);
        });

        it('should return 404 if userId is not GUID', async() => {
            user.id = '1';

            const res = await exec();

            expect(res.status).toBe(404);
        });
    })

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

        it('should add borrow and decrease stock count of book if it is valid', async() => {
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

        it('should return 400 if bookId is missing', async() => {
            delete borrow.bookId

            const res = await exec();

            expect(res.status).toBe(400);
        });

        it('should return 404 if user with the given id was not found', async() => {
            borrow.userId = uuidv4();

            const res = await exec();

            expect(res.status).toBe(404);
        });

        it('should return 404 if book with the given id was not found', async() => {
            borrow.bookId = uuidv4();

            const res = await exec();

            expect(res.status).toBe(404);
        });

        it('should return 403 if borrowing limit of 2 exceeded', async() => {
            const book1 = { id: uuidv4(), name: 'book1', stock: 1 }
            await Book.insertOneBook(book1);
            const borrow1 = { userId: user.id, bookId: book1.id };
            await Borrow.insertOneBorrow(borrow1);

            const book2 = { id: uuidv4(), name: 'book2', stock: 1 }
            await Book.insertOneBook(book2);
            const borrow2 = { userId: user.id, bookId: book2.id };
            await Borrow.insertOneBorrow(borrow2);

            const res = await exec();

            expect(res.status).toBe(403);
        });

        it('should return 403 if selected book is already borrowed by the user', async() => {
            const book1 = { id: uuidv4(), name: 'book1', stock: 1 }
            await Book.insertOneBook(book1);
            const borrow1 = { userId: user.id, bookId: book1.id };
            await Borrow.insertOneBorrow(borrow1);

            borrow.bookId = book1.id;

            const res = await exec();

            expect(res.status).toBe(403);
        });

        it('should return 400 if stock is not available', async() => {
            const book1 = { id: uuidv4(), name: 'book1', stock: 0 }
            await Book.insertOneBook(book1);

            borrow.bookId = book1.id;

            const res = await exec();

            expect(res.status).toBe(403);
        });
    })

    describe('PUT /', () => {
        let book;
        let user;
        let borrow;

        const exec = async() => {
            delete borrow.id;
            return await request(server).put('/api/borrows').send(borrow)
        }

        beforeEach(async() => {
            await Book.removeAllBooks();
            await User.removeAllUsers();

            book = { id: uuidv4(), name: 'book1', stock: 1 }
            await Book.insertOneBook(book);

            user = { id: uuidv4(), name: 'user1' };
            await User.insertOneUser(user);

            borrow = { id: uuidv4(), userId: user.id, bookId: book.id };
            await Borrow.insertOneBorrow(borrow);
            await Book.decreaseBookStock(book.id);
        })

        afterEach(() => {
            Book.removeAllBooks()
            User.removeAllUsers()
            Borrow.removeAllBorrows()
        })

        it('should return 204 if it is valid', async() => {
            const res = await exec();

            expect(res.status).toBe(204);

            const { length } = Borrow.findBorrows();
            expect(length).toBe(0);

            const { stock } = Book.findBookById(book.id)
            expect(stock).toBe(1);
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

        it('should return 404 if user with the given id was not found', async() => {
            borrow.userId = uuidv4();

            const res = await exec();

            expect(res.status).toBe(404);
        });

        it('should return 404 if book with the given id was not found', async() => {
            borrow.bookId = uuidv4();

            const res = await exec();

            expect(res.status).toBe(404);
        });

        it('should return 403 if 0 books borrowed', async() => {
            await Borrow.deleteOneBorrow(user.id, book.id);
            await Book.increaseBookStock(book.id);

            const res = await exec();

            expect(res.status).toBe(403);
        });

        it('should return 403 if user dit not borrow the book', async() => {
            const book2 = { id: uuidv4(), name: 'book1', stock: 1 }
            await Book.insertOneBook(book2);

            const user2 = { id: uuidv4(), name: 'user1' };
            await User.insertOneUser(user2);

            const borrow2 = { id: uuidv4(), userId: user2.id, bookId: book2.id };
            await Borrow.insertOneBorrow(borrow2);
            await Book.decreaseBookStock(book2.id);

            borrow = { userId: user2.id, bookId: book.id };

            const res = await exec();

            expect(res.status).toBe(403);
        });
    })
})