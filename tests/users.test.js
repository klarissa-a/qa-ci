import config from '../framework/config/config';
import AuthService from '../framework/services/AuthService';
import UserService from '../framework/services/UserService';

describe('Пользователи', () => {
    it('Получение информации о пользователя', async () => {
        const username = config.username + Math.random(100000);
        const result = await UserService.create({
            userName: username,
            password: config.password
        })
        expect(result.status).toBe(201);
        const result2 = await AuthService.generateToken({
            userName: username,
            password: config.password
        })

        expect(result2.status).toBe(200);
        const result3 = await UserService.get({
            userId: result.data.userID,
            token: result2.data.token
        })
    
        expect(result3.status).toBe(200);
        expect(result3.data.username).toBe(username);
        expect(result3.data.userId).toBe(result.data.userID);

    });

    it('Удаление пользователя', async () => {
        const username = "tarakffgfasghka" + Math.random(100000);
        const result = await UserService.create({
            userName: username,
            password: config.password
        })
        
        expect(result.status).toBe(201);
        const result2 = await AuthService.generateToken({
            userName: username,
            password: config.password
        })
        const { token } = result2.data;
        const result3 = await UserService.remove({
            userId: result.data.userID,
            token: token
        })
        expect(result3.status).toBe(204);
    
    });
});
