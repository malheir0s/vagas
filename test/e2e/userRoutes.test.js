const request = require('supertest');
const routes = require('../../src/routes/user');
const express = require('express');
const bodyParser = require('body-parser');
const app = express()

app.use(express.json());
app.use(express.urlencoded());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(routes);

var token_updateuser, token_deleteuser;

describe('endpoint POST /users', () => {
    test('creating new users for next tests', async () => {
        const response = await request(app).post('/users').send({ job: "dev update", name: "Developer I", permissions: ["update-users"] });
        expect(response.status).toBe(201);
        expect(response.body.id).toBe(2);

        const response2 = await request(app).post('/users').send({ job: "dev delete", name: "Developer II", permissions: ["delete-users"] });
        expect(response2.status).toBe(201);
        expect(response2.body.id).toBe(3);
    });
});

describe('endpoint /signin', () => {
    test('obtaining token for next tests', async () => {
        const response = await request(app).post('/signin').send({ name: "Developer I", id: 2 });
        expect(response.status).toBe(200);
        token_updateuser = response.body.token;

        const response2 = await request(app).post('/signin').send({ name: "Developer II", id: 3 });
        expect(response2.status).toBe(200);
        token_deleteuser = response2.body.token;
    })

})

describe('testing endpoint PUT /users', () => {
    test('trying to update an user without credentials: should return status 401 and an error message.', async () => {
        const response = await request(app).put('/users?id=1').send({ job: 'new job', name: 'New Name' });
        expect(response.status).toBe(401);
        expect(response.body).toEqual({ error: 'Invalid or missing authorization token.' });
    });

    test('trying to update an user without permission: should return status 403 and an error message.', async () => {
        const response = await request(app).put('/users?id=1').set('Authorization', 'Bearer ' + token_deleteuser).send({ job: 'new job', name: 'New Name' });
        expect(response.status).toBe(403);
        expect(response.body).toEqual({ error: 'User does not have permission to do this action.' });
    });

    test('trying to update an user with permission: should return status 200 and updated user data.', async () => {
        const response = await request(app).put('/users?id=1').set('Authorization', 'Bearer ' + token_updateuser).send({ job: 'new job', name: 'New Name' });
        expect(response.status).toBe(200);
        expect(response.body).toEqual({ job: 'new job', name: 'New Name', id: 1, permissions: [], read_count: 0 });
    });
})

describe('testing endpoint DELETE /users', () => {
    test('trying to delete an user without credentials: should return status 401 and an error message.', async () => {
        const response = await request(app).delete('/users?name=New Name');
        expect(response.status).toBe(401);
        expect(response.body).toEqual({ error: 'Invalid or missing authorization token.' });
    });

    test('trying to delete an user as an user without permission: should return status 403 and an error message.', async () => {
        const response = await request(app).delete('/users?name=New Name').set('Authorization', 'Bearer ' + token_updateuser);
        expect(response.status).toBe(403);
        expect(response.body).toEqual({ error: 'User does not have permission to do this action.' });
    });

    test('trying to delete an user as an user with permission: should return status 200.', async () => {
        const response = await request(app).delete('/users?name=New Name').set('Authorization', 'Bearer ' + token_deleteuser);
        expect(response.status).toBe(200);
    });

})