const handler = require('../pages/api/users/index.js').default;
const { usersRepo } = require('../helpers/users-repo');
const { createRequest, createResponse } = require('node-mocks-http');

jest.mock('../helpers/users-repo'); // Asegúrate de que la ruta es correcta

// Test for GET method
test('GET / should return all users', () => {
    const req = createRequest({ method: 'GET' });
    const res = createResponse();
    const users = [
        { id: 1, name: 'John Doe' },
        { id: 2, name: 'Jane Doe' }
    ];

    usersRepo.getAll.mockReturnValue(users);

    handler(req, res);

    expect(res.statusCode).toBe(200);
    expect(res._getJSONData()).toEqual(users);
});

// Test for POST method
test('POST / should create a new user', () => {
    const req = createRequest({ method: 'POST', body: { name: 'John Doe', email: 'john@example.com' } });
    const res = createResponse();

    handler(req, res);

    expect(res.statusCode).toBe(200);
    expect(res._getJSONData()).toEqual({ greeting: 'Hello John Doe' });
});

// Test for DELETE method
test('DELETE / should delete all users', () => {
    const req = createRequest({ method: 'DELETE' });
    const res = createResponse();

    handler(req, res);

    expect(res.statusCode).toBe(200);
    expect(res._getJSONData()).toEqual({ message: 'All users deleted' });
});
