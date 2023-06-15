const controller = require('../../src/controllers/user')

describe('testing User Controller', () => {
    describe('getAll', () => {
        test('should return an array of all users', () => {

        });
    });

    describe('getByName', () => {
        test('searching for an existing user: should return a user by name', () => {

        });

        test('searching for an user that does not exist: should return status 400, and an error message.', () => {

        });
    });

    describe('create', () => {
        test('passing name and job strings, should create and return the user. An id should be created for the user.', () => {

        });
        test('not passing name or job fields, should return status 400 and an error message.', () => {

        });
        test('if name or job field is not an string, it should return status 400 and an error message.', () => {

        });
    });

    describe('deleteByName', () => {
        test('deleting an existing user: should return a success message', () => {

        });
        test('trying to delete an user that does not exist: should return status 400 and an error message.', () => {

        });
        test('trying to delete another user as an user without permission: should return status 403 and an error message.', () => {

        });
    });

    describe('updateById', () => {
        test('updating an existing user: should return the updated user data', () => {

        });
        test('trying to update an user that does not exist: should return status 400 and an error message.', () => {

        });
        test('trying to update another user as an user without permission: should return status 403 and an error message.', () => {

        });
    });

    describe('readCountByUserName', () => {
        test('should return the count of user reads by name', () => {

        });
        test('user does not exist: should return status 400 and an error message.', () => {

        });
    });
});