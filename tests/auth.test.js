import config from '../framework/config/config';
import AuthService from '../framework/services/AuthService';
describe('Авторизация', () => {
    it('Проерка неавторизованного пользователя', async () => {
        const result = await AuthService.authorized({
            userName: config.username,
            password: config.password
        });
  
        expect(result.status).toBe(200);
        expect(result.data).toBe(false);
    });
});
