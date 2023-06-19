const model = require('../../src/models/user')

describe('testing User Model', () => {
    describe('getAll', () => {
        test('should return an array of all users', () => {
            expect(model.getAll()).toStrictEqual([
                {
                    id: 1,
                    name: "João Oliveira",
                    job: "Desenvolvedor",
                    permissions: [],
                    read_count: 0
                }
            ])
        });
    });

    describe('create', () => {
        test('should insert a new json in the array, and return the new created user', () => {
            expect(model.create('New User', 'Developer')).toStrictEqual(
                {
                    id: 2,
                    name: "New User",
                    job: "Developer",
                    permissions: [],
                    read_count: 0
                }
            )
        });
    });

    describe('getByName', () => {
        test('searching for an existing user: should return a user by name', () => {
            expect(model.getByName('João Oliveira')).toStrictEqual({
                id: 1,
                name: "João Oliveira",
                job: "Desenvolvedor",
                permissions: [],
                read_count: 1
            })
        });

        test('searching for an user that does not exist: should return undefined', () => {
            expect(model.getByName('i do not exist')).toBe(undefined)
        });
    });

    describe('deleteByName', () => {
        test('deleting an existing user: the user should be removed from the array, and should return true', () => {
            expect(model.deleteByName('João Oliveira')).toBe(true)
            expect(model.getAll()).toStrictEqual([{
                id: 2,
                name: "New User",
                job: "Developer",
                permissions: [],
                read_count: 0
            }])
        });
        test('trying to delete an user that does not exist: array should remain the same, and should return false', () => {
            expect(model.deleteByName('i do not exist')).toBe(false)
            expect(model.getAll()).toStrictEqual([{
                id: 2,
                name: "New User",
                job: "Developer",
                permissions: [],
                read_count: 0
            }])
        });
    });

    describe('updateById', () => {
        test('should update an user by ID', () => {
            expect(model.updateById(2, 'Updated Name', 'Senior Developer')).toStrictEqual({
                id: 2,
                name: "Updated Name",
                job: "Senior Developer",
                permissions: [],
                read_count: 0
            })
            expect(model.getAll()).toStrictEqual([{
                id: 2,
                name: "Updated Name",
                job: "Senior Developer",
                permissions: [],
                read_count: 0
            }])
        });
        test('trying to update an user that doest not exist, should return undefined.', () => {
            expect(model.updateById(0, 'Updated Name', 'Senior Developer')).toBe(undefined)
        });
    });

    describe('readCountByUserName', () => {
        test('should return the count of user reads by name', () => {
            expect(model.readCountByUserName('Updated Name')).toBe(0)
        });
        test('after reading the user, count should be incremented.', () => {
            model.getByName('Updated Name');
            expect(model.readCountByUserName('Updated Name')).toBe(1)
        })
        test('Trying to read an user that does not exist, should return false.', () => {
            expect(model.readCountByUserName('i do not exist')).toBe(false)
        })
    });

    describe('generateToken', () => {
        test('for a correct user name and id, should return true', () => {
            expect(model.generateToken(2, 'Updated Name')).toBe(true);
        })
        test('if user name or id is incorret, should return false', () => {
            expect(model.generateToken(2, 'Wrong Name')).toBe(false);
            expect(model.generateToken(1, 'Updated Name')).toBe(false);
            expect(model.generateToken(3, '')).toBe(false);
        })
    })
});