import config from '../framework/config/config';
import AuthService from '../framework/services/AuthService';
import BookService from '../framework/services/BookService';

describe('Книги', () => {
    it('Создание книги', async () => {
        const tokenResult = await AuthService.generateToken({
            userName: config.username,
            password: config.password
        })

        expect(tokenResult.status).toBe(200);
        const bookResult = await BookService.create({
            userId: config.userId,
            isbn: '9781449325862',
            token: tokenResult.data.token
        })
    
        expect(bookResult.status).toBe(201);
        expect(bookResult.data.books.length).toBe(1);
    });
    
    it('Обновление книги', async () => {
        const tokenResult = await AuthService.generateToken({
            userName: config.username,
            password: config.password
        })

        expect(tokenResult.status).toBe(200);
        console.log(tokenResult);
        const bookResult = await BookService.update({
            userId: config.userId,
            isbn: '9781449325862',
            newIsbn: '9781449365035',
            token: tokenResult.data.token
        })
        expect(bookResult.status).toBe(200);
        expect(bookResult.data.books[0].isbn).toBe('9781449365035');
    });


    it.each`
    isbn                  | title
    ${'9781449325862'}    | ${'Git Pocket Guide'}
    ${'9781449365035'}    | ${'Speaking JavaScript'}
    `('Получение информации о книге $isbn', async ({ isbn, title }) => {
        const tokenResult = await AuthService.generateToken({
            userName: config.username,
            password: config.password
        })

        expect(tokenResult.status).toBe(200);
        console.log(tokenResult);
        const bookResult = await BookService.get({
            isbn,
            token: tokenResult.data.token
        })
        expect(bookResult.status).toBe(200);
        expect(bookResult.data.title).toBe(title);
    });

    it('Удаление книги', async () => {
        const tokenResult = await AuthService.generateToken({
            userName: config.username,
            password: config.password
        })

        expect(tokenResult.status).toBe(200);
        console.log(tokenResult);
        const bookResult = await BookService.delete({
            userId: config.userId,
            isbn: '9781449365035',
            token: tokenResult.data.token
        })
        expect(bookResult.status).toBe(204);
    });

   
});


