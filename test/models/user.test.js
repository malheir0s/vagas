const model = require('../../src/models/user')

describe('testing User Model', () => {
    describe('getAll', () => {
        test('should return an array of all users', () => {

        });
    });

    describe('getByName', () => {
        test('searching for an existing user: should return a user by name', () => {

        });

        test('searching for an user that does not exist: should return undefined', () => {

        });
    });

    describe('deleteByName', () => {
        test('deleting an existing user: the user is should be removed from the array, and should return true', () => {

        });
        test('trying to delete an user that does not exist: array should remain the same, and should return false', () => {

        });
    });

    describe('create', () => {
        test('should insert a new json in the array, and return the new created user', () => {

        });
    });

    describe('updateById', () => {
        test('should update a user by ID', () => {

        });
    });

    describe('readCountByUserName', () => {
        test('should return the count of user reads by name', () => {

        });
    });
});