const controller = require('../../src/controllers/user')
const model = require('../../src/models/user')




describe('testing User Controller', () => {
    describe('getAll', () => {
        test('should return an array of all users', () => {
            const req = {};
            const res = {
                send: jest.fn().mockReturnThis()
            };

            controller.getAll(req, res);

            expect(res.send).toHaveBeenCalledWith([
                {
                    id: 1,
                    name: "João Oliveira",
                    job: "Desenvolvedor",
                    permissions: [],
                    read_count: 0
                }
            ]);
        });
    });

    describe('getByName', () => {
        test('searching for an existing user: should return a user by name', () => {
            const req = { query: { name: 'John' } };
            const res = {
                send: jest.fn()
            };

            model.getByName = jest.fn().mockReturnValueOnce([
                {
                    id: 2,
                    name: "John",
                    job: "Developer",
                    read_count: 0
                }
            ]);

            controller.getByName(req, res);

            expect(res.send).toHaveBeenCalledWith([
                {
                    id: 2,
                    name: "John",
                    job: "Developer",
                    read_count: 0
                }
            ]);

        });

        test('searching for an user that does not exist: should return status 400, and an error message.', () => {
            const req = { query: { name: 'John' } };
            const res = {
                json: jest.fn(),
                status: jest.fn().mockReturnThis()
            };

            model.getByName = jest.fn().mockReturnValueOnce(undefined);

            controller.getByName(req, res);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ 'error': 'User not found.' });

        });
    });

    describe('create', () => {
        test('passing name and job strings, should create and return the user.', () => {
            const req = { body: { name: 'John', job: 'developer' } };
            const res = {
                json: jest.fn().mockReturnThis(),
                status: jest.fn().mockReturnThis()
            };

            controller.create(req, res);

            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledWith({ name: 'John', job: 'developer', read_count: 0, permissions: [], id: 2 });
        });
        test('not passing name or job fields, should return status 400 and an error message.', () => {
            const req = { body: { name: 'John' } };
            const res = {
                json: jest.fn(),
                status: jest.fn().mockReturnThis()
            };

            controller.create(req, res);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ error: 'Fields \'name\' and \'job\' are required and should be a string.' });

        });
        test('if name or job field is not an string, it should return status 400 and an error message.', () => {
            const req = { body: { name: 1, job: 'dev' } };
            const res = {
                json: jest.fn(),
                status: jest.fn().mockReturnThis()
            };

            controller.create(req, res);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ error: 'Fields \'name\' and \'job\' are required and should be a string.' });

        });
    });

    describe('deleteByName', () => {
        test('deleting an existing user: should return a success message', () => {
            const req = { query: { name: 'João Oliveira' } };
            const res = {
                send: jest.fn().mockReturnThis(),
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };

            controller.deleteByName(req, res);

            expect(res.send).toHaveBeenCalledWith('success');
        });
        test('trying to delete an user that does not exist: should return status 400 and an error message.', () => {
            const req = { query: { name: 'not an User' } };
            const res = {
                json: jest.fn(),
                status: jest.fn().mockReturnThis(),
            };

            model.deleteByName = jest.fn().mockReturnValueOnce(false);
            controller.deleteByName(req, res);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ error: 'User not found.' });

        });
    });

    describe('updateById', () => {
        test('updating an existing user: should return the updated user data', () => {
            const req = {
                query: { id: '2' },
                body: {
                    name: 'New name',
                    job: 'new job'
                }
            };
            const res = {
                send: jest.fn().mockReturnThis(),
                status: jest.fn().mockReturnThis(),
                json: jest.fn().mockReturnThis()
            };

            controller.updateById(req, res);

            expect(res.send).toHaveBeenCalledWith({
                name: 'New name',
                job: 'new job',
                id: 2,
                permissions: [],
                read_count: 0
            });

        });
        test('trying to update an user that does not exist: should return status 400 and an error message.', () => {
            const req = {
                query: { id: '55' },
                body: {
                    name: 'New name',
                    job: 'new job'
                }
            };
            const res = {
                json: jest.fn().mockReturnThis(),
                status: jest.fn().mockReturnThis(),
            };

            controller.updateById(req, res);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({
                error: 'User not found.'
            });

        });

        test('should not be possible to accept an id that is not a number.', () => {
            const req = {
                query: { id: 'ab' },
                body: {
                    name: 'New name',
                    job: 'new job'
                }
            };
            const res = {
                json: jest.fn().mockReturnThis(),
                status: jest.fn().mockReturnThis(),
            };

            controller.updateById(req, res);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({
                error: 'parameter \'id\' should be a number.'
            });

        });

    });

    describe('readCountByUserName', () => {
        test('should return the count of user reads by name', () => {
            const req = {
                query: { name: 'New name' },
            };
            const res = {
                send: jest.fn().mockReturnThis(),
                status: jest.fn().mockReturnThis(),
                json: jest.fn().mockReturnThis(),
            };

            controller.readCountByUserName(req, res);

            expect(res.send).toHaveBeenCalledWith(0);
        });
        test('user does not exist: should return status 400 and an error message.', () => {
            const req = {
                query: { name: 'I do not exist' },
            };
            const res = {
                json: jest.fn().mockReturnThis(),
                status: jest.fn().mockReturnThis(),
            };

            controller.readCountByUserName(req, res);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ error: 'User not found.' });

        });
    });

    describe('generateToken', () => {
        test('corret user id and name, should return a token', () => {
            const req = {
                body: {
                    name: 'New name',
                    id: 2}
            };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };

            
            controller.generateToken(req, res);
            expect(res.status).toHaveBeenCalledWith(200);
        });

        test('incorret user id or name, should return an error message.', () => {
            const req = {
                body: {
                    name: 'wrong name',
                    id: 2}
            };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn().mockReturnThis()
            };

            controller.generateToken(req, res);
            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({error: 'Invalid user id or name.'});
        });

        test('incorret format of user id or name, should return an error message.', () => {
            const req = {
                body: {
                    name: 'name',
                    id: 't'}
            };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn().mockReturnThis()
            };

            controller.generateToken(req, res);
            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({'error': 'parameter \'name\' should be a string and \'id\' should be a number.'});
        })
    })
});