
describe('bookstore', () => {
  it('Создание пользователя c ошибкой, пароль не подходит', async () => {
    const result = await fetch('https://bookstore.demoqa.com/Account/v1/User', {
        method: 'POST',
        headers: {'Content-Type': 'application/json' },
        body: JSON.stringify({
            "userName": "spokki",
            "password": "12345"
        })
    })
    const data = await result.json();

    expect(result.status).toBe(400);
    expect(data.code).toBe('1300');
  });

  it('Создание пользователя успешно', async () => {
    const result = await fetch('https://bookstore.demoqa.com/Account/v1/User', {
        method: 'POST',
        headers: {'Content-Type': 'application/json' },
        body: JSON.stringify({
            "userName": "tarakffgfasghka" + Math.random(100000),
            "password": "#mH!kqA$2UyxW9e"
        })
    })
    const data = await result.json();

    expect(result.status).toBe(201);
    expect(data.userID.length).toBe(36);
  });

  it('Создание пользователя c ошибкой, логин уже используется', async () => {
    const result = await fetch('https://bookstore.demoqa.com/Account/v1/User', {
        method: 'POST',
        headers: {'Content-Type': 'application/json' },
        body: JSON.stringify({
            "userName": "tarakffgfasghka",
            "password": "#mH!kqA$2UyxW9e"
        })
    })
    const data = await result.json();

    expect(result.status).toBe(406);
    expect(data.code).toBe('1204');
  });

  it('Генерация токена с ошибкой', async () => {
    const result = await fetch('https://bookstore.demoqa.com/Account/v1/GenerateToken', {
        method: 'POST',
        headers: {'Content-Type': 'application/json' },
        body: JSON.stringify({
          "userName": "tagrakashka",
          "password": "#mH!kqA$2UyxW9e"
        })
    })
    const data = await result.json();

    expect(result.status).toBe(200);
    expect(data.token).toBe(null);
    expect(data.status).toBe('Failed');
  });
});

it('Генерация токена успешно', async () => {
  const result = await fetch('https://bookstore.demoqa.com/Account/v1/GenerateToken', {
      method: 'POST',
      headers: {'Content-Type': 'application/json' },
      body: JSON.stringify({
        "userName": "tarakashka",
        "password": "#mH!kqA$2UyxW9e"
      })
  })
  const data = await result.json();

  expect(result.status).toBe(200);
  expect(data.token.length).toBe(176);

});






